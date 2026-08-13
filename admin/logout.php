<?php
define('ROOT', dirname(__DIR__));
require_once ROOT . '/config/config.php';
session_start();
session_destroy();
header('Location: ' . BASE_URL . '/admin/login.php');
exit;
