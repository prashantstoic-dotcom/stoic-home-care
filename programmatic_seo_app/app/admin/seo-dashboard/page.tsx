import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '@/lib/supabase';

// Initialize Supabase Client
// We use the server environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Next.js Server Component (Async)
export default async function SEODashboard() {
  
  // 1. Fetch Key Metrics
  const { count: totalCrawls } = await supabase
    .from('seo_server_logs')
    .select('*', { count: 'exact', head: true })
    .eq('bot_type', 'Googlebot')
    .eq('is_verified_bot', true);

  const { count: totalErrors } = await supabase
    .from('seo_server_logs')
    .select('*', { count: 'exact', head: true })
    .eq('bot_type', 'Googlebot')
    .eq('is_verified_bot', true)
    .in('status_code', [404, 500, 502, 503]);

  // 2. Fetch Data Tables
  const { data: orphanPages } = await supabase
    .from('seo_orphan_pages')
    .select('*')
    .order('crawl_count', { ascending: false })
    .limit(10);

  const { data: indexGaps } = await supabase
    .from('seo_index_gaps')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="seo-dashboard-container">
      <header className="seo-header">
        <h1>SEO Log Analyzer <span>Command Center</span></h1>
        <p>Real-time Googlebot crawl budget and indexing gap analysis.</p>
      </header>

      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>Total Googlebot Crawls</h3>
          <p className="kpi-value">{totalCrawls || 0}</p>
        </div>
        <div className="kpi-card error-card">
          <h3>Crawl Errors (404/500)</h3>
          <p className="kpi-value">{totalErrors || 0}</p>
        </div>
        <div className="kpi-card warning-card">
          <h3>Orphan Pages Found</h3>
          <p className="kpi-value">{orphanPages?.length || 0}</p>
        </div>
      </div>

      <div className="tables-grid">
        <div className="table-container">
          <h2>⚠️ Top Orphan Pages (Wasting Crawl Budget)</h2>
          <table className="seo-table">
            <thead>
              <tr>
                <th>Path</th>
                <th>Crawl Count</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orphanPages?.map((page) => (
                <tr key={page.id}>
                  <td><code>{page.url_path}</code></td>
                  <td>{page.crawl_count}</td>
                  <td><span className="badge badge-error">{page.status_code}</span></td>
                </tr>
              ))}
              {(!orphanPages || orphanPages.length === 0) && (
                <tr><td colSpan={3} className="text-center">No orphan pages found. Great job!</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <h2>🔍 Index Gaps (Pages Google Ignores)</h2>
          <table className="seo-table">
            <thead>
              <tr>
                <th>Slug / URL</th>
                <th>Category</th>
                <th>Published At</th>
              </tr>
            </thead>
            <tbody>
              {indexGaps?.map((gap) => (
                <tr key={gap.id}>
                  <td><code>{gap.slug}</code></td>
                  <td><span className="badge">{gap.category}</span></td>
                  <td>{new Date(gap.published_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {(!indexGaps || indexGaps.length === 0) && (
                <tr><td colSpan={3} className="text-center">No indexing gaps found. Perfect!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vanilla CSS for Premium Look (Isolated) */}
      <style>{`
        .seo-dashboard-container {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          color: #333;
          background-color: #f9fafb;
          min-height: 100vh;
        }
        .seo-header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .seo-header h1 span {
          color: #2563eb;
        }
        .seo-header p {
          color: #6b7280;
          font-size: 1.1rem;
          margin-bottom: 40px;
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }
        .kpi-card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border-top: 4px solid #2563eb;
          transition: transform 0.2s ease;
        }
        .kpi-card:hover {
          transform: translateY(-4px);
        }
        .kpi-card.error-card { border-top-color: #ef4444; }
        .kpi-card.warning-card { border-top-color: #f59e0b; }
        .kpi-card h3 {
          font-size: 1rem;
          color: #4b5563;
          font-weight: 600;
          margin: 0 0 12px 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .kpi-value {
          font-size: 3rem;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }
        .tables-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        .table-container {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .table-container h2 {
          font-size: 1.25rem;
          color: #111827;
          margin: 0 0 20px 0;
          font-weight: 700;
        }
        .seo-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .seo-table th {
          background-color: #f3f4f6;
          color: #374151;
          font-weight: 600;
          padding: 12px 16px;
          font-size: 0.875rem;
          text-transform: uppercase;
        }
        .seo-table th:first-child { border-top-left-radius: 8px; border-bottom-left-radius: 8px; }
        .seo-table th:last-child { border-top-right-radius: 8px; border-bottom-right-radius: 8px; }
        .seo-table td {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
          color: #4b5563;
          font-size: 0.95rem;
        }
        .seo-table tr:last-child td { border-bottom: none; }
        .seo-table code {
          background-color: #f3f4f6;
          padding: 4px 8px;
          border-radius: 6px;
          font-family: ui-monospace, monospace;
          color: #2563eb;
          font-size: 0.85rem;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          background-color: #e0e7ff;
          color: #4338ca;
        }
        .badge-error {
          background-color: #fee2e2;
          color: #b91c1c;
        }
        .text-center { text-align: center; color: #9ca3af; padding: 32px !important; }
      `}</style>
    </div>
  );
}
