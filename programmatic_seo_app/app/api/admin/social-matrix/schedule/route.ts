import { NextResponse } from 'next/server';
import { Client } from "@upstash/qstash";

// Initialize QStash Client
const qstash = new Client({ token: process.env.QSTASH_TOKEN! });

export async function POST(req: Request) {
  try {
    // Get the post ID and the timestamp when it should be published
    const { post_id, publish_timestamp } = await req.json();

    if (!post_id || !publish_timestamp) {
      return NextResponse.json({ success: false, error: "post_id and publish_timestamp are required." }, { status: 400 });
    }

    // The URL of our own webhook that QStash will call when it's time
    // (We will build the /publish webhook in Part 10.4.4)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
    const publishUrl = `${baseUrl}/api/admin/social-matrix/publish`;

    // Schedule the message using QStash
    const res = await qstash.publishJSON({
      url: publishUrl,
      body: { post_id },
      notBefore: Math.floor(publish_timestamp / 1000) // QStash expects Unix timestamp in seconds
    });

    console.log(`[Scheduler] Post ${post_id} scheduled via QStash. Message ID: ${res.messageId}`);

    // In a full implementation, we'd also update the database status to 'scheduled' here.

    return NextResponse.json({
      success: true,
      message: "Post successfully scheduled in QStash.",
      messageId: res.messageId
    });

  } catch (error: any) {
    console.error(`[Scheduler] Error:`, error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
