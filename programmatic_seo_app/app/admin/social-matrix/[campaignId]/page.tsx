import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ApproveButton } from './ApproveButton';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'
);

export default async function CampaignBoard({ params }: { params: { campaignId: string } }) {

  // Fetch campaign details and its posts
  const { data: campaign, error } = await supabase
    .from('social_campaigns')
    .select(`
      *,
      social_posts (*)
    `)
    .eq('id', params.campaignId)
    .single();

  if (error || !campaign) {
    return <div className="p-8 text-red-500">Error loading campaign board.</div>;
  }

  // Organize posts into columns based on status
  const drafts = campaign.social_posts.filter((p: any) => p.status === 'draft');
  const scheduled = campaign.social_posts.filter((p: any) => p.status === 'scheduled');
  const finished = campaign.social_posts.filter((p: any) => p.status === 'published' || p.status === 'failed');

  return (
    <div className="p-8 max-w-7xl mx-auto text-white">
      <Link href="/admin/social-matrix" className="text-sm text-gray-400 hover:text-white mb-4 inline-block transition-colors">
        &larr; Back to Matrix
      </Link>
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Campaign Board</h1>
          <p className="text-gray-400 mt-1">Review, approve, and track posts for this article.</p>
        </div>
        <div>
           <ApproveButton campaignId={campaign.id} disabled={drafts.length === 0} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: Drafts */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 h-full shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg text-yellow-400">Needs Review</h2>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-300">{drafts.length}</span>
          </div>
          <div className="space-y-4">
            {drafts.map((post: any) => {
               let previewText = post.content;
               try {
                 if (post.platform === 'twitter') {
                   const parsed = JSON.parse(post.content);
                   previewText = parsed[0] + '...';
                 }
               } catch(e) {}

               return (
                 <div key={post.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors">
                    <span className="uppercase text-xs font-bold text-gray-400 tracking-wider">{post.platform}</span>
                    <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                       {previewText}
                    </p>
                    {post.image_url && (
                       <div className="mt-3 h-24 rounded overflow-hidden bg-black">
                         <img src={post.image_url} alt="asset" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                       </div>
                    )}
                    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-sm py-2 rounded font-medium transition-colors">
                      Review & Approve
                    </button>
                 </div>
               );
            })}
          </div>
        </div>

        {/* Column 2: Scheduled */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 h-full shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg text-blue-400">Scheduled (QStash)</h2>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-300">{scheduled.length}</span>
          </div>
          <div className="space-y-4">
            {scheduled.map((post: any) => (
               <div key={post.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700 opacity-75">
                  <span className="uppercase text-xs font-bold text-gray-400 tracking-wider">{post.platform}</span>
                  <p className="mt-2 text-sm text-gray-300">Will be dispatched on schedule.</p>
               </div>
            ))}
          </div>
        </div>

        {/* Column 3: Published / Failed */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 h-full shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg text-green-400">Published / Failed</h2>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-300">{finished.length}</span>
          </div>
          <div className="space-y-4">
             {finished.map((post: any) => (
               <div key={post.id} className={`bg-gray-900 p-4 rounded-lg border ${post.status === 'failed' ? 'border-red-500/50' : 'border-green-500/50'}`}>
                  <div className="flex justify-between items-center">
                     <span className="uppercase text-xs font-bold text-gray-400 tracking-wider">{post.platform}</span>
                     <span className={`text-xs px-2 py-0.5 rounded-full ${post.status === 'failed' ? 'bg-red-900/50 text-red-400 border border-red-700' : 'bg-green-900/50 text-green-400 border border-green-700'}`}>
                       {post.status}
                     </span>
                  </div>
                  {post.status === 'failed' && <p className="mt-3 text-xs text-red-300 p-2 bg-red-900/20 rounded">{post.error_log}</p>}
               </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
