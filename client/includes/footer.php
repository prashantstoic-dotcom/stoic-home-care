<style>
    .footer-social a:hover i {
  color: #fff !important;
}

   /* ── Floating CTA ── */
.float-cta-wrap {
  position: fixed;
  bottom: 24px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}

.float-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px 0 16px;
  height: 50px;
  border-radius: 999px;
  color: #fff !important;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 4px 18px rgba(0,0,0,0.20);
  transition: transform .15s ease, box-shadow .15s ease;
}

.float-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(0,0,0,0.25);
}

.float-wa   { background: #25D366; }
.float-call { background: #0CB8C9; }

.float-cta-btn i { font-size: 1.1rem; }

/* ── Mobile: small icon-only circles ── */
@media (max-width: 767px) {
  .float-cta-wrap {
    bottom: 16px;
    left: 12px;
    gap: 8px;
  }
  .float-cta-btn {
    width: 44px;
    height: 44px;
    padding: 0;
    justify-content: center;
    border-radius: 50%;
  }
  .float-cta-btn span { display: none; }
  .float-cta-btn i { font-size: 1rem; }
}
</style>

<!-- ══ GLOBAL TRUST STRIP ══ -->
<div class="trust-strip py-3" style="background:#fff; border-bottom:1px solid #eee; border-top:1px solid #eee;">
  <div class="container">
    <div class="d-flex flex-wrap justify-content-center align-items-center gap-4 gap-md-5 text-center text-muted" style="font-size:0.95rem; font-weight:600;">
      <div><i class="fa-solid fa-shield-halved me-1" style="color:#0CB8C9;"></i> ISO 9001:2015 Certified</div>
      <div><i class="fa-solid fa-user-doctor me-1" style="color:#0CB8C9;"></i> 100% Background Verified</div>
      <div><i class="fa-solid fa-truck-medical me-1" style="color:#0CB8C9;"></i> 2-Hour Fast Deployment</div>
      <div><i class="fa-solid fa-star me-1" style="color:#F5B041;"></i> 4.9/5 Patient Rating</div>
    </div>
  </div>
</div>

  <footer id="mainFooter">
    <div class="container">
      <div class="row g-4 pb-4">
        <div class="col-lg-4">
          <img src="<?= CLIENT_IMAGES ?>/logo.png" alt="Stoic Home Care" height="50" class="mb-3">
          <p style="font-size:.87rem;line-height:1.85;max-width:320px;">Bringing hospital-quality care to your home — ICU setups, skilled nursing, medical equipment and pharmaceutical manufacturing, all under one roof.</p>
          <div class="footer-social mt-3 d-flex flex-wrap gap-2">
            <a href="https://www.facebook.com/p/Stoic-Home Care-services-61581689589175/" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://wa.me/917668232867" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.justdial.com/Greater-Noida/Stoic-care-Galaxy-Hospital-Sector-Mu-2-Greater-Noida/011PXX11-XX11-260103102151-G3L9_BZDET" aria-label="justdail"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://mail.google.com/mail/stoichomecare@gmail.com" aria-label="Mail"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>
        <div class="col-sm-6 col-lg-2">
          <h6>Quick Links</h6>
          <a href="<?= BASE_URL ?>/"          class="d-flex align-items-center"><i class="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Home</a>
          <a href="<?= BASE_URL ?>/services"  class="d-flex align-items-center"><i class="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Services</a>
          <a href="<?= BASE_URL ?>/equipment" class="d-flex align-items-center"><i class="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Equipment</a>
          <a href="<?= BASE_URL ?>/about"     class="d-flex align-items-center"><i class="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>About Us</a>
          <a href="<?= BASE_URL ?>/contact"   class="d-flex align-items-center"><i class="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Contact</a>
        </div>
        <div class="col-sm-6 col-lg-3">
          <h6>Our Services</h6>
          <a href="<?= BASE_URL ?>/services" class="d-flex align-items-center"><i class="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>ICU Setup @ Home</a>
          <a href="<?= BASE_URL ?>/services" class="d-flex align-items-center"><i class="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>ICU Trained Nursing</a>
          <a href="<?= BASE_URL ?>/services" class="d-flex align-items-center"><i class="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Old Age Care</a>
          <a href="<?= BASE_URL ?>/services" class="d-flex align-items-center"><i class="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Mother &amp; Baby Care</a>
          <a href="<?= BASE_URL ?>/services" class="d-flex align-items-center"><i class="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Doctor on Call</a>
          <a href="<?= BASE_URL ?>/services" class="d-flex align-items-center"><i class="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Physiotherapy</a>
        </div>
        <div class="col-sm-6 col-lg-3" itemscope itemtype="http://schema.org/MedicalBusiness">
          <h6>Contact Us</h6>
          <address style="font-style:normal; margin-bottom:0;">
            <a href="#" class="d-flex align-items-center"><i class="fa-solid fa-location-dot me-2 text-teal"></i><span itemprop="address">FF2 Block 330, MU 2, Greater Noida, Uttar Pradesh</span></a>
            <a href="tel:+917668232867" class="d-flex align-items-center"><i class="fa-solid fa-phone me-2 text-teal"></i><span itemprop="telephone">+91 76682 32867</span></a>
          </address>
          <a href="https://wa.me/917668232867" target="_blank" class="d-flex align-items-center"><i class="fa-brands fa-whatsapp me-2 text-teal"></i>WhatsApp Us</a>
          <a href="mailto:info@stoichomecare.com" class="d-flex align-items-center"><i class="fa-solid fa-envelope me-2 text-teal"></i>info@stoichomecare.com</a>
          <p class="d-flex align-items-center new-f" style="font-size:.87rem;margin-top:.5rem;"><i class="fa-solid fa-clock me-2 text-teal"></i>24/7 Emergency Support</p>
        </div>
      </div>
      
      <!-- ══ SEO INTERNAL LINKING BLOCK ══ -->
      <div class="row pt-2 pb-4">
        <div class="col-12">
          <h6 class="mb-3 text-muted">Service Areas (Top Locations)</h6>
          <div class="d-flex flex-wrap gap-2" style="font-size:0.85rem;">
            <?php
            // Conditionally load Supabase to fetch cached SEO pages
            if (!function_exists('getSupabase')) {
                @require_once (defined('ROOT') ? ROOT : __DIR__ . '/../..') . '/config/supabase.php';
            }
            try {
                $seoPages = getSupabase()->getAllSeoPages();
                if (is_array($seoPages) && count($seoPages) > 0) {
                    // Display up to 15 internal links
                    $count = 0;
                    foreach ($seoPages as $p) {
                        if ($count >= 15) break;
                        $pageSlug = htmlspecialchars($p['slug'] ?? '');
                        if (!$pageSlug) continue;
                        // Format slug to readable title
                        $readable = ucwords(str_replace('-', ' ', $pageSlug));
                        echo '<a href="' . BASE_URL . '/service/' . $pageSlug . '" class="text-decoration-none text-muted border px-2 py-1 rounded hover-teal">' . $readable . '</a>';
                        $count++;
                    }
                }
            } catch (Exception $e) {
                // Fail silently
            }
            ?>
          </div>
        </div>
      </div>
      <div class="py-2 text-muted border-top border-bottom" style="font-size:0.8rem; margin-bottom: 1rem;">
        <strong>Medical Disclaimer (YMYL):</strong> The content provided on this website is for informational purposes only. It does not substitute professional medical advice, diagnosis, or treatment. Always seek the advice of a certified physician or health provider.
      </div>
      <div class="footer-bottom d-flex flex-wrap justify-content-between align-items-center gap-2">
        <p style="margin:0;">© <?= date('Y') ?> <span itemprop="name">Stoic Home Care</span>. All rights reserved. | <a href="#" style="display:inline;">Privacy Policy</a></p>
        <p style="margin:0;">Designed with <i class="fa-solid fa-heart text-teal"></i> for better Home Care</p>
      </div>
    </div>
  </footer>

  <!-- ══ FLOATING CTA ══ -->
<div class="float-cta-wrap">
  <a class="float-cta-btn float-wa" href="https://wa.me/917668232867" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
    <i class="fa-brands fa-whatsapp"></i><span>WhatsApp Us</span>
  </a>
  <a class="float-cta-btn float-call" href="tel:+917668232867" aria-label="Call Stoic Home Care">
    <i class="fa-solid fa-phone"></i><span>Call Now</span>
  </a>
</div>

  <button class="scroll-top-btn" aria-label="Back to top">
    <i class="fa-solid fa-chevron-up"></i>
  </button>

  <!-- JS (Deferred for Performance) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" defer></script>
  <script src="<?= BASE_URL ?>/client/view_assets/js/script.js" defer></script>

  <!-- Progressive Hydration / Event-Driven Loading -->
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      // 1. Event-Driven Floating CTA (Shows only on interaction or after 4s)
      const floatCta = document.querySelector('.float-cta-wrap');
      if(floatCta) {
        floatCta.style.display = 'none'; // Initially hidden to save paint time
        const showCta = () => {
          floatCta.style.display = 'flex';
          window.removeEventListener('scroll', showCta);
          window.removeEventListener('mousemove', showCta);
          window.removeEventListener('touchstart', showCta);
        };
        window.addEventListener('scroll', showCta, {once:true});
        window.addEventListener('mousemove', showCta, {once:true});
        window.addEventListener('touchstart', showCta, {once:true});
        setTimeout(showCta, 4000); // Fallback
      }
    });
  </script>
</body>
</html>
