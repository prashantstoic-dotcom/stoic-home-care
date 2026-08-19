import { TwitterApi } from 'twitter-api-v2';

// Ensure all environment variables exist
const apiKey = process.env.TWITTER_API_KEY;
const apiSecret = process.env.TWITTER_API_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessSecret = process.env.TWITTER_ACCESS_SECRET;

export function getTwitterClient() {
  if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
    throw new Error("Missing Twitter API credentials in .env.local");
  }

  // Initialize the v1 & v2 client using User Context auth (OAuth 1.0a)
  // This auth method allows us to tweet on behalf of the single connected account.
  const client = new TwitterApi({
    appKey: apiKey,
    appSecret: apiSecret,
    accessToken: accessToken,
    accessSecret: accessSecret,
  });

  // We primarily use v2 for tweeting, so we return the readWrite client
  return client.readWrite;
}
