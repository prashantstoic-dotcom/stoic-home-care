"use server";

import { SUPABASE_URL, SUPABASE_KEY } from './supabase';
import { addEquipmentSchema } from './validations';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function addEquipment(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const imageFile = formData.get('image') as File | null;

    // Validate inputs
    const validatedData = addEquipmentSchema.safeParse({ title, description, price });
    if (!validatedData.success) {
      return { success: false, message: validatedData.error.errors[0].message };
    }

    let publicImageUrl = null;
    
    // Handle image upload to Supabase Storage
    if (imageFile && imageFile.size > 0) {
      const ext = imageFile.name.split('.').pop();
      const imageFileName = `equipment/${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      
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

    // Insert into Supabase safely
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stoic_equipment`, {
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
        price: validatedData.data.price,
        image_url: publicImageUrl,
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Supabase insert equipment error", errorText);
      return { success: false, message: 'Database error. Failed to add equipment.' };
    }

    revalidatePath('/admin/equipment');
    revalidatePath('/equipment');
    revalidatePath('/');
    
    return { success: true, message: 'Equipment added successfully!' };

  } catch (error: any) {
    console.error("Add equipment error:", error);
    return { success: false, message: 'Server error occurred while adding equipment.' };
  }
}

export async function editEquipment(id: number, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const imageFile = formData.get('image') as File | null;
    const oldImageUrl = formData.get('old_image_url') as string;

    const validatedData = addEquipmentSchema.safeParse({ title, description, price });
    if (!validatedData.success) {
      return { success: false, message: validatedData.error.errors[0].message };
    }

    let newImageUrl = oldImageUrl;

    // Handle new image
    if (imageFile && imageFile.size > 0) {
      const ext = imageFile.name.split('.').pop();
      const newImageFileName = `equipment/${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      
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

      // Try safely deleting old image
      if (oldImageUrl && oldImageUrl.includes('/uploads/equipment/')) {
        try {
          const oldPath = oldImageUrl.split('/uploads/').pop();
          if (oldPath) {
            await supabaseClient.storage.from('uploads').remove([oldPath]);
          }
        } catch (e) {
          console.error("Failed to delete old equipment image:", e);
        }
      }
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/stoic_equipment?id=eq.${id}`, {
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
        price: validatedData.data.price,
        image_url: newImageUrl,
      })
    });

    if (!res.ok) {
      return { success: false, message: 'Database error. Failed to update equipment.' };
    }

    revalidatePath('/admin/equipment');
    revalidatePath('/equipment');
    revalidatePath('/');
    
    return { success: true, message: 'Equipment updated successfully!' };
  } catch (error: any) {
    console.error("Edit equipment error:", error);
    return { success: false, message: 'Server error occurred while updating equipment.' };
  }
}

export async function deleteEquipment(id: number, imageUrl: string) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stoic_equipment?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!res.ok) {
      return { success: false, message: 'Failed to delete equipment from database.' };
    }

    if (imageUrl && imageUrl.includes('/uploads/equipment/')) {
      try {
        const imgPath = imageUrl.split('/uploads/').pop();
        if (imgPath) {
          await supabaseClient.storage.from('uploads').remove([imgPath]);
        }
      } catch (e) {
        console.error("Failed to delete image during equipment deletion:", e);
      }
    }

    revalidatePath('/admin/equipment');
    revalidatePath('/equipment');
    revalidatePath('/');
    
    return { success: true, message: 'Equipment deleted successfully!' };
  } catch (error: any) {
    console.error("Delete equipment error:", error);
    return { success: false, message: 'Server error occurred while deleting equipment.' };
  }
}
