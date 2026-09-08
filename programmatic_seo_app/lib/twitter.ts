// Twitter integration placeholder
// twitter-api-v2 has been removed from dependencies.
// To re-enable, run: npm install twitter-api-v2
// Then uncomment the implementation below.

export function getTwitterClient(): never {
  throw new Error(
    "Twitter integration is not configured. Install twitter-api-v2 and set TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET in .env to enable."
  );
}
