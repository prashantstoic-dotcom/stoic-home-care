<?php
/* ============================================================
   Stoic Home Care — admin/pages/equip_booking.php
   ============================================================ */

$adminPageTitle = 'Equipment Bookings';
require_once ROOT . '/admin/includes/head.php';
require_once ROOT . '/admin/includes/header.php';

$db       = getDB();
$bookings = $db->query("SELECT * FROM equipment_bookings ORDER BY created_at DESC")->fetchAll();
?>

<div class="table-card">
  <h5 class="fw-bold mb-3" style="color:#1a3a6b">Equipment Rental Bookings (<?= count($bookings) ?>)</h5>
  <div class="table-responsive">
    <table class="table table-hover align-middle" style="font-size:.87rem">
      <thead style="background:#f8fafc">
        <tr><th>Name</th><th>Phone</th><th>Equipment</th><th>Rental Period</th><th>Message</th><th>Date</th><th>Status</th></tr>
      </thead>
      <tbody>
        <?php if (empty($bookings)): ?>
        <tr><td colspan="7" class="text-center text-muted py-4">No equipment bookings yet.</td></tr>
        <?php else: ?>
        <?php foreach ($bookings as $b): ?>
        <tr>
          <td class="fw-semibold"><?= htmlspecialchars($b['name']) ?></td>
          <td><a href="tel:<?= htmlspecialchars($b['phone']) ?>"><?= htmlspecialchars($b['phone']) ?></a></td>
          <td><?= htmlspecialchars($b['equipment_name'] ?? '—') ?></td>
          <td><?= htmlspecialchars($b['rental_period'] ?? '—') ?></td>
          <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><?= htmlspecialchars(substr($b['message'] ?? '', 0, 50)) ?></td>
          <td><?= date('d M Y', strtotime($b['created_at'])) ?></td>
          <td><span class="badge badge-<?= $b['status'] ?>"><?= ucfirst($b['status']) ?></span></td>
        </tr>
        <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>

<?php require_once ROOT . '/admin/includes/footer.php'; ?>
