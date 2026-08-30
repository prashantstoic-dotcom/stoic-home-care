import Link from 'next/link';
import { getServices } from '@/lib/supabase';
import {
  Stethoscope,
  CalendarCheck,
  Phone,
  ArrowRight,
  Check,
  ListChecks,
  Hospital,
  ShieldPlus,
  HeartHandshake,
  Baby,
  ShieldCheck,
  Activity,
  Brain,
  PhoneCall,
  ClipboardList,
  Home
} from 'lucide-react';

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
    ['equip.avif','Critical Care','ICU Setup @ Home','Complete ICU infrastructure with ventilators, monitors and critical care nurses.', Hospital, ['Ventilator & BiPAP support','Multi-parameter monitors','ICU-trained nurses 24/7']],
    ['nurse.avif','Nursing','ICU Trained Nursing','Certified nurses for post-op care, IV therapy, wound management and monitoring.', ShieldPlus, ['Post-operative care','IV infusion & wound dressing','Catheter & stoma care']],
    ['old.jpg','Elder Care','Old Age Care','Compassionate full-time care for seniors including daily assistance and health monitoring.', HeartHandshake, ['Daily living assistance','Medication reminders','Fall prevention & mobility']],
    ['child.jpg','Maternity','Mother & Baby Care','Post-natal support for new mothers and neonatal care for newborns by specialists.', Baby, ['Post-natal recovery','Breastfeeding support','Newborn hygiene & care']],
    ['doctor_03.jpg','Doctor Visit','Doctor on Call','Board-certified physicians visiting your home for diagnosis, prescriptions and follow-ups.', ShieldCheck, ['Home consultation','Prescription & lab coordination','Emergency response']],
    ['physio.webp','Rehabilitation','Physiotherapy @ Home','Expert physiotherapists for stroke rehab, post-surgical recovery and pain management.', Activity, ['Stroke & neuro rehab','Orthopaedic recovery','Geriatric physiotherapy']],
    ['nurse.webp','Nursing','Nursing Attendant','Trained nursing attendants providing round-the-clock care and support for patients.', HeartHandshake, ['Personal hygiene care','Patient mobility','Vital signs monitoring']],
    ['ab-1.avif','Specialised','Covid Care @ Home','Specialised care for Covid-19 patients including oxygen therapy and monitoring.', Activity, ['Oxygen saturation monitoring','Prescribed medication','Isolation protocol']],
    ['ab-2.avif','Mental Health','Psychologist @ Home','Qualified psychologists providing therapy and counselling in the comfort of your home.', Brain, ['Individual therapy','Anxiety & depression support','Family counselling']],
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
      {/* ══ HERO STATIC ══ */}
      <header className="relative w-full overflow-hidden min-h-[72vh] lg:min-h-[60vh] flex items-center pt-4 pb-8" aria-label="Services Page Hero">
        <img src="/images/ab-3.avif" alt="Home Care Services" loading="eager" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover -z-20" />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-dark/95 to-dark/70 -z-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8 text-white mt-12 lg:mt-20">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-4 text-sm font-medium">
                <Stethoscope className="w-4 h-4" /> 15+ Specialized Services
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 leading-tight">
                Comprehensive Home<br/>
                <span className="text-accent">Home Care Services</span>
              </h1>
              <p className="text-lg opacity-90 mb-8 max-w-2xl">
                Professional medical care tailored to your needs — delivered with clinical precision and human compassion, right at your doorstep. Available 24/7.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-br from-accent to-[#1D9E75] hover:opacity-90 transition-opacity px-6 py-3 rounded-full text-white font-semibold no-underline shadow-lg">
                  <CalendarCheck className="w-5 h-5" /> Book Now
                </Link>
                <a href="tel:+917668232867" className="inline-flex items-center gap-2 border-2 border-white/50 hover:bg-white/10 transition-colors px-6 py-3 rounded-full text-white font-semibold no-underline">
                  <Phone className="w-5 h-5" /> Emergency Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══ SERVICES CATALOG ══ */}
      <section className="py-16 lg:py-24 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-accent font-semibold mb-2 uppercase tracking-wide text-sm">
              <Stethoscope className="w-4 h-4" /> Our Services
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">Complete Home Care Services</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent to-teal mx-auto rounded-full mb-4"></div>
            <p className="text-muted max-w-2xl mx-auto">Every service designed around patient comfort, clinical excellence, and family peace of mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.length > 0 ? (
              services.map((svc: any) => (
                <article key={svc.id}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative">
                      <img src={svc.image ? `/uploads/services/${svc.image}` : '/images/equip.avif'} alt={svc.title} loading="lazy" width={400} height={250} className="w-full h-[250px] object-cover" />
                      <div className="absolute -bottom-5 right-5 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white shadow-[0_5px_15px_rgba(12,184,201,0.4)]">
                        <Hospital className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="text-accent font-semibold text-sm mb-2 uppercase">{svc.category || ''}</div>
                      <h5 className="font-bold text-xl mb-4 text-dark">{svc.title}</h5>
                      <p className="text-muted text-sm mb-6 flex-grow">{svc.description || ''}</p>
                      <Link href={`/contact?service=${encodeURIComponent(svc.title)}`} className="w-full inline-flex items-center justify-center gap-2 border border-accent text-accent hover:bg-accent hover:text-white transition-colors rounded-lg font-semibold py-2.5">
                        Book Now <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              staticServices.map(([img, tag, title, desc, Icon, features]: any) => (
                <article key={title}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative">
                      <img src={`/images/${img}`} alt={title} loading="lazy" width={400} height={250} className="w-full h-[250px] object-cover" />
                      <div className="absolute -bottom-5 right-5 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white shadow-[0_5px_15px_rgba(12,184,201,0.4)]">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col mt-2">
                      <div className="text-accent font-semibold text-sm mb-2 uppercase">{tag}</div>
                      <h5 className="font-bold text-xl mb-4 text-dark">{title}</h5>
                      <p className="text-muted text-sm mb-6">{desc}</p>
                      <ul className="mb-6 pl-0 flex-grow list-none">
                        {features.map((f: string) => (
                          <li key={f} className="text-sm text-gray-700 mb-2 flex items-start gap-2">
                            <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" /> {f}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/contact?service=${encodeURIComponent(title)}`} className="w-full inline-flex items-center justify-center gap-2 border border-accent text-accent hover:bg-accent hover:text-white transition-colors rounded-lg font-semibold py-2.5">
                        Book Now <ArrowRight className="w-4 h-4" />
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
      <section className="py-16 lg:py-24 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-accent font-semibold mb-2 uppercase tracking-wide text-sm">
              <ListChecks className="w-4 h-4" /> Our Process
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">How It Works</h2>
            <p className="text-muted max-w-2xl mx-auto">Getting started is simple. We handle everything so you can focus on recovery.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] h-full flex flex-col items-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <PhoneCall className="w-8 h-8 text-accent" />
              </div>
              <h5 className="font-bold text-dark text-lg mb-2">Contact Us</h5>
              <p className="text-muted text-sm">Call or fill the form. Our coordinator calls back within 1 hour.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] h-full flex flex-col items-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <ClipboardList className="w-8 h-8 text-accent" />
              </div>
              <h5 className="font-bold text-dark text-lg mb-2">Need Assessment</h5>
              <p className="text-muted text-sm">We assess your needs and create a custom care plan tailored to you.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] h-full flex flex-col items-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Home className="w-8 h-8 text-accent" />
              </div>
              <h5 className="font-bold text-dark text-lg mb-2">Care Begins</h5>
              <p className="text-muted text-sm">Our certified professional arrives, sets up equipment and begins care.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] h-full flex flex-col items-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-accent" />
              </div>
              <h5 className="font-bold text-dark text-lg mb-2">Ongoing Support</h5>
              <p className="text-muted text-sm">Regular health updates, doctor coordination and 24/7 helpline throughout.</p>
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
