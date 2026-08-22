import { NextResponse } from 'next/server';
import { getGSCAuth } from '@/lib/gsc';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    // 1. Fetch URLs currently being tracked
    const { data: pages, error } = await supabase
      .from('seo_pages')
      .select('*')
      .eq('status', 'tracking');

    if (error || !pages) throw new Error("Failed to fetch tracking pages.");
    if (pages.length === 0) return NextResponse.json({ message: "No pages to track right now." });

    const webmasters = getGSCAuth();
    const siteUrl = process.env.GSC_SITE_URL || "https://example.com"; 

    const today = new Date();
    
    // Last 30 Days (Standard Period - GSC is ~2 days behind)
    const endCurrent = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);
    const startCurrent = new Date(endCurrent.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Previous 30 Days (Baseline Period)
    const endPrevious = new Date(startCurrent.getTime() - 1 * 24 * 60 * 60 * 1000);
    const startPrevious = new Date(endPrevious.getTime() - 30 * 24 * 60 * 60 * 1000);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    // Part 9.2.2: GSC API Fetch Logic
    const results = [];

    for (const page of pages) {
      // 1st Call: Current 30 days
      const currentRes = await webmasters.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: formatDate(startCurrent),
          endDate: formatDate(endCurrent),
          dimensions: ['page'],
          dimensionFilterGroups: [{
            filters: [{ dimension: 'page', operator: 'equals', expression: page.url }]
          }],
          rowLimit: 1
        }
      });

      // 2nd Call: Previous 30 days
      const previousRes = await webmasters.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: formatDate(startPrevious),
          endDate: formatDate(endPrevious),
          dimensions: ['page'],
          dimensionFilterGroups: [{
            filters: [{ dimension: 'page', operator: 'equals', expression: page.url }]
          }],
          rowLimit: 1
        }
      });

      const currentStats = currentRes.data.rows && currentRes.data.rows.length > 0 ? currentRes.data.rows[0] : { clicks: 0, position: 100, ctr: 0 };
      const prevStats = previousRes.data.rows && previousRes.data.rows.length > 0 ? previousRes.data.rows[0] : { clicks: 0, position: 100, ctr: 0 };

      // Part 9.2.3: Data Math (Calculating the Drops)
      
      // Position logic: Lower number is better.
      // If prev = 3, current = 6. Drop = 6 - 3 = +3 positions dropped (worse).
      const positionDrop = (currentStats.position || 100) - (prevStats.position || 100); 
      
      // CTR logic: Percentage decrease
      let ctrDropPercentage = 0;
      if (prevStats.ctr && prevStats.ctr > 0) {
        ctrDropPercentage = (((prevStats.ctr - (currentStats.ctr || 0)) / prevStats.ctr) * 100);
      }

      // Part 9.2.4: Threshold Logic
      const POSITION_DROP_THRESHOLD = 2.0; // Dropped by 2 or more spots
      const CTR_DROP_THRESHOLD = 20.0;     // Dropped by 20% or more

      // We only consider it decaying if it actually had some baseline traffic/ranking.
      const hasBaseline = (prevStats.position || 100) < 50; 
      
      const isDecaying = hasBaseline && (
        positionDrop >= POSITION_DROP_THRESHOLD || 
        ctrDropPercentage >= CTR_DROP_THRESHOLD
      );

      // Part 9.2.5 & 9.2.6: Database Logging & Alerting
      if (isDecaying) {
        // 1. Insert into decay logs
        await supabase.from('seo_decay_logs').insert({
          page_id: page.id,
          position_drop: Number(positionDrop.toFixed(2)),
          ctr_drop_percentage: Number(ctrDropPercentage.toFixed(2)),
          status: 'needs_healing'
        });

        // 2. Update page status
        await supabase.from('seo_pages')
          .update({ status: 'decaying', last_checked_at: new Date().toISOString() })
          .eq('id', page.id);
          
        console.log(`🚨 ALERT: Content Decay Detected on ${page.url}. Position Drop: ${positionDrop.toFixed(2)} spots.`);
      } else {
        // Just update last checked time
        await supabase.from('seo_pages')
          .update({ last_checked_at: new Date().toISOString() })
          .eq('id', page.id);
      }

      results.push({
        page_id: page.id,
        url: page.url,
        keyword: page.target_keyword,
        current: { clicks: currentStats.clicks || 0, position: currentStats.position || 100, ctr: currentStats.ctr || 0 },
        previous: { clicks: prevStats.clicks || 0, position: prevStats.position || 100, ctr: prevStats.ctr || 0 },
        metrics: {
          positionDrop: Number(positionDrop.toFixed(2)),
          ctrDropPercentage: Number(ctrDropPercentage.toFixed(2)),
          isDecaying
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Radar sweep completed successfully.",
      data: results 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
