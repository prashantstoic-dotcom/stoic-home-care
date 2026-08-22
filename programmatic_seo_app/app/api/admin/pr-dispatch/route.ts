import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
// Note: You will need to run `npm install resend` in the terminal later
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
);

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key_for_dev');

// Part 8.4.2: Dispatch API
export async function POST(req: Request) {
  try {
    const { pitch_id, override_subject, override_body } = await req.json();

    if (!pitch_id) {
      return NextResponse.json({ error: "pitch_id is required" }, { status: 400 });
    }

    console.log(`[Dispatcher] Preparing to send pitch: ${pitch_id}`);

    // 1. Fetch Pitch and related Opportunity
    const { data: pitch, error: pitchError } = await supabase
      .from('pr_pitches')
      .select('*, opportunity:pr_opportunities(*)')
      .eq('id', pitch_id)
      .single();

    if (pitchError || !pitch) {
      throw new Error("Pitch not found.");
    }

    if (pitch.status !== 'pending_review' && pitch.status !== 'approved') {
      throw new Error(`Cannot send pitch. Current status is: ${pitch.status}`);
    }

    const journalistEmail = "journalist@example.com"; // In real world, this comes from a contact database or HARO hidden reply-to. We mock it here.

    // 2. Part 8.4.1: Send Email via Resend
    console.log(`[Dispatcher] Sending email via Resend to ${journalistEmail}...`);
    const finalSubject = override_subject || pitch.subject_line;
    const finalBody = override_body || pitch.pitch_body;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `${pitch.opportunity.media_outlet} Pitch <${pitch.suggested_sender_email}>`, // e.g., Forbes Pitch <expert@domain.com>
      to: [journalistEmail],
      subject: finalSubject,
      html: finalBody, 
      replyTo: pitch.suggested_sender_email,
    });

    if (emailError) {
      throw new Error(`Resend API Error: ${emailError.message}`);
    }

    // 3. Update DB with Sent Status and Message ID
    console.log(`[Dispatcher] Email sent! Message ID: ${emailData?.id}`);
    const { error: updateError } = await supabase
      .from('pr_pitches')
      .update({ 
        status: 'sent', 
        email_message_id: emailData?.id,
        sent_at: new Date().toISOString()
      })
      .eq('id', pitch_id);

    if (updateError) {
      console.error("[Dispatcher] Warning: Email sent but failed to update DB:", updateError);
    }

    return NextResponse.json({ success: true, message_id: emailData?.id });

  } catch (error: any) {
    console.error(`[Dispatcher] Error: `, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
