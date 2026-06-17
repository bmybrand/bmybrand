import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabasePublicConfig } from './env'

const config = getSupabasePublicConfig()

export const isSupabaseConfigured = config.isConfigured

export const supabase: SupabaseClient | null = config.isConfigured
  ? createClient(config.url, config.anonKey)
  : null
