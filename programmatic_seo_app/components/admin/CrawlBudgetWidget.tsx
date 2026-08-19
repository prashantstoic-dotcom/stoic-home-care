'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CrawlBudgetWidget() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBotLogs() {
      try {
        const { data, error } = await supabase
          .from('seo_server_logs')
          .select('*')
          .eq('is_verified_bot', true)
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (!error && data) {
          setLogs(data);
        }
      } catch (err) {
        console.error('Error fetching bot logs', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBotLogs();

    // Set up Realtime subscription for live bot activity
    const channel = supabase
      .channel('realtime_bot_logs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'seo_server_logs' }, (payload) => {
        if (payload.new.is_verified_bot) {
          setLogs((prev) => [payload.new, ...prev].slice(0, 10)); // Keep only top 10
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return <div className=\p-4 border rounded-lg bg-gray-50 animate-pulse mt-6\>Loading Live Crawl Logs...</div>;

  return (
    <div className=\g-white p-6 rounded-lg shadow-sm border border-gray-100 mt-6\>
      <div className=\lex justify-between items-center mb-4\>
        <h3 className=\	ext-lg font-bold text-gray-800 flex items-center gap-2\>
          <span className=\elative flex h-3 w-3\>
            <span className=\nimate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75\></span>
            <span className=\elative inline-flex rounded-full h-3 w-3 bg-green-500\></span>
          </span>
          Live Crawl Budget Tracker
        </h3>
        <span className=\px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full\>Real-time Logs</span>
      </div>
      <p className=\	ext-sm text-gray-500 mb-4\>Monitoring Googlebot time spent per page (Response Time ms)</p>
      
      <div className=\overflow-x-auto\>
        <table className=\w-full text-left text-sm\>
          <thead>
            <tr className=\	ext-gray-500 border-b border-gray-100\>
              <th className=\pb-2 font-semibold\>Bot Type</th>
              <th className=\pb-2 font-semibold\>Path Visited</th>
              <th className=\pb-2 font-semibold\>Status</th>
              <th className=\pb-2 font-semibold\>Time (ms)</th>
              <th className=\pb-2 font-semibold\>When</th>
            </tr>
          </thead>
          <tbody className=\divide-y divide-gray-50\>
            {logs.length > 0 ? logs.map((log, idx) => (
              <tr key={idx} className=\hover:bg-gray-50 transition-colors\>
                <td className=\py-3 font-medium text-blue-600\>{log.bot_type}</td>
                <td className=\py-3 text-gray-700 truncate max-w-xs\>{log.url_path}</td>
                <td className=\py-3\>
                  <span className=\px-2 py-1 text-xs rounded-full \\>
                    {log.status_code}
                  </span>
                </td>
                <td className=\py-3\>
                  <span className=\ont-semibold \\>
                    {log.response_time_ms} ms
                  </span>
                </td>
                <td className=\py-3 text-gray-400 text-xs\>
                  {new Date(log.created_at).toLocaleTimeString()}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className=\py-4 text-center text-gray-500 italic\>No bot activity recorded yet. Logs will appear here live.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

