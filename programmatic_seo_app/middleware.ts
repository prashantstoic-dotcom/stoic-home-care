import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ==============================================================================
// PROJECT 5 (PART 1): Edge SEO & Middleware Optimization
// Goal: Dynamic SEO & Security Headers at the Vercel Edge.
// ==============================================================================

export async function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl;
    
    // Clone the request headers so we can modify them
    const requestHeaders = new Headers(request.headers);

    // ----------------------------------------------------------------------------
    // 0. Scalable Edge Redirects (Duplicate Content & Migrations)
    // ----------------------------------------------------------------------------
    
    // A. Lowercase Enforcement: If the URL contains uppercase letters, redirect to lowercase.
    if (url.pathname !== url.pathname.toLowerCase()) {
      url.pathname = url.pathname.toLowerCase();
      return NextResponse.redirect(url, { status: 301 });
    }

    // B. Trailing Slash Fix: Remove trailing slash if present (except for root '/')
    if (url.pathname.endsWith('/') && url.pathname.length > 1) {
      url.pathname = url.pathname.slice(0, -1);
      return NextResponse.redirect(url, { status: 301 });
    }

    // C. Regex Pattern Mappings (Migration Example)
    // Clean URL Migration: If your old website used .php or .html extensions,
    // this instantly redirects them to the clean Next.js URLs (e.g., /about.php -> /about)
    const legacyExtensionRegex = /^(.*)\.(php|html)$/i;
    if (legacyExtensionRegex.test(url.pathname)) {
      url.pathname = url.pathname.replace(legacyExtensionRegex, '$1');
      return NextResponse.redirect(url, { status: 301 });
    }

    // ----------------------------------------------------------------------------
    // 0.5. Admin Panel Authentication
    // ----------------------------------------------------------------------------
    
    if (url.pathname.startsWith('/admin')) {
      if (url.pathname !== '/admin/login') {
        const token = request.cookies.get('admin_session');
        if (!token) {
          const loginUrl = new URL('/admin/login', request.url);
          return NextResponse.redirect(loginUrl);
        }
        
        // Note: We only check for the PRESENCE of the token in Edge Middleware.
        // The actual cryptographic verification (jwtVerify) should happen inside 
        // the Server Components (Node.js runtime) to avoid Vercel Edge crashes.
      }
    }

    // ----------------------------------------------------------------------------
    // 1. Bot Routing & Edge A/B Testing Engine
    // ----------------------------------------------------------------------------

    // A. Bot Detection: Identify Search Engine Crawlers
    const userAgent = request.headers.get('user-agent') || '';
    const isBot = /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot/i.test(userAgent);
    if (isBot) {
      // Append a custom header to the *request* so Server Components can read it
      requestHeaders.set('X-Is-Bot', 'true');
    }

    // B. Edge A/B Testing Engine (50/50 Split)
    let abVariant = request.cookies.get('ab-test-variant')?.value;
    let isNewVariant = false;
    
    if (!abVariant) {
      abVariant = Math.random() < 0.5 ? 'A' : 'B';
      isNewVariant = true;
    }
    
    // Pass the variant as a header to the request
    requestHeaders.set('X-AB-Version', abVariant);

    // Now create the response, passing the modified request headers downstream
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // If we generated a new variant, set it in the response cookies
    if (isNewVariant) {
      response.cookies.set('ab-test-variant', abVariant, { path: '/', maxAge: 60 * 60 * 24 * 30 }); // 30 Days
    }

    // ----------------------------------------------------------------------------
    // 2. Dynamic SEO Headers (Crawl Budget Protection)
    // ----------------------------------------------------------------------------
    
    // Protect API routes and specific file types from being indexed by search engines.
    if (url.pathname.startsWith('/api/') || url.pathname.endsWith('.pdf') || url.pathname.endsWith('.json')) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    }

    // Faceted Navigation Control: If URL has query parameters like ?sort= or ?filter=
    // We signal that this is a dynamically sorted page and shouldn't be indexed to avoid duplicate content.
    if (url.searchParams.has('sort') || url.searchParams.has('filter')) {
      response.headers.set('X-Robots-Tag', 'noindex');
      response.headers.set('X-Canonical-Override', `${url.origin}${url.pathname}`);
    }

    // ----------------------------------------------------------------------------
    // 3. Production-Grade Security Headers (SEO Rank Signal)
    // ----------------------------------------------------------------------------
    
    // Prevents the browser from guessing the MIME type, reducing XSS risks.
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
    // Controls how much referrer information (sent with the Referer header) should be included with requests.
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Protects against Clickjacking attacks by ensuring the site cannot be embedded in an iframe.
    response.headers.set('X-Frame-Options', 'DENY');
    
    // Enforces secure (HTTP over SSL/TLS) connections to the server.
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Enables the Cross-Site Scripting (XSS) filter built into most modern web browsers.
    response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;
  } catch (error) {
    // ZERO ERROR POLICY: Prevent Edge Middleware from ever returning a 500 crash
    console.error('Middleware execution error (caught by Zero Error Policy):', error);
    return NextResponse.next(); // Fail open: allow the request to proceed without middleware enhancements
  }
}

// Ensure the middleware runs only on relevant paths, optimizing Edge performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (SEO files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
