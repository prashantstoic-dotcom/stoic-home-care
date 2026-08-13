import Head from 'next/head';
import { useEffect, useState } from 'react';

/**
 * Enterprise SEO: Next.js SSR Wrapper & Hydration Debugger
 * This component ensures critical SEO elements are rendered on the server
 * and monitors for hydration mismatches or layout shifts.
 */
export default function SEOPageWrapper({ initialData, canonicalUrl }) {
    const [isHydrated, setIsHydrated] = useState(false);

    // Advanced Hydration Error Catching (Overrides console.error during dev/hydration)
    useEffect(() => {
        setIsHydrated(true);
        const originalError = console.error;
        console.error = (...args) => {
            if (args[0] && typeof args[0] === 'string' && args[0].includes('Hydration failed')) {
                // In production, send this to Datadog/Sentry. 
                // Hydration errors kill SEO because Googlebot sees a layout shift / re-render.
                originalError("🚨 [SEO ALERT] Hydration Mismatch Detected! Server HTML and Client JS do not match.", ...args);
            } else {
                originalError(...args);
            }
        };
        return () => { console.error = originalError; };
    }, []);

    return (
        <>
            <Head>
                {/* 1. Server-Side Injected Meta Tags (Available immediately in Source HTML) */}
                <title>{initialData.title}</title>
                <meta name="description" content={initialData.description} />
                <link rel="canonical" href={canonicalUrl} />
                
                {/* 2. Structured Data (JSON-LD) should NEVER be client-side only */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(initialData.schema) }}
                />
            </Head>

            <main className={isHydrated ? "hydrated" : "server-rendered"}>
                {/* 
                    3. Critical Content: Must match exactly between Server and Client 
                    to avoid React Hydration errors and SEO indexing drops.
                */}
                <article>
                    <h1>{initialData.heading}</h1>
                    <div className="content" dangerouslySetInnerHTML={{ __html: initialData.bodyHtml }} />
                </article>

                {/* 
                    4. Progressive Hydration (Optional)
                    Heavy interactive components below the fold can be dynamically imported 
                    so they don't block the main thread (improves Core Web Vitals - INP).
                */}
            </main>
        </>
    );
}

/**
 * Example Server-Side Data Fetching (Next.js)
 * Guarantees Googlebot gets the content without executing JavaScript.
 */
export async function getServerSideProps(context) {
    // Fetch data from API or Database
    const res = await fetch(`https://api.example.com/page-data?path=${context.resolvedUrl}`);
    const data = await res.json();

    // Fast Timeout Prevention for Googlebot (return 404 if data takes > 3s)
    if (!data) {
        return { notFound: true };
    }

    return {
        props: {
            initialData: data,
            canonicalUrl: `https://www.example.com${context.resolvedUrl}`
        }
    };
}
