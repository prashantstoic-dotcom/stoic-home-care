'use client';

import { useState } from 'react';
import { TriangleAlert, Send, CheckCircle } from 'lucide-react';

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
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
      <h4 className="text-2xl font-bold text-[#0f2240] mb-2">Send Us an Enquiry</h4>
      <p className="text-[#6b82a3] mb-8">We respond within 1 hour, day or night.</p>
      
      {errorMsg && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl p-4 mb-6 font-semibold flex items-center gap-2">
          <TriangleAlert size={18} /> {errorMsg}
        </div>
      )}

      <form id="enquiryForm" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="formName" className="stoic-label">Full Name *</label>
            <input type="text" name="name" className="stoic-input" id="formName" placeholder="Full Name" required />
          </div>
          <div>
            <label htmlFor="formPhone" className="stoic-label">Mobile Number *</label>
            <input type="tel" name="phone" className="stoic-input" id="formPhone" placeholder="Mobile Number" required />
          </div>
          <div>
            <label htmlFor="formEmail" className="stoic-label">Email <span className="opacity-60 font-normal">(Optional)</span></label>
            <input type="email" name="email" className="stoic-input" id="formEmail" placeholder="Email Address (Optional)" />
          </div>
          <div>
            <label htmlFor="formService" className="stoic-label">Service <span className="opacity-60 font-normal">(Optional)</span></label>
            <select name="service" className="stoic-input" id="formService" defaultValue="">
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
          </div>
          <div className="md:col-span-2">
            <label htmlFor="formCity" className="stoic-label">City / Location <span className="opacity-60 font-normal">(Optional)</span></label>
            <input type="text" name="city" className="stoic-input" id="formCity" placeholder="City / Location" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="formMessage" className="stoic-label">Message <span className="opacity-60 font-normal">(Optional)</span></label>
            <textarea name="message" className="stoic-input" id="formMessage" placeholder="Message" style={{ height: '100px' }}></textarea>
          </div>
          
          <div className="md:col-span-2 mt-2">
            <button type="submit" disabled={loading} className="w-full py-4 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-[#0CB8C9] to-[#1D9E75] shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2">
              {loading ? (
                'Sending...'
              ) : (
                <>
                  <Send size={18} /> Send Enquiry — We Call Back Within 1 Hour
                </>
              )}
            </button>
          </div>
          
          {success && (
            <div className="md:col-span-2">
              <div className="bg-green-50 text-green-700 border border-green-200 rounded-xl p-4 mt-4 font-semibold flex items-center gap-2">
                <CheckCircle size={18} /> Thank you! Our care coordinator will contact you shortly.
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
