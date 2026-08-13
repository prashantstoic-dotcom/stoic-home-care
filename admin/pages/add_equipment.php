<?php
/* ============================================================
   Stoic Home Care — admin/pages/add_equipment.php
   ============================================================ */

$adminPageTitle = 'Add Equipment';
require_once ROOT . '/admin/includes/head.php';
require_once ROOT . '/admin/includes/header.php';
?>

<div class="form-panel">
  <h5 class="fw-bold mb-4" style="color:#1a3a6b"><i class="fa-solid fa-circle-plus me-2 text-success"></i>Add New Equipment</h5>
  <div id="formAlert" style="display:none" class="alert mb-3"></div>
  <form id="addEquipForm" enctype="multipart/form-data">
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label fw-semibold">Equipment Name *</label>
        <input type="text" name="title" class="form-control" placeholder="e.g. Oxygen Concentrator" required>
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Price / Rental Info</label>
        <input type="text" name="price" class="form-control" placeholder="e.g. From ₹3,000/month">
      </div>
      <div class="col-12">
        <label class="form-label fw-semibold">Description</label>
        <textarea name="description" class="form-control" rows="4" placeholder="Equipment details…"></textarea>
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Equipment Image</label>
        <input type="file" name="image" class="form-control" accept="image/*" id="equipImageInput">
        <div class="mt-2">
          <img id="equipImgPreview" src="#" alt="Preview" class="img-preview" style="display:none">
        </div>
        <small class="text-muted">Max 5MB. jpg, png, webp, avif</small>
      </div>
    </div>
    <div class="mt-4">
      <button type="submit" class="btn btn-primary px-4">
        <i class="fa-solid fa-plus me-2"></i>Add Equipment
      </button>
      <a href="<?= BASE_URL ?>/admin/?page=equipment_list" class="btn btn-outline-secondary ms-2">View All</a>
    </div>
  </form>
</div>

<script>
document.getElementById('equipImageInput').addEventListener('change', function() {
  var file = this.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = document.getElementById('equipImgPreview');
      img.src = e.target.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('addEquipForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  var alertDiv = document.getElementById('formAlert');
  var btn = this.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Saving…';

  var fd = new FormData(this);
  try {
    var res  = await fetch('<?= BASE_URL ?>/api/add_equipment.php', { method:'POST', body:fd });
    var data = await res.json();
    alertDiv.style.display = 'block';
    if (data.success) {
      alertDiv.className = 'alert alert-success mb-3';
      alertDiv.textContent = 'Equipment added successfully!';
      this.reset();
      document.getElementById('equipImgPreview').style.display = 'none';
    } else {
      alertDiv.className = 'alert alert-danger mb-3';
      alertDiv.textContent = data.message;
    }
  } catch(err) {
    alertDiv.style.display = 'block';
    alertDiv.className = 'alert alert-danger mb-3';
    alertDiv.textContent = 'Network error. Please try again.';
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fa-solid fa-plus me-2"></i>Add Equipment';
});
</script>

<?php require_once ROOT . '/admin/includes/footer.php'; ?>
