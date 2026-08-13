<?php
/* ============================================================
   Stoic Home Care — api/enquiry.php
   Saves enquiry + sends admin email + auto-reply with brochure
   ============================================================ */

header('Content-Type: application/json');

// Start session for rate limiting
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Rate limiting: Limit requests to one every 60 seconds
if (isset($_SESSION['last_enquiry_time']) && (time() - $_SESSION['last_enquiry_time'] < 60)) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'Too many requests. Please wait 60 seconds before sending another enquiry.'
    ]);
    exit;
}

define('ROOT', dirname(__DIR__));

require_once ROOT . '/config/config.php';
require_once ROOT . '/config/db.php';
require_once ROOT . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

/* ================= GET FORM DATA ================= */

$name    = trim($_POST['name'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$email   = trim($_POST['email'] ?? '');
$service = trim($_POST['service'] ?? '');
$city    = trim($_POST['city'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$phone) {
    echo json_encode(['success' => false, 'message' => 'Name & phone required']);
    exit;
}

try {

    /* ================= SAVE TO DATABASE ================= */

    $db = getDB();

    $sql = "INSERT INTO enquiries 
            (name, phone, email, service, city, message)
            VALUES (:name, :phone, :email, :service, :city, :message)";

    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':name'    => $name,
        ':phone'   => $phone,
        ':email'   => $email,
        ':service' => $service,
        ':city'    => $city,
        ':message' => $message
    ]);

    /* ================= ADMIN EMAIL ================= */

    try {

        $adminMail = new PHPMailer(true);

        $adminMail->isSMTP();
        $adminMail->Host       = 'smtp.gmail.com';
        $adminMail->SMTPAuth   = true;
        $adminMail->Username   = 'prashantstoic@gmail.com';
        $adminMail->Password   = 'hwmb fwyi zhmo bczl';
        $adminMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $adminMail->Port       = 587;

        $adminMail->setFrom('prashantstoic@gmail.com', 'Stoic Home Care');
        $adminMail->addAddress('stoicHome Careservices@gmail.com');

        if ($email) {
            $adminMail->addReplyTo($email, $name);
        }

        $adminMail->isHTML(true);
       $adminMail->Subject = "New Enquiry Received from " . ($email ?: $phone);

        $adminMail->Body = "
        <h2 style='color:#0a7cff'>New Enquiry Received</h2>
        <table style='border-collapse:collapse;width:100%;font-family:Arial'>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Name</th><td style='padding:8px;border:1px solid #ddd'>{$name}</td></tr>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Phone</th><td style='padding:8px;border:1px solid #ddd'>{$phone}</td></tr>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px;border:1px solid #ddd'>Email</th><td style='padding:8px;border:1px solid #ddd'>{$email}</td></tr>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Service</th><td style='padding:8px;border:1px solid #ddd'>{$service}</td></tr>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px'>City</th><td style='padding:8px;border:1px solid #ddd'>{$city}</td></tr>
            <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Message</th><td style='padding:8px;border:1px solid #ddd'>{$message}</td></tr>
        </table>
        ";

        $adminMail->send();

    } catch (Exception $e) {
        error_log("Admin Mail Error: " . $adminMail->ErrorInfo);
    }

    /* ================= CLIENT AUTO-REPLY ================= */

    if (!empty($email)) {

        try {

            $clientMail = new PHPMailer(true);

            $clientMail->isSMTP();
            $clientMail->Host       = 'smtp.gmail.com';
            $clientMail->SMTPAuth   = true;
            $clientMail->Username   = 'prashantstoic@gmail.com';
            $clientMail->Password   = 'hwmb fwyi zhmo bczl';
            $clientMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $clientMail->Port       = 587;

            $clientMail->setFrom('prashantstoic@gmail.com', 'Stoic Home Care');
            $clientMail->addAddress($email, $name);

            // Attach brochure
            $clientMail->addAttachment(ROOT . '/uploads/stoic.pdf', 'Stoic-Home Care-Brochure.pdf');

            $clientMail->isHTML(true);
            $clientMail->Subject = 'Thank you for contacting Stoic Home Care';

            $clientMail->Body = "
            <p>Dear {$name},</p>

            <p>Thank you for contacting <b>Stoic Home Care</b>.</p>

            <p>We have received your enquiry regarding <b>{$service}</b>.  
            Our care coordinator will contact you shortly.</p>

            <p>Please find attached our brochure for detailed services and care programs.</p>

            <br>

            <p>
            Warm regards,<br>
            <b>Stoic Home Care Team</b><br>
            📞 +91-7668232867<br>
            🌐 www.stoiccare.in
            </p>
            ";

            $clientMail->send();

        } catch (Exception $e) {
            error_log("Client Mail Error: " . $clientMail->ErrorInfo);
        }
    }

    $_SESSION['last_enquiry_time'] = time();

    echo json_encode([
        'success' => true,
        'message' => 'Enquiry submitted successfully'
    ]);

} catch (Exception $e) {

    echo json_encode([
        'success' => false,
        'message' => 'Database error. Please call directly.'
    ]);
}
