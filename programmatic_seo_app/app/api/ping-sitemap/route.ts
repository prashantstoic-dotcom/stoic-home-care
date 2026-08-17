import { NextResponse } from 'next/server';

// Prevent caching for this utility route
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://stoiccare.in";
    const sitemapUrl = `${origin}/sitemap.xml`;
    
    // Google's ping endpoint for sitemaps
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

    const response = await fetch(pingUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'StoicHomeCare-NextJS-Bot',
      },
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Successfully pinged Google Search Console',
        sitemapUrl,
        statusCode: response.status
      });
    } else {
      console.warn(`Failed to ping Google. Status: ${response.status}`);
      return NextResponse.json({
        success: false,
        message: 'Failed to ping Google Search Console',
        sitemapUrl,
        statusCode: response.status
      }, { status: response.status });
    }

  } catch (error: any) {
    console.error("Ping sitemap error:", error);
    // Zero Error Policy: Safely catch fetch errors (e.g. DNS issues) and return JSON
    return NextResponse.json({
      success: false,
      message: 'Server error occurred while attempting to ping sitemap.',
      error: error.message
    }, { status: 500 });
  }
}
