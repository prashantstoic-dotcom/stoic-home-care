import Head from 'next/head';

/**
 * Enterprise Core Web Vitals: LCP & CLS Optimizer
 * This component demonstrates the exact markup needed to pass 
 * LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift) at an enterprise scale.
 */
export default function HeroSection({ heroImageUrl, title, subtext }) {
    return (
        <section className="hero-container">
            <Head>
                {/* 1. Preload the LCP Image early in the document head */}
                <link 
                    rel="preload" 
                    href={heroImageUrl} 
                    as="image" 
                    type="image/webp" 
                    // fetchpriority="high" tells the browser to download this before anything else
                    fetchpriority="high" 
                />
                
                {/* 2. Preconnect to third-party domains if needed for critical assets */}
                <link rel="preconnect" href="https://cdn.example.com" />
            </Head>

            <div className="hero-content">
                <h1>{title}</h1>
                <p>{subtext}</p>
            </div>

            {/* 
                3. CLS & LCP Optimization on the Image tag itself 
                - NO loading="lazy" (Lazy loading above the fold ruins LCP)
                - Explicit width/height to reserve space and prevent Layout Shifts (CLS)
                - fetchPriority attribute natively on the image
                - decoding="sync" ensures it paints immediately after downloading
            */}
            <img 
                src={heroImageUrl} 
                alt="Hero Background" 
                width="1200" 
                height="600" 
                className="hero-image"
                fetchPriority="high"
                decoding="sync"
                // CSS aspect-ratio fallback is recommended in stylesheets
                style={{ aspectRatio: '1200 / 600', objectFit: 'cover' }}
            />

            {/* 
                4. CLS Prevention for Dynamic Ads / Widgets 
                Always reserve a minimum height (Skeleton block) for things that load later
            */}
            <div 
                id="dynamic-ad-slot" 
                style={{ minHeight: '250px', backgroundColor: '#f0f0f0' }}
            >
                {/* Ad script will inject here later, but layout won't shift because of minHeight */}
            </div>
        </section>
    );
}
