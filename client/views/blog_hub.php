<?php
/* ============================================================
   Stoic Home Care — client/views/blog_hub.php
   Knowledge Base / Blog Index Page
   ============================================================ */
require_once ROOT . '/config/supabase.php';

$supabase = getSupabase();
$blogs = $supabase->getBlogPosts();

$pageTitle = "Knowledge Base & Health Tips | Stoic Home Care";
$pageDesc  = "Read expert articles on home healthcare, medical equipment guides, and caregiving tips from Stoic Home Care professionals.";

require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';
?>

<main id="main-content">
<header class="contact-hero-section" aria-label="Blog Hero">
  <div class="container position-relative" style="z-index:2; padding-bottom : 25px">
    <div class="row align-items-center g-5 py-5 text-center">
      <div class="col-12" data-aos="fade-up">
        <h1 class="hero-title text-white">Knowledge Base & Insights</h1>
        <p class="hero-sub text-white-50">Expert advice, health tips, and guides for better home healthcare.</p>
      </div>
    </div>
  </div>
</header>

<section class="section-pad bg-light">
  <div class="container">
    
    <!-- Visual Breadcrumbs -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= BASE_URL ?>/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Blog</li>
      </ol>
    </nav>

    <?php if (empty($blogs)): ?>
      <div class="alert alert-info text-center py-5">
        <i class="fa-solid fa-pen-nib fs-2 mb-3 text-teal"></i>
        <h4>Our knowledge base is currently being updated.</h4>
        <p>Check back soon for expert articles and health tips.</p>
      </div>
    <?php else: ?>
      <div class="row g-4">
        <?php foreach ($blogs as $blog): ?>
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm border-0 hover-lift">
            <div class="card-body p-4">
              <div class="text-muted small mb-2">
                <i class="fa-regular fa-calendar me-1"></i> <?= date('M d, Y', strtotime($blog['published_at'] ?? 'now')) ?>
              </div>
              <h3 class="h5 card-title fw-bold">
                <a href="<?= BASE_URL ?>/blog/<?= htmlspecialchars($blog['slug']) ?>" class="text-dark text-decoration-none">
                  <?= htmlspecialchars($blog['title'] ?? '') ?>
                </a>
              </h3>
              <p class="text-muted small mt-2"><?= htmlspecialchars($blog['excerpt'] ?? '') ?></p>
            </div>
            <div class="card-footer bg-white border-0 p-4 pt-0 d-flex justify-content-between align-items-center">
              <span class="text-teal small fw-semibold">By <?= htmlspecialchars($blog['author'] ?? 'Stoic Experts') ?></span>
              <a href="<?= BASE_URL ?>/blog/<?= htmlspecialchars($blog['slug']) ?>" class="btn btn-outline-teal btn-sm">Read More</a>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
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
