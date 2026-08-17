import Link from 'next/link';
import { getServices } from '@/lib/supabase';
export const metadata = {
  title: 'Home Care Services – ICU Setup, Nursing, Elder Care | Stoic Home Care',
  description: 'Explore all Home Care services by Stoic Home Care: ICU setup, nursing, old age care, physiotherapy and more.',
  alternates: { canonical: '/services' }
};

export default async function ServicesPage() {
  let services: any[] = [];
  try {
    const rows = await getServices();
    services = rows || [];
  } catch (err) {
    console.warn("Supabase fetch failed for ServicesPage.", err);
  }


  const staticServices = [
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

  const customSchema = services.length > 0 ? services.map(svc => ({
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": svc.title,
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Stoic Home Care"
    },
    "description": svc.description || '',
    "areaServed": ["Greater Noida", "Noida", "Delhi NCR", "Ghaziabad"]
  })) : [];

  const faqSchema = {
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
  };

  return (
    <main id="main-content">
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 991.98px) {
          .short-hero .container {
            min-height: 72vh !important;
            padding-bottom: 1.2rem !important;
          }
          .hero-title { margin-bottom: 0.6rem; line-height: 1.15; }
          .hero-sub { margin-bottom: 1rem; font-size: 0.92rem; }
          .hero-badge { margin-bottom: 0.6rem; }
          .hero-btns { margin-top: 0.8rem; }
        }
      `}} />

      {/* ══ HERO STATIC ══ */}
      <header className="short-hero position-relative" aria-label="Services Page Hero">
        <img className="hero-bg" src="/images/ab-3.avif" alt="Home Care Services" loading="eager" width="1920" height="1080" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }} />
        <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, rgba(15,34,64,0.95) 0%, rgba(15,34,64,0.7) 100%)', zIndex: -1 }}></div>
        <div className="container hero-content position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center" style={{ minHeight: '60vh', paddingTop: '10px', paddingBottom: '2rem' }}>
            <div className="col-lg-8 text-white mt-5">
              <div className="hero-badge" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '50px', marginBottom: '1rem', fontSize: '0.9rem' }}><i className="fa-solid fa-stethoscope me-2"></i>15+ Specialized Services</div>
              <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem' }}>Comprehensive Home<br/><span style={{ color: '#0CB8C9' }}>Home Care Services</span></h1>
              <p className="hero-sub" style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px' }}>Professional medical care tailored to your needs — delivered with clinical precision and human compassion, right at your doorstep. Available 24/7.</p>
              <div className="hero-btns d-flex gap-3 flex-wrap">
                <Link href="/contact" className="btn-primary-grad px-4 py-3" style={{ background: 'linear-gradient(135deg, #0CB8C9, #1D9E75)', borderRadius: '50px', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
                  <i className="fa-solid fa-calendar-check me-2"></i>Book Now
                </Link>
                <a href="tel:+917668232867" className="btn-outline-white px-4 py-3" style={{ border: '2px solid rgba(255,255,255,0.5)', borderRadius: '50px', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
                  <i className="fa-solid fa-phone me-2"></i>Emergency Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══ SERVICES CATALOG ══ */}
      <section className="section-pad" style={{ background: 'var(--light)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge"><i className="fa-solid fa-stethoscope me-1"></i> Our Services</div>
            <h2 className="section-title">Complete Home Care Services</h2>
            <div className="divider-grad mx-auto"></div>
            <p className="section-sub mx-auto">Every service designed around patient comfort, clinical excellence, and family peace of mind.</p>
          </div>

          <div className="row g-4">
            {services.length > 0 ? (
              services.map((svc: any, d: number) => (
                <article key={svc.id} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={(d % 3) * 100}>
                  <div className="service-card" style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="sc-img position-relative">
                      <img src={svc.image ? `/uploads/services/${svc.image}` : '/images/equip.avif'} alt={svc.title} loading="lazy" width="400" height="250" style={{ width: '100%', objectFit: 'cover' }} />
                      <div className="sc-icon" style={{ position: 'absolute', bottom: '-20px', right: '20px', width: '50px', height: '50px', background: '#0CB8C9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 5px 15px rgba(12,184,201,0.4)' }}><span className="material-icons-round">local_hospital</span></div>
                    </div>
                    <div className="sc-body p-4 flex-grow-1 d-flex flex-column">
                      <div className="sc-tag" style={{ color: '#0CB8C9', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{svc.category || ''}</div>
                      <h5 style={{ fontWeight: 700, marginBottom: '1rem', color: '#0f2240' }}>{svc.title}</h5>
                      <p style={{ color: '#6c757d', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>{svc.description || ''}</p>
                      <Link href={`/contact?service=${encodeURIComponent(svc.title)}`} className="btn btn-outline-info w-100 text-center" style={{ borderRadius: '8px', fontWeight: 600, padding: '0.6rem' }}>
                        Book Now <i className="fa-solid fa-arrow-right fa-xs ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              staticServices.map(([img, tag, title, desc, icon, features]: any, d: number) => (
                <article key={title} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={(d % 3) * 100}>
                  <div className="service-card" style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="sc-img position-relative">
                      <img src={`/images/${img}`} alt={title} loading="lazy" width="400" height="250" style={{ width: '100%', objectFit: 'cover' }} />
                      <div className="sc-icon" style={{ position: 'absolute', bottom: '-20px', right: '20px', width: '50px', height: '50px', background: '#0CB8C9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 5px 15px rgba(12,184,201,0.4)' }}><span className="material-icons-round">{icon}</span></div>
                    </div>
                    <div className="sc-body p-4 flex-grow-1 d-flex flex-column">
                      <div className="sc-tag" style={{ color: '#0CB8C9', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{tag}</div>
                      <h5 style={{ fontWeight: 700, marginBottom: '1rem', color: '#0f2240' }}>{title}</h5>
                      <p style={{ color: '#6c757d', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{desc}</p>
                      <ul className="sc-features mb-4 ps-0 flex-grow-1" style={{ listStyle: 'none' }}>
                        {features.map((f: string) => (
                          <li key={f} style={{ fontSize: '0.9rem', color: '#495057', marginBottom: '0.5rem' }}><i className="fa-solid fa-check text-teal me-2"></i>{f}</li>
                        ))}
                      </ul>
                      <Link href={`/contact?service=${encodeURIComponent(title)}`} className="btn btn-outline-info w-100 text-center" style={{ borderRadius: '8px', fontWeight: 600, padding: '0.6rem' }}>
                        Book Now <i className="fa-solid fa-arrow-right fa-xs ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="section-pad" style={{ background: 'var(--light)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge"><i className="fa-solid fa-list-check me-1"></i> Our Process</div>
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub mx-auto">Getting started is simple. We handle everything so you can focus on recovery.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="0">
              <div className="process-card text-center p-4" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', height: '100%' }}>
                <div className="p-icon mb-4" style={{ width: '70px', height: '70px', background: 'rgba(12,184,201,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><span className="material-icons-round" style={{ fontSize: '2.2rem', color: '#0CB8C9' }}>phone_in_talk</span></div>
                <h5 style={{ fontWeight: 700, color: '#0f2240' }}>Contact Us</h5>
                <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Call or fill the form. Our coordinator calls back within 1 hour.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
              <div className="process-card text-center p-4" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', height: '100%' }}>
                <div className="p-icon mb-4" style={{ width: '70px', height: '70px', background: 'rgba(12,184,201,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><span className="material-icons-round" style={{ fontSize: '2.2rem', color: '#0CB8C9' }}>assignment</span></div>
                <h5 style={{ fontWeight: 700, color: '#0f2240' }}>Need Assessment</h5>
                <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>We assess your needs and create a custom care plan tailored to you.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
              <div className="process-card text-center p-4" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', height: '100%' }}>
                <div className="p-icon mb-4" style={{ width: '70px', height: '70px', background: 'rgba(12,184,201,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><span className="material-icons-round" style={{ fontSize: '2.2rem', color: '#0CB8C9' }}>home</span></div>
                <h5 style={{ fontWeight: 700, color: '#0f2240' }}>Care Begins</h5>
                <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Our certified professional arrives, sets up equipment and begins care.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
              <div className="process-card text-center p-4" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', height: '100%' }}>
                <div className="p-icon mb-4" style={{ width: '70px', height: '70px', background: 'rgba(12,184,201,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><span className="material-icons-round" style={{ fontSize: '2.2rem', color: '#0CB8C9' }}>health_and_safety</span></div>
                <h5 style={{ fontWeight: 700, color: '#0f2240' }}>Ongoing Support</h5>
                <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Regular health updates, doctor coordination and 24/7 helpline throughout.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
