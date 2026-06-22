import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export function isSupabaseBrowserConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_BMYB_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_BMYB_SUPABASE_ANON_KEY
  )
}

export function getSupabaseBrowserClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_BMYB_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_BMYB_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase credentials missing. Add NEXT_PUBLIC_BMYB_SUPABASE_URL and NEXT_PUBLIC_BMYB_SUPABASE_ANON_KEY to your environment.'
    )
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }

  return supabaseClient
}
