import Link from 'next/link';
import HomeEnquiryForm from '../../components/HomeEnquiryForm';
import { 
  Headset, Phone, MessageCircle, Mail, MapPin, AlertTriangle, 
  Map, HelpCircle, Zap, Plus, Calendar, IdCard, RefreshCw, CreditCard 
} from 'lucide-react';

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
      <header className="relative bg-[var(--light)] pb-12" aria-label="Contact Page Hero">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 lg:py-20">
            <div data-aos="fade-right">
              <div className="inline-flex items-center bg-[var(--primary)] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                <Headset className="w-4 h-4 mr-2" /> Always Available 24/7
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[var(--dark)] mb-4 leading-tight">
                Get in Touch<br/>
                <span className="text-[var(--accent)]">We're Here for You</span>
              </h1>
              <p className="text-[var(--muted)] text-lg mb-8 max-w-lg">
                Whether it's an emergency, a booking enquiry or a question about services — our care coordinators are available around the clock to help you.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+917668232867" className="inline-flex items-center px-6 py-3 bg-[var(--primary)] hover:bg-[var(--dark)] text-white rounded-lg font-semibold transition-colors shadow-md">
                  <Phone className="w-5 h-5 mr-2" /> Call +91 76682 32867
                </a>
                <a href="https://wa.me/917668232867" className="inline-flex items-center px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-lg font-semibold transition-colors" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
                </a>
              </div>
            </div>
            
            <div className="lg:pl-8" data-aos="fade-left">
              <div className="flex flex-col gap-5">
                <div className="bg-white/95 p-6 rounded-2xl shadow-lg flex items-start gap-5 border border-white backdrop-blur-sm">
                  <div className="w-14 h-14 bg-[var(--light)] text-[var(--primary)] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark)] mb-1">Emergency Line</h3>
                    <p className="text-[var(--primary)] font-bold text-xl mb-1">+91 76682 32867</p>
                    <p className="text-[var(--muted)] text-sm font-medium">Available 24/7 — 365 days</p>
                  </div>
                </div>
                
                <div className="bg-white/95 p-6 rounded-2xl shadow-lg flex items-start gap-5 border border-white backdrop-blur-sm">
                  <div className="w-14 h-14 bg-[var(--light)] text-[var(--primary)] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark)] mb-1">Email</h3>
                    <a href="mailto:info@stoichomecare.com" className="text-[var(--primary)] font-semibold text-lg hover:underline break-all">info@stoichomecare.com</a>
                  </div>
                </div>
                
                <div className="bg-white/95 p-6 rounded-2xl shadow-lg flex items-start gap-5 border border-white backdrop-blur-sm">
                  <div className="w-14 h-14 bg-[var(--light)] text-[var(--primary)] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark)] mb-1">Office</h3>
                    <p className="text-[var(--muted)] font-medium leading-relaxed">FF2 Block 330, MU 2, Greater Noida,<br />Uttar Pradesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══ EMERGENCY STRIP ══ */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-[var(--primary)] rounded-2xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl" data-aos="zoom-in">
            <div className="text-white text-center md:text-left">
              <h4 className="text-2xl font-bold flex items-center justify-center md:justify-start mb-3">
                <AlertTriangle className="w-7 h-7 mr-3 text-[var(--accent)]" /> Medical Emergency?
              </h4>
              <p className="text-white/90 text-lg">Our emergency team is ready to deploy within 2 hours. Don't wait — call us right now.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <a href="tel:+917668232867" className="inline-flex items-center px-8 py-3.5 bg-white text-[#b45309] hover:bg-gray-50 rounded-full font-bold transition-colors shadow-sm text-lg">
                <Phone className="w-5 h-5 mr-2" /> Call Now
              </a>
              <a href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border-2 border-white/50 rounded-full font-bold transition-colors text-lg">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT & FORM ══ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center bg-[var(--light)] text-[var(--primary)] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Phone className="w-4 h-4 mr-2" /> Get In Touch
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--dark)] mb-6">We're Here 24/7 for You</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mx-auto rounded-full mb-6"></div>
            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">Whether it's an emergency or a planned service, our care coordinators are ready to help.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 xl:gap-12">
            <div className="lg:col-span-1" data-aos="fade-right">
              <address className="flex flex-col gap-6 not-italic m-0" itemScope itemType="http://schema.org/MedicalBusiness">
                <meta itemProp="name" content="Stoic Home Care" />
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 bg-[var(--light)] text-[var(--primary)] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark)] mb-1">Emergency / General</h3>
                    <span itemProp="telephone" className="text-[var(--primary)] font-semibold">+91 76682 32867</span><br/>
                    <small className="text-[var(--muted)] font-medium">24/7 – 365 days</small>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark)] mb-1">WhatsApp</h3>
                    <a href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] font-semibold hover:underline">Chat directly &rarr;</a>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 bg-[var(--light)] text-[var(--primary)] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark)] mb-1">Email</h3>
                    <a href="mailto:info@stoichomecare.com" itemProp="email" className="text-[var(--primary)] font-semibold break-all hover:underline">info@stoichomecare.com</a>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 bg-[var(--light)] text-[var(--primary)] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark)] mb-1">Address</h3>
                    <div itemProp="address" className="text-[var(--muted)] font-medium">Block-330, Sector MU 2, Greater Noida, Uttar Pradesh 201310</div>
                  </div>
                </div>
              </address>
            </div>

            <div className="lg:col-span-2" data-aos="fade-left">
              <div className="h-full bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100">
                <HomeEnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MAP ══ */}
      <section className="py-16 lg:py-24 bg-[var(--light)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-flex items-center bg-white text-[var(--primary)] px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
              <Map className="w-4 h-4 mr-2" /> Our Location
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--dark)]">Find Us in Greater Noida</h2>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white" data-aos="zoom-in">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d11700.61034501588!2d77.2749852!3d28.54852535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390c9530b5b56b57%3A0x111166040062b6cc!2sStoic%20Home%20Care%2C%20Block-330%2C%20Sector%20MU%202%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201310!3m2!1d28.4731435!2d77.5722983!5e1!3m2!1sen!2sin!4v1772220332638!5m2!1sen!2sin" 
             width="100%" 
             height="500" 
             style={{ border: 0 }} 
             allowFullScreen={true} 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             title="Stoic Home Care Location Map"
           ></iframe>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <div className="inline-flex items-center bg-[var(--light)] text-[var(--primary)] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <HelpCircle className="w-4 h-4 mr-2" /> FAQ
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--dark)] mb-6">Frequently Asked Questions</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-4">
              <details className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden [&::-webkit-details-marker]:hidden" data-aos="fade-up" data-aos-delay="0" open>
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-[var(--dark)] hover:text-[var(--primary)] transition-colors text-lg">
                  <span className="flex items-center"><Zap className="w-5 h-5 mr-3 text-[var(--teal)] shrink-0" />How quickly can you deploy a nurse or ICU setup?</span>
                  <Plus className="w-5 h-5 text-[var(--muted)] group-open:rotate-45 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-[var(--muted)] text-lg leading-relaxed">
                  For most services we deploy within 2–4 hours of confirmed booking. For ICU setups, same-day deployment is available in Delhi. Equipment delivery is usually arranged within 3–6 hours.
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden [&::-webkit-details-marker]:hidden" data-aos="fade-up" data-aos-delay="50">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-[var(--dark)] hover:text-[var(--primary)] transition-colors text-lg">
                  <span className="flex items-center"><Calendar className="w-5 h-5 mr-3 text-[var(--teal)] shrink-0" />What are the minimum rental periods for equipment?</span>
                  <Plus className="w-5 h-5 text-[var(--muted)] group-open:rotate-45 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-[var(--muted)] text-lg leading-relaxed">
                  Most equipment is available for a minimum of 15 days. Monthly rentals get discounted rates. We also offer weekly rentals for certain items — contact us to discuss your specific needs.
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden [&::-webkit-details-marker]:hidden" data-aos="fade-up" data-aos-delay="100">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-[var(--dark)] hover:text-[var(--primary)] transition-colors text-lg">
                  <span className="flex items-center"><IdCard className="w-5 h-5 mr-3 text-[var(--teal)] shrink-0" />Are your nurses verified and certified?</span>
                  <Plus className="w-5 h-5 text-[var(--muted)] group-open:rotate-45 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-[var(--muted)] text-lg leading-relaxed">
                  Yes, absolutely. All our nurses are INC-registered (Indian Nursing Council), have verified police backgrounds, and undergo internal ICU care training. We share credentials before deployment on request.
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden [&::-webkit-details-marker]:hidden" data-aos="fade-up" data-aos-delay="150">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-[var(--dark)] hover:text-[var(--primary)] transition-colors text-lg">
                  <span className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-[var(--teal)] shrink-0" />Do you provide services outside Delhi?</span>
                  <Plus className="w-5 h-5 text-[var(--muted)] group-open:rotate-45 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-[var(--muted)] text-lg leading-relaxed">
                  We primarily serve Delhi, Pune, Nashik, Navi Delhi, and Thane. For other cities, please contact us — we're expanding and may arrange services on request.
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden [&::-webkit-details-marker]:hidden" data-aos="fade-up" data-aos-delay="200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-[var(--dark)] hover:text-[var(--primary)] transition-colors text-lg">
                  <span className="flex items-center"><RefreshCw className="w-5 h-5 mr-3 text-[var(--teal)] shrink-0" />What if we're not satisfied with the service?</span>
                  <Plus className="w-5 h-5 text-[var(--muted)] group-open:rotate-45 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-[var(--muted)] text-lg leading-relaxed">
                  We have a replacement guarantee. If you're not satisfied with any nurse or equipment, contact us within 24 hours and we'll arrange a replacement at no extra charge. Patient satisfaction is our top priority.
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden [&::-webkit-details-marker]:hidden" data-aos="fade-up" data-aos-delay="250">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-[var(--dark)] hover:text-[var(--primary)] transition-colors text-lg">
                  <span className="flex items-center"><CreditCard className="w-5 h-5 mr-3 text-[var(--teal)] shrink-0" />What payment methods do you accept?</span>
                  <Plus className="w-5 h-5 text-[var(--muted)] group-open:rotate-45 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-[var(--muted)] text-lg leading-relaxed">
                  We accept cash, UPI (GPay, PhonePe, Paytm), NEFT/IMPS bank transfers, and all major credit/debit cards. Payment plans for long-term rentals can be discussed with our care coordinator.
                </div>
              </details>
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
