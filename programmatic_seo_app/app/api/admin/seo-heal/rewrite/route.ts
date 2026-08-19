import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildSEOHealerContentPrompt, SEOHealSchema } from '@/lib/gemini';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // Part 9.4.2: Data Fetch (Finding a page ready for AI)
    const { data: logs, error } = await supabase
      .from('seo_decay_logs')
      .select('*, page:seo_pages(*)')
      .eq('status', 'ready_for_ai')
      .order('detected_at', { ascending: true })
      .limit(1);

    if (error) {
      console.error("Error fetching decay logs:", error);
      throw new Error("Database error while fetching decay logs.");
    }
    
    if (!logs || logs.length === 0) {
      return NextResponse.json({ success: true, message: "No pages waiting for AI rewrite right now." });
    }

    const log = logs[0];
    const targetKeyword = log.page?.target_keyword;
    const url = log.page?.url;
    
    if (!url || !targetKeyword) {
      throw new Error(`Invalid page data for log id ${log.id}`);
    }

    // Extract slug from URL (e.g., https://site.com/blog/my-slug -> my-slug)
    const slug = url.split('/').filter(Boolean).pop();

    if (!slug) {
      throw new Error("Could not extract slug from URL.");
    }

    // Fetch original blog content
    const { data: originalBlog, error: blogError } = await supabase
      .from('published_articles') 
      .select('*')
      .eq('slug', slug)
      .single();

    if (blogError || !originalBlog) {
      throw new Error(`Original blog not found for slug: ${slug} in published_articles table.`);
    }

    // Fetch the SERP Snapshot (Gap Report)
    const { data: snapshot } = await supabase
      .from('serp_snapshots')
      .select('*')
      .eq('decay_log_id', log.id)
      .order('analyzed_at', { ascending: false })
      .limit(1)
      .single();

    if (!snapshot) {
      throw new Error("No SERP snapshot found. Cannot perform intelligent rewrite.");
    }

    console.log(`[SEO-Healer] Context gathered for: ${targetKeyword}`);
    const missingTopics = snapshot.extracted_headings?._recommended_topics || [];

    // Lock the log so multiple workers don't rewrite the same page
    await supabase.from('seo_decay_logs')
      .update({ status: 'healing_in_progress' })
      .eq('id', log.id);

    // Part 9.4.6: Gemini Trigger & Critic Agent
    const prompt = buildSEOHealerContentPrompt(
      targetKeyword, 
      originalBlog.content, 
      missingTopics, 
      originalBlog.title || targetKeyword
    );

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    console.log(`[SEO-Healer] Calling Gemini AI for surgical rewrite...`);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse using Zod
    const parsedJson = JSON.parse(responseText);
    const validation = SEOHealSchema.safeParse(parsedJson);

    if (!validation.success) {
      // Revert the lock if AI fails format
      await supabase.from('seo_decay_logs').update({ status: 'ready_for_ai' }).eq('id', log.id);
      throw new Error(`AI generated invalid schema: ${validation.error.message}`);
    }

    const aiOutput = validation.data;

    // Critic Agent (Regex Validation)
    const keywordRegex = new RegExp(targetKeyword, 'i');
    if (!keywordRegex.test(aiOutput.healed_content) && !keywordRegex.test(aiOutput.optimized_title)) {
       // Revert lock
       await supabase.from('seo_decay_logs').update({ status: 'ready_for_ai' }).eq('id', log.id);
       throw new Error("Critic Agent Rejected: The AI removed the core target keyword. Aborting save.");
    }

// Needs revalidatePath import at the top. Let's do that in a separate call or replace the whole file. Actually, I can just replace the bottom logic first.
    // Part 9.5.1: DB Action (Auto-Update Original Blog)
    const { error: updateError } = await supabase
      .from('published_articles')
      .update({
        title: aiOutput.optimized_title,
        content: aiOutput.healed_content
        // Note: if you have a meta_description column, you can update it here.
      })
      .eq('slug', slug);

    if (updateError) {
      throw new Error(`Failed to update published_articles: ${updateError.message}`);
    }

    // Mark as fully healed
    await supabase.from('seo_decay_logs')
      .update({ status: 'healed' })
      .eq('id', log.id);

    // Reset baseline in tracking table
    await supabase.from('seo_pages')
      .update({ status: 'healed', baseline_clicks: 0, baseline_position: 0 })
      .eq('id', log.page_id);

    // Part 9.5.2: Next.js Revalidation (Zero-Lag)
    const { revalidatePath } = require('next/cache');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/blog');

    // Part 9.5.3: Ping Google Indexing API
    const siteUrl = process.env.GSC_SITE_URL || "https://example.com";
    const fullPageUrl = `${siteUrl.replace(/\/$/, '')}/blog/${slug}`;
    
    // Fire and forget (don't await so we don't slow down the response)
    pingGoogleIndexingAPI(fullPageUrl).catch(console.error);

    return NextResponse.json({ 
      success: true, 
      message: "AI Surgery complete. Content published, revalidated, and pinged Google.",
      slug,
      aiOutput,
      missing_topics: missingTopics
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Helper: Ping Google Indexing API
async function pingGoogleIndexingAPI(urlToUpdate: string) {
  try {
    const base64Key = process.env.GCP_GSC_SERVICE_ACCOUNT_BASE64;
    if (!base64Key) return;

    const credentials = JSON.parse(Buffer.from(base64Key, 'base64').toString('utf-8'));

    const { google } = require('googleapis');
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({
      version: 'v3',
      auth: auth,
    });

    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: urlToUpdate,
        type: 'URL_UPDATED' 
      }
    });

    console.log(`[SEO-Healer] Google Indexing Ping sent for ${urlToUpdate}. Status:`, res.status);
  } catch (err: any) {
    console.error(`[SEO-Healer] Google Indexing API failed for ${urlToUpdate}:`, err.message);
  }
}
