import type { APIRoute } from 'astro';

export const prerender = false;

async function readAdsKV(locals: any): Promise<Record<string, any>> {
  const kv = (locals.runtime as any)?.env?.PICOPLACA_ADS as KVNamespace | undefined;
  if (!kv) return { slots: {}, banners: [] };
  try {
    const stored = await kv.get('ads', { type: 'json' });
    if (stored && typeof stored === 'object') return stored as any;
  } catch (e) {}
  return { slots: {}, banners: [] };
}

async function writeAdsKV(locals: any, data: Record<string, any>) {
  const kv = (locals.runtime as any)?.env?.PICOPLACA_ADS as KVNamespace | undefined;
  if (!kv) throw new Error('KV PICOPLACA_ADS no disponible');
  await kv.put('ads', JSON.stringify(data), { metadata: { updatedAt: new Date().toISOString() } });
}

export const GET: APIRoute = async ({ locals }) => {
  try {
    const data = await readAdsKV(locals);
    return new Response(JSON.stringify({ ok: true, data }), {
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

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const data = await readAdsKV(locals);
    const slots = body?.slots;
    if (slots && typeof slots === 'object') data.slots = { ...(data.slots || {}), ...slots };
    if (Array.isArray(body?.banners)) data.banners = body.banners;
    const newBanner = body?.banner;
    if (newBanner && typeof newBanner === 'object') {
      const id = 'bn_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      data.banners = [...(data.banners || []), { ...newBanner, id, createdAt: new Date().toISOString() }];
    }
    await writeAdsKV(locals, data);
    return new Response(JSON.stringify({ ok: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'Invalid body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { bannerId, slotKey } = body as any;
    const data = await readAdsKV(locals);
    if (bannerId) data.banners = (data.banners || []).filter((b: any) => b.id !== bannerId);
    if (slotKey) delete data.slots?.[slotKey];
    await writeAdsKV(locals, data);
    return new Response(JSON.stringify({ ok: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
    });
  }
};
