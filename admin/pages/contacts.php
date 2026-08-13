<?php
/* ============================================================
   Stoic Home Care — admin/pages/contacts.php
   View all enquiries
   ============================================================ */

$adminPageTitle = 'Enquiries';
require_once ROOT . '/admin/includes/head.php';
require_once ROOT . '/admin/includes/header.php';

$db = getDB();

// Mark as read
if (isset($_GET['read']) && is_numeric($_GET['read'])) {
    $db->prepare("UPDATE enquiries SET status='read' WHERE id=:id")->execute([':id'=>$_GET['read']]);
}

$enquiries = $db->query("SELECT * FROM enquiries ORDER BY created_at DESC")->fetchAll();
?>

<div class="table-card">
  <h5 class="fw-bold mb-3" style="color:#1a3a6b">All Enquiries (<?= count($enquiries) ?>)</h5>
  <div class="table-responsive">
    <table class="table table-hover align-middle" style="font-size:.87rem">
      <thead style="background:#f8fafc">
        <tr><th>Name</th><th>Phone</th><th>Email</th><th>Service</th><th>City</th><th>Message</th><th>Date</th><th>Status</th></tr>
      </thead>
      <tbody>
        <?php if (empty($enquiries)): ?>
        <tr><td colspan="8" class="text-center text-muted py-4">No enquiries yet.</td></tr>
        <?php else: ?>
        <?php foreach ($enquiries as $e): ?>
        <tr>
          <td class="fw-semibold"><?= htmlspecialchars($e['name']) ?></td>
          <td><a href="tel:<?= htmlspecialchars($e['phone']) ?>"><?= htmlspecialchars($e['phone']) ?></a></td>
          <td><?= htmlspecialchars($e['email'] ?? '—') ?></td>
          <td><?= htmlspecialchars($e['service'] ?? '—') ?></td>
          <td><?= htmlspecialchars($e['city'] ?? '—') ?></td>
          <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
              title="<?= htmlspecialchars($e['message'] ?? '') ?>"><?= htmlspecialchars(substr($e['message'] ?? '', 0, 60)) ?></td>
          <td><?= date('d M Y', strtotime($e['created_at'])) ?></td>
          <td>
            <span class="badge <?= $e['status']==='new' ? 'badge-new' : 'badge-read' ?>"><?= ucfirst($e['status']) ?></span>
            <?php if ($e['status'] === 'new'): ?>
            <a href="?page=contacts&read=<?= $e['id'] ?>" class="btn btn-sm btn-outline-secondary ms-1" style="font-size:.7rem;padding:.2rem .5rem;">Mark Read</a>
            <?php endif; ?>
          </td>
        </tr>
        <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>

<?php require_once ROOT . '/admin/includes/footer.php'; ?>
