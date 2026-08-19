"use client";

import React, { useState } from 'react';
import { Target, Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GapAnalysisForm() {
  const [keyword, setKeyword] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword || !url) return;
    
    setIsLoading(true);
    console.log("Triggering Background Job:", { keyword, url });
    
    try {
      // Part 4.4: QStash API Hook (Connecting frontend to the background scraping worker)
      const res = await fetch('/api/admin/trigger-scraping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, targetUrl: url }), // Mapping url to targetUrl for the backend
      });

      if (!res.ok) {
        throw new Error('Failed to trigger background job');
      }

      // Clear the form on success
      setKeyword('');
      setUrl('');
      
      // Refresh the server component to potentially show a new pending row
      router.refresh(); 

    } catch (error) {
      console.error("Error submitting gap analysis:", error);
      alert("Failed to start analysis. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
        <Target className="h-5 w-5 text-indigo-500" />
        New Competitor Analysis
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Target Keyword
          </label>
          <input 
            type="text" 
            placeholder="e.g. Back pain physiotherapy"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Competitor URL
          </label>
          <input 
            type="url" 
            placeholder="https://competitor.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>
        
        <button 
          type="submit"
          disabled={isLoading || !keyword || !url}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-4 h-4" />
              Analyze Content Gap
            </>
          )}
        </button>
        <p className="text-xs text-slate-500 text-center mt-2">
          This will trigger a background job to scrape and extract entities.
        </p>
      </form>
    </div>
  );
}
