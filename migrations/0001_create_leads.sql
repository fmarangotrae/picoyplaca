-- Migración D1: tabla leads para Plan Pro (picoyplaca.co)
-- Free Tier: almacenamos leads B2B directamente en D1 PICOPLACA_LEADS sin Email Workers
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  company TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  plan TEXT NOT NULL DEFAULT 'pro',
  cities TEXT,
  message TEXT,
  privacy_accepted INTEGER NOT NULL DEFAULT 1,
  turnstile_ok INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  ip_hash TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  tags TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_plan ON leads(plan);
