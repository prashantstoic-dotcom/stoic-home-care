import { getServices, getEquipment } from '@/lib/supabase';
import HomeEnquiryForm from '@/components/HomeEnquiryForm';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'ICU at Home & Expert Nursing Services in Greater Noida | Stoic Home Care',
  description: 'Stoic Home Care provides hospital-grade home care in Greater Noida – ICU setup, certified nursing, old age care, mother & baby care, and medical equipment rental. 24/7 Availability.',
  alternates: { canonical: '/' }
};

export default async function HomePage() {
  let services: any[] = [];
  let equipment: any[] = [];
  try {
    const servicesRows = await getServices();
    services = servicesRows ? servicesRows.slice(0, 6) : [];

    const equipmentRows = await getEquipment();
    equipment = equipmentRows ? equipmentRows.slice(0, 8) : [];
  } catch (err) {
    console.warn("Supabase fetch failed, rendering with static components.", err);
  }

  const tickers = ['ICU Setup @ Home','Nursing Attendant','Old Age Care','Mother & Baby Care','Doctor on Call','Physiotherapy','Oxygen Concentrators','Hospital Beds','Wheelchairs'];
  const icons   = ['fa-hospital','fa-pills','fa-user-nurse','fa-baby','fa-stethoscope','fa-dumbbell','fa-lungs','fa-bed-pulse','fa-wheelchair'];
  
  const mergedTickers = [...tickers, ...tickers];

  const staticServices = [
    ['equip.avif','Critical Care','ICU Setup @ Home','Complete ICU infrastructure with ventilators, monitors and critical care nurses.','local_hospital'],
    ['nurse.avif','Nursing','ICU Trained Nursing','Certified nurses for post-op care, IV therapy, wound management and monitoring.','medical_services'],
    ['old.jpg','Elder Care','Old Age Care','Compassionate full-time care for seniors including daily assistance and health monitoring.','elderly'],
    ['child.jpg','Maternity','Mother & Baby Care','Post-natal support for new mothers and neonatal care for newborns by specialists.','child_care'],
    ['doctor_03.jpg','Doctor Visit','Doctor on Call','Board-certified physicians visiting your home for diagnosis, prescriptions and follow-ups.','health_and_safety'],
    ['physio.webp','Rehabilitation','Physiotherapy @ Home','Expert physiotherapists for stroke rehab, post-surgical recovery and pain management.','sports_gymnastics'],
  ];

  const whys = [
    ['verified','Expert Professionals','ICU-certified nurses and doctors with verified credentials.','bento-lg'],
    ['biotech','Advanced Equipment','Latest medical technology, sanitized and tested before every deployment.','bento-sm'],
    ['schedule','24/7 Availability','Round-the-clock support for emergencies.','bento-sm'],
    ['payments','Affordable Plans','Transparent pricing with zero hidden costs.','bento-md'],
    ['home_health','Home Comfort','Recover in the familiar environment of your own home.','bento-md'],
    ['health_and_safety','Safety First','Strict hygiene protocols, PPE compliance, and infection control.','bento-lg'],
  ];

  const staticEq = [
    ['blog-1.jpg','Oxygen Concentrator','5L & 10L medical-grade concentrators.','From ₹3,000/mo','High Demand'],
    ['clinic_01.jpg','Hospital Bed','Manual & electric semi-fowler beds.','From ₹2,500/mo','Essential'],
    ['clinic_03.jpg','BiPAP / CPAP Machine','Advanced respiratory support.','Call for pricing','Advanced'],
    ['clinic_02.jpg','Patient Monitor','ECG, SpO2, NIBP comprehensive monitoring.','From ₹5,000/mo','Professional'],
    ['equip.avif','Wheelchair','Standard & reclining wheelchairs.','From ₹800/mo','Mobility'],
  ];

  const testis = [
    ['R','Rahul Sharma',"Patient's Son, Mumbai","When my father was discharged after a severe cardiac arrest, we were terrified about managing his ICU setup. Stoic Home Care set up a hospital-grade ICU at home within 4 hours, and their critical care nurses felt like family. They saved his life and our peace of mind."],
    ['P','Priya Mehta',"Patient's Daughter, Pune","During a critical breathing crisis at 2 AM, every other rental provider refused delivery. Stoic Home Care's team was at our door with a verified Oxygen Concentrator within 3 hours. Transparent pricing, no hidden costs, and lifesaving speed."],
    ['A','Anjali Verma',"New Mother, Delhi","Managing a newborn while recovering from a C-section was overwhelming. The neonatal nurse sent by Stoic was exceptional—she didn't just care for the baby but guided me through breastfeeding and postnatal recovery with absolute warmth."],
    ['V','Vijay Patil',"Stroke Patient, Nashik","A stroke left my left side completely paralyzed. The neuro-physiotherapist from Stoic set up a rigorous, daily rehabilitation plan at home. His dedication and patient encouragement got me back on my feet in less than 3 months."],
    ['S','Suresh Iyer',"Patient's Grandson, Bangalore","We needed a compassionate caregiver for my 85-year-old grandfather with dementia. The attendant from Stoic was incredibly patient, gentle, and kept detailed daily vitals charts. He restored dignity to my grandfather's final months."],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Stoic Home Care",
        "url": "https://stoiccare.in",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://stoiccare.in/services?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "MedicalOrganization",
        "name": "Stoic Home Care",
        "url": "https://stoiccare.in",
        "logo": "https://stoiccare.in/logo.png",
        "description": "Hospital-grade home care in Greater Noida – ICU setup, certified nursing, old age care, mother & baby care, and medical equipment rental.",
        "telephone": "+91-7668232867",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Greater Noida",
          "addressLocality": "Greater Noida",
          "addressRegion": "UP",
          "addressCountry": "IN"
        }
      }
    ]
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 991px) {
          .hero-row-short { align-items: flex-start !important; padding-top: 100px !important; min-height: auto !important; height: 100vh; }
          .hero-swiper .swiper-slide { display: flex; flex-direction: column; justify-content: flex-start; }
        }
        @media (max-width: 575px) {
          .hero-row-short { padding-top: 90px !important; }
        }
        @keyframes floatY {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @media (max-width: 991px) {
          .hero-float { display: none !important; }
          .main-hero { padding-top: 80px; min-height: auto !important; }
        }
        @media (min-width: 992px) { .sticky-top-lg { position: sticky; top: 100px; } }
      `}} />

      {/* ══ MAIN HERO ══ */}
      <div className="main-hero" style={{position:'relative', overflow:'hidden', background:'#0f2240', padding: '140px 0 80px', display:'flex', alignItems:'center'}}>
        <Image className="hero-bg" src="/images/carousel-1.avif" alt="ICU Home Care" width={1920} height={1080} sizes="(max-width: 768px) 100vw, 1920px" priority style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.4}} />
        <div className="hero-overlay" style={{position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(15,34,64,0.95) 0%, rgba(33,150,211,0.8) 100%)'}}></div>
        
        <div className="container hero-content" style={{position:'relative', zIndex:2}}>
          <div className="row align-items-center g-5">
            
            {/* Left: Typography & CTAs */}
            <div className="col-lg-6">
              <div className="hero-badge" style={{background:'rgba(78,205,196,.15)', color:'#7ee8e2', border:'1px solid rgba(78,205,196,.3)', padding:'.5rem 1rem', borderRadius:'50px', display:'inline-block', fontSize:'0.85rem', fontWeight:600, marginBottom:'1.5rem'}}>
                <i className="fa-solid fa-shield-heart me-1"></i> Trusted by 10,000+ Families
              </div>
              <h1 className="hero-title" style={{fontSize:'clamp(2.5rem, 5vw, 4rem)', fontWeight:800, color:'#fff', lineHeight:1.1, marginBottom:'1.5rem', fontFamily:"var(--font-outfit), sans-serif"}}>
                Hospital-Quality Care<br/><span style={{color:'#4ecdc4'}}>Right at Home.</span>
              </h1>
              <p className="hero-sub" style={{fontSize:'1.1rem', color:'rgba(255,255,255,0.85)', lineHeight:1.7, marginBottom:'2.5rem', maxWidth:'540px'}}>
                Expert ICU setups, certified nursing staff, and advanced medical equipment delivered to your doorstep. We bring the hospital to you, 24/7.
              </p>
              <div className="hero-btns" style={{display:'flex', gap:'1rem', flexWrap:'wrap'}}>
                <a href="tel:+917668232867" className="btn btn-lg" aria-label="Call Emergency" style={{background:'#ff4b4b', color:'#fff', borderRadius:'50px', padding:'0.8rem 2rem', fontWeight:700, boxShadow:'0 8px 25px rgba(255,75,75,0.4)'}}><i className="fa-solid fa-phone me-2"></i>Call Emergency</a>
                <Link href="/contact" className="btn btn-lg" aria-label="Book Consultation" style={{background:'#fff', color:'#0f2240', borderRadius:'50px', padding:'0.8rem 2rem', fontWeight:700, boxShadow:'0 8px 25px rgba(0,0,0,0.1)'}}><i className="fa-solid fa-calendar-check me-2"></i>Book Consultation</Link>
              </div>
            </div>

            {/* Right: Premium Image & Glassmorphism Badges */}
            <div className="col-lg-6 hero-img-side text-center text-lg-end" style={{position:'relative'}}>
              <div style={{position:'relative', display:'inline-block'}}>
                <Image src="/images/doctor.avif" alt="Home Doctor" width={500} height={600} sizes="(max-width: 991px) 0vw, 500px" priority style={{borderRadius:'30px', width:'100%', maxWidth:'500px', height:'auto', boxShadow:'0 30px 60px rgba(0,0,0,0.5)'}} />
                
                <div className="hero-float f1 d-none d-xl-flex" style={{position:'absolute', bottom:'30px', left:'-80px', background:'rgba(255,255,255,0.95)', padding:'0.8rem 1rem', borderRadius:'12px', alignItems:'center', gap:'0.8rem', boxShadow:'0 15px 35px rgba(0,0,0,0.15)', animation:'floatY 4s ease-in-out infinite'}}>
                  <div style={{background:'rgba(37,211,102,.15)', width:'35px', height:'35px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%'}}><i className="fa-solid fa-star" style={{color:'#F5B041', fontSize:'1rem'}}></i></div>
                  <div className="text-start">
                    <div style={{fontWeight:800, fontSize:'1rem', color:'#0f2240', lineHeight:1.2}}>4.9/5 Rating</div>
                    <div style={{fontSize:'0.75rem', color:'#6b82a3', fontWeight:600}}>Google Reviews</div>
                  </div>
                </div>

                <div className="hero-float f2 d-none d-xl-flex" style={{position:'absolute', top:'30px', right:'-60px', background:'rgba(255,255,255,0.95)', padding:'0.8rem 1rem', borderRadius:'12px', alignItems:'center', gap:'0.8rem', boxShadow:'0 15px 35px rgba(0,0,0,0.15)', animation:'floatY 5s ease-in-out infinite reverse'}}>
                  <div style={{background:'rgba(33,150,211,.15)', width:'35px', height:'35px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%'}}><i className="fa-solid fa-user-nurse" style={{color:'#2196d3', fontSize:'1rem'}}></i></div>
                  <div className="text-start">
                    <div style={{fontWeight:800, fontSize:'1rem', color:'#0f2240', lineHeight:1.2}}>Verified Staff</div>
                    <div style={{fontSize:'0.75rem', color:'#6b82a3', fontWeight:600}}>100% Checked</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══ TICKER ══ */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {mergedTickers.map((t, i) => (
            <span key={i} className="ticker-item"><i className={`fa-solid ${icons[i % icons.length]} me-1`}></i> {t}</span>
          ))}
        </div>
      </div>

      {/* ══ PREMIUM METRICS BAR ══ */}
      <section style={{background:'#fff', padding:'3rem 0', borderBottom:'1px solid rgba(0,0,0,0.05)'}}>
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="0">
              <div style={{fontSize:'2.5rem', color:'#4ecdc4', marginBottom:'0.5rem'}}><i className="fa-solid fa-users"></i></div>
              <h4 style={{fontSize:'1.8rem', fontWeight:800, color:'#0f2240', marginBottom:'0.2rem'}}>10,000+</h4>
              <p style={{color:'#6b82a3', fontWeight:600, fontSize:'0.9rem', margin:0}}>Patients Served</p>
            </div>
            <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="100">
              <div style={{fontSize:'2.5rem', color:'#4ecdc4', marginBottom:'0.5rem'}}><i className="fa-solid fa-user-nurse"></i></div>
              <h4 style={{fontSize:'1.8rem', fontWeight:800, color:'#0f2240', marginBottom:'0.2rem'}}>50+</h4>
              <p style={{color:'#6b82a3', fontWeight:600, fontSize:'0.9rem', margin:0}}>ICU Trained Staff</p>
            </div>
            <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="200">
              <div style={{fontSize:'2.5rem', color:'#4ecdc4', marginBottom:'0.5rem'}}><i className="fa-solid fa-bolt"></i></div>
              <h4 style={{fontSize:'1.8rem', fontWeight:800, color:'#0f2240', marginBottom:'0.2rem'}}>2 Hours</h4>
              <p style={{color:'#6b82a3', fontWeight:600, fontSize:'0.9rem', margin:0}}>Fast Deployment</p>
            </div>
            <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="300">
              <div style={{fontSize:'2.5rem', color:'#4ecdc4', marginBottom:'0.5rem'}}><i className="fa-solid fa-award"></i></div>
              <h4 style={{fontSize:'1.8rem', fontWeight:800, color:'#0f2240', marginBottom:'0.2rem'}}>ISO 9001</h4>
              <p style={{color:'#6b82a3', fontWeight:600, fontSize:'0.9rem', margin:0}}>2015 Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES PREVIEW ══ */}
      <section className="section-pad">
        <div className="container">
          <div className="row align-items-end mb-5">
            <div className="col-lg-7" data-aos="fade-right">
              <div className="section-badge"><i className="fa-solid fa-stethoscope me-1"></i> Home Care Services</div>
              <h2 className="section-title">Complete Home Care Solutions</h2>
              <div className="divider-grad"></div>
              <p className="section-sub">Every service is designed around patient comfort, clinical excellence, and family peace of mind.</p>
            </div>
            <div className="col-lg-5 text-lg-end mt-3 mt-lg-0" data-aos="fade-left">
              <Link href="/services" className="btn-primary-grad text-center"><i className="fa-solid fa-grid-2 me-2"></i>View All Services</Link>
            </div>
          </div>
          <div className="row g-4">
            {services.length > 0 ? (
              services.map((svc, d) => (
                <div key={svc.id} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={(d % 3) * 100}>
                  <div className="service-card">
                    <div className="sc-img">
                      <Image src={svc.image ? `/uploads/services/${svc.image}` : '/images/equip.avif'} alt={svc.title} width={400} height={300} loading="lazy" />
                      <div className="sc-icon"><span className="material-icons-round">local_hospital</span></div>
                    </div>
                    <div className="sc-body">
                      <div className="sc-tag">{svc.category || ''}</div>
                      <h5>{svc.title}</h5>
                      <p>{svc.description}</p>
                      <Link href="/services" className="sc-link">Learn More <i className="fa-solid fa-arrow-right fa-xs"></i></Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              staticServices.map(([img, tag, title, desc, icon], d) => (
                <div key={title} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={(d % 3) * 100}>
                  <div className="service-card">
                    <div className="sc-img">
                      <Image src={`/images/${img}`} alt={title} width={400} height={300} loading="lazy" />
                      <div className="sc-icon"><span className="material-icons-round">{icon}</span></div>
                    </div>
                    <div className="sc-body">
                      <div className="sc-tag">{tag}</div>
                      <h5>{title}</h5>
                      <p>{desc}</p>
                      <Link href="/services" className="sc-link">Learn More <i className="fa-solid fa-arrow-right fa-xs"></i></Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="section-pad" style={{background:'#f8fbff', overflow:'hidden'}}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge"><i className="fa-solid fa-bars-progress me-1"></i> Simple Process</div>
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub">Get hospital-grade care at home in 3 simple steps</p>
          </div>
          <div className="timeline-container">
            <div className="timeline-track"></div>
            <div className="row g-4 position-relative" style={{zIndex: 1}}>
              <div className="col-md-4 timeline-step" data-aos="fade-up" data-aos-delay="0">
                <div className="how-step-card text-center">
                  <div className="how-num-wrapper">
                    <div className="how-num-glow"></div>
                    <div className="how-num">1</div>
                  </div>
                  <h4>Request a Callback</h4>
                  <p className="text-muted mb-0">Fill out our quick form or call us directly. Our care coordinator connects with you within 60 minutes.</p>
                </div>
              </div>
              <div className="col-md-4 timeline-step" data-aos="fade-up" data-aos-delay="100">
                <div className="how-step-card text-center">
                  <div className="how-num-wrapper">
                    <div className="how-num-glow"></div>
                    <div className="how-num">2</div>
                  </div>
                  <h4>Clinical Assessment</h4>
                  <p className="text-muted mb-0">Our medical experts assess your specific needs and match you with the right ICU-trained professionals.</p>
                </div>
              </div>
              <div className="col-md-4 timeline-step" data-aos="fade-up" data-aos-delay="200">
                <div className="how-step-card text-center">
                  <div className="how-num-wrapper">
                    <div className="how-num-glow"></div>
                    <div className="how-num">3</div>
                  </div>
                  <h4>Care Starts at Home</h4>
                  <p className="text-muted mb-0">We deliver equipment, and our verified nursing staff begins providing compassionate care at your home.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section className="section-pad bg-grad">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4" data-aos="fade-right">
              <div className="pt-4 sticky-top-lg" style={{zIndex: 1}}>
                <div className="section-badge light"><i className="fa-solid fa-star me-1"></i> Why Choose Stoic</div>
                <h2 className="section-title text-white">Dedicated to Your Health & Well-being</h2>
                <div className="divider-grad"></div>
                <p className="text-white-50" style={{lineHeight:1.9, marginBottom:'2rem'}}>At Stoic Home Care, we go beyond medical treatment. Our holistic approach ensures emotional and physical well-being through enterprise-grade home care.</p>
                <Image src="/images/nurse.avif" alt="Care" width={500} height={600} className="bento-hero-img" loading="lazy" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="bento-grid">
                {whys.map(([icon, title, text, size], d) => (
                  <div key={title} className={`bento-item ${size}`} data-aos="fade-up" data-aos-delay={d*50}>
                    <div className="why-card-bento">
                      <div className="wc-icon-bento"><span className="material-icons-round">{icon}</span></div>
                      <div className="wc-content-bento">
                        <h5>{title}</h5>
                        <p>{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="section-pad" style={{background:'var(--light)'}}>
        <div className="container">
          <div className="stats-strip">
            <div className="row g-4 text-center">
              {[
                ['5000+','Patients Served'],
                ['15+','Services Offered'],
                ['50+','Expert Staff'],
                ['5+','Years Excellence']
              ].map(([num,lbl], d) => (
                <div key={lbl} className="col-6 col-md-3" data-aos="zoom-in" data-aos-delay={d*100}>
                  <div className="stat-item">
                    <div className="stat-num premium-stat-num">{num}</div>
                    <div className="stat-lbl premium-stat-lbl">{lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ EQUIPMENT PREVIEW ══ */}
      <section className="section-pad">
        <div className="container">
          <div className="row align-items-end mb-5">
            <div className="col-lg-7" data-aos="fade-right">
              <div className="section-badge"><span className="material-icons-round" style={{fontSize:'1rem', verticalAlign:'middle'}}>medical_information</span> Equipment on Rent</div>
              <h2 className="section-title">Medical Equipment Delivered to You</h2>
              <p className="section-sub">Hospital-grade devices on flexible rental plans. Doorstep delivery, installation and maintenance included.</p>
            </div>
            <div className="col-lg-5 text-lg-end mt-3 mt-lg-0" data-aos="fade-left">
              <Link href="/equipment" className="btn-primary-grad text-center"><i className="fa-solid fa-boxes-stacked me-2"></i>All Equipment</Link>
            </div>
          </div>
          <div className="swiper equip-home-swiper">
            <div className="swiper-wrapper">
              {equipment.length > 0 ? (
                equipment.map(eq => (
                  <div key={eq.id} className="swiper-slide">
                    <div className="equip-card">
                      <div className="ec-img">
                        <Image src={eq.image ? `/uploads/equipment/${eq.image}` : '/images/equip.avif'} alt={eq.title} width={400} height={300} loading="lazy" />
                      </div>
                      <div className="ec-body">
                        <h5>{eq.title}</h5>
                        <p>{eq.description}</p>
                        <div className="ec-footer">
                          <span className="ec-price">{eq.price || 'Call for pricing'}</span>
                          <Link href="/contact" className="ec-rent-btn">Rent Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                staticEq.map(([img, title, desc, price, badge]) => (
                  <div key={title} className="swiper-slide">
                    <div className="equip-card">
                      <div className="ec-img">
                        <Image src={`/images/${img}`} alt={title} width={400} height={300} loading="lazy" />
                        <span className="ec-badge">{badge}</span>
                      </div>
                      <div className="ec-body">
                        <h5>{title}</h5>
                        <p>{desc}</p>
                        <div className="ec-footer">
                          <span className="ec-price">{price}</span>
                          <Link href="/contact" className="ec-rent-btn">Rent Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="swiper-pagination" style={{position:'relative', marginTop:'1.5rem'}}></div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="section-pad" style={{background:'var(--light)', position: 'relative', overflow: 'hidden'}}>
        <div style={{position:'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', background: 'rgba(78,205,196,0.15)', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0}}></div>
        <div style={{position:'absolute', bottom: '-100px', right: '-100px', width: '500px', height: '500px', background: 'rgba(33,150,211,0.1)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0}}></div>
        
        <div className="container" style={{position: 'relative', zIndex: 1}}>
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge"><i className="fa-solid fa-comments me-1"></i> Patient Stories</div>
            <h2 className="section-title">What Families Say About Us</h2>
          </div>
          <div className="swiper testi-swiper" style={{paddingBottom: '2rem'}}>
            <div className="swiper-wrapper">
              {testis.map(([av, name, role, text]) => (
                <div key={name} className="swiper-slide" style={{padding: '1rem'}}>
                  <div className="testi-card premium-testi-card">
                    <div className="testi-quote-icon">"</div>
                    <div className="testi-stars mb-3">
                      <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <p className="testi-text premium-testi-text">{text}</p>
                    <div className="testi-author pt-4 mt-auto border-top">
                      <div className="testi-av premium-testi-av">{av}</div>
                      <div>
                        <div className="testi-name premium-testi-name">{name}</div>
                        <div className="testi-role premium-testi-role"><i className="fa-solid fa-location-dot fa-xs me-1"></i>{role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination" style={{position:'relative', marginTop:'1.5rem'}}></div>
          </div>
        </div>
      </section>

      {/* ══ ENQUIRY FORM ══ */}
      <section className="section-pad">
        <div className="container">
          <div className="cta-banner mb-5" data-aos="zoom-in">
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <h2 style={{fontSize:'clamp(1.6rem,3vw,2.4rem)', marginBottom:'.8rem'}}>Ready for Hospital-Grade Care at Home?</h2>
                <p>Our team is available 24/7. Call for emergencies or fill the form for scheduled services.</p>
              </div>
              <div className="col-lg-4 d-flex gap-3 flex-wrap justify-content-lg-end">
                <a href="tel:+917668232867" style={{background:'#fff', color:'var(--primary)', padding:'.85rem 1.8rem', borderRadius:'50px', fontWeight:700, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'.5rem'}}><i className="fa-solid fa-phone"></i> Call Now</a>
                <a href="https://wa.me/917668232867" target="_blank" rel="noreferrer" className="btn-wa" style={{padding:'.85rem 1.6rem'}}><i className="fa-brands fa-whatsapp"></i> WhatsApp</a>
              </div>
            </div>
          </div>

          <div className="row g-5 align-items-center">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="section-badge"><i className="fa-solid fa-clipboard-list me-1"></i> Quick Enquiry</div>
              <h2 className="section-title">Request a Callback</h2>
              <div className="divider-grad"></div>
              <p className="section-sub mb-4">Fill out the form and our care coordinator will call you within 1 hour.</p>
              <div className="d-flex flex-column gap-3">
                <div className="contact-info-card"><div className="ci-icon"><i className="fa-solid fa-phone"></i></div><div><div className="ci-title">Emergency Contact</div><div className="ci-val">+91 76682 32867<br/><small>Available 24/7 – 365 days</small></div></div></div>
                <div className="contact-info-card"><div className="ci-icon"><i className="fa-brands fa-whatsapp"></i></div><div><div className="ci-title">WhatsApp</div><div className="ci-val"><a href="https://wa.me/917668232867" target="_blank" rel="noreferrer">Chat with us directly →</a></div></div></div>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              {/* Home Enquiry Form Component */}
              <HomeEnquiryForm />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
