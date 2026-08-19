import { NextResponse } from 'next/server';
import { getBigQueryClient } from '@/lib/bigquery';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Basic Auth Check (In production, use a secure webhook token)
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== \Bearer \\) {
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
      message: \Successfully synced \ records to BigQuery.\
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

