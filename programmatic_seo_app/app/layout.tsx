import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientInit from "../components/ClientInit";

// ── Critical CSS: Inlined by Next.js for instant above-the-fold render ──
import "./critical.css";

// ── Lazy-load modals (never visible on initial render) ──
const RentModal = dynamic(() => import("../components/modals/RentModal"), { ssr: false });
const BookServiceModal = dynamic(() => import("../components/modals/BookServiceModal"), { ssr: false });
const AskQuestionModal = dynamic(() => import("../components/modals/AskQuestionModal"), { ssr: false });
const ModalGlobals = dynamic(() => import("../components/ModalGlobals"), { ssr: false });

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const abVariant = headersList.get('X-AB-Version') || 'A';
  
  const baseTitle = "Stoic Home Care – Expert Home Care Services";
  const aggressiveTitle = "Top Home Care Services in 2026 | Stoic Home Care";
  
  const finalTitle = abVariant === 'B' ? aggressiveTitle : baseTitle;

  return {
    metadataBase: new URL('https://stoiccare.in'),
    title: finalTitle,
    description: "Stoic Home Care provides hospital-grade home care – ICU setup, nursing, old age care, mother & baby care, doctor on call and medical equipment rental. Available 24/7.",
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': "large",
      'max-video-preview': -1,
    },
    openGraph: {
      title: finalTitle,
      description: "Stoic Home Care provides hospital-grade home care – ICU setup, nursing, old age care, mother & baby care, doctor on call and medical equipment rental. Available 24/7.",
      type: "website",
      siteName: "Stoic Home Care",
      images: [
        {
          url: "/images/carousel-1.avif",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: "Stoic Home Care provides hospital-grade home care – ICU setup, nursing, old age care, mother & baby care, doctor on call and medical equipment rental. Available 24/7.",
      images: ["/images/carousel-1.avif"],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Build async CSS link tags as raw HTML to use onload attribute
  // (React doesn't support onload on <link> elements natively)
  const asyncCssHtml = [
    // Google Fonts (was render-blocking @import in style.css)
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap',
    // Local CSS
    '/css/style.css',
    '/css/custom.css',
    '/css/responsive.css',
    '/css/a11y.css',
    // CDN CSS (was render-blocking — 4,150ms savings!)
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
    'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
  ].map(href =>
    `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'">`
  ).join('\n') + '\n' +
  // Noscript fallback for no-JS environments
  '<noscript>' +
  [
    '/css/style.css',
    '/css/custom.css',
    '/css/responsive.css',
    '/css/a11y.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
    'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap',
  ].map(href => `<link rel="stylesheet" href="${href}">`).join('') +
  '</noscript>';

  return (
    <html lang="en">
      <head>
        {/* ── Preconnects (keep — zero cost, speeds up later fetches) ── */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />

        {/* ── Preload Hero Images (fixes LCP request discovery) ── */}
        <link rel="preload" as="image" href="/images/carousel-1.avif" type="image/avif" />
        <link rel="preload" as="image" href="/images/doctor.avif" type="image/avif" />

        {/* ── All CSS loaded asynchronously (non-blocking) ── 
            Uses media="print" onload="this.media='all'" pattern.
            Critical CSS is inlined via import "./critical.css" above.
            This eliminates the 4,150ms render-blocking bottleneck. */}
        <div dangerouslySetInnerHTML={{ __html: asyncCssHtml }} />

        {/* ── Fallback: ensure async CSS loads even if onload fails ── */}
        <Script id="async-css-fallback" strategy="beforeInteractive">
          {`
            document.addEventListener("DOMContentLoaded", function() {
              var links = document.querySelectorAll('link[rel="stylesheet"][media="print"]');
              for (var i = 0; i < links.length; i++) {
                links[i].media = "all";
              }
            });
          `}
        </Script>

        {/* Delayed GTM Loader (Zero TBT logic from old head.php) */}
        <Script id="gtm-delayed-loader" strategy="afterInteractive">
          {`
            document.addEventListener("DOMContentLoaded", function() {
              var gtmLoaded = false;
              function loadGTM() {
                if (gtmLoaded) return;
                gtmLoaded = true;
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MZBGCCQ4');
              }
              // Load on interaction
              ['scroll', 'mousemove', 'touchstart'].forEach(function(e) { window.addEventListener(e, loadGTM, {once: true}); });
              // Or load after 3.5s anyway
              setTimeout(loadGTM, 3500);
            });
          `}
        </Script>
      </head>
      <body>
        <ClientInit />
        <Header />
        
        <main id="main-content">
          {children}
        </main>
        
        <Footer />

        {/* Global Modals (lazy-loaded — not in initial bundle) */}
        <ModalGlobals />
        <RentModal />
        <BookServiceModal />
        <AskQuestionModal />

        {/* JS Dependencies */}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
