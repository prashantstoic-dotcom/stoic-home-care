"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Optional: Handle navbar scroll styling if needed
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link.active-link {
          color: #2563eb !important;
          font-weight: 700 !important;
          position: relative;
        }
        .nav-link.active-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background: #2563eb;
          border-radius: 2px;
        }
      `}} />

      {/* Google Tag Manager (noscript) - Moved from PHP header */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MZBGCCQ4"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? "scrolled" : ""}`} id="mainNav">
        <div className="container">
          <Link href="/" className="navbar-brand">
            {/* Using standard img to perfectly replicate old UI, but Next/Image is better for prod */}
            <Image className="navbar-logo" src="/images/logo.png" alt="Stoic Home Care" width={180} height={50} priority />
          </Link>
          
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarMain"
            aria-expanded={isMobileMenuOpen}
            aria-label="Menu"
          >
            <div className="toggler-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`} id="navbarMain">
            <ul className="navbar-nav mx-auto gap-1">
              <li className="nav-item">
                <Link href="/" className={`nav-link ${pathname === '/' ? 'active-link' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/services" className={`nav-link ${pathname?.startsWith('/services') ? 'active-link' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
              </li>
              <li className="nav-item">
                <Link href="/equipment" className={`nav-link ${pathname?.startsWith('/equipment') ? 'active-link' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Equipment</Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active-link' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active-link' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && (window as any).openEnquiryPopup) {
                    (window as any).openEnquiryPopup();
                  }
                }}
                className="btn-primary-grad"
                style={{ padding: "0.4rem 1rem", fontSize: "0.85rem", marginRight: "5px", whiteSpace: "nowrap" }}
              >
                <i className="fa-solid fa-headset me-1"></i> Request Callback
              </button>
              <a href="https://wa.me/917668232867" className="btn-wa" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp"></i> WhatsApp
              </a>
              <a href="tel:+917668232867" className="btn-call" style={{ whiteSpace: "nowrap" }}>
                <i className="fa-solid fa-phone"></i> +91 76682 32867
              </a>
              {/* Admin Login Link */}
              <Link
                href="/admin"
                className="btn btn-outline-secondary btn-sm ms-2 btn-admin-link"
                style={{ fontSize: ".78rem", padding: ".35rem .8rem", borderRadius: "20px" }}
              >
                <i className="fa-solid fa-user-shield me-1"></i>Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
