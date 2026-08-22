import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { extractAllSitemapUrls } from '@/lib/sitemap-parser';
import { verifyAdminAction } from '@/lib/auth-actions';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('admin_session')?.value;
    const isAdmin = await verifyAdminAction(token || '');
    
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://stoiccare.in';
    
    // 1. Get Official URLs from Sitemap
    const sitemapUrls = await extractAllSitemapUrls(origin);
    
    // Normalize sitemap URLs (remove origin, ensure leading slash)
    const normalizedSitemapPaths = sitemapUrls.map(url => {
      try {
        return new URL(url).pathname;
      } catch {
        return url;
      }
    });

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 2. Get Crawled URLs from Database Logs
    const { data: logs, error: logsError } = await supabase
      .from('seo_server_logs')
      .select('url_path')
      .eq('is_verified_bot', true);

    if (logsError) throw logsError;

    // Extract unique crawled paths
    const crawledPaths = new Set(logs.map(log => log.url_path));

    // 3. Find the Difference (A - B)
    const orphans = normalizedSitemapPaths.filter(path => !crawledPaths.has(path));

    // 4. Update the seo_orphan_pages table
    const orphanInsertData = orphans.map(path => ({
      url_path: path,
      crawl_count: 0,
      status_code: 'UNCRAWLED',
      updated_at: new Date().toISOString()
    }));

    if (orphanInsertData.length > 0) {
      // Upsert: update existing, insert new
      await supabase.from('seo_orphan_pages').upsert(orphanInsertData, { onConflict: 'url_path' });
    }

    // Optional: Clean up pages that were orphans but are now crawled
    if (crawledPaths.size > 0) {
      await supabase
        .from('seo_orphan_pages')
        .delete()
        .in('url_path', Array.from(crawledPaths));
    }

    return NextResponse.json({
      success: true,
      total_sitemap_urls: normalizedSitemapPaths.length,
      total_crawled_urls: crawledPaths.size,
      orphan_pages_count: orphans.length,
      orphans: orphans.slice(0, 100) // Return only first 100 in API response to avoid payload bloat
    });

  } catch (error: any) {
    console.error('Orphan Pages API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

