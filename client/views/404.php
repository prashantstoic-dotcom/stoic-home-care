<?php
/* ============================================================
   Stoic Home Care — client/views/404.php
   Custom 404 Page (Optimized for UX & Bot Crawling)
   ============================================================ */

$pageTitle = 'Page Not Found – Stoic Home Care';
$pageDesc  = 'The page you are looking for does not exist or has been moved.';
$ogType    = 'website';

http_response_code(404);

require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';
?>

<main id="main-content" style="padding: 100px 0; text-align: center; background: #f8fbff; min-height: 60vh; display: flex; align-items: center; justify-content: center;">
  <div class="container">
    <div style="max-width: 600px; margin: 0 auto;">
      <h1 style="font-size: 6rem; font-weight: 900; color: #0CB8C9; margin-bottom: 0;">404</h1>
      <h2 style="font-size: 2rem; font-weight: 700; color: #0f2240; margin-bottom: 1.5rem;">Oops! Page Not Found</h2>
      <p style="font-size: 1.1rem; color: #6b82a3; margin-bottom: 2rem;">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="<?= BASE_URL ?>/" class="btn btn-lg" style="background: linear-gradient(135deg, #0CB8C9, #1D9E75); color: #fff; border-radius: 50px; padding: 0.8rem 2rem; font-weight: 600; box-shadow: 0 8px 25px rgba(12,184,201,0.3);">
          <i class="fa-solid fa-house me-2"></i> Back to Home
        </a>
        <a href="<?= BASE_URL ?>/contact" class="btn btn-lg" style="background: #fff; color: #0f2240; border-radius: 50px; padding: 0.8rem 2rem; font-weight: 600; border: 1px solid #e0e6ed; box-shadow: 0 8px 25px rgba(0,0,0,0.05);">
          <i class="fa-solid fa-envelope me-2"></i> Contact Us
        </a>
      </div>
    </div>
  </div>
</main>

<?php require_once ROOT . '/client/includes/footer.php'; ?>
