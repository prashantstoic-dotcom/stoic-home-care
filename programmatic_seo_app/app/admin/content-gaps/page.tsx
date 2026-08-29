import React from 'react';
import { Brain, Target, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import GapAnalysisForm from '@/components/admin/GapAnalysisForm';
import GenerateBlogButton from '@/components/admin/GenerateBlogButton';

// Server Component for fetching data
export default async function ContentGapsPage() {
  
  // Part 4.2: Fetch Data
  let gaps: any[] = [];
  
  // Only attempt to fetch if REAL env vars exist (avoids Vercel build failure)
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    try {
      const { data } = await supabase
        .from('content_gaps')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
        
      if (data) gaps = data;
    } catch (e) {
      console.warn('Skipping gaps fetch during build', e);
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <Brain className="h-8 w-8 text-indigo-600" />
            Content Gap & AI Outline Generator
          </h1>
          <p className="text-slate-500 mt-2">
            Analyze competitors, find missing SEO entities, and auto-generate AI structures.
          </p>
        </div>
      </div>

      {/* Main Grid: Form on left, Table on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-1">
          <GapAnalysisForm />
        </div>

        {/* Right Column: Data Table (Part 4.2) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
               <h2 className="text-lg font-semibold flex items-center gap-2">
                 <Activity className="h-5 w-5 text-indigo-500" />
                 Recent Gap Analyses
               </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Target Keyword</th>
                    <th className="px-6 py-4 font-medium">Gap Score</th>
                    <th className="px-6 py-4 font-medium">Missing</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gaps.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No gaps analyzed yet. Run an analysis!
                      </td>
                    </tr>
                  ) : gaps.map((gap) => (
                    <tr key={gap.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {gap.target_keyword}
                      </td>
                      <td className="px-6 py-4">
                        {gap.gap_score >= 70 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                            <AlertCircle className="w-3.5 h-3.5" /> Critical ({gap.gap_score}%)
                          </span>
                        ) : gap.gap_score >= 40 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                             Moderate ({gap.gap_score}%)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Low ({gap.gap_score}%)
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {gap.missing_entities?.length || 0} entities
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {gap.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <GenerateBlogButton 
                          gapId={gap.id} 
                          topic={gap.target_keyword} 
                          initialStatus={gap.status} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
