import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateOmnichannelContent, buildVisualPromptGenerator } from '@/lib/gemini';
import { generateSocialImage } from '@/lib/replicate';
import { persistSocialImage } from '@/lib/storage';
// Assume model is configured in gemini.ts and we could export it, but for simplicity we'll just run it here if needed, 
// actually we should just import the GoogleGenerativeAI client here or add buildVisualPromptGenerator to gemini.ts and execute it here.
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
);

export async function POST(req: Request) {
  try {
    const { blog_slug } = await req.json();

    if (!blog_slug) {
      return NextResponse.json({ success: false, error: "blog_slug is required." }, { status: 400 });
    }

    console.log(`[Social-Matrix] Starting multiplier for blog: ${blog_slug}`);

    // 1. Fetch the original published article
    const { data: blog, error: blogError } = await supabase
      .from('published_articles')
      .select('id, title, content')
      .eq('slug', blog_slug)
      .single();

    if (blogError || !blog) {
      throw new Error(`Could not find published article for slug: ${blog_slug}`);
    }

    // 2. Create a new Social Campaign tracker in the database
    const { data: campaign, error: campaignError } = await supabase
      .from('social_campaigns')
      .insert({
        blog_slug: blog_slug,
        status: 'generating',
        target_platforms: ['twitter', 'linkedin'] 
      })
      .select()
      .single();

    if (campaignError || !campaign) {
      throw new Error(`Failed to initialize social campaign: ${campaignError.message}`);
    }

    // 3. Generate Omnichannel Text (Twitter, LinkedIn, Email)
    console.log("[Social-Matrix] Generating text payloads...");
    const contentPayload = await generateOmnichannelContent(blog.title, blog.content);

    // 4. Generate Visual Asset
    console.log("[Social-Matrix] Generating visual prompt...");
    const visualPromptText = buildVisualPromptGenerator(blog.title);
    const visualPromptRes = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: visualPromptText }] }],
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const visualPromptStr = JSON.parse(visualPromptRes.response.text()).image_prompt;

    console.log("[Social-Matrix] Generating base image from Replicate...");
    const replicateBgUrl = await generateSocialImage(visualPromptStr);

    console.log("[Social-Matrix] Composing final OG image and uploading to Supabase...");
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const ogUrl = `${baseUrl}/api/og?title=${encodeURIComponent(blog.title)}&bg=${encodeURIComponent(replicateBgUrl)}`;
    
    const filename = `campaign_${campaign.id}_${Date.now()}.png`;
    const finalImageUrl = await persistSocialImage(ogUrl, filename);

    console.log("[Social-Matrix] Saving generated posts to Database...");
    
    // 5. Insert rows into social_posts table
    await supabase.from('social_posts').insert([
      {
        campaign_id: campaign.id,
        platform: 'twitter',
        content: JSON.stringify(contentPayload.twitterThread),
        image_url: finalImageUrl,
        status: 'draft'
      },
      {
        campaign_id: campaign.id,
        platform: 'linkedin',
        content: contentPayload.linkedinPost,
        image_url: finalImageUrl,
        status: 'draft'
      }
    ]);

    // 6. Update campaign status
    await supabase.from('social_campaigns').update({ status: 'review_ready' }).eq('id', campaign.id);

    return NextResponse.json({
      success: true,
      message: "Social campaign successfully generated and assets saved.",
      campaign_id: campaign.id
    });

  } catch (error: any) {
    console.error(`[Social-Matrix] Generate Error:`, error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
