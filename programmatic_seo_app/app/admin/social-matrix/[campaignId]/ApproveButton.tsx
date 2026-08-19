'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ApproveButton({ campaignId, disabled }: { campaignId: string, disabled: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleApprove = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/social-matrix/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign_id: campaignId }),
      });

      if (!res.ok) {
        throw new Error('Failed to approve');
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to approve and schedule posts.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApprove}
      disabled={disabled || loading}
      className={`px-6 py-2 text-sm font-medium rounded-lg transition-all shadow-lg ${
        disabled || loading
        ? 'bg-gray-700 text-gray-500 cursor-not-allowed shadow-none' 
        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-purple-500/20'
      }`}
    >
      {loading ? 'Processing...' : 'Approve & Schedule All'}
    </button>
  );
}
