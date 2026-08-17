import { fetchSupabaseCount, fetchSupabase } from "@/lib/supabase";

export const metadata = { title: "Dashboard | Stoic Admin" };

export default async function AdminDashboard() {
  // Fetch counts from Supabase concurrently
  const [
    servicesCount,
    blogsCount,
    serviceBookingsCount,
    equipmentBookingsCount,
    qnaCount,
    recentBookings
  ] = await Promise.all([
    fetchSupabaseCount("stoic_home_care?select=id", { method: 'HEAD' }),
    fetchSupabaseCount("stoic_blogs?select=id", { method: 'HEAD' }),
    fetchSupabaseCount("service_bookings?select=id", { method: 'HEAD' }),
    fetchSupabaseCount("equipment_bookings?select=id", { method: 'HEAD' }),
    fetchSupabaseCount("stoic_qna?select=id&status=eq.pending", { method: 'HEAD' }),
    fetchSupabase("service_bookings?select=*&order=created_at.desc&limit=5")
  ]);

  const cards = [
    { label: 'SEO Pages', count: servicesCount, icon: 'fa-file-lines', bg: '#dcfce7', color: '#16a34a', href: '/admin/content' },
    { label: 'Blog Posts', count: blogsCount, icon: 'fa-newspaper', bg: '#e0e7ff', color: '#4f46e5', href: '/admin/content' },
    { label: 'Service Leads', count: serviceBookingsCount, icon: 'fa-user-nurse', bg: '#fef9c3', color: '#ca8a04', href: '/admin/leads' },
    { label: 'Equipment Leads', count: equipmentBookingsCount, icon: 'fa-wheelchair', bg: '#dbeafe', color: '#1d4ed8', href: '/admin/leads' },
    { label: 'Pending QnA', count: qnaCount, icon: 'fa-circle-question', bg: '#fee2e2', color: '#dc2626', href: '/admin/qna' }
  ];

  return (
    <>
      <h3 className="fw-bold mb-4" style={{ color: '#1a3a6b' }}>Dashboard Overview</h3>
      
      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {cards.map((c, i) => (
          <div className="col-sm-6 col-md-4 col-lg" key={i}>
            <div className="card shadow-sm border-0 h-100 p-3" style={{ borderRadius: '15px' }}>
              <div className="d-flex align-items-center">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                  style={{ width: '50px', height: '50px', backgroundColor: c.bg }}
                >
                  <i className={`fa-solid ${c.icon}`} style={{ color: c.color, fontSize: '1.25rem' }}></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bold">{c.count}</h3>
                  <small className="text-muted">{c.label}</small>
                </div>
              </div>
              <div className="mt-3 text-end">
                <a href={c.href} className="text-decoration-none" style={{ fontSize: '0.85rem', color: '#2196d3' }}>
                  View Details &rarr;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
        <div className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold" style={{ color: '#1a3a6b' }}>Recent Service Leads</h5>
          <a href="/admin/leads" className="btn btn-sm btn-primary">View All</a>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Name</th>
                  <th>Phone</th>
                  <th>Service Requested</th>
                  <th>Date</th>
                  <th className="pe-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {(!recentBookings || recentBookings.length === 0) ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">No recent bookings.</td>
                  </tr>
                ) : (
                  recentBookings.map((lead: any) => (
                    <tr key={lead.id}>
                      <td className="ps-4 fw-medium">{lead.name}</td>
                      <td>{lead.phone}</td>
                      <td><span className="badge bg-secondary">{lead.service_name}</span></td>
                      <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                      <td className="pe-4">
                        <span className={`badge ${lead.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'}`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
