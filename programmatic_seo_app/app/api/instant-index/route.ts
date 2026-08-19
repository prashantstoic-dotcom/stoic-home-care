import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import crypto from 'crypto';

// Prevent caching for this utility route
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { url, type = 'URL_UPDATED' } = await request.json();

    if (!url) {
      return NextResponse.json({ success: false, message: 'URL is required' }, { status: 400 });
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); 

    // Fallback logic
    if (!clientEmail || !privateKey) {
      console.warn('GCP Indexing API Keys not found. Falling back to Ping Sitemap.');
      const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://stoiccare.in';
      const pingFallback = await fetch(`${origin}/api/ping-sitemap`);
      return NextResponse.json({
        success: true,
        message: 'GCP keys missing. Fallback to Sitemap Ping triggered successfully.',
        fallbackResult: await pingFallback.json()
      });
    }

    // Generate JWT
    const token = await new SignJWT({
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000)
    })
      .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
      .sign(crypto.createPrivateKey(privateKey));

    // Get Access Token
    const authRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token
      })
    });

    const authData = await authRes.json();
    if (!authRes.ok) {
      throw new Error(`Google Auth Failed: ${authData.error_description || authData.error}`);
    }

    // Publish to Indexing API
    const indexingRes = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authData.access_token}`
      },
      body: JSON.stringify({ url: url, type: type })
    });

    const indexingData = await indexingRes.json();
    if (!indexingRes.ok) {
      throw new Error(`Indexing API Failed: ${indexingData.error?.message}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully submitted URL to Google Indexing API',
      data: indexingData
    });

  } catch (error: any) {
    console.error('Instant index error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred while submitting URL to Google Indexing API.',
      error: error.message
    }, { status: 500 });
  }
}

