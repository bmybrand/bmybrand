import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

export function createClient() {
  const { url, anonKey, isConfigured } = getSupabasePublicConfig();

  if (!isConfigured) {
    throw new Error(
      "Supabase credentials missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return createSupabaseClient(url, anonKey);
}
