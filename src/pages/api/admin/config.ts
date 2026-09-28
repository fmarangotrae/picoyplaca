import type { APIRoute } from 'astro';
import { DEFAULT_KV_CONFIG } from '@data/default-config';

export const prerender = false;

function mergeKVConfig(kv: Record<string, unknown> | null) {
  const base = JSON.parse(JSON.stringify(DEFAULT_KV_CONFIG));
  if (!kv || typeof kv !== 'object') return base;
  return {
    global: { ...(base.global || {}), ...((kv as any).global || {}) },
    ads: {
      slots: { ...(base.ads?.slots || {}), ...((kv as any).ads?.slots || {}) },
      banners: [
        ...(Array.isArray((kv as any).ads?.banners) && (kv as any).ads.banners.length > 0
          ? (kv as any).ads.banners
          : base.ads?.banners || [])
      ],
      clientId: (kv as any).ads?.clientId || base.ads?.clientId || ''
    },
    analytics: { ...(base.analytics || {}), ...((kv as any).analytics || {}) },
    seo: { ...(base.seo || {}), ...((kv as any).seo || {}) },
    pro: { ...(base.pro || {}), ...((kv as any).pro || {}) },
    lastUpdatedAt: (kv as any).lastUpdatedAt || base.lastUpdatedAt || new Date().toISOString()
  };
}

export const GET: APIRoute = async ({ locals }) => {
  try {
    const kv = (locals.runtime as any)?.env?.PICOPLACA_CONFIG as KVNamespace | undefined;
    let stored: any = null;
    if (kv) {
      try {
        stored = await kv.get('config', { type: 'json' });
      } catch (e) { stored = null; }
    }
    const config = mergeKVConfig(stored);
    return new Response(JSON.stringify({ ok: true, data: config }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

export const PUT: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const kv = (locals.runtime as any)?.env?.PICOPLACA_CONFIG as KVNamespace | undefined;
    if (!kv) {
      return new Response(JSON.stringify({ ok: false, error: 'KV binding PICOPLACA_CONFIG no disponible' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
      });
    }
    const toSave = mergeKVConfig(body || {});
    toSave.lastUpdatedAt = new Date().toISOString();
    await kv.put('config', JSON.stringify(toSave), { metadata: { updatedAt: toSave.lastUpdatedAt } });
    return new Response(JSON.stringify({ ok: true, data: toSave }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'Invalid body or KV error' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
    });
  }
};
