-- Website audit reports (Brandsight / grow-my-business)
-- Run in Supabase SQL Editor if audit_reports does not exist yet.

CREATE TABLE IF NOT EXISTS audit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_url TEXT NOT NULL,
  industry TEXT,
  website_goal TEXT,
  overall_score INT NOT NULL DEFAULT 0,
  issue_count INT NOT NULL DEFAULT 0,
  summary TEXT,
  report JSONB NOT NULL DEFAULT '{}',
  unlocked BOOLEAN NOT NULL DEFAULT false,
  lead_name TEXT,
  lead_email TEXT,
  lead_company TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_reports_created_at ON audit_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_reports_site_url ON audit_reports(site_url);
