import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ==============================================================================
// PROJECT 7 (PART 3): AI Vector Search API
// Goal: Convert user query to vector and find the best matching pages in Supabase.
// ==============================================================================

import { SUPABASE_URL, SUPABASE_KEY } from '@/lib/supabase';

// 1. Initialize Supabase Admin Client (Requires Service Role Key for Vector Operations)
// We're using standard server env vars (or the fallback from lib/supabase if needed)
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Initialize Google Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Valid search query is required' }, { status: 400 });
    }

    // A. Generate Embedding for the Search Query using Gemini
    // We use the exact same model that we used to generate the page embeddings
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(query);
    const queryEmbedding = result.embedding.values;

    // B. Perform Vector Search via Supabase RPC (Cosine Similarity)
    // We call the 'match_page_embeddings' function we created in SQL
    const { data: matchedPages, error } = await supabase.rpc('match_page_embeddings', {
      query_embedding: queryEmbedding,
      match_threshold: 0.3, // 30% similarity minimum threshold
      match_count: 5,       // Return top 5 results
    });

    if (error) {
      console.error("❌ Supabase RPC Error:", error);
      return NextResponse.json({ error: 'Database search failed' }, { status: 500 });
    }

    // C. Return the AI matched results to the frontend
    return NextResponse.json({ 
      success: true, 
      query: query,
      matches: matchedPages 
    }, { status: 200 });

  } catch (error) {
    console.error("❌ Vector Search API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
