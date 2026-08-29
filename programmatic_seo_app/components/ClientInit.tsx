'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';

export default function ClientInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Edge SEO A/B Tester Analytics (Tool 5 - Part 3)
    const match = document.cookie.match(new RegExp('(^| )ab-test-variant=([^;]+)'));
    if (match) {
      const variant = match[2];
      console.log(`[SEO A/B Tester] User assigned to Variant: ${variant}`);
    }

    // AOS replacement: Lightweight IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el));

    // Initialize Swipers directly (no polling needed)
    const initSwipers = () => {
      // Equipment Swiper
      const equipEl = document.querySelector('.equip-home-swiper');
      if (equipEl && !(equipEl as any).swiper) {
        new Swiper('.equip-home-swiper', {
          modules: [Pagination],
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: { el: '.equip-home-swiper .swiper-pagination', clickable: true },
          breakpoints: {
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          },
        });
      }

      // Testimonials Swiper
      const testiEl = document.querySelector('.testi-swiper');
      if (testiEl && !(testiEl as any).swiper) {
        new Swiper('.testi-swiper', {
          modules: [Pagination],
          slidesPerView: 1,
          spaceBetween: 30,
          pagination: { el: '.testi-swiper .swiper-pagination', clickable: true },
          breakpoints: {
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          },
        });
      }
    };

    // Small delay to ensure DOM is ready after hydration
    requestAnimationFrame(() => {
      requestAnimationFrame(initSwipers);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
