-- Supabase/Postgres initialization SQL
-- Run this in Supabase SQL editor or psql connected to your DB.
CREATE TABLE IF NOT EXISTS vip_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  plan text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  plan text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  id text PRIMARY KEY,
  value jsonb
);

CREATE TABLE IF NOT EXISTS paystack_events (
  id text PRIMARY KEY,
  event_type text,
  payload jsonb,
  received_at timestamptz DEFAULT now()
);