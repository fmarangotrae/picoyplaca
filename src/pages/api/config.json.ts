import type { APIRoute } from 'astro';
import { DEFAULT_KV_CONFIG, DEFAULT_AD_SLOTS, DEFAULT_BANNERS } from '@data/default-config';

export const prerender = false;

type Ctx = {
  locals: {
    runtime: {
      env: {
        PICOPLACA_CONFIG?: KVNamespace;
      };
      caches: CacheStorage;
    };
  };
};

export const GET: APIRoute = async ({ url, request, locals }: any) => {
  let config = DEFAULT_KV_CONFIG;

  try {
    const kv = (locals?.runtime?.env as any)?.PICOPLACA_CONFIG as KVNamespace | undefined;
    if (kv) {
      const cached = await kv.get('current', 'json');
      if (cached && typeof cached === 'object') {
        config = { ...DEFAULT_KV_CONFIG, ...cached };
      }
    }
  } catch (_e) {
    // KV not bound in dev / preview; default config is enough
  }

  const response = {
    ok: true,
    data: config,
    meta: {
      generatedAt: new Date().toISOString(),
      provider: (config as any).ads?.provider,
      adSlotsCount: (config as any).ads?.slots?.length ?? DEFAULT_AD_SLOTS.length,
      bannersCount: (config as any).ads?.banners?.length ?? DEFAULT_BANNERS.length
    }
  };

  const body = JSON.stringify(response, null, 0);
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'X-Content-Type-Options': 'nosniff'
    }
  });
};

export const OPTIONS: APIRoute = async () => new Response(null, {
  status: 204,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  }
});
