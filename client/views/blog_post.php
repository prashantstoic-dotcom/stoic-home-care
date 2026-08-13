<?php
/* ============================================================
   Stoic Home Care — client/views/blog_post.php
   Single Blog Post Page
   ============================================================ */
require_once ROOT . '/config/supabase.php';

$slug = isset($_GET['slug']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['slug']) : '';
if (empty($slug)) {
    require ROOT . '/client/views/404.php';
    exit;
}

$supabase = getSupabase();
$blog = $supabase->getBlogPost($slug);

if (!$blog) {
    require ROOT . '/client/views/404.php';
    exit;
}

$pageTitle = htmlspecialchars($blog['title']) . " | Stoic Home Care";
$pageDesc  = htmlspecialchars($blog['excerpt'] ?? '');

// Dynamic Article JSON-LD Schema
$customSchema = [
    "@context" => "https://schema.org",
    "@type" => "Article",
    "headline" => $blog['title'],
    "description" => $blog['excerpt'],
    "author" => [
        "@type" => "Person",
        "name" => $blog['author'] ?? "Stoic Experts"
    ],
    "publisher" => [
        "@type" => "Organization",
        "name" => "Stoic Home Care",
        "logo" => [
            "@type" => "ImageObject",
            "url" => BASE_URL . "/assets/images/logo.png"
        ]
    ],
    "datePublished" => date('Y-m-d\TH:i:sP', strtotime($blog['published_at'] ?? 'now')),
];

require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';
?>

<main id="main-content">
<header class="contact-hero-section" aria-label="Blog Post Hero">
  <div class="container position-relative" style="z-index:2; padding-bottom : 25px">
    <div class="row align-items-center g-5 py-5 text-center justify-content-center">
      <div class="col-lg-8" data-aos="fade-up">
        <h1 class="hero-title text-white"><?= htmlspecialchars($blog['title']) ?></h1>
        <p class="text-white-50 mt-3 mb-0">
            <i class="fa-regular fa-calendar me-1"></i> <?= date('F j, Y', strtotime($blog['published_at'] ?? 'now')) ?> 
            <span class="mx-2">|</span> 
            <i class="fa-solid fa-user-doctor me-1"></i> By <?= htmlspecialchars($blog['author'] ?? 'Stoic Experts') ?>
        </p>
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
        <li class="breadcrumb-item"><a href="<?= BASE_URL ?>/blog">Blog</a></li>
        <li class="breadcrumb-item active" aria-current="page"><?= htmlspecialchars($blog['title']) ?></li>
      </ol>
    </nav>

    <div class="row justify-content-center">
      <div class="col-lg-8">
        <article class="blog-content-block bg-white p-4 p-md-5 rounded shadow-sm" data-aos="fade-up">
          <!-- The content (assumed to be HTML from Supabase or WYSIWYG) -->
          <?php 
            require_once ROOT . '/client/includes/AutoLinker.php';
            $rawContent = $blog['content'] ?? '<p>Content is being updated.</p>';
            $lazyLoadedHtml = str_replace('<img ', '<img loading="lazy" ', $rawContent);
            $dictionary = $supabase->getLinkDictionary();
            $linkedHtml = AutoLinker::linkify($lazyLoadedHtml, $dictionary);
            echo $linkedHtml;
          ?>
        </article>
      </div>
    </div>
  </div>
</section>
</main>

<style>
.blog-content-block { font-size: 1.1rem; line-height: 1.8; color: #444; }
.blog-content-block h2 { color: #2c3e50; margin-top: 2rem; margin-bottom: 1rem; font-weight: 700; }
.blog-content-block h3 { color: #2c3e50; margin-top: 1.5rem; margin-bottom: 1rem; font-weight: 600; }
.blog-content-block ul, .blog-content-block ol { padding-left: 20px; margin-bottom: 1.5rem; }
.blog-content-block li { margin-bottom: 0.5rem; }
.text-teal { color: #0CB8C9 !important; }
</style>

<?php require_once ROOT . '/client/includes/footer.php'; ?>
