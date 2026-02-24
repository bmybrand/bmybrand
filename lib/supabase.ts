import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key!);
}
