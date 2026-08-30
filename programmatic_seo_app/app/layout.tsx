import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Outfit } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
const RentModal = dynamic(() => import("../components/modals/RentModal"), { ssr: false });
const BookServiceModal = dynamic(() => import("../components/modals/BookServiceModal"), { ssr: false });
const AskQuestionModal = dynamic(() => import("../components/modals/AskQuestionModal"), { ssr: false });
import ModalGlobals from "../components/ModalGlobals";
import ClientInit from "../components/ClientInit";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/pagination';
import "../public/css/animations.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../public/css/style.css";
import "../public/css/custom.css";
import "../public/css/responsive.css";
import "../public/css/a11y.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-outfit",
});

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
    <html lang="en" className={outfit.variable}>
      <head>
        {/* Delayed GTM Loader — fires on first interaction or 3.5s fallback */}
        <Script id="gtm-delayed-loader" strategy="afterInteractive">
          {`
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
            ['scroll','mousemove','touchstart'].forEach(function(e){
              window.addEventListener(e, loadGTM, {once:true, passive:true});
            });
            setTimeout(loadGTM, 3500);
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

        {/* JS Dependencies handled via ES modules */}
      </body>
    </html>
  );
}
