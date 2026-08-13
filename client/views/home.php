<?php
/* ============================================================
   Stoic Home Care — client/views/home.php
   Home page — fetches dynamic services & equipment from DB
   ============================================================ */

$pageTitle = 'ICU at Home & Expert Nursing Services in Greater Noida | Stoic Home Care';
$pageDesc  = 'Stoic Home Care provides hospital-grade home care in Greater Noida – ICU setup, certified nursing, old age care, mother & baby care, and medical equipment rental. 24/7 Availability.';


$preloadHero = CLIENT_IMAGES . '/carousel-1.avif';
require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';

// Fetch dynamic services (limit 6 for homepage)
$db = getDB();
$services = $db->query("SELECT * FROM services ORDER BY id DESC LIMIT 6")->fetchAll();

// Fetch dynamic equipment (for carousel)
$equipment = $db->query("SELECT * FROM equipment ORDER BY id DESC LIMIT 8")->fetchAll();
?>
<style>
    /* ── Hero slides 2 & 3 mobile fix ── */
@media (max-width: 991px) {
  .hero-row-short {
    align-items: flex-start !important;
    padding-top: 100px !important;
    min-height: auto !important;
    height: 100vh;
  }

  /* Also stop swiper slides from stacking on each other */
  .hero-swiper .swiper-slide {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}

@media (max-width: 575px) {
  .hero-row-short {
    padding-top: 90px !important;
  }
}
</style>
<main id="main-content">
<!-- ══ MAIN HERO (Static Split-Screen) ══ -->
<div class="main-hero" style="position:relative; overflow:hidden; background:#0f2240; padding: 140px 0 80px; display:flex; align-items:center;">
  <img class="hero-bg" src="<?= CLIENT_IMAGES ?>/carousel-1.avif" alt="ICU Home Care" width="1920" height="1080" loading="eager" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.4;">
  <div class="hero-overlay" style="position:absolute; inset:0; background:linear-gradient(135deg, rgba(15,34,64,0.95) 0%, rgba(33,150,211,0.8) 100%);"></div>
  
  <div class="container hero-content" style="position:relative; z-index:2;">
    <div class="row align-items-center g-5">
      
      <!-- Left: Typography & CTAs -->
      <div class="col-lg-6">
        <div class="hero-badge" style="background:rgba(78,205,196,.15); color:#7ee8e2; border:1px solid rgba(78,205,196,.3); padding:.5rem 1rem; border-radius:50px; display:inline-block; font-size:0.85rem; font-weight:600; margin-bottom:1.5rem;">
          <i class="fa-solid fa-shield-heart me-1"></i> Trusted by 10,000+ Families
        </div>
        <h1 class="hero-title" style="font-size:clamp(2.5rem, 5vw, 4rem); font-weight:800; color:#fff; line-height:1.1; margin-bottom:1.5rem; font-family:'Outfit', sans-serif;">
          Hospital-Quality Care<br><span style="color:#4ecdc4;">Right at Home.</span>
        </h1>
        <p class="hero-sub" style="font-size:1.1rem; color:rgba(255,255,255,0.85); line-height:1.7; margin-bottom:2.5rem; max-width:540px;">
          Expert ICU setups, certified nursing staff, and advanced medical equipment delivered to your doorstep. We bring the hospital to you, 24/7.
        </p>
        <div class="hero-btns" style="display:flex; gap:1rem; flex-wrap:wrap;">
          <a href="tel:+917668232867" class="btn btn-lg" aria-label="Call Emergency at +917668232867" style="background:#ff4b4b; color:#fff; border-radius:50px; padding:0.8rem 2rem; font-weight:700; box-shadow:0 8px 25px rgba(255,75,75,0.4);"><i class="fa-solid fa-phone me-2"></i>Call Emergency</a>
          <a href="<?= BASE_URL ?>/contact" class="btn btn-lg" aria-label="Book Consultation" style="background:#fff; color:#0f2240; border-radius:50px; padding:0.8rem 2rem; font-weight:700; box-shadow:0 8px 25px rgba(0,0,0,0.1);"><i class="fa-solid fa-calendar-check me-2"></i>Book Consultation</a>
        </div>
      </div>

      <!-- Right: Premium Image & Glassmorphism Badges -->
      <div class="col-lg-6 hero-img-side text-center text-lg-end" style="position:relative;">
        <div style="position:relative; display:inline-block;">
          <img src="<?= CLIENT_IMAGES ?>/doctor.avif" alt="Home Doctor" width="500" height="600" style="border-radius:30px; width:100%; max-width:500px; height:auto; box-shadow:0 30px 60px rgba(0,0,0,0.5);">
          
          <!-- Floating Badge 1 -->
          <div class="hero-float f1 d-none d-xl-flex" style="position:absolute; bottom:30px; left:-80px; background:rgba(255,255,255,0.95); padding:0.8rem 1rem; border-radius:12px; align-items:center; gap:0.8rem; box-shadow:0 15px 35px rgba(0,0,0,0.15); animation: floatY 4s ease-in-out infinite;">
            <div style="background:rgba(37,211,102,.15); width:35px; height:35px; display:flex; align-items:center; justify-content:center; border-radius:50%;"><i class="fa-solid fa-star" style="color:#F5B041; font-size:1rem;"></i></div>
            <div class="text-start">
              <div style="font-weight:800; font-size:1rem; color:#0f2240; line-height:1.2;">4.9/5 Rating</div>
              <div style="font-size:0.75rem; color:#6b82a3; font-weight:600;">Google Reviews</div>
            </div>
          </div>

          <!-- Floating Badge 2 -->
          <div class="hero-float f2 d-none d-xl-flex" style="position:absolute; top:30px; right:-60px; background:rgba(255,255,255,0.95); padding:0.8rem 1rem; border-radius:12px; align-items:center; gap:0.8rem; box-shadow:0 15px 35px rgba(0,0,0,0.15); animation: floatY 5s ease-in-out infinite reverse;">
            <div style="background:rgba(33,150,211,.15); width:35px; height:35px; display:flex; align-items:center; justify-content:center; border-radius:50%;"><i class="fa-solid fa-user-nurse" style="color:#2196d3; font-size:1rem;"></i></div>
            <div class="text-start">
              <div style="font-weight:800; font-size:1rem; color:#0f2240; line-height:1.2;">Verified Staff</div>
              <div style="font-size:0.75rem; color:#6b82a3; font-weight:600;">100% Checked</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
<style>
  @keyframes floatY {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  @media (max-width: 991px) {
    .hero-float { display: none !important; }
    .main-hero { padding-top: 80px; min-height: auto !important; }
  }
</style>

<!-- ══ TICKER ══ -->
<div class="ticker-wrap">
  <div class="ticker-inner">
    <?php
    $tickers = ['ICU Setup @ Home','Nursing Attendant','Old Age Care','Mother &amp; Baby Care','Doctor on Call','Physiotherapy','Oxygen Concentrators','Hospital Beds','Wheelchairs'];
    $icons   = ['fa-hospital','fa-pills','fa-user-nurse','fa-baby','fa-stethoscope','fa-dumbbell','fa-lungs','fa-bed-pulse','fa-wheelchair'];
    foreach (array_merge($tickers, $tickers) as $i => $t):
        $icon = $icons[$i % count($icons)];
    ?>
    <span class="ticker-item"><i class="fa-solid <?= $icon ?> me-1"></i> <?= $t ?></span>
    <?php endforeach; ?>
  </div>
</div>
<!-- ══ PREMIUM METRICS BAR ══ -->
<section style="background:#fff; padding:3rem 0; border-bottom:1px solid rgba(0,0,0,0.05);">
  <div class="container">
    <div class="row g-4 text-center">
      <div class="col-6 col-md-3" data-aos="fade-up" data-aos-delay="0">
        <div style="font-size:2.5rem; color:#4ecdc4; margin-bottom:0.5rem;"><i class="fa-solid fa-users"></i></div>
        <h4 style="font-size:1.8rem; font-weight:800; color:#0f2240; margin-bottom:0.2rem;">10,000+</h4>
        <p style="color:#6b82a3; font-weight:600; font-size:0.9rem; margin:0;">Patients Served</p>
      </div>
      <div class="col-6 col-md-3" data-aos="fade-up" data-aos-delay="100">
        <div style="font-size:2.5rem; color:#4ecdc4; margin-bottom:0.5rem;"><i class="fa-solid fa-user-nurse"></i></div>
        <h4 style="font-size:1.8rem; font-weight:800; color:#0f2240; margin-bottom:0.2rem;">50+</h4>
        <p style="color:#6b82a3; font-weight:600; font-size:0.9rem; margin:0;">ICU Trained Staff</p>
      </div>
      <div class="col-6 col-md-3" data-aos="fade-up" data-aos-delay="200">
        <div style="font-size:2.5rem; color:#4ecdc4; margin-bottom:0.5rem;"><i class="fa-solid fa-bolt"></i></div>
        <h4 style="font-size:1.8rem; font-weight:800; color:#0f2240; margin-bottom:0.2rem;">2 Hours</h4>
        <p style="color:#6b82a3; font-weight:600; font-size:0.9rem; margin:0;">Fast Deployment</p>
      </div>
      <div class="col-6 col-md-3" data-aos="fade-up" data-aos-delay="300">
        <div style="font-size:2.5rem; color:#4ecdc4; margin-bottom:0.5rem;"><i class="fa-solid fa-award"></i></div>
        <h4 style="font-size:1.8rem; font-weight:800; color:#0f2240; margin-bottom:0.2rem;">ISO 9001</h4>
        <p style="color:#6b82a3; font-weight:600; font-size:0.9rem; margin:0;">2015 Certified</p>
      </div>
    </div>
  </div>
</section>

<!-- ══ SERVICES PREVIEW (dynamic from DB, fallback to static) ══ -->
<section class="section-pad">
  <div class="container">
    <div class="row align-items-end mb-5">
      <div class="col-lg-7" data-aos="fade-right">
        <div class="section-badge"><i class="fa-solid fa-stethoscope me-1"></i> Home Care Services</div>
        <h2 class="section-title">Complete Home Care Solutions</h2>
        <div class="divider-grad"></div>
        <p class="section-sub">Every service is designed around patient comfort, clinical excellence, and family peace of mind.</p>
      </div>
      <div class="col-lg-5 text-lg-end mt-3 mt-lg-0" data-aos="fade-left">
        <a href="<?= BASE_URL ?>/services" class="btn-primary-grad text-center"><i class="fa-solid fa-grid-2 me-2"></i>View All Services</a>
      </div>
    </div>
    <div class="row g-4">
      <?php if (!empty($services)): ?>
        <?php foreach ($services as $d => $svc): ?>
        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="<?= ($d % 3) * 100 ?>">
          <div class="service-card">
            <div class="sc-img">
              <img src="<?= $svc['image'] ? SERVICE_UPLOAD_URL . '/' . htmlspecialchars($svc['image']) : CLIENT_IMAGES . '/equip.avif' ?>"
                   alt="<?= htmlspecialchars($svc['title']) ?>" width="400" height="300" loading="lazy">
              <div class="sc-icon"><span class="material-icons-round">local_hospital</span></div>
            </div>
            <div class="sc-body">
              <div class="sc-tag"><?= htmlspecialchars($svc['category'] ?? '') ?></div>
              <h5><?= htmlspecialchars($svc['title']) ?></h5>
              <p><?= htmlspecialchars($svc['description']) ?></p>
              <a href="<?= BASE_URL ?>/services" class="sc-link" aria-label="Learn More about <?= htmlspecialchars($svc['title']) ?>">Learn More <i class="fa-solid fa-arrow-right fa-xs"></i></a>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      <?php else: ?>
        <!-- Static fallback if no services in DB yet -->
        <?php
        $staticServices = [
          ['equip.avif','Critical Care','ICU Setup @ Home','Complete ICU infrastructure with ventilators, monitors and critical care nurses.','local_hospital'],
          ['nurse.avif','Nursing','ICU Trained Nursing','Certified nurses for post-op care, IV therapy, wound management and monitoring.','medical_services'],
          ['old.jpg','Elder Care','Old Age Care','Compassionate full-time care for seniors including daily assistance and health monitoring.','elderly'],
          ['child.jpg','Maternity','Mother &amp; Baby Care','Post-natal support for new mothers and neonatal care for newborns by specialists.','child_care'],
          ['doctor_03.jpg','Doctor Visit','Doctor on Call','Board-certified physicians visiting your home for diagnosis, prescriptions and follow-ups.','health_and_safety'],
          ['physio.webp','Rehabilitation','Physiotherapy @ Home','Expert physiotherapists for stroke rehab, post-surgical recovery and pain management.','sports_gymnastics'],
        ];
        foreach ($staticServices as $d => [$img, $tag, $title, $desc, $icon]):
        ?>
        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="<?= ($d % 3) * 100 ?>">
          <div class="service-card">
            <div class="sc-img">
              <img src="<?= CLIENT_IMAGES ?>/<?= $img ?>" alt="<?= $title ?>" width="400" height="300" loading="lazy">
              <div class="sc-icon"><span class="material-icons-round"><?= $icon ?></span></div>
            </div>
            <div class="sc-body">
              <div class="sc-tag"><?= $tag ?></div>
              <h5><?= $title ?></h5>
              <p><?= $desc ?></p>
              <a href="<?= BASE_URL ?>/services" class="sc-link" aria-label="Learn More about <?= $title ?>">Learn More <i class="fa-solid fa-arrow-right fa-xs"></i></a>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- ══ HOW IT WORKS ══ -->
<section class="section-pad" style="background:#f8fbff; overflow:hidden;">
  <div class="container">
    <div class="text-center mb-5" data-aos="fade-up">
      <div class="section-badge"><i class="fa-solid fa-bars-progress me-1"></i> Simple Process</div>
      <h2 class="section-title">How It Works</h2>
      <p class="section-sub">Get hospital-grade care at home in 3 simple steps</p>
    </div>
    <div class="timeline-container">
      <div class="timeline-track"></div>
      <div class="row g-4 position-relative" style="z-index: 1;">
        <div class="col-md-4 timeline-step" data-aos="fade-up" data-aos-delay="0">
          <div class="how-step-card text-center">
            <div class="how-num-wrapper">
              <div class="how-num-glow"></div>
              <div class="how-num">1</div>
            </div>
            <h4>Request a Callback</h4>
            <p class="text-muted mb-0">Fill out our quick form or call us directly. Our care coordinator connects with you within 60 minutes.</p>
          </div>
        </div>
        <div class="col-md-4 timeline-step" data-aos="fade-up" data-aos-delay="100">
          <div class="how-step-card text-center">
            <div class="how-num-wrapper">
              <div class="how-num-glow"></div>
              <div class="how-num">2</div>
            </div>
            <h4>Clinical Assessment</h4>
            <p class="text-muted mb-0">Our medical experts assess your specific needs and match you with the right ICU-trained professionals.</p>
          </div>
        </div>
        <div class="col-md-4 timeline-step" data-aos="fade-up" data-aos-delay="200">
          <div class="how-step-card text-center">
            <div class="how-num-wrapper">
              <div class="how-num-glow"></div>
              <div class="how-num">3</div>
            </div>
            <h4>Care Starts at Home</h4>
            <p class="text-muted mb-0">We deliver equipment, and our verified nursing staff begins providing compassionate care at your home.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ WHY CHOOSE US ══ -->
<section class="section-pad bg-grad">
  <div class="container">
    <div class="row g-5">
      <div class="col-lg-4" data-aos="fade-right">
        <!-- d-none d-lg-block restricts sticky-top to desktop, preventing it from scrolling over cards on mobile -->
        <div class="pt-4 sticky-top-lg" style="z-index: 1;">
          <style>@media (min-width: 992px) { .sticky-top-lg { position: sticky; top: 100px; } }</style>
          <div class="section-badge light"><i class="fa-solid fa-star me-1"></i> Why Choose Stoic</div>
          <h2 class="section-title text-white">Dedicated to Your Health &amp; Well-being</h2>
          <div class="divider-grad"></div>
          <p class="text-white-50" style="line-height:1.9;margin-bottom:2rem">At Stoic Home Care, we go beyond medical treatment. Our holistic approach ensures emotional and physical well-being through enterprise-grade home care.</p>
          <img src="<?= CLIENT_IMAGES ?>/nurse.avif" alt="Care" width="500" height="600" class="bento-hero-img">
        </div>
      </div>
      <div class="col-lg-8">
        <div class="bento-grid">
          <?php
          $whys = [
            ['verified','Expert Professionals','ICU-certified nurses and doctors with verified credentials.','bento-lg'],
            ['biotech','Advanced Equipment','Latest medical technology, sanitized and tested before every deployment.','bento-sm'],
            ['schedule','24/7 Availability','Round-the-clock support for emergencies.','bento-sm'],
            ['payments','Affordable Plans','Transparent pricing with zero hidden costs.','bento-md'],
            ['home_health','Home Comfort','Recover in the familiar environment of your own home.','bento-md'],
            ['health_and_safety','Safety First','Strict hygiene protocols, PPE compliance, and infection control.','bento-lg'],
          ];
          foreach ($whys as $d => [$icon, $title, $text, $size]):
          ?>
          <div class="bento-item <?= $size ?>" data-aos="fade-up" data-aos-delay="<?= $d*50 ?>">
            <div class="why-card-bento">
              <div class="wc-icon-bento"><span class="material-icons-round"><?= $icon ?></span></div>
              <div class="wc-content-bento">
                <h5><?= $title ?></h5>
                <p><?= $text ?></p>
              </div>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ STATS ══ -->
<section class="section-pad" style="background:var(--light)">
  <div class="container">
    <div class="stats-strip">
      <div class="row g-4 text-center">
        <?php foreach ([['5000+','Patients Served'],['15+','Services Offered'],['50+','Expert Staff'],['5+','Years Excellence']] as $d => [$num,$lbl]): ?>
        <div class="col-6 col-md-3" data-aos="zoom-in" data-aos-delay="<?= $d*100 ?>">
          <div class="stat-item">
            <div class="stat-num premium-stat-num"><?= $num ?></div>
            <div class="stat-lbl premium-stat-lbl"><?= $lbl ?></div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>

<!-- ══ EQUIPMENT PREVIEW (dynamic) ══ -->
<section class="section-pad">
  <div class="container">
    <div class="row align-items-end mb-5">
      <div class="col-lg-7" data-aos="fade-right">
        <div class="section-badge"><span class="material-icons-round" style="font-size:1rem;vertical-align:middle">medical_information</span> Equipment on Rent</div>
        <h2 class="section-title">Medical Equipment Delivered to You</h2>
        <p class="section-sub">Hospital-grade devices on flexible rental plans. Doorstep delivery, installation and maintenance included.</p>
      </div>
      <div class="col-lg-5 text-lg-end mt-3 mt-lg-0" data-aos="fade-left">
        <a href="<?= BASE_URL ?>/equipment" class="btn-primary-grad text-center"><i class="fa-solid fa-boxes-stacked me-2"></i>All Equipment</a>
      </div>
    </div>
    <div class="swiper equip-home-swiper">
      <div class="swiper-wrapper">
        <?php if (!empty($equipment)): ?>
          <?php foreach ($equipment as $eq): ?>
          <div class="swiper-slide">
            <div class="equip-card">
              <div class="ec-img">
                <img src="<?= $eq['image'] ? EQUIP_UPLOAD_URL . '/' . htmlspecialchars($eq['image']) : CLIENT_IMAGES . '/equip.avif' ?>"
                     alt="<?= htmlspecialchars($eq['title']) ?>" width="400" height="300" loading="lazy">
              </div>
              <div class="ec-body">
                <h5><?= htmlspecialchars($eq['title']) ?></h5>
                <p><?= htmlspecialchars($eq['description']) ?></p>
                <div class="ec-footer">
                  <span class="ec-price"><?= htmlspecialchars($eq['price'] ?? 'Call for pricing') ?></span>
                  <a href="<?= BASE_URL ?>/contact" class="ec-rent-btn" aria-label="Rent <?= htmlspecialchars($eq['title']) ?> Now">Rent Now</a>
                </div>
              </div>
            </div>
          </div>
          <?php endforeach; ?>
        <?php else: ?>
          <!-- Static fallback -->
          <?php
          $staticEq = [
            ['blog-1.jpg','Oxygen Concentrator','5L &amp; 10L medical-grade concentrators.','From ₹3,000/mo','High Demand'],
            ['clinic_01.jpg','Hospital Bed','Manual &amp; electric semi-fowler beds.','From ₹2,500/mo','Essential'],
            ['clinic_03.jpg','BiPAP / CPAP Machine','Advanced respiratory support.','Call for pricing','Advanced'],
            ['clinic_02.jpg','Patient Monitor','ECG, SpO2, NIBP comprehensive monitoring.','From ₹5,000/mo','Professional'],
            ['equip.avif','Wheelchair','Standard &amp; reclining wheelchairs.','From ₹800/mo','Mobility'],
          ];
          foreach ($staticEq as [$img, $title, $desc, $price, $badge]):
          ?>
          <div class="swiper-slide">
            <div class="equip-card">
              <div class="ec-img">
                <img src="<?= CLIENT_IMAGES ?>/<?= $img ?>" alt="<?= $title ?>" width="400" height="300" loading="lazy">
                <span class="ec-badge"><?= $badge ?></span>
              </div>
              <div class="ec-body">
                <h5><?= $title ?></h5>
                <p><?= $desc ?></p>
                <div class="ec-footer">
                  <span class="ec-price"><?= $price ?></span>
                  <a href="<?= BASE_URL ?>/contact" class="ec-rent-btn" aria-label="Rent <?= $title ?> Now">Rent Now</a>
                </div>
              </div>
            </div>
          </div>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>
      <div class="swiper-pagination" style="position:relative;margin-top:1.5rem"></div>
    </div>
  </div>
</section>

<!-- ══ TESTIMONIALS ══ -->
<section class="section-pad" style="background:var(--light); position: relative; overflow: hidden;">
  <!-- Abstract background blobs for frosted glass effect -->
  <div style="position:absolute; top: -100px; left: -100px; width: 400px; height: 400px; background: rgba(78,205,196,0.15); filter: blur(80px); border-radius: 50%; z-index: 0;"></div>
  <div style="position:absolute; bottom: -100px; right: -100px; width: 500px; height: 500px; background: rgba(33,150,211,0.1); filter: blur(100px); border-radius: 50%; z-index: 0;"></div>
  
  <div class="container" style="position: relative; z-index: 1;">
    <div class="text-center mb-5" data-aos="fade-up">
      <div class="section-badge"><i class="fa-solid fa-comments me-1"></i> Patient Stories</div>
      <h2 class="section-title">What Families Say About Us</h2>
    </div>
    <div class="swiper testi-swiper" style="padding-bottom: 2rem;">
      <div class="swiper-wrapper">
        <?php
        $testis = [
          ['R','Rahul Sharma','Patient\'s Son, Mumbai','When my father was discharged after a severe cardiac arrest, we were terrified about managing his ICU setup. Stoic Home Care set up a hospital-grade ICU at home within 4 hours, and their critical care nurses felt like family. They saved his life and our peace of mind.'],
          ['P','Priya Mehta','Patient\'s Daughter, Pune','During a critical breathing crisis at 2 AM, every other rental provider refused delivery. Stoic Home Care\'s team was at our door with a verified Oxygen Concentrator within 3 hours. Transparent pricing, no hidden costs, and lifesaving speed.'],
          ['A','Anjali Verma','New Mother, Delhi','Managing a newborn while recovering from a C-section was overwhelming. The neonatal nurse sent by Stoic was exceptional—she didn\'t just care for the baby but guided me through breastfeeding and postnatal recovery with absolute warmth.'],
          ['V','Vijay Patil','Stroke Patient, Nashik','A stroke left my left side completely paralyzed. The neuro-physiotherapist from Stoic set up a rigorous, daily rehabilitation plan at home. His dedication and patient encouragement got me back on my feet in less than 3 months.'],
          ['S','Suresh Iyer','Patient\'s Grandson, Bangalore','We needed a compassionate caregiver for my 85-year-old grandfather with dementia. The attendant from Stoic was incredibly patient, gentle, and kept detailed daily vitals charts. He restored dignity to my grandfather\'s final months.'],
        ];
        foreach ($testis as [$av, $name, $role, $text]):
        ?>
        <div class="swiper-slide" style="padding: 1rem;">
          <div class="testi-card premium-testi-card">
            <div class="testi-quote-icon">"</div>
            <div class="testi-stars mb-3"><?= str_repeat('<i class="fa-solid fa-star"></i>', 5) ?></div>
            <p class="testi-text premium-testi-text"><?= htmlspecialchars($text) ?></p>
            <div class="testi-author pt-4 mt-auto border-top">
              <div class="testi-av premium-testi-av"><?= $av ?></div>
              <div>
                <div class="testi-name premium-testi-name"><?= $name ?></div>
                <div class="testi-role premium-testi-role"><i class="fa-solid fa-location-dot fa-xs me-1"></i><?= $role ?></div>
              </div>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
      <div class="swiper-pagination" style="position:relative;margin-top:1.5rem"></div>
    </div>
  </div>
</section>

<!-- ══ ENQUIRY FORM ══ -->
<section class="section-pad">
  <div class="container">
    <div class="cta-banner mb-5" data-aos="zoom-in">
      <div class="row align-items-center g-4">
        <div class="col-lg-8">
          <h2 style="font-size:clamp(1.6rem,3vw,2.4rem);margin-bottom:.8rem">Ready for Hospital-Grade Care at Home?</h2>
          <p>Our team is available 24/7. Call for emergencies or fill the form for scheduled services.</p>
        </div>
        <div class="col-lg-4 d-flex gap-3 flex-wrap justify-content-lg-end">
          <a href="tel:+917668232867" aria-label="Call Now at +917668232867" style="background:#fff;color:var(--primary);padding:.85rem 1.8rem;border-radius:50px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;"><i class="fa-solid fa-phone"></i> Call Now</a>
          <a href="https://wa.me/917668232867" target="_blank" aria-label="Chat with us on WhatsApp" class="btn-wa" style="padding:.85rem 1.6rem;"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
        </div>
      </div>
    </div>

    <div class="row g-5 align-items-center">
      <div class="col-lg-5" data-aos="fade-right">
        <div class="section-badge"><i class="fa-solid fa-clipboard-list me-1"></i> Quick Enquiry</div>
        <h2 class="section-title">Request a Callback</h2>
        <div class="divider-grad"></div>
        <p class="section-sub mb-4">Fill out the form and our care coordinator will call you within 1 hour.</p>
        <div class="d-flex flex-column gap-3">
          <div class="contact-info-card"><div class="ci-icon"><i class="fa-solid fa-phone"></i></div><div><div class="ci-title">Emergency Contact</div><div class="ci-val">+91 76682 32867<br><small>Available 24/7 – 365 days</small></div></div></div>
          <div class="contact-info-card"><div class="ci-icon"><i class="fa-brands fa-whatsapp"></i></div><div><div class="ci-title">WhatsApp</div><div class="ci-val"><a href="https://wa.me/917668232867" target="_blank">Chat with us directly →</a></div></div></div>
        </div>
      </div>
      <div class="col-lg-7" data-aos="fade-left">
        <div class="form-card" style="padding: 3.5rem 3rem; background: #fff; border-radius: 24px; box-shadow: 0 25px 60px rgba(15,34,64,0.06); border: 1px solid rgba(0,0,0,0.03);">
          <h4 style="font-weight: 800; font-size: 1.5rem; margin-bottom: 0.5rem; color: #0f2240;">Send Us an Enquiry</h4>
          <p class="form-subtitle" style="color: #6c757d; margin-bottom: 2.5rem;">We respond within 1 hour, day or night.</p>
          <form id="enquiryForm" class="modern-form">
            <style>
              .form-floating > .form-control, .form-floating > .form-select { border: none; border-bottom: 2px solid #e0e6ed; border-radius: 0; padding-left: 0; padding-right: 0; font-size: 1.05rem; transition: border-color 0.3s; box-shadow: none; background: transparent; padding-top: 1.625rem; padding-bottom: 0.625rem; height: calc(3.5rem + 2px); }
              .form-floating > .form-control:focus, .form-floating > .form-select:focus { border-bottom-color: #0CB8C9; box-shadow: none; background: transparent; }
              .form-floating > label { padding-left: 0; padding-right: 0; font-weight: 600; color: #8e9aab; letter-spacing: 0.02em; }
              .form-floating > .form-control:focus ~ label, .form-floating > .form-control:not(:placeholder-shown) ~ label, .form-floating > .form-select ~ label { color: #0CB8C9; font-size: 0.85rem; opacity: 0.8; transform: scale(.85) translateY(-.5rem) translateX(.15rem); }
            </style>
            <div class="row g-4">
              <div class="col-md-6">
                <div class="form-floating">
                  <input type="text" name="name" class="form-control" id="formName" placeholder="Full Name" required>
                  <label for="formName">Full Name *</label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-floating">
                  <input type="tel" name="phone" class="form-control" id="formPhone" placeholder="Mobile Number" required>
                  <label for="formPhone">Mobile Number *</label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-floating">
                  <input type="email" name="email" class="form-control" id="formEmail" placeholder="Email Address (Optional)">
                  <label for="formEmail">Email <span style="opacity: 0.6; font-weight: 400;">(Optional)</span></label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-floating">
                  <select name="service" class="form-select" id="formService">
                    <option value="" selected disabled></option>
                    <option>ICU Setup @ Home</option><option>ICU Trained Nursing</option>
                    <option>Old Age Care</option><option>Mother &amp; Baby Care</option>
                    <option>Doctor on Call</option><option>Physiotherapy @ Home</option>
                    <option>Oxygen Concentrator</option><option>Hospital Bed</option>
                    <option>Wheelchair</option>
                  </select>
                  <label for="formService">Service <span style="opacity: 0.6; font-weight: 400;">(Optional)</span></label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-floating">
                  <input type="text" name="city" class="form-control" id="formCity" placeholder="City / Location">
                  <label for="formCity">City / Location <span style="opacity: 0.6; font-weight: 400;">(Optional)</span></label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-floating">
                  <textarea name="message" class="form-control" id="formMessage" placeholder="Message" style="height: 100px"></textarea>
                  <label for="formMessage">Message <span style="opacity: 0.6; font-weight: 400;">(Optional)</span></label>
                </div>
              </div>
              <div class="col-12 mt-4 pt-2">
                <button type="submit" class="btn-form-submit w-100" style="padding: 1.1rem; border-radius: 12px; font-size: 1.1rem; background: linear-gradient(135deg, #0CB8C9, #1D9E75); box-shadow: 0 15px 30px rgba(12, 184, 201, 0.3);">
                  <i class="fa-solid fa-paper-plane me-2"></i> Send Enquiry — We Call Back Within 1 Hour
                </button>
              </div>
              <div class="col-12">
                <div class="form-success mt-3" id="formSuccess" style="display:none; background: #e8f5e9; color: #2e7d32; padding: 1rem; border-radius: 12px; font-weight: 600;">
                  <i class="fa-solid fa-circle-check me-2"></i> Thank you! Our care coordinator will contact you shortly.
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
document.getElementById('enquiryForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const fd = new FormData(this);
  const res = await fetch('<?= BASE_URL ?>/api/enquiry.php', { method: 'POST', body: fd });
  const data = await res.json();
  if (data.success) {
    document.getElementById('formSuccess').style.display = 'block';
    this.reset();
  } else {
    alert(data.message || 'Something went wrong. Please try again.');
  }
});
</script>
</main>
<?php require_once ROOT . '/client/views/partials/enquiry_popup.php'; ?>
<?php require_once ROOT . '/client/includes/footer.php'; ?>
