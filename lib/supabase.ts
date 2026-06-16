import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_BMYB_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_BMYB_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase credentials missing. Add NEXT_PUBLIC_BMYB_SUPABASE_URL and NEXT_PUBLIC_BMYB_SUPABASE_ANON_KEY in Vercel → Project Settings → Environment Variables."
    );
  }

  return createSupabaseClient(url, key);
}
