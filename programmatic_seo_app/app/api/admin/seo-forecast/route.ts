import { NextResponse } from 'next/server';
import { getBigQueryClient } from '@/lib/bigquery';
import { verifyAdminAction } from '@/lib/auth-actions';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // 1. Verify Admin token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('admin_session')?.value;
    const isAdmin = await verifyAdminAction(token || '');
    
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    // 2. Query BigQuery ML Model for 14-day horizon
    const bq = getBigQueryClient();
    const query = `
      SELECT
        page_url,
        CAST(forecast_timestamp AS STRING) as forecast_date,
        CAST(ROUND(forecast_value) AS INT64) as expected_clicks
      FROM
        ML.FORECAST(MODEL \`seo_analytics.traffic_forecaster_model\`, STRUCT(14 AS horizon))
      ORDER BY page_url, forecast_timestamp ASC
    `;

    const [job] = await bq.createQueryJob({ query: query });
    const [rows] = await job.getQueryResults();

    return NextResponse.json({
      success: true,
      data: rows
    });

  } catch (error: any) {
    console.error('SEO Forecast API Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch SEO predictions from BigQuery ML.',
      error: error.message
    }, { status: 500 });
  }
}

