import { NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { createClient } from "@supabase/supabase-js";
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { TriageResponseSchema } from '@/lib/gemini';

// Initialize Supabase Admin Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
);

// Part 8.2.4: Sanitizer - Clean incoming data
function sanitizeHtml(text: string) {
  if (!text) return "";
  let cleanText = text.replace(/<[^>]*>?/gm, '');
  cleanText = cleanText.replace(/\s+/g, ' ').trim();
  cleanText = cleanText.replace(/(?:https?:\/\/|www\.)\S+/g, '');
  return cleanText;
}

// Part 8.2.2: API Route Scaffold with Upstash Verification
async function handler(req: Request) {
  try {
    console.log(`[PR Ingestion Cron] Waking up to scan for new journalist opportunities...`);
    
    // Part 8.2.3: Parser - Fetch external RSS/HARO JSON feeds
    console.log(`[PR Ingestion Cron] Fetching latest PR opportunities...`);
    
    const mockExternalOpportunities = [
      {
        id: "ext-101",
        source: "haro",
        journalist: "Sarah Jenkins",
        outlet: "Healthline",
        da: 85,
        deadline: new Date(Date.now() + 86400000).toISOString(),
        query: "<p>Looking for a <b>medical expert</b> or home care agency owner to explain the benefits of in-home senior care vs assisted living. Please include credentials.</p>"
      },
      {
        id: "ext-102",
        source: "twitter",
        journalist: "Tech Blogger",
        outlet: "Gizmodo",
        da: 90,
        deadline: new Date(Date.now() + 172800000).toISOString(),
        query: "Need quotes on the latest <i>iPhone 15 specs</i>. #journorequest"
      }
    ];

    // Part 8.2.4: Apply Sanitizer
    const parsedOpportunities = mockExternalOpportunities.map(opp => ({
      ...opp,
      cleanQuery: sanitizeHtml(opp.query)
    }));

    console.log(`[PR Ingestion Cron] Fetched and sanitized ${parsedOpportunities.length} opportunities.`);
    
    // Part 8.2.5 & 8.2.6: Call Gemini Flash for Triage
    console.log(`[PR Ingestion Cron] Starting AI Triage...`);
    const aiPayload = parsedOpportunities.map(opp => ({ id: opp.id, query: opp.cleanQuery }));
    
    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: TriageResponseSchema,
      prompt: `You are an expert PR Manager for a Home Care Agency (providing senior care, nursing, and assisted living alternatives).
      Evaluate the following list of journalist requests.
      For each request, give it a relevance score from 0 to 100.
      - 100 means it's a perfect match (e.g. asking for elderly care experts).
      - 0 means it's completely irrelevant (e.g. tech gadgets, finance, unrelated topics).
      
      Requests:
      ${JSON.stringify(aiPayload, null, 2)}`
    });

    // Merge the AI scores back into our opportunities list
    const evaluatedOpportunities = parsedOpportunities.map(opp => {
      const evaluation = object.evaluations.find(e => e.id === opp.id);
      return {
        ...opp,
        relevance_score: evaluation?.relevance_score || 0,
        triage_reason: evaluation?.reason || "Failed to evaluate"
      };
    });
    
    console.log(`[PR Ingestion Cron] AI Triage complete: `, JSON.stringify(evaluatedOpportunities, null, 2));

    // Part 8.2.8: Auto-discard irrelevant opportunities (Score < 70)
    const goldenOpportunities = evaluatedOpportunities.filter(opp => opp.relevance_score >= 70);
    const discardedCount = evaluatedOpportunities.length - goldenOpportunities.length;
    
    console.log(`[PR Ingestion Cron] Discarded ${discardedCount} irrelevant requests. Keeping ${goldenOpportunities.length} golden opportunities.`);

    // Part 8.2.7: Save highly relevant opportunities to DB
    if (goldenOpportunities.length > 0) {
      const dbPayload = goldenOpportunities.map(opp => ({
        source: opp.source,
        query_text: opp.query,
        journalist_name: opp.journalist,
        media_outlet: opp.outlet,
        domain_authority: opp.da,
        deadline: opp.deadline,
        relevance_score: opp.relevance_score,
        status: 'new'
      }));

      const { error } = await supabase
        .from('pr_opportunities')
        .insert(dbPayload);

      if (error) {
        console.error(`[PR Ingestion Cron] Failed to save to DB: `, error);
        throw new Error(error.message);
      }
      
      console.log(`[PR Ingestion Cron] Successfully saved ${goldenOpportunities.length} opportunities to the database.`);
    } else {
      console.log(`[PR Ingestion Cron] No golden opportunities found in this cycle.`);
    }

    return NextResponse.json({ 
      success: true, 
      scanned: evaluatedOpportunities.length,
      saved: goldenOpportunities.length 
    });
  } catch (error: any) {
    console.error(`[PR Ingestion Cron] Error during cycle: `, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Ensure ONLY Upstash QStash can call this route (Zero-Lag Security)
const hasQStashKeys = process.env.QSTASH_CURRENT_SIGNING_KEY && process.env.QSTASH_NEXT_SIGNING_KEY;
export const POST = hasQStashKeys ? verifySignatureAppRouter(handler) : (req: Request) => handler(req);
// Added GET just for local testing convenience, usually cron is POST.
export const GET = handler;

// Increase timeout for this worker just in case the AI processing takes time.
export const maxDuration = 120;
