<?php
/* ============================================================
   Stoic Home Care — index.php
   Front controller / router for client-facing pages
   ============================================================ */

define('ROOT', __DIR__);
require_once ROOT . '/config/config.php';
require_once ROOT . '/config/db.php';

// Determine which page to load
$page = isset($_GET['page']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['page']) : 'home';

// Map page slugs to view files
$views = [
    'home'      => ROOT . '/client/views/home.php',
    'services'  => ROOT . '/client/views/services.php',
    'equipment' => ROOT . '/client/views/equipment.php',
    'about'     => ROOT . '/client/views/about.php',
    'contact'   => ROOT . '/client/views/contact.php',
    'service'   => ROOT . '/client/views/service_landing.php', // Dynamic pSEO Landing Page
    'location'  => ROOT . '/client/views/location_hub.php',    // Location Hub Page
    'category'  => ROOT . '/client/views/category_hub.php',    // Service Silo Page
    'blog'      => ROOT . '/client/views/blog_hub.php',        // Blog Index
    'blog_post' => ROOT . '/client/views/blog_post.php',       // Single Blog Post
    'author'    => ROOT . '/client/views/author_profile.php',  // Author E-E-A-T Page
];

// Load the view or 404
if (isset($views[$page]) && file_exists($views[$page])) {
    require $views[$page];
} else {
    require ROOT . '/client/views/404.php';
}
