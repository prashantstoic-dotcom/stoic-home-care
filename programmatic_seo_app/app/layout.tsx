import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RentModal from "../components/modals/RentModal";
import BookServiceModal from "../components/modals/BookServiceModal";
import AskQuestionModal from "../components/modals/AskQuestionModal";
import ModalGlobals from "../components/ModalGlobals";
import ClientInit from "../components/ClientInit";

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
  return (
    <html lang="en">
      <head>
        {/* Preconnects for performance */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Global Styles (Copied from Old PHP Assets) */}
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/custom.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
        <link rel="stylesheet" href="/css/a11y.css" />

        {/* CDN Dependencies */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" />

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

        {/* Global Modals */}
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
