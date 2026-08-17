"use server";

import { SUPABASE_URL, SUPABASE_KEY } from './supabase';
import { sendAdminAlert, sendClientConfirmation } from './email';

export async function submitRentalRequest(formData: FormData) {
  // ... existing code ...
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const equipment_id = parseInt(formData.get('equipment_id') as string || '0', 10);
  const equipment_name = formData.get('equipment_name') as string;
  const rental_period = formData.get('rental_period') as string;
  const message = formData.get('message') as string;

  if (!name || !phone) {
    return { success: false, message: 'Name and phone are required.' };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/equipment_bookings`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        equipment_id,
        equipment_name,
        rental_period,
        message,
        created_at: new Date().toISOString()
      })
    });

    if (!res.ok) {
      console.error("Supabase insert error", await res.text());
      return { success: false, message: 'Failed to save your request. Please try again later.' };
    }
    
    // Dispatch emails asynchronously (Non-blocking)
    const adminHtml = `
      <h2>New Equipment Rental Request</h2>
      <table border="1" cellpadding="8" style="border-collapse:collapse;">
        <tr><th>Name</th><td>${name}</td></tr>
        <tr><th>Phone</th><td>${phone}</td></tr>
        <tr><th>Email</th><td>${email || '—'}</td></tr>
        <tr><th>Equipment</th><td>${equipment_name}</td></tr>
        <tr><th>Rental Period</th><td>${rental_period}</td></tr>
        <tr><th>Message</th><td>${message}</td></tr>
      </table>
    `;
    sendAdminAlert(`New Equipment Rental — ${equipment_name}`, adminHtml, email);

    if (email) {
      sendClientConfirmation(email, name, equipment_name);
    }
    
    return { success: true, message: 'Rental request received! We will call you shortly.' };

  } catch (error: any) {
    console.error("Submit rental request error:", error);
    return { success: false, message: error.message || 'Request failed. Please call us directly.' };
  }
}

export async function bookServiceRequest(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const city = formData.get('city') as string;
  const service_name = formData.get('service_name') as string;
  const message = formData.get('message') as string;

  if (!name || !phone || !city) {
    return { success: false, message: 'Name, phone, and city are required.' };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/service_bookings`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        city,
        service_name,
        message,
        created_at: new Date().toISOString()
      })
    });

    if (!res.ok) {
      console.error("Supabase insert error", await res.text());
      return { success: false, message: 'Booking failed. Please try again later.' };
    }
    
    // Dispatch emails asynchronously (Non-blocking)
    const adminHtml = `
      <h2>New Service Booking</h2>
      <table border="1" cellpadding="8" style="border-collapse:collapse;">
        <tr><th>Name</th><td>${name}</td></tr>
        <tr><th>Phone</th><td>${phone}</td></tr>
        <tr><th>Email</th><td>${email || '—'}</td></tr>
        <tr><th>City</th><td>${city}</td></tr>
        <tr><th>Service</th><td>${service_name}</td></tr>
        <tr><th>Message</th><td>${message}</td></tr>
      </table>
    `;
    sendAdminAlert(`New Service Booking — ${service_name}`, adminHtml, email);

    if (email) {
      sendClientConfirmation(email, name, service_name);
    }
    
    return { success: true, message: 'Booking Confirmed! Our care coordinator will call you within 1 hour.' };

  } catch (error: any) {
    console.error("Submit service booking error:", error);
    return { success: false, message: error.message || 'Booking failed. Please call us directly.' };
  }
}

export async function submitQnaRequest(formData: FormData) {
  const location = formData.get('location') as string;
  const category = formData.get('category') as string;
  const asker_name = formData.get('asker_name') as string;
  const question = formData.get('question') as string;

  if (!asker_name || !question) {
    return { success: false, message: 'Name and question are required.' };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stoic_qna`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        location,
        category,
        asker_name,
        question,
        status: 'pending', // questions should be approved by admin
        created_at: new Date().toISOString()
      })
    });

    if (!res.ok) {
      console.error("Supabase insert error", await res.text());
      return { success: false, message: 'Failed to submit question. Please try again later.' };
    }
    
    return { success: true, message: 'Question submitted! Our experts will answer it soon.' };

  } catch (error: any) {
    console.error("Submit QnA error:", error);
    return { success: false, message: error.message || 'Submission failed. Please try again.' };
  }
}
