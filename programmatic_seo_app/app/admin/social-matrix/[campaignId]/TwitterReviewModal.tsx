'use client';

import { useState } from 'react';

export function TwitterReviewModal({ post, onClose, onSave }: { post: any, onClose: () => void, onSave: (id: string, content: string) => void }) {
  // Parse the 5-part JSON array
  let initialThread: string[] = [];
  try {
    initialThread = JSON.parse(post.content);
  } catch (e) {
    initialThread = [post.content];
  }

  const [thread, setThread] = useState<string[]>(initialThread);
  const [isSaving, setIsSaving] = useState(false);

  const handleTextChange = (index: number, val: string) => {
    const newThread = [...thread];
    newThread[index] = val;
    setThread(newThread);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Overwrite the content string with the new updated JSON array
    const newContentString = JSON.stringify(thread);
    
    // Pass it back to the parent to save
    await onSave(post.id, newContentString);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-700 shadow-2xl p-6">
        
        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
          <h2 className="text-2xl font-bold text-blue-400">Review Twitter Thread</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            ✕ Close
          </button>
        </div>

        <div className="space-y-6">
          {thread.map((tweet, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-xl border border-gray-700 relative">
              <span className="absolute top-2 right-2 text-xs font-bold text-gray-500 bg-gray-900 px-2 py-1 rounded">
                Part {i + 1}
              </span>
              <textarea
                value={tweet}
                onChange={(e) => handleTextChange(i, e.target.value)}
                rows={4}
                className="w-full bg-transparent text-gray-200 resize-none outline-none focus:ring-2 focus:ring-blue-500/50 rounded mt-2"
                placeholder={`Tweet ${i + 1}...`}
              />
              <div className="text-right text-xs mt-2 text-gray-500">
                <span className={tweet.length > 280 ? 'text-red-500 font-bold' : ''}>
                  {tweet.length} / 280
                </span>
              </div>
            </div>
          ))}

          {/* Show the attached image if it exists */}
          {post.image_url && (
            <div className="mt-4 border border-gray-700 rounded-xl overflow-hidden">
              <div className="bg-gray-800 text-xs text-gray-400 px-4 py-2 font-semibold">Attached Media (Will go with Part 1)</div>
              <img src={post.image_url} alt="Social Media Asset" className="w-full max-h-64 object-cover" />
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button onClick={onClose} className="px-6 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition">
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition shadow-lg shadow-blue-500/20"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  );
}
