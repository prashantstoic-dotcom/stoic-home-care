

<!-- ══ BOOK SERVICE MODAL ══ -->
<div id="bookServiceModal" class="bsm-overlay" role="dialog" aria-modal="true" aria-labelledby="bsmTitle">
  <div class="bsm-box">

    <button class="bsm-close" onclick="closeBookModal()" aria-label="Close">&times;</button>

    <!-- Header -->
    <div class="bsm-header">
      <div class="bsm-header-icon">
        <span class="material-icons-round">medical_services</span>
      </div>
      <div>
        <h3 id="bsmTitle">Book a Service</h3>
        <p id="bsmServiceLabel">Fill in your details and we'll confirm within 1 hour</p>
      </div>
    </div>

    <!-- Trust strip -->
    <div class="bsm-trust">
      <span><i class="fa-solid fa-shield-heart"></i> Verified Professionals</span>
      <span><i class="fa-solid fa-clock"></i> Callback in 1 Hour</span>
      <span><i class="fa-solid fa-lock"></i> Your data is safe</span>
    </div>

    <!-- Form — fields match book_service.php exactly -->
    <form id="bookServiceForm" novalidate>
      <input type="hidden" name="service_name" id="bsmServiceName">

      <div class="bsm-row">
        <div class="bsm-group">
          <label for="bsmName">Full Name <span class="bsm-req">*</span></label>
          <div class="bsm-input-wrap">
            <span class="material-icons-round bsm-input-icon">person</span>
            <input type="text" id="bsmName" name="name" class="bsm-input"
                   placeholder="Patient / Contact name" required>
          </div>
        </div>
        <div class="bsm-group">
          <label for="bsmPhone">Phone Number <span class="bsm-req">*</span></label>
          <div class="bsm-input-wrap">
            <span class="material-icons-round bsm-input-icon">phone</span>
            <input type="tel" id="bsmPhone" name="phone" class="bsm-input"
                   placeholder="+91 XXXXX XXXXX" required>
          </div>
        </div>
      </div>

      <div class="bsm-row">
        <div class="bsm-group">
          <label for="bsmEmail">Email Address</label>
          <div class="bsm-input-wrap">
            <span class="material-icons-round bsm-input-icon">mail</span>
            <input type="email" id="bsmEmail" name="email" class="bsm-input"
                   placeholder="you@example.com">
          </div>
        </div>
        <div class="bsm-group">
          <label for="bsmCity">City / Area <span class="bsm-req">*</span></label>
          <div class="bsm-input-wrap">
            <span class="material-icons-round bsm-input-icon">location_on</span>
            <input type="text" id="bsmCity" name="city" class="bsm-input"
                   placeholder="e.g. Mumbai, Andheri West" required>
          </div>
        </div>
      </div>

      <div class="bsm-group">
        <label for="bsmMessage">Address / Additional Notes</label>
        <div class="bsm-input-wrap">
          <span class="material-icons-round bsm-input-icon" style="top:14px">notes</span>
          <textarea id="bsmMessage" name="message" class="bsm-input bsm-textarea" rows="3"
                    placeholder="Full address, preferred timing, medical condition details…"></textarea>
        </div>
      </div>

      <!-- Selected service display -->
      <div class="bsm-selected-service" id="bsmSelectedService">
        <span class="material-icons-round">check_circle</span>
        <span id="bsmSelectedServiceText">No service selected</span>
      </div>

      <button type="submit" class="bsm-submit" id="bsmSubmitBtn">
        <span id="bsmBtnText">
          <i class="fa-solid fa-calendar-check me-2"></i>Confirm Booking
        </span>
        <span id="bsmBtnLoader" style="display:none">
          <i class="fa-solid fa-spinner fa-spin me-2"></i>Submitting…
        </span>
      </button>

      <!-- Success -->
      <div class="bsm-success" id="bsmSuccess" style="display:none">
        <div class="bsm-success-icon"><i class="fa-solid fa-circle-check"></i></div>
        <div>
          <strong>Booking Confirmed!</strong><br>
          <small>Our care coordinator will call you within 1 hour. A confirmation has been sent to <strong>info@stoichomecare.in</strong>.</small>
        </div>
      </div>

      <!-- Error -->
      <div class="bsm-error" id="bsmError" style="display:none"></div>
    </form>

    <!-- Footer note -->
    <p class="bsm-footer-note">
      <i class="fa-solid fa-phone me-1"></i> Prefer to call?
      <a href="tel:+917668232867">+91 76682 32867</a> — Available 24/7
    </p>

  </div>
</div>

<!-- ══ STYLES ══ -->
<style>
/* Overlay */
.bsm-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(8, 18, 45, 0.75);
  backdrop-filter: blur(8px);
  z-index: 9999;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.bsm-overlay.active {
  display: flex;
  animation: bsmOverlayIn .2s ease;
}
@keyframes bsmOverlayIn { from{opacity:0} to{opacity:1} }

/* Box */
.bsm-box {
  background: #fff;
  border-radius: 24px;
  width: 100%;
  max-width: 600px;
  max-height: 93vh;
  overflow-y: auto;
  padding: 2rem 2rem 1.5rem;
  position: relative;
  animation: bsmBoxIn .3s cubic-bezier(.34,1.56,.64,1);
  box-shadow: 0 40px 100px rgba(8,18,45,.32);
  scrollbar-width: thin;
  scrollbar-color: var(--accent,#4ecdc4) transparent;
}
@keyframes bsmBoxIn {
  from { opacity:0; transform:translateY(32px) scale(.95); }
  to   { opacity:1; transform:none; }
}

/* Close */
.bsm-close {
  position: absolute; top: 1.1rem; right: 1.3rem;
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--light,#f0f4ff); border: none;
  font-size: 1.2rem; cursor: pointer;
  color: var(--dark,#1a3a6b);
  display: flex; align-items: center; justify-content: center;
  transition: background .2s, transform .25s;
}
.bsm-close:hover { background: #fde8e8; color:#d32f2f; transform:rotate(90deg); }

/* Header */
.bsm-header {
  display: flex; align-items: center; gap: 1rem;
  margin-bottom: 1.2rem;
  padding-bottom: 1.2rem;
  border-bottom: 2px solid #f0f4ff;
}
.bsm-header-icon {
  width: 52px; height: 52px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--primary,#1a3a6b), var(--accent,#4ecdc4));
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
}
.bsm-header-icon .material-icons-round { color:#fff; font-size:1.5rem; }
.bsm-header h3 { margin:0; font-size:1.3rem; font-weight:700; color:var(--dark,#1a3a6b); }
.bsm-header p  { margin:0; font-size:.83rem; color:#777; }

/* Trust strip */
.bsm-trust {
  display: flex; gap: 1rem; flex-wrap: wrap;
  background: linear-gradient(135deg,rgba(26,58,107,.04),rgba(78,205,196,.08));
  border: 1px solid rgba(78,205,196,.2);
  border-radius: 10px;
  padding: .65rem 1rem;
  margin-bottom: 1.4rem;
  font-size: .78rem; font-weight: 600; color: var(--primary,#1a3a6b);
}
.bsm-trust span { display:flex; align-items:center; gap:.35rem; }
.bsm-trust i { color: var(--accent,#4ecdc4); }

/* Form layout */
.bsm-row { display:grid; grid-template-columns:1fr 1fr; gap:.85rem; }
@media(max-width:500px){ .bsm-row{ grid-template-columns:1fr; } }
.bsm-group { display:flex; flex-direction:column; gap:.35rem; margin-bottom:.85rem; }
.bsm-group label { font-size:.8rem; font-weight:700; color:var(--dark,#1a3a6b); letter-spacing:.02em; }
.bsm-req { color:#e53935; }

/* Input with icon */
.bsm-input-wrap { position: relative; }
.bsm-input-icon {
  position: absolute; left: .75rem; top: 50%; transform: translateY(-50%);
  font-size: 1.1rem; color: #aab4cc; pointer-events: none;
}
.bsm-input {
  width: 100%; padding: .65rem .9rem .65rem 2.4rem;
  border: 1.5px solid #dde3f0; border-radius: 10px;
  font-size: .9rem; color: #222; background: #fff;
  transition: border-color .2s, box-shadow .2s;
  font-family: inherit; outline: none;
}
.bsm-input:focus {
  border-color: var(--accent,#4ecdc4);
  box-shadow: 0 0 0 3px rgba(78,205,196,.14);
}
.bsm-input.is-error { border-color: #e53935 !important; box-shadow: 0 0 0 3px rgba(229,57,53,.1) !important; }
.bsm-textarea { resize:vertical; min-height:76px; padding-top:.65rem; }

/* Selected service pill */
.bsm-selected-service {
  display: flex; align-items: center; gap: .6rem;
  background: linear-gradient(135deg,rgba(78,205,196,.1),rgba(26,58,107,.06));
  border: 1.5px solid rgba(78,205,196,.3);
  border-radius: 10px; padding: .7rem 1rem;
  margin-bottom: 1rem;
  font-size: .88rem; font-weight: 600; color: var(--primary,#1a3a6b);
}
.bsm-selected-service .material-icons-round { color:var(--accent,#4ecdc4); font-size:1.2rem; }

/* Submit */
.bsm-submit {
  width: 100%; padding: .95rem;
  background: linear-gradient(135deg, var(--primary,#1a3a6b) 0%, var(--accent,#4ecdc4) 100%);
  color: #fff; border: none; border-radius: 12px;
  font-size: 1rem; font-weight: 700; cursor: pointer;
  font-family: inherit; letter-spacing: .02em;
  transition: opacity .2s, transform .15s, box-shadow .2s;
  box-shadow: 0 6px 20px rgba(78,205,196,.3);
}
.bsm-submit:hover:not(:disabled) { opacity:.9; transform:translateY(-2px); box-shadow:0 10px 28px rgba(78,205,196,.4); }
.bsm-submit:disabled { opacity:.6; cursor:not-allowed; transform:none; }

/* Success */
.bsm-success {
  display: flex; align-items: flex-start; gap: .85rem;
  background: #e8f5e9; color: #1b5e20;
  border-radius: 12px; padding: 1rem 1.1rem; margin-top: .85rem;
  font-size: .9rem; border: 1px solid #a5d6a7;
}
.bsm-success-icon { font-size: 1.8rem; color: #2e7d32; flex-shrink:0; line-height:1; }

/* Error */
.bsm-error {
  background: #fdecea; color: #b71c1c;
  border-radius: 10px; padding: .75rem 1rem;
  margin-top: .85rem; font-size: .88rem;
  border: 1px solid #ef9a9a;
}

/* Footer note */
.bsm-footer-note {
  text-align: center; font-size: .8rem; color: #888;
  margin: 1rem 0 0; padding-top: .85rem;
  border-top: 1px solid #f0f4ff;
}
.bsm-footer-note a { color: var(--primary,#1a3a6b); font-weight:600; text-decoration:none; }
.bsm-footer-note a:hover { color: var(--accent,#4ecdc4); }
</style>

<!-- ══ SCRIPT ══ -->
<script>
/**
 * openBookModal(serviceName)
 * Call from any "Book Now" button, passing the service name.
 */
function openBookModal(serviceName) {
  // Set service name in hidden input and display label
  document.getElementById('bsmServiceName').value           = serviceName;
  document.getElementById('bsmServiceLabel').textContent    = 'Booking: ' + serviceName;
  document.getElementById('bsmSelectedServiceText').textContent = serviceName;

  // Reset form cleanly
  document.getElementById('bookServiceForm').reset();
  document.getElementById('bsmServiceName').value = serviceName; // re-set after reset

  // Reset UI
  document.getElementById('bsmSuccess').style.display  = 'none';
  document.getElementById('bsmError').style.display    = 'none';
  document.getElementById('bsmBtnText').style.display   = 'inline';
  document.getElementById('bsmBtnLoader').style.display = 'none';
  document.getElementById('bsmSubmitBtn').disabled      = false;
  document.querySelectorAll('.bsm-input').forEach(el => el.classList.remove('is-error'));

  // Show
  document.getElementById('bookServiceModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBookModal() {
  document.getElementById('bookServiceModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Backdrop click closes
document.getElementById('bookServiceModal').addEventListener('click', function(e) {
  if (e.target === this) closeBookModal();
});

// ESC closes
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeBookModal();
});

// Submit
document.getElementById('bookServiceForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Validate required fields
  let valid = true;
  const required = [
    { id: 'bsmName',  msg: 'Please enter your full name.' },
    { id: 'bsmPhone', msg: 'Please enter your phone number.' },
    { id: 'bsmCity',  msg: 'Please enter your city.' },
  ];
  required.forEach(({ id }) => {
    const el = document.getElementById(id);
    el.classList.remove('is-error');
    if (!el.value.trim()) { el.classList.add('is-error'); valid = false; }
  });

  if (!valid) {
    showBsmError('Please fill in all required fields (Name, Phone, City).');
    return;
  }

  // Email format check
  const emailEl = document.getElementById('bsmEmail');
  if (emailEl.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
    emailEl.classList.add('is-error');
    showBsmError('Please enter a valid email address.');
    return;
  }

  document.getElementById('bsmError').style.display = 'none';

  // Loading state
  document.getElementById('bsmBtnText').style.display   = 'none';
  document.getElementById('bsmBtnLoader').style.display = 'inline';
  document.getElementById('bsmSubmitBtn').disabled      = true;

  try {
    const res  = await fetch('<?= BASE_URL ?>/api/book_service.php', {
      method: 'POST',
      body: new FormData(this)
    });
    const data = await res.json();

    if (data.success) {
      document.getElementById('bsmSuccess').style.display = 'flex';
      this.reset();
      setTimeout(closeBookModal, 4000); // auto-close after 4s
    } else {
      throw new Error(data.message || 'Booking failed. Please try again.');
    }
  } catch (err) {
    showBsmError(err.message);
    document.getElementById('bsmBtnText').style.display   = 'inline';
    document.getElementById('bsmBtnLoader').style.display = 'none';
    document.getElementById('bsmSubmitBtn').disabled      = false;
  }
});

function showBsmError(msg) {
  const el = document.getElementById('bsmError');
  el.textContent = msg;
  el.style.display = 'block';
}
</script>
