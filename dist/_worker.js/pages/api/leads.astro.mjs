globalThis.process ??= {}; globalThis.process.env ??= {};
export { r as renderers } from '../../chunks/_@astro-renderers_BKg8zs2I.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://picoyplaca.co", "SSR": true};
const prerender = false;
const isEmailOk = (s) => typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
const POST = async ({ request, locals }) => {
  let payload = {};
  const ct = request.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) {
      payload = await request.json();
    } else {
      const fd = await request.formData();
      const obj = {};
      for (const [k, v] of fd.entries()) obj[k] = v;
      payload = obj;
    }
  } catch (_e) {
    return new Response(JSON.stringify({ ok: false, error: "Cuerpo de solicitud inválido" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
    });
  }
  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const privacyOn = payload.privacyAccepted === true || payload.privacyAccepted === "on" || payload.privacyAccepted === "true";
  if (!name || name.length < 2) return fail(400, "Nombre requerido (mínimo 2 caracteres)");
  if (!isEmailOk(email)) return fail(400, "Correo electrónico inválido");
  if (!privacyOn) return fail(400, "Aceptación de política de privacidad requerida");
  const ip = (request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for") || "dev").toString().split(",")[0].trim();
  const rateLimitKey = `ppc-leads-${ip}-${email.toLowerCase()}`;
  try {
    const caches = locals?.runtime?.caches || void 0;
    const kv = locals?.runtime?.env?.PICOPLACA_CONFIG;
    if (kv) {
      const last = await kv.get(rateLimitKey, "text");
      if (last && Date.now() - Number(last) < 60 * 1e3) return fail(429, "Demasiadas solicitudes. Intenta nuevamente en 1 minuto.");
      await kv.put(rateLimitKey, String(Date.now()), { expirationTtl: 120 });
    }
  } catch (_e) {
  }
  const siteSecret = Object.assign(__vite_import_meta_env__, { _: process.env._ })?.TURNSTILE_SECRET_KEY;
  const token = payload.turnstileToken || payload["cf-turnstile-response"];
  if (siteSecret && token) {
    try {
      const form = new URLSearchParams();
      form.append("secret", siteSecret);
      form.append("response", token);
      form.append("remoteip", ip);
      const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form.toString()
      });
      const v = await verify.json();
      if (!v?.success) return fail(400, "Verificación anti-spam fallida. Actualiza y vuelve a intentar.");
    } catch (_e) {
      return fail(500, "Error validando Turnstile. Intenta más tarde.");
    }
  }
  const leadId = crypto.randomUUID();
  const createdAt = (/* @__PURE__ */ new Date()).toISOString();
  const d1 = locals?.runtime?.env?.PICOPLACA_LEADS;
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
    }
  }
  return new Response(JSON.stringify({
    ok: true,
    message: "✅ Solicitud recibida. Nuestro equipo contactará en menos de 24 horas hábiles.",
    leadId,
    createdAt
  }), {
    status: 201,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
  });
};
const OPTIONS = async () => new Response(null, {
  status: 204,
  headers: { ...corsHeaders, "Access-Control-Max-Age": "86400" }
});
function fail(status, error) {
  return new Response(JSON.stringify({ ok: false, error }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
  });
}
function simpleHash(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  OPTIONS,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
