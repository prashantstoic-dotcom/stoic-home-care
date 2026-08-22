import { NextResponse } from 'next/server';
import { verifyAdminAction } from '@/lib/auth-actions';
import { qstashClient } from '@/lib/upstash';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // 1. Authenticate Admin (Security First)
    const token = cookies().get('admin_token')?.value;
    const isAdmin = await verifyAdminAction(token || '');
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Request Body
    const body = await request.json();
    const { targetKeyword } = body;

    if (!targetKeyword) {
      return NextResponse.json({ error: 'targetKeyword is required' }, { status: 400 });
    }

    // 3. Define the background job endpoint (Part 1.2 will handle this)
    // In production, this should be the absolute URL of your deployment (e.g., https://your-domain.com/api/admin/process-scraping)
    // VERCEL_URL is provided by Vercel automatically.
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const destinationUrl = `${baseUrl}/api/admin/process-scraping`;

    // 4. Publish Message to QStash (Trigger the Background Job)
    const res = await qstashClient.publishJSON({
      url: destinationUrl,
      body: { keyword: targetKeyword },
      retries: 3, // Exponential backoff setup for 429 Too Many Requests
    });

    return NextResponse.json({
      success: true,
      message: 'Background scraping job successfully queued!',
      messageId: res.messageId,
    });
  } catch (error: any) {
    console.error('QStash Trigger Error:', error);
    return NextResponse.json(
      { error: 'Failed to queue scraping job', details: error.message },
      { status: 500 }
    );
  }
}
