globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as renderers } from './chunks/_@astro-renderers_BKg8zs2I.mjs';
import { createExports } from './_@astrojs-ssr-adapter.mjs';
import { manifest } from './manifest_B9-7cI6M.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/admin/banners.astro.mjs');
const _page4 = () => import('./pages/api/admin/config.astro.mjs');
const _page5 = () => import('./pages/api/admin/leads.astro.mjs');
const _page6 = () => import('./pages/api/config.json.astro.mjs');
const _page7 = () => import('./pages/api/leads.astro.mjs');
const _page8 = () => import('./pages/blog/_slug_.astro.mjs');
const _page9 = () => import('./pages/blog.astro.mjs');
const _page10 = () => import('./pages/ciudades.astro.mjs');
const _page11 = () => import('./pages/comparar-soat-2026.astro.mjs');
const _page12 = () => import('./pages/dia-sin-carro-bogota.astro.mjs');
const _page13 = () => import('./pages/legal/politica-cookies.astro.mjs');
const _page14 = () => import('./pages/legal/politica-privacidad.astro.mjs');
const _page15 = () => import('./pages/legal/terminos-y-condiciones.astro.mjs');
const _page16 = () => import('./pages/mejores-renting-carros-colombia.astro.mjs');
const _page17 = () => import('./pages/mejores-seguros-vehiculares-colombia.astro.mjs');
const _page18 = () => import('./pages/multa-pico-placa-2026.astro.mjs');
const _page19 = () => import('./pages/pico-y-placa/_---parts_.astro.mjs');
const _page20 = () => import('./pages/pro.astro.mjs');
const _page21 = () => import('./pages/sitemap-index.xml.astro.mjs');
const _page22 = () => import('./pages/calendario-pico-y-placa-_slug_-_year_.astro.mjs');
const _page23 = () => import('./pages/_slug_.astro.mjs');
const _page24 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/index.astro", _page2],
    ["src/pages/api/admin/banners.ts", _page3],
    ["src/pages/api/admin/config.ts", _page4],
    ["src/pages/api/admin/leads.ts", _page5],
    ["src/pages/api/config.json.ts", _page6],
    ["src/pages/api/leads.ts", _page7],
    ["src/pages/blog/[slug].astro", _page8],
    ["src/pages/blog/index.astro", _page9],
    ["src/pages/ciudades.astro", _page10],
    ["src/pages/comparar-soat-2026.astro", _page11],
    ["src/pages/dia-sin-carro-bogota.astro", _page12],
    ["src/pages/legal/politica-cookies.astro", _page13],
    ["src/pages/legal/politica-privacidad.astro", _page14],
    ["src/pages/legal/terminos-y-condiciones.astro", _page15],
    ["src/pages/mejores-renting-carros-colombia.astro", _page16],
    ["src/pages/mejores-seguros-vehiculares-colombia.astro", _page17],
    ["src/pages/multa-pico-placa-2026.astro", _page18],
    ["src/pages/pico-y-placa/[...parts].astro", _page19],
    ["src/pages/pro.astro", _page20],
    ["src/pages/sitemap-index.xml.ts", _page21],
    ["src/pages/calendario-pico-y-placa-[slug]-[year].astro", _page22],
    ["src/pages/[slug].astro", _page23],
    ["src/pages/index.astro", _page24]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
