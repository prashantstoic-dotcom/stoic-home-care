"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import BrandLogo from "./BrandLogo";

const WA_LINK =
  "https://wa.me/917668232867?text=" +
  encodeURIComponent("Hello Stoic Home Care, I need a patient attendant / nurse at home. Please share details and rates.");

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/#plans", label: "Plans" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const isActive = (href: string) => (href.startsWith("/#") ? false : pathname?.startsWith(href));

  return (
    <>
      <style>{`
        .hamburger-line { transition: transform 0.3s ease, opacity 0.3s ease; }
        .hamburger-open .line-1 { transform: translateY(8px) rotate(45deg); }
        .hamburger-open .line-2 { opacity: 0; }
        .hamburger-open .line-3 { transform: translateY(-8px) rotate(-45deg); }
      `}</style>

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:text-[var(--primary)] focus:z-[100]">
        Skip to main content
      </a>

      <header>
        <nav
          className={`fixed top-0 left-0 w-full z-50 backdrop-blur transition-all duration-300 ${isScrolled ? "bg-white/95 shadow-md py-2" : "bg-white/90 py-3"}`}
          id="mainNav"
          aria-label="Main"
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <BrandLogo />

            <button
              className="lg:hidden p-2 text-[var(--dark)] hover:text-[var(--primary)] focus:outline-none bg-transparent border-0"
              type="button"
              onClick={toggleMenu}
              aria-controls="navbarMobile"
              aria-expanded={isMobileMenuOpen}
              aria-label="Menu"
            >
              <div className={`flex flex-col gap-1.5 w-6 ${isMobileMenuOpen ? "hamburger-open" : ""}`}>
                <span className="hamburger-line line-1 w-full h-[2px] bg-current rounded-full origin-center"></span>
                <span className="hamburger-line line-2 w-full h-[2px] bg-current rounded-full"></span>
                <span className="hamburger-line line-3 w-full h-[2px] bg-current rounded-full origin-center"></span>
              </div>
            </button>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[var(--dark)] hover:text-[var(--primary)] transition-colors py-2 font-medium group ${isActive(link.href) ? "text-[var(--primary)] font-bold" : ""}`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-1/2 h-[3px] bg-[var(--primary)] rounded-full -translate-x-1/2 transition-transform duration-300 ${isActive(link.href) ? "w-5 scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"}`}></span>
                </Link>
              ))}
            </div>

            {/* Desktop actions: only WhatsApp + Call */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white bg-[var(--wa)] hover:opacity-90 transition-opacity text-sm font-semibold whitespace-nowrap">
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="tel:+917668232867" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white bg-[var(--primary)] hover:opacity-90 transition-opacity text-sm font-semibold whitespace-nowrap">
                <Phone size={16} /> +91 76682 32867
              </a>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            id="navbarMobile"
            className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="flex flex-col py-4 px-4 gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2.5 px-3 rounded-lg transition-colors font-medium ${isActive(link.href) ? "bg-gray-50 text-[var(--primary)] font-bold" : "text-[var(--dark)] hover:bg-gray-50 hover:text-[var(--primary)]"}`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex flex-col gap-2 mt-3 pt-4 border-t border-gray-100">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-white bg-[var(--wa)] font-semibold">
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
                <a href="tel:+917668232867" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-white bg-[var(--primary)] font-semibold">
                  <Phone size={18} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
