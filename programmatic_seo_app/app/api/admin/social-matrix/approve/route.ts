import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { calculateQueueTimes } from '@/lib/scheduler-logic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
);

export async function POST(req: Request) {
  try {
    const { campaign_id } = await req.json();

    if (!campaign_id) {
      return NextResponse.json({ success: false, error: "campaign_id is required." }, { status: 400 });
    }

    // 1. Fetch Draft posts for this campaign
    const { data: posts, error } = await supabase
      .from('social_posts')
      .select('*')
      .eq('campaign_id', campaign_id)
      .eq('status', 'draft');

    if (error || !posts || posts.length === 0) {
      return NextResponse.json({ success: false, error: "No draft posts found for this campaign." });
    }

    // 2. Calculate schedule times
    const queueTimes = calculateQueueTimes(new Date());

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // 3. Send to QStash Scheduler sequentially
    for (const post of posts) {
      const publishTime = post.platform === 'twitter' ? queueTimes.twitter : queueTimes.linkedin;
      
      // Call our own internal scheduling endpoint
      const res = await fetch(`${baseUrl}/api/admin/social-matrix/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: post.id,
          publish_timestamp: publishTime
        })
      });

      if (!res.ok) {
         console.error(`[Approve] Failed to schedule post ${post.id}`);
         continue; // Try the next one even if one fails
      }

      // Update local status to scheduled
      await supabase.from('social_posts').update({ status: 'scheduled' }).eq('id', post.id);
    }

    // 4. Mark campaign as active
    await supabase.from('social_campaigns').update({ status: 'active' }).eq('id', campaign_id);

    return NextResponse.json({ success: true, message: "Campaign approved and queued!" });

  } catch (error: any) {
    console.error(`[Approve] Error:`, error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
