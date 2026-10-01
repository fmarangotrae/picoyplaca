globalThis.process ??= {}; globalThis.process.env ??= {};
export { r as renderers } from '../../../chunks/_@astro-renderers_BKg8zs2I.mjs';

const prerender = false;
async function readAdsKV(locals) {
  const kv = locals.runtime?.env?.PICOPLACA_ADS;
  if (!kv) return { slots: {}, banners: [] };
  try {
    const stored = await kv.get("ads", { type: "json" });
    if (stored && typeof stored === "object") return stored;
  } catch (e) {
  }
  return { slots: {}, banners: [] };
}
async function writeAdsKV(locals, data) {
  const kv = locals.runtime?.env?.PICOPLACA_ADS;
  if (!kv) throw new Error("KV PICOPLACA_ADS no disponible");
  await kv.put("ads", JSON.stringify(data), { metadata: { updatedAt: (/* @__PURE__ */ new Date()).toISOString() } });
}
const GET = async ({ locals }) => {
  try {
    const data = await readAdsKV(locals);
    return new Response(JSON.stringify({ ok: true, data }), {
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
const POST = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const data = await readAdsKV(locals);
    const slots = body?.slots;
    if (slots && typeof slots === "object") data.slots = { ...data.slots || {}, ...slots };
    if (Array.isArray(body?.banners)) data.banners = body.banners;
    const newBanner = body?.banner;
    if (newBanner && typeof newBanner === "object") {
      const id = "bn_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      data.banners = [...data.banners || [], { ...newBanner, id, createdAt: (/* @__PURE__ */ new Date()).toISOString() }];
    }
    await writeAdsKV(locals, data);
    return new Response(JSON.stringify({ ok: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Invalid body" }), {
      status: 400,
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }
};
const DELETE = async ({ request, locals }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { bannerId, slotKey } = body;
    const data = await readAdsKV(locals);
    if (bannerId) data.banners = (data.banners || []).filter((b) => b.id !== bannerId);
    if (slotKey) delete data.slots?.[slotKey];
    await writeAdsKV(locals, data);
    return new Response(JSON.stringify({ ok: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
