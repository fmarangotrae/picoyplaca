globalThis.process ??= {}; globalThis.process.env ??= {};
export { r as renderers } from '../../../chunks/_@astro-renderers_BKg8zs2I.mjs';

const prerender = false;
const GET = async ({ url, locals }) => {
  const search = url.searchParams;
  const limit = Math.min(1e3, Math.max(1, parseInt(search.get("limit") || "100", 10)));
  const offset = Math.max(0, parseInt(search.get("offset") || "0", 10));
  try {
    const d1 = locals.runtime?.env?.PICOPLACA_LEADS;
    if (!d1) {
      return new Response(JSON.stringify({ ok: false, error: "D1 PICOPLACA_LEADS no disponible" }), {
        status: 503,
        headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
      });
    }
    const rows = await d1.prepare(
      `SELECT id, company, name, email, phone, plan, cities, message, created_at, SUBSTR(ip_hash, 1, 12) AS ip_short FROM leads ORDER BY created_at DESC LIMIT ? OFFSET ?`
    ).bind(limit, offset).all();
    const total = await d1.prepare(`SELECT COUNT(*) AS c FROM leads`).first("c") || 0;
    return new Response(JSON.stringify({
      ok: true,
      data: rows.results || [],
      meta: { limit, offset, total }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }
};
const DELETE = async ({ request, locals }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { id } = body;
    if (!id) return new Response(JSON.stringify({ ok: false, error: "id required" }), { status: 400 });
    const d1 = locals.runtime?.env?.PICOPLACA_LEADS;
    if (!d1) return new Response(JSON.stringify({ ok: false, error: "D1 PICOPLACA_LEADS no disponible" }), { status: 503 });
    await d1.prepare(`DELETE FROM leads WHERE id = ?`).bind(id).run();
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Error" }), { status: 500, headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
