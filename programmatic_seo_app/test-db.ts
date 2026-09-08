import { fetchSupabaseCount } from './lib/supabase.js';

async function test() {
  const enquiriesCount = await fetchSupabaseCount("enquiries?select=*");
  console.log("enquiries count:", enquiriesCount);

  const stoicEnquiriesCount = await fetchSupabaseCount("stoic_enquiries?select=*");
  console.log("stoic_enquiries count:", stoicEnquiriesCount);
}

test();
