import crypto from 'crypto';

export class ScarcityEngine {
  static getLiveInventory(location: string, category: string): number {
    const dateStr = new Date().toISOString().split('T')[0];
    const seed = dateStr + location.toLowerCase().trim() + category.toLowerCase().trim();
    const hash = crypto.createHash('md5').update(seed).digest('hex');
    const number = parseInt(hash.substring(0, 8), 16);
    
    const catLower = category.toLowerCase();
    if (catLower.includes('icu')) {
      return (number % 3) + 1;
    } else if (catLower.includes('nursing') || catLower.includes('care')) {
      return (number % 4) + 2;
    } else {
      return (number % 6) + 3;
    }
  }

  static getUrgencyMessage(inventory: number, location: string, category: string): string {
    if (inventory <= 2) {
      return `High Demand: Only ${inventory} ${category} left in ${location} today.`;
    } else {
      return `Trending: ${inventory} ${category} currently available in ${location}. Book now.`;
    }
  }
}
