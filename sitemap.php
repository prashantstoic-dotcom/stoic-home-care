<?php
/* ============================================================
   Stoic Home Care — sitemap.php
   Generates a dynamic XML sitemap for SEO
   ============================================================ */

define('ROOT', __DIR__);
require_once ROOT . '/config/config.php';
require_once ROOT . '/config/db.php';
require_once ROOT . '/config/supabase.php';

// Try to get Supabase connection
$supabase = getSupabase();
$pages = $supabase->getAllSeoPages();

// Optional: get blog posts later
// $blogPosts = $supabase->getBlogPosts();

// Set header for XML output
header('Content-Type: text/xml; charset=utf-8');

// Disable output caching for testing, but in production we can use headers
header("Cache-Control: no-cache, must-revalidate");

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

// Add homepage
echo "  <url>\n";
echo "    <loc>" . rtrim(BASE_URL, '/') . "/</loc>\n";
echo "    <changefreq>daily</changefreq>\n";
echo "    <priority>1.0</priority>\n";
echo "  </url>\n";

// Add core static pages
$staticPages = ['services', 'equipment', 'about', 'contact', 'blog'];
foreach ($staticPages as $p) {
    echo "  <url>\n";
    echo "    <loc>" . rtrim(BASE_URL, '/') . "/" . $p . "</loc>\n";
    echo "    <changefreq>weekly</changefreq>\n";
    echo "    <priority>0.8</priority>\n";
    echo "  </url>\n";
}

// Add all dynamic SEO pages
if (!empty($pages)) {
    foreach ($pages as $page) {
        if (!empty($page['slug'])) {
            $slug = htmlspecialchars($page['slug']);
            // Convert updated_at to W3C datetime format if exists
            $lastmod = '';
            if (!empty($page['updated_at'])) {
                $lastmod = "    <lastmod>" . date('Y-m-d\TH:i:sP', strtotime($page['updated_at'])) . "</lastmod>\n";
            } elseif (!empty($page['created_at'])) {
                $lastmod = "    <lastmod>" . date('Y-m-d\TH:i:sP', strtotime($page['created_at'])) . "</lastmod>\n";
            }

            echo "  <url>\n";
            echo "    <loc>" . rtrim(BASE_URL, '/') . "/service/" . $slug . "</loc>\n";
            if ($lastmod) echo $lastmod;
            echo "    <changefreq>weekly</changefreq>\n";
            echo "    <priority>0.8</priority>\n";
            echo "  </url>\n";
        }
    }
}

// Add all Blog Posts
$blogPosts = $supabase->getBlogPosts();
if (!empty($blogPosts)) {
    foreach ($blogPosts as $post) {
        if (!empty($post['slug'])) {
            $slug = htmlspecialchars($post['slug']);
            $lastmod = '';
            if (!empty($post['published_at'])) {
                $lastmod = "    <lastmod>" . date('Y-m-d\TH:i:sP', strtotime($post['published_at'])) . "</lastmod>\n";
            }
            
            echo "  <url>\n";
            echo "    <loc>" . rtrim(BASE_URL, '/') . "/blog/" . $slug . "</loc>\n";
            if ($lastmod) echo $lastmod;
            echo "    <changefreq>monthly</changefreq>\n";
            echo "    <priority>0.7</priority>\n";
            echo "  </url>\n";
        }
    }
}

echo '</urlset>';
