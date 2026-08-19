"use server"; // Enforce this file runs ONLY in Node.js runtime, clearing Edge bundling warnings

import fs from "fs";
import path from "path";
// Standard imports
const ADMIN_EMAIL = "stoichomecareservices@gmail.com";
const FROM_EMAIL = '"Stoic Home Care" <prashantstoic@gmail.com>';

// ============================================================================
// PART 2: MODERN EDGE HTTP API (Primary Email System via Resend)
// ============================================================================
async function sendEmailViaHTTP(
  to: string,
  subject: string,
  html: string,
  replyTo?: string,
  attachments?: any[]
) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY; 
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing in environment variables");
  }

  // Formatting attachments for Resend API if provided
  let formattedAttachments = undefined;
  if (attachments && attachments.length > 0) {
    formattedAttachments = attachments.map(att => {
      // Read file to base64 if it's a file path
      const content = fs.readFileSync(att.path).toString("base64");
      return {
        filename: att.filename,
        content: content,
      };
    });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev", // Note: Replace with verified domain in production
      to: [to],
      reply_to: replyTo,
      subject: subject,
      html: html,
      attachments: formattedAttachments,
    }),
  });

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`HTTP Email Failed: ${errorData}`);
  }
}

// ============================================================================
// ZERO ERROR POLICY WRAPPER
// ============================================================================
async function safeEmailDispatcher(
  to: string,
  subject: string,
  html: string,
  replyTo?: string,
  attachments?: any[]
) {
  try {
    if (process.env.RESEND_API_KEY) {
      await sendEmailViaHTTP(to, subject, html, replyTo, attachments);
      return true;
    } else {
      throw new Error("Skipping HTTP API (Key Missing)");
    }
  } catch (httpError: any) {
    // ZERO ERROR POLICY: Catch all failures so the main app NEVER crashes.
    console.error(`[Zero Error Policy] FATAL: Email failed for ${to}. Error:`, httpError);
    return false; // Fail gracefully
  }
}

// ============================================================================
// EXPORTED FUNCTIONS
// ============================================================================

/**
 * Sends an email alert to the admin.
 */
export async function sendAdminAlert(
  subject: string,
  htmlBody: string,
  replyTo?: string
) {
  const success = await safeEmailDispatcher(ADMIN_EMAIL, subject, htmlBody, replyTo);
  if (success) {
    console.log(`Admin alert safely dispatched: ${subject}`);
  }
}

/**
 * Sends an auto-reply confirmation to the client with the company PDF brochure attached.
 */
export async function sendClientConfirmation(
  clientEmail: string,
  clientName: string,
  serviceName: string
) {
  // Determine path to the PDF brochure.
  const brochurePath = path.join(process.cwd(), "public", "uploads", "stoic.pdf");
  const attachments = [];
  
  if (fs.existsSync(brochurePath)) {
    attachments.push({
      filename: "stoic.pdf",
      path: brochurePath,
    });
  } else {
    console.warn("[Zero Error Policy] Brochure not found at", brochurePath);
  }

  const htmlBody = `
    Dear ${clientName},<br><br>

    Thank you for choosing <b>Stoic Home Care</b>.<br><br>

    Your request for <b>${serviceName}</b> has been received.<br>
    Our care coordinator will contact you shortly.<br><br>

    Please find our company brochure attached for more details.<br><br>

    Regards,<br>
    <b>Stoic Home Care Team</b><br>
    https://stoiccare.in
  `;

  const success = await safeEmailDispatcher(clientEmail, "Thank you for contacting Stoic Home Care", htmlBody, undefined, attachments);
  if (success) {
    console.log(`Client confirmation safely dispatched to: ${clientEmail}`);
  }
}
