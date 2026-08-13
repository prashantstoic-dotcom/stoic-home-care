<?php
/* ============================================================
   Stoic Home Care — api/add_service.php
   Admin API: Add a new service (with image upload)
   Images saved to: uploads/services/
   ============================================================ */

header('Content-Type: application/json');
define('ROOT', dirname(__DIR__));
require_once ROOT . '/config/config.php';
require_once ROOT . '/config/db.php';

// Must be POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

// Simple session-based admin auth check
session_start();
if (empty($_SESSION['admin_id']) || empty($_SESSION['admin_role']) || $_SESSION['admin_role'] != 2) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

$title       = trim($_POST['title']       ?? '');
$description = trim($_POST['description'] ?? '');
$category    = trim($_POST['category']    ?? '');

if (empty($title)) {
    echo json_encode(['success' => false, 'message' => 'Service title is required.']);
    exit;
}

// Handle image upload
$imageName = null;
if (!empty($_FILES['image']['name'])) {
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    $fileType     = mime_content_type($_FILES['image']['tmp_name']);

    if (!in_array($fileType, $allowedTypes)) {
        echo json_encode(['success' => false, 'message' => 'Invalid image type. Allowed: jpg, png, webp, avif, gif.']);
        exit;
    }

    if ($_FILES['image']['size'] > 5 * 1024 * 1024) {
        echo json_encode(['success' => false, 'message' => 'Image too large (max 5MB).']);
        exit;
    }

    $ext       = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imageName = uniqid('svc_', true) . '.' . strtolower($ext);
    $destPath  = SERVICE_UPLOAD_PATH . '/' . $imageName;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $destPath)) {
        echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
        exit;
    }
}

try {
    $db   = getDB();
    $sql  = "INSERT INTO services (title, description, category, image) VALUES (:title, :description, :category, :image)";
    $stmt = $db->prepare($sql);
    $stmt->execute([':title'=>$title, ':description'=>$description, ':category'=>$category, ':image'=>$imageName]);
    echo json_encode(['success' => true, 'message' => 'Service added successfully.', 'id' => $db->lastInsertId()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error. Could not add service.']);
}
