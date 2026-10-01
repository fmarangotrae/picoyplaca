globalThis.process ??= {}; globalThis.process.env ??= {};
import { D as DEFAULT_KV_CONFIG, a as DEFAULT_BANNERS, b as DEFAULT_AD_SLOTS } from '../../chunks/default-config_BR3ZDvLA.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BKg8zs2I.mjs';

const prerender = false;
const GET = async ({ url, request, locals }) => {
  let config = DEFAULT_KV_CONFIG;
  try {
    const kv = locals?.runtime?.env?.PICOPLACA_CONFIG;
    if (kv) {
      const cached = await kv.get("current", "json");
      if (cached && typeof cached === "object") {
        config = { ...DEFAULT_KV_CONFIG, ...cached };
      }
    }
  } catch (_e) {
  }
  const response = {
    ok: true,
    data: config,
    meta: {
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      provider: config.ads?.provider,
      adSlotsCount: config.ads?.slots?.length ?? DEFAULT_AD_SLOTS.length,
      bannersCount: config.ads?.banners?.length ?? DEFAULT_BANNERS.length
    }
  };
  const body = JSON.stringify(response, null, 0);
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "X-Content-Type-Options": "nosniff"
    }
  });
};
const OPTIONS = async () => new Response(null, {
  status: 204,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400"
  }
});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  OPTIONS,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
