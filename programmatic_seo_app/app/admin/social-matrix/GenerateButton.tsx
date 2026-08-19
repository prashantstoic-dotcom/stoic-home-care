'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function GenerateButton({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/social-matrix/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blog_slug: slug }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate matrix');
      }

      // Refresh the page to show new status
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to generate social matrix.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        loading 
        ? 'bg-blue-800 text-blue-300 cursor-not-allowed' 
        : 'bg-blue-600 hover:bg-blue-500 text-white'
      }`}
    >
      {loading ? 'Generating...' : 'Generate Matrix'}
    </button>
  );
}
