CREATE TABLE IF NOT EXISTS systems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  business_name TEXT NOT NULL,
  segment TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active',
  start_date TEXT,
  first_due_date TEXT,
  monthly_fee_cents INTEGER NOT NULL DEFAULT 0,
  monthly_cost_cents INTEGER NOT NULL DEFAULT 0,
  project_cost_cents INTEGER,
  project_cost_status TEXT NOT NULL DEFAULT 'pending',
  emergency_email TEXT,
  login_url TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  system_id INTEGER NOT NULL,
  reference_month TEXT NOT NULL,
  due_date TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  paid_at TEXT,
  payment_method TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (system_id) REFERENCES systems(id) ON DELETE CASCADE,
  UNIQUE(system_id, reference_month)
);

CREATE INDEX IF NOT EXISTS idx_payments_system ON payments(system_id);
CREATE INDEX IF NOT EXISTS idx_payments_status_due ON payments(status, due_date);
