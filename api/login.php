<?php
/* ============================================================
   Stoic Home Care — api/login.php
   Admin login handler — validates credentials, starts session
   Default admin: stoic_admin / St0!cH3@lth#2024$Adm!n
   ============================================================ */

header('Content-Type: application/json');
define('ROOT', dirname(__DIR__));
require_once ROOT . '/config/config.php';
require_once ROOT . '/config/db.php';

session_start();

// Already logged in?
if (!empty($_SESSION['admin_id'])) {
    echo json_encode(['success' => true, 'redirect' => BASE_URL . '/admin/']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Username and password are required.']);
    exit;
}

try {
    $db   = getDB();
    $stmt = $db->prepare("SELECT id, username, password, role FROM users WHERE username = :username LIMIT 1");
    $stmt->execute([':username' => $username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Regenerate session ID to prevent fixation
        session_regenerate_id(true);

        $_SESSION['admin_id']       = $user['id'];
        $_SESSION['admin_username'] = $user['username'];
        $_SESSION['admin_role']     = $user['role'];

        echo json_encode(['success' => true, 'redirect' => BASE_URL . '/admin/']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Login failed. Please try again.']);
}
