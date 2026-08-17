"use client";

import { useEffect } from "react";

export default function ModalGlobals() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Define global functions for legacy inline onclick handlers from Supabase HTML
      (window as any).openBookModal = (serviceName: string) => {
        window.dispatchEvent(
          new CustomEvent("open-book-modal", { detail: { serviceName } })
        );
      };

      (window as any).openRentModal = (equipName: string, equipId: number = 0) => {
        window.dispatchEvent(
          new CustomEvent("open-rent-modal", { detail: { equipName, equipId } })
        );
      };

      // 2. Intercept Bootstrap data-bs-target="#askQuestionModal" clicks
      // since the original ask question button used Bootstrap attributes instead of onclick
      const handleGlobalClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const toggleBtn = target.closest('[data-bs-target="#askQuestionModal"]');
        
        if (toggleBtn) {
          e.preventDefault();
          e.stopPropagation();
          
          // Try to infer location and category from the page context
          // or from data attributes if available.
          // Since it's usually on the service page, we can grab it from hidden inputs if they existed,
          // or let the modal handle it generically.
          const locationMatch = window.location.pathname.match(/-in-([^/]+)/);
          const location = locationMatch ? locationMatch[1].replace(/-/g, ' ') : 'your area';
          
          window.dispatchEvent(
            new CustomEvent("open-ask-modal", { detail: { location, category: "this service" } })
          );
        }
      };

      document.addEventListener("click", handleGlobalClick, true);

      return () => {
        document.removeEventListener("click", handleGlobalClick, true);
        delete (window as any).openBookModal;
        delete (window as any).openRentModal;
      };
    }
  }, []);

  return null;
}
