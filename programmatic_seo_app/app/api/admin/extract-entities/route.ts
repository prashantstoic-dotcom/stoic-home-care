import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { url, content } = await request.json();

    if (!url && !content) {
      return NextResponse.json({ error: 'Missing competitor URL or content' }, { status: 400 });
    }

    console.log(`[CONTENT GAP ENGINE] Extracting entities for Content Gap analysis...`);

    let textToAnalyze = content;

    // If URL is provided instead of raw HTML/text, we fetch it
    if (url && !content) {
      const response = await fetch(url);
      const html = await response.text();
      // Extremely basic text extraction. In production, use JSDOM or Cheerio.
      textToAnalyze = html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 15000); 
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const prompt = `
      You are an expert SEO Entity Extractor. 
      Analyze the following competitor content and extract the top 15 most important NLP entities (Nouns, Concepts, Medical Terms, Locations).
      
      Format the response STRICTLY as a JSON array of objects, with NO markdown formatting, NO backticks, NO \`\`\`json.
      Each object should have:
      - "name": the entity name
      - "type": the entity type (e.g., "MEDICAL_TERM", "LOCATION", "CONCEPT")
      - "relevance": a score from 0.0 to 1.0 indicating how important it is to the core topic.

      Competitor Content:
      "${textToAnalyze.substring(0, 10000)}" // Limiting to 10k chars for safety
    `;

    const result = await model.generateContent(prompt);
    let jsonText = result.response.text().trim();
    
    // Clean up markdown block if Gemini accidentally wraps it
    jsonText = jsonText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '');

    const entities = JSON.parse(jsonText);

    return NextResponse.json({
      success: true,
      entities
    });

  } catch (error: any) {
    console.error('Error extracting entities:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
