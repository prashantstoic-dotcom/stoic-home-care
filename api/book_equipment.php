<?php
/* ============================================================
   Stoic Home Care — api/book_equipment.php
   Saves equipment booking + sends admin email + auto reply
   ============================================================ */

header('Content-Type: application/json');

define('ROOT', dirname(__DIR__));

require_once ROOT . '/config/config.php';
require_once ROOT . '/config/db.php';
require_once ROOT . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

/* ================= GET FORM DATA ================= */

$name           = trim($_POST['name'] ?? '');
$phone          = trim($_POST['phone'] ?? '');
$email          = trim($_POST['email'] ?? '');
$equipment_id   = intval($_POST['equipment_id'] ?? 0);
$equipment_name = trim($_POST['equipment_name'] ?? '');
$rental_period  = trim($_POST['rental_period'] ?? '');
$message        = trim($_POST['message'] ?? '');

if (!$name || !$phone) {
    echo json_encode(['success' => false, 'message' => 'Name and phone required.']);
    exit;
}

try {

    /* ================= SAVE TO DATABASE ================= */

    $db  = getDB();

    $sql = "INSERT INTO equipment_bookings
            (name, phone, email, equipment_id, equipment_name, rental_period, message)
            VALUES (:name, :phone, :email, :equipment_id, :equipment_name, :rental_period, :message)";

    $stmt = $db->prepare($sql);

    $stmt->execute([
        ':name' => $name,
        ':phone' => $phone,
        ':email' => $email,
        ':equipment_id' => $equipment_id,
        ':equipment_name' => $equipment_name,
        ':rental_period' => $rental_period,
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
        $adminMail->Subject = "New Equipment Booking — Stoic Home Care";

        $adminMail->Body = "
        <h2 style='color:#0a7cff'>Equipment Rental Request</h2>

        <table style='border-collapse:collapse;width:100%;font-family:Arial'>
        <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Name</th><td style='border:1px solid #ddd;padding:8px'>{$name}</td></tr>
        <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Phone</th><td style='border:1px solid #ddd;padding:8px'>{$phone}</td></tr>
        <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Email</th><td style='border:1px solid #ddd;padding:8px'>{$email}</td></tr>
        <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Equipment</th><td style='border:1px solid #ddd;padding:8px'>{$equipment_name}</td></tr>
        <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Rental Period</th><td style='border:1px solid #ddd;padding:8px'>{$rental_period}</td></tr>
        <tr><th style='background:#0a7cff;color:#fff;padding:8px'>Message</th><td style='border:1px solid #ddd;padding:8px'>{$message}</td></tr>
        </table>
        ";

        $adminMail->send();

    } catch (Exception $e) {
        error_log("Admin Mail Error: " . $adminMail->ErrorInfo);
    }



    /* ================= CLIENT AUTO REPLY ================= */

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
            $clientMail->addAttachment(ROOT . '/uploads/stoic.pdf');

            $clientMail->isHTML(true);
            $clientMail->Subject = "Thank you for your equipment enquiry";

            $clientMail->Body = "
            <p>Dear {$name},</p>

            <p>Thank you for contacting <b>Stoic Home Care</b>.</p>

            <p>We have received your request for <b>{$equipment_name}</b>.  
            Our team will contact you shortly to confirm availability and delivery.</p>

            <p>Please find our company brochure attached for detailed services.</p>

            <br>

            <p>
            Warm regards,<br>
            <b>Stoic Home Care Team</b><br>
            🌐 https://stoiccare.in
            </p>
            ";

            $clientMail->send();

        } catch (Exception $e) {
            error_log("Client Mail Error: " . $clientMail->ErrorInfo);
        }

    }


    echo json_encode([
        'success' => true,
        'message' => 'Rental request received! We will call you shortly.'
    ]);

} catch (Exception $e) {

    echo json_encode([
        'success' => false,
        'message' => 'Request failed. Please call us directly.'
    ]);

}
