<?php
/* ============================================================
   Stoic Home Care — api/popup_enquiry.php
   Quick popup enquiry — sends lead to pariverma188@gmail.com
   ============================================================ */

header('Content-Type: application/json');

define('ROOT', dirname(__DIR__));

require_once ROOT . '/config/config.php';
require_once ROOT . '/config/db.php';
require_once ROOT . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/* ── Validate request ── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

/* ── Sanitize ── */
function clean_popup($val) {
    return htmlspecialchars(trim($val), ENT_QUOTES, 'UTF-8');
}

$name  = clean_popup($_POST['name']  ?? '');
$phone = clean_popup($_POST['phone'] ?? '');

/* ── Validate ── */
if (!$name || !$phone) {
    echo json_encode(['success' => false, 'message' => 'Name and phone are required.']);
    exit;
}

if (!preg_match('/^[6-9][0-9]{9}$/', $phone)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid 10-digit Indian mobile number.']);
    exit;
}

/* ── Save to DB (creates table if missing) ── */
try {
    $db = getDB();

    $db->exec("
        CREATE TABLE IF NOT EXISTS popup_enquiries (
            id        INT AUTO_INCREMENT PRIMARY KEY,
            name      VARCHAR(150) NOT NULL,
            phone     VARCHAR(15)  NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    $stmt = $db->prepare("INSERT INTO popup_enquiries (name, phone) VALUES (:name, :phone)");
    $stmt->execute([':name' => $name, ':phone' => $phone]);
    $enquiryId = $db->lastInsertId();

} catch (Exception $e) {
    error_log('Popup Enquiry DB Error: ' . $e->getMessage());
    $enquiryId = 'N/A';
}

/* ── Send email via PHPMailer (same SMTP as book_service.php) ── */
try {
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'prashantstoic@gmail.com';
    $mail->Password   = 'hwmb fwyi zhmo bczl';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('prashantstoic@gmail.com', 'Stoic Home Care');
    $mail->addAddress('stoicHome Careservices@gmail.com');
   

    $mail->isHTML(true);
    $mail->Subject = "New Popup Callback Request — {$name}";

    $date = date('d M Y, h:i A');

    $mail->Body = "
    <!DOCTYPE html>
    <html>
    <body style='font-family:Arial,sans-serif;background:#f4f4f4;padding:24px;margin:0;'>
      <div style='max-width:480px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e0e0e0;'>
        <div style='height:4px;background:#1D9E75;'></div>
        <div style='background:#0CB8C9;padding:24px;text-align:center;'>
          <h2 style='color:#fff;margin:0;font-size:20px;'>New Callback Request</h2>
          <p style='color:rgba(255,255,255,.85);margin:6px 0 0;font-size:13px;'>Stoic Home Care — Quick Popup Enquiry</p>
        </div>
        <div style='padding:28px;'>
          <table style='width:100%;border-collapse:collapse;font-size:15px;'>
            <tr>
              <td style='padding:12px 0;color:#888;width:110px;border-bottom:1px solid #f0f0f0;'>Enquiry #</td>
              <td style='padding:12px 0;font-weight:700;color:#222;border-bottom:1px solid #f0f0f0;'>#" . $enquiryId . "</td>
            </tr>
            <tr>
              <td style='padding:12px 0;color:#888;border-bottom:1px solid #f0f0f0;'>Name</td>
              <td style='padding:12px 0;font-weight:700;color:#222;border-bottom:1px solid #f0f0f0;'>{$name}</td>
            </tr>
            <tr>
              <td style='padding:12px 0;color:#888;border-bottom:1px solid #f0f0f0;'>Phone</td>
              <td style='padding:12px 0;font-weight:700;color:#0CB8C9;font-size:18px;border-bottom:1px solid #f0f0f0;'>+91 {$phone}</td>
            </tr>
            <tr>
              <td style='padding:12px 0;color:#888;'>Received</td>
              <td style='padding:12px 0;color:#555;'>{$date}</td>
            </tr>
          </table>
          <a href='tel:+91{$phone}'
             style='display:block;margin-top:24px;background:#0CB8C9;color:#fff;text-align:center;padding:15px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;'>
            📞 &nbsp;Call Back Now
          </a>
          <a href='https://wa.me/91{$phone}'
             style='display:block;margin-top:10px;background:#25D366;color:#fff;text-align:center;padding:15px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;'>
            WhatsApp This Lead
          </a>
        </div>
        <div style='background:#E1F5EE;padding:14px 24px;text-align:center;font-size:12px;color:#0F6E56;'>
          Stoic Home Care &nbsp;·&nbsp; stoiccare.in &nbsp;·&nbsp; +91 76682 32867
        </div>
      </div>
    </body>
    </html>
    ";

    $mail->send();

    echo json_encode(['success' => true, 'message' => 'Enquiry sent.']);

} catch (Exception $e) {
    error_log('Popup Enquiry Mail Error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Mail failed: ' . $e->getMessage()]);
}
