import { fetchSupabase } from "@/lib/supabase";
import LeadsTable from "@/components/admin/LeadsTable";

export const metadata = { title: "Leads Management | Stoic Admin" };

export default async function LeadsPage() {
  // Fetch service bookings
  const serviceLeads = await fetchSupabase("service_bookings?select=*&order=created_at.desc");
  
  // Fetch equipment bookings
  const equipmentLeads = await fetchSupabase("equipment_bookings?select=*&order=created_at.desc");

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0" style={{ color: '#1a3a6b' }}>Leads Management</h3>
      </div>

      <ul className="nav nav-pills mb-4" id="leadsTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active fw-semibold" id="service-tab" data-bs-toggle="pill" data-bs-target="#service" type="button" role="tab" aria-controls="service" aria-selected="true">
            <i className="fa-solid fa-user-nurse me-2"></i> Service Leads
            <span className="badge bg-white text-primary ms-2 rounded-pill">
              {serviceLeads?.filter((l: any) => l.status === 'pending').length || 0} New
            </span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link fw-semibold ms-2" id="equipment-tab" data-bs-toggle="pill" data-bs-target="#equipment" type="button" role="tab" aria-controls="equipment" aria-selected="false">
            <i className="fa-solid fa-wheelchair me-2"></i> Equipment Leads
            <span className="badge bg-white text-primary ms-2 rounded-pill">
              {equipmentLeads?.filter((l: any) => l.status === 'pending').length || 0} New
            </span>
          </button>
        </li>
      </ul>

      <div className="tab-content" id="leadsTabContent">
        <div className="tab-pane fade show active" id="service" role="tabpanel" aria-labelledby="service-tab" tabIndex={0}>
          <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
            <div className="card-body p-0">
              <LeadsTable initialLeads={serviceLeads || []} type="service" />
            </div>
          </div>
        </div>
        
        <div className="tab-pane fade" id="equipment" role="tabpanel" aria-labelledby="equipment-tab" tabIndex={0}>
          <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
            <div className="card-body p-0">
              <LeadsTable initialLeads={equipmentLeads || []} type="equipment" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
