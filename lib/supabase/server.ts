import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;
let adminClientKey = "";

function getSupabaseConfig() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_BMYB_SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseServiceKey =
    process.env.BMYB_SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  return { supabaseUrl, supabaseServiceKey };
}

function getSupabaseAdmin(): SupabaseClient {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local.",
    );
  }

  const cacheKey = `${config.supabaseUrl}:${config.supabaseServiceKey}`;
  if (!adminClient || adminClientKey !== cacheKey) {
    adminClient = createClient(config.supabaseUrl, config.supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    adminClientKey = cacheKey;
  }

  return adminClient;
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const value = Reflect.get(getSupabaseAdmin(), prop, receiver);
    return typeof value === "function" ? value.bind(getSupabaseAdmin()) : value;
  },
});
