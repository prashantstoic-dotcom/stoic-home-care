import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Part 8.4.4: Webhooks Receiver Endpoint
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Resend webhooks always have a 'type' and 'data' payload
    const eventType = body.type; // e.g., "email.delivered", "email.opened", "email.clicked"
    const messageId = body.data?.email_id;

    if (!eventType || !messageId) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    console.log(`[PR Webhook] Received ${eventType} for Message ID: ${messageId}`);

    // Part 8.4.5: Parse events and update pr_pitches
    let newStatus = '';
    if (eventType === 'email.delivered') newStatus = 'delivered';
    else if (eventType === 'email.opened') newStatus = 'opened';
    else if (eventType === 'email.clicked') newStatus = 'clicked';
    else if (eventType === 'email.bounced') newStatus = 'bounced';

    if (newStatus) {
      const { error } = await supabase
        .from('pr_pitches')
        .update({ 
          status: newStatus,
        })
        .eq('email_message_id', messageId);

      if (error) {
        console.error(`[PR Webhook] Failed to update DB for ${messageId}: `, error);
        return NextResponse.json({ error: "DB Update Failed" }, { status: 500 });
      }
      console.log(`[PR Webhook] Successfully updated pitch status to ${newStatus}`);
    } else {
      console.log(`[PR Webhook] Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`[PR Webhook] Error: `, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
