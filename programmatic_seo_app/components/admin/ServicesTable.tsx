"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteService } from "@/lib/admin-service-actions";
import { toast } from "react-hot-toast";

export default function ServicesTable({ initialServices }: { initialServices: any[] }) {
  const [services, setServices] = useState(initialServices);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    setIsDeleting(id);
    try {
      const result = await deleteService(id, imageUrl);
      
      if (result.success) {
        toast.success(result.message);
        setServices(services.filter(s => s.id !== id));
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="py-3">Title</th>
            <th className="py-3">Category</th>
            <th className="py-3 text-end px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-5 text-muted">
                No services found.
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <tr key={service.id}>
                <td className="px-4">
                  {service.image_url ? (
                    <img 
                      src={service.image_url} 
                      alt={service.title}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/img/placeholder.png'; // Fallback logic
                      }}
                    />
                  ) : (
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', borderRadius: '8px' }}>
                      <i className="fa-solid fa-image text-muted"></i>
                    </div>
                  )}
                </td>
                <td className="fw-semibold text-dark">{service.title}</td>
                <td>
                  <span className="badge bg-primary bg-opacity-10 text-primary">
                    {service.category || "General"}
                  </span>
                </td>
                <td className="text-end px-4">
                  <div className="d-flex justify-content-end gap-2">
                    <Link href={`/admin/services/edit/${service.id}`} className="btn btn-sm btn-outline-primary">
                      <i className="fa-solid fa-pen"></i> Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(service.id, service.image_url)}
                      disabled={isDeleting === service.id}
                      className="btn btn-sm btn-outline-danger"
                    >
                      {isDeleting === service.id ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-trash"></i>}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
