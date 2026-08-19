// lib/linkedin.ts
const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
export const LINKEDIN_AUTHOR_URN = process.env.LINKEDIN_AUTHOR_URN;

/**
 * A helper function to make authenticated requests to LinkedIn API v2
 */
export async function fetchLinkedInAPI(endpoint: string, options: RequestInit = {}) {
  if (!accessToken) {
    throw new Error("Missing LINKEDIN_ACCESS_TOKEN in environment variables.");
  }

  const url = `https://api.linkedin.com/v2${endpoint}`;
  
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'X-Restli-Protocol-Version': '2.0.0',
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LinkedIn API Error (${response.status}): ${errorText}`);
  }

  // Handle 204 No Content for successful posts that don't return a body
  if (response.status === 204 || response.status === 201) {
    // Some endpoints return the post ID in a header, like x-restli-id
    const restliId = response.headers.get('x-restli-id');
    if (restliId) {
      return { id: restliId };
    }
    return { success: true };
  }

  return response.json();
}
