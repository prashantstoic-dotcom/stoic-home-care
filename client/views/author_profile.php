<?php
/* ============================================================
   Stoic Home Care — client/views/author_profile.php
   Author E-E-A-T Profile Page
   ============================================================ */
require_once ROOT . '/config/supabase.php';

$slug = isset($_GET['slug']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['slug']) : '';
if (empty($slug)) {
    require ROOT . '/client/views/404.php';
    exit;
}

$supabase = getSupabase();
$author = $supabase->getAuthorBySlug($slug);

if (!$author) {
    require ROOT . '/client/views/404.php';
    exit;
}

$pageTitle = htmlspecialchars($author['name']) . " | Expert Profiles | Stoic Home Care";
$pageDesc  = htmlspecialchars($author['bio'] ?? "Learn more about {$author['name']}, a certified medical expert at Stoic Home Care.");

// Schema for ProfilePage & Person
$customSchema = [
    "@context" => "https://schema.org",
    "@type" => "ProfilePage",
    "mainEntity" => [
        "@type" => "Person",
        "name" => $author['name'],
        "jobTitle" => $author['qualifications'] ?? 'Healthcare Expert',
        "worksFor" => [
            "@type" => "Organization",
            "name" => "Stoic Home Care"
        ],
        "description" => $author['bio'] ?? ''
    ]
];

require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';
?>

<main id="main-content">
<header class="contact-hero-section" aria-label="Author Profile Hero">
  <div class="container position-relative" style="z-index:2; padding-bottom : 25px">
    <div class="row align-items-center g-5 py-5 justify-content-center">
      <div class="col-lg-8 text-center" data-aos="fade-up">
        <div class="d-inline-flex align-items-center justify-content-center bg-white text-teal rounded-circle mb-3 shadow" style="width: 100px; height: 100px; font-size: 2.5rem; font-weight: bold;">
          <?= strtoupper(substr($author['name'], 0, 1)) ?>
        </div>
        <h1 class="hero-title text-white mb-2"><?= htmlspecialchars($author['name']) ?></h1>
        <p class="hero-sub text-white-50"><i class="fa-solid fa-user-md me-2"></i><?= htmlspecialchars($author['qualifications'] ?? 'Certified Medical Expert') ?></p>
      </div>
    </div>
  </div>
</header>

<section class="section-pad">
  <div class="container">
    
    <!-- Visual Breadcrumbs -->
    <nav aria-label="breadcrumb" class="mb-5">
      <ol class="breadcrumb justify-content-center">
        <li class="breadcrumb-item"><a href="<?= BASE_URL ?>/">Home</a></li>
        <li class="breadcrumb-item"><a href="<?= BASE_URL ?>/blog">Blog</a></li>
        <li class="breadcrumb-item active" aria-current="page"><?= htmlspecialchars($author['name']) ?></li>
      </ol>
    </nav>

    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="bg-light p-4 p-md-5 rounded shadow-sm text-center" data-aos="fade-up">
          <h2 class="h3 fw-bold mb-4">About <?= htmlspecialchars($author['name']) ?></h2>
          <p class="lead text-muted mb-0" style="line-height: 1.8;">
            <?= nl2br(htmlspecialchars($author['bio'] ?? '')) ?>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
</main>

<style>
.text-teal { color: #0CB8C9 !important; }
</style>

<?php require_once ROOT . '/client/includes/footer.php'; ?>
