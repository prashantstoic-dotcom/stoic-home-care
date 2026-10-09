import { getServices, getEquipment } from '@/lib/supabase';
import HomeEnquiryForm from '@/components/HomeEnquiryForm';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Hospital, Stethoscope, Users, Baby, ShieldPlus, Activity, Phone, 
  CalendarCheck, Star, Zap, Award, LayoutGrid, ArrowRight, ListTodo, 
  Boxes, MessageCircle, MapPin, ClipboardList, CheckCircle, Pill, Dumbbell,
  ShieldCheck, Check, Sun, Clock, HeartHandshake
} from 'lucide-react';
import { Suspense } from 'react';

export const metadata = {
  title: 'Patient Attendant & Home Nurse in Noida & Greater Noida | Stoic Home Care',
  description: 'Verified male & female patient attendants, elderly caretakers and trained home nurses for 12-hour & 24-hour duty in Noida & Greater Noida. Police-verified staff, same-day placement. घर पर मरीजों और बुजुर्गों की भरोसेमंद देखभाल।',
  alternates: { canonical: '/' }
};

const WA_NUMBER = '917668232867';
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const revalidate = 3600;

async function HomeDynamic() {
  let services: any[] = [];
  let equipment: any[] = [];
  try {
    const [servicesRows, equipmentRows] = await Promise.all([
      getServices(),
      getEquipment()
    ]);
    services = servicesRows || [];
    equipment = equipmentRows || [];
  } catch (err) {
    console.warn("Supabase fetch failed, rendering with static components.", err);
  }

  const tickers = ['12-Hour Patient Attendant','24-Hour Patient Attendant','Home Nurse','Elderly Caretaker','Mother & Baby Care','Physiotherapy at Home','Doctor Visit at Home','Oxygen Concentrators','Hospital Beds','Wheelchairs'];
  const TickerIcons = [Users, Users, Pill, Users, Baby, Dumbbell, Stethoscope, Activity, Activity, Activity];
  
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
    ['verified','Verified, Trained Staff','Police-verified attendants and nurses, matched to your patient\'s needs.','bento-lg'],
    ['biotech','Equipment When You Need It','Oxygen concentrators, hospital beds and wheelchairs on rent, cleaned before every delivery.','bento-sm'],
    ['schedule','Same-Day Placement','Tell us what you need in the morning, we try to send staff the same day.','bento-sm'],
    ['payments','Affordable & Clear Rates','You know the rate before duty starts. No hidden charges.','bento-md'],
    ['home_health','Comfort of Your Own Home','Your family member recovers among their own people, in their own bed.','bento-md'],
    ['health_and_safety','Clean & Careful','Hygiene, masks and gloves, and care in every task.','bento-lg'],
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
            <div  >
              <Users className="w-10 h-10 mx-auto text-[#4ecdc4] mb-3" />
              <h4 className="text-3xl font-extrabold text-[#0f2240] mb-1">10,000+</h4>
              <p className="text-[#6b82a3] font-semibold text-sm m-0">Patients Served</p>
            </div>
            <div  >
              <Hospital className="w-10 h-10 mx-auto text-[#4ecdc4] mb-3" />
              <h4 className="text-3xl font-extrabold text-[#0f2240] mb-1">50+</h4>
              <p className="text-[#6b82a3] font-semibold text-sm m-0">Trained Staff</p>
            </div>
            <div  >
              <Zap className="w-10 h-10 mx-auto text-[#4ecdc4] mb-3" />
              <h4 className="text-3xl font-extrabold text-[#0f2240] mb-1">2 Hours</h4>
              <p className="text-[#6b82a3] font-semibold text-sm m-0">Fast Deployment</p>
            </div>
            <div  >
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
            <div  className="lg:max-w-2xl">
              <div className="inline-flex items-center text-sm font-bold text-[#2196d3] uppercase tracking-wider mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Stethoscope className="w-4 h-4 mr-2" /> Home Care Services
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2240] mb-4">Complete Home Care Solutions</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#1a3a6b] to-[#4ecdc4] rounded-full mb-6"></div>
              <p className="text-lg text-[#6b82a3]">Every service is built around the patient's comfort and your family's peace of mind.</p>
            </div>
            <div  className="text-left lg:text-right">
              <Link href="/services" className="inline-flex items-center px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#1a3a6b] to-[#2196d3] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <LayoutGrid className="w-4 h-4 mr-2" /> View All Services
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, d) => (
              <div key={svc.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group" data-aos="fade-up" data-aos-delay={(d % 3) * 100}>
                <div className="relative h-64 overflow-hidden">
                  <Image src={svc.image ? (svc.image.startsWith('/') ? svc.image : `/uploads/services/${svc.image}`) : '/images/equip.avif'} alt={svc.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                  <div className="absolute bottom-4 right-4 bg-white p-3 rounded-xl shadow-lg text-[#0CB8C9]">
                    <Hospital className="w-6 h-6" />
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#2196d3] mb-3">{svc.category || 'Service'}</div>
                  <h5 className="text-xl font-bold text-[#0f2240] mb-3">{svc.title}</h5>
                  <p className="text-[#6b82a3] mb-6 line-clamp-3">{svc.description}</p>
                  <Link href={`/services/${svc.title.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '')}`} className="inline-flex items-center font-bold text-[#4ecdc4] hover:text-[#2196d3] transition-colors">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="py-20 bg-[#f8fbff] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" >
            <div className="inline-flex items-center text-sm font-bold text-[#2196d3] uppercase tracking-wider mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <ListTodo className="w-4 h-4 mr-2" /> Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2240] mb-4">How It Works</h2>
            <p className="text-lg text-[#6b82a3] max-w-2xl mx-auto">Getting a trusted caretaker at home is easy — 3 simple steps</p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-[60px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#2196d3] to-transparent opacity-20"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div  >
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1a3a6b] to-[#2196d3] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 mb-6">
                    1
                  </div>
                  <h4 className="text-xl font-bold text-[#0f2240] mb-3">Tell Us Your Need</h4>
                  <p className="text-[#6b82a3]">Call or WhatsApp us, or fill the quick form. We get back to you within 60 minutes.</p>
                </div>
              </div>
              <div  >
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1a3a6b] to-[#2196d3] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 mb-6">
                    2
                  </div>
                  <h4 className="text-xl font-bold text-[#0f2240] mb-3">We Suggest the Right Staff</h4>
                  <p className="text-[#6b82a3]">We ask about the patient's condition and duty hours, then match a suitable attendant or nurse.</p>
                </div>
              </div>
              <div  >
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1a3a6b] to-[#2196d3] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 mb-6">
                    3
                  </div>
                  <h4 className="text-xl font-bold text-[#0f2240] mb-3">Care Starts at Your Home</h4>
                  <p className="text-[#6b82a3]">Our verified staff reaches your home, and equipment is delivered if needed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section id="why-us" className="scroll-mt-20 py-20 bg-gradient-to-br from-[#0f2240] to-[#1a3a6b]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4" >
              <div className="sticky top-24">
                <div className="inline-flex items-center text-sm font-bold text-[#4ecdc4] uppercase tracking-wider mb-4 bg-white/10 px-3 py-1 rounded-full border border-white/20 md:backdrop-blur-sm">
                  <Star className="w-4 h-4 mr-2" /> Why Choose Stoic
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Care You Can Trust, Right at Home</h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-[#2196d3] to-[#4ecdc4] rounded-full mb-8"></div>
                <p className="text-white/70 leading-relaxed mb-8">At Stoic Home Care we send caring, verified people to look after your parents and patients — with the same respect we would want for our own family.</p>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 hidden md:block">
                  <Image src="/images/nurse.avif" alt="Care" width={500} height={600} sizes="(max-width: 991px) 100vw, 33vw" className="object-cover w-full h-[400px]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2240] to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {whys.map(([icon, title, text, size], d) => (
                  <div key={title} className={`bg-white/5 md:backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors ${size === 'bento-lg' ? 'sm:col-span-2' : ''}`} data-aos="fade-up" data-aos-delay={d*50}>
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2196d3] to-[#4ecdc4] flex items-center justify-center text-white shadow-lg mb-6">
                        {icon === "verified" ? <ShieldPlus className="w-6 h-6"/> : icon === "biotech" ? <Boxes className="w-6 h-6"/> : icon === "schedule" ? <CalendarCheck className="w-6 h-6"/> : icon === "payments" ? <Award className="w-6 h-6"/> : icon === "home_health" ? <Hospital className="w-6 h-6"/> : icon === "health_and_safety" ? <Activity className="w-6 h-6"/> : <Star className="w-6 h-6"/>}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
              {[
                ['5000+','Patients Served'],
                ['15+','Services Offered'],
                ['50+','Expert Staff'],
                ['5+','Years Excellence']
              ].map(([num,lbl], d) => (
                <div key={lbl} data-aos="fade-up" data-aos-delay={d*100}>
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
            <div  className="lg:max-w-2xl">
              <div className="inline-flex items-center text-sm font-bold text-[#2196d3] uppercase tracking-wider mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Activity className="w-4 h-4 mr-2" /> Equipment on Rent
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2240] mb-4">Medical Equipment Delivered to You</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#1a3a6b] to-[#4ecdc4] rounded-full mb-6"></div>
              <p className="text-lg text-[#6b82a3]">Hospital-grade devices on flexible rental plans. Doorstep delivery, installation and maintenance included.</p>
            </div>
            <div  className="text-left lg:text-right">
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
          <div className="text-center mb-12" >
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
          <div className="bg-gradient-to-r from-[#2196d3] to-[#4ecdc4] rounded-3xl p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden" >
            <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">Need a Caretaker for Your Family at Home?</h2>
                <p className="text-white/90 text-lg">Call or WhatsApp us — tell us what you need and we will guide you.</p>
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
            <div className="lg:col-span-5" >
              <div className="inline-flex items-center text-sm font-bold text-[#2196d3] uppercase tracking-wider mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <ClipboardList className="w-4 h-4 mr-2" /> Talk to Us
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2240] mb-4">We Will Call You Back</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#1a3a6b] to-[#4ecdc4] rounded-full mb-6"></div>
              <p className="text-lg text-[#6b82a3] mb-8">Fill out the form and our care coordinator will call you within 1 hour.</p>
              
              <div className="space-y-6">
                <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 text-[#2196d3] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0f2240] text-lg mb-1">Call Us</div>
                    <div className="text-[#354a6b] font-semibold text-lg">+91 76682 32867</div>
                    <div className="text-[#6b82a3] text-sm mt-1">Phone and WhatsApp, 7 days a week</div>
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
            <div className="lg:col-span-7" >
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
        "description": "Patient attendants, elderly caretakers and trained home nurses for 12-hour and 24-hour duty in Noida & Greater Noida.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ══ MAIN HERO — warm, family-first, two actions only ══ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fff4e6] via-[#fffaf3] to-white pt-[96px] pb-10 sm:pt-[110px] lg:pt-[135px] lg:pb-16">
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Copy + the two buttons */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold text-[#1a3a6b] border border-[#1a3a6b]/15 shadow-sm mb-4">
                <ShieldCheck className="w-4 h-4 text-[#25a85a]" /> Police-verified staff · Same-day placement
              </p>

              <h1 className="font-outfit text-[clamp(1.85rem,4.6vw,3.2rem)] font-extrabold leading-[1.15] text-[#0f2240] mb-3">
                Reliable Patient Attendants &amp; Home Nursing Care in <span className="text-[#0CB8C9]">Noida &amp; Greater Noida</span>
              </h1>

              <p className="text-[1.15rem] sm:text-[1.3rem] font-semibold text-[#c2410c] mb-4" lang="hi">
                घर पर बुजुर्गों और मरीजों की भरोसेमंद देखभाल
              </p>

              <p className="text-[1.02rem] sm:text-[1.1rem] leading-[1.65] text-[#354a6b] mb-7 max-w-[560px]">
                Verified male &amp; female attendants, elderly caretakers, and trained nurses available for 12-hour &amp; 24-hour home duty. Same-day staff placement.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-[560px]">
                <a
                  href={waLink("Hello Stoic Home Care, I need a patient attendant / nurse at home in Noida / Greater Noida. Please share staff details and rates.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex flex-col items-center justify-center rounded-2xl bg-[#25D366] px-6 py-3.5 text-white shadow-lg shadow-green-600/25 transition-transform hover:-translate-y-0.5"
                >
                  <span className="inline-flex items-center gap-2 text-[1.05rem] font-bold"><MessageCircle className="w-5 h-5" /> Chat on WhatsApp</span>
                  <span className="text-[0.9rem] font-medium opacity-95" lang="hi">स्टाफ की जानकारी लें</span>
                </a>
                <a
                  href="tel:+917668232867"
                  className="flex-1 inline-flex flex-col items-center justify-center rounded-2xl bg-[#1a3a6b] px-6 py-3.5 text-white shadow-lg shadow-blue-900/25 transition-transform hover:-translate-y-0.5"
                >
                  <span className="inline-flex items-center gap-2 text-[1.05rem] font-bold"><Phone className="w-5 h-5" /> Call Now</span>
                  <span className="text-[0.9rem] font-medium opacity-95" lang="hi">तुरंत बात करें</span>
                </a>
              </div>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.92rem] font-semibold text-[#354a6b]">
                {["12-hour & 24-hour duty", "Male & female staff", "Affordable home care"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-[#25a85a]" /> {t}</li>
                ))}
              </ul>
            </div>

            {/* Warm photo: caretaker helping an elderly person at home */}
            <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#ffd9b0]/60 to-[#bdeee9]/60 blur-2xl" aria-hidden="true"></div>
              <Image
                src="/images/hero-caretaker.jpg"
                alt="A caring attendant helping an elderly man sit comfortably on the sofa at home"
                width={1000}
                height={747}
                priority
                sizes="(max-width: 1023px) 100vw, 560px"
                className="relative w-full h-auto rounded-3xl shadow-xl object-cover"
              />
              <div className="absolute left-3 bottom-3 sm:left-4 sm:bottom-4 rounded-xl bg-white/95 px-3.5 py-2 shadow-lg">
                <div className="text-[0.95rem] font-extrabold text-[#0f2240] leading-tight">Care at home, with respect</div>
                <div className="text-[0.78rem] font-semibold text-[#6b82a3]" lang="hi">अपनों जैसी देखभाल, अपने घर में</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ PLANS — no prices shown; rate is shared on call/WhatsApp ══ */}
      <section id="plans" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-outfit text-3xl md:text-4xl font-extrabold text-[#0f2240] mb-3">Choose the care your family needs</h2>
            <p className="text-lg text-[#6b82a3]">Simple duty plans for patients and elders at home. Tell us the patient&apos;s condition and we will suggest the right staff and share the rate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { Icon: Sun, title: "12-Hour Attendant", hi: "12 घंटे की ड्यूटी", text: "Day or night shift. Help with bathing, feeding, medicines on time, walking, hygiene and company for your patient.", msg: "12-hour patient attendant" },
              { Icon: Clock, title: "24-Hour Attendant", hi: "24 घंटे की देखभाल", text: "Round-the-clock care for patients who cannot be left alone, so the family can rest and carry on with work.", msg: "24-hour patient attendant" },
              { Icon: HeartHandshake, title: "Home Nurse", hi: "ट्रेंड नर्स घर पर", text: "Trained nurse for injections, IV drip, dressing, catheter and tube care, BP & sugar checks and care after surgery.", msg: "home nurse" },
            ].map(({ Icon, title, hi, text, msg }) => (
              <div key={title} className="flex flex-col rounded-2xl border border-gray-100 bg-[#fffaf3] p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#0CB8C9] shadow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0f2240]">{title}</h3>
                <p className="mb-3 text-sm font-semibold text-[#c2410c]" lang="hi">{hi}</p>
                <p className="mb-6 flex-grow text-[#354a6b]">{text}</p>
                <a
                  href={waLink(`Hello Stoic Home Care, I need a ${msg} at home. Please share the rate and staff availability.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white"
                >
                  <MessageCircle className="h-5 w-5" /> Get today&apos;s rate
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div style={{minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><div style={{width:32,height:32,border:'3px solid #e5e7eb',borderTopColor:'#0CB8C9',borderRadius:'50%',animation:'spin 0.6s linear infinite'}}></div></div>}>
        <HomeDynamic />
      </Suspense>
    </div>
  );
}
