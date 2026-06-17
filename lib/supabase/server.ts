import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabasePublicConfig, getSupabaseServiceKey } from './env'

let adminClient: SupabaseClient | null = null

function getSupabaseAdminClient() {
  if (adminClient) return adminClient

  const { url, isConfigured } = getSupabasePublicConfig()
  const serviceKey = getSupabaseServiceKey()

  if (!isConfigured || !serviceKey) {
    throw new Error(
      'Supabase admin is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    )
  }

  adminClient = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return adminClient
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getSupabaseAdminClient()
    const value = Reflect.get(client, prop, receiver)
    return typeof value === 'function' ? value.bind(client) : value
  },
})
