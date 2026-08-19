"use client";

import React, { useState } from 'react';
import { Brain, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface GenerateBlogButtonProps {
  gapId: string;
  topic: string;
  initialStatus: string;
}

export default function GenerateBlogButton({ gapId, topic, initialStatus }: GenerateBlogButtonProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleGenerateBlog = async () => {
    setLoading(true);
    const loadingToastId = toast.loading(`Starting AI writer for "${topic}"...`);
    
    try {
      const res = await fetch('/api/admin/trigger-writer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topicId: gapId })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to trigger writer');
      }

      toast.success(`AI writer started! Check back in 2 minutes.`, { id: loadingToastId });
      setStatus('processing_writer');
      
    } catch (error: any) {
      console.error('Trigger Error:', error);
      toast.error(error.message, { id: loadingToastId });
    } finally {
      setLoading(false);
    }
  };

  if (status === 'published') {
    return <span className="text-xs text-green-600 font-medium italic">Published</span>;
  }

  if (status === 'processing_writer') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-medium italic">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Processing
      </span>
    );
  }

  if (status === 'ready_for_writer') {
    return (
      <button 
        onClick={handleGenerateBlog}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors shadow-sm"
      >
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Brain className="w-3.5 h-3.5" />}
        Generate Blog
      </button>
    );
  }

  return <span className="text-xs text-slate-400 italic">Processing...</span>;
}
