
<!-- ══ RENT NOW MODAL ══ -->
<div id="rentModal" class="rent-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="rentModalTitle">
  <div class="rent-modal-box">

    <button class="rent-modal-close" onclick="closeRentModal()" aria-label="Close">&times;</button>

    <!-- Header -->
    <div class="rent-modal-header">
      <div class="rent-modal-icon">
        <span class="material-icons-round">medical_services</span>
      </div>
      <div>
        <h3 id="rentModalTitle">Rent Equipment</h3>
        <p id="rentModalEquipName" style="color:var(--accent,#4ecdc4);font-weight:600;margin:0;font-size:.9rem"></p>
      </div>
    </div>

    <!-- Form — fields match book_equipment.php exactly -->
    <form id="rentForm" novalidate>
      <input type="hidden" name="equipment_id"   id="rentEquipmentId">
      <input type="hidden" name="equipment_name" id="rentEquipmentName">

      <div class="rent-form-row">
        <div class="rent-form-group">
          <label for="rentName">Full Name <span class="req">*</span></label>
          <input type="text" id="rentName" name="name" class="rent-input"
                 placeholder="Patient / Contact name" required>
        </div>
        <div class="rent-form-group">
          <label for="rentPhone">Phone Number <span class="req">*</span></label>
          <input type="tel" id="rentPhone" name="phone" class="rent-input"
                 placeholder="+91 XXXXX XXXXX" required>
        </div>
      </div>

      <div class="rent-form-group">
        <label for="rentEmail">Email Address</label>
        <input type="email" id="rentEmail" name="email" class="rent-input"
               placeholder="you@example.com">
      </div>

      <div class="rent-form-group">
        <label for="rentRentalPeriod">Rental Duration</label>
        <select id="rentRentalPeriod" name="rental_period" class="rent-input">
          <option value="">Select duration</option>
          <option value="1 Week">1 Week</option>
          <option value="2 Weeks">2 Weeks</option>
          <option value="1 Month">1 Month</option>
          <option value="2 Months">2 Months</option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="To be discussed">To be discussed</option>
        </select>
      </div>

      <div class="rent-form-group">
        <label for="rentMessage">Address / Additional Notes</label>
        <textarea id="rentMessage" name="message" class="rent-input rent-textarea" rows="3"
                  placeholder="Your delivery address, special requirements, doctor's advice…"></textarea>
      </div>

      <button type="submit" class="rent-submit-btn" id="rentSubmitBtn">
        <span id="rentBtnText"><i class="fa-solid fa-paper-plane me-2"></i>Submit Rental Request</span>
        <span id="rentBtnLoader" style="display:none"><i class="fa-solid fa-spinner fa-spin me-2"></i>Submitting…</span>
      </button>

      <div class="rent-success" id="rentSuccess" style="display:none">
        <i class="fa-solid fa-circle-check"></i>
        <div>
          <strong>Request Received!</strong><br>
          <small>Our team will call you within 1 hour to confirm your rental.</small>
        </div>
      </div>

      <div class="rent-error" id="rentError" style="display:none"></div>
    </form>

  </div>
</div>

<!-- ══ STYLES ══ -->
<style>
.rent-modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(10,20,50,.72);
  backdrop-filter: blur(6px);
  z-index: 9999;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.rent-modal-overlay.active {
  display: flex;
  animation: overlayIn .2s ease;
}
@keyframes overlayIn { from{opacity:0} to{opacity:1} }

.rent-modal-box {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 92vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  animation: boxIn .28s cubic-bezier(.34,1.56,.64,1);
  box-shadow: 0 32px 80px rgba(10,20,50,.28);
  scrollbar-width: thin;
}
@keyframes boxIn {
  from { opacity:0; transform:translateY(28px) scale(.96); }
  to   { opacity:1; transform:none; }
}

.rent-modal-close {
  position: absolute; top: 1rem; right: 1.2rem;
  background: var(--light,#f0f4ff); border: none;
  width: 36px; height: 36px; border-radius: 50%;
  font-size: 1.3rem; cursor: pointer;
  color: var(--dark,#1a3a6b);
  display: flex; align-items: center; justify-content: center;
  transition: background .2s, transform .2s;
}
.rent-modal-close:hover { background:#fde8e8; color:#d32f2f; transform:rotate(90deg); }

.rent-modal-header {
  display: flex; align-items: center; gap: 1rem;
  margin-bottom: 1.5rem; padding-bottom: 1rem;
  border-bottom: 2px solid var(--light,#f0f4ff);
}
.rent-modal-icon {
  width: 50px; height: 50px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--primary,#1a3a6b), var(--accent,#4ecdc4));
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
}
.rent-modal-icon .material-icons-round { color:#fff; font-size:1.5rem; }
.rent-modal-header h3 { margin:0; font-size:1.25rem; color:var(--dark,#1a3a6b); font-weight:700; }

.rent-form-row { display:grid; grid-template-columns:1fr 1fr; gap:.85rem; }
@media(max-width:500px){ .rent-form-row{ grid-template-columns:1fr; } }

.rent-form-group { display:flex; flex-direction:column; gap:.35rem; margin-bottom:.85rem; }
.rent-form-group label { font-size:.82rem; font-weight:600; color:var(--dark,#1a3a6b); }
.req { color:#e53935; }

.rent-input {
  width: 100%; padding: .62rem .9rem;
  border: 1.5px solid #dde3f0; border-radius: 10px;
  font-size: .9rem; color: #222; background: #fff;
  transition: border-color .2s, box-shadow .2s;
  font-family: inherit; outline: none;
}
.rent-input:focus {
  border-color: var(--accent,#4ecdc4);
  box-shadow: 0 0 0 3px rgba(78,205,196,.15);
}
.rent-input.is-error { border-color: #e53935 !important; }
.rent-textarea { resize: vertical; min-height: 72px; }

.rent-submit-btn {
  width: 100%; padding: .9rem;
  background: linear-gradient(135deg, var(--primary,#1a3a6b), var(--accent,#4ecdc4));
  color: #fff; border: none; border-radius: 12px;
  font-size: 1rem; font-weight: 700; cursor: pointer;
  transition: opacity .2s, transform .15s;
  font-family: inherit; margin-top: .25rem;
}
.rent-submit-btn:hover:not(:disabled) { opacity:.9; transform:translateY(-1px); }
.rent-submit-btn:disabled { opacity:.6; cursor:not-allowed; }

.rent-success {
  display: flex; align-items: center; gap: .75rem;
  background: #e8f5e9; color: #2e7d32;
  border-radius: 10px; padding: .9rem 1rem; margin-top: .85rem;
  font-size: .9rem;
}
.rent-success i { font-size:1.5rem; flex-shrink:0; }
.rent-error {
  background: #fdecea; color: #c62828;
  border-radius: 10px; padding: .75rem 1rem;
  margin-top: .85rem; font-size: .88rem;
}
</style>

<!-- ══ SCRIPT ══ -->
<script>
/**
 * openRentModal(equipName, equipId)
 * Call this from any "Rent Now" button.
 * equipId is optional — pass the DB row id if available.
 */
function openRentModal(equipName, equipId = 0) {
  // Pre-fill hidden fields
  document.getElementById('rentEquipmentId').value    = equipId;
  document.getElementById('rentEquipmentName').value  = equipName;
  document.getElementById('rentModalEquipName').textContent = equipName;

  // Reset form cleanly
  document.getElementById('rentForm').reset();
  // Re-set hidden fields after reset
  document.getElementById('rentEquipmentId').value    = equipId;
  document.getElementById('rentEquipmentName').value  = equipName;

  // Reset UI state
  document.getElementById('rentSuccess').style.display  = 'none';
  document.getElementById('rentError').style.display    = 'none';
  document.getElementById('rentBtnText').style.display   = 'inline';
  document.getElementById('rentBtnLoader').style.display = 'none';
  document.getElementById('rentSubmitBtn').disabled      = false;
  document.querySelectorAll('.rent-input').forEach(el => el.classList.remove('is-error'));

  // Show modal
  document.getElementById('rentModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeRentModal() {
  document.getElementById('rentModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.getElementById('rentModal').addEventListener('click', function(e) {
  if (e.target === this) closeRentModal();
});

// Close on ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeRentModal();
});

// Form submit handler
document.getElementById('rentForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Validate required fields
  let valid = true;
  ['rentName', 'rentPhone'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('is-error');
    if (!el.value.trim()) { el.classList.add('is-error'); valid = false; }
  });
  if (!valid) {
    showRentError('Please fill in your Name and Phone Number.');
    return;
  }
  document.getElementById('rentError').style.display = 'none';

  // Show loading state
  document.getElementById('rentBtnText').style.display   = 'none';
  document.getElementById('rentBtnLoader').style.display = 'inline';
  document.getElementById('rentSubmitBtn').disabled      = true;

  try {
    const res  = await fetch('<?= BASE_URL ?>/api/book_equipment.php', {
      method: 'POST',
      body: new FormData(this)
    });
    const data = await res.json();

    if (data.success) {
      document.getElementById('rentSuccess').style.display = 'flex';
      this.reset();
      setTimeout(closeRentModal, 3500); // auto-close after 3.5s
    } else {
      throw new Error(data.message || 'Something went wrong. Please try again.');
    }
  } catch (err) {
    showRentError(err.message);
    document.getElementById('rentBtnText').style.display   = 'inline';
    document.getElementById('rentBtnLoader').style.display = 'none';
    document.getElementById('rentSubmitBtn').disabled      = false;
  }
});

function showRentError(msg) {
  const el = document.getElementById('rentError');
  el.textContent = msg;
  el.style.display = 'block';
}
</script>
