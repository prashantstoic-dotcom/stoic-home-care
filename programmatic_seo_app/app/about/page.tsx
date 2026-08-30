import Link from 'next/link';
import { Hospital, Mail, Grid2X2, Info, Heart, Activity, Flag, Rocket, Shield, Factory, Star } from 'lucide-react';
export const metadata = {
  title: 'About Stoic Home Care | Top Home Care & ICU Setup in Greater Noida',
  description: 'Learn about Stoic Home Care – our mission to bring hospital-quality ICU setups, skilled nursing, and elder care to your doorstep in Greater Noida & Delhi NCR.',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Stoic Home Care",
    "url": "https://stoiccare.in/about",
    "description": "Learn about Stoic Home Care – our mission to bring hospital-quality ICU setups, skilled nursing, and elder care to your doorstep in Greater Noida & Delhi NCR.",
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Stoic Home Care"
    }
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ══ ABOUT HERO ══ */}
      <header className="about-hero-section" aria-label="About Us Hero">
        <div className="container">
          <div className="row align-items-center g-5 py-5">
            <div className="col-lg-7" data-aos="fade-right">
              <div className="hero-badge"><Hospital size={16} className="me-2" />Our Story</div>
              <h1 className="hero-title">Redefining Home<br/><span>Home Care in India</span></h1>
              <p className="hero-sub">Founded on the belief that exceptional Home Care shouldn't require leaving home. We bridge the gap between hospital-grade care and the comfort of your own space.</p>
              <div className="hero-btns">
                <Link href="/contact" className="btn-primary-grad"><Mail size={18} className="me-2" />Get in Touch</Link>
                <Link href="/services" className="btn-outline-white"><Grid2X2 size={18} className="me-2" />Our Services</Link>
              </div>
            </div>
            <div className="col-lg-5 hero-img-side" data-aos="fade-left">
              <img src="/images/ab-1.avif" alt="Our Team" style={{borderRadius: '24px', width: '100%', boxShadow: '0 24px 80px rgba(0,0,0,.4)'}} />
            </div>
          </div>
        </div>
      </header>

      {/* ══ MISSION & STORY ══ */}
      <section className="section-pad">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="section-badge"><Info size={16} className="me-1" /> Who We Are</div>
              <h2 className="section-title">Our Mission &amp; Story</h2>
              <div className="divider-grad"></div>
              <p style={{lineHeight: 1.9, marginBottom: '1.2rem'}}>Stoic Home Care was founded with a simple but powerful belief: <strong>healing happens best where the heart is.</strong> We recognised a critical gap in Indian Home Care — patients had to choose between hospital-grade care and the comfort of home.</p>
              <p style={{lineHeight: 1.9, color: 'var(--muted)', marginBottom: '1.2rem'}}>Today, we bridge that gap by bringing ICU setups, skilled nursing, advanced medical equipment and pharmaceutical manufacturing directly to patient doorsteps. Our certified professionals work tirelessly to ensure every patient receives the dignity, respect, and expert care they deserve.</p>
              <p style={{lineHeight: 1.9, color: 'var(--muted)'}}>Our approach is holistic — we treat not just the condition, but the whole person. We support families through difficult times with transparency, compassion, and clinical excellence.</p>
              <div className="row g-3 mt-3">
                <div className="col-6"><div style={{background: 'var(--light)', borderRadius: '14px', padding: '1.4rem', textAlign: 'center'}}><div style={{fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', color: 'var(--secondary)', fontWeight: 700}}>5+</div><div style={{color: 'var(--muted)', fontSize: '.88rem'}}>Years of Service</div></div></div>
                <div className="col-6"><div style={{background: 'var(--light)', borderRadius: '14px', padding: '1.4rem', textAlign: 'center'}}><div style={{fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', color: 'var(--secondary)', fontWeight: 700}}>50+</div><div style={{color: 'var(--muted)', fontSize: '.88rem'}}>Lives Touched</div></div></div>
                <div className="col-6"><div style={{background: 'var(--light)', borderRadius: '14px', padding: '1.4rem', textAlign: 'center'}}><div style={{fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', color: 'var(--secondary)', fontWeight: 700}}>50+</div><div style={{color: 'var(--muted)', fontSize: '.88rem'}}>Expert Staff</div></div></div>
                <div className="col-6"><div style={{background: 'var(--light)', borderRadius: '14px', padding: '1.4rem', textAlign: 'center'}}><div style={{fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', color: 'var(--secondary)', fontWeight: 700}}>24/7</div><div style={{color: 'var(--muted)', fontSize: '.88rem'}}>Always Available</div></div></div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <img src="/images/blog-2.jpg" alt="Home Care Team" style={{borderRadius: '20px', width: '100%', boxShadow: '0 20px 60px rgba(26,58,107,.2)'}} />
              <div style={{background: '#fff', borderRadius: '14px', padding: '1.3rem', boxShadow: 'var(--shadow-sm)', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <span className="material-icons-round" style={{fontSize: '2.5rem', color: '#f59e0b'}}>workspace_premium</span>
                <div>
                  <div style={{fontWeight: 700, fontSize: '.95rem'}}>Most Trusted Home Care Brand</div>
                  <div style={{color: 'var(--muted)', fontSize: '.82rem'}}>Voted by 1,000+ patient families across India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="section-pad" style={{background: 'var(--light)'}}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge"><Heart size={16} className="me-1" /> Our Values</div>
            <h2 className="section-title">What Drives Us Every Day</h2>
            <p className="section-sub mx-auto">Our core values shape every interaction, every care plan, and every patient outcome.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
              <div className="value-card">
                <div className="vc-icon"><span className="material-icons-round" style={{color: 'var(--teal)', fontSize: '2rem'}}>favorite</span></div>
                <h5>Compassion First</h5>
                <p>We treat every patient like family. Empathy and kindness are the foundation of every service we deliver.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="80">
              <div className="value-card">
                <div className="vc-icon"><span className="material-icons-round" style={{color: 'var(--teal)', fontSize: '2rem'}}>handshake</span></div>
                <h5>Integrity &amp; Trust</h5>
                <p>Honest communication, transparent pricing and no hidden costs — ever. We earn trust through accountability.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="160">
              <div className="value-card">
                <div className="vc-icon"><span className="material-icons-round" style={{color: 'var(--teal)', fontSize: '2rem'}}>verified</span></div>
                <h5>Clinical Excellence</h5>
                <p>We never compromise on quality of care or equipment. ICU-grade standards, delivered at home.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
              <div className="value-card">
                <div className="vc-icon"><span className="material-icons-round" style={{color: 'var(--teal)', fontSize: '2rem'}}>biotech</span></div>
                <h5>Innovation</h5>
                <p>We continuously adopt the latest medical technologies to provide the best possible home care solutions.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="80">
              <div className="value-card">
                <div className="vc-icon"><span className="material-icons-round" style={{color: 'var(--teal)', fontSize: '2rem'}}>home_health</span></div>
                <h5>Patient-Centred</h5>
                <p>Every care plan is personalised. We listen to patients and families to design care around unique needs.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="160">
              <div className="value-card">
                <div className="vc-icon"><span className="material-icons-round" style={{color: 'var(--teal)', fontSize: '2rem'}}>public</span></div>
                <h5>Accessibility</h5>
                <p>Quality Home Care should reach everyone. We strive to make excellent home care affordable and accessible.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ JOURNEY TIMELINE ══ */}
      <section className="section-pad bg-grad">
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="section-badge light"><Activity size={16} className="me-1" /> Our Journey</div>
              <h2 className="section-title" style={{color: '#fff'}}>From Vision to Reality</h2>
              <div className="divider-grad"></div>
              <p style={{color: 'rgba(255,255,255,.75)', lineHeight: 1.9, marginBottom: '2rem'}}>Every milestone represents a life transformed, a family relieved, a patient who healed with dignity.</p>
              <div className="award-badge" data-aos="fade-up" data-aos-delay="0">
                <span className="material-icons-round" style={{fontSize: '2.2rem', color: '#f59e0b'}}>emoji_events</span>
                <div><h6>Best Home Care Provider 2023</h6><p>India Health Excellence Awards</p></div>
              </div>
              <div className="award-badge" data-aos="fade-up" data-aos-delay="80">
                <span className="material-icons-round" style={{fontSize: '2.2rem', color: '#2196d3'}}>military_tech</span>
                <div><h6>Best Home Care Services</h6><p>Quality Management System</p></div>
              </div>
              <div className="award-badge" data-aos="fade-up" data-aos-delay="160">
                <span className="material-icons-round" style={{fontSize: '2.2rem', color: '#4ecdc4'}}>star</span>
                <div><h6>4.9/5 Patient Satisfaction Score</h6><p>Based on 1,200+ verified reviews</p></div>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div className="timeline">
                <div className="tl-item">
                  <div className="tl-dot"></div>
                  <div className="tl-year"><Flag size={14} className="me-1" /> 2018 — Founded</div>
                  <h5 style={{color: '#fff'}}>Stoic Home Care is Born</h5>
                  <p style={{color: 'rgba(255,255,255,.65)'}}>Founded in Mumbai with a mission to bring hospital care home. Began with nursing and attendant services, serving our first 100 patients.</p>
                </div>
                <div className="tl-item">
                  <div className="tl-dot"></div>
                  <div className="tl-year"><Rocket size={14} className="me-1" /> 2019 — Expansion</div>
                  <h5 style={{color: '#fff'}}>ICU at Home Launched</h5>
                  <p style={{color: 'rgba(255,255,255,.65)'}}>Pioneered ICU setup services at home in Maharashtra. First 500 patients served with critical care at home.</p>
                </div>
                <div className="tl-item">
                  <div className="tl-dot"></div>
                  <div className="tl-year"><Shield size={14} className="me-1" /> 2020 — Covid Response</div>
                  <h5 style={{color: '#fff'}}>Covid Care at Home</h5>
                  <p style={{color: 'rgba(255,255,255,.65)'}}>Deployed rapid Covid care during the pandemic. Served 2,000+ patients safely with strict PPE protocols at home.</p>
                </div>
                <div className="tl-item">
                  <div className="tl-dot"></div>
                  <div className="tl-year"><Factory size={14} className="me-1" /> 2021 — Growth</div>
                  <h5 style={{color: '#fff'}}>Equipment Rental &amp; Manufacturing</h5>
                  <p style={{color: 'rgba(255,255,255,.65)'}}>Launched medical equipment rental division and pharma manufacturing partnerships for complete Home Care solutions.</p>
                </div>
                <div className="tl-item">
                  <div className="tl-dot"></div>
                  <div className="tl-year"><Star size={14} className="me-1" /> 2024 — Present</div>
                  <h5 style={{color: '#fff'}}>100+ Families Served</h5>
                  <p style={{color: 'rgba(255,255,255,.65)'}}>Serving 100+ families across India with 15+ services and 20+ expert professionals. Expanding our reach every day.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
