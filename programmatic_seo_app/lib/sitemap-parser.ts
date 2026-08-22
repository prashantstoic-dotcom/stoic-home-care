/**
 * Utility to extract all URLs from the live sitemap.
 */

export async function extractAllSitemapUrls(baseUrl: string): Promise<string[]> {
  const allUrls: string[] = [];
  
  try {
    // 1. Fetch the index sitemap
    const indexRes = await fetch(`${baseUrl}/sitemap.xml`);
    if (!indexRes.ok) throw new Error('Failed to fetch sitemap index');
    
    const indexText = await indexRes.text();
    
    // Quick regex to find all <loc> tags in the index
    const indexRegex = /<loc>(.*?)<\/loc>/g;
    const sitemapLinks: string[] = [];
    let match;
    while ((match = indexRegex.exec(indexText)) !== null) {
      sitemapLinks.push(match[1]);
    }
    
    // If it's a single sitemap (not an index) it will have direct page URLs
    // We check if the links end with .xml to determine if it's an index
    const isIndex = sitemapLinks.length > 0 && sitemapLinks[0].endsWith('.xml');
    
    if (!isIndex) {
      return sitemapLinks;
    }

    // 2. It's an index, fetch all child sitemaps in parallel
    const chunkPromises = sitemapLinks.map(async (chunkUrl) => {
      try {
        const chunkRes = await fetch(chunkUrl);
        const chunkText = await chunkRes.text();
        const chunkRegex = /<loc>(.*?)<\/loc>/g;
        const chunkLinks: string[] = [];
        let cMatch;
        while ((cMatch = chunkRegex.exec(chunkText)) !== null) {
          chunkLinks.push(cMatch[1]);
        }
        return chunkLinks;
      } catch (err) {
        console.error('Failed to parse sitemap chunk:', err);
        return [];
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    chunkResults.forEach(urls => allUrls.push(...urls));
    
    return allUrls;
  } catch (error) {
    console.error('Sitemap Extraction Error:', error);
    return [];
  }
}
