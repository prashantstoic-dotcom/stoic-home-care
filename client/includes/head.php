<?php
$pageTitle = $pageTitle ?? 'Stoic Home Care – Expert Home Care Services';
$pageDesc  = $pageDesc  ?? 'Stoic Home Care provides hospital-grade home care – ICU setup, nursing, old age care, mother & baby care, doctor on call and medical equipment rental. Available 24/7.';
$ogImage   = $ogImage ?? ((isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/client/view_assets/images/carousel-1.avif');
$ogType    = $ogType ?? 'website';

// Secure canonical URL (strip tracking params)
$currentPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$canonicalUrl = (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $currentPath;
?>
<!DOCTYPE html>
<html lang="en">
<head>
<!-- Delayed Google Tag Manager for zero TBT -->
<script>
  document.addEventListener("DOMContentLoaded", function() {
    var gtmLoaded = false;
    function loadGTM() {
      if (gtmLoaded) return;
      gtmLoaded = true;
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-MZBGCCQ4');
    }
    // Load on interaction
    ['scroll', 'mousemove', 'touchstart'].forEach(function(e) { window.addEventListener(e, loadGTM, {once: true}); });
    // Or load after 3.5s anyway
    setTimeout(loadGTM, 3500);
  });
</script>
<!-- End Delayed Google Tag Manager -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($pageTitle) ?></title>
  <meta name="description" content="<?= htmlspecialchars($pageDesc) ?>">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="<?= htmlspecialchars($canonicalUrl) ?>">
  <?php if(isset($preloadHero) && $preloadHero): ?>
  <link rel="preload" as="image" href="<?= htmlspecialchars($preloadHero) ?>" fetchpriority="high">
  <?php endif; ?>
  
  <!-- Preconnects for performance -->
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Open Graph Meta Tags -->
  <meta property="og:title"       content="<?= htmlspecialchars($pageTitle) ?>">
  <meta property="og:description" content="<?= htmlspecialchars($pageDesc) ?>">
  <meta property="og:type"        content="<?= htmlspecialchars($ogType) ?>">
  <meta property="og:url"         content="<?= htmlspecialchars($canonicalUrl) ?>">
  <meta property="og:image"       content="<?= htmlspecialchars($ogImage) ?>">
  <meta property="og:site_name"   content="Stoic Home Care">
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="<?= htmlspecialchars($pageTitle) ?>">
  <meta name="twitter:description" content="<?= htmlspecialchars($pageDesc) ?>">
  <meta name="twitter:image"       content="<?= htmlspecialchars($ogImage) ?>">

  <link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/jpeg" href="/fevicon.jpg">
<link rel="apple-touch-icon" href="/fevicon.jpg">
 
  <!-- Bootstrap CSS (Deferred) -->
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"></noscript>
  
  <!-- Swiper CSS (Deferred) -->
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"></noscript>
  
  <!-- AOS CSS (Deferred) -->
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css"></noscript>
  
  <!-- Font Awesome 6 (Deferred) -->
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></noscript>
  
  <!-- Material Icons (Deferred) -->
  <link rel="preload" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"></noscript>

  <!-- Critical Custom CSS (Synchronous for immediate paint) -->
  <link rel="stylesheet" href="<?= CLIENT_CSS ?>/style.css">
  <link rel="stylesheet" href="<?= CLIENT_CSS ?>/custom.css">
  <link rel="stylesheet" href="<?= CLIENT_CSS ?>/responsive.css">
  
  <!-- Non-Critical Custom CSS (Deferred) -->
  <link rel="preload" href="<?= CLIENT_CSS ?>/a11y.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="<?= CLIENT_CSS ?>/a11y.css"></noscript>
<style>
/* ===== Navbar toggler alignment fix ===== */
.navbar-toggler {
  padding: 6px 8px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Keep icon stable */
.toggler-icon {
  width: 26px;
  height: 18px;
  position: relative;
  display: inline-block;
}

.toggler-icon span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2.2px;
  background: currentColor;
  border-radius: 2px;
  transition: all 0.35s ease;
}

/* Hamburger lines */
.toggler-icon span:nth-child(1) { top: 0; }
.toggler-icon span:nth-child(2) { top: 8px; }
.toggler-icon span:nth-child(3) { top: 16px; }

/* ===== Transform to CROSS when open ===== */
.navbar-toggler[aria-expanded="true"] .toggler-icon span:nth-child(1) {
  top: 8px;
  transform: rotate(45deg);
}

.navbar-toggler[aria-expanded="true"] .toggler-icon span:nth-child(2) {
  opacity: 0;
}

.navbar-toggler[aria-expanded="true"] .toggler-icon span:nth-child(3) {
  top: 8px;
  transform: rotate(-45deg);
}

/* ===== Mobile layout stabilization ===== */
@media (max-width: 991.98px) {

  /* Keep toggler aligned with logo */
  .navbar > .container {
    display: flex;
    align-items: center;
  }

  /* Reduce CTA button text */
  .btn-wa,
  .btn-call {
    font-size: 0.78rem;
    padding: 6px 10px;
    white-space: nowrap;
  }

  /* Stack buttons nicely */
  .navbar-collapse .d-flex {
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;
  }
}
/* Navbar base */
#mainNav {
  position: relative;
  min-height: 70px;
}

/* FIX toggler to top-right */
.navbar-toggler {
  position: absolute;
  top: 10px;          /* distance from top */
  right: 12px;
  transform: none;    /* remove centering */
  z-index: 1200;
  padding: 6px 8px;
}

/* Prevent collapse from affecting toggler */
.navbar-collapse {
  margin-top: 12px;
}

/* Keep logo aligned */
.navbar-brand {
  display: flex;
  align-items: center;
}

/* Mobile adjustments */
@media (max-width: 991.98px) {

  #mainNav .container {
    position: relative;
    padding-right: 5px; /* space for toggler */
  }
@media (max-width: 991.98px) {
  .hero-swiper .swiper-button-next,
  .hero-swiper .swiper-button-prev {
    display: none !important;
  }
  .new-f{
  padding-left:40px !important;
}
}
  .navbar-toggler {
    top: 8px;   /* stick to top on mobile */
    right: 10px;
  }

  /* Smaller buttons */
  .btn-wa,
  .btn-call {
    font-size: 0.74rem;
    padding: 6px 10px;
  }
} 
/* Footer logo styling */
#mainFooter img {
  height: 100px;        /* slightly smaller than 50 */
  width: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}/* ── Performance: swap fonts so text shows immediately ── */
@font-face { font-display: swap; }

/* ── Navbar toggler ── */
.navbar-toggler {
  padding: 6px 8px;
  border: none !important;
  box-shadow: none !important;
}
.toggler-icon {
  width: 24px; height: 18px;
  position: relative; display: inline-block;
}
.toggler-icon span {
  position: absolute; left: 0; width: 100%;
  height: 2px; background: currentColor;
  border-radius: 2px; transition: all .3s ease;
}
.toggler-icon span:nth-child(1) { top: 0; }
.toggler-icon span:nth-child(2) { top: 8px; }
.toggler-icon span:nth-child(3) { top: 16px; }
.navbar-toggler[aria-expanded="true"] .toggler-icon span:nth-child(1) { top:8px; transform:rotate(45deg); }
.navbar-toggler[aria-expanded="true"] .toggler-icon span:nth-child(2) { opacity:0; }
.navbar-toggler[aria-expanded="true"] .toggler-icon span:nth-child(3) { top:8px; transform:rotate(-45deg); }

/* ── Mobile nav ── */
@media (max-width: 991.98px) {
  .hero-swiper .swiper-button-next,
  .hero-swiper .swiper-button-prev { display: none !important; }

  /* Hide Admin button on mobile — security + space */
  .btn-admin-link { display: none !important; }

  .btn-wa, .btn-call { font-size:.76rem; padding:6px 10px; white-space:nowrap; }

  .new-f { padding-left: 0 !important; }
}

/* ── Footer logo ── */
#mainFooter img { height:90px; width:auto; display:block; margin:0 auto; }

/* ── Footer social hover ── */
.footer-social a:hover i { color:#fff !important; }



</style>
<?php
// Fetch Dynamic Aggregate Rating from Supabase
if (!function_exists('getSupabase')) {
    require_once ROOT . '/config/supabase.php';
}
$supabaseClient = getSupabase();
$siteRating = $supabaseClient->getAggregateRating();

// Base Structured Data
$schemaGraph = [];

// 1. MedicalBusiness
$schemaGraph[] = [
  "@type" => "MedicalBusiness",
  "@id" => "https://stoiccare.in/#organization",
  "name" => "Stoic Home Care",
  "url" => "https://stoiccare.in",
  "logo" => "https://stoiccare.in/favicon.png",
  "image" => "https://stoiccare.in/client/view_assets/images/carousel-1.avif",
  "description" => "Home Care services including ICU at home, nursing care, elderly care, physiotherapy and medical equipment rental.",
  "telephone" => "+91-7668232867",
  "address" => [
    "@type" => "PostalAddress",
    "streetAddress" => "FF2 Block 330, MU 2",
    "addressLocality" => "Greater Noida",
    "addressRegion" => "Uttar Pradesh",
    "postalCode" => "201310",
    "addressCountry" => "IN"
  ],
  "openingHoursSpecification" => [
    "@type" => "OpeningHoursSpecification",
    "dayOfWeek" => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens" => "00:00",
    "closes" => "23:59"
  ],
  "priceRange" => "$$",
  "areaServed" => [
    ["@type" => "City", "name" => "Greater Noida"],
    ["@type" => "City", "name" => "Noida"],
    ["@type" => "City", "name" => "Delhi NCR"],
    ["@type" => "City", "name" => "Ghaziabad"]
  ],
  "aggregateRating" => [
    "@type" => "AggregateRating",
    "ratingValue" => (string)$siteRating['average'],
    "reviewCount" => (string)$siteRating['count'],
    "bestRating" => "5",
    "worstRating" => "1"
  ]
];

// 2. BreadcrumbList (Dynamic)
$pathParts = array_filter(explode('/', trim($currentPath, '/')));
$breadcrumbs = [
  [
    "@type" => "ListItem",
    "position" => 1,
    "name" => "Home",
    "item" => "https://stoiccare.in/"
  ]
];
$pos = 2;
$accPath = '';
foreach ($pathParts as $part) {
    if (empty($part)) continue;
    $accPath .= '/' . $part;
    $breadcrumbs[] = [
        "@type" => "ListItem",
        "position" => $pos++,
        "name" => ucfirst(str_replace(['-', '_'], ' ', $part)),
        "item" => "https://stoiccare.in" . $accPath
    ];
}
$schemaGraph[] = [
  "@type" => "BreadcrumbList",
  "@id" => "https://stoiccare.in/#breadcrumb",
  "itemListElement" => $breadcrumbs
];

// Add custom schema from view if any
if (isset($customSchema)) {
    $schemaGraph = array_merge($schemaGraph, $customSchema);
}

// Build the final Knowledge Graph Mesh
$finalMesh = [
    "@context" => "https://schema.org",
    "@graph" => []
];

// Remove individual @context and push to graph
foreach ($schemaGraph as $item) {
    if (isset($item['@context'])) unset($item['@context']);
    $finalMesh['@graph'][] = $item;
}
?>
<script type="application/ld+json">
<?= json_encode($finalMesh, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) ?>
</script>

</head>
