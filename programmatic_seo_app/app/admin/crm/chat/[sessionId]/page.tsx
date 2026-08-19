import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const revalidate = 0;

export default async function ChatTranscriptPage({ params }: { params: { sessionId: string } }) {
  const { sessionId } = params;

  // Fetch the lead info
  const { data: lead } = await supabase.from('crm_leads').select('*').eq('session_id', sessionId).single();
  
  // Fetch the chat messages
  const { data: messages, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) return <div className="p-10 text-red-500">Error loading chat transcript.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/crm" className="text-blue-600 hover:underline mb-6 inline-block">
          &larr; Back to CRM
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
             <div>
                <h2 className="text-xl font-bold">Transcript: {lead?.name || 'Visitor'}</h2>
                <p className="text-gray-400 text-sm">{lead?.contact_info}</p>
             </div>
             <span className="bg-blue-600 px-3 py-1 rounded text-sm font-semibold">{messages?.length} messages</span>
          </div>
          
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto bg-gray-50">
            {messages && messages.map((msg: any) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'}`}>
                   <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                   <span className={`text-[10px] mt-2 block ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                      {new Date(msg.created_at).toLocaleTimeString()}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
