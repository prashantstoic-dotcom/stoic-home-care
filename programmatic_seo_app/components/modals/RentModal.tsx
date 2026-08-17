"use client";

import { useState, useEffect } from 'react';
import { submitRentalRequest } from '@/lib/actions';

export default function RentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [equipName, setEquipName] = useState('');
  const [equipId, setEquipId] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Listen to custom event to open modal globally
  useEffect(() => {
    const handleOpen = (e: any) => {
      setEquipName(e.detail?.equipName || '');
      setEquipId(e.detail?.equipId || 0);
      setSuccess(false);
      setErrorMsg('');
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-rent-modal', handleOpen);
    return () => window.removeEventListener('open-rent-modal', handleOpen);
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
    formData.append('equipment_name', equipName);
    formData.append('equipment_id', equipId.toString());

    const result = await submitRentalRequest(formData);
    
    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => {
        closeModal();
      }, 3500);
    } else {
      setErrorMsg(result.message);
    }
    
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="rent-modal-overlay active" role="dialog" aria-modal="true" aria-labelledby="rentModalTitle" onClick={closeModal}>
      <div className="rent-modal-box" onClick={e => e.stopPropagation()}>
        <button className="rent-modal-close" onClick={closeModal} aria-label="Close">&times;</button>

        <div className="rent-modal-header d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
          <div className="rent-modal-icon d-flex align-items-center justify-content-center text-white rounded-3" style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #1a3a6b, #0CB8C9)' }}>
            <i className="fa-solid fa-truck-medical fs-4"></i>
          </div>
          <div>
            <h3 id="rentModalTitle" className="mb-0 fw-bold" style={{ color: '#1a3a6b', fontSize: '1.25rem' }}>Rent Equipment</h3>
            <p className="mb-0 fw-semibold" style={{ color: '#0CB8C9', fontSize: '0.9rem' }}>{equipName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="rentName" className="form-label fw-semibold small text-dark mb-1">Full Name <span className="text-danger">*</span></label>
              <input type="text" id="rentName" name="name" className="form-control bg-light" placeholder="Patient / Contact name" required />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="rentPhone" className="form-label fw-semibold small text-dark mb-1">Phone Number <span className="text-danger">*</span></label>
              <input type="tel" id="rentPhone" name="phone" className="form-control bg-light" placeholder="+91 XXXXX XXXXX" required />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="rentEmail" className="form-label fw-semibold small text-dark mb-1">Email Address</label>
            <input type="email" id="rentEmail" name="email" className="form-control bg-light" placeholder="you@example.com" />
          </div>

          <div className="mb-3">
            <label htmlFor="rentRentalPeriod" className="form-label fw-semibold small text-dark mb-1">Rental Duration</label>
            <select id="rentRentalPeriod" name="rental_period" className="form-select bg-light">
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

          <div className="mb-4">
            <label htmlFor="rentMessage" className="form-label fw-semibold small text-dark mb-1">Address / Additional Notes</label>
            <textarea id="rentMessage" name="message" className="form-control bg-light" rows={3} placeholder="Your delivery address, special requirements, doctor's advice…"></textarea>
          </div>

          <button type="submit" className="btn text-white w-100 py-2 fw-bold" style={{ background: 'linear-gradient(135deg, #1a3a6b, #0CB8C9)', borderRadius: '8px' }} disabled={isLoading}>
            {isLoading ? (
              <><i className="fa-solid fa-spinner fa-spin me-2"></i>Submitting…</>
            ) : (
              <><i className="fa-solid fa-paper-plane me-2"></i>Submit Rental Request</>
            )}
          </button>

          {success && (
            <div className="d-flex align-items-center gap-3 mt-3 p-3 rounded" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
              <i className="fa-solid fa-circle-check fs-3"></i>
              <div>
                <strong className="d-block mb-1">Request Received!</strong>
                <small>Our team will call you within 1 hour to confirm your rental.</small>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mt-3 p-3 rounded" style={{ background: '#fdecea', color: '#c62828', fontSize: '0.9rem' }}>
              {errorMsg}
            </div>
          )}
        </form>
      </div>

      <style jsx>{`
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
          background: #f0f4ff; border: none;
          width: 36px; height: 36px; border-radius: 50%;
          font-size: 1.3rem; cursor: pointer;
          color: #1a3a6b;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s, transform .2s;
        }
        .rent-modal-close:hover { background:#fde8e8; color:#d32f2f; transform:rotate(90deg); }
      `}</style>
    </div>
  );
}
