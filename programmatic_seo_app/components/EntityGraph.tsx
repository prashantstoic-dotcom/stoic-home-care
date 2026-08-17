import React from 'react'
import Head from 'next/head'

// ==============================================================================
// PROJECT 3: The Central Knowledge Graph Component (Next.js)
// Goal: Output advanced JSON-LD that ties the Company, Author, and Content together.
// (BULLETPROOF EDITION: Strict Null Checks to prevent Fatal SEO Errors)
// ==============================================================================

export default function EntityGraph({ articleData, authorData, companyData, wikidataLinks }) {
  
  if (!companyData || !authorData || !articleData) return null; // Safe fallback

  // 1. Organization Node (The Brand)
  const organizationSchema = {
    "@type": "Organization",
    "@id": "https://yourwebsite.com/#organization",
    "name": companyData.name || "My Company",
    "url": "https://yourwebsite.com",
    "logo": "https://yourwebsite.com/logo.png",
    ...(companyData.linkedinUrl || companyData.twitterUrl ? {
      "sameAs": [
        ...(companyData.linkedinUrl ? [companyData.linkedinUrl] : []),
        ...(companyData.twitterUrl ? [companyData.twitterUrl] : [])
      ]
    } : {})
  }

  // 2. Person Node (The Author Authority)
  const authorSchema = {
    "@type": "Person",
    "@id": `https://yourwebsite.com/author/${authorData.slug || 'unknown'}#person`,
    "name": authorData.name || "Unknown Author",
    ...(authorData.title && { "jobTitle": authorData.title }),
    "worksFor": { "@id": "https://yourwebsite.com/#organization" }, // INTERLINKING!
    ...(authorData.linkedinUrl || authorData.personalWebsite ? {
      "sameAs": [
        ...(authorData.linkedinUrl ? [authorData.linkedinUrl] : []),
        ...(authorData.personalWebsite ? [authorData.personalWebsite] : [])
      ]
    } : {})
  }

  // 3. Article Node (The Content)
  const articleSchema = {
    "@type": "Article",
    "@id": `https://yourwebsite.com/${articleData.slug || 'article'}#article`,
    "headline": articleData.title || "Untitled Article",
    "description": articleData.description || "",
    "author": { "@id": `https://yourwebsite.com/author/${authorData.slug || 'unknown'}#person` }, // INTERLINKING!
    "publisher": { "@id": "https://yourwebsite.com/#organization" }, // INTERLINKING!
    ...(wikidataLinks && wikidataLinks.length > 0 ? {
      "about": wikidataLinks.map(url => ({
        "@type": "Thing",
        "sameAs": url
      })) // WIKIDATA VALIDATION!
    } : {})
  }

  // Assemble the Master Graph
  const masterGraph = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      authorSchema,
      articleSchema
    ]
  }

  return (
    <Head>
      {/* Injecting the Master Knowledge Graph silently into the page head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(masterGraph) }}
      />
    </Head>
  )
}
