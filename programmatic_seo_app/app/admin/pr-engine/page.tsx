import { createClient } from "@supabase/supabase-js";
import { PROpportunity } from "@/types/pr";
import PRReviewModal from "@/components/admin/PRReviewModal";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'
);

// Part 8.5.1 & 8.5.2: Server Component for PR Engine Dashboard
export default async function PREngineDashboard() {

  // Fetch opportunities and their associated pitches, ordering by highest relevance score first
  const { data: opportunities, error } = await supabase
    .from("pr_opportunities")
    .select("*, pitches:pr_pitches(*)")
    .order("relevance_score", { ascending: false });

  // Part 8.5.5: Fetch Analytics Counts
  const { count: sentCount } = await supabase.from('pr_pitches').select('*', { count: 'exact', head: true }).eq('status', 'sent');
  const { count: openedCount } = await supabase.from('pr_pitches').select('*', { count: 'exact', head: true }).eq('status', 'opened');
  
  const totalSent = (sentCount || 0) + (openedCount || 0); // opened implies sent
  const totalOpened = openedCount || 0;
  const openRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;

  if (error) {
    return <div className="p-8 text-red-500">Error loading PR data: {error.message}</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Digital PR Engine</h1>
          <p className="text-gray-500 mt-2">Autonomous journalist pitching & backlink generation.</p>
        </div>
        {/* Placeholder for Auto-Pilot toggle and Settings */}
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Radar Active
          </span>
        </div>
      </div>

      {/* Part 8.5.5: Analytics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow px-6 py-5 border border-gray-100">
          <p className="text-sm font-medium text-gray-500 truncate">Pitches Sent</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{totalSent}</p>
        </div>
        <div className="bg-white rounded-lg shadow px-6 py-5 border border-gray-100">
          <p className="text-sm font-medium text-gray-500 truncate">Emails Opened</p>
          <p className="mt-1 text-3xl font-semibold text-blue-600">{totalOpened}</p>
        </div>
        <div className="bg-white rounded-lg shadow px-6 py-5 border border-gray-100">
          <p className="text-sm font-medium text-gray-500 truncate">Open Rate</p>
          <p className="mt-1 text-3xl font-semibold text-green-600">{openRate}%</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">Live Opportunities</h2>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {opportunities?.map((opp: any) => {
            // Get the most recent pitch if it exists
            const pitch = opp.pitches && opp.pitches.length > 0 ? opp.pitches[0] : null;

            return (
            <li key={opp.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-semibold text-gray-900">{opp.media_outlet}</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-600 text-sm">DA {opp.domain_authority}</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-500 text-sm">by {opp.journalist_name}</span>
                  </div>
                  {/* Clean text representation of the query */}
                  <p className="text-gray-700 text-sm line-clamp-2">{opp.query_text.replace(/<[^>]*>?/gm, '')}</p>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Score</span>
                    <span className={`font-bold ${opp.relevance_score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {opp.relevance_score}/100
                    </span>
                  </div>
                  
                  {/* Status Badge */}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${opp.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                      opp.status === 'drafting' ? 'bg-purple-100 text-purple-800' : 
                      'bg-gray-100 text-gray-800'}
                  `}>
                    {opp.status}
                  </span>
                  
                  {/* Part 8.5.3: Review Pitch Modal */}
                  {(opp.status === 'drafting' || pitch) && (
                    <div className="mt-2">
                      <PRReviewModal 
                        opportunityId={opp.id}
                        queryText={opp.query_text}
                        pitchId={pitch?.id}
                        subjectLine={pitch?.subject_line}
                        pitchBody={pitch?.pitch_body}
                      />
                    </div>
                  )}
                </div>
              </div>
            </li>
          )})}
          {opportunities?.length === 0 && (
            <li className="p-8 text-center text-gray-500">
              No opportunities found. The radar is scanning...
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
