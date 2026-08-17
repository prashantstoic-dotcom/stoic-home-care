"use server";

import { revalidatePath } from "next/cache";
import { SUPABASE_URL, SUPABASE_KEY } from "./supabase";

export async function updateLeadStatus(type: "service" | "equipment", id: number, newStatus: string) {
  const table = type === "service" ? "service_bookings" : "equipment_bookings";
  
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (!res.ok) {
      console.error("Failed to update lead status:", await res.text());
      return { success: false, message: "Failed to update status." };
    }

    revalidatePath("/admin/leads");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Error updating lead:", err);
    return { success: false, message: "Network error." };
  }
}

export async function answerQna(id: number, answer: string) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stoic_qna?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({ answer, status: "published" })
    });

    if (!res.ok) {
      console.error("Failed to answer QnA:", await res.text());
      return { success: false, message: "Failed to publish answer." };
    }

    revalidatePath("/admin/qna");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Error answering QnA:", err);
    return { success: false, message: "Network error." };
  }
}
