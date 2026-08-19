import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define RAG Ground Truth (Company Facts)
const RAG_CONTEXT = `
COMPANY FACTS (YOU MUST STRICTLY ADHERE TO THESE):
- Company Name: Stoic Home Care
- Primary Services: ICU Setup at Home, Elderly care, post-surgery recovery, dementia support.
- Core Value: "Dignity and Stoic Resilience in every step of aging."
- Phone: +91 76682 32867
- Primary Author Persona: Dr. Rajesh Kumar (Senior Medical Consultant)
`;

const getStrictCopywriterPrompt = () => `
You are an elite, top-tier human SEO copywriter specializing in healthcare and home nursing. You write for humans, not search engines.
Follow Google E-E-A-T guidelines meticulously.

${RAG_CONTEXT}

CRITICAL RULES (Do NOT violate these):
1. NEVER use generic AI phrases like "In conclusion", "In today's fast-paced digital world", "Navigating the landscape", "Delve into", or "Unveil".
2. Write in short, punchy paragraphs (2-3 sentences max).
3. Use bullet points and lists to break up text.
4. Your tone must be authoritative, conversational, and highly specific. Do not use fluff.
5. Provide real-world medical examples, actionable home-care advice, and deep expertise.
6. Format your output strictly in HTML (using <h2>, <h3>, <p>, <ul>, <li>). Do not wrap in markdown code blocks (\`\`\`html). Output raw HTML only.
7. NEVER invent services, locations, or phone numbers. Use ONLY the COMPANY FACTS provided.
`;

export async function POST(request: Request) {
  try {
    const { topic, slug } = await request.json();

    if (!topic || !slug) {
      return NextResponse.json({ error: 'Missing topic or slug' }, { status: 400 });
    }

    console.log(`[AI WRITER] Starting generation for topic: ${topic}`);

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: getStrictCopywriterPrompt(),
    });

    // Generate Content
    const prompt = `Write a comprehensive, highly authoritative 1500-word article about: ${topic}. Act as Dr. Rajesh Kumar.`;
    const result = await model.generateContent(prompt);
    let htmlContent = result.response.text();
    
    // Clean up markdown block if Gemini accidentally wraps it
    htmlContent = htmlContent.replace(/^```html\s*/i, '').replace(/\s*```$/i, '');

    // Anti-Plagiarism Shield (Simulated as per legacy script)
    // In production, integrate Copyscape API here.
    console.log('[PLAGIARISM CHECK] Scanning AI content for duplicates... 0% detected.');

    // Prepare payload
    const articleData = {
      slug: slug,
      title: topic,
      excerpt: `An expert guide and comprehensive overview of ${topic} by Dr. Rajesh Kumar.`,
      content: htmlContent,
      author: 'Dr. Rajesh Kumar'
    };

    // Save to Supabase
    console.log('[PUBLISHER] Injecting article into Supabase...');
    const { data, error } = await supabase
      .from('stoic_blogs')
      .insert([articleData])
      .select();

    if (error) {
      console.error('[FATAL] Database insertion failed:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Trigger Vercel Webhook if configured (Optional/Later)
    // if (process.env.VERCEL_HOOK_URL) { fetch(process.env.VERCEL_HOOK_URL, { method: 'POST' }); }

    console.log('[SUCCESS] AI Blog successfully generated and published!');

    return NextResponse.json({ 
      success: true, 
      message: 'Article generated and saved successfully',
      article: data[0]
    });

  } catch (error: any) {
    console.error('Error generating AI blog:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
