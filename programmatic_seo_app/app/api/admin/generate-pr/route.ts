import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { journalist, publication, topic, query } = await request.json();

    if (!journalist || !publication || !topic || !query) {
      return NextResponse.json({ error: 'Missing required PR fields' }, { status: 400 });
    }

    console.log(`[PR ENGINE] Drafting pitch for ${journalist} at ${publication}...`);

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY missing' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });

    const prompt = `
      You are a Senior Healthcare Executive at Stoic Home Care.
      A journalist from ${publication} is looking for an expert quote on: "${topic}"
      Their exact query is: "${query}"
      
      Write a short, highly professional, non-spammy email pitch answering their query. 
      Provide a unique, expert insight that they can directly quote in their article. 
      Keep it under 150 words. Format it as a direct email to the journalist.
    `;

    const result = await model.generateContent(prompt);
    const pitch = result.response.text();

    return NextResponse.json({
      success: true,
      data: {
        journalist,
        publication,
        topic,
        pitch
      }
    });

  } catch (error: any) {
    console.error('Error generating PR pitch:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
