<?php
/* ============================================================
   Stoic Home Care — admin/includes/header.php
   Admin sidebar navigation + topbar
   ============================================================ */
$adminPageTitle = $adminPageTitle ?? 'Dashboard';
$currentPage    = $_GET['page']   ?? 'dashboard';

function navLink($href, $icon, $label, $currentPage, $pageKey) {
    $active = ($currentPage === $pageKey) ? 'active' : '';
    echo "<a href=\"$href\" class=\"nav-link $active\"><i class=\"fa-solid $icon\"></i> $label</a>";
}
?>

<!-- Sidebar -->
<nav class="sidebar">
  <div class="sidebar-brand">
    <h5><i class="fa-solid fa-plus-circle me-2" style="color:#4ecdc4"></i>Stoic Admin</h5>
    <small>Home Care Management</small>
  </div>
  <div class="py-2">
    <div style="padding:.5rem 1rem .25rem;font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.35);">Overview</div>
    <?php navLink(BASE_URL.'/admin/?page=dashboard','fa-gauge','Dashboard',$currentPage,'dashboard'); ?>

    <div style="padding:.75rem 1rem .25rem;font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.35);">Services</div>
    <?php navLink(BASE_URL.'/admin/?page=add_service','fa-circle-plus','Add Service',$currentPage,'add_service'); ?>
    <?php navLink(BASE_URL.'/admin/?page=service_list','fa-list','Service List',$currentPage,'service_list'); ?>

    <div style="padding:.75rem 1rem .25rem;font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.35);">Equipment</div>
    <?php navLink(BASE_URL.'/admin/?page=add_equipment','fa-circle-plus','Add Equipment',$currentPage,'add_equipment'); ?>
    <?php navLink(BASE_URL.'/admin/?page=equipment_list','fa-list','Equipment List',$currentPage,'equipment_list'); ?>

    <div style="padding:.75rem 1rem .25rem;font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.35);">Bookings & Enquiries</div>
    <?php navLink(BASE_URL.'/admin/?page=service_booking','fa-calendar-check','Service Bookings',$currentPage,'service_booking'); ?>
    <?php navLink(BASE_URL.'/admin/?page=equip_booking','fa-truck-medical','Equipment Bookings',$currentPage,'equip_booking'); ?>
    <?php navLink(BASE_URL.'/admin/?page=contacts','fa-envelope','Enquiries',$currentPage,'contacts'); ?>

    <div style="padding:.75rem 1rem .25rem;font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.35);">Account</div>
    <a href="<?= BASE_URL ?>/admin/logout.php" class="nav-link"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
    <a href="<?= BASE_URL ?>/" class="nav-link" target="_blank"><i class="fa-solid fa-globe"></i> View Website</a>
  </div>
</nav>

<!-- Main content wrapper -->
<div class="main-content">
  <!-- Topbar -->
  <div class="topbar">
    <h5><?= htmlspecialchars($adminPageTitle) ?></h5>
    <div class="d-flex align-items-center gap-3">
      <span style="font-size:.85rem;color:#64748b"><i class="fa-solid fa-user me-1"></i><?= htmlspecialchars($_SESSION['admin_username'] ?? 'Admin') ?></span>
      <a href="<?= BASE_URL ?>/admin/logout.php" class="btn btn-sm btn-outline-danger" style="font-size:.78rem;"><i class="fa-solid fa-right-from-bracket me-1"></i>Logout</a>
    </div>
  </div>
