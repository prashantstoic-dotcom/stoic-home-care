<?php
/* ============================================================
   Stoic Home Care — admin/pages/equipment_list.php
   ============================================================ */

$adminPageTitle = 'Equipment List';
require_once ROOT . '/admin/includes/head.php';
require_once ROOT . '/admin/includes/header.php';

$db = getDB();

if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $id  = intval($_GET['delete']);
    $row = $db->prepare("SELECT image FROM equipment WHERE id = :id");
    $row->execute([':id' => $id]);
    $eq  = $row->fetch();
    if ($eq && $eq['image']) {
        $file = EQUIP_UPLOAD_PATH . '/' . $eq['image'];
        if (file_exists($file)) unlink($file);
    }
    $db->prepare("DELETE FROM equipment WHERE id = :id")->execute([':id' => $id]);
    header('Location: ' . BASE_URL . '/admin/?page=equipment_list&deleted=1');
    exit;
}

$items = $db->query("SELECT * FROM equipment ORDER BY id DESC")->fetchAll();
?>

<?php if (isset($_GET['deleted'])): ?>
<div class="alert alert-success">Equipment deleted successfully.</div>
<?php endif; ?>

<div class="table-card">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h5 class="fw-bold mb-0" style="color:#1a3a6b">All Equipment (<?= count($items) ?>)</h5>
    <a href="<?= BASE_URL ?>/admin/?page=add_equipment" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus me-1"></i>Add New</a>
  </div>
  <div class="table-responsive">
    <table class="table table-hover align-middle" style="font-size:.87rem">
      <thead style="background:#f8fafc"><tr><th>Image</th><th>Title</th><th>Price</th><th>Added</th><th>Action</th></tr></thead>
      <tbody>
        <?php if (empty($items)): ?>
        <tr><td colspan="5" class="text-center text-muted py-4">No equipment yet. <a href="<?= BASE_URL ?>/admin/?page=add_equipment">Add one</a></td></tr>
        <?php else: ?>
        <?php foreach ($items as $eq): ?>
        <tr>
          <td>
            <?php if ($eq['image']): ?>
            <img src="<?= EQUIP_UPLOAD_URL . '/' . htmlspecialchars($eq['image']) ?>" alt="" style="width:60px;height:45px;object-fit:cover;border-radius:8px;">
            <?php else: ?><span class="text-muted">—</span><?php endif; ?>
          </td>
          <td class="fw-semibold"><?= htmlspecialchars($eq['title']) ?></td>
          <td><?= htmlspecialchars($eq['price'] ?? '—') ?></td>
          <td><?= date('d M Y', strtotime($eq['created_at'])) ?></td>
          <td>
            <a href="<?= BASE_URL ?>/admin/?page=equipment_list&delete=<?= $eq['id'] ?>"
               class="btn btn-sm btn-outline-danger"
               onclick="return confirm('Delete this equipment?')">
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
