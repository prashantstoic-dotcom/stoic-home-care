<?php
/* ============================================================
   Stoic Home Care — admin/index.php
   Admin panel entry point — auth guard + routing
   ============================================================ */

define('ROOT', dirname(__DIR__));
require_once ROOT . '/config/config.php';
require_once ROOT . '/config/db.php';

session_start();

// If not logged in, redirect to login
if (empty($_SESSION['admin_id']) || $_SESSION['admin_role'] != 2) {
    header('Location: ' . BASE_URL . '/admin/login.php');
    exit;
}

// Routing
$page = isset($_GET['page']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['page']) : 'dashboard';

$pages = [
    'dashboard'       => ROOT . '/admin/pages/dashboard.php',
    'add_service'     => ROOT . '/admin/pages/add_service.php',
    'service_list'    => ROOT . '/admin/pages/service_list.php',
    'add_equipment'   => ROOT . '/admin/pages/add_equipment.php',
    'equipment_list'  => ROOT . '/admin/pages/equipment_list.php',
    'contacts'        => ROOT . '/admin/pages/contacts.php',
    'service_booking' => ROOT . '/admin/pages/service_booking.php',
    'equip_booking'   => ROOT . '/admin/pages/equip_booking.php',
];

$viewFile = $pages[$page] ?? $pages['dashboard'];
require $viewFile;
