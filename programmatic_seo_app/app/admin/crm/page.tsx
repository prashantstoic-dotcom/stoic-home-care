import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy' // Read-only dashboard can use anon, but we use service for strict admin bypass
);

export const revalidate = 0; // Disable caching, always fetch fresh leads

export default async function CRMLeadsDashboard() {
  // Fetch total sessions count
  const { count: sessionsCount, error: sessionErr } = await supabase
    .from('chat_sessions')
    .select('*', { count: 'exact', head: true });

  // Fetch leads from DB, newest first
  const { data: leads, error } = await supabase
    .from('crm_leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-10 text-red-500">Failed to load CRM data: {error.message}</div>;
  }

  const totalLeads = leads?.length || 0;
  const totalSessions = sessionsCount || 0;
  const conversionRate = totalSessions > 0 ? ((totalLeads / totalSessions) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Leads CRM</h1>
        </div>

        {/* --- NEW: ANALYTICS WIDGET --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
             <h3 className="text-gray-500 text-sm font-medium">Total Chat Sessions</h3>
             <p className="text-3xl font-bold text-gray-900 mt-2">{totalSessions}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
             <h3 className="text-gray-500 text-sm font-medium">Leads Captured</h3>
             <p className="text-3xl font-bold text-blue-600 mt-2">{totalLeads}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 bg-gradient-to-br from-blue-50 to-white">
             <h3 className="text-gray-500 text-sm font-medium">AI Conversion Rate</h3>
             <p className="text-3xl font-bold text-green-600 mt-2">{conversionRate}%</p>
             <p className="text-xs text-gray-400 mt-1">Visitors turning into Leads</p>
          </div>
        </div>
        {/* ----------------------------- */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Query Summary</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {leads && leads.length > 0 ? (
                leads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(lead.created_at).toLocaleDateString()} <br/>
                      <span className="text-xs text-gray-400">{new Date(lead.created_at).toLocaleTimeString()}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">
                        {lead.contact_info}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-md">
                      <div className="line-clamp-2" title={lead.query_summary}>
                        {lead.query_summary}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {lead.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`/admin/crm/chat/${lead.session_id}`} className="text-blue-600 hover:text-blue-900 font-medium text-sm">
                        View Chat &rarr;
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No leads captured yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
