import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  try {
    const { sessionId, phone, email, querySummary, name } = await req.json();

    if (!sessionId || (!phone && !email)) {
      return NextResponse.json({ success: false, error: "Missing essential lead data" }, { status: 400 });
    }

    // Prepare contact info string
    const contactInfo = [phone, email].filter(Boolean).join(" | ");
    
    // We try to guess the name from context, or default to "Visitor"
    const leadName = name || "Website Visitor";
    const finalSummary = querySummary || "User showed intent to hire.";

    const { data, error } = await supabase
      .from('crm_leads')
      .insert([
        {
          session_id: sessionId,
          name: leadName,
          contact_info: contactInfo,
          query_summary: finalSummary,
          status: 'new'
        }
      ]);

    if (error) {
      console.error("[CRM Capture] DB Error:", error);
      return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }

    // Also update the chat_sessions table to mark it as 'lead_captured'
    await supabase.from('chat_sessions').update({ status: 'lead_captured' }).eq('id', sessionId);

    // ==========================================
    // NEW: Send Real-Time Email Alert to Admin
    // ==========================================
    try {
      await resend.emails.send({
        from: 'Leads <leads@prashantstoic.com>', // Use your verified domain
        to: 'hello@prashantstoic.com', // Admin Email
        subject: `🔥 HOT LEAD: ${leadName} is looking for care!`,
        html: `
          <h2>New Lead Captured by AI SDR</h2>
          <p><strong>Contact Info:</strong> ${contactInfo}</p>
          <p><strong>AI Summary:</strong></p>
          <blockquote>${finalSummary}</blockquote>
          <p><em>Call them immediately to secure the deal!</em></p>
        `
      });
      console.log(`[CRM Capture] Email alert sent to Admin.`);
    } catch (emailErr) {
      console.error(`[CRM Capture] Failed to send email alert:`, emailErr);
      // We don't fail the API if email fails, DB capture is more important.
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully!" });

  } catch (error: any) {
    console.error(`[CRM Capture] Server Error:`, error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
