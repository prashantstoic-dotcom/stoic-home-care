<?php
/* ============================================================
   Stoic Home Care — client/includes/ScarcityEngine.php
   Enterprise Scarcity & Live Inventory Generator
   ============================================================ */

class ScarcityEngine {
    
    /**
     * Get a deterministic inventory number based on Location, Category, and Date.
     * Guarantees the same number all day for a specific page, but rotates daily.
     */
    public static function getLiveInventory(string $location, string $category): int {
        $dateStr = date('Y-m-d');
        
        // The Seed: Unique combination
        $seed = $dateStr . strtolower(trim($location)) . strtolower(trim($category));
        
        // Generate MD5 Hash
        $hash = md5($seed);
        
        // Take first 8 chars and convert hex to integer
        $number = hexdec(substr($hash, 0, 8));
        
        // Define ranges based on scarcity of category
        // ICUs are rare, Nurses are more common
        $categoryLower = strtolower($category);
        
        if (strpos($categoryLower, 'icu') !== false) {
            // Highly scarce: 1 to 3
            return ($number % 3) + 1;
        } elseif (strpos($categoryLower, 'nursing') !== false || strpos($categoryLower, 'care') !== false) {
            // Moderate scarcity: 2 to 5
            return ($number % 4) + 2;
        } else {
            // General equipment: 3 to 8
            return ($number % 6) + 3;
        }
    }

    /**
     * Returns a dynamic urgency message based on the inventory level
     */
    public static function getUrgencyMessage(int $inventory, string $location, string $category): string {
        if ($inventory <= 2) {
            return "High Demand: Only {$inventory} {$category} left in {$location} today.";
        } else {
            return "Trending: {$inventory} {$category} currently available in {$location}. Book now.";
        }
    }
}
