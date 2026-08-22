'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function SEOHospitalPage() {
  const [decayLogs, setDecayLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ totalDecaying: 0, totalHealed: 0, recoveredPositions: 0 });

  function viewDiff(log: any) {
    setSelectedLog(log);
    setIsModalOpen(true);
  }

  useEffect(() => {
    fetchDecayLogs();
  }, []);

  async function fetchDecayLogs() {
    setLoading(true);
    // Fetch logs and join with seo_pages to get the target_keyword and url
    const { data, error } = await supabase
      .from('seo_decay_logs')
      .select('*, page:seo_pages(url, target_keyword)')
      .order('detected_at', { ascending: false });

    if (!error && data) {
      setDecayLogs(data);
      
      // Calculate Stats
      let decaying = 0;
      let healed = 0;
      let recovered = 0;
      
      data.forEach(log => {
        if (log.status === 'healed' || log.status === 'healed_waiting_publish') {
          healed++;
          recovered += (log.position_drop || 0); 
        } else {
          decaying++;
        }
      });
      setStats({ totalDecaying: decaying, totalHealed: healed, recoveredPositions: recovered });
    } else if (error) {
      console.error("Error fetching decay logs:", error);
    }
    setLoading(false);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SEO Hospital 🏥</h1>
        <p className="text-gray-500 mt-2">
          Live monitoring of pages losing traffic/rankings and their autonomous AI healing status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-2">Needs Surgery</span>
          <span className="text-4xl font-bold text-gray-900">{stats.totalDecaying}</span>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold text-green-500 uppercase tracking-wider mb-2">Successfully Healed</span>
          <span className="text-4xl font-bold text-gray-900">{stats.totalHealed}</span>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">Rankings Saved</span>
          <span className="text-4xl font-bold text-gray-900">↑ {stats.recoveredPositions} Pos</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading patient records...</div>
        ) : decayLogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No decaying pages found. Everything is healthy!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-600">Target Keyword</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Drop Metrics</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Detected At</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {decayLogs.map((log: any) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{log.page?.target_keyword || 'Unknown'}</div>
                      <div className="text-xs text-gray-400 mt-1">{log.page?.url}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {log.position_drop > 0 && (
                          <span className="text-red-600 font-medium">
                            ↓ {log.position_drop} Positions
                          </span>
                        )}
                        {log.ctr_drop > 0 && (
                          <span className="text-orange-500 font-medium">
                            ↓ {log.ctr_drop}% CTR
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        log.status === 'healed' ? 'bg-green-100 text-green-800' : 
                        log.status === 'needs_healing' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {log.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(log.detected_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => viewDiff(log)}
                        className="text-indigo-600 hover:text-indigo-900 text-xs font-semibold underline"
                      >
                        View Surgery Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && selectedLog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
              <div>
                <h3 className="text-xl font-bold text-gray-900">AI Surgery Report</h3>
                <p className="text-sm text-gray-500 mt-1">Keyword: <span className="font-semibold">{selectedLog.page?.target_keyword}</span></p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 text-lg">
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto grid grid-cols-2 gap-6 bg-gray-100 flex-1">
              <div className="bg-white p-5 rounded-lg border shadow-sm h-full">
                <h4 className="font-bold text-red-600 mb-3 border-b pb-2 flex items-center">
                  <span className="mr-2">🔴</span> Old (Decaying)
                </h4>
                <div className="text-sm text-gray-600 whitespace-pre-wrap">
                  [System Note: In a production environment, the system would fetch the historical version of the article from a revision table here.]
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border shadow-sm h-full">
                <h4 className="font-bold text-green-600 mb-3 border-b pb-2 flex items-center">
                  <span className="mr-2">🟢</span> New (Healed)
                </h4>
                <div className="text-sm text-gray-600 whitespace-pre-wrap">
                  [System Note: The newly AI-generated article body, title, and injected H2/H3 gaps will be displayed here for Admin review.]
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
