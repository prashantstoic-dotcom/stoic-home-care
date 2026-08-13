<?php
/* ============================================================
   Stoic Home Care — api/book_service.php
   Save service booking + admin email + client auto reply
   ============================================================ */

header('Content-Type: application/json');

define('ROOT', dirname(__DIR__));

require_once ROOT . '/config/config.php';
require_once ROOT . '/config/db.php';
require_once ROOT . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


/* ================= REQUEST VALIDATION ================= */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}


/* ================= SANITIZE INPUT ================= */

function clean($val) {
    return htmlspecialchars(trim($val), ENT_QUOTES, 'UTF-8');
}

$name         = clean($_POST['name'] ?? '');
$phone        = clean($_POST['phone'] ?? '');
$email        = clean($_POST['email'] ?? '');
$service_name = clean($_POST['service_name'] ?? '');
$city         = clean($_POST['city'] ?? '');
$message      = clean($_POST['message'] ?? '');


/* ================= VALIDATION ================= */

if (!$name || !$phone || !$city) {
    echo json_encode([
        'success' => false,
        'message' => 'Name, phone and city are required.'
    ]);
    exit;
}

if (!preg_match('/^[0-9+\-\s]{7,15}$/', $phone)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid phone number.'
    ]);
    exit;
}

if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email.'
    ]);
    exit;
}


try {

    $db = getDB();


    /* ================= CREATE TABLE IF NOT EXISTS ================= */

    $db->exec("
        CREATE TABLE IF NOT EXISTS service_bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            email VARCHAR(150) DEFAULT NULL,
            service_name VARCHAR(255) DEFAULT NULL,
            city VARCHAR(100) NOT NULL,
            message TEXT DEFAULT NULL,
            status ENUM('new','contacted','confirmed','cancelled') DEFAULT 'new',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");


    /* ================= INSERT BOOKING ================= */

    $stmt = $db->prepare("
        INSERT INTO service_bookings
        (name, phone, email, service_name, city, message)
        VALUES
        (:name, :phone, :email, :service_name, :city, :message)
    ");

    $stmt->execute([
        ':name' => $name,
        ':phone' => $phone,
        ':email' => $email ?: null,
        ':service_name' => $service_name ?: null,
        ':city' => $city,
        ':message' => $message ?: null
    ]);

    $bookingId = $db->lastInsertId();


    /* ================= EMAIL TEMPLATE ================= */

    $subject = "New Service Booking #{$bookingId} — {$service_name}";

    $htmlBody = "
    <h2 style='color:#1a3a6b'>New Service Booking</h2>

    <table style='border-collapse:collapse;width:100%;font-family:Arial'>
        <tr>
            <th style='background:#1a3a6b;color:#fff;padding:8px'>Booking ID</th>
            <td style='border:1px solid #ddd;padding:8px'>#{$bookingId}</td>
        </tr>
        <tr>
            <th style='background:#1a3a6b;color:#fff;padding:8px'>Name</th>
            <td style='border:1px solid #ddd;padding:8px'>{$name}</td>
        </tr>
        <tr>
            <th style='background:#1a3a6b;color:#fff;padding:8px'>Phone</th>
            <td style='border:1px solid #ddd;padding:8px'>{$phone}</td>
        </tr>
        <tr>
            <th style='background:#1a3a6b;color:#fff;padding:8px'>Email</th>
            <td style='border:1px solid #ddd;padding:8px'>".($email ?: '—')."</td>
        </tr>
        <tr>
            <th style='background:#1a3a6b;color:#fff;padding:8px'>Service</th>
            <td style='border:1px solid #ddd;padding:8px'>{$service_name}</td>
        </tr>
        <tr>
            <th style='background:#1a3a6b;color:#fff;padding:8px'>City</th>
            <td style='border:1px solid #ddd;padding:8px'>{$city}</td>
        </tr>
        <tr>
            <th style='background:#1a3a6b;color:#fff;padding:8px'>Message</th>
            <td style='border:1px solid #ddd;padding:8px'>{$message}</td>
        </tr>
    </table>
    ";


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
        $adminMail->Subject = $subject;
        $adminMail->Body    = $htmlBody;

        $adminMail->send();

    } catch (Exception $e) {
        error_log("Admin Mail Error: ".$adminMail->ErrorInfo);
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

            // attach brochure
            $clientMail->addAttachment(ROOT.'/uploads/stoic.pdf');

            $clientMail->isHTML(true);
            $clientMail->Subject = "Thank you for contacting Stoic Home Care";

            $clientMail->Body = "
            Dear {$name},<br><br>

            Thank you for choosing <b>Stoic Home Care</b>.<br><br>

            Your request for <b>{$service_name}</b> has been received.<br>
            Our care coordinator will contact you shortly.<br><br>

            Please find our company brochure attached for more details.<br><br>

            Regards,<br>
            <b>Stoic Home Care Team</b><br>
            https://stoiccare.in
            ";

            $clientMail->send();

        } catch (Exception $e) {
            error_log("Client Mail Error: ".$clientMail->ErrorInfo);
        }

    }


    echo json_encode([
        'success' => true,
        'message' => 'Booking received! We will call you shortly.',
        'booking_id' => $bookingId
    ]);

}
catch (Exception $e) {

    error_log("Booking Error: ".$e->getMessage());

    echo json_encode([
        'success' => false,
        'message' => 'Booking failed. Please call us directly.'
    ]);
}
