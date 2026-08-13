<?php
/* ============================================================
   Stoic Home Care — client/views/equipment.php
   ============================================================ */

$pageTitle = 'Medical Equipment on Rent | Stoic Home Care';
$pageDesc  = 'Rent hospital-grade medical equipment: oxygen concentrators, hospital beds, wheelchairs, BiPAP, patient monitors and more. Doorstep delivery in Mumbai.';

$preloadHero = CLIENT_IMAGES . '/equip.avif';
require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';

$db        = getDB();
$equipment = $db->query("SELECT * FROM equipment ORDER BY id DESC")->fetchAll();
?>
<style>
  .process-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  position: relative;
}

.p-num {
  position: absolute;   /* keep number as watermark */
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3.5rem;
  font-weight: 800;
  color: rgba(78, 205, 196, 0.15);
  line-height: 1;
  z-index: 0;
  width: 100%;
  text-align: center;
}

.p-icon {
  position: relative;   /* sit above the number watermark */
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  min-height: 70px;     /* prevents collapse */
  margin: 2.5rem auto 1rem; /* push below the number */
  background: rgba(78, 205, 196, 0.12);
  border-radius: 50%;
}

.p-icon .material-icons-round {
  font-size: 2rem;
  color: var(--teal);
}

/* Reduce hero vertical space on mobile */
@media (max-width: 991.98px) {

  .hero-swiper .row .swiper-wrapper{
    min-height: 72vh !important;   /* was 100vh *//* account for fixed navbar */
    padding-bottom: 1.2rem !important;
  }

  /* Reduce text spacing */
  .hero-title {
    margin-bottom: 0.6rem;
    line-height: 1.15;
  }
.hero-stats{
  display:none !important;
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
<!-- ══ HERO ══ -->
<header class="swiper hero-swiper short-hero" aria-label="Equipment Page Hero">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img class="hero-bg" src="<?= CLIENT_IMAGES ?>/equip.avif" alt="Medical Equipment" loading="eager" width="1920" height="1080">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="row align-items-center" style="min-height:60vh;padding-top:10px;padding-bottom:3rem">
          <div class="col-lg-7">
            <div class="hero-badge"><i class="fa-solid fa-truck-medical me-2"></i>Premium Equipment Rental</div>
            <div class="hero-title">Medical Equipment<br><span>Delivered to Your Door</span></div>
            <p class="hero-sub">Hospital-grade oxygen concentrators, beds, wheelchairs, monitors and more — on flexible rental plans with same-day delivery and professional installation.</p>
            <div class="hero-btns">
              <a href="#equipment-catalog" class="btn-primary-grad"><i class="fa-solid fa-boxes-stacked me-2"></i>Browse Catalog</a>
              <a href="contact.html" class="btn-outline-white"><i class="fa-solid fa-file-invoice-dollar me-2"></i>Get a Quote</a>
            </div>
            <div class="hero-stats">
              <div class="hero-stat"><div class="num">12+</div><div class="lbl">Equipment Types</div></div>
              <div class="hero-stat"><div class="num">Same Day</div><div class="lbl">Delivery</div></div>
              <div class="hero-stat"><div class="num">₹500+</div><div class="lbl">Starting Price</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-slide">
      <img class="hero-bg" src="https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=2000" alt="Oxygen Concentrator" loading="lazy" width="1920" height="1080">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="row align-items-center" style="min-height:60vh;padding-top:10px;padding-bottom:3rem">
          <div class="col-lg-7">
            <div class="hero-badge"><i class="fa-solid fa-lungs me-2"></i>Most Rented Equipment</div>
            <div class="hero-title">Oxygen Concentrators<br><span>For Home Use</span></div>
            <p class="hero-sub">5L and 10L medical-grade oxygen concentrators with doorstep setup, user training, and 24/7 maintenance support.</p>
            <div class="hero-btns">
              <a href="#equipment-catalog" class="btn-primary-grad"><i class="fa-solid fa-arrow-right me-2"></i>Rent Oxygen Concentrator</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-slide">
      <img class="hero-bg" src="<?= CLIENT_IMAGES ?>/clinic_02.jpg" alt="Hospital Bed" loading="lazy" width="1920" height="1080">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="row align-items-center" style="min-height:60vh;padding-top:10px;padding-bottom:3rem">
          <div class="col-lg-7">
            <div class="hero-badge"><i class="fa-solid fa-bed-pulse me-2"></i>Hospital Comfort at Home</div>
            <div class="hero-title">Hospital Beds &amp;<br><span>Patient Monitors</span></div>
            <p class="hero-sub">Semi-Fowler, ICU and electric beds paired with multi-parameter monitors for a complete home recovery setup. Free delivery and installation included.</p>
            <div class="hero-btns">
              <a href="#equipment-catalog" class="btn-primary-grad"><i class="fa-solid fa-arrow-right me-2"></i>View Beds &amp; Monitors</a>
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

<!-- ══ PROCESS STRIP ══ -->
<section class="section-pad" style="background:var(--light)">
  <div class="container">
    <div class="process-strip" data-aos="zoom-in">
      <div class="row g-4">
        <div class="col-6 col-md-3">
          <div class="pstrip-item">
            <span class="material-icons-round" style="font-size:2.8rem;color:rgba(255,255,255,.9);margin-bottom:.75rem;display:block">shopping_cart</span>
            <h5>Select Equipment</h5>
            <p>Browse our catalog and choose what you need</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="pstrip-item">
            <span class="material-icons-round" style="font-size:2.8rem;color:rgba(255,255,255,.9);margin-bottom:.75rem;display:block">assignment</span>
            <h5>Submit Request</h5>
            <p>Fill the form with your needs and rental duration</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="pstrip-item">
            <span class="material-icons-round" style="font-size:2.8rem;color:rgba(255,255,255,.9);margin-bottom:.75rem;display:block">local_shipping</span>
            <h5>Same-Day Delivery</h5>
            <p>We deliver, install and demonstrate use at home</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="pstrip-item">
            <span class="material-icons-round" style="font-size:2.8rem;color:rgba(255,255,255,.9);margin-bottom:.75rem;display:block">assignment_return</span>
            <h5>Easy Return</h5>
            <p>Hassle-free pickup when your rental period ends</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-pad" id="equipment-catalog">
  <div class="container">
    <div class="text-center mb-5" data-aos="fade-up">
      <div class="section-badge"><i class="fa-solid fa-boxes-stacked me-1"></i> Equipment Catalog</div>
      <h1 class="section-title">All Equipment Available on Rent</h1>
      <p class="section-sub mx-auto">Every device is sanitized, tested and calibrated before delivery. Our technicians set up and train you on proper use.</p>
    </div>
    <div class="row g-4">
    <div class="row g-4">
      <?php if (!empty($equipment)): ?>
        <?php foreach ($equipment as $d => $eq): ?>
        <article class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="<?= ($d % 3) * 100 ?>">
          <div class="equip-card h-100">
            <div class="ec-img">
              <img src="<?= $eq['image'] ? EQUIP_UPLOAD_URL . '/' . htmlspecialchars($eq['image']) : CLIENT_IMAGES . '/equip.avif' ?>"
                   alt="<?= htmlspecialchars($eq['title']) ?>" loading="lazy" width="400" height="220" style="width:100%;height:220px;object-fit:cover;">
            </div>
            <div class="ec-body p-3">
              <h5 class="fw-bold"><?= htmlspecialchars($eq['title']) ?></h5>
              <p class="text-muted" style="font-size:.88rem"><?= htmlspecialchars($eq['description'] ?? '') ?></p>
              <div class="ec-footer d-flex justify-content-between align-items-center mt-3">
                <span class="ec-price fw-bold" style="color:#1a3a6b"><?= htmlspecialchars($eq['price'] ?? 'Call for pricing') ?></span>
              <button type="button" class="ec-rent-btn border-0"
  onclick="openRentModal('<?= htmlspecialchars($eq['title'], ENT_QUOTES) ?>', <?= (int)$eq['id'] ?>)">
  Rent Now
</button>   </div>
            </div>
          </div>
        </article>
        <?php endforeach; ?>
      <?php else: ?>
        <!-- Static fallback -->
        <?php
        $staticEq = [
          ['blog-1.jpg','Oxygen Concentrator','5L & 10L medical-grade oxygen concentrators. Includes setup, installation and maintenance by trained technician.','From ₹3,000/mo','High Demand'],
          ['clinic_01.jpg','Hospital Bed','Manual & electric semi-fowler beds for patient comfort and easy nursing access.','From ₹2,500/mo','Essential'],
          ['clinic_03.jpg','BiPAP / CPAP Machine','Advanced respiratory support for COPD, sleep apnea and breathing difficulties.','Call for pricing','Advanced'],
          ['clinic_02.jpg','Patient Monitor','Multi-parameter monitor: ECG, SpO2, NIBP, temperature — comprehensive vital monitoring.','From ₹5,000/mo','Professional'],
          ['equip.avif','Wheelchair','Standard & reclining wheelchairs for safe home and outdoor mobility.','From ₹800/mo','Mobility'],
          ['ab-3.avif','Suction Machine','Portable suction units for airway secretion management.','From ₹1,500/mo','Clinical'],
          ['ab-1.avif','Nebulizer','Compressor & mesh nebulizers for asthma, COPD and respiratory medication delivery.','From ₹500/mo','Respiratory'],
          ['ab-2.avif','Infusion Pump','Precision drug delivery with programmable infusion pumps.','Call for pricing','Advanced'],
          ['dr.avif','Recliner / Commode Chair','Multi-function recliner and commode chairs for patient comfort.','From ₹1,200/mo','Comfort'],
        ];
        foreach ($staticEq as $d => [$img, $title, $desc, $price, $badge]):
        ?>
        <article class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="<?= ($d % 3) * 100 ?>">
          <div class="equip-card h-100">
            <div class="ec-img">
              <img src="<?= CLIENT_IMAGES ?>/<?= $img ?>" alt="<?= $title ?>" loading="lazy" width="400" height="220" style="width:100%;height:220px;object-fit:cover;">
              <span class="ec-badge"><?= $badge ?></span>
            </div>
            <div class="ec-body p-3">
              <h5 class="fw-bold"><?= $title ?></h5>
              <p class="text-muted" style="font-size:.88rem"><?= $desc ?></p>
              <div class="ec-footer d-flex justify-content-between align-items-center mt-3">
                <span class="ec-price fw-bold" style="color:#1a3a6b"><?= $price ?></span>
               <button type="button" class="ec-rent-btn border-0"
  onclick="openRentModal('<?= htmlspecialchars($title, ENT_QUOTES) ?>')">
  Rent Now
</button>
              </div>
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
    <div class="row g-4 text-center">
      <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="0">
        <div class="process-card">
          <div class="p-num">01</div>
          <div class="p-icon">
            <span class="material-icons-round">phone_in_talk</span>
          </div>
          <h5>Contact Us</h5>
          <p>Call or click on "Rent Now". Our coordinator calls back within 1 hour.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
        <div class="process-card">
          <div class="p-num">02</div>
          <div class="p-icon">
            <span class="material-icons-round">assignment</span>
          </div>
          <h5>Rent Equipment</h5>
          <p>Click the "Rent Now" button below any equipment card to book for rent.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
        <div class="process-card">
          <div class="p-num">03</div>
          <div class="p-icon">
            <span class="material-icons-round">home</span>
          </div>
          <h5>Care Begins</h5>
          <p>Our certified professional arrives, sets up equipment and begins care.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
        <div class="process-card">
          <div class="p-num">04</div>
          <div class="p-icon">
            <span class="material-icons-round">health_and_safety</span>
          </div>
          <h5>Ongoing Support</h5>
          <p>Regular health updates, doctor coordination and 24/7 helpline throughout.</p>
        </div>
      </div>
    </div>
  </div>
</section>
</main>

<?php if (!empty($equipment)): ?>
<script type="application/ld+json">
[
<?php foreach ($equipment as $i => $eq): ?>
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "<?= htmlspecialchars($eq['title']) ?>",
    "image": "<?= $eq['image'] ? EQUIP_UPLOAD_URL . '/' . htmlspecialchars($eq['image']) : CLIENT_IMAGES . '/equip.avif' ?>",
    "description": "<?= htmlspecialchars($eq['description'] ?? '') ?>",
    "brand": {
      "@type": "Brand",
      "name": "Stoic Home Care"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "<?= preg_replace('/[^0-9]/', '', $eq['price'] ?? '500') ?: '500' ?>",
      "highPrice": "25000",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Stoic Home Care"
      }
    }
  }<?= $i < count($equipment) - 1 ? ',' : '' ?>
<?php endforeach; ?>
]
</script>
<?php endif; ?>

<?php require_once ROOT . '/client/views/partials/rent-modal.php'; ?>
<?php require_once ROOT . '/client/includes/footer.php'; ?>
