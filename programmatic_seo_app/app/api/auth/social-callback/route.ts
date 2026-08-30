import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    const code = searchParams.get('code');
    const state = searchParams.get('state'); // Typically contains the platform name, e.g., 'linkedin' or 'twitter'
    const error = searchParams.get('error');

    if (error) {
      console.error(`[Social Auth] OAuth Error received: ${error}`);
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    if (!code) {
      return NextResponse.json({ success: false, error: "Missing authorization code." }, { status: 400 });
    }

    console.log(`[Social Auth] Received OAuth callback for platform state: ${state}`);
    console.log(`[Social Auth] Auth Code: ${code.substring(0, 5)}...`);

    // In a production environment, you would exchange this 'code' for an 'access_token'
    // by making a POST request back to the respective platform (LinkedIn/Twitter),
    // and then save that new access_token securely into your Supabase database.

    // For now, we acknowledge receipt to prevent the OAuth window from hanging.
    return NextResponse.json({
      success: true,
      message: "Authorization successful. You can close this window.",
      platform: state
    });

  } catch (error: any) {
    console.error(`[Social Auth] Callback processing failed:`, error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
