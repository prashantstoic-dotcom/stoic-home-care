import { fetchSupabase } from "@/lib/supabase";
import EquipmentTable from "@/components/admin/EquipmentTable";
import Link from "next/link";

export const metadata = { title: "Manage Equipment | Stoic Admin" };
export const revalidate = 0; // Prevent caching for admin data

export default async function EquipmentPage() {
  const equipment = await fetchSupabase("stoic_equipment?select=*&order=id.desc");

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0" style={{ color: '#1a3a6b' }}>Manage Equipment</h3>
          <p className="text-muted mb-0">Add, edit, or delete medical equipment safely.</p>
        </div>
        <Link href="/admin/equipment/add" className="btn btn-primary fw-semibold px-4" style={{ borderRadius: '10px' }}>
          <i className="fa-solid fa-plus me-2"></i> Add Equipment
        </Link>
      </div>

      <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <EquipmentTable initialEquipment={equipment || []} />
      </div>
    </>
  );
}
