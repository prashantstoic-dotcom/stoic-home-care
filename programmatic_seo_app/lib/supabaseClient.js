import { createClient } from '@supabase/supabase-js'

// Enterprise Next.js + Supabase Connection
// This client is used to fetch data for Programmatic SEO pages (Millions of rows).
// We use environment variables so Keys are never exposed to the public.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
