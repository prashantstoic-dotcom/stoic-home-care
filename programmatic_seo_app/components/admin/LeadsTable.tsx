"use client";

import { useState } from "react";
import { updateLeadStatus } from "@/lib/admin-actions";

type Lead = {
  id: number;
  name: string;
  phone: string;
  service_name?: string;
  equipment_name?: string;
  created_at: string;
  status: string;
};

export default function LeadsTable({ 
  initialLeads, 
  type 
}: { 
  initialLeads: Lead[], 
  type: "service" | "equipment" 
}) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleStatusToggle = async (id: number, currentStatus: string) => {
    setLoadingId(id);
    const newStatus = currentStatus === "pending" ? "resolved" : "pending";
    
    const res = await updateLeadStatus(type, id, newStatus);
    
    if (res.success) {
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    } else {
      alert("Failed to update status. Please try again.");
    }
    
    setLoadingId(null);
  };

  if (!leads || leads.length === 0) {
    return (
      <div className="text-center py-5 bg-white border rounded">
        <i className="fa-solid fa-inbox fa-3x text-muted mb-3"></i>
        <p className="text-muted mb-0">No {type} leads found.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive bg-white border rounded shadow-sm">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className="ps-4">Name</th>
            <th>Phone</th>
            <th>{type === "service" ? "Service" : "Equipment"}</th>
            <th>Date</th>
            <th>Status</th>
            <th className="text-end pe-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className={lead.status === 'resolved' ? 'table-light text-muted' : ''}>
              <td className="ps-4 fw-medium">{lead.name}</td>
              <td>
                <a href={`tel:${lead.phone}`} className="text-decoration-none">
                  <i className="fa-solid fa-phone me-1 small"></i>{lead.phone}
                </a>
              </td>
              <td>
                <span className="badge bg-secondary">
                  {type === "service" ? lead.service_name : lead.equipment_name}
                </span>
              </td>
              <td>{new Date(lead.created_at).toLocaleDateString()}</td>
              <td>
                <span className={`badge ${lead.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'}`}>
                  {lead.status.toUpperCase()}
                </span>
              </td>
              <td className="text-end pe-4">
                <button 
                  onClick={() => handleStatusToggle(lead.id, lead.status)}
                  className={`btn btn-sm ${lead.status === 'pending' ? 'btn-success' : 'btn-outline-warning'}`}
                  disabled={loadingId === lead.id}
                >
                  {loadingId === lead.id ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : lead.status === 'pending' ? (
                    <><i className="fa-solid fa-check me-1"></i> Mark Resolved</>
                  ) : (
                    <><i className="fa-solid fa-rotate-left me-1"></i> Mark Pending</>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
