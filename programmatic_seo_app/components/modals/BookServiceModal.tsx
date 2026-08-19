"use client";

import { useState, useEffect } from 'react';
import { bookServiceRequest } from '@/lib/actions';

export default function BookServiceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceName, setServiceName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Listen to custom event to open modal globally
  useEffect(() => {
    const handleOpen = (e: any) => {
      setServiceName(e.detail?.serviceName || '');
      setSuccess(false);
      setErrorMsg('');
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-book-modal', handleOpen);
    return () => window.removeEventListener('open-book-modal', handleOpen);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    formData.append('service_name', serviceName);

    const result = await bookServiceRequest(formData);
    
    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => {
        closeModal();
      }, 4000);
    } else {
      setErrorMsg(result.message);
    }
    
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="bsm-overlay active" role="dialog" aria-modal="true" aria-labelledby="bsmTitle" onClick={closeModal}>
      <div className="bsm-box" onClick={e => e.stopPropagation()}>
        <button className="bsm-close" onClick={closeModal} aria-label="Close">&times;</button>

        <div className="bsm-header">
          <div className="bsm-header-icon">
            <span className="material-icons-round text-white fs-3">medical_services</span>
          </div>
          <div>
            <h3 id="bsmTitle">Book a Service</h3>
            <p id="bsmServiceLabel" className="text-muted small mb-0">Fill in your details and we'll confirm within 1 hour</p>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
          <div className="d-flex align-items-center gap-2 px-3 py-2 rounded shadow-sm border border-primary-subtle" style={{ background: '#f8faff' }}>
            <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '24px', height: '24px', background: '#e0e7ff', color: '#3b82f6' }}>
              <i className="fa-solid fa-shield-heart fs-6"></i>
            </div>
            <span className="fw-bold" style={{ fontSize: '0.8rem', color: '#1e3a8a' }}>Verified Pros</span>
          </div>
          <div className="d-flex align-items-center gap-2 px-3 py-2 rounded shadow-sm border border-info-subtle" style={{ background: '#f0fdfa' }}>
            <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '24px', height: '24px', background: '#ccfbf1', color: '#0d9488' }}>
              <i className="fa-solid fa-bolt fs-6"></i>
            </div>
            <span className="fw-bold" style={{ fontSize: '0.8rem', color: '#134e4a' }}>Fast 1-Hr Callback</span>
          </div>
          <div className="d-flex align-items-center gap-2 px-3 py-2 rounded shadow-sm border border-success-subtle" style={{ background: '#f0fdf4' }}>
            <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '24px', height: '24px', background: '#dcfce7', color: '#22c55e' }}>
              <i className="fa-solid fa-lock fs-6"></i>
            </div>
            <span className="fw-bold" style={{ fontSize: '0.8rem', color: '#14532d' }}>100% Secure</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="bsmName" className="form-label fw-semibold small text-dark mb-1">Full Name <span className="text-danger">*</span></label>
              <input type="text" id="bsmName" name="name" className="form-control bg-light" placeholder="Patient / Contact name" required />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="bsmPhone" className="form-label fw-semibold small text-dark mb-1">Phone Number <span className="text-danger">*</span></label>
              <input type="tel" id="bsmPhone" name="phone" className="form-control bg-light" placeholder="+91 XXXXX XXXXX" required />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="bsmEmail" className="form-label fw-semibold small text-dark mb-1">Email Address</label>
              <input type="email" id="bsmEmail" name="email" className="form-control bg-light" placeholder="you@example.com" />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="bsmCity" className="form-label fw-semibold small text-dark mb-1">City / Area <span className="text-danger">*</span></label>
              <input type="text" id="bsmCity" name="city" className="form-control bg-light" placeholder="e.g. Mumbai, Andheri West" required />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="bsmMessage" className="form-label fw-semibold small text-dark mb-1">Address / Additional Notes</label>
            <textarea id="bsmMessage" name="message" className="form-control bg-light" rows={3} placeholder="Full address, preferred timing, medical condition details…"></textarea>
          </div>

          <div className="bsm-selected-service d-flex align-items-center gap-2 mb-4 p-3 rounded" style={{ background: 'linear-gradient(135deg,rgba(78,205,196,.1),rgba(26,58,107,.06))', border: '1.5px solid rgba(78,205,196,.3)' }}>
            <span className="material-icons-round" style={{ color: '#0CB8C9' }}>check_circle</span>
            <span id="bsmSelectedServiceText" className="fw-semibold" style={{ color: '#1a3a6b' }}>{serviceName || 'No service selected'}</span>
          </div>

          <button type="submit" className="btn text-white w-100 py-3 fw-bold bsm-submit" disabled={isLoading}>
            {isLoading ? (
              <><i className="fa-solid fa-spinner fa-spin me-2"></i>Submitting…</>
            ) : (
              <><i className="fa-solid fa-calendar-check me-2"></i>Confirm Booking</>
            )}
          </button>

          {success && (
            <div className="d-flex align-items-center gap-3 mt-3 p-3 rounded" style={{ background: '#e8f5e9', color: '#1b5e20', border: '1px solid #a5d6a7' }}>
              <i className="fa-solid fa-circle-check fs-3"></i>
              <div>
                <strong className="d-block mb-1">Booking Confirmed!</strong>
                <small>Our care coordinator will call you within 1 hour. A confirmation has been sent to info@stoichomecare.in.</small>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mt-3 p-3 rounded" style={{ background: '#fdecea', color: '#b71c1c', border: '1px solid #ef9a9a', fontSize: '0.9rem' }}>
              {errorMsg}
            </div>
          )}
        </form>

        <p className="text-center mt-4 pt-3 border-top text-muted small">
          <i className="fa-solid fa-phone me-1"></i> Prefer to call? <a href="tel:+917668232867" className="fw-bold" style={{ color: '#1a3a6b', textDecoration: 'none' }}>+91 76682 32867</a> — Available 24/7
        </p>
      </div>

      <style jsx>{`
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
          scrollbar-color: #0CB8C9 transparent;
        }
        @keyframes bsmBoxIn {
          from { opacity:0; transform:translateY(32px) scale(.95); }
          to   { opacity:1; transform:none; }
        }
        
        .bsm-close {
          position: absolute; top: 1.1rem; right: 1.3rem;
          width: 34px; height: 34px; border-radius: 50%;
          background: #f0f4ff; border: none;
          font-size: 1.2rem; cursor: pointer;
          color: #1a3a6b;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s, transform .25s;
        }
        .bsm-close:hover { background: #fde8e8; color:#d32f2f; transform:rotate(90deg); }
        
        .bsm-header {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 1.2rem;
          padding-bottom: 1.2rem;
          border-bottom: 2px solid #f0f4ff;
        }
        .bsm-header-icon {
          width: 52px; height: 52px; flex-shrink: 0;
          background: linear-gradient(135deg, #1a3a6b, #0CB8C9);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }
        
        .bsm-trust {
          display: flex; gap: 1rem; flex-wrap: wrap;
          background: linear-gradient(135deg,rgba(26,58,107,.04),rgba(78,205,196,.08));
          border: 1px solid rgba(78,205,196,.2);
          border-radius: 10px;
          padding: .65rem 1rem;
          font-size: .78rem; font-weight: 600; color: #1a3a6b;
        }
        .bsm-trust span { display:flex; align-items:center; gap:.35rem; }

        .bsm-submit {
          background: linear-gradient(135deg, #1a3a6b 0%, #0CB8C9 100%);
          box-shadow: 0 6px 20px rgba(78,205,196,.3);
          transition: opacity .2s, transform .15s, box-shadow .2s;
        }
        .bsm-submit:hover:not(:disabled) { opacity:.9; transform:translateY(-2px); box-shadow:0 10px 28px rgba(78,205,196,.4); }
      `}</style>
    </div>
  );
}
