<?php
/* ============================================================
   Stoic Home Care — client/views/category_hub.php
   Service Silo Page (e.g. "ICU Nursing Available in All Cities")
   ============================================================ */
require_once ROOT . '/config/supabase.php';

$catSlug = isset($_GET['cat']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['cat']) : '';
if (empty($catSlug)) {
    require ROOT . '/client/views/404.php';
    exit;
}

$catName = ucwords(str_replace('-', ' ', $catSlug));

$supabase = getSupabase();
// Filter by loosely matching category name from slug
$allPages = $supabase->getAllSeoPages();
$categoryPages = [];
$actualCategoryName = $catName;

if (is_array($allPages)) {
    foreach ($allPages as $p) {
        $c = $p['category'] ?? '';
        // E.g. "Nursing" vs "icu-nursing". 
        // We might need to match if slug contains the category name or vice versa.
        // Let's do a loose strpos match
        if (stripos($catSlug, str_replace(' ', '-', strtolower($c))) !== false || 
            stripos(str_replace(' ', '-', strtolower($c)), $catSlug) !== false) {
            $categoryPages[] = $p;
            $actualCategoryName = $c; // Save the exact case used in DB
        }
    }
}

// Fallback if not found (maybe slug is identical to something else in the DB)
if (empty($categoryPages)) {
    require ROOT . '/client/views/404.php';
    exit;
}

$pageTitle = "$actualCategoryName Services | Stoic Home Care Locations";
$pageDesc  = "Explore our top-rated $actualCategoryName services across various cities. Professional home care you can trust.";

require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';
?>

<main id="main-content">
<header class="contact-hero-section" aria-label="Category Silo Hero">
  <div class="container position-relative" style="z-index:2; padding-bottom : 25px">
    <div class="row align-items-center g-5 py-5 text-center">
      <div class="col-12" data-aos="fade-up">
        <h1 class="hero-title text-white"><?= htmlspecialchars($actualCategoryName) ?> Services</h1>
        <p class="hero-sub text-white-50">Professional medical care delivered directly to your home across multiple locations.</p>
      </div>
    </div>
  </div>
</header>

<section class="section-pad">
  <div class="container">
    
    <!-- Visual Breadcrumbs -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= BASE_URL ?>/">Home</a></li>
        <li class="breadcrumb-item"><a href="<?= BASE_URL ?>/services">Services</a></li>
        <li class="breadcrumb-item active" aria-current="page"><?= htmlspecialchars($actualCategoryName) ?></li>
      </ol>
    </nav>

    <div class="row g-4">
      <?php foreach ($categoryPages as $page): ?>
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0 hover-lift">
          <div class="card-body p-4">
            <span class="badge bg-teal bg-opacity-10 text-teal mb-3"><i class="fa-solid fa-location-dot me-1"></i><?= htmlspecialchars($page['location'] ?? 'Location') ?></span>
            <h3 class="h5 card-title"><a href="<?= BASE_URL ?>/service/<?= htmlspecialchars($page['slug']) ?>" class="text-dark text-decoration-none"><?= htmlspecialchars($page['page_title'] ?? '') ?></a></h3>
            <p class="text-muted small mt-2"><?= htmlspecialchars($page['meta_desc'] ?? '') ?></p>
          </div>
          <div class="card-footer bg-white border-0 p-4 pt-0">
            <a href="<?= BASE_URL ?>/service/<?= htmlspecialchars($page['slug']) ?>" class="btn btn-outline-teal btn-sm w-100">View Details</a>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
</main>

<style>
.hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.hover-lift:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
.text-teal { color: #0CB8C9 !important; }
.bg-teal { background-color: #0CB8C9 !important; }
.btn-outline-teal { color: #0CB8C9; border-color: #0CB8C9; }
.btn-outline-teal:hover { color: #fff; background-color: #0CB8C9; }
</style>

<?php require_once ROOT . '/client/includes/footer.php'; ?>
