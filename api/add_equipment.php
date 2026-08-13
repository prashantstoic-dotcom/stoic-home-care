<?php
/* ============================================================
   Stoic Home Care — api/add_equipment.php
   Admin API: Add new equipment (with image upload)
   Images saved to: uploads/equipment/
   ============================================================ */

header('Content-Type: application/json');
define('ROOT', dirname(__DIR__));
require_once ROOT . '/config/config.php';
require_once ROOT . '/config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

session_start();
if (empty($_SESSION['admin_id']) || $_SESSION['admin_role'] != 2) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

$title       = trim($_POST['title']       ?? '');
$description = trim($_POST['description'] ?? '');
$price       = trim($_POST['price']       ?? '');

if (empty($title)) {
    echo json_encode(['success' => false, 'message' => 'Equipment title is required.']);
    exit;
}

// Handle image upload
$imageName = null;
if (!empty($_FILES['image']['name'])) {
    $allowedTypes = ['image/jpeg','image/png','image/webp','image/avif','image/gif'];
    $fileType     = mime_content_type($_FILES['image']['tmp_name']);

    if (!in_array($fileType, $allowedTypes)) {
        echo json_encode(['success' => false, 'message' => 'Invalid image type.']);
        exit;
    }
    if ($_FILES['image']['size'] > 5 * 1024 * 1024) {
        echo json_encode(['success' => false, 'message' => 'Image too large (max 5MB).']);
        exit;
    }

    $ext       = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imageName = uniqid('eq_', true) . '.' . strtolower($ext);
    $destPath  = EQUIP_UPLOAD_PATH . '/' . $imageName;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $destPath)) {
        echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
        exit;
    }
}

try {
    $db   = getDB();
    $sql  = "INSERT INTO equipment (title, description, price, image) VALUES (:title, :description, :price, :image)";
    $stmt = $db->prepare($sql);
    $stmt->execute([':title'=>$title, ':description'=>$description, ':price'=>$price, ':image'=>$imageName]);
    echo json_encode(['success' => true, 'message' => 'Equipment added successfully.', 'id' => $db->lastInsertId()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error.']);
}
