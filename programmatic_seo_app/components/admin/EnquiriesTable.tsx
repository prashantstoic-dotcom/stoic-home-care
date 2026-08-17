"use client";

import { useState } from "react";
import { updateEnquiryStatus, deleteEnquiry } from "@/lib/admin-enquiry-actions";
import { toast } from "react-hot-toast";

export default function EnquiriesTable({ enquiries, type }: { enquiries: any[], type: 'popup' | 'general' }) {
  const [list, setList] = useState(enquiries);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleStatusChange = async (id: number, currentStatus: string) => {
    // Toggle logic: pending -> contacted -> resolved
    const newStatus = !currentStatus || currentStatus === 'pending' 
      ? 'contacted' 
      : (currentStatus === 'contacted' ? 'resolved' : 'pending');
      
    setLoadingId(id);
    try {
      const result = await updateEnquiryStatus(id, type, newStatus);
      if (result.success) {
        setList(list.map(e => e.id === id ? { ...e, status: newStatus } : e));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      toast.error("Server error");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    
    setLoadingId(id);
    try {
      const result = await deleteEnquiry(id, type);
      if (result.success) {
        setList(list.filter(e => e.id !== id));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      toast.error("Server error");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="py-3">Name</th>
            <th className="py-3">Phone</th>
            <th className="py-3">{type === 'popup' ? 'Interested In' : 'Message'}</th>
            <th className="py-3">Status</th>
            <th className="py-3 text-end px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-5 text-muted">No enquiries found.</td>
            </tr>
          ) : (
            list.map((enq) => {
              const status = enq.status || 'pending';
              let badgeColor = 'bg-danger text-white'; // pending
              if (status === 'contacted') badgeColor = 'bg-warning text-dark';
              if (status === 'resolved') badgeColor = 'bg-success text-white';

              return (
                <tr key={enq.id}>
                  <td className="px-4 text-muted small">
                    {new Date(enq.created_at).toLocaleDateString()}<br/>
                    {new Date(enq.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="fw-semibold text-dark">{enq.name}</td>
                  <td>
                    <a href={`tel:${enq.phone}`} className="text-decoration-none">
                      {enq.phone}
                    </a>
                  </td>
                  <td>
                    {type === 'popup' ? (
                      <span className="badge bg-light text-dark border">{enq.service_interest || 'General'}</span>
                    ) : (
                      <div className="text-truncate" style={{ maxWidth: '200px' }} title={enq.message}>
                        {enq.message || 'No message'}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${badgeColor}`} style={{ cursor: 'pointer' }} onClick={() => handleStatusChange(enq.id, status)}>
                      {loadingId === enq.id ? <i className="fa-solid fa-spinner fa-spin"></i> : status.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-end px-4">
                    <button 
                      onClick={() => handleDelete(enq.id)}
                      disabled={loadingId === enq.id}
                      className="btn btn-sm btn-outline-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
