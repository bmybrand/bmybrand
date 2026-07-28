create extension if not exists pgcrypto;

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_slug text not null,
  job_title text not null,
  source text not null,
  worked_before boolean not null default false,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  country text not null,
  city text not null default '',
  linkedin_url text not null default '',
  portfolio_url text not null default '',
  current_title text not null default '',
  years_experience text not null,
  cover_letter text not null default '',
  resume_file_name text not null,
  resume_file_type text not null,
  resume_file_size integer not null,
  status text not null default 'new' check (status in ('new', 'reviewing', 'shortlisted', 'interviewing', 'offered', 'rejected', 'withdrawn')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_slug, email)
);

create index if not exists job_applications_created_at_idx
  on public.job_applications (created_at desc);

create index if not exists job_applications_job_slug_idx
  on public.job_applications (job_slug);

alter table public.job_applications enable row level security;

revoke all on table public.job_applications from anon, authenticated;
