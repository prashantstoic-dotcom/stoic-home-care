import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

// Note: In production, you would wrap this with verifySignature to ensure ONLY QStash can call this endpoint.
// For now, we'll keep it simple and focus on the fetch logic.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keyword, url } = body; 
    
    // If URL is not provided in the payload, we would theoretically search Google for the keyword first.
    // For Part 1.2, we assume the URL to scrape is provided (or we test with a hardcoded one).
    const targetUrl = url || 'https://example.com'; // Placeholder for testing

    if (!targetUrl) {
      return NextResponse.json({ error: 'Target URL is required' }, { status: 400 });
    }

    console.log(`[QStash Worker] Starting scrape for URL: ${targetUrl}`);

    // 1. Fetch HTML with custom headers to prevent basic bot-blocks
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      // Timeout logic is implicitly handled by Vercel limits, but fetch could hang.
      // We rely on standard fetch behavior here.
    });

    // 2. Handle 429 Too Many Requests (Crucial for Exponential Backoff)
    if (response.status === 429) {
      console.warn(`[QStash Worker] Rate limited (429) by ${targetUrl}. Triggering QStash retry.`);
      // Returning 429/500 tells QStash this attempt failed, so it will wait and retry (Exponential Backoff).
      return NextResponse.json({ error: 'Rate limited by target' }, { status: 429 });
    }

    // 3. Handle other blocks (403 Forbidden)
    if (!response.ok) {
       console.warn(`[QStash Worker] Blocked or error (${response.status}) by ${targetUrl}. Triggering QStash retry.`);
       return NextResponse.json({ error: `Failed to fetch: ${response.statusText}` }, { status: response.status });
    }

    // 4. Extract raw HTML
    const html = await response.text();
    
    // 5. Load into Cheerio
    const $ = cheerio.load(html);
    
    // 5.1. HTML Sanitization (Remove non-content elements)
    console.log(`[QStash Worker] Sanitizing HTML...`);
    $('script, style, noscript, iframe, svg, img, video, audio, header, footer, nav, aside').remove();
    
    // For Part 1.3, we verify Cheerio loaded and sanitized it by getting the title
    const pageTitle = $('title').text();
    console.log(`[QStash Worker] Successfully sanitized HTML. Title: ${pageTitle}`);

    // 5.2. Targeted Extraction Logic (Extract H1, H2, H3, P)
    console.log(`[QStash Worker] Extracting core content...`);
    let extractedText = '';
    
    // We select heading and paragraphs, and for each, we grab the raw text.
    // This strips away spans, strong tags, and gives us pure text sentences.
    $('h1, h2, h3, p').each((i, el) => {
      const textChunk = $(el).text().trim();
      if (textChunk.length > 20) { // Skip very short UI words like "Menu", "Home"
        extractedText += textChunk + '\n\n';
      }
    });

    console.log(`[QStash Worker] Extracted ${extractedText.length} characters of pure SEO text.`);

    // 5.3. Save to Supabase Temporary Storage (Part 1.5)
    // We assume NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are in env
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      console.log(`[QStash Worker] Saving extracted text to Supabase...`);
      
      const { error: dbError } = await supabase
        .from('scraped_competitors_temp')
        .insert([{
           keyword: keyword || 'test_keyword',
           url: targetUrl,
           extracted_text: extractedText,
           created_at: new Date().toISOString()
        }]);
        
      if (dbError) {
        console.error('[QStash Worker] Supabase Insert Error:', dbError);
        // We throw to trigger a QStash retry if DB goes down
        throw new Error(`Database save failed: ${dbError.message}`);
      }
      console.log(`[QStash Worker] Successfully saved to Supabase.`);
    } else {
      console.warn(`[QStash Worker] Supabase credentials missing. Skipping DB save for local dev.`);
    }

    return NextResponse.json({
      success: true,
      message: 'HTML fetched, sanitized, extracted, and saved to DB',
      title: pageTitle,
      textLength: extractedText.length
    });

  } catch (error: any) {
    console.error('[QStash Worker] Fetch Error:', error);
    // Returning 500 triggers QStash retry for generic network failures
    return NextResponse.json(
      { error: 'Internal scraping error', details: error.message },
      { status: 500 }
    );
  }
}
