<?php
/* ============================================================
   Stoic Home Care — client/views/location_hub.php
   Location Hub Page (e.g. "Home Care Services in Noida")
   ============================================================ */
require_once ROOT . '/config/supabase.php';

$citySlug = isset($_GET['city']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['city']) : '';
if (empty($citySlug)) {
    require ROOT . '/client/views/404.php';
    exit;
}

$cityName = ucwords(str_replace('-', ' ', $citySlug));

$supabase = getSupabase();
// Because 'location' in our DB is stored as "Noida", "Delhi NCR", etc., we need to loosely match it or pass the exact string.
// Let's assume $cityName roughly matches the location in DB. Since DB has "Delhi NCR", and slug might be "delhi-ncr", ucwords helps.
// To make it strict, we should filter through all pages and match loosely.
$allPages = $supabase->getAllSeoPages();
$locationPages = [];
if (is_array($allPages)) {
    foreach ($allPages as $p) {
        $loc = $p['location'] ?? '';
        if (strtolower(str_replace(' ', '-', $loc)) === strtolower($citySlug) || 
            strtolower($loc) === strtolower($cityName)) {
            $locationPages[] = $p;
        }
    }
}

if (empty($locationPages)) {
    require ROOT . '/client/views/404.php';
    exit;
}

$pageTitle = "Best Home Care Services in $cityName | Stoic Home Care";
$pageDesc  = "Discover top-rated ICU nursing, physiotherapy, elder care, and medical equipment rentals in $cityName. 24/7 support available.";

require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';
?>

<main id="main-content">
<header class="contact-hero-section" aria-label="Location Hub Hero">
  <div class="container position-relative" style="z-index:2; padding-bottom : 25px">
    <div class="row align-items-center g-5 py-5 text-center">
      <div class="col-12" data-aos="fade-up">
        <h1 class="hero-title text-white">Home Care Services in <?= htmlspecialchars($cityName) ?></h1>
        <p class="hero-sub text-white-50">Professional medical care and equipment delivered directly to your home in <?= htmlspecialchars($cityName) ?>.</p>
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
        <li class="breadcrumb-item"><a href="<?= BASE_URL ?>/services">Locations</a></li>
        <li class="breadcrumb-item active" aria-current="page"><?= htmlspecialchars($cityName) ?></li>
      </ol>
    </nav>

    <div class="row g-4">
      <?php foreach ($locationPages as $page): ?>
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0 hover-lift">
          <div class="card-body p-4">
            <span class="badge bg-teal bg-opacity-10 text-teal mb-3"><?= htmlspecialchars($page['category'] ?? 'Service') ?></span>
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
