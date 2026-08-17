"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
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

      {/* Page Loader (Static UI replica) */}
      <div id="pageLoader" style={{ display: "none" }}> {/* Hidden by default in React, can be managed by state if needed */}
        <div className="loader-logo-wrap">
          <div className="hr1"></div>
          <div className="hr2"></div>
          <div className="hr3"></div>
          <span className="loader-s">S</span>
        </div>
        <svg className="ecg-loader" viewBox="0 0 300 64" fill="none">
          <path
            className="ecg-path"
            d="M0,32 L35,32 L50,32 L65,10 L80,54 L95,4 L110,60 L125,32 L160,32 L175,32 L190,10 L205,54 L220,4 L235,60 L250,32 L300,32"
            stroke="#4ecdc4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="loader-brand">Stoic Home Care</div>
        <div className="loader-sub">Healing Starts at Home</div>
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
      </div>

      <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? "scrolled" : ""}`} id="mainNav">
        <div className="container">
          <Link href="/" className="navbar-brand">
            {/* Using standard img to perfectly replicate old UI, but Next/Image is better for prod */}
            <img className="navbar-logo" src="/images/logo.png" alt="Stoic Home Care" />
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
                <Link href="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/services" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
              </li>
              <li className="nav-item">
                <Link href="/equipment" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Equipment</Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
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
