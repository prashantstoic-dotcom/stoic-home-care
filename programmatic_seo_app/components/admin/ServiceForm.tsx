"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { addService, editService } from "@/lib/admin-service-actions";
import { toast } from "react-hot-toast";

export default function ServiceForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(initialData?.image_url || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      }
    } catch (err) {
      console.error("Preview image error", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    
    try {
      let result;
      if (initialData) {
        formData.append('old_image_url', initialData.image_url || '');
        result = await editService(initialData.id, formData);
      } else {
        result = await addService(formData);
      }

      if (result.success) {
        toast.success(result.message);
        router.push('/admin/services');
        router.refresh();
      } else {
        toast.error(result.message);
        setIsSubmitting(false);
      }
    } catch (err) {
      toast.error("Server connection failed. Try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
      <div className="card-body p-4">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="row g-4">
            
            <div className="col-md-8">
              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary">Service Title</label>
                <input 
                  type="text" 
                  name="title" 
                  className="form-control form-control-lg bg-light border-0" 
                  defaultValue={initialData?.title} 
                  required 
                  placeholder="e.g. ICU Setup at Home"
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary">Category</label>
                <input 
                  type="text" 
                  name="category" 
                  className="form-control bg-light border-0" 
                  defaultValue={initialData?.category} 
                  placeholder="e.g. Nursing Care"
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary">Description</label>
                <textarea 
                  name="description" 
                  className="form-control bg-light border-0" 
                  rows={6}
                  defaultValue={initialData?.description} 
                  placeholder="Detailed description of the service..."
                ></textarea>
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary">Service Image</label>
                <div 
                  className="border rounded-4 bg-light d-flex flex-column align-items-center justify-content-center p-3 mb-3 position-relative overflow-hidden"
                  style={{ minHeight: '200px', borderStyle: 'dashed !important' }}
                >
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} 
                      onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                    />
                  ) : (
                    <>
                      <i className="fa-solid fa-cloud-arrow-up fs-1 text-muted mb-2"></i>
                      <span className="text-muted small">Upload Image</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <small className="text-muted d-block">Recommended size: 800x600px. Max 2MB.</small>
              </div>

              <hr className="my-4" />

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-lg fw-semibold" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><i className="fa-solid fa-spinner fa-spin me-2"></i> Saving...</>
                  ) : (
                    <><i className="fa-solid fa-save me-2"></i> {initialData ? 'Update Service' : 'Save Service'}</>
                  )}
                </button>
                <button type="button" onClick={() => router.back()} className="btn btn-light" disabled={isSubmitting}>
                  Cancel
                </button>
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );
}
