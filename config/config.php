<?php
/* ============================================================
   Stoic Home Care — config/config.php
   Global configuration constants
   ============================================================ */

$isLocal = (isset($_SERVER['HTTP_HOST']) && (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false || php_sapi_name() === 'cli-server' || php_sapi_name() === 'cli'));

if ($isLocal) {
    $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https://' : 'http://';
    define('BASE_URL', $protocol . $_SERVER['HTTP_HOST']);
} else {
    define('BASE_URL', 'https://stoiccare.in');  // Change to your domain
}
define('BASE_PATH', dirname(__DIR__));          // Absolute root path of project

// Asset paths for client
define('CLIENT_ASSETS', BASE_URL . '/client/view_assets');
define('CLIENT_IMAGES', CLIENT_ASSETS . '/images');
define('CLIENT_CSS',    CLIENT_ASSETS . '/css');
define('CLIENT_JS',     CLIENT_ASSETS . '/js');

// Upload paths (filesystem)
define('UPLOAD_PATH',        BASE_PATH . '/uploads');
define('SERVICE_UPLOAD_PATH', UPLOAD_PATH . '/services');
define('EQUIP_UPLOAD_PATH',   UPLOAD_PATH . '/equipment');

// Upload paths (URL)
define('UPLOAD_URL',        BASE_URL . '/uploads');
define('SERVICE_UPLOAD_URL', UPLOAD_URL . '/services');
define('EQUIP_UPLOAD_URL',   UPLOAD_URL . '/equipment');

// Admin paths
define('ADMIN_ASSETS', BASE_URL . '/admin/assets');

// Timezone
date_default_timezone_set('Asia/Kolkata');

// Error reporting (set to 0 in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);
