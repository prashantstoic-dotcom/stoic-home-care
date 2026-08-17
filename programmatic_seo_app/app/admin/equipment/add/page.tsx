import EquipmentForm from "@/components/admin/EquipmentForm";

export const metadata = { title: "Add Equipment | Stoic Admin" };

export default function AddEquipmentPage() {
  return (
    <>
      <div className="mb-4">
        <h3 className="fw-bold mb-0" style={{ color: '#1a3a6b' }}>Add New Equipment</h3>
        <p className="text-muted mb-0">List new medical equipment for rental or purchase.</p>
      </div>
      <EquipmentForm />
    </>
  );
}
