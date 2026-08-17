'use client';

import { useState } from 'react';

export default function HomeEnquiryForm() {
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setErrorMsg(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card" style={{ padding: '3.5rem 3rem', background: '#fff', borderRadius: '24px', boxShadow: '0 25px 60px rgba(15,34,64,0.06)', border: '1px solid rgba(0,0,0,0.03)' }}>
      <h4 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f2240' }}>Send Us an Enquiry</h4>
      <p className="form-subtitle" style={{ color: '#6c757d', marginBottom: '2.5rem' }}>We respond within 1 hour, day or night.</p>
      
      {errorMsg && (
        <div className="alert alert-danger" style={{ borderRadius: '12px', fontWeight: 600 }}>
          <i className="fa-solid fa-triangle-exclamation me-2"></i> {errorMsg}
        </div>
      )}

      <form id="enquiryForm" className="modern-form" onSubmit={handleSubmit}>
        <style dangerouslySetInnerHTML={{__html: `
          .form-floating > .form-control, .form-floating > .form-select { border: none; border-bottom: 2px solid #e0e6ed; border-radius: 0; padding-left: 0; padding-right: 0; font-size: 1.05rem; transition: border-color 0.3s; box-shadow: none; background: transparent; padding-top: 1.625rem; padding-bottom: 0.625rem; height: calc(3.5rem + 2px); }
          .form-floating > .form-control:focus, .form-floating > .form-select:focus { border-bottom-color: #0CB8C9; box-shadow: none; background: transparent; }
          .form-floating > label { padding-left: 0; padding-right: 0; font-weight: 600; color: #8e9aab; letter-spacing: 0.02em; }
          .form-floating > .form-control:focus ~ label, .form-floating > .form-control:not(:placeholder-shown) ~ label, .form-floating > .form-select ~ label { color: #0CB8C9; font-size: 0.85rem; opacity: 0.8; transform: scale(.85) translateY(-.5rem) translateX(.15rem); }
        `}} />
        <div className="row g-4">
          <div className="col-md-6">
            <div className="form-floating">
              <input type="text" name="name" className="form-control" id="formName" placeholder="Full Name" required />
              <label htmlFor="formName">Full Name *</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input type="tel" name="phone" className="form-control" id="formPhone" placeholder="Mobile Number" required />
              <label htmlFor="formPhone">Mobile Number *</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input type="email" name="email" className="form-control" id="formEmail" placeholder="Email Address (Optional)" />
              <label htmlFor="formEmail">Email <span style={{ opacity: 0.6, fontWeight: 400 }}>(Optional)</span></label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <select name="service" className="form-select" id="formService" defaultValue="">
                <option value="" disabled></option>
                <option value="ICU Setup @ Home">ICU Setup @ Home</option>
                <option value="ICU Trained Nursing">ICU Trained Nursing</option>
                <option value="Old Age Care">Old Age Care</option>
                <option value="Mother & Baby Care">Mother & Baby Care</option>
                <option value="Doctor on Call">Doctor on Call</option>
                <option value="Physiotherapy @ Home">Physiotherapy @ Home</option>
                <option value="Oxygen Concentrator">Oxygen Concentrator</option>
                <option value="Hospital Bed">Hospital Bed</option>
                <option value="Wheelchair">Wheelchair</option>
              </select>
              <label htmlFor="formService">Service <span style={{ opacity: 0.6, fontWeight: 400 }}>(Optional)</span></label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <input type="text" name="city" className="form-control" id="formCity" placeholder="City / Location" />
              <label htmlFor="formCity">City / Location <span style={{ opacity: 0.6, fontWeight: 400 }}>(Optional)</span></label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <textarea name="message" className="form-control" id="formMessage" placeholder="Message" style={{ height: '100px' }}></textarea>
              <label htmlFor="formMessage">Message <span style={{ opacity: 0.6, fontWeight: 400 }}>(Optional)</span></label>
            </div>
          </div>
          <div className="col-12 mt-4 pt-2">
            <button type="submit" disabled={loading} className="btn-form-submit w-100" style={{ padding: '1.1rem', borderRadius: '12px', fontSize: '1.1rem', background: 'linear-gradient(135deg, #0CB8C9, #1D9E75)', color: '#fff', border: 'none', fontWeight: 700, boxShadow: '0 15px 30px rgba(12, 184, 201, 0.3)' }}>
              {loading ? 'Sending...' : <><i className="fa-solid fa-paper-plane me-2"></i> Send Enquiry — We Call Back Within 1 Hour</>}
            </button>
          </div>
          {success && (
            <div className="col-12">
              <div className="form-success mt-3" style={{ background: '#e8f5e9', color: '#2e7d32', padding: '1rem', borderRadius: '12px', fontWeight: 600 }}>
                <i className="fa-solid fa-circle-check me-2"></i> Thank you! Our care coordinator will contact you shortly.
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
