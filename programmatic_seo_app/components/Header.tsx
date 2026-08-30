"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Headset, MessageCircle, Phone, ShieldCheck } from "lucide-react";

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
      <style>{`
        .hamburger-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .hamburger-open .line-1 {
          transform: translateY(8px) rotate(45deg);
        }
        .hamburger-open .line-2 {
          opacity: 0;
        }
        .hamburger-open .line-3 {
          transform: translateY(-8px) rotate(-45deg);
        }
      `}</style>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MZBGCCQ4"
          height="0"
          width="0"
          className="hidden invisible"
        />
      </noscript>

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:text-[var(--primary)] focus:z-[100]">
        Skip to main content
      </a>

      <nav 
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur transition-all duration-300 ${isScrolled ? "bg-white/95 shadow-md py-2" : "bg-white/90 py-4"}`} 
        id="mainNav"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="shrink-0 flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Stoic Home Care" 
              width={180} 
              height={50} 
              priority 
              className="h-auto w-auto max-h-[50px]"
            />
          </Link>
          
          <button
            className="lg:hidden p-2 text-[var(--dark)] hover:text-[var(--primary)] focus:outline-none bg-transparent border-0"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarMain"
            aria-expanded={isMobileMenuOpen}
            aria-label="Menu"
          >
            <div className={`flex flex-col gap-1.5 w-6 ${isMobileMenuOpen ? "hamburger-open" : ""}`}>
              <span className="hamburger-line line-1 w-full h-[2px] bg-current rounded-full origin-center"></span>
              <span className="hamburger-line line-2 w-full h-[2px] bg-current rounded-full"></span>
              <span className="hamburger-line line-3 w-full h-[2px] bg-current rounded-full origin-center"></span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center" id="navbarMain">
            {[
              { href: "/", label: "Home", active: pathname === '/' },
              { href: "/services", label: "Services", active: pathname?.startsWith('/services') },
              { href: "/equipment", label: "Equipment", active: pathname?.startsWith('/equipment') },
              { href: "/about", label: "About", active: pathname === '/about' },
              { href: "/contact", label: "Contact", active: pathname === '/contact' }
            ].map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`relative text-[var(--dark)] hover:text-[var(--primary)] transition-colors py-2 font-medium group ${link.active ? "text-[var(--primary)] font-bold" : ""}`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 h-[3px] bg-[var(--primary)] rounded-full -translate-x-1/2 transition-transform duration-300 ${link.active ? "w-5 scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"}`}></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).openEnquiryPopup) {
                  (window as any).openEnquiryPopup();
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:opacity-90 transition-opacity text-sm font-medium whitespace-nowrap"
            >
              <Headset size={16} /> Request Callback
            </button>
            <a href="https://wa.me/917668232867" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white bg-[var(--wa)] hover:opacity-90 transition-opacity text-sm font-medium whitespace-nowrap" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href="tel:+917668232867" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white bg-[var(--teal)] hover:opacity-90 transition-opacity text-sm font-medium whitespace-nowrap">
              <Phone size={16} /> +91 76682 32867
            </a>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-xs font-medium ml-2"
            >
              <ShieldCheck size={14} /> Admin
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col py-4 px-4 gap-2">
            {[
              { href: "/", label: "Home", active: pathname === '/' },
              { href: "/services", label: "Services", active: pathname?.startsWith('/services') },
              { href: "/equipment", label: "Equipment", active: pathname?.startsWith('/equipment') },
              { href: "/about", label: "About", active: pathname === '/about' },
              { href: "/contact", label: "Contact", active: pathname === '/contact' }
            ].map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg transition-colors font-medium ${link.active ? "bg-gray-50 text-[var(--primary)] font-bold" : "text-[var(--dark)] hover:bg-gray-50 hover:text-[var(--primary)]"}`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (typeof window !== "undefined" && (window as any).openEnquiryPopup) {
                    (window as any).openEnquiryPopup();
                  }
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-white bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-sm font-medium"
              >
                <Headset size={16} /> Request Callback
              </button>
              <a href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-white bg-[var(--wa)] text-sm font-medium">
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="tel:+917668232867" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-white bg-[var(--teal)] text-sm font-medium">
                <Phone size={16} /> +91 76682 32867
              </a>
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center justify-center gap-1.5 px-4 py-2 mt-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium">
                <ShieldCheck size={16} /> Admin Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
