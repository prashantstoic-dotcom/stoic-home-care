import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Basic verification of incoming Vercel log payload
    const authHeader = request.headers.get('Authorization');
    const secret = process.env.VERCEL_LOG_DRAIN_SECRET || 'fallback-secret';
    
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ success: false, message: 'Unauthorized Log Drain Payload' }, { status: 401 });
    }

    const payload = await request.json();
    if (!payload || !Array.isArray(payload)) {
      return NextResponse.json({ success: false, message: 'Invalid payload format' }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const botLogsToInsert: any[] = [];

    // Filter Vercel NDJSON payloads for Googlebot/Bingbot activity
    for (const log of payload) {
      if (log.type === 'request' && log.proxy) {
        const userAgent = log.proxy.userAgent || '';
        const isBot = /Googlebot|Bingbot|YandexBot/i.test(userAgent);
        
        if (isBot) {
          let botType = 'Unknown Bot';
          if (userAgent.includes('Googlebot')) botType = 'Googlebot';
          else if (userAgent.includes('Bingbot')) botType = 'Bingbot';
          else if (userAgent.includes('YandexBot')) botType = 'YandexBot';

          botLogsToInsert.push({
            bot_type: botType,
            url_path: log.proxy.path,
            status_code: log.proxy.statusCode,
            response_time_ms: log.proxy.duration || 0,
            is_verified_bot: true,
            created_at: new Date(log.timestamp).toISOString()
          });
        }
      }
    }

    if (botLogsToInsert.length > 0) {
      const { error } = await supabase
        .from('seo_server_logs')
        .insert(botLogsToInsert);

      if (error) {
        throw error;
      }
    }

    return NextResponse.json({ success: true, processed_logs: botLogsToInsert.length });

  } catch (error: any) {
    console.error('Bot Log Processor Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

