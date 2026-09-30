-- The public (anon) key is shipped in the website bundle, and these policies
-- let anyone holding it read every chat session and message (visitor names,
-- emails, phones) and insert rows directly. The widget used them only for the
-- live-agent realtime feed, which was removed; all chat reads and writes now
-- go through the server with the service role, which bypasses RLS.
--
-- Rollback: recreate the four policies from supabase/setup.sql.

DROP POLICY IF EXISTS "Anon can read own session" ON public.chat_sessions;
DROP POLICY IF EXISTS "Anon can insert sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Anon can read session messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anon can insert messages" ON public.chat_messages;
