import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

// Setup supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper: Fetch Top 5 URLs from Google Custom Search API
async function fetchTopCompetitors(keyword: string): Promise<string[]> {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_SEARCH_ENGINE_ID;
  
  if (!apiKey || !cx) {
    console.warn("[SEO-Heal] Google Search API keys missing, using mock competitor for testing.");
    return ["https://example.com/mock-competitor-article"]; 
  }

  try {
    const url = \`https://www.googleapis.com/customsearch/v1?key=\${apiKey}&cx=\${cx}&q=\${encodeURIComponent(keyword)}&num=5\`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (!data.items) return [];
    return data.items.map((item: any) => item.link);
  } catch (error) {
    console.error("[SEO-Heal] SERP Fetch Error:", error);
    return [];
  }
}

// Helper: Scrape H2 and H3 headings using Cheerio
async function scrapeHeadings(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } });
    if (!res.ok) return [];
    
    const html = await res.text();
    const $ = cheerio.load(html);
    const headings: string[] = [];
    
    $('h2, h3').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 5) headings.push(text);
    });
    
    return headings;
  } catch (error) {
    console.error(`[SEO-Heal] Scraping Error for ${url}:`, error);
    return [];
  }
}

// Helper: Text Analysis & Gap Detection (Part 9.3.5)
function analyzeHeadingGaps(extractedHeadings: Record<string, string[]>) {
  const wordFrequency: Record<string, number> = {};
  const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'and', 'a', 'to', 'in', 'of', 'for', 'with', 'how', 'what', 'why', 'are', 'can', 'you', 'your', 'best', 'guide']);

  const allHeadings = Object.values(extractedHeadings).flat();

  allHeadings.forEach(heading => {
    const words = heading.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    
    words.forEach((word) => {
      if (word.length > 3 && !stopWords.has(word)) {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      }
    });
  });

  // Sort and filter for words appearing at least twice (Part 9.3.6)
  return Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, count]) => count >= 2)
    .slice(0, 10)
    .map(([word]) => word);
}

export async function POST(req: Request) {
  try {
    // 1. Fetch the oldest 'needs_healing' page from decay logs
    const { data: logs, error } = await supabase
      .from('seo_decay_logs')
      .select('*, page:seo_pages(*)')
      .eq('status', 'needs_healing')
      .order('detected_at', { ascending: true })
      .limit(1);

    if (error) {
      console.error("Error fetching decay logs:", error);
      throw new Error("Database error while fetching decay logs.");
    }
    if (!logs || logs.length === 0) {
      return NextResponse.json({ success: true, message: "No pages need healing right now." });
    }

    const log = logs[0];
    const targetKeyword = log.page?.target_keyword;

    if (!targetKeyword) {
      throw new Error(`Missing target_keyword for page id ${log.page_id}`);
    }

    console.log(`[SEO-Heal] Starting analysis for keyword: "${targetKeyword}"`);

    // 2. Lock the row
    await supabase.from('seo_decay_logs')
      .update({ status: 'healing_in_progress' })
      .eq('id', log.id);

    // Part 9.3.3: Fetch Top 5 SERP URLs
    const competitorUrls = await fetchTopCompetitors(targetKeyword);
    
    // Part 9.3.4: Scrape Headings
    const extractedHeadings: Record<string, string[]> = {};
    
    for (const compUrl of competitorUrls) {
      const headings = await scrapeHeadings(compUrl);
      extractedHeadings[compUrl] = headings;
    }

    // Part 9.3.5 & 9.3.6: Analyze and Detect Gaps
    const recommendedTopics = analyzeHeadingGaps(extractedHeadings);

    // Save the Snapshot to DB
    await supabase.from('serp_snapshots').insert({
      decay_log_id: log.id,
      target_keyword: targetKeyword,
      competitor_urls: competitorUrls,
      extracted_headings: { ...extractedHeadings, _recommended_topics: recommendedTopics }
    });

    // Mark as ready for AI Healer
    await supabase.from('seo_decay_logs')
      .update({ status: 'ready_for_ai' })
      .eq('id', log.id);

    return NextResponse.json({ 
      success: true, 
      message: `Analysis complete. Found ${recommendedTopics.length} missing concepts.`,
      log_id: log.id,
      recommended_topics: recommendedTopics
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
