import Link from 'next/link';
import HomeEnquiryForm from '../../components/HomeEnquiryForm';

export const metadata = {
  title: 'Contact Stoic Home Care – Book a Service or Enquire',
  description: 'Contact Stoic Home Care for Home Care services, medical equipment rental, or general enquiries. Available 24/7.',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  const customSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How quickly can you deploy a nurse or ICU setup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most services we deploy within 2–4 hours of confirmed booking. For ICU setups, same-day deployment is available in Delhi. Equipment delivery is usually arranged within 3–6 hours."
        }
      },
      {
        "@type": "Question",
        "name": "What are the minimum rental periods for equipment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most equipment is available for a minimum of 15 days. Monthly rentals get discounted rates. We also offer weekly rentals for certain items."
        }
      },
      {
        "@type": "Question",
        "name": "Are your nurses verified and certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, absolutely. All our nurses are INC-registered (Indian Nursing Council), have verified police backgrounds, and undergo internal ICU care training."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide services outside Delhi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We primarily serve Delhi, Pune, Nashik, Navi Delhi, and Thane. For other cities, please contact us."
        }
      },
      {
        "@type": "Question",
        "name": "What if we're not satisfied with the service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We have a replacement guarantee. If you're not satisfied with any nurse or equipment, contact us within 24 hours and we'll arrange a replacement at no extra charge."
        }
      },
      {
        "@type": "Question",
        "name": "What payment methods do you accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accept cash, UPI (GPay, PhonePe, Paytm), NEFT/IMPS bank transfers, and all major credit/debit cards."
        }
      }
    ]
  };

  return (
    <main id="main-content">
      {/* ══ CONTACT HERO ══ */}
      <header className="contact-hero-section" aria-label="Contact Page Hero">
        <div className="container position-relative" style={{ zIndex: 2, paddingBottom: '25px' }}>
          <div className="row align-items-center g-5 py-5 ">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="hero-badge"><i className="fa-solid fa-headset me-2"></i>Always Available 24/7</div>
              <h1 className="hero-title">Get in Touch<br/><span>We're Here for You</span></h1>
              <p className="hero-sub">Whether it's an emergency, a booking enquiry or a question about services — our care coordinators are available around the clock to help you.</p>
              <div className="hero-btns">
                <a href="tel:+917668232867" className="btn-primary-grad"><i className="fa-solid fa-phone me-2"></i>Call +91 76682 32867</a>
                <a href="https://wa.me/917668232867" className="btn-outline-white" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp me-2"></i>WhatsApp Us</a>
              </div>
            </div>
            <div className="col-lg-6 hero-img-side" data-aos="fade-left">
              <div className="d-flex flex-column gap-3">
                <div className="contact-info-card" style={{ background: 'rgba(255,255,255,.95)' }}>
                  <div className="ci-icon"><i className="fa-solid fa-phone"></i></div>
                  <div><div className="ci-title">Emergency Line</div><div className="ci-val">+91 76682 32867<br/><small>Available 24/7 — 365 days</small></div></div>
                </div>
                <div className="contact-info-card" style={{ background: 'rgba(255,255,255,.95)' }}>
                  <div className="ci-icon"><i className="fa-solid fa-envelope"></i></div>
                  <div><div className="ci-title">Email</div><div className="ci-val">info@stoichomecare.com</div></div>
                </div>
                <div className="contact-info-card" style={{ background: 'rgba(255,255,255,.95)' }}>
                  <div className="ci-icon"><i className="fa-solid fa-location-dot"></i></div>
                  <div><div className="ci-title">Office</div><div className="ci-val">FF2 Block 330, MU 2, Greater Noida, Uttar Pradesh</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══ EMERGENCY STRIP ══ */}
      <section style={{ padding: '2rem 0' }}>
        <div className="container">
          <div className="emergency-strip" data-aos="zoom-in">
            <div>
              <h4><i className="fa-solid fa-triangle-exclamation me-2"></i>Medical Emergency?</h4>
              <p>Our emergency team is ready to deploy within 2 hours. Don't wait — call us right now.</p>
            </div>
            <div className="d-flex gap-3 flex-wrap">
              <a href="tel:+917668232867" style={{ background: '#fff', color: '#b45309', padding: '.8rem 1.8rem', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '.95rem', display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                <i className="fa-solid fa-phone"></i> Call Now
              </a>
              <a href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,.18)', color: '#fff', padding: '.8rem 1.8rem', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '.95rem', border: '2px solid rgba(255,255,255,.5)', display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                <i className="fa-brands fa-whatsapp"></i> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge"><i className="fa-solid fa-phone me-1"></i> Get In Touch</div>
            <h2 className="section-title">We're Here 24/7 for You</h2>
            <div className="divider-grad mx-auto"></div>
            <p className="section-sub mx-auto">Whether it's an emergency or a planned service, our care coordinators are ready to help.</p>
          </div>

          <div className="row g-5">
            <div className="col-lg-4" data-aos="fade-right">
              <address className="d-flex flex-column gap-3" itemScope itemType="http://schema.org/MedicalBusiness" style={{ fontStyle: 'normal', margin: 0 }}>
                <meta itemProp="name" content="Stoic Home Care" />
                <div className="contact-info-card">
                  <div className="ci-icon"><i className="fa-solid fa-phone"></i></div>
                  <div><div className="ci-title">Emergency / General</div><div className="ci-val"><span itemProp="telephone">+91 76682 32867</span><br/><small>24/7 – 365 days</small></div></div>
                </div>
                <div className="contact-info-card">
                  <div className="ci-icon"><i className="fa-brands fa-whatsapp"></i></div>
                  <div><div className="ci-title">WhatsApp</div><div className="ci-val"><a href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer">Chat directly →</a></div></div>
                </div>
                <div className="contact-info-card">
                  <div className="ci-icon"><i className="fa-solid fa-envelope"></i></div>
                  <div><div className="ci-title">Email</div><div className="ci-val"><a href="mailto:info@stoichomecare.com" itemProp="email">info@stoichomecare.com</a></div></div>
                </div>
                <div className="contact-info-card">
                  <div className="ci-icon"><i className="fa-solid fa-location-dot"></i></div>
                  <div><div className="ci-title">Address</div><div className="ci-val" itemProp="address">Block-330, Sector MU 2, Greater Noida, Uttar Pradesh 201310</div></div>
                </div>
              </address>
            </div>

            <div className="col-lg-8" data-aos="fade-left">
              <HomeEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* ══ MAP ══ */}
      <section className="section-pad" style={{ background: 'var(--light)' }}>
        <div className="container">
          <div className="text-center mb-4" data-aos="fade-up">
            <div className="section-badge"><i className="fa-solid fa-map-location-dot me-1"></i> Our Location</div>
            <h2 className="section-title">Find Us in Greater Noida</h2>
          </div>
          <div className="map-wrap" data-aos="zoom-in">
           <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d11700.61034501588!2d77.2749852!3d28.54852535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390c9530b5b56b57%3A0x111166040062b6cc!2sStoic%20Home%20Care%2C%20Block-330%2C%20Sector%20MU%202%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201310!3m2!1d28.4731435!2d77.5722983!5e1!3m2!1sen!2sin!4v1772220332638!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="section-pad">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5" data-aos="fade-up">
                <div className="section-badge"><i className="fa-solid fa-circle-question me-1"></i> FAQ</div>
                <h2 className="section-title">Frequently Asked Questions</h2>
              </div>
              <div className="faq-item open" data-aos="fade-up" data-aos-delay="0">
                <div className="faq-q">
                  <span><i className="fa-solid fa-bolt me-2 text-teal"></i>How quickly can you deploy a nurse or ICU setup?</span>
                  <i className="fa-solid fa-plus faq-icon"></i>
                </div>
                <div className="faq-a">For most services we deploy within 2–4 hours of confirmed booking. For ICU setups, same-day deployment is available in Delhi. Equipment delivery is usually arranged within 3–6 hours.</div>
              </div>
              <div className="faq-item" data-aos="fade-up" data-aos-delay="50">
                <div className="faq-q">
                  <span><i className="fa-solid fa-calendar-days me-2 text-teal"></i>What are the minimum rental periods for equipment?</span>
                  <i className="fa-solid fa-plus faq-icon"></i>
                </div>
                <div className="faq-a">Most equipment is available for a minimum of 15 days. Monthly rentals get discounted rates. We also offer weekly rentals for certain items — contact us to discuss your specific needs.</div>
              </div>
              <div className="faq-item" data-aos="fade-up" data-aos-delay="100">
                <div className="faq-q">
                  <span><i className="fa-solid fa-id-card me-2 text-teal"></i>Are your nurses verified and certified?</span>
                  <i className="fa-solid fa-plus faq-icon"></i>
                </div>
                <div className="faq-a">Yes, absolutely. All our nurses are INC-registered (Indian Nursing Council), have verified police backgrounds, and undergo internal ICU care training. We share credentials before deployment on request.</div>
              </div>
              <div className="faq-item" data-aos="fade-up" data-aos-delay="150">
                <div className="faq-q">
                  <span><i className="fa-solid fa-map-pin me-2 text-teal"></i>Do you provide services outside Delhi?</span>
                  <i className="fa-solid fa-plus faq-icon"></i>
                </div>
                <div className="faq-a">We primarily serve Delhi, Pune, Nashik, Navi Delhi, and Thane. For other cities, please contact us — we're expanding and may arrange services on request.</div>
              </div>
              <div className="faq-item" data-aos="fade-up" data-aos-delay="200">
                <div className="faq-q">
                  <span><i className="fa-solid fa-rotate me-2 text-teal"></i>What if we're not satisfied with the service?</span>
                  <i className="fa-solid fa-plus faq-icon"></i>
                </div>
                <div className="faq-a">We have a replacement guarantee. If you're not satisfied with any nurse or equipment, contact us within 24 hours and we'll arrange a replacement at no extra charge. Patient satisfaction is our top priority.</div>
              </div>
              <div className="faq-item" data-aos="fade-up" data-aos-delay="250">
                <div className="faq-q">
                  <span><i className="fa-solid fa-credit-card me-2 text-teal"></i>What payment methods do you accept?</span>
                  <i className="fa-solid fa-plus faq-icon"></i>
                </div>
                <div className="faq-a">We accept cash, UPI (GPay, PhonePe, Paytm), NEFT/IMPS bank transfers, and all major credit/debit cards. Payment plans for long-term rentals can be discussed with our care coordinator.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
      />
    </main>
  );
}
