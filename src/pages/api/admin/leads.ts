import type { APIRoute } from 'astro';

export const prerender = false;

function sha256hex(str: string) {
  let h1 = 0xdeadbeef ^ 0x41c6ce57, h2 = 0x85ebca6b ^ 0x5bd1e995, h3 = 0x243f6a88 ^ 0x85a308d3, h4 = 0x13198a2e ^ 0x03707344;
  for (let i = 0, c: number; i < str.length; i++) {
    c = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
    h3 = Math.imul(h3 ^ c, 3875621253);
    h4 = Math.imul(h4 ^ c, 978654321);
    h1 = (h1 << 13) | (h1 >>> 19);
    h2 = (h2 << 11) | (h2 >>> 21);
    h3 = (h3 << 7)  | (h3 >>> 25);
    h4 = (h4 << 5)  | (h4 >>> 27);
  }
  h1 ^= h1 >>> 16; h1 = Math.imul(h1, 2246822507); h1 ^= h1 >>> 13; h1 = Math.imul(h1, 3266489909); h1 ^= h1 >>> 16;
  h2 ^= h2 >>> 16; h2 = Math.imul(h2, 2890546479); h2 ^= h2 >>> 13; h2 = Math.imul(h2, 374761393); h2 ^= h2 >>> 16;
  h3 ^= h3 >>> 16; h3 = Math.imul(h3, 2213910919); h3 ^= h3 >>> 13; h3 = Math.imul(h3, 4279792421); h3 ^= h3 >>> 16;
  h4 ^= h4 >>> 16; h4 = Math.imul(h4, 3919799351); h4 ^= h4 >>> 13; h4 = Math.imul(h4, 1965021835); h4 ^= h4 >>> 16;
  return [h1, h2, h3, h4].map(n => (n >>> 0).toString(16).padStart(8, '0')).join('');
}

export const GET: APIRoute = async ({ url, locals }) => {
  const search = url.searchParams;
  const limit = Math.min(1000, Math.max(1, parseInt(search.get('limit') || '100', 10)));
  const offset = Math.max(0, parseInt(search.get('offset') || '0', 10));
  try {
    const d1 = (locals.runtime as any)?.env?.PICOPLACA_LEADS as D1Database | undefined;
    if (!d1) {
      return new Response(JSON.stringify({ ok: false, error: 'D1 PICOPLACA_LEADS no disponible' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
      });
    }
    const rows = await d1.prepare(
      `SELECT id, company, name, email, phone, plan, cities, message, created_at, SUBSTR(ip_hash, 1, 12) AS ip_short FROM leads ORDER BY created_at DESC LIMIT ? OFFSET ?`
    ).bind(limit, offset).all();
    const total = await d1.prepare(`SELECT COUNT(*) AS c FROM leads`).first<{ c: number }>('c') || 0;
    return new Response(JSON.stringify({
      ok: true,
      data: rows.results || [],
      meta: { limit, offset, total }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { id } = body as any;
    if (!id) return new Response(JSON.stringify({ ok: false, error: 'id required' }), { status: 400 });
    const d1 = (locals.runtime as any)?.env?.PICOPLACA_LEADS as D1Database | undefined;
    if (!d1) return new Response(JSON.stringify({ ok: false, error: 'D1 PICOPLACA_LEADS no disponible' }), { status: 503 });
    await d1.prepare(`DELETE FROM leads WHERE id = ?`).bind(id).run();
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'Error' }), { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' } });
  }
};
