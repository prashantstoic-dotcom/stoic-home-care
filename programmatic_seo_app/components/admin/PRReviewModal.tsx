'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface PRReviewModalProps {
  opportunityId: string;
  queryText: string;
  pitchId?: string;
  subjectLine?: string;
  pitchBody?: string;
}

export default function PRReviewModal({ opportunityId, queryText, pitchId, subjectLine, pitchBody }: PRReviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);

  // Part 8.5.4: Editable State
  const [editedSubject, setEditedSubject] = useState(subjectLine || "");
  const [editedBody, setEditedBody] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setEditedSubject(subjectLine || "");
      setEditedBody((pitchBody || "").replace(/<br\\s*\\/?>/gi, '\\n').replace(/<[^>]*>?/gm, ''));
    }
  }, [isOpen, subjectLine, pitchBody]);

  const handleApproveAndSend = async () => {
    if (!pitchId) return;
    setIsDispatching(true);
    
    try {
      const res = await fetch('/api/admin/pr-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pitch_id: pitchId,
          override_subject: editedSubject,
          override_body: editedBody.replace(/\\n/g, '<br/>')
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      toast.success('Pitch Sent to Journalist!');
      setIsOpen(false);
      
    } catch (err: any) {
      toast.error(err.message || 'Failed to send pitch');
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 bg-blue-50 rounded-md transition-colors"
      >
        Review Pitch
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Review PR Pitch</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Body - Side by Side */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
              
              {/* Left Column - Query */}
              <div className="flex-1 flex flex-col">
                <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Original Query</span>
                <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap flex-1">
                  {queryText.replace(/<[^>]*>?/gm, '')}
                </div>
              </div>

              {/* Right Column - Pitch */}
              <div className="flex-1 flex flex-col border-l border-gray-100 md:pl-6">
                 <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">AI Generated Pitch</span>
                 
                 <div className="mb-4">
                   <label className="block text-xs text-gray-500 mb-1">Subject</label>
                   <input 
                     value={editedSubject}
                     onChange={(e) => setEditedSubject(e.target.value)}
                     className="w-full bg-white p-2 border border-gray-300 rounded font-medium text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                   />
                 </div>

                 <div className="flex-1 flex flex-col">
                   <label className="block text-xs text-gray-500 mb-1">Body</label>
                   <textarea 
                     value={editedBody}
                     onChange={(e) => setEditedBody(e.target.value)}
                     className="w-full flex-1 bg-white p-3 border border-gray-300 rounded text-gray-800 min-h-[200px] focus:ring-blue-500 focus:border-blue-500"
                   />
                 </div>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 font-medium rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleApproveAndSend}
                disabled={!pitchId || isDispatching}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors disabled:opacity-50"
              >
                {isDispatching ? 'Sending...' : 'Approve & Send Email'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
