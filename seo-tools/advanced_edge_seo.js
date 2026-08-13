/**
 * Enterprise Advanced Edge SEO Worker
 * Environment: Cloudflare Workers (V8)
 * 
 * Features:
 * 1. Malicious Bot Blocking
 * 2. Geo-Routing (Hreflang simulation)
 * 3. Dynamic HTTP Headers (Canonical, HSTS, Vary)
 * 4. A/B Testing via HTMLRewriter
 */

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

// A/B Testing Handler for HTMLRewriter
class ElementHandler {
    element(element) {
        // Append something to the title for the B variant
        if (element.tagName === 'title') {
            element.append(' - [A/B Test Variant B]');
        }
        if (element.tagName === 'h1') {
            element.prepend('Exclusive: ');
        }
    }
}

async function handleRequest(request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('User-Agent') || '';
    const cf = request.cf || {};

    // ==========================================
    // PHASE 4: Malicious Bot Blocking (Scrapers)
    // ==========================================
    const badBots = ['Scrapy', 'python-requests', 'HTTrack', 'Go-http-client'];
    if (badBots.some(bot => userAgent.includes(bot))) {
        return new Response('Access Denied', { status: 403 });
    }

    // ==========================================
    // PHASE 4: Geo-Routing (Hreflang setup)
    // ==========================================
    // Example: If a French user hits the homepage, redirect to /fr/
    if (url.pathname === '/' && cf.country === 'FR') {
        return Response.redirect(`${url.origin}/fr/`, 302);
    }

    // Fetch original response from Origin server
    let response = await fetch(request);
    
    // Copy headers so we can modify them
    let responseHeaders = new Headers(response.headers);

    // ==========================================
    // PHASE 2: Dynamic Header Modification
    // ==========================================
    // 1. Vary: User-Agent (crucial if serving dynamic content per device)
    responseHeaders.set('Vary', 'User-Agent, Accept-Encoding');
    
    // 2. Strict-Transport-Security (HSTS - SEO Security Signal)
    responseHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

    // 3. Inject Canonical Tag for non-HTML resources (e.g. PDFs)
    if (url.pathname.endsWith('.pdf')) {
        responseHeaders.set('Link', `<${url.origin}${url.pathname}>; rel="canonical"`);
    }

    // ==========================================
    // PHASE 3: Edge A/B SEO Split Testing
    // ==========================================
    // If it's an HTML page, we might run an A/B test
    const contentType = responseHeaders.get('Content-Type') || '';
    let cookie = request.headers.get('Cookie') || '';
    
    if (contentType.includes('text/html')) {
        // Determine A/B group (50/50 split based on cookie or random)
        let isVariantB = cookie.includes('seo_ab_test=B');
        
        if (!cookie.includes('seo_ab_test')) {
            // Assign a group if no cookie exists
            isVariantB = Math.random() < 0.5;
            responseHeaders.append('Set-Cookie', `seo_ab_test=${isVariantB ? 'B' : 'A'}; Path=/; HttpOnly`);
        }

        // Apply HTMLRewriter only if it's Variant B
        if (isVariantB) {
            response = new HTMLRewriter()
                .on('title', new ElementHandler())
                .on('h1', new ElementHandler())
                .transform(response);
        }
    }

    // Return the final modified response
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders
    });
}
