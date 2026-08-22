import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { classifyIntent, searchKnowledgeBase, getConversationHistory, generateSDRResponse, extractContactInfo, generateLeadSummary } from '@/lib/ai-sdr';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
);

export async function POST(req: Request) {
  try {
    const { sessionId, message } = await req.json();

    if (!sessionId || !message) {
      return NextResponse.json({ success: false, error: "Missing sessionId or message" }, { status: 400 });
    }

    // 1. Save User Message to DB
    const { error: insertUserErr } = await supabase.from('chat_messages').insert([
      { session_id: sessionId, role: 'user', content: message }
    ]);
    if (insertUserErr) console.error("Error saving user message:", insertUserErr);

    // 2. Classify Intent
    const intent = await classifyIntent(message);
    console.log(`[AI-SDR API] Intent: ${intent}`);

    // 3. Get RAG Context if applicable
    let context = "";
    if (intent === 'INFO_SEEKING' || intent === 'READY_TO_HIRE') {
      context = await searchKnowledgeBase(message);
    }

    // 4. Get History
    const history = await getConversationHistory(sessionId);

    // 5. Check if user provided contact info (Lead Capture Trigger) FIRST
    const contactCheck = extractContactInfo(message);

    // 6. Generate AI Response (passing the capture flag)
    const aiResponseText = await generateSDRResponse(message, context, history, intent, contactCheck.hasContact);

    // 7. Save AI Message to DB
    const { error: insertAiErr } = await supabase.from('chat_messages').insert([
      { session_id: sessionId, role: 'assistant', content: aiResponseText }
    ]);
    if (insertAiErr) console.error("Error saving AI message:", insertAiErr);

    // 8. If contact was detected, fire the background Lead Capture API
    if (contactCheck.hasContact) {
      console.log(`[AI-SDR] 🎯 CONTACT INFO DETECTED! Triggering Lead Capture.`);
      
      // Get the full history including this new message to summarize
      const fullHistoryForSummary = history + `\nVisitor: ${message}`;
      const querySummary = await generateLeadSummary(fullHistoryForSummary);

      // Call the internal CRM Capture API
      const port = process.env.PORT || 3000;
      fetch(`http://localhost:${port}/api/admin/crm/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          phone: contactCheck.phone,
          email: contactCheck.email,
          querySummary,
          name: "Website Visitor" // Can be improved later if name extraction is added
        })
      }).catch(err => console.error("Lead capture failed:", err));
    }

    return NextResponse.json({ 
      success: true, 
      text: aiResponseText,
      intent 
    });

  } catch (error: any) {
    console.error(`[Chat Message API] Error:`, error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
