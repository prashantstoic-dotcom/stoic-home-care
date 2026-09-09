import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendAdminAlert } from '@/lib/email';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
);

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

    // 2. Send Email via Nodemailer (sendAdminAlert)
    const finalSubject = override_subject || pitch.subject_line;
    const finalBody = override_body || pitch.pitch_body;

    console.log(`[Dispatcher] Sending pitch email...`);
    await sendAdminAlert(`PR Pitch: ${finalSubject}`, finalBody, pitch.suggested_sender_email);

    // 3. Update DB with Sent Status
    console.log(`[Dispatcher] Email sent!`);
    const { error: updateError } = await supabase
      .from('pr_pitches')
      .update({ 
        status: 'sent', 
        sent_at: new Date().toISOString()
      })
      .eq('id', pitch_id);

    if (updateError) {
      console.error("[Dispatcher] Warning: Email sent but failed to update DB:", updateError);
    }

    return NextResponse.json({ success: true, message: "Pitch sent successfully" });

  } catch (error: any) {
    console.error(`[Dispatcher] Error: `, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
