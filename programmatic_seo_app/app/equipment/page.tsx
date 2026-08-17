import Link from 'next/link';
import { getEquipment } from '@/lib/supabase';
export const metadata = {
  title: 'Medical Equipment on Rent | Stoic Home Care',
  description: 'Rent hospital-grade medical equipment: oxygen concentrators, hospital beds, wheelchairs, BiPAP, patient monitors and more. Doorstep delivery in Mumbai.',
  alternates: { canonical: '/equipment' }
};

export default async function EquipmentPage() {
  let equipment: any[] = [];
  try {
    const rows = await getEquipment();
    equipment = rows || [];
  } catch (err) {
    console.warn("Supabase fetch failed for EquipmentPage.", err);
  }


  const staticEq = [
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

  const customSchema = equipment.length > 0 ? equipment.map(eq => ({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": eq.title,
    "image": eq.image ? `/uploads/equipment/${eq.image}` : '/equip.avif',
    "description": eq.description || '',
    "brand": {
      "@type": "Brand",
      "name": "Stoic Home Care"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": eq.price ? eq.price.replace(/[^0-9]/g, '') || '500' : '500',
      "highPrice": "25000",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Stoic Home Care"
      }
    }
  })) : [];

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
          .hero-stats { display: none !important; }
        }
      `}} />

      {/* ══ HERO STATIC ══ */}
      <header className="short-hero position-relative" aria-label="Equipment Page Hero">
        <img className="hero-bg" src="/images/equip.avif" alt="Medical Equipment" loading="eager" width="1920" height="1080" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }} />
        <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, rgba(15,34,64,0.95) 0%, rgba(15,34,64,0.7) 100%)', zIndex: -1 }}></div>
        <div className="container hero-content position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center" style={{ minHeight: '60vh', paddingTop: '10px', paddingBottom: '3rem' }}>
            <div className="col-lg-7 text-white mt-5">
              <div className="hero-badge" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '50px', marginBottom: '1rem', fontSize: '0.9rem' }}><i className="fa-solid fa-truck-medical me-2"></i>Premium Equipment Rental</div>
              <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem' }}>Medical Equipment<br/><span style={{ color: '#0CB8C9' }}>Delivered to Your Door</span></h1>
              <p className="hero-sub" style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px' }}>Hospital-grade oxygen concentrators, beds, wheelchairs, monitors and more — on flexible rental plans with same-day delivery and professional installation.</p>
              <div className="hero-btns d-flex gap-3 flex-wrap mb-4">
                <a href="#equipment-catalog" className="btn-primary-grad px-4 py-3" style={{ background: 'linear-gradient(135deg, #0CB8C9, #1D9E75)', borderRadius: '50px', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
                  <i className="fa-solid fa-boxes-stacked me-2"></i>Browse Catalog
                </a>
                <Link href="/contact" className="btn-outline-white px-4 py-3" style={{ border: '2px solid rgba(255,255,255,0.5)', borderRadius: '50px', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
                  <i className="fa-solid fa-file-invoice-dollar me-2"></i>Get a Quote
                </Link>
              </div>
              <div className="hero-stats d-flex gap-4">
                <div className="hero-stat"><div className="num" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0CB8C9' }}>12+</div><div className="lbl" style={{ fontSize: '0.85rem', opacity: 0.8 }}>Equipment Types</div></div>
                <div className="hero-stat"><div className="num" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0CB8C9' }}>Same Day</div><div className="lbl" style={{ fontSize: '0.85rem', opacity: 0.8 }}>Delivery</div></div>
                <div className="hero-stat"><div className="num" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0CB8C9' }}>₹500+</div><div className="lbl" style={{ fontSize: '0.85rem', opacity: 0.8 }}>Starting Price</div></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══ PROCESS STRIP ══ */}
      <section className="section-pad" style={{ background: 'var(--light)', padding: '3rem 0' }}>
        <div className="container">
          <div className="process-strip" data-aos="zoom-in" style={{ background: 'linear-gradient(135deg, #0f2240, #1a3a6b)', borderRadius: '24px', padding: '3rem 2rem', color: '#fff', boxShadow: '0 20px 40px rgba(15,34,64,0.15)' }}>
            <div className="row g-4 text-center">
              <div className="col-6 col-md-3">
                <div className="pstrip-item">
                  <span className="material-icons-round" style={{ fontSize: '2.8rem', color: 'rgba(255,255,255,.9)', marginBottom: '.75rem', display: 'block' }}>shopping_cart</span>
                  <h5 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Select Equipment</h5>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>Browse our catalog and choose what you need</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="pstrip-item">
                  <span className="material-icons-round" style={{ fontSize: '2.8rem', color: 'rgba(255,255,255,.9)', marginBottom: '.75rem', display: 'block' }}>assignment</span>
                  <h5 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Submit Request</h5>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>Fill the form with your needs and rental duration</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="pstrip-item">
                  <span className="material-icons-round" style={{ fontSize: '2.8rem', color: 'rgba(255,255,255,.9)', marginBottom: '.75rem', display: 'block' }}>local_shipping</span>
                  <h5 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Same-Day Delivery</h5>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>We deliver, install and demonstrate use at home</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="pstrip-item">
                  <span className="material-icons-round" style={{ fontSize: '2.8rem', color: 'rgba(255,255,255,.9)', marginBottom: '.75rem', display: 'block' }}>assignment_return</span>
                  <h5 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Easy Return</h5>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>Hassle-free pickup when your rental period ends</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CATALOG ══ */}
      <section className="section-pad" id="equipment-catalog">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-badge"><i className="fa-solid fa-boxes-stacked me-1"></i> Equipment Catalog</div>
            <h2 className="section-title">All Equipment Available on Rent</h2>
            <p className="section-sub mx-auto">Every device is sanitized, tested and calibrated before delivery. Our technicians set up and train you on proper use.</p>
          </div>
          <div className="row g-4">
            {equipment.length > 0 ? (
              equipment.map((eq: any, d: number) => (
                <article key={eq.id} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={(d % 3) * 100}>
                  <div className="equip-card h-100" style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                    <div className="ec-img">
                      <img src={eq.image ? `/uploads/equipment/${eq.image}` : '/images/equip.avif'} alt={eq.title} loading="lazy" width="400" height="220" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                    </div>
                    <div className="ec-body p-4 flex-grow-1 d-flex flex-column">
                      <h5 className="fw-bold" style={{ color: '#0f2240', marginBottom: '0.5rem' }}>{eq.title}</h5>
                      <p className="text-muted" style={{ fontSize: '.9rem', flexGrow: 1 }}>{eq.description || ''}</p>
                      <div className="ec-footer d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                        <span className="ec-price fw-bold" style={{ color: '#1a3a6b', fontSize: '1.1rem' }}>{eq.price || 'Call for pricing'}</span>
                        <Link href={`/contact?equipment=${encodeURIComponent(eq.title)}`} className="btn btn-primary" style={{ borderRadius: '8px', padding: '0.5rem 1.2rem', fontWeight: 600 }}>
                          Rent Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              staticEq.map(([img, title, desc, price, badge]: any, d: number) => (
                <article key={title} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={(d % 3) * 100}>
                  <div className="equip-card h-100" style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                    <div className="ec-img position-relative">
                      <img src={`/images/${img}`} alt={title} loading="lazy" width="400" height="220" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                      <span className="ec-badge" style={{ position: 'absolute', top: '15px', right: '15px', background: '#f59e0b', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700 }}>{badge}</span>
                    </div>
                    <div className="ec-body p-4 flex-grow-1 d-flex flex-column">
                      <h5 className="fw-bold" style={{ color: '#0f2240', marginBottom: '0.5rem' }}>{title}</h5>
                      <p className="text-muted" style={{ fontSize: '.9rem', flexGrow: 1 }}>{desc}</p>
                      <div className="ec-footer d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                        <span className="ec-price fw-bold" style={{ color: '#1a3a6b', fontSize: '1.1rem' }}>{price}</span>
                        <Link href={`/contact?equipment=${encodeURIComponent(title)}`} className="btn btn-primary" style={{ borderRadius: '8px', padding: '0.5rem 1.2rem', fontWeight: 600 }}>
                          Rent Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {equipment.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
        />
      )}
    </main>
  );
}
