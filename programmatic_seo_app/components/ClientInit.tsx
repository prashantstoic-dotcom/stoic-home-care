'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientInit() {
  const pathname = usePathname();

  useEffect(() => {
    // -------------------------------------------------------------
    // Edge SEO A/B Tester Analytics (Tool 5 - Part 3)
    // -------------------------------------------------------------
    const match = document.cookie.match(new RegExp('(^| )ab-test-variant=([^;]+)'));
    if (match) {
      const variant = match[2];
      console.log(`[SEO A/B Tester] User assigned to Variant: ${variant}`);
      // In production, this can trigger a GA event:
      // if (window.gtag) window.gtag('event', 'ab_test_impression', { variant_name: variant });
    }

    // Run initialization in an interval to wait for CDN scripts (AOS, Swiper) to load
    const initTimer = setInterval(() => {
      let allLoaded = true;

      // 1. Initialize AOS (Animate On Scroll)
      if (typeof window !== 'undefined' && (window as any).AOS) {
        (window as any).AOS.init({
          duration: 800,
          once: true,
          easing: 'ease-out-cubic'
        });
        (window as any).AOS.refresh();
      } else {
        allLoaded = false;
      }

      // 2. Initialize Swiper for Carousels
      if (typeof window !== 'undefined' && (window as any).Swiper) {
        const Swiper = (window as any).Swiper;
        
        // Equipment Swiper
        if (document.querySelector('.equip-home-swiper') && !(document.querySelector('.equip-home-swiper') as any).swiper) {
          new Swiper('.equip-home-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 }
            }
          });
        }
        
        // Testimonials Swiper
        if (document.querySelector('.testi-swiper') && !(document.querySelector('.testi-swiper') as any).swiper) {
          new Swiper('.testi-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 }
            }
          });
        }
      } else {
        allLoaded = false;
      }

      // If both libraries are loaded and initialized, clear the interval
      if (allLoaded) {
        clearInterval(initTimer);
      }
    }, 200);

    // Failsafe: stop checking after 5 seconds to prevent memory leaks
    setTimeout(() => clearInterval(initTimer), 5000);

    return () => clearInterval(initTimer);
  }, [pathname]); // Re-run when pathname changes (Next.js client-side navigation)

  return null;
}
