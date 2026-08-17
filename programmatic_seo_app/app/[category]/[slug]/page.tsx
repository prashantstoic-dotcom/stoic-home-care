import { getSeoPage } from '@/lib/supabase'
import { CONFIG } from '@/lib/config'
import { notFound } from 'next/navigation'
import EntityGraph from '../../../components/EntityGraph'

// ==============================================================================
// NEXT.JS PROGRAMMATIC SEO (DYNAMIC ROUTING + ISR)
// This single file handles millions of URLs without writing them manually.
// E.g., /jobs/software-engineer-in-mumbai
// ==============================================================================

// 1. DYNAMIC METADATA GENERATION (Next.js 13+ App Router standard)
export async function generateMetadata({ params }: { params: { category: string, slug: string } }) {
  const { category, slug } = params

  const pageData = await getSeoPage(slug)

  if (!pageData) {
    return { title: 'Not Found' }
  }

  return {
    title: pageData.page_title,
    description: pageData.meta_desc,
    alternates: { canonical: `/${category}/${slug}` },
    openGraph: {
      title: pageData.page_title,
      description: pageData.meta_desc,
      type: 'website',
      images: [
        {
          url: pageData.image_url || "/images/clinic_03.jpg",
          width: 1200,
          height: 630,
          alt: pageData.page_title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.page_title,
      description: pageData.meta_desc,
      images: [pageData.image_url || "/images/clinic_03.jpg"],
    }
  }
}

// 2. PAGE RENDERER (Vercel ISR Logic)
export default async function ProgrammaticPage({ params }: { params: { category: string, slug: string } }) {
  const { category, slug } = params

  const pageData = await getSeoPage(slug)

  if (!pageData) {
    notFound()
  }

  // Extract Wikidata links if available in schema_markup
  let wikidataLinks = [];
  if (pageData.schema_markup && Array.isArray(pageData.schema_markup)) {
    wikidataLinks = pageData.schema_markup;
  } else if (pageData.schema_markup && pageData.schema_markup.sameAs) {
    wikidataLinks = pageData.schema_markup.sameAs;
  }

  // Define generic company and author data (you can later move this to a DB or config)
  const companyData = {
    name: CONFIG.COMPANY.name,
    linkedinUrl: CONFIG.COMPANY.linkedinUrl,
    twitterUrl: CONFIG.COMPANY.twitterUrl
  };
  
  const authorData = {
    name: "Dr. Rajesh Kumar",
    slug: "dr-rajesh-kumar",
    title: "Senior Medical Consultant"
  };

  const articleData = {
    title: pageData.page_title,
    description: pageData.meta_desc,
    slug: slug
  };

  return (
    <main className="container mx-auto p-8">
      {/* Advanced Knowledge Graph Injection */}
      <EntityGraph 
        articleData={articleData}
        authorData={authorData}
        companyData={companyData}
        wikidataLinks={wikidataLinks}
      />
      
      {/* Dynamic Content Rendering */}
      <article className="prose lg:prose-xl">
        <h1>{pageData.h1_title}</h1>
        
        {/* We use dangerouslySetInnerHTML to render HTML content from Supabase */}
        <div dangerouslySetInnerHTML={{ __html: pageData.content_html }} />
        
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3>Local Data / Statistics</h3>
          <p>This section is automatically populated by our Python Data Ingestion pipeline!</p>
        </div>
      </article>
    </main>
  )
}

// 3. ISR CONFIGURATION (The Secret to Vercel's Speed)
// This tells Vercel: Cache this page, but if someone visits it after 3600 seconds (1 hour),
// fetch fresh data from Supabase in the background and update the cache.
export const revalidate = 3600 
