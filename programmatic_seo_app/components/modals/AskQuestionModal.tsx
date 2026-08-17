"use client";

import { useState, useEffect } from 'react';
import { submitQnaRequest } from '@/lib/actions';

export default function AskQuestionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Listen to custom event to open modal globally
  useEffect(() => {
    const handleOpen = (e: any) => {
      setLocation(e.detail?.location || '');
      setCategory(e.detail?.category || '');
      setSuccess(false);
      setErrorMsg('');
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-ask-modal', handleOpen);
    return () => window.removeEventListener('open-ask-modal', handleOpen);
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
    formData.append('location', location);
    formData.append('category', category);

    const result = await submitQnaRequest(formData);
    
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
    <div className="bsm-overlay active" role="dialog" aria-modal="true" aria-labelledby="askModalTitle" onClick={closeModal}>
      <div className="bsm-box" onClick={e => e.stopPropagation()}>
        <button className="bsm-close" onClick={closeModal} aria-label="Close">&times;</button>

        <div className="bsm-header">
          <div className="bsm-header-icon" style={{ background: 'linear-gradient(135deg, #20c997, #1a3a6b)' }}>
            <span className="material-icons-round text-white fs-3">question_answer</span>
          </div>
          <div>
            <h3 id="askModalTitle">Ask the Experts</h3>
            <p className="text-muted small mb-0">What would you like to know about {category} in {location}?</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="askerName" className="form-label fw-semibold small text-dark mb-1">Your Name <span className="text-danger">*</span></label>
            <input type="text" id="askerName" name="asker_name" className="form-control bg-light" placeholder="Enter your name" required />
          </div>

          <div className="mb-4">
            <label htmlFor="questionText" className="form-label fw-semibold small text-dark mb-1">Your Question <span className="text-danger">*</span></label>
            <textarea id="questionText" name="question" className="form-control bg-light" rows={3} placeholder="Type your question here..." required></textarea>
          </div>

          <button type="submit" className="btn text-white w-100 py-3 fw-bold bsm-submit" style={{ background: 'linear-gradient(135deg, #20c997, #1a3a6b)' }} disabled={isLoading}>
            {isLoading ? (
              <><i className="fa-solid fa-spinner fa-spin me-2"></i>Submitting…</>
            ) : (
              <><i className="fa-solid fa-paper-plane me-2"></i>Submit Question</>
            )}
          </button>

          {success && (
            <div className="d-flex align-items-center gap-3 mt-3 p-3 rounded" style={{ background: '#e8f5e9', color: '#1b5e20', border: '1px solid #a5d6a7' }}>
              <i className="fa-solid fa-circle-check fs-3"></i>
              <div>
                <strong className="d-block mb-1">Question Submitted!</strong>
                <small>Our experts will review and answer it soon.</small>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mt-3 p-3 rounded" style={{ background: '#fdecea', color: '#b71c1c', border: '1px solid #ef9a9a', fontSize: '0.9rem' }}>
              {errorMsg}
            </div>
          )}
        </form>
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
          max-width: 500px;
          max-height: 93vh;
          overflow-y: auto;
          padding: 2rem 2rem 1.5rem;
          position: relative;
          animation: bsmBoxIn .3s cubic-bezier(.34,1.56,.64,1);
          box-shadow: 0 40px 100px rgba(8,18,45,.32);
          scrollbar-width: thin;
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
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }
        
        .bsm-submit {
          box-shadow: 0 6px 20px rgba(32,201,151,.3);
          transition: opacity .2s, transform .15s, box-shadow .2s;
        }
        .bsm-submit:hover:not(:disabled) { opacity:.9; transform:translateY(-2px); box-shadow:0 10px 28px rgba(32,201,151,.4); }
      `}</style>
    </div>
  );
}
