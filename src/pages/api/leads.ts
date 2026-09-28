import type { APIRoute } from 'astro';

export const prerender = false;

interface LeadPayload {
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
  plan?: string;
  cities?: string;
  message?: string;
  ['cf-turnstile-response']?: string;
  turnstileToken?: string;
  privacyAccepted?: 'on' | 'off' | 'true' | 'false' | boolean;
}

const isEmailOk = (s?: string) => typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export const POST: APIRoute = async ({ request, locals }: any) => {
  let payload: LeadPayload = {};
  const ct = request.headers.get('content-type') || '';
  try {
    if (ct.includes('application/json')) {
      payload = await request.json() as LeadPayload;
    } else {
      const fd = await request.formData();
      const obj: Record<string, any> = {};
      for (const [k, v] of fd.entries()) obj[k] = v;
      payload = obj as LeadPayload;
    }
  } catch (_e) {
    return new Response(JSON.stringify({ ok: false, error: 'Cuerpo de solicitud inválido' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();
  const privacyOn = payload.privacyAccepted === true || payload.privacyAccepted === 'on' || payload.privacyAccepted === 'true';

  if (!name || name.length < 2) return fail(400, 'Nombre requerido (mínimo 2 caracteres)');
  if (!isEmailOk(email)) return fail(400, 'Correo electrónico inválido');
  if (!privacyOn) return fail(400, 'Aceptación de política de privacidad requerida');

  // Rate limit simple por IP + email (60 seg / reg)
  const ip = (request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || 'dev').toString().split(',')[0].trim();
  const rateLimitKey = `ppc-leads-${ip}-${email.toLowerCase()}`;
  try {
    const caches = (locals?.runtime?.caches as any) || undefined;
    const kv = (locals?.runtime?.env as any)?.PICOPLACA_CONFIG as any;
    // Simple rate limit attempt via KV if available
    if (kv) {
      const last = await kv.get(rateLimitKey, 'text');
      if (last && Date.now() - Number(last) < 60 * 1000) return fail(429, 'Demasiadas solicitudes. Intenta nuevamente en 1 minuto.');
      await kv.put(rateLimitKey, String(Date.now()), { expirationTtl: 120 });
    }
  } catch (_e) { /* ignore */ }

  // === Turnstile validation (optional — if env var present) ===
  const siteSecret = (import.meta as any).env?.TURNSTILE_SECRET_KEY as string | undefined;
  const token = payload.turnstileToken || payload['cf-turnstile-response'];
  if (siteSecret && token) {
    try {
      const form = new URLSearchParams();
      form.append('secret', siteSecret);
      form.append('response', token);
      form.append('remoteip', ip);
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form.toString()
      });
      const v = await verify.json() as any;
      if (!v?.success) return fail(400, 'Verificación anti-spam fallida. Actualiza y vuelve a intentar.');
    } catch (_e) {
      return fail(500, 'Error validando Turnstile. Intenta más tarde.');
    }
  }

  // === Store in D1 PICOPLACA_LEADS ===
  const leadId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const d1 = (locals?.runtime?.env as any)?.PICOPLACA_LEADS as D1Database | undefined;
  if (d1) {
    try {
      const stmt = d1.prepare(`
        INSERT INTO leads (id, company, name, email, phone, plan, cities, message, created_at, ip_hash)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        leadId,
        payload.company || null,
        name,
        email.toLowerCase(),
        payload.phone || null,
        payload.plan || null,
        payload.cities || null,
        payload.message || null,
        createdAt,
        simpleHash(ip)
      );
      await stmt.run();
    } catch (_e) {
      // Table may not exist yet (first run); swallow error, still return 202 accepted w/o persistence.
      // In production, create D1 table:
      //   CREATE TABLE leads (id TEXT PRIMARY KEY, company TEXT, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, plan TEXT, cities TEXT, message TEXT, created_at TEXT NOT NULL, ip_hash TEXT);
    }
  }

  return new Response(JSON.stringify({
    ok: true,
    message: '✅ Solicitud recibida. Nuestro equipo contactará en menos de 24 horas hábiles.',
    leadId,
    createdAt
  }), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' }
  });
};

export const OPTIONS: APIRoute = async () => new Response(null, {
  status: 204,
  headers: { ...corsHeaders, 'Access-Control-Max-Age': '86400' }
});

function fail(status: number, error: string) {
  return new Response(JSON.stringify({ ok: false, error }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' }
  });
}

function simpleHash(s: string): string {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16);
}
