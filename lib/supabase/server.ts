import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;
let adminClientKey = "";

function getSupabaseConfig() {
  const dedicatedUrl = process.env.NEXT_PUBLIC_BMYB_SUPABASE_URL?.trim();
  const dedicatedKey = process.env.BMYB_SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (dedicatedUrl || dedicatedKey) {
    return dedicatedUrl && dedicatedKey
      ? { supabaseUrl: dedicatedUrl, supabaseServiceKey: dedicatedKey }
      : null;
  }

  const fallbackUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const fallbackKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return fallbackUrl && fallbackKey
    ? { supabaseUrl: fallbackUrl, supabaseServiceKey: fallbackKey }
    : null;
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
