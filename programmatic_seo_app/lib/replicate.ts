// Replicate integration placeholder
// replicate package has been removed from dependencies.
// To re-enable, run: npm install replicate
// Then uncomment the implementation below.

export function getReplicateClient(): never {
  throw new Error(
    "Replicate integration is not configured. Install replicate and set REPLICATE_API_TOKEN in .env to enable."
  );
}

export async function generateSocialImage(prompt: string): Promise<string> {
  throw new Error(
    "Replicate integration is not configured. Install replicate and set REPLICATE_API_TOKEN in .env to enable."
  );
}
