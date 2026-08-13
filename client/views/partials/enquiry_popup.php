<?php /* ── Enquiry Popup ── */ ?>

<div id="eq-overlay">
  <div id="eq-popup">
    <div style="height:4px;background:#1D9E75;"></div>

    <div style="background:#0CB8C9;padding:28px 28px 20px;text-align:center;position:relative;">
      <button onclick="closeEnquiryPopup()" aria-label="Close"
        style="position:absolute;top:13px;right:15px;background:rgba(255,255,255,.22);border:none;border-radius:50%;width:30px;height:30px;color:#fff;font-size:16px;cursor:pointer;line-height:30px;">✕</button>
      <div style="width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </div>
      <h2 style="color:#fff;font-size:20px;font-weight:700;margin:0 0 4px;">Get a Free Callback</h2>
      <p style="color:rgba(255,255,255,.85);font-size:13px;margin:0;">We'll call you back within 60 minutes</p>
    </div>

    <div style="padding:24px 28px 28px;background:#fff;">
      <form id="eqPopupForm" novalidate>

        <div style="margin-bottom:16px;">
          <label style="display:block;font-size:11px;font-weight:700;color:#0F6E56;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Your Name *</label>
          <div style="position:relative;">
            <svg style="position:absolute;left:13px;top:50%;transform:translateY(-50%);width:17px;height:17px;stroke:#0CB8C9;fill:none;" viewBox="0 0 24 24" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <input type="text" name="name" id="eqName" placeholder="Enter your full name" required
              style="width:100%;height:48px;border:1.5px solid #B5D4F4;border-radius:10px;padding:0 14px 0 42px;font-size:15px;outline:none;box-sizing:border-box;transition:border-color .2s;"
              onfocus="this.style.borderColor='#0CB8C9'" onblur="this.style.borderColor='#B5D4F4'">
          </div>
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block;font-size:11px;font-weight:700;color:#0F6E56;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Phone Number *</label>
          <div style="position:relative;">
            <svg style="position:absolute;left:13px;top:50%;transform:translateY(-50%);width:17px;height:17px;stroke:#0CB8C9;fill:none;" viewBox="0 0 24 24" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <input type="tel" name="phone" id="eqPhone" placeholder="+91 XXXXX XXXXX" required maxlength="10"
              style="width:100%;height:48px;border:1.5px solid #B5D4F4;border-radius:10px;padding:0 14px 0 42px;font-size:15px;outline:none;box-sizing:border-box;transition:border-color .2s;"
              onfocus="this.style.borderColor='#0CB8C9'" onblur="this.style.borderColor='#B5D4F4'">
          </div>
          <p id="eqPhoneErr" style="display:none;color:#c0392b;font-size:12px;margin-top:5px;">Please enter a valid 10-digit Indian mobile number.</p>
        </div>

        <button type="submit" id="eqSubmitBtn"
          style="width:100%;height:50px;background:#0CB8C9;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background .15s;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Request Free Callback
        </button>

        <div id="eqSuccess" style="display:none;margin-top:14px;background:#E1F5EE;border:1px solid #5DCAA5;border-radius:10px;padding:12px 16px;color:#0F6E56;font-size:14px;text-align:center;">
          ✓ &nbsp;Thank you! We'll call you within 60 minutes.
        </div>

        <p style="text-align:center;font-size:12px;color:#aaa;margin-top:14px;">Available <strong style="color:#0CB8C9;">24/7</strong> · No spam, ever</p>
      </form>
    </div>
  </div>
</div>

<style>
/* Hidden by default — NO inline style on the element so .active can override */
#eq-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  z-index: 99999;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}
#eq-overlay.active {
  display: flex;
}
#eq-popup {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
  overflow: hidden;
  animation: eqIn .25s ease;
  max-height: 90vh;
  overflow-y: auto;
}
@keyframes eqIn {
  from { opacity:0; transform:scale(.93) translateY(20px); }
  to   { opacity:1; transform:scale(1)  translateY(0);     }
}
@media (max-width: 480px) {
  #eq-popup { border-radius: 16px; }
  #eq-overlay { padding: 12px; align-items: flex-end; }
  #eq-popup { animation: eqSlideUp .25s ease; }
  @keyframes eqSlideUp {
    from { opacity:0; transform:translateY(60px); }
    to   { opacity:1; transform:translateY(0);    }
  }
}
</style>

<script>
function openEnquiryPopup() {
  document.getElementById('eq-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeEnquiryPopup() {
  document.getElementById('eq-overlay').classList.remove('active');
  document.body.style.overflow = '';
  sessionStorage.setItem('eq_shown', '1');
}

// Close on backdrop click
document.getElementById('eq-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeEnquiryPopup();
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeEnquiryPopup();
});

// Form submit
document.getElementById('eqPopupForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name  = document.getElementById('eqName').value.trim();
  const phone = document.getElementById('eqPhone').value.trim().replace(/\D/g, '');
  const errEl = document.getElementById('eqPhoneErr');
  const btn   = document.getElementById('eqSubmitBtn');

  if (!/^[6-9][0-9]{9}$/.test(phone)) {
    errEl.style.display = 'block';
    document.getElementById('eqPhone').style.borderColor = '#c0392b';
    return;
  }
  errEl.style.display = 'none';
  btn.disabled = true;
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Sending…';

  try {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('phone', phone);
    const res  = await fetch('<?= BASE_URL ?>/api/popup_enquiry.php', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.success) {
      document.getElementById('eqSuccess').style.display = 'block';
      this.querySelectorAll('input, button[type=submit]').forEach(el => el.style.display = 'none');
      sessionStorage.setItem('eq_shown', '1');
      setTimeout(closeEnquiryPopup, 3500);
    } else {
      alert(data.message || 'Something went wrong. Please try again.');
      btn.disabled = false;
      btn.innerHTML = 'Request Free Callback';
    }
  } catch (err) {
    alert('Network error. Please try again.');
    btn.disabled = false;
    btn.innerHTML = 'Request Free Callback';
  }
});

// Auto-open after 12s, once per session
if (!sessionStorage.getItem('eq_shown')) {
  setTimeout(function() {
    openEnquiryPopup();
    sessionStorage.setItem('eq_shown', '1');
  }, 12000);
}
</script>
