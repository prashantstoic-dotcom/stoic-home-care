import fs from "fs";
import path from "path";

let transporterInstance: any = null;

async function getTransporter() {
  if (!transporterInstance) {
    // Hide the require from Webpack to prevent it from bundling nodemailer
    // and causing the '__dirname is not defined' error in Server Actions.
    const moduleName = "nodemailer";
    const nodemailer = require(moduleName);
    transporterInstance = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporterInstance;
}

export const ADMIN_EMAIL = "stoichomecareservices@gmail.com";
export const FROM_EMAIL = '"Stoic Home Care" <prashantstoic@gmail.com>';

/**
 * Sends an email alert to the admin.
 */
export async function sendAdminAlert(
  subject: string,
  htmlBody: string,
  replyTo?: string
) {
  try {
    const transporter = await getTransporter();
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: replyTo,
      subject: subject,
      html: htmlBody,
    });
    console.log(`Admin alert sent: ${subject}`);
  } catch (error) {
    // Zero Error Policy: Log the error but don't crash the application
    console.error("Error sending admin email:", error);
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
  try {
    // Determine path to the PDF brochure.
    const brochurePath = path.join(process.cwd(), "public", "uploads", "stoic.pdf");
    
    const attachments = [];
    // Zero Error Policy: Check if brochure exists before attaching to prevent crashes
    if (fs.existsSync(brochurePath)) {
      attachments.push({
        filename: "stoic.pdf",
        path: brochurePath,
      });
    } else {
      console.warn("Brochure not found at", brochurePath);
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

    const transporter = await getTransporter();
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: clientEmail,
      subject: "Thank you for contacting Stoic Home Care",
      html: htmlBody,
      attachments: attachments,
    });
    console.log(`Client confirmation sent to: ${clientEmail}`);
  } catch (error) {
    // Zero Error Policy: Log the error but don't crash the application
    console.error("Error sending client confirmation email:", error);
  }
}
