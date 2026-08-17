import ServiceForm from "@/components/admin/ServiceForm";
import { fetchSupabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Service | Stoic Admin" };
export const revalidate = 0;

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const services = await fetchSupabase(`stoic_services?id=eq.${params.id}&select=*`);
  const service = services?.[0];

  if (!service) {
    notFound();
  }

  return (
    <>
      <div className="mb-4">
        <h3 className="fw-bold mb-0" style={{ color: '#1a3a6b' }}>Edit Service</h3>
        <p className="text-muted mb-0">Updating: <span className="fw-semibold text-dark">{service.title}</span></p>
      </div>
      <ServiceForm initialData={service} />
    </>
  );
}
