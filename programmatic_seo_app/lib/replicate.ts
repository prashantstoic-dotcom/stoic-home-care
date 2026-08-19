import Replicate from "replicate";

export function getReplicateClient() {
  const token = process.env.REPLICATE_API_TOKEN;
  
  if (!token) {
    throw new Error("Missing REPLICATE_API_TOKEN in environment variables.");
  }

  return new Replicate({
    auth: token,
  });
}

/**
 * A helper function to generate a wide aspect ratio (16:9) image for social media.
 * We use 'black-forest-labs/flux-schnell' as it is insanely fast (Zero-Lag philosophy) and high quality.
 */
export async function generateSocialImage(prompt: string): Promise<string> {
  const replicate = getReplicateClient();
  
  console.log(`[Replicate] Generating image for prompt: "${prompt.substring(0, 50)}..."`);
  
  // Using FLUX.1-schnell model for high-speed generation
  const output = await replicate.run(
    "black-forest-labs/flux-schnell", 
    {
      input: {
        prompt: prompt,
        aspect_ratio: "16:9", // Perfect for Twitter/LinkedIn
        output_format: "webp",
        output_quality: 90
      }
    }
  );

  // Replicate returns an array of URLs for the generated images
  if (Array.isArray(output) && output.length > 0) {
    return output[0] as string;
  }
  
  throw new Error("Failed to generate image URL from Replicate.");
}
