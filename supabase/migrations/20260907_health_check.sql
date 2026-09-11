-- Keepalive heartbeat for the Free-plan Supabase project.
--
-- Supabase pauses Free plan projects that show low activity over a 7-day
-- window. /api/health/keepalive reads this table on every cron run (that read
-- is the activity that keeps the project awake) and appends a row only once
-- the newest one is older than its write interval, so the table stays small.

CREATE TABLE IF NOT EXISTS health_check (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT NOT NULL DEFAULT 'vercel-cron',
  note TEXT
);

CREATE INDEX IF NOT EXISTS idx_health_check_checked_at ON health_check(checked_at DESC);

-- No policies are defined on purpose: the service role bypasses RLS, so only
-- server-side code can read or write this table. anon/authenticated get nothing.
ALTER TABLE health_check ENABLE ROW LEVEL SECURITY;
