<?php
/* ============================================================
   Stoic Home Care — admin/pages/service_list.php
   List, view and delete services
   ============================================================ */

$adminPageTitle = 'Service List';
require_once ROOT . '/admin/includes/head.php';
require_once ROOT . '/admin/includes/header.php';

$db = getDB();

// Handle delete
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $id   = intval($_GET['delete']);
    $row  = $db->prepare("SELECT image FROM services WHERE id = :id");
    $row->execute([':id' => $id]);
    $svc  = $row->fetch();
    if ($svc && $svc['image']) {
        $file = SERVICE_UPLOAD_PATH . '/' . $svc['image'];
        if (file_exists($file)) unlink($file);
    }
    $db->prepare("DELETE FROM services WHERE id = :id")->execute([':id' => $id]);
    header('Location: ' . BASE_URL . '/admin/?page=service_list&deleted=1');
    exit;
}

$services = $db->query("SELECT * FROM services ORDER BY id DESC")->fetchAll();
?>

<?php if (isset($_GET['deleted'])): ?>
<div class="alert alert-success">Service deleted successfully.</div>
<?php endif; ?>

<div class="table-card">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h5 class="fw-bold mb-0" style="color:#1a3a6b">All Services (<?= count($services) ?>)</h5>
    <a href="<?= BASE_URL ?>/admin/?page=add_service" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus me-1"></i>Add New</a>
  </div>
  <div class="table-responsive">
    <table class="table table-hover align-middle" style="font-size:.87rem">
      <thead style="background:#f8fafc"><tr><th>Image</th><th>Title</th><th>Category</th><th>Added</th><th>Action</th></tr></thead>
      <tbody>
        <?php if (empty($services)): ?>
        <tr><td colspan="5" class="text-center text-muted py-4">No services yet. <a href="<?= BASE_URL ?>/admin/?page=add_service">Add one</a></td></tr>
        <?php else: ?>
        <?php foreach ($services as $s): ?>
        <tr>
          <td>
            <?php if ($s['image']): ?>
            <img src="<?= SERVICE_UPLOAD_URL . '/' . htmlspecialchars($s['image']) ?>" alt="" style="width:60px;height:45px;object-fit:cover;border-radius:8px;">
            <?php else: ?>
            <span class="text-muted">—</span>
            <?php endif; ?>
          </td>
          <td class="fw-semibold"><?= htmlspecialchars($s['title']) ?></td>
          <td><?= htmlspecialchars($s['category'] ?? '—') ?></td>
          <td><?= date('d M Y', strtotime($s['created_at'])) ?></td>
          <td>
            <a href="<?= BASE_URL ?>/admin/?page=service_list&delete=<?= $s['id'] ?>"
               class="btn btn-sm btn-outline-danger"
               onclick="return confirm('Delete this service?')">
              <i class="fa-solid fa-trash"></i>
            </a>
          </td>
        </tr>
        <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>

<?php require_once ROOT . '/admin/includes/footer.php'; ?>
