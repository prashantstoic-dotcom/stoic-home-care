import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stoiccare.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',       // Keep admin pages out of search engines
        '/api/',         // Don't crawl API endpoints
        '/*?sort=',      // Prevent crawling parameterized URLs to avoid duplicate content
        '/*?filter='
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
