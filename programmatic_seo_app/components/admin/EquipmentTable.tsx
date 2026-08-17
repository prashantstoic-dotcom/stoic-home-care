"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteEquipment } from "@/lib/admin-equipment-actions";
import { toast } from "react-hot-toast";

export default function EquipmentTable({ initialEquipment }: { initialEquipment: any[] }) {
  const [equipmentList, setEquipmentList] = useState(initialEquipment);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this equipment?")) return;

    setIsDeleting(id);
    try {
      const result = await deleteEquipment(id, imageUrl);
      
      if (result.success) {
        toast.success(result.message);
        setEquipmentList(equipmentList.filter(e => e.id !== id));
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
            <th className="py-3">Price Info</th>
            <th className="py-3 text-end px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-5 text-muted">
                No equipment found.
              </td>
            </tr>
          ) : (
            equipmentList.map((eq) => (
              <tr key={eq.id}>
                <td className="px-4">
                  {eq.image_url ? (
                    <img 
                      src={eq.image_url} 
                      alt={eq.title}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/img/placeholder.png';
                      }}
                    />
                  ) : (
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', borderRadius: '8px' }}>
                      <i className="fa-solid fa-wheelchair text-muted"></i>
                    </div>
                  )}
                </td>
                <td className="fw-semibold text-dark">{eq.title}</td>
                <td className="text-muted">{eq.price || "Contact for price"}</td>
                <td className="text-end px-4">
                  <div className="d-flex justify-content-end gap-2">
                    <Link href={`/admin/equipment/edit/${eq.id}`} className="btn btn-sm btn-outline-primary">
                      <i className="fa-solid fa-pen"></i> Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(eq.id, eq.image_url)}
                      disabled={isDeleting === eq.id}
                      className="btn btn-sm btn-outline-danger"
                    >
                      {isDeleting === eq.id ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-trash"></i>}
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
