// lib/scheduler-logic.ts

/**
 * Calculates optimal posting times for different platforms to maximize reach
 * and prevent audience fatigue (spam).
 * 
 * Strategy:
 * - Twitter: 24 hours from approval
 * - LinkedIn: 48 hours from approval
 * 
 * @param approvalTime The Date object representing when the admin clicked 'Approve'
 * @returns Object mapping platform names to their Unix timestamp (in milliseconds)
 */
export function calculateQueueTimes(approvalTime: Date = new Date()) {
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  
  const twitterTimeMs = approvalTime.getTime() + (ONE_DAY_MS * 1);
  const linkedinTimeMs = approvalTime.getTime() + (ONE_DAY_MS * 2);

  // In a more advanced version, we could round these to "optimal hours" like 9 AM EST.
  // For now, we strictly space them out by 24h & 48h from the moment of approval.

  return {
    twitter: twitterTimeMs,
    linkedin: linkedinTimeMs
  };
}
