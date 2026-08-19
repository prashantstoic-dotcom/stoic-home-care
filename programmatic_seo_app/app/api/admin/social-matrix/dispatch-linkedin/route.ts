import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { fetchLinkedInAPI, LINKEDIN_AUTHOR_URN } from '@/lib/linkedin';

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

    console.log(`[Dispatcher] Initiating LinkedIn post for ID: ${post_id}`);

    // 1. Fetch post details from Supabase
    const { data: post, error } = await supabase
      .from('social_posts')
      .select('*')
      .eq('id', post_id)
      .single();

    if (error || !post || post.platform !== 'linkedin') {
      throw new Error("Invalid post or post is not intended for LinkedIn.");
    }

    if (post.status === 'published') {
      return NextResponse.json({ success: true, message: "Post already published." });
    }

    // 2. Construct LinkedIn payload
    // We assume the blog URL was injected into the content string replacing [LINK]
    const linkedinPayload = {
      author: LINKEDIN_AUTHOR_URN,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: post.content
          },
          shareMediaCategory: "NONE" 
        }
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
      }
    };

    console.log(`[Dispatcher] Sending post to LinkedIn API...`);
    
    // 3. Fire to LinkedIn
    const response = await fetchLinkedInAPI('/ugcPosts', {
      method: 'POST',
      body: JSON.stringify(linkedinPayload)
    });
    
    const externalId = response?.id || 'unknown_id';

    // 4. Update Database status
    await supabase
      .from('social_posts')
      .update({ 
        status: 'published', 
        external_post_id: externalId,
        published_at: new Date().toISOString()
      })
      .eq('id', post_id);

    console.log(`[Dispatcher] Successfully published LinkedIn post: ${externalId}`);

    return NextResponse.json({ success: true, external_post_id: externalId });

  } catch (error: any) {
    console.error(`[Dispatcher] LinkedIn Error:`, error.message);
    
    // Check if it's a Rate Limit (429)
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
