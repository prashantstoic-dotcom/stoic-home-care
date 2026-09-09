import { createClient } from '@supabase/supabase-js'

// Enterprise Next.js + Supabase Connection
// This client is used to fetch data for Programmatic SEO pages (Millions of rows).
// We use environment variables so Keys are never exposed to the public.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("CRITICAL ERROR: Supabase credentials missing from environment variables (Client Initialization).");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
