import Link from 'next/link';
import { getEquipment } from '@/lib/supabase';
import { Ambulance, Package, Receipt, ShoppingCart, ClipboardEdit, Truck, Undo2 } from 'lucide-react';

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
    ['blog-1.jpg', 'Oxygen Concentrator', '5L & 10L medical-grade oxygen concentrators. Includes setup, installation and maintenance by trained technician.', 'From ₹3,000/mo', 'High Demand'],
    ['clinic_01.jpg', 'Hospital Bed', 'Manual & electric semi-fowler beds for patient comfort and easy nursing access.', 'From ₹2,500/mo', 'Essential'],
    ['clinic_03.jpg', 'BiPAP / CPAP Machine', 'Advanced respiratory support for COPD, sleep apnea and breathing difficulties.', 'Call for pricing', 'Advanced'],
    ['clinic_02.jpg', 'Patient Monitor', 'Multi-parameter monitor: ECG, SpO2, NIBP, temperature — comprehensive vital monitoring.', 'From ₹5,000/mo', 'Professional'],
    ['equip.avif', 'Wheelchair', 'Standard & reclining wheelchairs for safe home and outdoor mobility.', 'From ₹800/mo', 'Mobility'],
    ['ab-3.avif', 'Suction Machine', 'Portable suction units for airway secretion management.', 'From ₹1,500/mo', 'Clinical'],
    ['ab-1.avif', 'Nebulizer', 'Compressor & mesh nebulizers for asthma, COPD and respiratory medication delivery.', 'From ₹500/mo', 'Respiratory'],
    ['ab-2.avif', 'Infusion Pump', 'Precision drug delivery with programmable infusion pumps.', 'Call for pricing', 'Advanced'],
    ['dr.avif', 'Recliner / Commode Chair', 'Multi-function recliner and commode chairs for patient comfort.', 'From ₹1,200/mo', 'Comfort'],
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
      {/* ══ HERO STATIC ══ */}
      <header className="relative w-full overflow-hidden" aria-label="Equipment Page Hero">
        <img 
          className="absolute inset-0 w-full h-full object-cover z-[-2]" 
          src="/images/equip.avif" 
          alt="Medical Equipment" 
          loading="eager" 
          width="1920" 
          height="1080" 
        />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[rgba(15,34,64,0.95)] to-[rgba(15,34,64,0.7)] z-[-1]"></div>
        
        <div className="container mx-auto px-4 relative z-10 min-h-[72vh] lg:min-h-[60vh] pt-4 pb-12 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full mt-12 lg:mt-0">
            <div className="lg:col-span-7 text-white">
              <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full mb-4 text-[0.9rem]">
                <Ambulance className="w-4 h-4 mr-2" />
                Premium Equipment Rental
              </div>
              <h1 className="text-4xl lg:text-5xl lg:text-[3.5rem] font-extrabold mb-4 leading-tight">
                Medical Equipment<br/>
                <span className="text-[var(--accent)]">Delivered to Your Door</span>
              </h1>
              <p className="text-lg lg:text-[1.1rem] opacity-90 mb-8 max-w-[600px]">
                Hospital-grade oxygen concentrators, beds, wheelchairs, monitors and more — on flexible rental plans with same-day delivery and professional installation.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <a href="#equipment-catalog" className="inline-flex items-center px-6 py-3 bg-gradient-to-br from-[var(--accent)] to-[#1D9E75] rounded-full text-white font-semibold no-underline hover:opacity-90 transition-opacity">
                  <Package className="w-5 h-5 mr-2" />
                  Browse Catalog
                </a>
                <Link href="/contact" className="inline-flex items-center px-6 py-3 border-2 border-white/50 rounded-full text-white font-semibold no-underline hover:bg-white/10 transition-colors">
                  <Receipt className="w-5 h-5 mr-2" />
                  Get a Quote
                </Link>
              </div>
              <div className="hidden lg:flex gap-8">
                <div>
                  <div className="text-2xl font-extrabold text-[var(--accent)]">12+</div>
                  <div className="text-sm opacity-80">Equipment Types</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[var(--accent)]">Same Day</div>
                  <div className="text-sm opacity-80">Delivery</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[var(--accent)]">₹500+</div>
                  <div className="text-sm opacity-80">Starting Price</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══ PROCESS STRIP ══ */}
      <section className="bg-[var(--light)] py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-[var(--dark)] to-[var(--primary)] rounded-3xl p-8 lg:p-12 text-white shadow-xl" data-aos="zoom-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
              <div className="flex flex-col items-center">
                <ShoppingCart className="w-11 h-11 text-white/90 mb-3" />
                <h5 className="font-bold text-[1.1rem] mb-1">Select Equipment</h5>
                <p className="text-sm opacity-80 m-0">Browse our catalog and choose what you need</p>
              </div>
              <div className="flex flex-col items-center">
                <ClipboardEdit className="w-11 h-11 text-white/90 mb-3" />
                <h5 className="font-bold text-[1.1rem] mb-1">Submit Request</h5>
                <p className="text-sm opacity-80 m-0">Fill the form with your needs and rental duration</p>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-11 h-11 text-white/90 mb-3" />
                <h5 className="font-bold text-[1.1rem] mb-1">Same-Day Delivery</h5>
                <p className="text-sm opacity-80 m-0">We deliver, install and demonstrate use at home</p>
              </div>
              <div className="flex flex-col items-center">
                <Undo2 className="w-11 h-11 text-white/90 mb-3" />
                <h5 className="font-bold text-[1.1rem] mb-1">Easy Return</h5>
                <p className="text-sm opacity-80 m-0">Hassle-free pickup when your rental period ends</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CATALOG ══ */}
      <section className="py-16 lg:py-20" id="equipment-catalog">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-flex items-center font-semibold text-[var(--primary)] bg-[var(--light)] px-4 py-2 rounded-full mb-4">
              <Package className="w-4 h-4 mr-2" /> 
              Equipment Catalog
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--dark)] mb-4">All Equipment Available on Rent</h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Every device is sanitized, tested and calibrated before delivery. Our technicians set up and train you on proper use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.length > 0 ? (
              equipment.map((eq: any, d: number) => (
                <article key={eq.id} className="h-full" data-aos="fade-up" data-aos-delay={(d % 3) * 100}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                    <div className="w-full h-[220px] relative">
                      <img 
                        src={eq.image ? `/uploads/equipment/${eq.image}` : '/images/equip.avif'} 
                        alt={eq.title} 
                        loading="lazy" 
                        width="400" 
                        height="220" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h5 className="font-bold text-[var(--dark)] mb-2 text-lg">{eq.title}</h5>
                      <p className="text-[var(--muted)] text-sm flex-grow">{eq.description || ''}</p>
                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                        <span className="font-bold text-[var(--primary)] text-[1.1rem]">{eq.price || 'Call for pricing'}</span>
                        <Link 
                          href={`/contact?equipment=${encodeURIComponent(eq.title)}`} 
                          className="bg-[var(--primary)] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[var(--dark)] transition-colors"
                        >
                          Rent Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              staticEq.map(([img, title, desc, price, badge]: any, d: number) => (
                <article key={title} className="h-full" data-aos="fade-up" data-aos-delay={(d % 3) * 100}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                    <div className="w-full h-[220px] relative">
                      <img 
                        src={`/images/${img}`} 
                        alt={title} 
                        loading="lazy" 
                        width="400" 
                        height="220" 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                        {badge}
                      </span>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h5 className="font-bold text-[var(--dark)] mb-2 text-lg">{title}</h5>
                      <p className="text-[var(--muted)] text-sm flex-grow">{desc}</p>
                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                        <span className="font-bold text-[var(--primary)] text-[1.1rem]">{price}</span>
                        <Link 
                          href={`/contact?equipment=${encodeURIComponent(title)}`} 
                          className="bg-[var(--primary)] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[var(--dark)] transition-colors"
                        >
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
