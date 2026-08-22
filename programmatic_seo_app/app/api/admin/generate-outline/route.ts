import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { geminiClient, geminiModelConfig } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gapId } = body;

    if (!gapId) {
      return NextResponse.json({ error: 'gapId is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy';
    
    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: 'Supabase credentials missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Part 3.1: Data Retrieval Logic
    console.log(`[Generate Outline] Fetching gap record ${gapId} from Supabase...`);
    const { data: gapRecord, error: dbError } = await supabase
      .from('content_gaps')
      .select('*')
      .eq('id', gapId)
      .single();

    if (dbError || !gapRecord) {
      console.error('[Generate Outline] Record not found or DB Error:', dbError);
      return NextResponse.json({ error: 'Gap record not found' }, { status: 404 });
    }

    console.log(`[Generate Outline] Successfully retrieved keywords for: ${gapRecord.target_keyword}`);

    // Part 3.2: Intent Classification Guardrails
    const intent = gapRecord.search_intent || 'informational';
    let intentGuardrails = "";
    
    if (intent === 'transactional' || intent === 'navigational') {
      intentGuardrails = `
        GUARDRAIL: The user has a transactional intent (ready to buy/book). 
        You MUST include specific H2/H3 sections focusing on: 
        - Services offered & Process
        - Pricing / Cost expectations
        - Trust signals (Why Choose Us, Testimonials)
        - Clear Call to Action (Booking an appointment)
      `;
    } else {
      // Informational or mixed
      intentGuardrails = `
        GUARDRAIL: The user has an informational intent (looking to learn).
        You MUST include specific H2/H3 sections focusing on:
        - Definitions and clear explanations (What is it?)
        - Causes, Symptoms, or Benefits
        - Step-by-step guides or tips
        - When to seek professional help
      `;
    }
    
    console.log(`[Generate Outline] Guardrail set for intent: ${intent}`);

    // Part 3.3: SEO Outline Prompt Engineering
    const missingEntities = gapRecord.missing_entities || [];
    const missingLsi = gapRecord.missing_lsi || [];
    const keyword = gapRecord.target_keyword;

    const aiPrompt = `
      You are an expert SEO Content Strategist.
      Your task is to create a highly optimized, comprehensive SEO outline (H2 and H3 tags only).
      
      Target Keyword: "${keyword}"
      
      You MUST logically distribute and include these highly important missing entities and LSI keywords across the headings:
      Missing Entities: ${missingEntities.join(", ")}
      LSI Keywords: ${missingLsi.join(", ")}
      
      ${intentGuardrails}
      
      CRITICAL INSTRUCTIONS:
      - Do NOT write the actual article content or paragraphs.
      - Output ONLY a rigid JSON array representing the hierarchy.
      - Ensure the flow makes logical sense for a reader.
    `;

    // Part 3.5: Gemini API Execution
    console.log(`[Generate Outline] Sending prompt to Gemini...`);
    const response = await geminiClient.models.generateContent({
        model: geminiModelConfig.model,
        contents: aiPrompt,
        config: {
            responseMimeType: 'application/json'
        }
    });

    const responseText = response.text || "{}";
    let generatedOutline = [];

    try {
      const parsedData = JSON.parse(responseText);
      // Depending on how Gemini wraps it, it might be { outline: [...] } or just [...]
      generatedOutline = parsedData.outline || parsedData;
      console.log(`[Generate Outline] Successfully generated an outline with ${generatedOutline.length} headings.`);
    } catch (parseError) {
      console.error(`[Generate Outline] Failed to parse JSON from Gemini:`, parseError);
      throw new Error('AI returned malformed JSON');
    }

    // Part 3.6 & 3.7: Database Persistence & Writer Trigger State
    console.log(`[Generate Outline] Saving outline to database for gapId: ${gapId}...`);
    const { error: updateError } = await supabase
      .from('content_gaps')
      .update({ 
          generated_outline: generatedOutline,
          status: 'ready_for_writer' // Tool 7 hand-off trigger
      })
      .eq('id', gapId);

    if (updateError) {
      console.error(`[Generate Outline] Failed to save outline to DB:`, updateError);
      throw new Error(`Database update failed: ${updateError.message}`);
    }
    console.log(`[Generate Outline] Outline saved successfully.`);

    // We will stop here. Next part will handle updating the state for Tool 7.
    
    return NextResponse.json({
      success: true,
      message: 'Outline generated and saved to DB successfully',
      keyword: keyword,
      outlineSize: generatedOutline.length
    });

  } catch (error: any) {
    console.error('[Generate Outline] Fatal Error:', error);
    return NextResponse.json(
      { error: 'Failed to process outline generation', details: error.message },
      { status: 500 }
    );
  }
}
