"use client";

import React, { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after interaction or 4 seconds fallback
    const showCta = () => {
      setIsVisible(true);
      window.removeEventListener("scroll", showCta);
      window.removeEventListener("mousemove", showCta);
      window.removeEventListener("touchstart", showCta);
    };

    window.addEventListener("scroll", showCta, { once: true });
    window.addEventListener("mousemove", showCta, { once: true });
    window.addEventListener("touchstart", showCta, { once: true });
    
    const fallbackTimer = setTimeout(showCta, 4000);

    return () => {
      window.removeEventListener("scroll", showCta);
      window.removeEventListener("mousemove", showCta);
      window.removeEventListener("touchstart", showCta);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .float-cta-wrap {
          position: fixed;
          bottom: 24px;
          left: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 9999;
          transition: opacity 0.5s ease-in-out;
          opacity: ${isVisible ? 1 : 0};
          pointer-events: ${isVisible ? "auto" : "none"};
        }
        .float-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 20px 0 16px;
          height: 50px;
          border-radius: 999px;
          color: #fff !important;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 4px 18px rgba(0,0,0,0.20);
          transition: transform .15s ease, box-shadow .15s ease;
        }
        .float-cta-btn:hover {
          transform: translateY(-2px);
          /* box-shadow is handled by the animation now, but we can override if needed */
        }
        
        @keyframes waPulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        @keyframes callPulse {
          0% { box-shadow: 0 0 0 0 rgba(12, 184, 201, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(12, 184, 201, 0); }
          100% { box-shadow: 0 0 0 0 rgba(12, 184, 201, 0); }
        }

        .float-wa { 
          background: #25D366; 
          animation: waPulse 2s infinite;
        }
        .float-call { 
          background: #0CB8C9; 
          animation: callPulse 2s infinite;
        }
        
        @media (max-width: 767px) {
          .float-cta-wrap { bottom: 16px; left: 12px; gap: 8px; }
          .float-cta-btn { width: 44px; height: 44px; padding: 0; justify-content: center; border-radius: 50%; }
          .float-cta-btn span { display: none; }
        }

        .scroll-top-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 44px;
          height: 44px;
          background: #0f2240;
          color: #fff;
          border: none;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          display: ${isVisible ? "flex" : "none"};
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9998;
          transition: background 0.3s ease;
        }
        .scroll-top-btn:hover { background: #0CB8C9; }
      `}} />

      {/* FLOATING CTA WRAPPER */}
      <div className="float-cta-wrap">
        <a className="float-cta-btn float-wa" href="https://wa.me/917668232867" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
          <i className="fa-brands fa-whatsapp"></i><span>WhatsApp Us</span>
        </a>
        <a className="float-cta-btn float-call" href="tel:+917668232867" aria-label="Call Stoic Home Care">
          <i className="fa-solid fa-phone"></i><span>Call Now</span>
        </a>
      </div>

      {/* SCROLL TOP BUTTON */}
      <button className="scroll-top-btn" aria-label="Back to top" onClick={scrollToTop}>
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </>
  );
}
