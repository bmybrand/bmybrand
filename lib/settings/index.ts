// Server-side access to the chatbot settings saved from the CRM. Cached per
// server instance for a minute, so changes go live within about a minute
// without a deploy. If the table can't be read, the last good value (or the
// defaults) is used, so the chatbot keeps working.

import { readFile } from 'node:fs/promises'
import { supabaseAdmin } from '@/lib/supabase/server'
import { DEFAULT_SETTINGS, normalizeSettings, type AppSettings } from './schema'

export * from './schema'
export * from './public'

const TTL_MS = 60_000
const RETRY_MS = 15_000

let cached: { value: AppSettings; expires: number } | null = null
let inflight: Promise<AppSettings> | null = null

// Local testing only: CHATBOT_SETTINGS_FILE points at a JSON file that is
// used instead of the database row.
async function readRaw(): Promise<unknown> {
  const file = process.env.CHATBOT_SETTINGS_FILE?.trim()
  if (file) return JSON.parse(await readFile(file, 'utf8'))
  const { data, error } = await supabaseAdmin.from('app_settings').select('data').eq('id', 'global').maybeSingle()
  if (error) throw new Error(error.message)
  return data?.data ?? {}
}

async function load(): Promise<AppSettings> {
  try {
    const value = normalizeSettings(await readRaw())
    cached = { value, expires: Date.now() + TTL_MS }
    return value
  } catch (err) {
    console.warn('[settings] using fallback settings:', err instanceof Error ? err.message : err)
    const value = cached?.value ?? DEFAULT_SETTINGS
    cached = { value, expires: Date.now() + RETRY_MS }
    return value
  }
}

export async function getSettings(): Promise<AppSettings> {
  if (cached && cached.expires > Date.now()) return cached.value
  inflight ??= load().finally(() => {
    inflight = null
  })
  return inflight
}
