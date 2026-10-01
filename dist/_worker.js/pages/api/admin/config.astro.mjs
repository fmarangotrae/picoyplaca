globalThis.process ??= {}; globalThis.process.env ??= {};
import { D as DEFAULT_KV_CONFIG } from '../../../chunks/default-config_BR3ZDvLA.mjs';
export { r as renderers } from '../../../chunks/_@astro-renderers_BKg8zs2I.mjs';

const prerender = false;
function mergeKVConfig(kv) {
  const base = JSON.parse(JSON.stringify(DEFAULT_KV_CONFIG));
  if (!kv || typeof kv !== "object") return base;
  return {
    global: { ...base.global || {}, ...kv.global || {} },
    ads: {
      slots: { ...base.ads?.slots || {}, ...kv.ads?.slots || {} },
      banners: [
        ...Array.isArray(kv.ads?.banners) && kv.ads.banners.length > 0 ? kv.ads.banners : base.ads?.banners || []
      ],
      clientId: kv.ads?.clientId || base.ads?.clientId || ""
    },
    analytics: { ...base.analytics || {}, ...kv.analytics || {} },
    seo: { ...base.seo || {}, ...kv.seo || {} },
    pro: { ...base.pro || {}, ...kv.pro || {} },
    lastUpdatedAt: kv.lastUpdatedAt || base.lastUpdatedAt || (/* @__PURE__ */ new Date()).toISOString()
  };
}
const GET = async ({ locals }) => {
  try {
    const kv = locals.runtime?.env?.PICOPLACA_CONFIG;
    let stored = null;
    if (kv) {
      try {
        stored = await kv.get("config", { type: "json" });
      } catch (e) {
        stored = null;
      }
    }
    const config = mergeKVConfig(stored);
    return new Response(JSON.stringify({ ok: true, data: config }), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }
};
const PUT = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const kv = locals.runtime?.env?.PICOPLACA_CONFIG;
    if (!kv) {
      return new Response(JSON.stringify({ ok: false, error: "KV binding PICOPLACA_CONFIG no disponible" }), {
        status: 503,
        headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
      });
    }
    const toSave = mergeKVConfig(body || {});
    toSave.lastUpdatedAt = (/* @__PURE__ */ new Date()).toISOString();
    await kv.put("config", JSON.stringify(toSave), { metadata: { updatedAt: toSave.lastUpdatedAt } });
    return new Response(JSON.stringify({ ok: true, data: toSave }), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Invalid body or KV error" }), {
      status: 400,
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
