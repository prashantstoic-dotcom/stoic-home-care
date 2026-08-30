import React from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingCTA from "./FloatingCTA";
import { ShieldCheck, Stethoscope, Ambulance, Star, Mail, ChevronRight, MapPin, Phone, MessageCircle, Clock, Heart } from "lucide-react";

export default async function Footer() {
  let seoPages: any[] = [];

  // ==========================================
  // Fetch SEO Pages Dynamically from Supabase
  // Equivalent to PHP: getSupabase()->getAllSeoPages()
  // ==========================================
  try {
    /* 
    Uncomment and configure when Supabase env is ready:
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase.from('seo_pages').select('slug').limit(15);
    if (data) seoPages = data;
    */
  } catch (error) {
    console.error("Failed to fetch SEO links for footer", error);
  }

  return (
    <>
      {/* GLOBAL TRUST STRIP */}
      <div className="bg-white border-t border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-center text-gray-500 font-semibold text-sm">
            <div className="flex items-center gap-1.5"><ShieldCheck size={18} color="var(--accent)" /> ISO 9001:2015 Certified</div>
            <div className="flex items-center gap-1.5"><Stethoscope size={18} color="var(--accent)" /> 100% Background Verified</div>
            <div className="flex items-center gap-1.5"><Ambulance size={18} color="var(--accent)" /> 2-Hour Fast Deployment</div>
            <div className="flex items-center gap-1.5"><Star size={18} color="#F5B041" /> 4.9/5 Patient Rating</div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <footer id="mainFooter">
        <div className="container mx-auto px-4 pt-12 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Logo & About */}
            <div>
              <Image src="/images/logo.png" alt="Stoic Home Care" width={180} height={50} loading="lazy" className="mb-4" />
              <p className="text-sm leading-relaxed max-w-[320px] text-gray-300">
                Bringing hospital-quality care to your home — ICU setups, skilled nursing, medical equipment and pharmaceutical manufacturing, all under one roof.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://www.facebook.com/p/Stoic-Home-Care-services-61581689589175/" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--teal)] transition-colors text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--teal)] transition-colors text-white">
                  <MessageCircle size={18} />
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--teal)] transition-colors text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://www.justdial.com/Greater-Noida/Stoic-care-Galaxy-Hospital-Sector-Mu-2-Greater-Noida/011PXX11-XX11-260103102151-G3L9_BZDET" aria-label="justdial" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--teal)] transition-colors text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="mailto:stoichomecare@gmail.com" aria-label="Mail" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--teal)] transition-colors text-white">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h6 className="text-lg font-bold mb-4 text-white">Quick Links</h6>
              <div className="flex flex-col gap-3">
                <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><ChevronRight size={14} className="text-[var(--teal)]" />Home</Link>
                <Link href="/services" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><ChevronRight size={14} className="text-[var(--teal)]" />Services</Link>
                <Link href="/equipment" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><ChevronRight size={14} className="text-[var(--teal)]" />Equipment</Link>
                <Link href="/about" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><ChevronRight size={14} className="text-[var(--teal)]" />About Us</Link>
                <Link href="/contact" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><ChevronRight size={14} className="text-[var(--teal)]" />Contact</Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h6 className="text-lg font-bold mb-4 text-white">Our Services</h6>
              <div className="flex flex-col gap-3">
                <Link href="/services" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><ChevronRight size={14} className="text-[var(--teal)]" />ICU Setup @ Home</Link>
                <Link href="/services" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><ChevronRight size={14} className="text-[var(--teal)]" />ICU Trained Nursing</Link>
                <Link href="/services" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><ChevronRight size={14} className="text-[var(--teal)]" />Old Age Care</Link>
                <Link href="/services" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><ChevronRight size={14} className="text-[var(--teal)]" />Mother &amp; Baby Care</Link>
                <Link href="/services" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><ChevronRight size={14} className="text-[var(--teal)]" />Doctor on Call</Link>
                <Link href="/services" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><ChevronRight size={14} className="text-[var(--teal)]" />Physiotherapy</Link>
              </div>
            </div>

            {/* Contact Information */}
            <div itemScope itemType="http://schema.org/MedicalBusiness">
              <h6 className="text-lg font-bold mb-4 text-white">Contact Us</h6>
              <div className="flex flex-col gap-3">
                <address className="not-italic m-0">
                  <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><MapPin size={16} className="text-[var(--teal)] flex-shrink-0" /><span itemProp="address">FF2 Block 330, MU 2, Greater Noida, Uttar Pradesh</span></a>
                  <a href="tel:+917668232867" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors mt-3"><Phone size={16} className="text-[var(--teal)] flex-shrink-0" /><span itemProp="telephone">+91 76682 32867</span></a>
                </address>
                <a href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><MessageCircle size={16} className="text-[var(--teal)] flex-shrink-0" />WhatsApp Us</a>
                <a href="mailto:info@stoichomecare.com" className="flex items-center gap-2 text-gray-300 hover:text-[var(--teal)] transition-colors"><Mail size={16} className="text-[var(--teal)] flex-shrink-0" />info@stoichomecare.com</a>
                <p className="flex items-center gap-2 text-sm text-gray-300 m-0"><Clock size={16} className="text-[var(--teal)] flex-shrink-0" />24/7 Emergency Support</p>
              </div>
            </div>
          </div>
          
          {/* SEO INTERNAL LINKING BLOCK */}
          <div className="mt-10 mb-6">
            <h6 className="mb-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Service Areas (Top Locations)</h6>
            <div className="flex flex-wrap gap-2 text-sm">
              {seoPages.map((page, idx) => {
                if (!page.slug) return null;
                const readable = page.slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
                return (
                  <Link key={idx} href={`/service/${page.slug}`} className="text-gray-400 border border-white/10 px-3 py-1.5 rounded-full hover:bg-[var(--teal)] hover:text-white transition-colors hover:border-[var(--teal)]">
                    {readable}
                  </Link>
                );
              })}
              {/* Fallback if DB is empty for UI testing */}
              {seoPages.length === 0 && (
                <span className="text-gray-400 italic">Locations loading dynamically...</span>
              )}
            </div>
          </div>

          <div className="py-4 text-gray-400 border-t border-b border-white/10 text-xs mb-4">
            <strong className="text-gray-300">Medical Disclaimer (YMYL):</strong> The content provided on this website is for informational purposes only. It does not substitute professional medical advice, diagnosis, or treatment. Always seek the advice of a certified physician or health provider.
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-white/10 mt-8 text-gray-400 text-sm">
            <p className="m-0">© {new Date().getFullYear()} <span itemProp="name">Stoic Home Care</span>. All rights reserved. | <Link href="#" className="hover:text-white transition-colors inline">Privacy Policy</Link></p>
            <p className="m-0 flex items-center gap-1">Designed with <Heart size={14} className="text-[var(--teal)]" fill="currentColor" /> for better Home Care</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA injected as Client Component */}
      <FloatingCTA />
    </>
  );
}
