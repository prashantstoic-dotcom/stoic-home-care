<?php
/* ============================================================
   Stoic Home Care — client/views/services.php
   ============================================================ */

$pageTitle = 'Home Care Services – ICU Setup, Nursing, Elder Care | Stoic Home Care';
$pageDesc  = 'Explore all Home Care services by Stoic Home Care: ICU setup, nursing, old age care, physiotherapy and more.';

$preloadHero = CLIENT_IMAGES . '/ab-3.avif';
require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';

$db       = getDB();
$services = $db->query("SELECT * FROM services ORDER BY id ASC")->fetchAll();
?>
<style>
/* Reduce hero vertical space on mobile */
@media (max-width: 991.98px) {

  .hero-swiper .row {
    min-height: 72vh !important;   /* was 100vh *//* account for fixed navbar */
    padding-bottom: 1.2rem !important;
  }

  /* Reduce text spacing */
  .hero-title {
    margin-bottom: 0.6rem;
    line-height: 1.15;
  }

  .hero-sub {
    margin-bottom: 1rem;
    font-size: 0.92rem;
  }

  .hero-badge {
    margin-bottom: 0.6rem;
  }

  .hero-btns {
    margin-top: 0.8rem;
  }
}

  </style>

<main id="main-content">
<!-- ══ HERO SWIPER ══ -->
<header class="swiper hero-swiper short-hero" aria-label="Services Page Hero">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img class="hero-bg" src="<?= CLIENT_IMAGES?>/ab-3.avif" alt="Home Care Services" loading="eager" width="1920" height="1080">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="row align-items-center" style="min-height:60vh;padding-top:10px;padding-bottom:2rem">
          <div class="col-lg-8">
            <div class="hero-badge"><i class="fa-solid fa-stethoscope me-2"></i>15+ Specialized Services</div>
            <div class="hero-title">Comprehensive Home<br><span>Home Care Services</span></div>
            <p class="hero-sub">Professional medical care tailored to your needs — delivered with clinical precision and human compassion, right at your doorstep. Available 24/7.</p>
            <div class="hero-btns">
              
               <button type="button" class="btn-primary-grad"
onclick="openBookModal('Home Care Services')">
  <i class="fa-solid fa-calendar-check me-2"></i>Book Now
</button>
              <a href="tel:+917668232867" class="btn-outline-white"><i class="fa-solid fa-phone me-2"></i>Emergency Call</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-slide">
      <img class="hero-bg" src="<?= CLIENT_IMAGES?>/clinic_03.jpg" alt="Nursing Care" loading="lazy" width="1920" height="1080">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="row align-items-center" style="min-height:60vh;padding-top:10px;padding-bottom:2rem">
          <div class="col-lg-8">
            <div class="hero-badge"><i class="fa-solid fa-user-nurse me-2"></i>ICU-Trained Nursing Staff</div>
            <div class="hero-title">World-Class Nursing<br><span>In Your Home</span></div>
            <p class="hero-sub">Our ICU-trained nurses bring critical care expertise to your home. From wound management to IV therapy — professional and compassionate every step.</p>
            <div class="hero-btns">
              <button type="button" class="btn-primary-grad"
  onclick="openBookModal('Nursing Care')">
  <i class="fa-solid fa-calendar-check me-2"></i>Book Now
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-slide">
      <img class="hero-bg" src="<?= CLIENT_IMAGES?>/clinic_02.jpg" alt="Elder Care" loading="lazy" width="1920" height="1080">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="row align-items-center" style="min-height:60vh;padding-top:10px;padding-bottom:2rem">
          <div class="col-lg-8">
            <div class="hero-badge"><i class="fa-solid fa-heart-pulse me-2"></i>Care for Every Stage of Life</div>
            <div class="hero-title">Compassionate Care<br><span>For Your Loved Ones</span></div>
            <p class="hero-sub">From newborns to the elderly — dignified, compassionate care for every member of your family. Because everyone deserves to heal at home.</p>
            <div class="hero-btns">
            <button type="button" class="btn-primary-grad"
 onclick="openBookModal('Old Age Care')">
  <i class="fa-solid fa-calendar-check me-2"></i>Book Now
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="swiper-button-next" aria-label="Next Slide"></div>
  <div class="swiper-button-prev" aria-label="Previous Slide"></div>
  <div class="swiper-pagination" style="bottom:2rem"></div>
</header>


<section class="section-pad" style="background:var(--light)">
  <div class="container">
    <div class="text-center mb-5" data-aos="fade-up">
      <div class="section-badge"><i class="fa-solid fa-stethoscope me-1"></i> Our Services</div>
      <h1 class="section-title">Complete Home Care Services</h1>
      <div class="divider-grad mx-auto"></div>
      <p class="section-sub mx-auto">Every service designed around patient comfort, clinical excellence, and family peace of mind.</p>
    </div>

    <div class="row g-4">
      <?php if (!empty($services)): ?>
        <?php foreach ($services as $d => $svc): ?>
        <article class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="<?= ($d % 3) * 100 ?>">
          <div class="service-card">
            <div class="sc-img">
              <img src="<?= $svc['image'] ? SERVICE_UPLOAD_URL . '/' . htmlspecialchars($svc['image']) : CLIENT_IMAGES . '/equip.avif' ?>"
                   alt="<?= htmlspecialchars($svc['title']) ?>" loading="lazy" width="400" height="250">
              <div class="sc-icon"><span class="material-icons-round">local_hospital</span></div>
            </div>
            <div class="sc-body">
              <div class="sc-tag"><?= htmlspecialchars($svc['category'] ?? '') ?></div>
              <h5><?= htmlspecialchars($svc['title']) ?></h5>
              <p><?= htmlspecialchars($svc['description'] ?? '') ?></p>
            <button type="button" class="btn-outline-info btn"
  onclick="openBookModal('<?= htmlspecialchars($svc['title'], ENT_QUOTES) ?>')">
  Book Now <i class="fa-solid fa-arrow-right fa-xs"></i>
</button>
            </div>
          </div>
        </article>
        <?php endforeach; ?>
      <?php else: ?>
        <!-- Static fallback services -->
        <?php
        $staticServices = [
          ['equip.avif','Critical Care','ICU Setup @ Home','Complete ICU infrastructure with ventilators, monitors and critical care nurses.','local_hospital',['Ventilator & BiPAP support','Multi-parameter monitors','ICU-trained nurses 24/7']],
          ['nurse.avif','Nursing','ICU Trained Nursing','Certified nurses for post-op care, IV therapy, wound management and monitoring.','medical_services',['Post-operative care','IV infusion & wound dressing','Catheter & stoma care']],
          ['old.jpg','Elder Care','Old Age Care','Compassionate full-time care for seniors including daily assistance and health monitoring.','elderly',['Daily living assistance','Medication reminders','Fall prevention & mobility']],
          ['child.jpg','Maternity','Mother & Baby Care','Post-natal support for new mothers and neonatal care for newborns by specialists.','child_care',['Post-natal recovery','Breastfeeding support','Newborn hygiene & care']],
          ['doctor_03.jpg','Doctor Visit','Doctor on Call','Board-certified physicians visiting your home for diagnosis, prescriptions and follow-ups.','health_and_safety',['Home consultation','Prescription & lab coordination','Emergency response']],
          ['physio.webp','Rehabilitation','Physiotherapy @ Home','Expert physiotherapists for stroke rehab, post-surgical recovery and pain management.','sports_gymnastics',['Stroke & neuro rehab','Orthopaedic recovery','Geriatric physiotherapy']],
          ['nurse.webp','Nursing','Nursing Attendant','Trained nursing attendants providing round-the-clock care and support for patients.','support',['Personal hygiene care','Patient mobility','Vital signs monitoring']],
          ['ab-1.avif','Specialised','Covid Care @ Home','Specialised care for Covid-19 patients including oxygen therapy and monitoring.','coronavirus',['Oxygen saturation monitoring','Prescribed medication','Isolation protocol']],
          ['ab-2.avif','Mental Health','Psychologist @ Home','Qualified psychologists providing therapy and counselling in the comfort of your home.','psychology',['Individual therapy','Anxiety & depression support','Family counselling']],
        ];
        foreach ($staticServices as $d => [$img, $tag, $title, $desc, $icon, $features]):
        ?>
        <article class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="<?= ($d % 3) * 100 ?>">
          <div class="service-card">
            <div class="sc-img">
              <img src="<?= CLIENT_IMAGES ?>/<?= $img ?>" alt="<?= $title ?>" loading="lazy" width="400" height="250">
              <div class="sc-icon"><span class="material-icons-round"><?= $icon ?></span></div>
            </div>
            <div class="sc-body">
              <div class="sc-tag"><?= $tag ?></div>
              <h5><?= $title ?></h5>
              <p><?= $desc ?></p>
              <ul class="sc-features">
                <?php foreach ($features as $f): ?><li><?= $f ?></li><?php endforeach; ?>
              </ul>
             <button type="button" class="btn-primary btn "
  onclick="openBookModal('<?= htmlspecialchars($title, ENT_QUOTES) ?>')">
  Book Now <i class="fa-solid fa-arrow-right fa-xs"></i>
</button>
            </div>
          </div>
        </article>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- ══ HOW IT WORKS ══ -->
<section class="section-pad" style="background:var(--light)">
  <div class="container">
    <div class="text-center mb-5" data-aos="fade-up">
      <div class="section-badge"><i class="fa-solid fa-list-check me-1"></i> Our Process</div>
      <h2 class="section-title">How It Works</h2>
      <p class="section-sub mx-auto">Getting started is simple. We handle everything so you can focus on recovery.</p>
    </div>
    <div class="row g-4">
      <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="0">
        <div class="process-card">
          <div class="p-num">01</div>
          <div class="p-icon"><span class="material-icons-round" style="font-size:2.2rem;color:var(--teal)">phone_in_talk</span></div>
          <h5>Contact Us</h5>
          <p>Call or fill the form. Our coordinator calls back within 1 hour.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
        <div class="process-card">
          <div class="p-num">02</div>
          <div class="p-icon"><span class="material-icons-round" style="font-size:2.2rem;color:var(--teal)">assignment</span></div>
          <h5>Need Assessment</h5>
          <p>We assess your needs and create a custom care plan tailored to you.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
        <div class="process-card">
          <div class="p-num">03</div>
          <div class="p-icon"><span class="material-icons-round" style="font-size:2.2rem;color:var(--teal)">home</span></div>
          <h5>Care Begins</h5>
          <p>Our certified professional arrives, sets up equipment and begins care.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
        <div class="process-card">
          <div class="p-num">04</div>
          <div class="p-icon"><span class="material-icons-round" style="font-size:2.2rem;color:var(--teal)">health_and_safety</span></div>
          <h5>Ongoing Support</h5>
          <p>Regular health updates, doctor coordination and 24/7 helpline throughout.</p>
        </div>
      </div>
    </div>
  </div>
</section>
</main>

<?php if (!empty($services)): ?>
<script type="application/ld+json">
[
<?php foreach ($services as $i => $svc): ?>
  {
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": "<?= htmlspecialchars($svc['title']) ?>",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Stoic Home Care"
    },
    "description": "<?= htmlspecialchars($svc['description'] ?? '') ?>",
    "areaServed": ["Greater Noida", "Noida", "Delhi NCR", "Ghaziabad"]
  }<?= $i < count($services) - 1 ? ',' : '' ?>
<?php endforeach; ?>
]
</script>
<?php endif; ?>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What Home Care services do you provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We provide ICU at home, nursing care, elderly care, physiotherapy, and doctor on call services in the Delhi NCR region."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can you arrange an ICU setup at home?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We can typically arrange a complete ICU setup at your home within 4 to 6 hours depending on your exact location in Delhi NCR."
      }
    }
  ]
}
</script>

<?php require_once ROOT . '/client/views/partials/book-service-modal.php'; ?>
<?php require_once ROOT . '/client/includes/footer.php'; ?>
