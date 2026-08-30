import React from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingCTA from "./FloatingCTA";
import { ShieldCheck, Stethoscope, Ambulance, Star, Mail, ChevronRight, MapPin, Phone, MessageCircle, Clock, Heart } from "lucide-react";
// import { createClient } from "@supabase/supabase-js"; // Assuming standard setup

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
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-social a:hover i { color: #fff !important; }
        .footer-social a:hover { color: #fff !important; }
      `}} />

      {/* GLOBAL TRUST STRIP */}
      <div className="trust-strip py-3" style={{ background: "#fff", borderBottom: "1px solid #eee", borderTop: "1px solid #eee" }}>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 gap-md-5 text-center text-muted" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
            <div className="d-flex align-items-center"><ShieldCheck className="me-1" size={18} color="#0CB8C9" /> ISO 9001:2015 Certified</div>
            <div className="d-flex align-items-center"><Stethoscope className="me-1" size={18} color="#0CB8C9" /> 100% Background Verified</div>
            <div className="d-flex align-items-center"><Ambulance className="me-1" size={18} color="#0CB8C9" /> 2-Hour Fast Deployment</div>
            <div className="d-flex align-items-center"><Star className="me-1" size={18} color="#F5B041" /> 4.9/5 Patient Rating</div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <footer id="mainFooter">
        <div className="container">
          <div className="row g-4 pb-4">
            
            {/* Logo & About */}
            <div className="col-lg-4">
              <Image src="/images/logo.png" alt="Stoic Home Care" width={180} height={50} loading="lazy" className="mb-3" />
              <p style={{ fontSize: ".87rem", lineHeight: 1.85, maxWidth: "320px" }}>
                Bringing hospital-quality care to your home — ICU setups, skilled nursing, medical equipment and pharmaceutical manufacturing, all under one roof.
              </p>
              <div className="footer-social mt-3 d-flex flex-wrap gap-2">
                <a href="https://www.facebook.com/p/Stoic-Home-Care-services-61581689589175/" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
                <a href="#" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://www.justdial.com/Greater-Noida/Stoic-care-Galaxy-Hospital-Sector-Mu-2-Greater-Noida/011PXX11-XX11-260103102151-G3L9_BZDET" aria-label="justdial">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="mailto:stoichomecare@gmail.com" aria-label="Mail"><Mail size={18} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-sm-6 col-lg-2">
              <h6>Quick Links</h6>
              <Link href="/" className="d-flex align-items-center"><ChevronRight size={14} className="me-2 text-teal" />Home</Link>
              <Link href="/services" className="d-flex align-items-center"><ChevronRight size={14} className="me-2 text-teal" />Services</Link>
              <Link href="/equipment" className="d-flex align-items-center"><ChevronRight size={14} className="me-2 text-teal" />Equipment</Link>
              <Link href="/about" className="d-flex align-items-center"><ChevronRight size={14} className="me-2 text-teal" />About Us</Link>
              <Link href="/contact" className="d-flex align-items-center"><ChevronRight size={14} className="me-2 text-teal" />Contact</Link>
            </div>

            {/* Services */}
            <div className="col-sm-6 col-lg-3">
              <h6>Our Services</h6>
              <Link href="/services" className="d-flex align-items-center"><ChevronRight size={14} className="me-2 text-teal" />ICU Setup @ Home</Link>
              <Link href="/services" className="d-flex align-items-center"><ChevronRight size={14} className="me-2 text-teal" />ICU Trained Nursing</Link>
              <Link href="/services" className="d-flex align-items-center"><ChevronRight size={14} className="me-2 text-teal" />Old Age Care</Link>
              <Link href="/services" className="d-flex align-items-center"><ChevronRight size={14} className="me-2 text-teal" />Mother &amp; Baby Care</Link>
              <Link href="/services" className="d-flex align-items-center"><ChevronRight size={14} className="me-2 text-teal" />Doctor on Call</Link>
              <Link href="/services" className="d-flex align-items-center"><ChevronRight size={14} className="me-2 text-teal" />Physiotherapy</Link>
            </div>

            {/* Contact Information */}
            <div className="col-sm-6 col-lg-3" itemScope itemType="http://schema.org/MedicalBusiness">
              <h6>Contact Us</h6>
              <address style={{ fontStyle: "normal", marginBottom: 0 }}>
                <a href="#" className="d-flex align-items-center"><MapPin size={16} className="me-2 text-teal" /><span itemProp="address">FF2 Block 330, MU 2, Greater Noida, Uttar Pradesh</span></a>
                <a href="tel:+917668232867" className="d-flex align-items-center mt-2"><Phone size={16} className="me-2 text-teal" /><span itemProp="telephone">+91 76682 32867</span></a>
              </address>
              <a href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center mt-2"><MessageCircle size={16} className="me-2 text-teal" />WhatsApp Us</a>
              <a href="mailto:info@stoichomecare.com" className="d-flex align-items-center mt-2"><Mail size={16} className="me-2 text-teal" />info@stoichomecare.com</a>
              <p className="d-flex align-items-center new-f mt-2" style={{ fontSize: ".87rem" }}><Clock size={16} className="me-2 text-teal" />24/7 Emergency Support</p>
            </div>
          </div>
          
          {/* SEO INTERNAL LINKING BLOCK (Dynamically populated from Supabase logic) */}
          <div className="row pt-2 pb-4">
            <div className="col-12">
              <h6 className="mb-3 text-muted">Service Areas (Top Locations)</h6>
              <div className="d-flex flex-wrap gap-2" style={{ fontSize: "0.85rem" }}>
                {seoPages.map((page, idx) => {
                  if (!page.slug) return null;
                  const readable = page.slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
                  return (
                    <Link key={idx} href={`/service/${page.slug}`} className="text-decoration-none text-muted border px-2 py-1 rounded hover-teal">
                      {readable}
                    </Link>
                  );
                })}
                {/* Fallback if DB is empty for UI testing */}
                {seoPages.length === 0 && (
                  <span className="text-muted" style={{ fontStyle: "italic" }}>Locations loading dynamically...</span>
                )}
              </div>
            </div>
          </div>

          <div className="py-2 text-muted border-top border-bottom" style={{ fontSize: "0.8rem", marginBottom: "1rem" }}>
            <strong>Medical Disclaimer (YMYL):</strong> The content provided on this website is for informational purposes only. It does not substitute professional medical advice, diagnosis, or treatment. Always seek the advice of a certified physician or health provider.
          </div>

          <div className="footer-bottom d-flex flex-wrap justify-content-between align-items-center gap-2">
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} <span itemProp="name">Stoic Home Care</span>. All rights reserved. | <Link href="#" style={{ display: "inline" }}>Privacy Policy</Link></p>
            <p style={{ margin: 0 }} className="d-flex align-items-center">Designed with <Heart size={14} className="text-teal mx-1" fill="currentColor" /> for better Home Care</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA injected as Client Component */}
      <FloatingCTA />
    </>
  );
}
