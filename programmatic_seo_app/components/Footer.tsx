import React from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingCTA from "./FloatingCTA";
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
      `}} />

      {/* GLOBAL TRUST STRIP */}
      <div className="trust-strip py-3" style={{ background: "#fff", borderBottom: "1px solid #eee", borderTop: "1px solid #eee" }}>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 gap-md-5 text-center text-muted" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
            <div><i className="fa-solid fa-shield-halved me-1" style={{ color: "#0CB8C9" }}></i> ISO 9001:2015 Certified</div>
            <div><i className="fa-solid fa-user-doctor me-1" style={{ color: "#0CB8C9" }}></i> 100% Background Verified</div>
            <div><i className="fa-solid fa-truck-medical me-1" style={{ color: "#0CB8C9" }}></i> 2-Hour Fast Deployment</div>
            <div><i className="fa-solid fa-star me-1" style={{ color: "#F5B041" }}></i> 4.9/5 Patient Rating</div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <footer id="mainFooter">
        <div className="container">
          <div className="row g-4 pb-4">
            
            {/* Logo & About */}
            <div className="col-lg-4">
              {/* Using standard img for exact UI match, but next/image recommended */}
              <img src="/images/logo.png" alt="Stoic Home Care" height="50" className="mb-3" />
              <p style={{ fontSize: ".87rem", lineHeight: 1.85, maxWidth: "320px" }}>
                Bringing hospital-quality care to your home — ICU setups, skilled nursing, medical equipment and pharmaceutical manufacturing, all under one roof.
              </p>
              <div className="footer-social mt-3 d-flex flex-wrap gap-2">
                <a href="https://www.facebook.com/p/Stoic-Home-Care-services-61581689589175/" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
                <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.justdial.com/Greater-Noida/Stoic-care-Galaxy-Hospital-Sector-Mu-2-Greater-Noida/011PXX11-XX11-260103102151-G3L9_BZDET" aria-label="justdial"><i className="fa-brands fa-linkedin"></i></a>
                <a href="mailto:stoichomecare@gmail.com" aria-label="Mail"><i className="fa-solid fa-envelope"></i></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-sm-6 col-lg-2">
              <h2>Quick Links</h2>
              <Link href="/" className="d-flex align-items-center"><i className="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Home</Link>
              <Link href="/services" className="d-flex align-items-center"><i className="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Services</Link>
              <Link href="/equipment" className="d-flex align-items-center"><i className="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Equipment</Link>
              <Link href="/about" className="d-flex align-items-center"><i className="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>About Us</Link>
              <Link href="/contact" className="d-flex align-items-center"><i className="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Contact</Link>
            </div>

            {/* Services */}
            <div className="col-sm-6 col-lg-3">
              <h2>Our Services</h2>
              <Link href="/services" className="d-flex align-items-center"><i className="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>ICU Setup @ Home</Link>
              <Link href="/services" className="d-flex align-items-center"><i className="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>ICU Trained Nursing</Link>
              <Link href="/services" className="d-flex align-items-center"><i className="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Old Age Care</Link>
              <Link href="/services" className="d-flex align-items-center"><i className="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Mother &amp; Baby Care</Link>
              <Link href="/services" className="d-flex align-items-center"><i className="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Doctor on Call</Link>
              <Link href="/services" className="d-flex align-items-center"><i className="fa-solid fa-chevron-right fa-xs me-2 text-teal"></i>Physiotherapy</Link>
            </div>

            {/* Contact Information */}
            <div className="col-sm-6 col-lg-3" itemScope itemType="http://schema.org/MedicalBusiness">
              <h2>Contact Us</h2>
              <address style={{ fontStyle: "normal", marginBottom: 0 }}>
                <a href="#" className="d-flex align-items-center"><i className="fa-solid fa-location-dot me-2 text-teal"></i><span itemProp="address">FF2 Block 330, MU 2, Greater Noida, Uttar Pradesh</span></a>
                <a href="tel:+917668232867" className="d-flex align-items-center"><i className="fa-solid fa-phone me-2 text-teal"></i><span itemProp="telephone">+91 76682 32867</span></a>
              </address>
              <a href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center"><i className="fa-brands fa-whatsapp me-2 text-teal"></i>WhatsApp Us</a>
              <a href="mailto:info@stoichomecare.com" className="d-flex align-items-center"><i className="fa-solid fa-envelope me-2 text-teal"></i>info@stoichomecare.com</a>
              <p className="d-flex align-items-center new-f" style={{ fontSize: ".87rem", marginTop: ".5rem" }}><i className="fa-solid fa-clock me-2 text-teal"></i>24/7 Emergency Support</p>
            </div>
          </div>
          
          {/* SEO INTERNAL LINKING BLOCK (Dynamically populated from Supabase logic) */}
          <div className="row pt-2 pb-4">
            <div className="col-12">
              <h2 className="mb-3 text-muted">Service Areas (Top Locations)</h2>
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
            <p style={{ margin: 0 }}>Designed with <i className="fa-solid fa-heart text-teal"></i> for better Home Care</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA injected as Client Component */}
      <FloatingCTA />
    </>
  );
}
