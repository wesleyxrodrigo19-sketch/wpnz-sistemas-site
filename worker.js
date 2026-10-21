const SESSION_SECONDS = 60 * 60 * 12;
const encoder = new TextEncoder();

const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers }
});

function getCookie(request, name) {
  const value = request.headers.get("cookie") || "";
  const hit = value.split(";").map(v => v.trim()).find(v => v.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
}

function bytesToHex(bytes) { return [...new Uint8Array(bytes)].map(b => b.toString(16).padStart(2, "0")).join(""); }
async function hmac(secret, value) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return bytesToHex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}
async function makeSession(secret) {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const nonce = crypto.randomUUID();
  const body = `${expires}.${nonce}`;
  return `${body}.${await hmac(secret, body)}`;
}
async function isAuthorized(request, secret) {
  const token = getCookie(request, "wpnz_admin");
  if (!token || !secret) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || Number(parts[0]) < Math.floor(Date.now() / 1000)) return false;
  const expected = await hmac(secret, `${parts[0]}.${parts[1]}`);
  if (expected.length !== parts[2].length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) mismatch |= expected.charCodeAt(i) ^ parts[2].charCodeAt(i);
  return mismatch === 0;
}

async function ensureDatabase(db) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS systems (id INTEGER PRIMARY KEY AUTOINCREMENT,business_name TEXT NOT NULL,segment TEXT NOT NULL DEFAULT '',status TEXT NOT NULL DEFAULT 'active',start_date TEXT,first_due_date TEXT,monthly_fee_cents INTEGER NOT NULL DEFAULT 0,monthly_cost_cents INTEGER NOT NULL DEFAULT 0,project_cost_cents INTEGER,project_cost_status TEXT NOT NULL DEFAULT 'pending',emergency_email TEXT,login_url TEXT,notes TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS payments (id INTEGER PRIMARY KEY AUTOINCREMENT,system_id INTEGER NOT NULL,reference_month TEXT NOT NULL,due_date TEXT NOT NULL,amount_cents INTEGER NOT NULL,status TEXT NOT NULL DEFAULT 'open',paid_at TEXT,payment_method TEXT,notes TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(system_id) REFERENCES systems(id) ON DELETE CASCADE,UNIQUE(system_id,reference_month))`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_payments_system ON payments(system_id)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_payments_status_due ON payments(status,due_date)`)
  ]);
  const count = await db.prepare("SELECT COUNT(*) AS total FROM systems").first();
  if (!count?.total) {
    const inserted = await db.prepare(`INSERT INTO systems (business_name,segment,status,start_date,first_due_date,monthly_fee_cents,monthly_cost_cents,project_cost_cents,project_cost_status,emergency_email,notes) VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
      .bind("Cachoeira Bar", "Bar e restaurante", "active", "2026-08-29", "2026-09-30", 16000, 6000, null, "pending", "marlonxoliveira2014@gmail.com", "Projeto em funcionamento. Custo de criação e payback em levantamento.").run();
    await db.prepare(`INSERT INTO payments (system_id,reference_month,due_date,amount_cents,status,notes) VALUES (?,?,?,?,?,?)`)
      .bind(inserted.meta.last_row_id, "2026-09", "2026-09-30", 16000, "open", "Primeira mensalidade").run();
  }
}

function cleanSystem(body) {
  const cents = value => value === "" || value == null ? null : Math.round(Number(value) * 100);
  return {
    business_name: String(body.business_name || "").trim(), segment: String(body.segment || "").trim(),
    status: ["active","paused","cancelled"].includes(body.status) ? body.status : "active",
    start_date: body.start_date || null, first_due_date: body.first_due_date || null,
    monthly_fee_cents: cents(body.monthly_fee) || 0, monthly_cost_cents: cents(body.monthly_cost) || 0,
    project_cost_cents: cents(body.project_cost), project_cost_status: body.project_cost_status === "known" ? "known" : "pending",
    emergency_email: String(body.emergency_email || "").trim() || null, login_url: String(body.login_url || "").trim() || null,
    notes: String(body.notes || "").trim() || null
  };
}

async function handleApi(request, env, url) {
  if (!env.ADMIN_PASSWORD) return json({ error: "Senha administrativa não configurada." }, 503);
  if (url.pathname === "/api/admin/login" && request.method === "POST") {
    const body = await request.json().catch(() => ({}));
    const supplied = await hmac(env.ADMIN_PASSWORD, String(body.password || ""));
    const expected = await hmac(env.ADMIN_PASSWORD, env.ADMIN_PASSWORD);
    if (supplied !== expected) return json({ error: "Senha incorreta." }, 401);
    const token = await makeSession(env.ADMIN_PASSWORD);
    return json({ ok: true }, 200, { "set-cookie": `wpnz_admin=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_SECONDS}` });
  }
  if (url.pathname === "/api/admin/logout" && request.method === "POST") {
    return json({ ok: true }, 200, { "set-cookie": "wpnz_admin=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0" });
  }
  if (!(await isAuthorized(request, env.ADMIN_PASSWORD))) return json({ error: "Sessão não autorizada." }, 401);
  await ensureDatabase(env.DB);
  if (url.pathname === "/api/admin/session") return json({ authenticated: true });
  if (url.pathname === "/api/admin/overview") {
    const systems = await env.DB.prepare(`SELECT s.*, (s.monthly_fee_cents-s.monthly_cost_cents) AS monthly_profit_cents, CASE WHEN s.project_cost_cents IS NOT NULL AND (s.monthly_fee_cents-s.monthly_cost_cents)>0 THEN ROUND(CAST(s.project_cost_cents AS REAL)/(s.monthly_fee_cents-s.monthly_cost_cents),1) END AS payback_months, (SELECT COUNT(*) FROM payments p WHERE p.system_id=s.id AND p.status='open') AS open_payments, (SELECT MIN(due_date) FROM payments p WHERE p.system_id=s.id AND p.status='open') AS next_open_due FROM systems s ORDER BY s.status='active' DESC,s.business_name`).all();
    const payments = await env.DB.prepare(`SELECT p.*,s.business_name FROM payments p JOIN systems s ON s.id=p.system_id ORDER BY p.due_date DESC,p.id DESC`).all();
    return json({ systems: systems.results, payments: payments.results });
  }
  if (url.pathname === "/api/admin/systems" && request.method === "POST") {
    const s = cleanSystem(await request.json());
    if (!s.business_name) return json({ error: "Informe o nome do estabelecimento." }, 400);
    const result = await env.DB.prepare(`INSERT INTO systems (business_name,segment,status,start_date,first_due_date,monthly_fee_cents,monthly_cost_cents,project_cost_cents,project_cost_status,emergency_email,login_url,notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`).bind(s.business_name,s.segment,s.status,s.start_date,s.first_due_date,s.monthly_fee_cents,s.monthly_cost_cents,s.project_cost_cents,s.project_cost_status,s.emergency_email,s.login_url,s.notes).run();
    return json({ id: result.meta.last_row_id }, 201);
  }
  const systemMatch = url.pathname.match(/^\/api\/admin\/systems\/(\d+)$/);
  if (systemMatch && request.method === "PUT") {
    const s = cleanSystem(await request.json());
    await env.DB.prepare(`UPDATE systems SET business_name=?,segment=?,status=?,start_date=?,first_due_date=?,monthly_fee_cents=?,monthly_cost_cents=?,project_cost_cents=?,project_cost_status=?,emergency_email=?,login_url=?,notes=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(s.business_name,s.segment,s.status,s.start_date,s.first_due_date,s.monthly_fee_cents,s.monthly_cost_cents,s.project_cost_cents,s.project_cost_status,s.emergency_email,s.login_url,s.notes,Number(systemMatch[1])).run();
    return json({ ok: true });
  }
  if (url.pathname === "/api/admin/payments" && request.method === "POST") {
    const b = await request.json();
    const amount = Math.round(Number(b.amount) * 100);
    await env.DB.prepare(`INSERT INTO payments (system_id,reference_month,due_date,amount_cents,status,paid_at,payment_method,notes) VALUES (?,?,?,?,?,?,?,?)`).bind(Number(b.system_id),b.reference_month,b.due_date,amount,b.status || "open",b.status === "paid" ? (b.paid_at || new Date().toISOString().slice(0,10)) : null,b.payment_method || null,b.notes || null).run();
    return json({ ok: true }, 201);
  }
  const paymentMatch = url.pathname.match(/^\/api\/admin\/payments\/(\d+)$/);
  if (paymentMatch && request.method === "PUT") {
    const b = await request.json();
    await env.DB.prepare(`UPDATE payments SET status=?,paid_at=?,payment_method=?,notes=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(b.status,b.status === "paid" ? (b.paid_at || new Date().toISOString().slice(0,10)) : null,b.payment_method || null,b.notes || null,Number(paymentMatch[1])).run();
    return json({ ok: true });
  }
  return json({ error: "Rota não encontrada." }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/admin/")) return handleApi(request, env, url);
    return env.ASSETS.fetch(request);
  }
};
