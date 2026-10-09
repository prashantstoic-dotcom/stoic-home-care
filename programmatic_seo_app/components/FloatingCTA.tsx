"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, Phone, ChevronUp } from "lucide-react";

const WA_LINK =
  "https://wa.me/917668232867?text=" +
  encodeURIComponent("Hello Stoic Home Care, I need a patient attendant / nurse at home. Please share details and rates.");

/**
 * Mobile: a slim bottom bar with two big buttons (WhatsApp + Call Now) – thumb friendly.
 * Desktop: two small floating pills at the bottom-left.
 * Nothing else floats on the page, so there are never conflicting actions.
 */
export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const showCta = () => {
      setIsVisible(true);
      window.removeEventListener("scroll", showCta);
      window.removeEventListener("mousemove", showCta);
      window.removeEventListener("touchstart", showCta);
    };
    window.addEventListener("scroll", showCta, { once: true });
    window.addEventListener("mousemove", showCta, { once: true });
    window.addEventListener("touchstart", showCta, { once: true });
    const fallbackTimer = setTimeout(showCta, 2500);

    return () => {
      window.removeEventListener("scroll", showCta);
      window.removeEventListener("mousemove", showCta);
      window.removeEventListener("touchstart", showCta);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .scroll-top-btn {
          position: fixed; bottom: 24px; right: 24px; width: 44px; height: 44px;
          background: #0f2240; color: #fff; border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
          display: flex; align-items: center; justify-content: center;
          z-index: 9998; opacity: 0; visibility: hidden; transform: translateY(16px);
          transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
        }
        .scroll-top-btn.visible { opacity: 1; visibility: visible; transform: translateY(0); }
        @media (max-width: 767px) { .scroll-top-btn { bottom: 82px; right: 14px; } }
      `}} />

      <div
        className={`fixed bottom-0 inset-x-0 z-[9999] p-2 bg-white/95 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] transition-opacity duration-500 md:inset-x-auto md:left-4 md:bottom-6 md:p-0 md:bg-transparent md:shadow-none ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex gap-2 md:flex-col md:gap-2.5">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Stoic Home Care on WhatsApp"
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 h-12 md:px-5 rounded-full bg-[var(--wa)] text-white text-[15px] font-semibold shadow-lg"
          >
            <MessageCircle size={20} /> WhatsApp
          </a>
          <a
            href="tel:+917668232867"
            aria-label="Call Stoic Home Care"
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 h-12 md:px-5 rounded-full bg-[var(--primary)] text-white text-[15px] font-semibold shadow-lg"
          >
            <Phone size={20} /> Call Now
          </a>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`scroll-top-btn ${showScrollTop ? "visible" : ""}`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
}
