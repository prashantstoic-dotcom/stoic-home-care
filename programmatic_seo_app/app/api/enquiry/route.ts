import { NextResponse } from 'next/server';
import { SUPABASE_URL, SUPABASE_KEY } from '@/lib/supabase';
import { enquirySchema } from '@/lib/validations';
import path from 'path';

/* ============================================================
   Stoic Home Care — app/api/enquiry/route.ts
   Saves enquiry + sends admin email + auto-reply with brochure
   ============================================================ */

// Simple In-Memory Rate Limiting (replaces $_SESSION)
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    // 1. IP-based Rate Limiting (1 request per 60 seconds)
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const lastRequestTime = rateLimitMap.get(ip);
    if (lastRequestTime && now - lastRequestTime < 60000) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please wait 60 seconds before sending another enquiry.' },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    // 2. Parse JSON Data
    const rawData = await request.json();

    // 3. Zod Validation
    const validatedFields = enquirySchema.safeParse(rawData);
    
    if (!validatedFields.success) {
      return NextResponse.json(
        { success: false, message: validatedFields.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, service, city, message } = validatedFields.data;

    // 3. Database Insertion (using Supabase REST API)
    const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/stoic_enquiries`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        service,
        city,
        message,
        status: 'pending'
      })
    });

    if (!supabaseRes.ok) {
      console.error("Supabase Enquiry Insert Failed", await supabaseRes.text());
      // Proceed to email even if DB fails, as a fallback mechanism
    }

    // 4. Nodemailer Setup (replaces PHPMailer)
    const nodemailer = (await import('nodemailer')).default;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: 'prashantstoic@gmail.com',
        pass: 'hwmb fwyi zhmo bczl', // App Password
      },
    });

    // 5. Admin Email
    try {
      await transporter.sendMail({
        from: '"Stoic Home Care" <prashantstoic@gmail.com>',
        to: 'stoichomecareservices@gmail.com',
        replyTo: email ? `"${name}" <${email}>` : undefined,
        subject: `New Enquiry Received from ${email || phone}`,
        html: `
        <h2 style='color:#0a7cff'>New Enquiry Received</h2>
        <table style='border-collapse:collapse;width:100%;font-family:Arial'>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Name</th><td style='padding:8px;border:1px solid #ddd'>${name}</td></tr>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Phone</th><td style='padding:8px;border:1px solid #ddd'>${phone}</td></tr>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px;border:1px solid #ddd'>Email</th><td style='padding:8px;border:1px solid #ddd'>${email}</td></tr>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Service</th><td style='padding:8px;border:1px solid #ddd'>${service}</td></tr>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px'>City</th><td style='padding:8px;border:1px solid #ddd'>${city}</td></tr>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Message</th><td style='padding:8px;border:1px solid #ddd'>${message}</td></tr>
        </table>
        `,
      });
    } catch (adminMailError) {
      console.error("Admin Mail Error:", adminMailError);
    }

    // 6. Client Auto-Reply Email
    if (email) {
      try {
        const brochurePath = path.join(process.cwd(), 'public', 'uploads', 'stoic.pdf');
        await transporter.sendMail({
          from: '"Stoic Home Care" <prashantstoic@gmail.com>',
          to: `"${name}" <${email}>`,
          subject: 'Thank you for contacting Stoic Home Care',
          html: `
            <p>Dear ${name},</p>
            <p>Thank you for contacting <b>Stoic Home Care</b>.</p>
            <p>We have received your enquiry regarding <b>${service}</b>.  
            Our care coordinator will contact you shortly.</p>
            <p>Please find attached our brochure for detailed services and care programs.</p>
            <br>
            <p>
            Warm regards,<br>
            <b>Stoic Home Care Team</b><br>
            📞 +91-7668232867<br>
            🌐 www.stoiccare.in
            </p>
          `,
          attachments: [
            {
              filename: 'Stoic-Home Care-Brochure.pdf',
              path: brochurePath, 
            }
          ]
        });
      } catch (clientMailError) {
        console.error("Client Mail Error:", clientMailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully'
    });

  } catch (error) {
    console.error('Database/Server Error:', error);
    return NextResponse.json(
      { success: false, message: 'Database error. Please call directly.' },
      { status: 500 }
    );
  }
}
