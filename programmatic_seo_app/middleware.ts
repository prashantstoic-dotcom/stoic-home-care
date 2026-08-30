import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ==============================================================================
// PROJECT 5 (PART 1): Edge SEO & Middleware Optimization
// Goal: Dynamic SEO & Security Headers at the Vercel Edge.
// ==============================================================================

export async function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl;

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

    // B. Bot Detection: Identify Search Engine Crawlers
    const userAgent = request.headers.get('user-agent') || '';
    const isBot = /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot/i.test(userAgent);
    
    // We create a standard response without modifying downstream request headers
    // modifying downstream request headers forces Vercel to bypass Edge Cache!
    const response = NextResponse.next();

    if (isBot) {
      response.headers.set('X-Is-Bot', 'true');
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
    // Optimized Vercel Edge Matcher
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
