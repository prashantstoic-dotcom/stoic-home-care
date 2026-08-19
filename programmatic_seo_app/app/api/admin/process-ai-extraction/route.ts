import { NextResponse } from 'next/server';
import { geminiClient, KeywordExtractionSchema, geminiModelConfig } from '@/lib/gemini';
import { chunkTextForAI } from '@/lib/chunking';
import { createClient } from '@supabase/supabase-js';

// Convert Zod schema to a format Gemini expects if using standard JSON schema
// In a real production app, @google/genai accepts standard JSON Schema. 
// We will instruct it purely via prompt + responseMimeType to enforce JSON output.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keyword, recordId } = body; // recordId points to the scraped_competitors_temp table

    if (!recordId) {
      return NextResponse.json({ error: 'recordId is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Fetch the raw extracted text from Supabase
    const { data: record, error: dbError } = await supabase
      .from('scraped_competitors_temp')
      .select('extracted_text')
      .eq('id', recordId)
      .single();

    if (dbError || !record) {
      console.error('[AI Extraction] DB Error:', dbError);
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    const rawText = record.extracted_text;

    // 2. Chunk the text (Part 2.2)
    const chunks = chunkTextForAI(rawText, 8000);
    console.log(`[AI Extraction] Processing ${chunks.length} chunks for record ${recordId}`);

    let combinedEntities = new Set<string>();
    let combinedLsi = new Set<string>();
    let finalIntent = "informational";

    // 3. Process each chunk (Part 2.3 Prompt Engineering)
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      
      const prompt = `
        You are an expert SEO entity extractor. Read the following text chunk from a competitor's page targeting the keyword: "${keyword}".
        Extract the primary service entities and LSI keywords. 
        Determine the search intent.
        
        CRITICAL RULE: Return ONLY a valid JSON object. Do not include markdown code blocks like \`\`\`json. Do not include conversational text.
        
        The JSON object MUST perfectly match this structure:
        {
          "primaryEntities": ["Entity1", "Entity2"],
          "lsiKeywords": ["Keyword1", "Keyword2"],
          "searchIntent": "informational" // or transactional, navigational, mixed
        }

        Here is the text chunk:
        ---
        ${chunk}
        ---
      `;

      try {
        const response = await geminiClient.models.generateContent({
            model: geminiModelConfig.model,
            contents: prompt,
            config: geminiModelConfig.config // contains responseMimeType: 'application/json'
        });

        const responseText = response.text || "{}";
        const parsedResponse = JSON.parse(responseText);

        // Merge results
        if (parsedResponse.primaryEntities) {
            parsedResponse.primaryEntities.forEach((e: string) => combinedEntities.add(e));
        }
        if (parsedResponse.lsiKeywords) {
            parsedResponse.lsiKeywords.forEach((k: string) => combinedLsi.add(k));
        }
        if (parsedResponse.searchIntent) {
            finalIntent = parsedResponse.searchIntent;
        }

      } catch (aiError) {
        console.error(`[AI Extraction] Failed to process chunk ${i}:`, aiError);
        // We log and continue so one bad chunk doesn't destroy the whole job
      }
    }

    // 4. Database Mapping (Part 2.4): Compare against our existing content
    console.log(`[AI Extraction] Mapping against existing database keywords for: ${keyword}`);
    
    // Fetch our existing keywords for this topic (simulated table 'our_seo_pages')
    const { data: ourPage, error: mapError } = await supabase
      .from('seo_pages')
      .select('targeted_keywords, lsi_keywords')
      .eq('focus_keyword', keyword)
      .maybeSingle(); // maybeSingle because we might not have a page for this keyword yet

    let missingEntities: string[] = [];
    let missingLsi: string[] = [];
    let gapScore = 0;

    const competitorEntities = Array.from(combinedEntities);
    const competitorLsi = Array.from(combinedLsi);

    if (ourPage) {
      // We have a page, let's find what we are missing
      const ourKeywordsStr = ((ourPage.targeted_keywords || '') + ' ' + (ourPage.lsi_keywords || '')).toLowerCase();
      
      missingEntities = competitorEntities.filter(e => !ourKeywordsStr.includes(e.toLowerCase()));
      missingLsi = competitorLsi.filter(k => !ourKeywordsStr.includes(k.toLowerCase()));
    } else {
      // We don't even have a page for this keyword! Everything is missing.
      missingEntities = competitorEntities;
      missingLsi = competitorLsi;
    }

    // 4.1 Calculate Mathematical Gap Score (Part 2.5)
    if (competitorEntities.length > 0) {
      gapScore = Math.round((missingEntities.length / competitorEntities.length) * 100);
    } else if (competitorLsi.length > 0) {
      gapScore = Math.round((missingLsi.length / competitorLsi.length) * 100);
    }

    // 5. Save the final Missing Gaps to the database
    const { error: saveError } = await supabase
      .from('content_gaps')
      .insert([{
         target_keyword: keyword,
         competitor_url: record.url || 'unknown',
         missing_entities: missingEntities,
         missing_lsi: missingLsi,
         gap_score: gapScore,
         search_intent: finalIntent,
         status: 'pending_writer',
         created_at: new Date().toISOString()
      }]);

    if (saveError) {
      console.error('[AI Extraction] Failed to save content gap:', saveError);
    }

    const resultJson = {
        totalCompetitorEntities: competitorEntities.length,
        missingEntitiesCount: missingEntities.length,
        gapScore: gapScore,
        missingEntities,
        searchIntent: finalIntent
    };

    console.log(`[AI Extraction] Gap Analysis Complete (Score: ${gapScore}%):`, resultJson);

    return NextResponse.json({
      success: true,
      message: 'AI extracted entities and database mapping completed.',
      data: resultJson
    });

  } catch (error: any) {
    console.error('[AI Extraction] Critical Error:', error);
    // Returning 500 triggers QStash retry
    return NextResponse.json(
      { error: 'AI processing failed', details: error.message },
      { status: 500 }
    );
  }
}
