globalThis.process ??= {}; globalThis.process.env ??= {};
import { b as createAstro, c as createComponent, a as renderTemplate, d as addAttribute, u as unescapeHTML, e as renderSlot, f as renderHead, r as renderComponent } from './astro/server_CABi7P6S.mjs';
/* empty css                          */

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1, _b;
const $$Astro$1 = createAstro("https://picoyplaca.co");
const $$SeoHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SeoHead;
  const {
    title = "Pico y Placa Hoy Colombia · picoyplaca.co",
    description = "Consulta el pico y placa de hoy en Bogotá, Medellín, Cali y todas las ciudades de Colombia. Dígitos restringidos, horarios, multas y recomendaciones oficiales.",
    canonical,
    image = "https://picoyplaca.co/og-default.png",
    type = "website",
    noindex = false,
    jsonLd,
    publishedTime,
    modifiedTime,
    author,
    keywords = [],
    siteVerification
  } = Astro2.props;
  const canonicalUrl = new URL(canonical ?? Astro2.url.pathname, Astro2.site ?? "https://picoyplaca.co").toString();
  const ogImage = new URL(image, Astro2.site ?? "https://picoyplaca.co").toString();
  const defaultKeywords = [
    "pico y placa",
    "pico y placa hoy",
    "pico y placa colombia",
    "pico y placa bogota",
    "pico y placa medellin",
    "pico y placa cali",
    "restriccion vehicular colombia"
  ];
  const allKeywords = Array.from(/* @__PURE__ */ new Set([...defaultKeywords, ...keywords])).join(", ");
  return renderTemplate`${noindex && renderTemplate`<meta name="robots" content="noindex,nofollow">`}${!noindex && renderTemplate`<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">`}<title>${title}</title><meta name="description"${addAttribute(description, "content")}>${allKeywords.length > 0 && renderTemplate`<meta name="keywords"${addAttribute(allKeywords, "content")}>`}<meta name="author"${addAttribute(author ?? "picoyplaca.co", "content")}><link rel="canonical"${addAttribute(canonicalUrl, "href")}><!-- Open Graph --><meta property="og:locale" content="es_CO"><meta property="og:type"${addAttribute(type, "content")}><meta property="og:site_name" content="Pico y Placa Colombia"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:image:alt"${addAttribute(title, "content")}>${publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>`}${modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>`}${author && renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`}<!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImage, "content")}><!-- Search Console / Bing verifications (configurables desde .env o KV admin) -->${siteVerification?.google && renderTemplate`<meta name="google-site-verification"${addAttribute(siteVerification.google, "content")}>`}${siteVerification?.bing && renderTemplate`<meta name="msvalidate.01"${addAttribute(siteVerification.bing, "content")}>`}${undefined}<!-- JSON-LD estructurado -->${jsonLd && renderTemplate(_a$1 || (_a$1 = __template$1(['<script type="application/ld+json">', "</script>"])), unescapeHTML(JSON.stringify(jsonLd)))}<!-- JSON-LD por defecto: WebSite + Sitelinks Searchbox (home y páginas importantes) -->${(Astro2.url.pathname === "/" || Astro2.url.pathname.startsWith("/ciudades")) && renderTemplate(_b || (_b = __template$1(['<script type="application/ld+json">', "</script>"])), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pico y Placa Colombia",
    url: "https://picoyplaca.co/",
    inLanguage: "es-CO",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://picoyplaca.co/?ciudad={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  })))}`;
}, "/workspace/src/components/seo/SeoHead.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://picoyplaca.co");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { seo, pageTitle } = Astro2.props;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate(_a || (_a = __template(['<html lang="es-CO" class="h-full"> <head><script>', "</script>", "", '<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#2563eb"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="manifest" href="/manifest.webmanifest"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">', '</head> <body class="flex min-h-full flex-col"> <a href="#main" class="sr-only-focusable">Saltar al contenido principal</a> <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md"> <div class="container flex h-16 items-center justify-between gap-4"> <a href="/" class="flex items-center gap-2 no-underline hover:no-underline"> <span class="text-2xl" aria-hidden="true">🚗</span> <div class="flex flex-col leading-tight"> <span class="text-lg font-extrabold tracking-tight text-brand-700">Pico y Placa</span> <span class="text-xs text-slate-500">Colombia · picoyplaca.co</span> </div> </a> <nav class="hidden items-center gap-5 text-sm md:flex" aria-label="Principal"> <a href="/ciudades" class="text-slate-700 hover:text-brand-700 hover:no-underline">Ciudades</a> <a href="/blog" class="text-slate-700 hover:text-brand-700 hover:no-underline">Blog</a> <a href="/pro" class="text-slate-700 hover:text-brand-700 hover:no-underline">Plan Pro</a> <a href="/#verificador" class="btn-primary text-white hover:no-underline">Verificar mi placa</a> </nav> <button type="button" class="btn-secondary md:hidden" id="menuToggle" aria-controls="mobileMenu" aria-expanded="false" aria-label="Abrir menú">☰</button> </div> <div id="mobileMenu" class="hidden border-t border-slate-200 bg-white md:hidden"> <div class="container flex flex-col gap-3 py-3 text-sm"> <a href="/ciudades" class="py-1">Ciudades</a> <a href="/blog" class="py-1">Blog</a> <a href="/pro" class="py-1">Plan Pro</a> <a href="/#verificador" class="btn-primary">Verificar mi placa</a> </div> </div> </header> <main id="main" class="flex-1"> ', ' <div class="container py-8"> ', ' </div> </main> <footer class="mt-auto border-t border-slate-200 bg-white"> <div class="container grid gap-8 py-10 md:grid-cols-4"> <div> <a href="/" class="flex items-center gap-2 no-underline hover:no-underline"> <span class="text-2xl" aria-hidden="true">🚗</span> <span class="text-lg font-extrabold text-brand-700">Pico y Placa</span> </a> <p class="mt-3 text-sm text-slate-600">Consulta diaria de restricciones vehiculares en las principales ciudades de Colombia. Actualizado con los decretos oficiales.</p> </div> <div> <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Herramientas</h3> <ul class="space-y-2 text-sm"> <li><a href="/#verificador">Verificar placa</a></li> <li><a href="/ciudades">Ciudades</a></li> <li><a href="/bogota">Pico y placa Bogotá</a></li> <li><a href="/medellin">Pico y placa Medellín</a></li> <li><a href="/cali">Pico y placa Cali</a></li> </ul> </div> <div> <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Información</h3> <ul class="space-y-2 text-sm"> <li><a href="/blog">Blog y guías</a></li> <li><a href="/multa-pico-placa-2026">Valor de la multa 2026</a></li> <li><a href="/dia-sin-carro-bogota">Día sin carro</a></li> <li><a href="/pro">Plan Pro · Empresas</a></li> </ul> </div> <div> <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Legal</h3> <ul class="space-y-2 text-sm"> <li><a href="/legal/politica-privacidad">Política de privacidad</a></li> <li><a href="/legal/terminos-y-condiciones">Términos y condiciones</a></li> <li><a href="/legal/politica-cookies">Política de cookies</a></li> <li> <button type="button" id="ppcOpenCmpBtn" class="text-left underline underline-offset-2 text-slate-700 hover:text-brand-700">⚙️ Configurar cookies</button> </li> </ul> <div class="mt-4"> <p class="text-xs text-slate-500">Fuentes oficiales: Secretarías de Movilidad · Mintransporte</p> </div> </div> </div> <div class="border-t border-slate-200"> <div class="container flex flex-col items-center justify-between gap-2 py-4 text-xs text-slate-500 sm:flex-row"> <p>© ', ` picoyplaca.co · Todos los derechos reservados.</p> <p>Información de referencia. Consulte siempre la fuente oficial vigente.</p> </div> </div> </footer> <!-- ============================================================ --> <!-- CMP · Banner inicial (muestra si NO hay decisión guardada)  --> <!-- ============================================================ --> <div id="ppc-cmp-banner" class="ppc-cmp-banner hidden fixed left-0 right-0 bottom-0 z-[60] border-t border-slate-200 bg-white/95 shadow-2xl backdrop-blur"> <div class="container mx-auto px-4 py-4 md:py-5 grid gap-4 md:grid-cols-[1fr,auto] items-center"> <div class="text-sm text-slate-700"> <p class="font-bold text-slate-900">🍪 Este sitio usa cookies</p> <p class="mt-1">Necesarias siempre activas. Para <span class="font-semibold">Analítica</span> (GA4, anonimizado) y <span class="font-semibold">Marketing</span> (anuncios relevantes) necesitamos tu consentimiento. Puedes cambiarlo en cualquier momento desde el pie de página. <a href="/legal/politica-cookies" class="underline text-brand-700">Más info aquí</a>.</p> </div> <div class="flex flex-wrap gap-2 md:gap-3 md:justify-end"> <button type="button" id="ppcCmpReject" class="btn-secondary !text-sm !py-2">Solo necesarias</button> <button type="button" id="ppcCmpCustomize" class="btn-secondary !text-sm !py-2">Personalizar</button> <button type="button" id="ppcCmpAcceptAll" class="btn-primary !text-sm !py-2">Aceptar todas</button> </div> </div> </div> <!-- ============================================================ --> <!-- CMP · Panel de personalización (detallado)                  --> <!-- ============================================================ --> <div id="ppc-cmp-panel" class="ppc-cmp-panel fixed inset-0 z-[70] items-center justify-center bg-slate-900/60 p-4 hidden" role="dialog" aria-modal="true" aria-labelledby="ppc-cmp-panel-title"> <div class="w-full max-w-2xl max-h-[90vh] overflow-y-auto card !p-0"> <header class="border-b border-slate-200 p-5 flex items-start justify-between gap-4"> <div> <h2 id="ppc-cmp-panel-title" class="text-xl font-extrabold text-slate-900">⚙️ Configuración de privacidad y cookies</h2> <p class="mt-1 text-sm text-slate-600">3 categorías · Revocable en cualquier momento. Datos solo almacenados en tu navegador.</p> </div> <button type="button" id="ppcCmpPanelClose" aria-label="Cerrar panel" class="text-2xl leading-none text-slate-500 hover:text-slate-800">&times;</button> </header> <ul id="ppcCmpList" class="divide-y divide-slate-100"> <!-- Se renderiza via JS inline para evitar flicks --> </ul> <footer class="border-t border-slate-200 p-5 flex flex-wrap gap-3 md:justify-between md:items-center"> <button type="button" id="ppcCmpReject2" class="btn-secondary">Solo necesarias</button> <button type="button" id="ppcCmpAccept2" class="btn-primary">Guardar y aceptar seleccionadas</button> </footer> </div> </div> <!-- Mobile menu toggle + CMP init script inline (SIN hidratación, SIN esperar deps) --> <script>
      // Mobile menu toggle (inline para no esperar a hidratación)
      (function () {
        var toggle = document.getElementById('menuToggle');
        var menu = document.getElementById('mobileMenu');
        if (toggle && menu) {
          toggle.addEventListener('click', function () {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            menu.classList.toggle('hidden');
          });
        }
      })();

      // ==========================================================================
      // CMP v1 picoyplaca.co — Consent Management Platform nativa (SIN cookies pago)
      // Almacenado en localStorage + cookie 1año ppc-cmp-decided.
      // ==========================================================================
      (function (window, document) {
        'use strict';
        var STORAGE_KEY = 'ppc-cmp-v1';
        var DECIDED_COOKIE = 'ppc-cmp-decided';
        var CATEGORIES = [
          { id: 'necessary', title: '🍪 Necesarias', required: true, description: 'Sesiones, CMP, Turnstile anti-spam, tema claro/oscuro.' },
          { id: 'analytics', title: '📊 Analítica', required: false, description: 'Google Analytics 4 con IP anónimo. Sin datos publicitarios.' },
          { id: 'marketing',  title: '💸 Marketing', required: false, description: 'Google AdSense · personalización anuncios y atribución.' }
        ];
        // Valores de configuración — se pueden sobrescribir desde variables de entorno a build time
        var GA4_ID = window.__PPC_GA4__ || '';
        var ADSENSE_CLIENT = window.__PPC_ADSENSE_CLIENT__ || '';

        function readDecision() {
          try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var p = JSON.parse(raw);
            if (!p || p.version !== 'ppc-cmp-v1' || !p.categories) return null;
            for (var i = 0; i < CATEGORIES.length; i++) {
              if (typeof p.categories[CATEGORIES[i].id] !== 'boolean') return null;
            }
            p.categories.necessary = true;
            return p;
          } catch (e) { return null; }
        }

        function saveDecision(catSel, showBanner) {
          var decision = {
            version: 'ppc-cmp-v1',
            decidedAt: new Date().toISOString(),
            categories: catSel
          };
          decision.updatedAt = decision.decidedAt;
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(decision));
            document.cookie = DECIDED_COOKIE + '=1; path=/; max-age=' + (365*24*3600) + '; SameSite=Lax';
          } catch (e) {}
          try { window.dispatchEvent(new CustomEvent('ppc:cmp-decision', { detail: decision })); } catch(e) {}
          applyDecision(decision, !!showBanner);
        }

        function setBannerVisible(v) {
          var b = document.getElementById('ppc-cmp-banner');
          if (!b) return;
          b.classList.toggle('hidden', !v);
        }

        function setPanelVisible(v) {
          var p = document.getElementById('ppc-cmp-panel');
          if (!p) return;
          if (v) { p.classList.remove('hidden'); p.classList.add('flex'); }
          else { p.classList.add('hidden'); p.classList.remove('flex'); }
        }

        function currentToggles() {
          var cats = { necessary: true, analytics: false, marketing: false };
          var checks = document.querySelectorAll('#ppcCmpList input[type="checkbox"]');
          checks.forEach(function (cb) { cats[cb.name] = !!cb.checked; });
          cats.necessary = true;
          return cats;
        }

        function renderList(selection) {
          var list = document.getElementById('ppcCmpList');
          if (!list) return;
          list.innerHTML = '';
          CATEGORIES.forEach(function (c) {
            var li = document.createElement('li');
            li.className = 'p-4 sm:p-5 flex items-start gap-4';
            var left = document.createElement('div');
            left.className = 'flex-1';
            left.innerHTML = '<div class="font-semibold text-slate-900">'+c.title+' '+(c.required ? '<span class="text-xs text-success-700 bg-success-50 rounded-full px-2 py-0.5 ml-2">Siempre activa</span>' : '')+'</div><p class="mt-1 text-sm text-slate-600">'+c.description+'</p>';
            var right = document.createElement('label');
            right.className = 'flex items-center justify-center shrink-0 pt-0.5';
            var input = document.createElement('input');
            input.type = 'checkbox'; input.className = 'h-5 w-5 accent-brand-600'; input.name = c.id; input.checked = !!selection[c.id];
            if (c.required) input.disabled = true;
            right.appendChild(input);
            li.appendChild(left); li.appendChild(right);
            list.appendChild(li);
          });
        }

        // ============================================================
        // Aplicación de la decisión: carga GA4 y AdSense CONDICIONALMENTE
        // ============================================================
        var applied = { analytics: false, marketing: false };
        function applyDecision(d, hideBanner) {
          if (hideBanner) setBannerVisible(false);
          // GA4 (Analytics)
          if (d.categories.analytics && !applied.analytics && GA4_ID) {
            var s1 = document.createElement('script');
            s1.async = true;
            s1.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
            document.head.appendChild(s1);
            var s2 = document.createElement('script');
            s2.textContent = 'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("consent","default",{ad_storage:"'+(d.categories.marketing?'granted':'denied')+'",analytics_storage:"'+(d.categories.analytics?'granted':'denied')+'",ad_user_data:"'+(d.categories.marketing?'granted':'denied')+'",ad_personalization:"'+(d.categories.marketing?'granted':'denied')+'"});gtag("config","'+GA4_ID+'",{anonymize_ip:true});';
            document.head.appendChild(s2);
            applied.analytics = true;
          } else if (applied.analytics && typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
              ad_storage: d.categories.marketing ? 'granted' : 'denied',
              analytics_storage: d.categories.analytics ? 'granted' : 'denied',
              ad_user_data: d.categories.marketing ? 'granted' : 'denied',
              ad_personalization: d.categories.marketing ? 'granted' : 'denied'
            });
          }
          // AdSense (Marketing)
          if (d.categories.marketing && !applied.marketing && ADSENSE_CLIENT) {
            var as = document.createElement('script');
            as.async = true;
            as.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT;
            as.crossOrigin = 'anonymous';
            as.referrerPolicy = 'no-referrer-when-downgrade';
            document.head.appendChild(as);
            applied.marketing = true;
          }
        }

        function init() {
          var d = readDecision();
          // Render panel items with initial state
          renderList(d ? d.categories : { necessary: true, analytics: false, marketing: false });
          if (d) {
            applyDecision(d, true);
          } else {
            // No decisión guardada: mostrar banner después de 400ms
            setTimeout(function () { setBannerVisible(true); }, 400);
          }

          // ==== Banner buttons ====
          var acc1 = document.getElementById('ppcCmpAcceptAll');
          var rej1 = document.getElementById('ppcCmpReject');
          var cust = document.getElementById('ppcCmpCustomize');
          if (acc1) acc1.addEventListener('click', function () {
            saveDecision({ necessary: true, analytics: true, marketing: true }, true);
          });
          if (rej1) rej1.addEventListener('click', function () {
            saveDecision({ necessary: true, analytics: false, marketing: false }, true);
          });
          if (cust) cust.addEventListener('click', function () {
            renderList(currentToggles());
            setPanelVisible(true);
          });

          // ==== Panel buttons ====
          var acc2 = document.getElementById('ppcCmpAccept2');
          var rej2 = document.getElementById('ppcCmpReject2');
          var x    = document.getElementById('ppcCmpPanelClose');
          if (acc2) acc2.addEventListener('click', function () {
            saveDecision(currentToggles(), true);
            setPanelVisible(false);
          });
          if (rej2) rej2.addEventListener('click', function () {
            renderList({ necessary: true, analytics: false, marketing: false });
            saveDecision({ necessary: true, analytics: false, marketing: false }, true);
            setPanelVisible(false);
          });
          if (x) x.addEventListener('click', function () { setPanelVisible(false); });

          // Panel close on backdrop click
          var panel = document.getElementById('ppc-cmp-panel');
          if (panel) panel.addEventListener('click', function (e) {
            if (e.target === panel) setPanelVisible(false);
          });

          // Footer link abre panel
          var opn = document.getElementById('ppcOpenCmpBtn');
          if (opn) opn.addEventListener('click', function (e) {
            e.preventDefault();
            var dec = readDecision();
            renderList(dec ? dec.categories : { necessary: true, analytics: false, marketing: false });
            setPanelVisible(true);
          });

          // API global para script externos
          window.__ppcOpenCmp = function () {
            var dec = readDecision();
            renderList(dec ? dec.categories : { necessary: true, analytics: false, marketing: false });
            setPanelVisible(true);
          };
          window.__ppcApplyDecision = function () { var dec = readDecision(); if (dec) applyDecision(dec, true); };
          window.__ppcCmpLoaded = true;
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', init);
        } else {
          init();
        }
      })(window, document);

      // ============================================================
      // Registro Service Worker (PWA) - solo en HTTPS / localhost
      // ============================================================
      (function () {
        if (!('serviceWorker' in navigator)) return;
        var proto = window.location.protocol;
        var host = window.location.hostname;
        var isSecure = (proto === 'https:') || (host === 'localhost') || (host === '127.0.0.1');
        if (!isSecure) return;
        window.addEventListener('load', function () {
          navigator.serviceWorker.register('/sw.js').catch(function () {});
        });
      })();
    </script> </body> </html>`])), unescapeHTML(`window.__PPC_GA4__ = ${JSON.stringify("")};window.__PPC_ADSENSE_CLIENT__ = ${JSON.stringify("")};window.__PPC_TURNSTILE_SITEKEY__ = ${JSON.stringify("")};`), renderComponent($$result, "SeoHead", $$SeoHead, { ...seo }), renderSlot($$result, $$slots["head"]), renderHead(), pageTitle && renderTemplate`<div class="border-b border-slate-200 bg-white"> <div class="container py-6"> <h1 class="text-2xl font-bold md:text-3xl">${pageTitle}</h1> </div> </div>`, renderSlot($$result, $$slots["default"]), currentYear);
}, "/workspace/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
