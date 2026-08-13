<?php
/* ============================================================
   Stoic Home Care — admin/login.php
   Admin login page
   Default: stoic_admin / St0!cH3@lth#2024$Adm!n
   ============================================================ */

define('ROOT', dirname(__DIR__));
require_once ROOT . '/config/config.php';

session_start();
if (!empty($_SESSION['admin_id'])) {
    header('Location: ' . BASE_URL . '/admin/');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login – Stoic Home Care</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    body { background: linear-gradient(135deg,#1a3a6b 0%,#2196d3 60%,#4ecdc4 100%); min-height:100vh; display:flex; align-items:center; justify-content:center; font-family:'Segoe UI',sans-serif; }
    .login-card { background:#fff; border-radius:20px; padding:2.5rem 2rem; width:100%; max-width:420px; box-shadow:0 24px 80px rgba(0,0,0,.3); }
    .login-logo { text-align:center; margin-bottom:1.5rem; }
    .login-logo h2 { color:#1a3a6b; font-weight:800; font-size:1.6rem; }
    .login-logo small { color:#6b82a3; font-size:.82rem; }
    .btn-login { background:linear-gradient(135deg,#1a3a6b,#2196d3); color:#fff; border:none; padding:.75rem; border-radius:12px; font-weight:700; font-size:1rem; width:100%; cursor:pointer; }
    .btn-login:hover { opacity:.9; }
    .alert-error { display:none; background:#fee2e2; color:#dc2626; border-radius:10px; padding:.75rem 1rem; font-size:.88rem; margin-bottom:1rem; }
  </style>
</head>
<body>
  <div class="login-card">
    <div class="login-logo">
      <i class="fa-solid fa-user-shield fa-2x mb-2" style="color:#1a3a6b"></i>
      <h2>Stoic Home Care</h2>
      <small>Admin Panel Login</small>
    </div>
    <div class="alert-error" id="loginError"></div>
    <form id="loginForm">
      <div class="mb-3">
        <label class="form-label fw-semibold">Username</label>
        <div class="input-group">
          <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
          <input type="text" name="username" class="form-control" placeholder="Enter username" required autocomplete="username">
        </div>
      </div>
      <div class="mb-4">
        <label class="form-label fw-semibold">Password</label>
        <div class="input-group">
          <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
          <input type="password" name="password" id="passwordField" class="form-control" placeholder="Enter password" required autocomplete="current-password">
          <button type="button" class="btn btn-outline-secondary" onclick="togglePass()"><i class="fa-solid fa-eye" id="eyeIcon"></i></button>
        </div>
      </div>
      <button type="submit" class="btn-login">
        <i class="fa-solid fa-right-to-bracket me-2"></i>Login to Dashboard
      </button>
    </form>
    <p class="text-center mt-3 mb-0"><a href="<?= BASE_URL ?>/" style="color:#2196d3;font-size:.85rem;"><i class="fa-solid fa-arrow-left me-1"></i>Back to Website</a></p>
  </div>

  <script>
    function togglePass() {
      var f = document.getElementById('passwordField');
      var e = document.getElementById('eyeIcon');
      if (f.type === 'password') { f.type = 'text'; e.className = 'fa-solid fa-eye-slash'; }
      else { f.type = 'password'; e.className = 'fa-solid fa-eye'; }
    }

    document.getElementById('loginForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      var errDiv = document.getElementById('loginError');
      errDiv.style.display = 'none';
      var fd = new FormData(this);
      var btn = this.querySelector('button[type=submit]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Logging in…';

      try {
        var res  = await fetch('<?= BASE_URL ?>/api/login.php', { method:'POST', body:fd });
        var data = await res.json();
        if (data.success) {
          window.location.href = data.redirect;
        } else {
          errDiv.textContent    = data.message;
          errDiv.style.display  = 'block';
          btn.disabled          = false;
          btn.innerHTML         = '<i class="fa-solid fa-right-to-bracket me-2"></i>Login to Dashboard';
        }
      } catch(err) {
        errDiv.textContent   = 'Network error. Please try again.';
        errDiv.style.display = 'block';
        btn.disabled         = false;
        btn.innerHTML        = '<i class="fa-solid fa-right-to-bracket me-2"></i>Login to Dashboard';
      }
    });
  </script>
</body>
</html>
