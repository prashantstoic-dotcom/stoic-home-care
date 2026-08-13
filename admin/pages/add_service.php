<?php
/* ============================================================
   Stoic Home Care — admin/pages/add_service.php
   Form to add a new service with image upload
   ============================================================ */

$adminPageTitle = 'Add Service';
require_once ROOT . '/admin/includes/head.php';
require_once ROOT . '/admin/includes/header.php';
?>

<div class="form-panel">
  <h5 class="fw-bold mb-4" style="color:#1a3a6b"><i class="fa-solid fa-circle-plus me-2 text-success"></i>Add New Service</h5>
  <div id="formAlert" style="display:none" class="alert mb-3"></div>
  <form id="addServiceForm" enctype="multipart/form-data">
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label fw-semibold">Service Title *</label>
        <input type="text" name="title" class="form-control" placeholder="e.g. ICU Setup @ Home" required>
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Category</label>
        <input type="text" name="category" class="form-control" placeholder="e.g. Critical Care">
      </div>
      <div class="col-12">
        <label class="form-label fw-semibold">Description</label>
        <textarea name="description" class="form-control" rows="4" placeholder="Service description…"></textarea>
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Service Image</label>
        <input type="file" name="image" class="form-control" accept="image/*" id="serviceImageInput">
        <div class="mt-2">
          <img id="serviceImgPreview" src="#" alt="Preview" class="img-preview" style="display:none">
        </div>
        <small class="text-muted">Max 5MB. jpg, png, webp, avif</small>
      </div>
    </div>
    <div class="mt-4">
      <button type="submit" class="btn btn-primary px-4">
        <i class="fa-solid fa-plus me-2"></i>Add Service
      </button>
      <a href="<?= BASE_URL ?>/admin/?page=service_list" class="btn btn-outline-secondary ms-2">View All Services</a>
    </div>
  </form>
</div>

<script>
document.getElementById('serviceImageInput').addEventListener('change', function() {
  var file = this.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = document.getElementById('serviceImgPreview');
      img.src = e.target.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('addServiceForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  var alertDiv = document.getElementById('formAlert');
  var btn = this.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Saving…';

  var fd = new FormData(this);
  try {
    var res  = await fetch('<?= BASE_URL ?>/api/add_service.php', { method:'POST', body:fd });
    var data = await res.json();
    alertDiv.style.display = 'block';
    if (data.success) {
      alertDiv.className = 'alert alert-success mb-3';
      alertDiv.textContent = 'Service added successfully!';
      this.reset();
      document.getElementById('serviceImgPreview').style.display = 'none';
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
  btn.innerHTML = '<i class="fa-solid fa-plus me-2"></i>Add Service';
});
</script>

<?php require_once ROOT . '/admin/includes/footer.php'; ?>
