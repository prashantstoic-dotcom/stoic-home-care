"use server";

import { SUPABASE_URL, SUPABASE_KEY } from './supabase';
import { addServiceSchema } from './validations';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function addService(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File | null;

    // Validate inputs
    const validatedData = addServiceSchema.safeParse({ title, description, category });
    if (!validatedData.success) {
      return { success: false, message: validatedData.error.errors[0].message };
    }

    let publicImageUrl = null;
    
    // Handle image upload to Supabase Storage
    if (imageFile && imageFile.size > 0) {
      const ext = imageFile.name.split('.').pop();
      const imageFileName = `services/${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      
      const { data, error } = await supabaseClient
        .storage
        .from('uploads')
        .upload(imageFileName, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Supabase storage upload error:", error);
        return { success: false, message: 'Failed to upload image to cloud storage.' };
      }

      // Get the public URL
      const { data: publicUrlData } = supabaseClient
        .storage
        .from('uploads')
        .getPublicUrl(imageFileName);
        
      publicImageUrl = publicUrlData.publicUrl;
    }

    // Insert into Supabase
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stoic_services`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        title: validatedData.data.title,
        description: validatedData.data.description,
        category: validatedData.data.category,
        image_url: publicImageUrl,
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Supabase insert service error", errorText);
      return { success: false, message: 'Database error. Failed to add service.' };
    }

    revalidatePath('/admin/services');
    revalidatePath('/services');
    revalidatePath('/');
    
    return { success: true, message: 'Service added successfully!' };

  } catch (error: any) {
    console.error("Add service error:", error);
    return { success: false, message: 'Server error occurred while adding service.' };
  }
}

export async function editService(id: number, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File | null;
    const oldImageUrl = formData.get('old_image_url') as string;

    const validatedData = addServiceSchema.safeParse({ title, description, category });
    if (!validatedData.success) {
      return { success: false, message: validatedData.error.errors[0].message };
    }

    let newImageUrl = oldImageUrl;

    // Handle new image upload
    if (imageFile && imageFile.size > 0) {
      const ext = imageFile.name.split('.').pop();
      const newImageFileName = `services/${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      
      const { data, error } = await supabaseClient
        .storage
        .from('uploads')
        .upload(newImageFileName, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Supabase storage upload error:", error);
        return { success: false, message: 'Failed to upload new image.' };
      }

      const { data: publicUrlData } = supabaseClient
        .storage
        .from('uploads')
        .getPublicUrl(newImageFileName);
        
      newImageUrl = publicUrlData.publicUrl;

      // Try safely deleting old image from Supabase Storage
      if (oldImageUrl && oldImageUrl.includes('/uploads/services/')) {
        try {
          const oldPath = oldImageUrl.split('/uploads/').pop(); // e.g., 'services/12345.jpg'
          if (oldPath) {
            await supabaseClient.storage.from('uploads').remove([oldPath]);
          }
        } catch (e) {
          console.error("Failed to delete old image from storage:", e);
        }
      }
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/stoic_services?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        title: validatedData.data.title,
        description: validatedData.data.description,
        category: validatedData.data.category,
        image_url: newImageUrl,
      })
    });

    if (!res.ok) {
      return { success: false, message: 'Database error. Failed to update service.' };
    }

    revalidatePath('/admin/services');
    revalidatePath('/services');
    revalidatePath('/');
    
    return { success: true, message: 'Service updated successfully!' };
  } catch (error: any) {
    console.error("Edit service error:", error);
    return { success: false, message: 'Server error occurred while updating service.' };
  }
}

export async function deleteService(id: number, imageUrl: string) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stoic_services?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!res.ok) {
      return { success: false, message: 'Failed to delete service from database.' };
    }

    // Try to safely delete associated image from Supabase
    if (imageUrl && imageUrl.includes('/uploads/services/')) {
      try {
        const imgPath = imageUrl.split('/uploads/').pop();
        if (imgPath) {
          await supabaseClient.storage.from('uploads').remove([imgPath]);
        }
      } catch (e) {
        console.error("Failed to delete image during service deletion:", e);
      }
    }

    revalidatePath('/admin/services');
    revalidatePath('/services');
    revalidatePath('/');
    
    return { success: true, message: 'Service deleted successfully!' };
  } catch (error: any) {
    console.error("Delete service error:", error);
    return { success: false, message: 'Server error occurred while deleting service.' };
  }
}
