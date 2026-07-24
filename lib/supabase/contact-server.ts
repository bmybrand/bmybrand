import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let contactClient: SupabaseClient | null = null;
let contactClientKey = "";

function getContactSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  return { supabaseUrl, supabaseServiceKey };
}

export function getContactSupabaseAdmin(): SupabaseClient {
  const config = getContactSupabaseConfig();

  if (!config) {
    throw new Error(
      "Contact Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const cacheKey = `${config.supabaseUrl}:${config.supabaseServiceKey}`;
  if (!contactClient || contactClientKey !== cacheKey) {
    contactClient = createClient(config.supabaseUrl, config.supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    contactClientKey = cacheKey;
  }

  return contactClient;
}
