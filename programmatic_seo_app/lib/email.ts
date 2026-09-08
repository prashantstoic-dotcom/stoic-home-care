"use server";

import nodemailer from 'nodemailer';

const ADMIN_EMAIL = "stoichomecareservices@gmail.com";
const FROM_EMAIL = '"Stoic Home Care" <prashantstoic@gmail.com>';

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail(to: string, subject: string, html: string, replyTo?: string, attachments?: any[]) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject,
    html,
    replyTo,
    attachments
  });
}

async function safeEmailDispatcher(taskName: string, taskFn: () => Promise<void>) {
  try {
    await taskFn();
    console.log(`[Email Dispatcher] Success: ${taskName}`);
  } catch (error) {
    console.error(`[Email Dispatcher] Failed: ${taskName}`, error);
  }
}

export async function sendAdminAlert(subject: string, html: string, replyTo?: string) {
  return safeEmailDispatcher('Admin Alert', async () => {
    await sendEmail(ADMIN_EMAIL, subject, html, replyTo);
  });
}

export async function sendClientConfirmation(toEmail: string, clientName: string, serviceInterest: string) {
  return safeEmailDispatcher('Client Confirmation', async () => {
    const safeName = escapeHtml(clientName);
    const safeService = escapeHtml(serviceInterest);
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Reaching Out to Stoic Home Care</h2>
        <p>Dear ${safeName},</p>
        <p>We have received your enquiry regarding <strong>${safeService}</strong>. One of our care coordinators will contact you shortly.</p>
        <p>In the meantime, you can download our comprehensive care brochure here:</p>
        <p><a href="https://stoiccare.in/uploads/stoic.pdf" style="display: inline-block; padding: 10px 20px; background-color: #0a7cff; color: #ffffff; text-decoration: none; border-radius: 5px;">Download Stoic Home Care Brochure</a></p>
        <p>Best Regards,<br/>Stoic Home Care Team</p>
      </div>
    `;
    
    await sendEmail(toEmail, "Thank you for contacting Stoic Home Care", html);
  });
}
