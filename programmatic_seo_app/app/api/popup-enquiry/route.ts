import { NextResponse } from 'next/server';
import { SUPABASE_URL, SUPABASE_KEY } from '@/lib/supabase';
import { popupEnquirySchema } from '@/lib/validations';
import { sendAdminAlert } from '@/lib/email';

// Simple in-memory rate store (resets on server restart, but suitable for basic 60s cooldown)
const rateLimitStore = new Map<string, number>();

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (60s cooldown per IP)
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const lastRequest = rateLimitStore.get(ip);

    if (lastRequest && now - lastRequest < 60000) {
      return NextResponse.json({ success: false, message: 'Please wait 60 seconds before submitting again.' }, { status: 429 });
    }
    rateLimitStore.set(ip, now);

    // 2. Parse and Validate
    const body = await req.json();
    const validatedData = popupEnquirySchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ success: false, message: validatedData.error.errors[0].message }, { status: 400 });
    }

    const { name, phone, service_interest } = validatedData.data;

    // 3. Save to Supabase popup_enquiries table
    const res = await fetch(`${SUPABASE_URL}/rest/v1/popup_enquiries`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name,
        phone,
        service_interest,
        created_at: new Date().toISOString()
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Popup enquiry DB error:", errorText);
      return NextResponse.json({ success: false, message: 'Database error. Please call us directly.' }, { status: 500 });
    }

    // 4. Send High Priority Admin Alert
    const adminHtml = `
      <h2 style="color: #d9534f;">🚨 Quick Callback Request (12s Popup)</h2>
      <p>A new lead needs immediate contact:</p>
      <table border="1" cellpadding="8" style="border-collapse:collapse; width: 100%;">
        <tr><th style="background:#f9f9f9;">Name</th><td>${name}</td></tr>
        <tr><th style="background:#f9f9f9;">Phone</th><td>${phone}</td></tr>
        <tr><th style="background:#f9f9f9;">Interested In</th><td>${service_interest || 'General'}</td></tr>
      </table>
      <br />
      <div style="margin-top: 20px;">
        <a href="tel:${phone}" style="background-color: #0275d8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">📞 Call Back Now</a>
        <a href="https://wa.me/91${phone.replace(/\D/g, '').substring(phone.replace(/\D/g, '').length - 10)}" style="background-color: #5cb85c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">💬 WhatsApp Lead</a>
      </div>
    `;

    // Non-blocking email dispatch
    sendAdminAlert(`🚨 QUICK CALLBACK LEAD: ${name} (${phone})`, adminHtml);

    return NextResponse.json({ success: true, message: 'Thanks! We are calling you right away.' });

  } catch (error: any) {
    console.error("Popup Enquiry API Error:", error);
    return NextResponse.json({ success: false, message: 'Server error. Please call us directly.' }, { status: 500 });
  }
}
