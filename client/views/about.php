<?php
/* ============================================================
   Stoic Home Care — client/views/about.php
   ============================================================ */

$pageTitle = 'About Stoic Home Care | Top Home Care & ICU Setup in Greater Noida';
$pageDesc  = 'Learn about Stoic Home Care – our mission to bring hospital-quality ICU setups, skilled nursing, and elder care to your doorstep in Greater Noida & Delhi NCR.';

require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';
?>

<main id="main-content">
<!-- ══ ABOUT HERO ══ -->
<header class="about-hero-section" aria-label="About Us Hero">
  <div class="container">
    <div class="row align-items-center g-5 py-5">
      <div class="col-lg-7" data-aos="fade-right">
        <div class="hero-badge"><i class="fa-solid fa-hospital me-2"></i>Our Story</div>
        <h1 class="hero-title">Redefining Home<br><span>Home Care in India</span></h1>
        <p class="hero-sub">Founded on the belief that exceptional Home Care shouldn't require leaving home. We bridge the gap between hospital-grade care and the comfort of your own space.</p>
        <div class="hero-btns">
          <a href="contact.html" class="btn-primary-grad"><i class="fa-solid fa-envelope me-2"></i>Get in Touch</a>
          <a href="services.html" class="btn-outline-white"><i class="fa-solid fa-grid-2 me-2"></i>Our Services</a>
        </div>
      </div>
      <div class="col-lg-5 hero-img-side" data-aos="fade-left">
        <img src="<?= CLIENT_IMAGES ?>/ab-1.avif" alt="Our Team" style="border-radius:24px;width:100%;box-shadow:0 24px 80px rgba(0,0,0,.4)">
      </div>
    </div>
  </div>
</header>

<!-- ══ MISSION & STORY ══ -->
<section class="section-pad">
  <div class="container">
    <div class="row g-5 align-items-center">
      <div class="col-lg-6" data-aos="fade-right">
        <div class="section-badge"><i class="fa-solid fa-circle-info me-1"></i> Who We Are</div>
        <h2 class="section-title">Our Mission &amp; Story</h2>
        <div class="divider-grad"></div>
        <p style="line-height:1.9;margin-bottom:1.2rem">Stoic Home Care was founded with a simple but powerful belief: <strong>healing happens best where the heart is.</strong> We recognised a critical gap in Indian Home Care — patients had to choose between hospital-grade care and the comfort of home.</p>
        <p style="line-height:1.9;color:var(--muted);margin-bottom:1.2rem">Today, we bridge that gap by bringing ICU setups, skilled nursing, advanced medical equipment and pharmaceutical manufacturing directly to patient doorsteps. Our certified professionals work tirelessly to ensure every patient receives the dignity, respect, and expert care they deserve.</p>
        <p style="line-height:1.9;color:var(--muted)">Our approach is holistic — we treat not just the condition, but the whole person. We support families through difficult times with transparency, compassion, and clinical excellence.</p>
        <div class="row g-3 mt-3">
          <div class="col-6"><div style="background:var(--light);border-radius:14px;padding:1.4rem;text-align:center"><div style="font-family:'Playfair Display',serif;font-size:2.8rem;color:var(--secondary);font-weight:700">5+</div><div style="color:var(--muted);font-size:.88rem">Years of Service</div></div></div>
          <div class="col-6"><div style="background:var(--light);border-radius:14px;padding:1.4rem;text-align:center"><div style="font-family:'Playfair Display',serif;font-size:2.8rem;color:var(--secondary);font-weight:700">50+</div><div style="color:var(--muted);font-size:.88rem">Lives Touched</div></div></div>
          <div class="col-6"><div style="background:var(--light);border-radius:14px;padding:1.4rem;text-align:center"><div style="font-family:'Playfair Display',serif;font-size:2.8rem;color:var(--secondary);font-weight:700">50+</div><div style="color:var(--muted);font-size:.88rem">Expert Staff</div></div></div>
          <div class="col-6"><div style="background:var(--light);border-radius:14px;padding:1.4rem;text-align:center"><div style="font-family:'Playfair Display',serif;font-size:2.8rem;color:var(--secondary);font-weight:700">24/7</div><div style="color:var(--muted);font-size:.88rem">Always Available</div></div></div>
        </div>
      </div>
      <div class="col-lg-6" data-aos="fade-left">
        <img src="<?= CLIENT_IMAGES ?>/blog-2.jpg" alt="Home Care Team" style="border-radius:20px;width:100%;box-shadow:0 20px 60px rgba(26,58,107,.2)">
        <div style="background:#fff;border-radius:14px;padding:1.3rem;box-shadow:var(--shadow-sm);margin-top:1.5rem;display:flex;align-items:center;gap:1rem">
          <span class="material-icons-round" style="font-size:2.5rem;color:#f59e0b">workspace_premium</span>
          <div>
            <div style="font-weight:700;font-size:.95rem">Most Trusted Home Care Brand</div>
            <div style="color:var(--muted);font-size:.82rem">Voted by 1,000+ patient families across India</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- ══ VALUES ══ -->
<section class="section-pad" style="background:var(--light)">
  <div class="container">
    <div class="text-center mb-5" data-aos="fade-up">
      <div class="section-badge"><i class="fa-solid fa-heart me-1"></i> Our Values</div>
      <h2 class="section-title">What Drives Us Every Day</h2>
      <p class="section-sub mx-auto">Our core values shape every interaction, every care plan, and every patient outcome.</p>
    </div>
    <div class="row g-4">
      <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
        <div class="value-card">
          <div class="vc-icon"><span class="material-icons-round" style="color:var(--teal);font-size:2rem">favorite</span></div>
          <h5>Compassion First</h5>
          <p>We treat every patient like family. Empathy and kindness are the foundation of every service we deliver.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="80">
        <div class="value-card">
          <div class="vc-icon"><span class="material-icons-round" style="color:var(--teal);font-size:2rem">handshake</span></div>
          <h5>Integrity &amp; Trust</h5>
          <p>Honest communication, transparent pricing and no hidden costs — ever. We earn trust through accountability.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="160">
        <div class="value-card">
          <div class="vc-icon"><span class="material-icons-round" style="color:var(--teal);font-size:2rem">verified</span></div>
          <h5>Clinical Excellence</h5>
          <p>We never compromise on quality of care or equipment. ICU-grade standards, delivered at home.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
        <div class="value-card">
          <div class="vc-icon"><span class="material-icons-round" style="color:var(--teal);font-size:2rem">biotech</span></div>
          <h5>Innovation</h5>
          <p>We continuously adopt the latest medical technologies to provide the best possible home care solutions.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="80">
        <div class="value-card">
          <div class="vc-icon"><span class="material-icons-round" style="color:var(--teal);font-size:2rem">home_health</span></div>
          <h5>Patient-Centred</h5>
          <p>Every care plan is personalised. We listen to patients and families to design care around unique needs.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="160">
        <div class="value-card">
          <div class="vc-icon"><span class="material-icons-round" style="color:var(--teal);font-size:2rem">public</span></div>
          <h5>Accessibility</h5>
          <p>Quality Home Care should reach everyone. We strive to make excellent home care affordable and accessible.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ JOURNEY TIMELINE ══ -->
<section class="section-pad bg-grad">
  <div class="container">
    <div class="row g-5 align-items-start">
      <div class="col-lg-5" data-aos="fade-right">
        <div class="section-badge light"><i class="fa-solid fa-timeline me-1"></i> Our Journey</div>
        <h2 class="section-title" style="color:#fff">From Vision to Reality</h2>
        <div class="divider-grad"></div>
        <p style="color:rgba(255,255,255,.75);line-height:1.9;margin-bottom:2rem">Every milestone represents a life transformed, a family relieved, a patient who healed with dignity.</p>
        <div class="award-badge" data-aos="fade-up" data-aos-delay="0">
          <span class="material-icons-round" style="font-size:2.2rem;color:#f59e0b">emoji_events</span>
          <div><h6>Best Home Care Provider 2023</h6><p>India Health Excellence Awards</p></div>
        </div>
        <div class="award-badge" data-aos="fade-up" data-aos-delay="80">
          <span class="material-icons-round" style="font-size:2.2rem;color:#2196d3">military_tech</span>
          <div><h6>Best Home Care Services</h6><p>Quality Management System</p></div>
        </div>
        <div class="award-badge" data-aos="fade-up" data-aos-delay="160">
          <span class="material-icons-round" style="font-size:2.2rem;color:#4ecdc4">star</span>
          <div><h6>4.9/5 Patient Satisfaction Score</h6><p>Based on 1,200+ verified reviews</p></div>
        </div>
      </div>
      <div class="col-lg-7" data-aos="fade-left">
        <div class="timeline">
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-year"><i class="fa-solid fa-flag me-1"></i> 2018 — Founded</div>
            <h5 style="color:#fff">Stoic Home Care is Born</h5>
            <p style="color:rgba(255,255,255,.65)">Founded in Mumbai with a mission to bring hospital care home. Began with nursing and attendant services, serving our first 100 patients.</p>
          </div>
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-year"><i class="fa-solid fa-rocket me-1"></i> 2019 — Expansion</div>
            <h5 style="color:#fff">ICU at Home Launched</h5>
            <p style="color:rgba(255,255,255,.65)">Pioneered ICU setup services at home in Maharashtra. First 500 patients served with critical care at home.</p>
          </div>
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-year"><i class="fa-solid fa-shield-virus me-1"></i> 2020 — Covid Response</div>
            <h5 style="color:#fff">Covid Care at Home</h5>
            <p style="color:rgba(255,255,255,.65)">Deployed rapid Covid care during the pandemic. Served 2,000+ patients safely with strict PPE protocols at home.</p>
          </div>
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-year"><i class="fa-solid fa-industry me-1"></i> 2021 — Growth</div>
            <h5 style="color:#fff">Equipment Rental &amp; Manufacturing</h5>
            <p style="color:rgba(255,255,255,.65)">Launched medical equipment rental division and pharma manufacturing partnerships for complete Home Care solutions.</p>
          </div>
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-year"><i class="fa-solid fa-star me-1"></i> 2024 — Present</div>
            <h5 style="color:#fff">100+ Families Served</h5>
            <p style="color:rgba(255,255,255,.65)">Serving 100+ families across India with 15+ services and 20+ expert professionals. Expanding our reach every day.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</main>


<?php require_once ROOT . '/client/includes/footer.php'; ?>
