"use server";

import { SUPABASE_URL, SUPABASE_KEY } from './supabase';
import { revalidatePath } from 'next/cache';

// Shared function to handle status updates for different enquiry tables (Zero Error Policy)
export async function updateEnquiryStatus(id: number, type: 'popup' | 'general', newStatus: string) {
  try {
    const table = type === 'popup' ? 'popup_enquiries' : 'enquiries';
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (!res.ok) {
      console.error(`Error updating ${table} status:`, await res.text());
      return { success: false, message: 'Database error. Failed to update status.' };
    }

    revalidatePath('/admin/enquiries');
    return { success: true, message: 'Status updated successfully.' };
  } catch (error: any) {
    console.error("Enquiry status update error:", error);
    return { success: false, message: 'Server error occurred while updating status.' };
  }
}

// Shared function to handle deletion
export async function deleteEnquiry(id: number, type: 'popup' | 'general') {
  try {
    const table = type === 'popup' ? 'popup_enquiries' : 'enquiries';
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!res.ok) {
      console.error(`Error deleting from ${table}:`, await res.text());
      return { success: false, message: 'Database error. Failed to delete enquiry.' };
    }

    revalidatePath('/admin/enquiries');
    return { success: true, message: 'Enquiry deleted successfully.' };
  } catch (error: any) {
    console.error("Delete enquiry error:", error);
    return { success: false, message: 'Server error occurred while deleting enquiry.' };
  }
}
