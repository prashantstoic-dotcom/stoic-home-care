import { fetchSupabase } from "@/lib/supabase";
import ServicesTable from "@/components/admin/ServicesTable";
import Link from "next/link";

export const metadata = { title: "Manage Services | Stoic Admin" };
export const revalidate = 0; // Prevent caching for admin data

export default async function ServicesPage() {
  const services = await fetchSupabase("stoic_services?select=*&order=id.desc");

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0" style={{ color: '#1a3a6b' }}>Manage Services</h3>
          <p className="text-muted mb-0">Add, edit, or delete home care services safely.</p>
        </div>
        <Link href="/admin/services/add" className="btn btn-primary fw-semibold px-4" style={{ borderRadius: '10px' }}>
          <i className="fa-solid fa-plus me-2"></i> Add Service
        </Link>
      </div>

      <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <ServicesTable initialServices={services || []} />
      </div>
    </>
  );
}
