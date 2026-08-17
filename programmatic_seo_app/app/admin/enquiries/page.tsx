import { fetchSupabase } from "@/lib/supabase";
import EnquiriesTable from "@/components/admin/EnquiriesTable";

export const metadata = { title: "Enquiries Management | Stoic Admin" };
export const revalidate = 0; // Prevent caching for admin data

export default async function EnquiriesPage() {
  const popupEnquiries = await fetchSupabase("popup_enquiries?select=*&order=created_at.desc") || [];
  
  // Try fetching general enquiries (handling case if table doesn't exist yet gracefully)
  let generalEnquiries = [];
  try {
    const res = await fetchSupabase("enquiries?select=*&order=created_at.desc");
    if (res) generalEnquiries = res;
  } catch (e) {
    console.error("General enquiries table might not exist yet.");
  }

  const pendingCount = popupEnquiries.filter((e: any) => !e.status || e.status === 'pending').length 
                     + generalEnquiries.filter((e: any) => !e.status || e.status === 'pending').length;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0" style={{ color: '#1a3a6b' }}>Enquiries Management</h3>
          <p className="text-muted mb-0">Manage popup callback requests and general contact forms.</p>
        </div>
      </div>

      <ul className="nav nav-pills mb-4" id="enquiriesTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active fw-semibold" id="popup-tab" data-bs-toggle="pill" data-bs-target="#popup" type="button" role="tab">
            <i className="fa-solid fa-bolt me-2 text-warning"></i> Popup Enquiries (Callback)
            {pendingCount > 0 && (
              <span className="badge bg-danger ms-2 rounded-pill">{popupEnquiries.filter((e: any) => !e.status || e.status === 'pending').length}</span>
            )}
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link fw-semibold ms-2" id="general-tab" data-bs-toggle="pill" data-bs-target="#general" type="button" role="tab">
            <i className="fa-solid fa-envelope me-2"></i> General Contact Forms
          </button>
        </li>
      </ul>

      <div className="tab-content" id="enquiriesTabContent">
        <div className="tab-pane fade show active" id="popup" role="tabpanel">
          <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <EnquiriesTable enquiries={popupEnquiries} type="popup" />
          </div>
        </div>
        
        <div className="tab-pane fade" id="general" role="tabpanel">
          <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <EnquiriesTable enquiries={generalEnquiries} type="general" />
          </div>
        </div>
      </div>
    </>
  );
}
