import Link from 'next/link';
import { 
  Hospital, Mail, Grid2X2, Info, Heart, Activity, Flag, Rocket, Shield, 
  Factory, Star, Award, Handshake, ShieldCheck, Microscope, Home, Globe,
  Trophy, Medal
} from 'lucide-react';

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
      <header className="bg-gradient-to-br from-[var(--primary)] to-[var(--dark)] text-white relative overflow-hidden" aria-label="About Us Hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-16 lg:py-24">
            <div className="lg:col-span-7" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[var(--accent)] font-medium mb-6 text-sm">
                <Hospital size={16} />Our Story
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Redefining Home<br/>
                <span className="text-[var(--accent)]">Home Care in India</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                Founded on the belief that exceptional Home Care shouldn't require leaving home. We bridge the gap between hospital-grade care and the comfort of your own space.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--teal)] text-white font-medium hover:opacity-90 transition-opacity">
                  <Mail size={18} />Get in Touch
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-[var(--dark)] transition-colors">
                  <Grid2X2 size={18} />Our Services
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5" data-aos="fade-left">
              <img src="/images/ab-1.avif" alt="Our Team" className="rounded-3xl w-full shadow-2xl shadow-black/40" width="600" height="400" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </header>

      {/* ══ MISSION & STORY ══ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--light)] text-[var(--primary)] font-medium mb-4 text-sm">
                <Info size={16} /> Who We Are
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--dark)] mb-4">Our Mission &amp; Story</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[var(--accent)] to-[var(--teal)] rounded-full mb-6"></div>
              <p className="text-gray-800 leading-relaxed mb-5">
                Stoic Home Care was founded with a simple but powerful belief: <strong>healing happens best where the heart is.</strong> We recognised a critical gap in Indian Home Care — patients had to choose between hospital-grade care and the comfort of home.
              </p>
              <p className="text-[var(--muted)] leading-relaxed mb-5">
                Today, we bridge that gap by bringing ICU setups, skilled nursing, advanced medical equipment and pharmaceutical manufacturing directly to patient doorsteps. Our certified professionals work tirelessly to ensure every patient receives the dignity, respect, and expert care they deserve.
              </p>
              <p className="text-[var(--muted)] leading-relaxed mb-8">
                Our approach is holistic — we treat not just the condition, but the whole person. We support families through difficult times with transparency, compassion, and clinical excellence.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--light)] rounded-2xl p-6 text-center">
                  <div className="font-serif text-4xl text-[var(--primary)] font-bold mb-1">5+</div>
                  <div className="text-[var(--muted)] text-sm">Years of Service</div>
                </div>
                <div className="bg-[var(--light)] rounded-2xl p-6 text-center">
                  <div className="font-serif text-4xl text-[var(--primary)] font-bold mb-1">50+</div>
                  <div className="text-[var(--muted)] text-sm">Lives Touched</div>
                </div>
                <div className="bg-[var(--light)] rounded-2xl p-6 text-center">
                  <div className="font-serif text-4xl text-[var(--primary)] font-bold mb-1">50+</div>
                  <div className="text-[var(--muted)] text-sm">Expert Staff</div>
                </div>
                <div className="bg-[var(--light)] rounded-2xl p-6 text-center">
                  <div className="font-serif text-4xl text-[var(--primary)] font-bold mb-1">24/7</div>
                  <div className="text-[var(--muted)] text-sm">Always Available</div>
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <img src="/images/blog-2.jpg" alt="Home Care Team" className="rounded-3xl w-full shadow-xl shadow-[var(--primary)]/20 mb-6" width="600" height="450" style={{ objectFit: 'cover' }} />
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-center gap-4">
                <Award className="text-amber-500 w-12 h-12 flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-900 mb-1">Most Trusted Home Care Brand</div>
                  <div className="text-[var(--muted)] text-sm">Voted by 1,000+ patient families across India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="py-16 lg:py-24 bg-[var(--light)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[var(--primary)] font-medium mb-4 text-sm shadow-sm">
              <Heart size={16} /> Our Values
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--dark)] mb-4">What Drives Us Every Day</h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              Our core values shape every interaction, every care plan, and every patient outcome.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay="0">
              <div className="w-14 h-14 rounded-2xl bg-[var(--light)] flex items-center justify-center mb-6">
                <Heart className="text-[var(--teal)] w-7 h-7" />
              </div>
              <h5 className="text-xl font-bold text-[var(--dark)] mb-3">Compassion First</h5>
              <p className="text-[var(--muted)] leading-relaxed">We treat every patient like family. Empathy and kindness are the foundation of every service we deliver.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay="80">
              <div className="w-14 h-14 rounded-2xl bg-[var(--light)] flex items-center justify-center mb-6">
                <Handshake className="text-[var(--teal)] w-7 h-7" />
              </div>
              <h5 className="text-xl font-bold text-[var(--dark)] mb-3">Integrity &amp; Trust</h5>
              <p className="text-[var(--muted)] leading-relaxed">Honest communication, transparent pricing and no hidden costs — ever. We earn trust through accountability.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay="160">
              <div className="w-14 h-14 rounded-2xl bg-[var(--light)] flex items-center justify-center mb-6">
                <ShieldCheck className="text-[var(--teal)] w-7 h-7" />
              </div>
              <h5 className="text-xl font-bold text-[var(--dark)] mb-3">Clinical Excellence</h5>
              <p className="text-[var(--muted)] leading-relaxed">We never compromise on quality of care or equipment. ICU-grade standards, delivered at home.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay="0">
              <div className="w-14 h-14 rounded-2xl bg-[var(--light)] flex items-center justify-center mb-6">
                <Microscope className="text-[var(--teal)] w-7 h-7" />
              </div>
              <h5 className="text-xl font-bold text-[var(--dark)] mb-3">Innovation</h5>
              <p className="text-[var(--muted)] leading-relaxed">We continuously adopt the latest medical technologies to provide the best possible home care solutions.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay="80">
              <div className="w-14 h-14 rounded-2xl bg-[var(--light)] flex items-center justify-center mb-6">
                <Home className="text-[var(--teal)] w-7 h-7" />
              </div>
              <h5 className="text-xl font-bold text-[var(--dark)] mb-3">Patient-Centred</h5>
              <p className="text-[var(--muted)] leading-relaxed">Every care plan is personalised. We listen to patients and families to design care around unique needs.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay="160">
              <div className="w-14 h-14 rounded-2xl bg-[var(--light)] flex items-center justify-center mb-6">
                <Globe className="text-[var(--teal)] w-7 h-7" />
              </div>
              <h5 className="text-xl font-bold text-[var(--dark)] mb-3">Accessibility</h5>
              <p className="text-[var(--muted)] leading-relaxed">Quality Home Care should reach everyone. We strive to make excellent home care affordable and accessible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ JOURNEY TIMELINE ══ */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[var(--primary)] to-[var(--dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[var(--accent)] font-medium mb-6 text-sm">
                <Activity size={16} /> Our Journey
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">From Vision to Reality</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[var(--accent)] to-[var(--teal)] rounded-full mb-6"></div>
              <p className="text-white/75 leading-relaxed mb-8">
                Every milestone represents a life transformed, a family relieved, a patient who healed with dignity.
              </p>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 mb-4 hover:bg-white/10 transition-colors" data-aos="fade-up" data-aos-delay="0">
                <Trophy className="text-amber-500 w-8 h-8 flex-shrink-0" />
                <div>
                  <h6 className="font-bold text-white mb-1">Best Home Care Provider 2023</h6>
                  <p className="text-sm text-white/70">India Health Excellence Awards</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 mb-4 hover:bg-white/10 transition-colors" data-aos="fade-up" data-aos-delay="80">
                <Medal className="text-blue-400 w-8 h-8 flex-shrink-0" />
                <div>
                  <h6 className="font-bold text-white mb-1">Best Home Care Services</h6>
                  <p className="text-sm text-white/70">Quality Management System</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 mb-4 hover:bg-white/10 transition-colors" data-aos="fade-up" data-aos-delay="160">
                <Star className="text-[var(--teal)] w-8 h-8 flex-shrink-0" />
                <div>
                  <h6 className="font-bold text-white mb-1">4.9/5 Patient Satisfaction Score</h6>
                  <p className="text-sm text-white/70">Based on 1,200+ verified reviews</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7" data-aos="fade-left">
              <div className="relative border-l-2 border-white/20 pl-8 ml-4">
                <div className="relative mb-10 last:mb-0">
                  <div className="absolute w-4 h-4 rounded-full bg-[var(--accent)] -left-[2.35rem] top-1"></div>
                  <div className="inline-flex items-center gap-1 text-[var(--teal)] text-sm font-semibold mb-2 uppercase tracking-wider">
                    <Flag size={14} /> 2018 — Founded
                  </div>
                  <h5 className="text-xl font-bold text-white mb-2">Stoic Home Care is Born</h5>
                  <p className="text-white/65 leading-relaxed">Founded in Mumbai with a mission to bring hospital care home. Began with nursing and attendant services, serving our first 100 patients.</p>
                </div>
                <div className="relative mb-10 last:mb-0">
                  <div className="absolute w-4 h-4 rounded-full bg-[var(--accent)] -left-[2.35rem] top-1"></div>
                  <div className="inline-flex items-center gap-1 text-[var(--teal)] text-sm font-semibold mb-2 uppercase tracking-wider">
                    <Rocket size={14} /> 2019 — Expansion
                  </div>
                  <h5 className="text-xl font-bold text-white mb-2">ICU at Home Launched</h5>
                  <p className="text-white/65 leading-relaxed">Pioneered ICU setup services at home in Maharashtra. First 500 patients served with critical care at home.</p>
                </div>
                <div className="relative mb-10 last:mb-0">
                  <div className="absolute w-4 h-4 rounded-full bg-[var(--accent)] -left-[2.35rem] top-1"></div>
                  <div className="inline-flex items-center gap-1 text-[var(--teal)] text-sm font-semibold mb-2 uppercase tracking-wider">
                    <Shield size={14} /> 2020 — Covid Response
                  </div>
                  <h5 className="text-xl font-bold text-white mb-2">Covid Care at Home</h5>
                  <p className="text-white/65 leading-relaxed">Deployed rapid Covid care during the pandemic. Served 2,000+ patients safely with strict PPE protocols at home.</p>
                </div>
                <div className="relative mb-10 last:mb-0">
                  <div className="absolute w-4 h-4 rounded-full bg-[var(--accent)] -left-[2.35rem] top-1"></div>
                  <div className="inline-flex items-center gap-1 text-[var(--teal)] text-sm font-semibold mb-2 uppercase tracking-wider">
                    <Factory size={14} /> 2021 — Growth
                  </div>
                  <h5 className="text-xl font-bold text-white mb-2">Equipment Rental &amp; Manufacturing</h5>
                  <p className="text-white/65 leading-relaxed">Launched medical equipment rental division and pharma manufacturing partnerships for complete Home Care solutions.</p>
                </div>
                <div className="relative mb-10 last:mb-0">
                  <div className="absolute w-4 h-4 rounded-full bg-[var(--accent)] -left-[2.35rem] top-1"></div>
                  <div className="inline-flex items-center gap-1 text-[var(--teal)] text-sm font-semibold mb-2 uppercase tracking-wider">
                    <Star size={14} /> 2024 — Present
                  </div>
                  <h5 className="text-xl font-bold text-white mb-2">100+ Families Served</h5>
                  <p className="text-white/65 leading-relaxed">Serving 100+ families across India with 15+ services and 20+ expert professionals. Expanding our reach every day.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
