import type { Metadata } from "next";
import { headers } from "next/headers";
import { GoogleTagManager } from '@next/third-parties/google';
import dynamic from "next/dynamic";
import { Outfit } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
const RentModal = dynamic(() => import("../components/modals/RentModal"), { ssr: false });
const BookServiceModal = dynamic(() => import("../components/modals/BookServiceModal"), { ssr: false });
const AskQuestionModal = dynamic(() => import("../components/modals/AskQuestionModal"), { ssr: false });
import ModalGlobals from "../components/ModalGlobals";
import ClientInit from "../components/ClientInit";

import 'swiper/css';
import 'swiper/css/pagination';
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/uno.css";
import "../public/css/style.css";
import "../public/css/responsive.css";
import "../public/css/custom.css";
import "../public/css/animations.css";
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
      <head></head>
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
        <GoogleTagManager gtmId="GTM-MZBGCCQ4" />
      </body>
    </html>
  );
}
