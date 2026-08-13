<?php
/* ============================================================
   Stoic Home Care - Dev Server Router (router.php)
   Enables local testing via: php -S localhost:8000 router.php
   Provides exact URL rewrite parity with Apache's .htaccess
   ============================================================ */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// 1. If requesting a real file or directory that exists, serve it directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    $ext = strtolower(pathinfo(__DIR__ . $uri, PATHINFO_EXTENSION));
    if ($ext === 'avif') {
        header('Content-Type: image/avif');
        readfile(__DIR__ . $uri);
        return true;
    }
    if ($ext === 'webp') {
        header('Content-Type: image/webp');
        readfile(__DIR__ . $uri);
        return true;
    }
    return false;
}

// 2. Route /admin or /admin/ to admin/index.php
if (preg_match('#^/admin/?$#', $uri)) {
    require __DIR__ . '/admin/index.php';
    return true;
}

// 3. Route /api/* directly if the script exists
if (preg_match('#^/api/(.+)$#', $uri, $matches)) {
    $apiFile = __DIR__ . '/api/' . $matches[1];
    if (file_exists($apiFile)) {
        require $apiFile;
        return true;
    }
}

// 4. Clean URLs (/services -> index.php?page=services)
if ($uri === '/merchant-feed.xml') {
    require __DIR__ . '/merchant-feed.php';
    return true;
}
if ($uri === '/sitemap.xml') {
    require __DIR__ . '/sitemap.php';
    return true;
}
if ($uri === '/sitemap-seo.xml') {
    require __DIR__ . '/sitemap-seo.php';
    return true;
}

// Emulate .htaccess rewrite rules
if (preg_match('#^/service/([a-zA-Z0-9_-]+)/?$#', $uri, $m)) {
    $_GET['page'] = 'service';
    $_GET['slug'] = $m[1];
} elseif (preg_match('#^/blog/?$#', $uri)) {
    $_GET['page'] = 'blog';
} elseif (preg_match('#^/blog/([a-zA-Z0-9_-]+)/?$#', $uri, $m)) {
    $_GET['page'] = 'blog_post';
    $_GET['slug'] = $m[1];
} elseif (preg_match('#^/author/([a-zA-Z0-9_-]+)/?$#', $uri, $m)) {
    $_GET['page'] = 'author';
    $_GET['slug'] = $m[1];
} elseif (preg_match('#^/location/([a-zA-Z0-9_-]+)/?$#', $uri, $m)) {
    $_GET['page'] = 'location';
    $_GET['city'] = $m[1];
} elseif (preg_match('#^/category/([a-zA-Z0-9_-]+)/?$#', $uri, $m)) {
    $_GET['page'] = 'category';
    $_GET['cat'] = $m[1];
} else {
    $page = trim($uri, '/');
    if (empty($page)) {
        $page = 'home';
    }
    $_GET['page'] = $page;
}

require __DIR__ . '/index.php';
return true;
