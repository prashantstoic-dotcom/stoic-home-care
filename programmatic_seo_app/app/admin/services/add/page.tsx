import ServiceForm from "@/components/admin/ServiceForm";

export const metadata = { title: "Add Service | Stoic Admin" };

export default function AddServicePage() {
  return (
    <>
      <div className="mb-4">
        <h3 className="fw-bold mb-0" style={{ color: '#1a3a6b' }}>Add New Service</h3>
        <p className="text-muted mb-0">Create a new home care service offering.</p>
      </div>
      <ServiceForm />
    </>
  );
}
