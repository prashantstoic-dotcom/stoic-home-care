import { NextResponse } from 'next/server';
import { getGSCAuth } from '@/lib/gsc';

export async function GET() {
  try {
    const webmasters = getGSCAuth();

    // Fetch the list of sites this service account has access to
    const response = await webmasters.sites.list();

    const sites = response.data.siteEntry || [];
    
    return NextResponse.json({ 
      success: true, 
      message: "GSC API successfully authenticated!",
      sites_accessible: sites.map(site => site.siteUrl),
      action_needed: sites.length === 0 
        ? "⚠️ You have not added the service account email to your Google Search Console as a restricted user yet." 
        : "✅ All good! Ready for the SEO Decay Radar."
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: "GSC Authentication Failed.",
      details: error.message 
    }, { status: 500 });
  }
}
