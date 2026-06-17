export function getSupabasePublicConfig() {
  const url =
    process.env.NEXT_PUBLIC_BMYB_SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    ''

  const anonKey =
    process.env.NEXT_PUBLIC_BMYB_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim() ||
    ''

  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey),
  }
}

export function getSupabaseServiceKey() {
  return (
    process.env.BMYB_SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    ''
  )
}
