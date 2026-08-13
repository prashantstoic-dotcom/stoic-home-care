<?php
/* ============================================================
   Stoic Home Care — admin/pages/dashboard.php
   ============================================================ */

$adminPageTitle = 'Dashboard';
require_once ROOT . '/admin/includes/head.php';
require_once ROOT . '/admin/includes/header.php';

$db = getDB();

$stats = [
    'services'  => $db->query("SELECT COUNT(*) FROM services")->fetchColumn(),
    'equipment' => $db->query("SELECT COUNT(*) FROM equipment")->fetchColumn(),
    'bookings'  => $db->query("SELECT COUNT(*) FROM service_bookings")->fetchColumn(),
    'enquiries' => $db->query("SELECT COUNT(*) FROM enquiries")->fetchColumn(),
];

$recentEnquiries = $db->query("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5")->fetchAll();
?>

<div class="row g-3 mb-4">
  <?php
  $cards = [
    ['Services',    $stats['services'],  'fa-stethoscope',    '#dcfce7','#16a34a', 'service_list'],
    ['Equipment',   $stats['equipment'], 'fa-truck-medical',  '#dbeafe','#1d4ed8', 'equipment_list'],
    ['Bookings',    $stats['bookings'],  'fa-calendar-check', '#fef9c3','#ca8a04', 'service_booking'],
    ['Enquiries',   $stats['enquiries'], 'fa-envelope',       '#fee2e2','#dc2626', 'contacts'],
  ];
  foreach ($cards as [$label, $count, $icon, $bg, $color, $page]):
  ?>
  <div class="col-6 col-md-3">
    <div class="card-stat">
      <div class="stat-icon" style="background:<?= $bg ?>"><i class="fa-solid <?= $icon ?>" style="color:<?= $color ?>"></i></div>
      <div>
        <div style="font-size:1.75rem;font-weight:800;color:#1a3a6b"><?= $count ?></div>
        <div style="font-size:.8rem;color:#64748b"><?= $label ?></div>
        <a href="<?= BASE_URL ?>/admin/?page=<?= $page ?>" style="font-size:.75rem;color:#2196d3">View All →</a>
      </div>
    </div>
  </div>
  <?php endforeach; ?>
</div>

<div class="table-card">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h6 class="fw-bold mb-0" style="color:#1a3a6b">Recent Enquiries</h6>
    <a href="<?= BASE_URL ?>/admin/?page=contacts" class="btn btn-sm btn-primary" style="font-size:.78rem">View All</a>
  </div>
  <div class="table-responsive">
    <table class="table table-hover align-middle" style="font-size:.87rem">
      <thead style="background:#f8fafc"><tr><th>Name</th><th>Phone</th><th>Service</th><th>Date</th><th>Status</th></tr></thead>
      <tbody>
        <?php if (empty($recentEnquiries)): ?>
        <tr><td colspan="5" class="text-center text-muted py-4">No enquiries yet.</td></tr>
        <?php else: ?>
        <?php foreach ($recentEnquiries as $e): ?>
        <tr>
          <td><?= htmlspecialchars($e['name']) ?></td>
          <td><?= htmlspecialchars($e['phone']) ?></td>
          <td><?= htmlspecialchars($e['service'] ?? '—') ?></td>
          <td><?= date('d M Y', strtotime($e['created_at'])) ?></td>
          <td><span class="badge badge-<?= $e['status'] ?>"><?= ucfirst($e['status']) ?></span></td>
        </tr>
        <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>

<?php require_once ROOT . '/admin/includes/footer.php'; ?>
