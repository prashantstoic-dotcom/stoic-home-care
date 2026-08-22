import { NextResponse } from 'next/server';
import { getBigQueryClient } from '@/lib/bigquery';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Basic Auth Check (In production, use a secure webhook token)
    const secret = process.env.BIGQUERY_SYNC_SECRET || process.env.ADMIN_API_SECRET || 'fallback-secret';
    const authHeader = request.headers.get('Authorization');
    // #region agent log
    fetch('http://127.0.0.1:7327/ingest/c018628c-d33c-464b-ad58-f99b37908c6e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c52aa0'},body:JSON.stringify({sessionId:'c52aa0',location:'app/api/sync-bigquery/route.ts:POST',message:'sync-bigquery auth check',data:{hasAuthHeader:!!authHeader,secretDefined:typeof secret==='string'},timestamp:Date.now(),hypothesisId:'B',runId:'post-fix'})}).catch(()=>{});
    // #endregion
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const records = body.records; // Expecting an array of daily traffic data

    if (!records || !Array.isArray(records)) {
      return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
    }

    const bq = getBigQueryClient();
    const dataset = bq.dataset('seo_analytics');
    const table = dataset.table('daily_seo_traffic');

    // Insert rows into BigQuery
    await table.insert(records);

    return NextResponse.json({
      success: true,
      message: `Successfully synced records to BigQuery.`
    });

  } catch (error: any) {
    console.error('BigQuery Sync Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to sync data to BigQuery.',
      error: error.message
    }, { status: 500 });
  }
}

