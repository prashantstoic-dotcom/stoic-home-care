import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { GenerateButton } from './GenerateButton';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'
);

export default async function SocialMatrixDashboard() {

  // Fetch all published articles and their associated social campaign status
  // We use a LEFT JOIN to see which articles don't have a campaign yet.
  const { data: articles, error } = await supabase
    .from('published_articles')
    .select(`
      id,
      title,
      slug,
      social_campaigns ( id, status )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Error loading data: {error.message}</div>;
  }

  // Get total campaigns
  const { count: totalCampaigns } = await supabase
    .from('social_campaigns')
    .select('*', { count: 'exact', head: true });

  // Get total published posts
  const { count: publishedPosts } = await supabase
    .from('social_posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  // Mock clicks calculation
  const totalClicks = (publishedPosts || 0) * 124;

  return (
    <div className="p-8 max-w-7xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Social Matrix Engine
          </h1>
          <p className="text-gray-400 mt-2">Manage omnichannel distribution for your published articles.</p>
        </div>
      </div>

      {/* Analytics Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
           <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Campaigns</p>
           <p className="text-4xl font-bold text-white mt-2">{totalCampaigns || 0}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
           </div>
           <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Live Posts (X / LinkedIn)</p>
           <p className="text-4xl font-bold text-blue-400 mt-2">{publishedPosts || 0}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="w-16 h-16 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><path d="M7 19h-6v-11h6v11zm8-18h-6v18h6v-18zm8 11h-6v7h6v-7z"/></svg>
           </div>
           <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Estimated UTM Clicks</p>
           <p className="text-4xl font-bold text-purple-400 mt-2">{totalClicks.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl shadow-purple-900/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-900/50">
              <th className="p-4 font-semibold text-gray-300">Article Title</th>
              <th className="p-4 font-semibold text-gray-300">Campaign Status</th>
              <th className="p-4 font-semibold text-gray-300 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {articles?.map((article) => {
              // Supabase returns an array for the join, we take the first one
              const campaignsArray = article.social_campaigns as any;
              const campaign = campaignsArray && campaignsArray.length > 0 ? campaignsArray[0] : null;
              const status = campaign?.status || 'none';

              return (
                <tr key={article.id} className="hover:bg-gray-750 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-gray-200">{article.title}</p>
                    <p className="text-xs text-gray-500 mt-1">/{article.slug}</p>
                  </td>
                  <td className="p-4">
                    {status === 'none' && <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">Not Started</span>}
                    {status === 'generating' && <span className="px-3 py-1 bg-yellow-900/50 text-yellow-400 text-xs rounded-full border border-yellow-700">Generating AI...</span>}
                    {status === 'review_ready' && <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs rounded-full border border-blue-700">Review Ready</span>}
                    {status === 'active' && <span className="px-3 py-1 bg-green-900/50 text-green-400 text-xs rounded-full border border-green-700">Active Queue</span>}
                  </td>
                  <td className="p-4 text-right">
                    {status === 'none' ? (
                      <GenerateButton slug={article.slug} />
                    ) : (
                      <Link 
                        href={`/admin/social-matrix/${campaign.id}`}
                        className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-all border border-gray-600 hover:border-gray-500"
                      >
                        View Board
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
            
            {(!articles || articles.length === 0) && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">
                  No published articles found. Publish a blog post first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
