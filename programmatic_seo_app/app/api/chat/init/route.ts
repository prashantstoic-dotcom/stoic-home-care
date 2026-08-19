import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// We use the service role key because unauthenticated visitors are creating rows
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // Extract IP and User-Agent from headers
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Insert a new chat session
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert([
        {
          visitor_ip: ip,
          user_agent: userAgent,
          status: 'active'
        }
      ])
      .select('id')
      .single();

    if (error || !data) {
      console.error("[Chat Init] DB Error:", error);
      return NextResponse.json({ success: false, error: "Failed to initialize session" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      session_id: data.id 
    });

  } catch (error: any) {
    console.error(`[Chat Init] Server Error:`, error.message);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
