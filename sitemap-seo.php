<?php
declare(strict_types=1);
/* ============================================================
   Stoic Home Care — sitemap-seo.php
   Generates a dynamic XML sitemap for all Programmatic SEO Pages
   ============================================================ */

define('ROOT', __DIR__);
require_once ROOT . '/config/supabase.php';

// Base URL of the website
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$baseUrl = $protocol . $_SERVER['HTTP_HOST'];

header("Content-Type: text/xml; charset=utf-8");
echo '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

try {
    $supabase = getSupabase();
    $pages = $supabase->getAllSeoPages();

    if (is_array($pages)) {
        foreach ($pages as $page) {
            $slug = htmlspecialchars($page['slug'], ENT_XML1, 'UTF-8');
            $date = date('Y-m-d', strtotime($page['created_at'] ?? 'now'));
            $url  = $baseUrl . '/service/' . $slug;

            echo '  <url>' . PHP_EOL;
            echo '    <loc>' . $url . '</loc>' . PHP_EOL;
            echo '    <lastmod>' . $date . '</lastmod>' . PHP_EOL;
            echo '    <changefreq>weekly</changefreq>' . PHP_EOL;
            echo '    <priority>0.80</priority>' . PHP_EOL;
            echo '  </url>' . PHP_EOL;
        }
    }
} catch (Exception $e) {
    // Self-correcting: Ignore errors, output valid empty sitemap
    error_log("Sitemap Generation Error: " . $e->getMessage());
}

echo '</urlset>';
