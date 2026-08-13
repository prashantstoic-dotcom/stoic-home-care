<?php
/* ============================================================
   Stoic Home Care — admin/includes/head.php
   Admin panel HTML head with Bootstrap and custom admin CSS
   ============================================================ */
$adminPageTitle = $adminPageTitle ?? 'Dashboard';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($adminPageTitle) ?> – Admin | Stoic Home Care</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    :root{--primary:#1a3a6b;--secondary:#2196d3;--teal:#4ecdc4;--sidebar-w:250px;}
    body{font-family:'Segoe UI',sans-serif;background:#f0f4ff;margin:0;}
    .sidebar{position:fixed;left:0;top:0;bottom:0;width:var(--sidebar-w);background:var(--primary);color:#fff;overflow-y:auto;z-index:1000;}
    .sidebar-brand{padding:1.5rem 1.25rem;border-bottom:1px solid rgba(255,255,255,.1);}
    .sidebar-brand h5{margin:0;font-weight:800;font-size:1.05rem;color:#fff;}
    .sidebar-brand small{color:rgba(255,255,255,.5);font-size:.72rem;}
    .sidebar .nav-link{color:rgba(255,255,255,.75);padding:.65rem 1.25rem;display:flex;align-items:center;gap:.75rem;font-size:.88rem;border-radius:8px;margin:.1rem .5rem;transition:.2s;}
    .sidebar .nav-link:hover,.sidebar .nav-link.active{color:#fff;background:rgba(255,255,255,.12);}
    .sidebar .nav-link i{width:18px;text-align:center;}
    .main-content{margin-left:var(--sidebar-w);min-height:100vh;padding:1.5rem;}
    .topbar{display:flex;align-items:center;justify-content:space-between;background:#fff;border-radius:12px;padding:.85rem 1.25rem;margin-bottom:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,.06);}
    .topbar h5{margin:0;color:var(--primary);font-weight:700;}
    .card-stat{background:#fff;border-radius:14px;padding:1.4rem;box-shadow:0 2px 12px rgba(0,0,0,.06);display:flex;align-items:center;gap:1rem;}
    .stat-icon{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;}
    .table-card{background:#fff;border-radius:14px;padding:1.5rem;box-shadow:0 2px 12px rgba(0,0,0,.06);}
    .badge-new{background:#dcfce7;color:#16a34a;}
    .badge-read{background:#f1f5f9;color:#64748b;}
    .form-panel{background:#fff;border-radius:14px;padding:1.75rem;box-shadow:0 2px 12px rgba(0,0,0,.06);}
    .img-preview{width:120px;height:90px;object-fit:cover;border-radius:10px;border:2px solid #e2e8f0;}
    @media(max-width:768px){.sidebar{transform:translateX(-100%);}.main-content{margin-left:0;}}
  </style>
</head>
<body>
