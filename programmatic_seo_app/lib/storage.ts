import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
);

/**
 * Downloads an image from a dynamic URL (like our OG route) and uploads it to Supabase Storage.
 * @param sourceUrl The URL of the dynamic image to fetch (e.g., /api/og?title=...)
 * @param filename The desired filename to save as in the bucket (e.g., campaign-123.png)
 * @returns The full public URL of the uploaded image
 */
export async function persistSocialImage(sourceUrl: string, filename: string): Promise<string> {
  console.log(`[Storage] Fetching dynamic image from: ${sourceUrl}`);
  
  // 1. Fetch the image into an ArrayBuffer
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from source: ${response.statusText}`);
  }
  
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log(`[Storage] Uploading ${filename} to Supabase...`);
  
  // 2. Upload to Supabase Storage bucket named 'social_assets'
  const { data, error } = await supabase.storage
    .from('social_assets')
    .upload(`campaigns/${filename}`, buffer, {
      contentType: 'image/png',
      upsert: true // Overwrite if it already exists
    });

  if (error || !data) {
    throw new Error(`Supabase Storage Upload Error: ${error?.message}`);
  }

  // 3. Get the permanent public URL
  const { data: publicUrlData } = supabase.storage
    .from('social_assets')
    .getPublicUrl(`campaigns/${filename}`);

  console.log(`[Storage] Successfully persisted: ${publicUrlData.publicUrl}`);
  
  return publicUrlData.publicUrl;
}
