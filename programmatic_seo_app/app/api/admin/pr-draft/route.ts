import { NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { createClient } from "@supabase/supabase-js";
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { PRPitchSchema, buildPRPitchPrompt } from '@/lib/gemini';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Part 8.3.2: RAG Pipeline - Fetch context from our own published articles
async function fetchRagContext(journalistQuery: string) {
  console.log(`[Pitch Crafter] Searching internal DB for context related to journalist query...`);
  
  const { data, error } = await supabase
    .from('published_articles')
    .select('title, content_html')
    .limit(1);

  if (error || !data || data.length === 0) {
    return "No internal articles found. Rely on general expert knowledge.";
  }

  // Strip HTML from the article to pass clean context to AI
  const cleanContext = data[0].content_html.replace(/<[^>]*>?/gm, '').substring(0, 800);
  
  return `According to our recent article "${data[0].title}": ${cleanContext}...`;
}

// Part 8.3.7 & 8.3.8: Critic Agent Validation Function
function runCriticAgent(pitchBody: string, subjectLine: string) {
  console.log(`[Critic Agent] Scanning generated pitch for violations...`);

  // 1. Length Check
  const wordCount = pitchBody.split(/\s+/).length;
  if (wordCount > 180) {
    throw new Error(`CRITIC_FAILED: Email is too long (${wordCount} words). Must be under 150.`);
  }

  // 2. Subject Line Check
  const subjectWords = subjectLine.split(/\s+/).length;
  if (subjectWords > 12) {
    throw new Error(`CRITIC_FAILED: Subject line is too long. Must be punchy.`);
  }

  // 3. Spam & Banned Word Check
  const bannedPhrases = [
    "hope this finds you well",
    "hope this email finds you well",
    "dear sir",
    "dear madam",
    "delve",
    "tapestry",
    "moreover",
    "in conclusion"
  ];

  const bodyLower = pitchBody.toLowerCase();
  for (const phrase of bannedPhrases) {
    if (bodyLower.includes(phrase)) {
      throw new Error(`CRITIC_FAILED: Banned phrase detected: "${phrase}". This triggers spam filters.`);
    }
  }

  console.log(`[Critic Agent] Pitch passed all quality checks!`);
  return true;
}

// Part 8.3.1: Trigger Route Scaffold
async function handler(req: Request) {
  try {
    const body = await req.json();
    const { opportunity_id } = body;

    if (!opportunity_id) {
      throw new Error("opportunity_id is required");
    }

    // 1. Fetch the opportunity details
    const { data: opp, error: oppError } = await supabase
      .from('pr_opportunities')
      .select('*')
      .eq('id', opportunity_id)
      .single();

    if (oppError || !opp) {
      throw new Error("Opportunity not found.");
    }

    console.log(`[Pitch Crafter] Starting draft process for Opportunity: ${opp.id}`);

    // 2. Run RAG Pipeline (Part 8.3.2)
    const ragContext = await fetchRagContext(opp.query_text);
    console.log(`[Pitch Crafter] RAG Context fetched successfully.`);

    // 3. Fetch Global Settings (Part 8.1.3)
    const { data: settings } = await supabase.from('pr_settings').select('*').single();
    const persona = settings || { sender_name: "Expert", sender_title: "Specialist", sender_bio: "" };

    // Part 8.3.3 & 8.3.4: Build the Prompt
    const fullPrompt = buildPRPitchPrompt(
      opp.query_text,
      ragContext,
      persona.sender_name,
      persona.sender_title,
      persona.sender_bio || "Expert in the field."
    );

    console.log(`[Pitch Crafter] Calling Gemini for generation...`);

    // Part 8.3.5 & 8.3.6: Gemini API Call with Zod Schema
    const { object: pitchDraft } = await generateObject({
      model: google("gemini-1.5-flash"), 
      schema: PRPitchSchema,
      prompt: fullPrompt,
      temperature: 0.7, 
    });

    console.log(`[Pitch Crafter] Draft generated successfully! Subject: ${pitchDraft.subject_line}`);

    // Part 8.3.9: Trigger Critic Agent & QStash Self-Healing Loop
    runCriticAgent(pitchDraft.pitch_body, pitchDraft.subject_line);

    // Part 8.3.10: Save approved pitch to DB
    console.log(\`[Pitch Crafter] Pitch passed! Saving to database...\`);

    // 1. Insert into pr_pitches table
    const { data: insertedPitch, error: insertError } = await supabase
      .from('pr_pitches')
      .insert({
        opportunity_id: opp.id,
        subject_line: pitchDraft.subject_line,
        pitch_body: pitchDraft.pitch_body,
        suggested_sender_email: pitchDraft.suggested_sender_email || persona.sender_email,
        status: 'pending_review'
      })
      .select('id')
      .single();

    if (insertError || !insertedPitch) {
      throw new Error(\`Failed to save pitch: \${insertError?.message}\`);
    }

    // 2. Update the parent opportunity status
    const { error: updateError } = await supabase
      .from('pr_opportunities')
      .update({ status: 'drafting' })
      .eq('id', opp.id);

    if (updateError) {
      console.error(\`[Pitch Crafter] Pitch saved, but failed to update opportunity status: \`, updateError);
    }

    console.log(\`[Pitch Crafter] Pitch successfully saved to DB. Ready for review/dispatch.\`);

    // Part 8.4.3: Auto-Pilot Bypass Logic
    if (settings.auto_pilot === true) {
      console.log(\`[Pitch Crafter] 🚀 AUTO-PILOT IS ON. Bypassing manual review. Sending to Dispatcher...\`);
      
      // Update status to approved immediately
      await supabase.from('pr_pitches').update({ status: 'approved' }).eq('id', insertedPitch.id);
      
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      fetch(\`\${baseUrl}/api/admin/pr-dispatch\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitch_id: insertedPitch.id })
      }).catch(err => console.error("[Auto-Pilot] Failed to trigger dispatch:", err));
      
      return NextResponse.json({ success: true, message: "Drafting completed and Auto-Pilot triggered." });
    } else {
      console.log(\`[Pitch Crafter] Auto-pilot is OFF. Pitch left in pending_review.\`);
      return NextResponse.json({ success: true, message: "Drafting process completed. Pending manual review." });
    }
  } catch (error: any) {
    console.error(`[Pitch Crafter] Error: `, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const POST = verifySignatureAppRouter(handler);
export const maxDuration = 120; // 2 minutes to allow deep AI thinking
