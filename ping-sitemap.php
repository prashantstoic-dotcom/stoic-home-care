<?php
declare(strict_types=1);
/* ============================================================
   Stoic Home Care — ping-sitemap.php
   Automatically pings Google Search Console to re-crawl sitemap
   ============================================================ */

$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$baseUrl = $protocol . $_SERVER['HTTP_HOST'];
$sitemapUrl = $baseUrl . '/sitemap-seo.xml';

$pingUrl = "https://www.google.com/ping?sitemap=" . urlencode($sitemapUrl);

$ch = curl_init($pingUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    echo "Successfully pinged Google Search Console: $sitemapUrl\n";
} else {
    echo "Failed to ping Google Search Console. HTTP Code: $httpCode\n";
}
