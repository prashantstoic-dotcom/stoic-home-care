/**
 * Cloudflare Worker for Edge SEO, Error Handling, and Scalable Redirects.
 * This intercepts requests before they hit the origin server to handle Edge Errors.
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // 1. Regex-based Scalable 301 Redirects (Handling Migrations/Errors at Edge)
  // Example: Redirecting all old /category/xyz to /shop/xyz
  const categoryRegex = /^\/category\/(.*)$/
  if (categoryRegex.test(url.pathname)) {
    const newPath = url.pathname.replace(categoryRegex, '/shop/$1')
    return Response.redirect(`${url.origin}${newPath}`, 301)
  }

  // 2. Fetch from Origin
  let response = await fetch(request)

  // 3. Edge Error Handling (If Origin returns 404 or 500)
  if (response.status === 404) {
    // Check if we have a known fallback or need to trigger a custom Edge 404 response
    // For bots, we want to ensure a hard 404/410, not a soft 404
    const userAgent = request.headers.get('User-Agent') || ''
    if (userAgent.includes('Googlebot')) {
      // Potentially log this edge error to a Cloudflare KV or external API for Crawl Analysis
      // await logEdgeError(url.pathname, 404)
    }
  }

  // 4. Injecting X-Robots-Tag Headers for non-HTML assets (e.g., PDFs)
  // To save crawl budget on files that shouldn't be indexed
  if (url.pathname.endsWith('.pdf') || url.pathname.startsWith('/api/')) {
    response = new Response(response.body, response)
    response.headers.set('X-Robots-Tag', 'noindex, noarchive')
  }

  // 5. Faceted Navigation Control (Canonicalization at Edge)
  // If the URL has specific query parameters that shouldn't be indexed (e.g., ?sort=price)
  if (url.searchParams.has('sort') || url.searchParams.has('filter')) {
    response = new Response(response.body, response)
    // Send a header so the application knows to render a canonical tag to the clean URL
    response.headers.set('X-Canonical-Override', `${url.origin}${url.pathname}`)
    // Alternatively, block indexing directly via header
    response.headers.set('X-Robots-Tag', 'noindex')
  }

  return response
}
