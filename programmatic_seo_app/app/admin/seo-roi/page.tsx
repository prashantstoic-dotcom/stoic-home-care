import { fetchSupabase } from "@/lib/supabase";

export const metadata = { title: "SEO ROI Dashboard | Stoic Admin" };
export const revalidate = 0; // Prevent caching for admin data

const ticketValues: Record<string, number> = {
  'ICU Setup': 50000,
  'Home Nursing': 15000,
  'Elder Care': 20000,
  'Oxygen Cylinder': 5000,
  'Oxygen Concentrator': 10000,
  'Physiotherapy': 8000,
  'Patient Care': 12000,
  'Doctor on Call': 2000,
  'Mother and Baby Care': 18000
};

export default async function SeoRoiPage() {
  // Fetch all QnA submissions to aggregate SEO leads
  const qnaList = await fetchSupabase("stoic_qna?select=location,category,created_at") || [];

  let totalLeads = 0;
  let totalPipelineValue = 0;

  // Aggregate stats by Location + Category
  const statsMap: Record<string, any> = {};

  qnaList.forEach((qna: any) => {
    const loc = qna.location || 'Unknown';
    const cat = qna.category || 'General';
    const key = `${loc}-${cat}`;

    if (!statsMap[key]) {
      statsMap[key] = {
        location: loc,
        category: cat,
        total_leads: 0,
        last_lead_date: qna.created_at
      };
    }
    
    statsMap[key].total_leads += 1;
    
    // Keep track of most recent lead date
    if (new Date(qna.created_at) > new Date(statsMap[key].last_lead_date)) {
      statsMap[key].last_lead_date = qna.created_at;
    }
  });

  const stats = Object.values(statsMap).sort((a: any, b: any) => b.total_leads - a.total_leads);

  stats.forEach((row: any) => {
    totalLeads += row.total_leads;
    const val = ticketValues[row.category] || 5000;
    totalPipelineValue += (val * row.total_leads);
  });

  return (
    <>
      <div className="row mb-4">
        <div className="col-md-6">
          <h2 className="fw-bold" style={{ color: '#1a3a6b' }}>
            <i className="fa-solid fa-chart-line me-2 text-primary"></i> SEO Revenue Attribution
          </h2>
          <p className="text-muted">Track which local pages are generating the most pipeline value.</p>
        </div>
      </div>

      {/* High Level Metrics */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm text-white" style={{ background: '#008080', borderRadius: '15px' }}>
            <div className="card-body p-4 text-center">
              <h5 className="card-title">Total Pipeline Generated</h5>
              <h2 className="display-4 fw-bold">₹{totalPipelineValue.toLocaleString('en-IN')}</h2>
              <p className="mb-0 opacity-75">Estimated value based on lead volume</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
          <div className="card border-0 shadow-sm h-100 bg-white" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4 text-center d-flex flex-column justify-content-center">
              <h5 className="card-title text-muted">Total Organic Leads (Q&A)</h5>
              <h2 className="display-4 fw-bold text-dark">{totalLeads.toLocaleString('en-IN')}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Attribution Table */}
      <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4 py-3">Location (City)</th>
                  <th className="py-3">Service Category</th>
                  <th className="py-3 text-center">Leads Generated</th>
                  <th className="py-3 text-end">Est. Pipeline Value</th>
                  <th className="py-3 text-end pe-4">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {stats.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-5 text-muted">
                      <i className="fa-solid fa-folder-open fa-3x mb-3 opacity-25"></i>
                      <h5>No data found</h5>
                      <p>Wait for Q&A forms to generate leads.</p>
                    </td>
                  </tr>
                ) : (
                  stats.map((row: any, i: number) => {
                    const val = ticketValues[row.category] || 5000;
                    const rowValue = row.total_leads * val;
                    return (
                      <tr key={i}>
                        <td className="ps-4 fw-bold text-dark">{row.location}</td>
                        <td>
                          <span className="badge bg-secondary rounded-pill fw-normal px-3">
                            {row.category}
                          </span>
                        </td>
                        <td className="text-center fw-bold text-primary">{row.total_leads}</td>
                        <td className="text-end fw-bold text-success">
                          ₹{rowValue.toLocaleString('en-IN')}
                        </td>
                        <td className="text-end pe-4 text-muted small">
                          {new Date(row.last_lead_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
