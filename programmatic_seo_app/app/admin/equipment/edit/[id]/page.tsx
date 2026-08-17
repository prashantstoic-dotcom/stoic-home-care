import EquipmentForm from "@/components/admin/EquipmentForm";
import { fetchSupabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Equipment | Stoic Admin" };
export const revalidate = 0;

export default async function EditEquipmentPage({ params }: { params: { id: string } }) {
  const equipmentList = await fetchSupabase(`stoic_equipment?id=eq.${params.id}&select=*`);
  const equipment = equipmentList?.[0];

  if (!equipment) {
    notFound();
  }

  return (
    <>
      <div className="mb-4">
        <h3 className="fw-bold mb-0" style={{ color: '#1a3a6b' }}>Edit Equipment</h3>
        <p className="text-muted mb-0">Updating: <span className="fw-semibold text-dark">{equipment.title}</span></p>
      </div>
      <EquipmentForm initialData={equipment} />
    </>
  );
}
