import { getServices, getEquipment } from '@/lib/supabase';
import HomeEnquiryForm from '@/components/HomeEnquiryForm';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Hospital, Stethoscope, Users, Baby, ShieldPlus, Activity, Phone, 
  CalendarCheck, Star, Zap, Award, LayoutGrid, ArrowRight, ListTodo, 
  Boxes, MessageCircle, MapPin, ClipboardList, CheckCircle, Pill, Dumbbell 
} from 'lucide-react';
import { Suspense } from 'react';

export const metadata = {
  title: 'ICU at Home & Expert Nursing Services in Greater Noida | Stoic Home Care',
  description: 'Stoic Home Care provides hospital-grade home care in Greater Noida – ICU setup, certified nursing, old age care, mother & baby care, and medical equipment rental. 24/7 Availability.',
  alternates: { canonical: '/' }
};

async function HomeDynamic() {
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
  const TickerIcons = [Hospital, Pill, Users, Baby, Stethoscope, Dumbbell, Activity, Activity, Activity];
  
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
    <div>
      {/* ══ TICKER ══ */}
      <div className="w-full bg-[#1a3a6b] text-white overflow-hidden py-3 text-sm font-semibold border-b border-[#2196d3]/30">
        <div className="flex animate-[ticker_30s_linear_infinite] whitespace-nowrap">
          {mergedTickers.map((t, i) => {
            const Icon = TickerIcons[i % TickerIcons.length];
            return (
              <span key={i} className="inline-flex items-center px-6">
                <Icon className="w-4 h-4 mr-2 text-[#4ecdc4]" /> {t}
              </span>
            );
          })}
        </div>
      </div>

      {/* ══ PREMIUM METRICS BAR ══ */}
      <section className="bg-white py-12 border-b border-black/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-aos="fade-up" data-aos-delay="0">
              <Users className="w-10 h-10 mx-auto text-[#4ecdc4] mb-3" />
              <h4 className="text-3xl font-extrabold text-[#0f2240] mb-1">10,000+</h4>
              <p className="text-[#6b82a3] font-semibold text-sm m-0">Patients Served</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <Hospital className="w-10 h-10 mx-auto text-[#4ecdc4] mb-3" />
              <h4 className="text-3xl font-extrabold text-[#0f2240] mb-1">50+</h4>
              <p className="text-[#6b82a3] font-semibold text-sm m-0">ICU Trained Staff</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <Zap className="w-10 h-10 mx-auto text-[#4ecdc4] mb-3" />
              <h4 className="text-3xl font-extrabold text-[#0f2240] mb-1">2 Hours</h4>
              <p className="text-[#6b82a3] font-semibold text-sm m-0">Fast Deployment</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <Award className="w-10 h-10 mx-auto text-[#4ecdc4] mb-3" />
              <h4 className="text-3xl font-extrabold text-[#0f2240] mb-1">ISO 9001</h4>
              <p className="text-[#6b82a3] font-semibold text-sm m-0">2015 Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES PREVIEW ══ */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div data-aos="fade-right" className="lg:max-w-2xl">
              <div className="inline-flex items-center text-sm font-bold text-[#2196d3] uppercase tracking-wider mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Stethoscope className="w-4 h-4 mr-2" /> Home Care Services
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2240] mb-4">Complete Home Care Solutions</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#1a3a6b] to-[#4ecdc4] rounded-full mb-6"></div>
              <p className="text-lg text-[#6b82a3]">Every service is designed around patient comfort, clinical excellence, and family peace of mind.</p>
            </div>
            <div data-aos="fade-left" className="text-left lg:text-right">
              <Link href="/services" className="inline-flex items-center px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#1a3a6b] to-[#2196d3] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <LayoutGrid className="w-4 h-4 mr-2" /> View All Services
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length > 0 ? (
              services.map((svc, d) => (
                <div key={svc.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group" data-aos="fade-up" data-aos-delay={(d % 3) * 100}>
                  <div className="relative h-64 overflow-hidden">
                    <Image src={svc.image ? `/uploads/services/${svc.image}` : '/images/equip.avif'} alt={svc.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-xl shadow-lg text-[#0CB8C9]">
                      <Hospital className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#2196d3] mb-3">{svc.category || 'Service'}</div>
                    <h5 className="text-xl font-bold text-[#0f2240] mb-3">{svc.title}</h5>
                    <p className="text-[#6b82a3] mb-6 line-clamp-3">{svc.description}</p>
                    <Link href="/services" className="inline-flex items-center font-bold text-[#4ecdc4] hover:text-[#2196d3] transition-colors">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              staticServices.map(([img, tag, title, desc, icon], d) => (
                <div key={title} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group" data-aos="fade-up" data-aos-delay={(d % 3) * 100}>
                  <div className="relative h-64 overflow-hidden">
                    <Image src={`/images/${img}`} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-xl shadow-lg text-[#0CB8C9]">
                      {icon === "local_hospital" ? <Hospital className="w-6 h-6"/> : icon === "medical_services" ? <Stethoscope className="w-6 h-6"/> : icon === "elderly" ? <Users className="w-6 h-6"/> : icon === "child_care" ? <Baby className="w-6 h-6"/> : icon === "health_and_safety" ? <ShieldPlus className="w-6 h-6"/> : <Activity className="w-6 h-6"/>}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#2196d3] mb-3">{tag}</div>
                    <h5 className="text-xl font-bold text-[#0f2240] mb-3">{title}</h5>
                    <p className="text-[#6b82a3] mb-6 line-clamp-3">{desc}</p>
                    <Link href="/services" className="inline-flex items-center font-bold text-[#4ecdc4] hover:text-[#2196d3] transition-colors">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="py-20 bg-[#f8fbff] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center text-sm font-bold text-[#2196d3] uppercase tracking-wider mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <ListTodo className="w-4 h-4 mr-2" /> Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2240] mb-4">How It Works</h2>
            <p className="text-lg text-[#6b82a3] max-w-2xl mx-auto">Get hospital-grade care at home in 3 simple steps</p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-[60px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#2196d3] to-transparent opacity-20"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div data-aos="fade-up" data-aos-delay="0">
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1a3a6b] to-[#2196d3] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 mb-6 relative">
                    1
                    <div className="absolute inset-0 rounded-full animate-ping bg-[#2196d3] opacity-20"></div>
                  </div>
                  <h4 className="text-xl font-bold text-[#0f2240] mb-3">Request a Callback</h4>
                  <p className="text-[#6b82a3]">Fill out our quick form or call us directly. Our care coordinator connects with you within 60 minutes.</p>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="100">
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1a3a6b] to-[#2196d3] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 mb-6 relative">
                    2
                    <div className="absolute inset-0 rounded-full animate-ping bg-[#2196d3] opacity-20" style={{animationDelay:'0.5s'}}></div>
                  </div>
                  <h4 className="text-xl font-bold text-[#0f2240] mb-3">Clinical Assessment</h4>
                  <p className="text-[#6b82a3]">Our medical experts assess your specific needs and match you with the right ICU-trained professionals.</p>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="200">
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1a3a6b] to-[#2196d3] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 mb-6 relative">
                    3
                    <div className="absolute inset-0 rounded-full animate-ping bg-[#2196d3] opacity-20" style={{animationDelay:'1s'}}></div>
                  </div>
                  <h4 className="text-xl font-bold text-[#0f2240] mb-3">Care Starts at Home</h4>
                  <p className="text-[#6b82a3]">We deliver equipment, and our verified nursing staff begins providing compassionate care at your home.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section className="py-20 bg-gradient-to-br from-[#0f2240] to-[#1a3a6b]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4" data-aos="fade-right">
              <div className="sticky top-24">
                <div className="inline-flex items-center text-sm font-bold text-[#4ecdc4] uppercase tracking-wider mb-4 bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                  <Star className="w-4 h-4 mr-2" /> Why Choose Stoic
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Dedicated to Your Health & Well-being</h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-[#2196d3] to-[#4ecdc4] rounded-full mb-8"></div>
                <p className="text-white/70 leading-relaxed mb-8">At Stoic Home Care, we go beyond medical treatment. Our holistic approach ensures emotional and physical well-being through enterprise-grade home care.</p>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 hidden md:block">
                  <Image src="/images/nurse.avif" alt="Care" width={500} height={600} sizes="(max-width: 991px) 100vw, 33vw" className="object-cover w-full h-[400px]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2240] to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {whys.map(([icon, title, text, size], d) => (
                  <div key={title} className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors ${size === 'bento-lg' ? 'sm:col-span-2' : ''}`} data-aos="fade-up" data-aos-delay={d*50}>
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2196d3] to-[#4ecdc4] flex items-center justify-center text-white shadow-lg mb-6">
                        {icon === "local_hospital" ? <Hospital className="w-6 h-6"/> : icon === "medical_services" ? <Stethoscope className="w-6 h-6"/> : icon === "elderly" ? <Users className="w-6 h-6"/> : icon === "child_care" ? <Baby className="w-6 h-6"/> : icon === "health_and_safety" ? <ShieldPlus className="w-6 h-6"/> : <Activity className="w-6 h-6"/>}
                      </div>
                      <div className="mt-auto">
                        <h5 className="text-xl font-bold text-white mb-2">{title}</h5>
                        <p className="text-white/70">{text}</p>
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
      <section className="py-12 bg-gray-50 border-t border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#4ecdc4] to-transparent opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#2196d3] to-transparent opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
              {[
                ['5000+','Patients Served'],
                ['15+','Services Offered'],
                ['50+','Expert Staff'],
                ['5+','Years Excellence']
              ].map(([num,lbl], d) => (
                <div key={lbl} data-aos="zoom-in" data-aos-delay={d*100}>
                  <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1a3a6b] to-[#2196d3] mb-2">{num}</div>
                  <div className="text-[#6b82a3] font-bold text-sm uppercase tracking-wider">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ EQUIPMENT PREVIEW ══ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div data-aos="fade-right" className="lg:max-w-2xl">
              <div className="inline-flex items-center text-sm font-bold text-[#2196d3] uppercase tracking-wider mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Activity className="w-4 h-4 mr-2" /> Equipment on Rent
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2240] mb-4">Medical Equipment Delivered to You</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#1a3a6b] to-[#4ecdc4] rounded-full mb-6"></div>
              <p className="text-lg text-[#6b82a3]">Hospital-grade devices on flexible rental plans. Doorstep delivery, installation and maintenance included.</p>
            </div>
            <div data-aos="fade-left" className="text-left lg:text-right">
              <Link href="/equipment" className="inline-flex items-center px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#1a3a6b] to-[#2196d3] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <Boxes className="w-4 h-4 mr-2" /> All Equipment
              </Link>
            </div>
          </div>
          <div className="swiper equip-home-swiper !pb-12">
            <div className="swiper-wrapper">
              {equipment.length > 0 ? (
                equipment.map(eq => (
                  <div key={eq.id} className="swiper-slide h-auto">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col group">
                      <div className="relative h-56 overflow-hidden">
                        <Image src={eq.image ? `/uploads/equipment/${eq.image}` : '/images/equip.avif'} alt={eq.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h5 className="text-xl font-bold text-[#0f2240] mb-3">{eq.title}</h5>
                        <p className="text-[#6b82a3] mb-6 flex-grow">{eq.description}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <span className="font-bold text-[#2196d3]">{eq.price || 'Call for pricing'}</span>
                          <Link href="/contact" className="inline-flex items-center px-4 py-2 bg-[#1a3a6b] text-white text-sm font-bold rounded-lg hover:bg-[#0CB8C9] transition-colors">Rent Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                staticEq.map(([img, title, desc, price, badge]) => (
                  <div key={title} className="swiper-slide h-auto">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col group relative">
                      <div className="relative h-56 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                        <Image src={`/images/${img}`} alt={title} width={300} height={200} className="object-contain group-hover:scale-105 transition-transform duration-500 max-h-full" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                        <span className="absolute top-4 right-4 bg-[#4ecdc4] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">{badge}</span>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h5 className="text-xl font-bold text-[#0f2240] mb-3">{title}</h5>
                        <p className="text-[#6b82a3] mb-6 flex-grow">{desc}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <span className="font-bold text-[#2196d3]">{price}</span>
                          <Link href="/contact" className="inline-flex items-center px-4 py-2 bg-[#1a3a6b] text-white text-sm font-bold rounded-lg hover:bg-[#0CB8C9] transition-colors">Rent Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-20 bg-[#f4f8ff] relative overflow-hidden">
        <div className="absolute -top-[100px] -left-[100px] w-[400px] h-[400px] bg-[#4ecdc4]/15 blur-[80px] rounded-full z-0 pointer-events-none"></div>
        <div className="absolute -bottom-[100px] -right-[100px] w-[500px] h-[500px] bg-[#2196d3]/10 blur-[100px] rounded-full z-0 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-flex items-center text-sm font-bold text-[#2196d3] uppercase tracking-wider mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <MessageCircle className="w-4 h-4 mr-2" /> Patient Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2240] mb-4">What Families Say About Us</h2>
          </div>
          <div className="swiper testi-swiper !pb-12">
            <div className="swiper-wrapper">
              {testis.map(([av, name, role, text]) => (
                <div key={name} className="swiper-slide h-auto p-4">
                  <div className="bg-white rounded-2xl p-8 shadow-xl shadow-blue-900/5 h-full flex flex-col relative border border-gray-100">
                    <div className="absolute -top-4 -left-2 text-[8rem] text-blue-50 font-serif leading-none z-0">"</div>
                    <div className="flex text-[#F5B041] mb-4 relative z-10">
                      <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                    </div>
                    <p className="text-[#354a6b] italic mb-8 relative z-10 flex-grow text-lg">"{text}"</p>
                    <div className="flex items-center pt-6 border-t border-gray-100 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a3a6b] to-[#2196d3] text-white flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0 shadow-md">{av}</div>
                      <div>
                        <div className="font-extrabold text-[#0f2240] text-lg">{name}</div>
                        <div className="text-[#6b82a3] text-sm flex items-center"><MapPin className="w-3 h-3 mr-1" /> {role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>

      {/* ══ ENQUIRY FORM ══ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#2196d3] to-[#4ecdc4] rounded-3xl p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden" data-aos="zoom-in">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">Ready for Hospital-Grade Care at Home?</h2>
                <p className="text-white/90 text-lg">Our team is available 24/7. Call for emergencies or fill the form for scheduled services.</p>
              </div>
              <div className="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
                <a href="tel:+917668232867" className="inline-flex items-center px-8 py-3 bg-white text-[#1a3a6b] rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  <Phone className="w-5 h-5 mr-2" /> Call Now
                </a>
                <a href="https://wa.me/917668232867" target="_blank" rel="noreferrer" className="inline-flex items-center px-8 py-3 bg-[#25D366] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5" data-aos="fade-right">
              <div className="inline-flex items-center text-sm font-bold text-[#2196d3] uppercase tracking-wider mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <ClipboardList className="w-4 h-4 mr-2" /> Quick Enquiry
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2240] mb-4">Request a Callback</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#1a3a6b] to-[#4ecdc4] rounded-full mb-6"></div>
              <p className="text-lg text-[#6b82a3] mb-8">Fill out the form and our care coordinator will call you within 1 hour.</p>
              
              <div className="space-y-6">
                <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 text-[#2196d3] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0f2240] text-lg mb-1">Emergency Contact</div>
                    <div className="text-[#354a6b] font-semibold text-lg">+91 76682 32867</div>
                    <div className="text-[#6b82a3] text-sm mt-1">Available 24/7 – 365 days</div>
                  </div>
                </div>
                
                <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-green-50 text-[#25D366] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0f2240] text-lg mb-1">WhatsApp</div>
                    <a href="https://wa.me/917668232867" target="_blank" rel="noreferrer" className="text-[#2196d3] font-semibold hover:underline flex items-center">
                      Chat with us directly <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7" data-aos="fade-left">
              {/* Home Enquiry Form Component */}
              <HomeEnquiryForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}


export default function HomePage() {
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
      <div className="relative overflow-hidden bg-[#0f2240] flex items-center pt-[140px] pb-[80px] lg:pt-[180px] lg:pb-[100px] min-h-[auto] lg:min-h-0">
        <Image className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" src="/images/carousel-1.avif" alt="ICU Home Care" width={1920} height={1080} sizes="(max-width: 768px) 100vw, 1920px" priority fetchPriority="high" />
        <div className="absolute inset-0 z-10" style={{background:'linear-gradient(135deg, rgba(15,34,64,0.95) 0%, rgba(33,150,211,0.8) 100%)'}}></div>
        
        <div className="container relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Typography & CTAs */}
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full text-[0.85rem] font-semibold mb-6 border" style={{background:'rgba(78,205,196,.15)', color:'#7ee8e2', borderColor:'rgba(78,205,196,.3)'}}>
                <ShieldPlus className="w-4 h-4 mr-2" /> Trusted by 10,000+ Families
              </div>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-white leading-[1.1] mb-6 font-outfit">
                Hospital-Quality Care<br/><span style={{color:'#4ecdc4'}}>Right at Home.</span>
              </h1>
              <p className="text-[1.1rem] text-white/85 leading-[1.7] mb-10 max-w-[540px]">
                Expert ICU setups, certified nursing staff, and advanced medical equipment delivered to your doorstep. We bring the hospital to you, 24/7.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+917668232867" className="inline-flex items-center px-8 py-3 rounded-full font-bold text-white shadow-lg transition-transform hover:-translate-y-1" style={{background:'#ff4b4b', boxShadow:'0 8px 25px rgba(255,75,75,0.4)'}}>
                  <Phone className="w-5 h-5 mr-2" /> Call Emergency
                </a>
                <Link href="/contact" className="inline-flex items-center px-8 py-3 rounded-full font-bold text-[#0f2240] bg-white shadow-lg transition-transform hover:-translate-y-1" style={{boxShadow:'0 8px 25px rgba(0,0,0,0.1)'}}>
                  <CalendarCheck className="w-5 h-5 mr-2" /> Book Consultation
                </Link>
              </div>
            </div>

            {/* Right: Premium Image & Glassmorphism Badges */}
            <div className="relative text-center lg:text-right flex justify-center lg:justify-end">
              <div className="relative inline-block">
                <Image src="/images/doctor.avif" alt="Home Doctor" width={500} height={600} sizes="(max-width: 991px) 100vw, 500px" priority className="w-full max-w-[500px] h-auto rounded-[30px] shadow-2xl relative z-10" style={{boxShadow:'0 30px 60px rgba(0,0,0,0.5)'}} />
                
                <div className="hidden xl:flex absolute bottom-[30px] left-[-80px] bg-white/95 px-4 py-3 rounded-xl items-center gap-3 shadow-xl z-20 animate-float">
                  <div className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-green-500/15">
                    <Star className="w-4 h-4 text-[#F5B041] fill-[#F5B041]" />
                  </div>
                  <div className="text-left">
                    <div className="font-extrabold text-[1rem] text-[#0f2240] leading-[1.2]">4.9/5 Rating</div>
                    <div className="text-[0.75rem] text-[#6b82a3] font-semibold">Google Reviews</div>
                  </div>
                </div>

                <div className="hidden xl:flex absolute top-[30px] right-[-60px] bg-white/95 px-4 py-3 rounded-xl items-center gap-3 shadow-xl z-20 animate-float-reverse">
                  <div className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-blue-500/15">
                    <Users className="w-4 h-4 text-[#2196d3]" />
                  </div>
                  <div className="text-left">
                    <div className="font-extrabold text-[1rem] text-[#0f2240] leading-[1.2]">Verified Staff</div>
                    <div className="text-[0.75rem] text-[#6b82a3] font-semibold">100% Checked</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Suspense fallback={<div style={{minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><div className="spinner-border text-primary" role="status"></div></div>}>
        <HomeDynamic />
      </Suspense>
    </main>
  );
}
