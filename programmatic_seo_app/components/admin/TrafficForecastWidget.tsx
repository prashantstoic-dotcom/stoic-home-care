'use client';
import { useEffect, useState } from 'react';

export default function TrafficForecastWidget() {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchForecast() {
      try {
        const res = await fetch('/api/admin/seo-forecast');
        const json = await res.json();
        
        if (json.success) {
          // Grouping logic by page_url to show total expected clicks over 14 days
          const groupedData: Record<string, number> = {};
          json.data.forEach((row: any) => {
            if (!groupedData[row.page_url]) groupedData[row.page_url] = 0;
            groupedData[row.page_url] += row.expected_clicks;
          });
          
          const sorted = Object.entries(groupedData).map(([url, clicks]) => ({ url, clicks }))
                               .sort((a, b) => b.clicks - a.clicks)
                               .slice(0, 5); // Top 5 pages
          
          setForecast(sorted);
        } else {
          setError(json.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchForecast();
  }, []);

  if (loading) return <div className=\p-4 border rounded-lg bg-gray-50 animate-pulse\>Loading 14-Day Traffic Forecast from AI Model...</div>;
  if (error) return <div className=\p-4 border border-red-200 text-red-600 rounded-lg\>Error: {error}</div>;

  return (
    <div className=\g-white p-6 rounded-lg shadow-sm border border-gray-100 mt-6\>
      <div className=\lex justify-between items-center mb-4\>
        <h3 className=\	ext-lg font-bold text-gray-800\>? AI Predictive SEO Forecast (14-Days)</h3>
        <span className=\px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full\>BigQuery ML ARIMA_PLUS</span>
      </div>
      <p className=\	ext-sm text-gray-500 mb-4\>Expected traffic based on historical patterns.</p>
      
      <div className=\space-y-3\>
        {forecast.length > 0 ? forecast.map((f, idx) => (
          <div key={idx} className=\lex justify-between items-center p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-100 transition-colors\>
            <div className=\	ext-sm font-medium text-gray-700 truncate w-3/4\>{f.url}</div>
            <div className=\	ext-sm font-bold \\>
              ~{f.clicks.toLocaleString()} clicks
            </div>
          </div>
        )) : (
          <div className=\	ext-sm text-gray-500 italic\>No prediction data available yet. Training requires more history.</div>
        )}
      </div>
    </div>
  );
}

