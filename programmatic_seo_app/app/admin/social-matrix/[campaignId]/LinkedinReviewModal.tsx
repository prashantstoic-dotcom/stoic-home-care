'use client';

import { useState } from 'react';

export function LinkedinReviewModal({ post, onClose, onSave }: { post: any, onClose: () => void, onSave: (id: string, content: string) => void }) {
  const [content, setContent] = useState<string>(post.content || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simple string save, no JSON.stringify needed for LinkedIn
    await onSave(post.id, content);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-700 shadow-2xl p-6">
        
        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
          <h2 className="text-2xl font-bold text-blue-400">Review LinkedIn Post</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            ✕ Close
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Post Content</label>
             <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full bg-transparent text-gray-200 resize-none outline-none focus:ring-2 focus:ring-blue-500/50 rounded"
                placeholder="Write your professional LinkedIn story..."
              />
          </div>

          {/* Show the attached image if it exists */}
          {post.image_url && (
            <div className="mt-4 border border-gray-700 rounded-xl overflow-hidden">
              <div className="bg-gray-800 text-xs text-gray-400 px-4 py-2 font-semibold">Post Asset (Vercel OG)</div>
              <img src={post.image_url} alt="LinkedIn Asset" className="w-full max-h-[400px] object-contain bg-black" />
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
