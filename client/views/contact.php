<?php
/* ============================================================
   Stoic Home Care — client/views/contact.php
   ============================================================ */

$pageTitle = 'Contact Stoic Home Care – Book a Service or Enquire';
$pageDesc  = 'Contact Stoic Home Care for Home Care services, medical equipment rental, or general enquiries. Available 24/7.';

require_once ROOT . '/client/includes/head.php';
require_once ROOT . '/client/includes/header.php';
?>

<main id="main-content">
<!-- ══ CONTACT HERO ══ -->
<header class="contact-hero-section" aria-label="Contact Page Hero">
  <div class="container position-relative" style="z-index:2; padding-bottom : 25px">
    <div class="row align-items-center g-5 py-5 ">
      <div class="col-lg-6" data-aos="fade-right">
        <div class="hero-badge"><i class="fa-solid fa-headset me-2"></i>Always Available 24/7</div>
        <h1 class="hero-title">Get in Touch<br><span>We're Here for You</span></h1>
        <p class="hero-sub">Whether it's an emergency, a booking enquiry or a question about services — our care coordinators are available around the clock to help you.</p>
        <div class="hero-btns">
          <a href="tel:+917668232867" class="btn-primary-grad"><i class="fa-solid fa-phone me-2"></i>Call +91 76682 32867</a>
          <a href="https://wa.me/917668232867" class="btn-outline-white" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp me-2"></i>WhatsApp Us</a>
        </div>
      </div>
      <div class="col-lg-6 hero-img-side" data-aos="fade-left">
        <div class="d-flex flex-column gap-3">
          <div class="contact-info-card" style="background:rgba(255,255,255,.95)">
            <div class="ci-icon"><i class="fa-solid fa-phone"></i></div>
            <div><div class="ci-title">Emergency Line</div><div class="ci-val">+91 76682 32867<br><small>Available 24/7 — 365 days</small></div></div>
          </div>
          <div class="contact-info-card" style="background:rgba(255,255,255,.95)">
            <div class="ci-icon"><i class="fa-solid fa-envelope"></i></div>
            <div><div class="ci-title">Email</div><div class="ci-val">info@stoichomecare.com</div></div>
          </div>
          <div class="contact-info-card" style="background:rgba(255,255,255,.95)">
            <div class="ci-icon"><i class="fa-solid fa-location-dot"></i></div>
            <div><div class="ci-title">Office</div><div class="ci-val">FF2 Block 330, MU 2, Greater Noida, Uttar Pradesh</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<!-- ══ EMERGENCY STRIP ══ -->
<section style="padding:2rem 0">
  <div class="container">
    <div class="emergency-strip" data-aos="zoom-in">
      <div>
        <h4><i class="fa-solid fa-triangle-exclamation me-2"></i>Medical Emergency?</h4>
        <p>Our emergency team is ready to deploy within 2 hours. Don't wait — call us right now.</p>
      </div>
      <div class="d-flex gap-3 flex-wrap">
        <a href="tel:+917668232867" style="background:#fff;color:#b45309;padding:.8rem 1.8rem;border-radius:50px;font-weight:700;text-decoration:none;font-size:.95rem;display:inline-flex;align-items:center;gap:.5rem">
          <i class="fa-solid fa-phone"></i> Call Now
        </a>
        <a href="https://wa.me/917668232867" target="_blank" style="background:rgba(255,255,255,.18);color:#fff;padding:.8rem 1.8rem;border-radius:50px;font-weight:700;text-decoration:none;font-size:.95rem;border:2px solid rgba(255,255,255,.5);display:inline-flex;align-items:center;gap:.5rem">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp
        </a>
      </div>
    </div>
  </div>
</section>


<section class="section-pad">
  <div class="container">
    <div class="text-center mb-5" data-aos="fade-up">
      <div class="section-badge"><i class="fa-solid fa-phone me-1"></i> Get In Touch</div>
      <h2 class="section-title">We're Here 24/7 for You</h2>
      <div class="divider-grad mx-auto"></div>
      <p class="section-sub mx-auto">Whether it's an emergency or a planned service, our care coordinators are ready to help.</p>
    </div>

    <div class="row g-5">
      <div class="col-lg-4" data-aos="fade-right">
        <address class="d-flex flex-column gap-3" itemscope itemtype="http://schema.org/MedicalBusiness" style="font-style:normal; margin:0;">
          <meta itemprop="name" content="Stoic Home Care">
          <div class="contact-info-card">
            <div class="ci-icon"><i class="fa-solid fa-phone"></i></div>
            <div><div class="ci-title">Emergency / General</div><div class="ci-val"><span itemprop="telephone">+91 76682 32867</span><br><small>24/7 – 365 days</small></div></div>
          </div>
          <div class="contact-info-card">
            <div class="ci-icon"><i class="fa-brands fa-whatsapp"></i></div>
            <div><div class="ci-title">WhatsApp</div><div class="ci-val"><a href="https://wa.me/917668232867" target="_blank">Chat directly →</a></div></div>
          </div>
          <div class="contact-info-card">
            <div class="ci-icon"><i class="fa-solid fa-envelope"></i></div>
            <div><div class="ci-title">Email</div><div class="ci-val"><a href="mailto:info@stoichomecare.com" itemprop="email">info@stoichomecare.com</a></div></div>
          </div>
          <div class="contact-info-card">
            <div class="ci-icon"><i class="fa-solid fa-location-dot"></i></div>
            <div><div class="ci-title">Address</div><div class="ci-val" itemprop="address">Block-330, Sector MU 2, Greater Noida, Uttar Pradesh 201310</div></div>
          </div>
        </address>
      </div>

      <div class="col-lg-8" data-aos="fade-left">
        <div class="form-card">
          <h4>Send Us a Message</h4>
          <p class="form-subtitle">Fill the form and we will call you back within 1 hour.</p>
          <div id="formAlert" style="display:none" class="alert mb-3"></div>
          <form id="contactForm">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Full Name *</label>
                <input type="text" name="name" class="form-control" placeholder="Your full name" required>
              </div>
              <div class="col-md-6">
                <label class="form-label">Mobile Number *</label>
                <input type="tel" name="phone" class="form-control" placeholder="+91 XXXXX XXXXX" required>
              </div>
              <div class="col-md-6">
                <label class="form-label">Email Address <span class="text-muted fw-normal">(Optional)</span></label>
                <input type="email" name="email" class="form-control" placeholder="you@example.com">
              </div>
              <div class="col-md-6">
                <label class="form-label">Service Required</label>
                <select name="service" class="form-select">
                  <option value="">Select a service</option>
                  <option>ICU Setup @ Home</option><option>ICU Trained Nursing</option>
                  <option>Old Age Care</option><option>Mother & Baby Care</option>
                  <option>Doctor on Call</option><option>Physiotherapy @ Home</option>
                  <option>Oxygen Concentrator</option><option>Hospital Bed</option>
                  <option>Wheelchair</option><option>Other</option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label">City / Location</label>
                <input type="text" name="city" class="form-control" placeholder="e.g. Mumbai, Andheri West">
              </div>
              <div class="col-12">
                <label class="form-label">Message <span class="text-muted fw-normal">(Optional)</span></label>
                <textarea name="message" class="form-control" rows="4" placeholder="Tell us about your requirements…"></textarea>
              </div>
              <div class="col-12">
                <button type="submit" class="btn-form-submit">
                  <i class="fa-solid fa-paper-plane me-2"></i>Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ MAP ══ -->
<section class="section-pad" style="background:var(--light)">
  <div class="container">
    <div class="text-center mb-4" data-aos="fade-up">
      <div class="section-badge"><i class="fa-solid fa-map-location-dot me-1"></i> Our Location</div>
      <h2 class="section-title">Find Us in Greater Noida</h2>
    </div>
    <div class="map-wrap" data-aos="zoom-in">
     <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d11700.61034501588!2d77.2749852!3d28.54852535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390c9530b5b56b57%3A0x111166040062b6cc!2sStoic%20Home Care%2C%20Block-330%2C%20Sector%20MU%202%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201310!3m2!1d28.4731435!2d77.5722983!5e1!3m2!1sen!2sin!4v1772220332638!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>

<!-- ══ FAQ ══ -->
<section class="section-pad">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="text-center mb-5" data-aos="fade-up">
          <div class="section-badge"><i class="fa-solid fa-circle-question me-1"></i> FAQ</div>
          <h2 class="section-title">Frequently Asked Questions</h2>
        </div>
        <div class="faq-item open" data-aos="fade-up" data-aos-delay="0">
          <div class="faq-q">
            <span><i class="fa-solid fa-bolt me-2 text-teal"></i>How quickly can you deploy a nurse or ICU setup?</span>
            <i class="fa-solid fa-plus faq-icon"></i>
          </div>
          <div class="faq-a">For most services we deploy within 2–4 hours of confirmed booking. For ICU setups, same-day deployment is available in Delhi. Equipment delivery is usually arranged within 3–6 hours.</div>
        </div>
        <div class="faq-item" data-aos="fade-up" data-aos-delay="50">
          <div class="faq-q">
            <span><i class="fa-solid fa-calendar-days me-2 text-teal"></i>What are the minimum rental periods for equipment?</span>
            <i class="fa-solid fa-plus faq-icon"></i>
          </div>
          <div class="faq-a">Most equipment is available for a minimum of 15 days. Monthly rentals get discounted rates. We also offer weekly rentals for certain items — contact us to discuss your specific needs.</div>
        </div>
        <div class="faq-item" data-aos="fade-up" data-aos-delay="100">
          <div class="faq-q">
            <span><i class="fa-solid fa-id-card me-2 text-teal"></i>Are your nurses verified and certified?</span>
            <i class="fa-solid fa-plus faq-icon"></i>
          </div>
          <div class="faq-a">Yes, absolutely. All our nurses are INC-registered (Indian Nursing Council), have verified police backgrounds, and undergo internal ICU care training. We share credentials before deployment on request.</div>
        </div>
        <div class="faq-item" data-aos="fade-up" data-aos-delay="150">
          <div class="faq-q">
            <span><i class="fa-solid fa-map-pin me-2 text-teal"></i>Do you provide services outside Delhi?</span>
            <i class="fa-solid fa-plus faq-icon"></i>
          </div>
          <div class="faq-a">We primarily serve Delhi, Pune, Nashik, Navi Delhi, and Thane. For other cities, please contact us — we're expanding and may arrange services on request.</div>
        </div>
        <div class="faq-item" data-aos="fade-up" data-aos-delay="200">
          <div class="faq-q">
            <span><i class="fa-solid fa-rotate me-2 text-teal"></i>What if we're not satisfied with the service?</span>
            <i class="fa-solid fa-plus faq-icon"></i>
          </div>
          <div class="faq-a">We have a replacement guarantee. If you're not satisfied with any nurse or equipment, contact us within 24 hours and we'll arrange a replacement at no extra charge. Patient satisfaction is our top priority.</div>
        </div>
        <div class="faq-item" data-aos="fade-up" data-aos-delay="250">
          <div class="faq-q">
            <span><i class="fa-solid fa-credit-card me-2 text-teal"></i>What payment methods do you accept?</span>
            <i class="fa-solid fa-plus faq-icon"></i>
          </div>
          <div class="faq-a">We accept cash, UPI (GPay, PhonePe, Paytm), NEFT/IMPS bank transfers, and all major credit/debit cards. Payment plans for long-term rentals can be discussed with our care coordinator.</div>
        </div>
      </div>
    </div>
  </div>
</section>
</main>

<script>
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  var alertDiv = document.getElementById('formAlert');
  alertDiv.style.display = 'none';
  var btn = this.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Sending…';
  var fd = new FormData(this);
  try {
    var res  = await fetch('<?= BASE_URL ?>/api/enquiry.php', { method:'POST', body:fd });
    var data = await res.json();
    alertDiv.style.display = 'block';
    if (data.success) {
      alertDiv.className = 'alert alert-success mb-3';
      alertDiv.textContent = '✓ Thank you! We will call you back within 1 hour.';
      this.reset();
    } else {
      alertDiv.className = 'alert alert-danger mb-3';
      alertDiv.textContent = data.message;
    }
  } catch(err) {
    alertDiv.style.display = 'block';
    alertDiv.className = 'alert alert-danger mb-3';
    alertDiv.textContent = 'Network error. Please call us directly.';
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Send Message';
});
</script>

<?php
// SERP Feature Assembly: FAQ Schema (Step 19)
$customSchema = [[
  "@context" => "https://schema.org",
  "@type" => "FAQPage",
  "mainEntity" => [
    [
      "@type" => "Question",
      "name" => "How quickly can you deploy a nurse or ICU setup?",
      "acceptedAnswer" => [
        "@type" => "Answer",
        "text" => "For most services we deploy within 2–4 hours of confirmed booking. For ICU setups, same-day deployment is available in Delhi. Equipment delivery is usually arranged within 3–6 hours."
      ]
    ],
    [
      "@type" => "Question",
      "name" => "What are the minimum rental periods for equipment?",
      "acceptedAnswer" => [
        "@type" => "Answer",
        "text" => "Most equipment is available for a minimum of 15 days. Monthly rentals get discounted rates. We also offer weekly rentals for certain items."
      ]
    ],
    [
      "@type" => "Question",
      "name" => "Are your nurses verified and certified?",
      "acceptedAnswer" => [
        "@type" => "Answer",
        "text" => "Yes, absolutely. All our nurses are INC-registered (Indian Nursing Council), have verified police backgrounds, and undergo internal ICU care training."
      ]
    ],
    [
      "@type" => "Question",
      "name" => "Do you provide services outside Delhi?",
      "acceptedAnswer" => [
        "@type" => "Answer",
        "text" => "We primarily serve Delhi, Pune, Nashik, Navi Delhi, and Thane. For other cities, please contact us."
      ]
    ],
    [
      "@type" => "Question",
      "name" => "What if we're not satisfied with the service?",
      "acceptedAnswer" => [
        "@type" => "Answer",
        "text" => "We have a replacement guarantee. If you're not satisfied with any nurse or equipment, contact us within 24 hours and we'll arrange a replacement at no extra charge."
      ]
    ],
    [
      "@type" => "Question",
      "name" => "What payment methods do you accept?",
      "acceptedAnswer" => [
        "@type" => "Answer",
        "text" => "We accept cash, UPI (GPay, PhonePe, Paytm), NEFT/IMPS bank transfers, and all major credit/debit cards."
      ]
    ]
  ]
]];
?>
<script type="application/ld+json">
<?= json_encode($customSchema[0], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) ?>
</script>

<?php require_once ROOT . '/client/includes/footer.php'; ?>
