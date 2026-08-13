<?php
/* ============================================================
   Stoic Home Care — client/views/service_landing.php
   Dynamic Programmatic SEO Landing Page
   ============================================================ */

require_once ROOT . '/config/supabase.php';

$slug = isset($_GET['slug']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['slug']) : '';
if (empty($slug)) {
    require ROOT . '/client/views/404.php';
    exit;
}

// Fetch data from Supabase REST API
$supabase = getSupabase();
$seoData = $supabase->getSeoPage($slug);

// If not found in Supabase, show 404
if (!$seoData) {
    require ROOT . '/client/views/404.php';
    exit;
}

// Map database fields to variables
$pageTitle = $seoData['page_title'] ?? 'Expert Home Care Services';
$pageDesc  = $seoData['meta_desc'] ?? '';
$h1Title   = $seoData['h1_title'] ?? $pageTitle;
$heroSub   = $seoData['hero_subtitle'] ?? '';
$htmlBody  = $seoData['content_html'] ?? '';
$location  = $seoData['location'] ?? 'Delhi NCR';

// Define custom JSON-LD schema for this specific service page
require_once ROOT . '/client/includes/ScarcityEngine.php';
$pageCategory = $seoData['category'] ?? '';
$liveInventory = ScarcityEngine::getLiveInventory($location, $pageCategory);
$urgencyMessage = ScarcityEngine::getUrgencyMessage($liveInventory, $location, $pageCategory);

$serviceId = "https://stoiccare.in/#service-" . htmlspecialchars($slug);
$customSchema = [[
  "@type" => "Service",
  "@id" => $serviceId,
  "serviceType" => $h1Title,
  "provider" => [
    "@id" => "https://stoiccare.in/#organization"
  ],
  "areaServed" => [
    "@type" => "City",
    "name" => $location
  ],
  "description" => $pageDesc,
  "offers" => [
    "@type" => "Offer",
    "availability" => "https://schema.org/LimitedAvailability",
    "inventoryLevel" => [
      "@type" => "QuantitativeValue",
      "value" => $liveInventory
    ],
    "priceCurrency" => "INR",
    "price" => "Call for Availability"
  ]
]];

// Fetch Q&A for the UGC Engine
$pageCategory = $seoData['category'] ?? '';
$pageQnA = $supabase->getQnA($location, $pageCategory);

if (!empty($pageQnA)) {
    $faqSchema = [
        "@type" => "FAQPage",
        "@id" => "https://stoiccare.in/#faq-" . htmlspecialchars($slug),
        "about" => [
            "@id" => $serviceId
        ],
        "mainEntity" => []
    ];
    foreach ($pageQnA as $qna) {
        if (!empty($qna['answer'])) {
            $faqSchema["mainEntity"][] = [
                "@type" => "Question",
                "name" => $qna['question'],
                "acceptedAnswer" => [
                    "@type" => "Answer",
                    "text" => $qna['answer']
                ]
            ];
        }
    }
    if (!empty($faqSchema["mainEntity"])) {
        $customSchema[] = $faqSchema;
    }
}

require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';
?>

<main id="main-content">
<!-- ══ DYNAMIC HERO ══ -->
<header class="contact-hero-section" aria-label="Service Page Hero">
  <div class="container position-relative" style="z-index:2; padding-bottom : 25px">
    <div class="row align-items-center g-5 py-5 ">
      <div class="col-lg-7" data-aos="fade-right">
        <div class="hero-badge"><i class="fa-solid fa-location-dot me-2"></i>Available in <?= htmlspecialchars($location) ?></div>
        <h1 class="hero-title"><?= htmlspecialchars($h1Title) ?></h1>
        <p class="hero-sub"><?= htmlspecialchars($heroSub) ?></p>
        
        <!-- Live Scarcity Pulse UI -->
        <div class="mt-3 mb-4 d-inline-flex align-items-center bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-pill px-4 py-2 shadow-sm" style="backdrop-filter: blur(4px);">
            <div class="pulse-dot bg-danger rounded-circle me-3" style="width:12px; height:12px; box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); animation: livePulse 2s infinite;"></div>
            <span class="text-danger fw-bold fs-6"><?= htmlspecialchars($urgencyMessage) ?></span>
        </div>
        <style>
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
        }
        </style>
        <div class="hero-btns">
          <button type="button" class="btn-primary-grad" onclick="openBookModal('<?= htmlspecialchars($h1Title, ENT_QUOTES) ?>')">
            <i class="fa-solid fa-calendar-check me-2"></i>Book Now
          </button>
          <a href="tel:+917668232867" class="btn-outline-white"><i class="fa-solid fa-phone me-2"></i>Call +91 76682 32867</a>
        </div>
      </div>
      <div class="col-lg-5 hero-img-side" data-aos="fade-left">
        <!-- Add a relevant image or illustration here -->
        <img src="<?= CLIENT_IMAGES ?>/clinic_03.jpg" class="img-fluid rounded-4 shadow-lg" alt="<?= htmlspecialchars($h1Title) ?>" style="border: 4px solid white;" loading="eager" fetchpriority="high">
      </div>
    </div>
  </div>
</header>

<!-- ══ DYNAMIC CONTENT ══ -->
<section class="section-pad">
  <div class="container">
    
    <!-- Visual Breadcrumbs -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= BASE_URL ?>/">Home</a></li>
        <li class="breadcrumb-item"><a href="<?= BASE_URL ?>/category/<?= strtolower(str_replace(' ', '-', $seoData['category'] ?? 'service')) ?>"><?= htmlspecialchars($seoData['category'] ?? 'Service') ?></a></li>
        <li class="breadcrumb-item"><a href="<?= BASE_URL ?>/location/<?= strtolower(str_replace(' ', '-', $location)) ?>"><?= htmlspecialchars($location) ?></a></li>
        <li class="breadcrumb-item active" aria-current="page"><?= htmlspecialchars($h1Title) ?></li>
      </ol>
    </nav>

    <div class="row justify-content-center">
      <div class="col-lg-9">
        <article class="seo-content-block" data-aos="fade-up">
          <!-- The AI generated HTML content is injected here safely with forced lazy-loading for images and Wikipedia Engine internal links -->
          <?php 
            require_once __DIR__ . '/../includes/AutoLinker.php';
            $lazyLoadedHtml = str_replace('<img ', '<img loading="lazy" ', $htmlBody);
            $dictionary = $supabase->getLinkDictionary();
            $linkedHtml = AutoLinker::linkify($lazyLoadedHtml, $dictionary);
            echo $linkedHtml;
          ?>
        </article>
      </div>
    </div>
  </div>
</section>

<!-- ══ LIVE CUSTOMER REVIEWS (E-E-A-T Engine) ══ -->
<?php
$serviceReviews = $supabase->getReviewsBySlug($slug);
if (!empty($serviceReviews)):
?>
<section class="section-pad bg-white">
  <div class="container">
    <div class="row mb-5">
      <div class="col-12 text-center">
        <h2 class="h3 fw-bold">What Our Clients Say</h2>
        <p class="text-muted">Real experiences from families who trusted Stoic Home Care.</p>
      </div>
    </div>
    <div class="row g-4 justify-content-center">
      <?php foreach (array_slice($serviceReviews, 0, 3) as $review): ?>
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 border border-light bg-light rounded shadow-sm p-4">
          <div class="mb-3 text-warning">
            <?php for($i=1; $i<=5; $i++): ?>
              <i class="fa-<?= $i <= (int)$review['rating'] ? 'solid' : 'regular' ?> fa-star"></i>
            <?php endfor; ?>
          </div>
          <p class="fst-italic text-muted mb-4">"<?= htmlspecialchars($review['review_text']) ?>"</p>
          <div class="d-flex align-items-center mt-auto">
            <div class="bg-teal text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style="width: 40px; height: 40px;">
              <?= strtoupper(substr($review['reviewer_name'], 0, 1)) ?>
            </div>
            <div>
              <h4 class="h6 mb-0 fw-bold"><?= htmlspecialchars($review['reviewer_name']) ?></h4>
              <small class="text-muted"><i class="fa-solid fa-location-dot me-1"></i> <?= htmlspecialchars($review['location']) ?></small>
            </div>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<!-- ══ LOCAL COMMUNITY Q&A (UGC Trap) ══ -->
<section class="section-pad bg-light">
  <div class="container">
    <div class="row mb-5 align-items-center">
      <div class="col-md-8 text-center text-md-start">
        <h2 class="h3 fw-bold">Community Q&A - <?= htmlspecialchars($location) ?></h2>
        <p class="text-muted mb-0">Common questions about <?= htmlspecialchars($pageCategory) ?> answered by our experts and local community.</p>
      </div>
      <div class="col-md-4 text-center text-md-end mt-3 mt-md-0">
        <button type="button" class="btn btn-outline-teal" data-bs-toggle="modal" data-bs-target="#askQuestionModal">
          <i class="fa-solid fa-comments me-2"></i>Ask a Question
        </button>
      </div>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <?php if (!empty($pageQnA)): ?>
        <div class="accordion shadow-sm" id="qnaAccordion">
          <?php foreach ($pageQnA as $index => $qna): ?>
          <div class="accordion-item border-0 border-bottom">
            <h3 class="accordion-header" id="headingQnA<?= $index ?>">
              <button class="accordion-button <?= $index === 0 ? '' : 'collapsed' ?> bg-white fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseQnA<?= $index ?>" aria-expanded="<?= $index === 0 ? 'true' : 'false' ?>" aria-controls="collapseQnA<?= $index ?>">
                <?= htmlspecialchars($qna['question']) ?>
              </button>
            </h3>
            <div id="collapseQnA<?= $index ?>" class="accordion-collapse collapse <?= $index === 0 ? 'show' : '' ?>" aria-labelledby="headingQnA<?= $index ?>" data-bs-parent="#qnaAccordion">
              <div class="accordion-body bg-white text-muted">
                <?= nl2br(htmlspecialchars($qna['answer'])) ?>
                <div class="mt-3 small text-secondary d-flex align-items-center">
                  <span class="me-3"><i class="fa-solid fa-user me-1"></i> Asked by <?= htmlspecialchars($qna['asker_name']) ?></span>
                  <?php if ($qna['is_expert_answered']): ?>
                  <span class="text-teal"><i class="fa-solid fa-circle-check me-1"></i> Expert Answered</span>
                  <?php endif; ?>
                </div>
              </div>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
        <?php else: ?>
        <div class="text-center p-5 bg-white rounded shadow-sm border border-light">
          <i class="fa-regular fa-comment-dots fa-3x text-muted mb-3"></i>
          <h4 class="h5">No questions yet for <?= htmlspecialchars($location) ?></h4>
          <p class="text-muted">Be the first to ask a question about <?= htmlspecialchars($pageCategory) ?> in your area.</p>
          <button type="button" class="btn btn-teal mt-2" data-bs-toggle="modal" data-bs-target="#askQuestionModal">Ask Now</button>
        </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>

<!-- Ask Question Modal -->
<div class="modal fade" id="askQuestionModal" tabindex="-1" aria-labelledby="askQuestionModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg">
      <div class="modal-header bg-teal text-white border-0">
        <h5 class="modal-title" id="askQuestionModalLabel">Ask the Experts</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        <form id="qnaForm" onsubmit="submitQnA(event)">
          <input type="hidden" name="location" value="<?= htmlspecialchars($location) ?>">
          <input type="hidden" name="category" value="<?= htmlspecialchars($pageCategory) ?>">
          
          <div class="mb-3">
            <label class="form-label fw-bold">Your Name</label>
            <input type="text" name="asker_name" class="form-control" placeholder="Enter your name" required>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Your Question</label>
            <textarea name="question" class="form-control" rows="3" placeholder="What would you like to know about <?= htmlspecialchars($pageCategory) ?> in <?= htmlspecialchars($location) ?>?" required></textarea>
          </div>
          <div class="d-grid mt-4">
            <button type="submit" class="btn btn-teal btn-lg" id="qnaSubmitBtn">Submit Question</button>
          </div>
          <div id="qnaAlert" class="mt-3 text-center d-none"></div>
        </form>
      </div>
    </div>
  </div>
</div>

<script>
function submitQnA(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('qnaSubmitBtn');
  const alert = document.getElementById('qnaAlert');
  const formData = new FormData(form);
  
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Submitting...';
  
  fetch('<?= BASE_URL ?>/api/submit_qna.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    alert.classList.remove('d-none', 'text-danger', 'text-success');
    if (data.success) {
      alert.classList.add('text-success');
      alert.innerHTML = '<i class="fa-solid fa-circle-check me-1"></i> ' + data.message;
      form.reset();
      setTimeout(() => {
        var modal = bootstrap.Modal.getInstance(document.getElementById('askQuestionModal'));
        modal.hide();
        alert.classList.add('d-none');
      }, 3000);
    } else {
      alert.classList.add('text-danger');
      alert.innerHTML = '<i class="fa-solid fa-triangle-exclamation me-1"></i> ' + (data.error || 'Something went wrong.');
    }
  })
  .catch(err => {
    alert.classList.remove('d-none', 'text-success');
    alert.classList.add('text-danger');
    alert.innerHTML = '<i class="fa-solid fa-triangle-exclamation me-1"></i> Connection error. Please try again.';
  })
  .finally(() => {
    btn.disabled = false;
    btn.innerHTML = 'Submit Question';
  });
}
</script>

<!-- ══ RELATED SERVICES WEDGE (Topical Mesh) ══ -->
<?php
$relatedPages = $supabase->getPagesByLocation($location);
if (is_array($relatedPages) && count($relatedPages) > 1):
?>
<section class="section-pad bg-light">
  <div class="container">
    <div class="row mb-4">
      <div class="col-12 text-center">
        <h2 class="h3 fw-bold">Other Services in <?= htmlspecialchars($location) ?></h2>
        <p class="text-muted">Explore more top-rated home care solutions available in your area.</p>
      </div>
    </div>
    <div class="row g-4 justify-content-center">
      <?php 
      $count = 0;
      foreach ($relatedPages as $rPage): 
        if ($rPage['slug'] === $slug) continue; // Skip current page
        if ($count >= 3) break; // Show only 3
      ?>
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0 hover-lift">
          <div class="card-body p-4">
            <h3 class="h6 card-title"><a href="<?= BASE_URL ?>/service/<?= htmlspecialchars($rPage['slug']) ?>" class="text-dark text-decoration-none"><?= htmlspecialchars($rPage['page_title'] ?? '') ?></a></h3>
          </div>
          <div class="card-footer bg-white border-0 p-4 pt-0">
            <a href="<?= BASE_URL ?>/service/<?= htmlspecialchars($rPage['slug']) ?>" class="btn btn-outline-teal btn-sm w-100">Learn More</a>
          </div>
        </div>
      </div>
      <?php 
        $count++;
      endforeach; 
      ?>
    </div>
  </div>
</section>
<?php endif; ?>

</main>

<style>
.seo-content-block {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #444;
}
.seo-content-block h2 {
    color: var(--dark);
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 700;
}
.seo-content-block p {
    margin-bottom: 1.5rem;
}
</style>



<?php require_once ROOT . '/client/views/partials/book-service-modal.php'; ?>
<?php require_once ROOT . '/client/includes/footer.php'; ?>
