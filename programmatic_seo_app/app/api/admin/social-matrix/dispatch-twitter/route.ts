import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getTwitterClient } from '@/lib/twitter';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { post_id } = await req.json();

    if (!post_id) {
      return NextResponse.json({ success: false, error: "post_id is required." }, { status: 400 });
    }

    console.log(`[Dispatcher] Initiating Twitter post for ID: ${post_id}`);

    // 1. Fetch post details from Supabase
    const { data: post, error } = await supabase
      .from('social_posts')
      .select('*')
      .eq('id', post_id)
      .single();

    if (error || !post || post.platform !== 'twitter') {
      throw new Error("Invalid post or post is not intended for Twitter.");
    }

    if (post.status === 'published') {
      return NextResponse.json({ success: true, message: "Post already published." });
    }

    // Parse the JSON array we generated earlier
    const thread: string[] = JSON.parse(post.content);
    
    // 2. Initialize Twitter Client
    const twitterClient = getTwitterClient();

    // 3. Construct the Thread payload
    const tweetPayload = thread.map(text => ({ text }));

    console.log(`[Dispatcher] Sending ${tweetPayload.length}-part thread to Twitter API...`);
    
    // 4. Fire to Twitter (Zero-Lag single request)
    const publishedThread = await twitterClient.v2.tweetThread(tweetPayload);
    
    // Get the ID of the first tweet in the thread to save it
    const externalId = publishedThread[0].data.id;

    // 5. Update Database status
    await supabase
      .from('social_posts')
      .update({ 
        status: 'published', 
        external_post_id: externalId,
        published_at: new Date().toISOString()
      })
      .eq('id', post_id);

    console.log(`[Dispatcher] Successfully published Twitter thread: ${externalId}`);

    return NextResponse.json({ success: true, external_post_id: externalId });

  } catch (error: any) {
    console.error(`[Dispatcher] Twitter Error:`, error.message);
    
    // Check if it's a Rate Limit (429) or Server Error (5xx)
    const isRateLimit = error.message.includes('429') || error.message.toLowerCase().includes('rate limit');
    
    if (isRateLimit) {
      console.log(`[Dispatcher] Rate limit hit. Telling QStash to retry later.`);
      return NextResponse.json({ success: false, error: "Rate limit hit, triggering retry." }, { status: 429 });
    }

    // Hard failure
    const body = await req.clone().json().catch(() => ({}));
    if (body.post_id) {
       await supabase.from('social_posts').update({ 
         status: 'failed',
         error_log: error.message 
       }).eq('id', body.post_id);
    }
    
    return NextResponse.json({ success: false, error: "Hard failure, marked in DB.", reason: error.message }, { status: 200 });
  }
}
