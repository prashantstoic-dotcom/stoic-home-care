import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// Using a fast model for classification
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export type UserIntent = 'GREETING' | 'INFO_SEEKING' | 'READY_TO_HIRE' | 'IRRELEVANT';

export async function classifyIntent(userMessage: string): Promise<UserIntent> {
  const prompt = `
  You are an expert sales intent classifier for a Home Care Agency software.
  Analyze the following user message and classify their intent into EXACTLY one of these four categories:
  
  - GREETING: Simple hellos, hi, good morning.
  - INFO_SEEKING: Asking questions about services, pricing, how it works, features, or general info.
  - READY_TO_HIRE: Showing clear intent to purchase, sign up, talk to sales, giving phone numbers, or asking to start.
  - IRRELEVANT: Anything not related to business software or home care.

  User Message: "${userMessage}"
  
  Return ONLY the exact category name (e.g. INFO_SEEKING) without any markdown or quotes.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim().toUpperCase();
    
    // Strict validation
    if (['GREETING', 'INFO_SEEKING', 'READY_TO_HIRE', 'IRRELEVANT'].includes(text)) {
      return text as UserIntent;
    }
    
    // Fallback if AI hallucinates
    return 'INFO_SEEKING';
  } catch (error) {
    console.error("[Intent Classifier] Error:", error);
    return 'INFO_SEEKING'; // Default safe fallback
  }
}

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase for Knowledge Base lookup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function searchKnowledgeBase(userQuery: string): Promise<string> {
  try {
    // Basic formatting for Postgres Full Text Search (removing special chars and joining with OR/AND)
    const searchQuery = userQuery.replace(/[^a-zA-Z0-9\s]/g, '').split(' ').filter(w => w.length > 3).join(' | ');
    
    if (!searchQuery) return "";

    const { data, error } = await supabase
      .from('published_articles')
      .select('title, content')
      .textSearch('content', searchQuery)
      .limit(2);

    if (error || !data || data.length === 0) {
      return "";
    }

    // Combine the top 2 articles into a context string
    let contextStr = "Here is some internal company knowledge that might help answer the user:\n\n";
    data.forEach((article, index) => {
      // Taking a snippet of the content to save tokens (first 500 chars)
      const snippet = article.content.substring(0, 500); 
      contextStr += `[Article ${index + 1}: ${article.title}]\n${snippet}...\n\n`;
    });

    return contextStr;
  } catch (error) {
    console.error("[Knowledge Base Search] Error:", error);
    return "";
  }
}

// Add this new function to fetch history
export async function getConversationHistory(sessionId: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(6); // Get last 6 to give good context (3 turns)

    if (error || !data || data.length === 0) {
      return "";
    }

    // Since we ordered descending to get the latest, we need to reverse it to chronological order
    data.reverse();

    let historyStr = "=== RECENT CONVERSATION HISTORY ===\n";
    data.forEach(msg => {
      const speaker = msg.role === 'user' ? 'Visitor' : 'You (AI SDR)';
      historyStr += `${speaker}: ${msg.content}\n`;
    });
    historyStr += "===================================\n";

    return historyStr;
  } catch (error) {
    console.error("[Memory Manager] Error:", error);
    return "";
  }
}

// A core prompt that defines the SDR's personality
const BASE_SDR_PROMPT = `
You are a highly empathetic, professional, and friendly Sales Development Representative for a Home Care Agency software company.
Your goal is to help visitors understand the service, build trust, and ultimately encourage them to leave their contact details so a human sales rep can call them.

[CONVERSATION RULES]
- Be concise. Never write long essays. Keep responses to 2-3 short sentences.
- Be empathetic. Acknowledge their needs (e.g., "I understand taking care of a loved one can be stressful").
- NEVER invent facts. If you don't know the answer, say you don't know but a specialist can call them.

[CRITICAL SAFETY GUARDRAILS - DO NOT VIOLATE]
1. NO MEDICAL ADVICE: You are a software/sales rep, NOT a doctor or nurse. If a user asks for medical diagnoses, medication recommendations, or emergency help, you MUST strictly decline and advise them to call 911 or consult a licensed physician immediately.
2. NO PRICING PROMISES: You can state starting prices if provided in the context, but NEVER guarantee a final price. Always say a care coordinator will provide a customized quote.
3. PROFESSIONAL TONE: Do not engage in arguments, political discussions, or inappropriate topics. If asked, politely steer the conversation back to home care services.
`;

import { getCompanyFallbackContext } from './company-config';

export async function generateSDRResponse(
  userMessage: string, 
  knowledgeContext: string, 
  chatHistory: string = "", 
  intent: string = "INFO_SEEKING",
  isLeadCaptured: boolean = false
): Promise<string> {
  try {
    // If knowledgeContext is empty, we provide the centralized company profile
    const context = knowledgeContext || getCompanyFallbackContext();

    // Add a situational instruction based on Intent or Capture status
    let situationalPrompt = "";
    if (isLeadCaptured) {
      situationalPrompt = `
      [WRAP UP GOAL]
      The user just provided their contact information. 
      Politely thank them, confirm that a Care Coordinator will reach out to them very shortly, and warmly close the conversation. Do not ask any more questions.
      `;
    } else if (intent === 'READY_TO_HIRE') {
      situationalPrompt = `
      [URGENT GOAL]
      The user is showing strong intent to start services or talk to a human.
      Gently ask them to provide their Name and Phone Number right here in the chat so our Care Coordinator can call them ASAP.
      `;
    } else {
      situationalPrompt = `
      [ONGOING GOAL]
      Answer their question politely. If appropriate, gently ask if they would like a call from our team to discuss their specific situation.
      `;
    }

    const finalPrompt = `
    ${BASE_SDR_PROMPT}

    ${situationalPrompt}

    === KNOWLEDGE BASE (Use this to answer the user's question) ===
    ${context}
    ==============================================================

    ${chatHistory}

    Visitor's New Message: "${userMessage}"
    
    Write your empathetic, concise response:
    `;

    // Using the Pro model for the actual conversation as it has better reasoning and empathy
    const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await chatModel.generateContent(finalPrompt);
    
    return result.response.text().trim();
  } catch (error) {
    console.error("[SDR Generator] Error:", error);
    return "I'm having a little trouble connecting to my brain right now! Could you please leave your phone number so our team can reach out to you directly?";
  }
}

export function extractContactInfo(text: string): { phone: string | null, email: string | null, hasContact: boolean } {
  // Regex to catch most standard US/International phone number formats
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  
  // Regex to catch emails
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;

  const phoneMatches = text.match(phoneRegex);
  const emailMatches = text.match(emailRegex);

  const phone = phoneMatches ? phoneMatches[0] : null;
  const email = emailMatches ? emailMatches[0] : null;

  return {
    phone,
    email,
    hasContact: !!(phone || email)
  };
}

export async function generateLeadSummary(chatHistory: string): Promise<string> {
  const prompt = `
  You are an expert Sales Assistant. Read the following conversation history between a visitor and our AI SDR.
  Write a concise 1-2 sentence summary of what the visitor needs, their pain points, and any specific services they asked for.
  This summary is for our human sales rep who is about to call them. Be extremely brief and direct.

  ${chatHistory}
  `;

  try {
    const summaryModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use flash for speed
    const result = await summaryModel.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("[Lead Summarizer] Error:", error);
    return "User inquired about home care services and provided contact details.";
  }
}


