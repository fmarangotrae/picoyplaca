# Plan de Tareas - Pico y Placa Colombia (picoyplaca.co)

## Tarea 1: Setup inicial del proyecto (Astro 4 + React islands + TS + Tailwind + Cloudflare bindings)
- **Objetivo:** Proyecto Astro 4 con TypeScript, React islands, Tailwind, adapter Cloudflare y bindings KV/D1 que compile y despliegue un "hola mundo" en Cloudflare Pages.
- **Subtareas:**
  1. Crear proyecto Astro: `npm create astro@latest -- --template blog-with-mdx` (o base) con TS habilitado.
  2. Instalar integrations: `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/cloudflare`, `@astrojs/sitemap`.
  3. Configurar `astro.config.mjs`: output `static` + adapter Cloudflare, sitemap con customPages, MDX habilitado.
  4. Instalar `wrangler`, `vitest`, `@cloudflare/workers-types`, zod.
  5. Crear `wrangler.toml` con: nombre proyecto Pages, **exactamente 2 KV namespaces** (Free Tier máximo 2): `PICOPLACA_CONFIG`, `PICOPLACA_ADS`; D1 databases `PICOPLACA_BLOG`, `PICOPLACA_LEADS` (D1 Free permite 25, holgado).
  6. Añadir script `npm run deploy` = `astro build && wrangler pages deploy ./dist`.
  7. Crear `.env.example` con vars: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `GOOGLE_ADSENSE_CLIENT_ID=ca-pub-XXXX`, `GA4_MEASUREMENT_ID=G-XXXX`.
  8. Deploy inicial "hola mundo" → obtener URL `*.pages.dev`.
- **Criterio de éxito:** `npm run build` no falla; SSG genera al menos `index.html` y `404.html`; URL Pages muestra "Pico y Placa Colombia" en `<title>`.
- **Tiempo estimado:** 60 min

## Tarea 2: Datos semilla core + Contenido blog + Páginas comparativas
- **Objetivo:** Poblar `src/data`, `src/content/blog`, `src/content/comparisons` con toda la información necesaria para cálculos e indexación inicial.
- **Subtareas:**
  1. `src/types.ts` → interfaces `City`, `Rotation`, `Holiday`, `SpecialDay`, `AdSlot`, `BannerSponsor`, `BlogPost`, `ComparisonPage`, `ProLead`.
  2. `src/data/cities.ts` → 6+ ciudades: Bogotá (par-impar), Medellín, Cali, Barranquilla (taxis only), Bucaramanga, Cartagena, Pereira; cada una con schedule, activeDays, multa, url oficial, descripción larga ≥200 palabras y FAQ 5-8 preguntas.
  3. `src/data/rotations.ts` → rotación 2 semestres 2026 con shiftOffset = 0 por defecto; `validFrom`, `validTo` correctos.
  4. `src/data/holidays.ts` → festivos colombianos 2025, 2026, 2027.
  5. `src/data/specialDays.ts` → Día sin Carro Bogotá primer jueves de febrero; jornadas pedagógicas Medellín cambio rotación.
  6. Configurar `src/config.ts` con collections Astro Content: `blog` y `comparisons` con schema Zod.
  7. Escribir **10 posts Markdown/MDX** mínimo en `src/content/blog` (frontmatter: title, excerpt, datePublished, dateModified, tags, category, seoTitle, seoDescription, faqs[], relatedCityIds[]).
  8. Escribir **3 páginas comparativas** en `src/content/comparisons` (mejores seguros vehiculares, comparar SOAT 2026, mejores renting carros).
- **Criterio de éxito:** `npm run typecheck` 0 errores; build genera rutas de blog y comparativas sin fallar.
- **Tiempo estimado:** 90 min

## Tarea 3: Lógica de cálculo pura y tests unitarios
- **Objetivo:** Funciones puras + Vitest para calcular restricciones correctamente en cualquier fecha.
- **Subtareas:**
  1. `src/lib/date-utils.ts`: `toColombiaDate(date)`, `getDayOfWeek(date)`, `isSameDay`, `formatDateEs`.
  2. `src/lib/holidays.ts`: `isHoliday`, `getHoliday`.
  3. `src/lib/pico-placa.ts`:
     - `getActiveRotation(cityId, date, rotations)`.
     - `applyWeekdayShift(weekdayDigits, shiftOffset)`.
     - `getRestrictionForDate(city, date, context={rotations,holidays,specialDays})` → `{ restricted, digits[], reason, schedule? }`.
     - `checkPlate(plate, city, date, context, vehicleType='car')` (para motos Medellín: primer dígito).
  4. Configurar Vitest + archivo `setup-cloudflare.ts` con tipos workers.
  5. Tests unitarios (mínimo 8): Bogotá impar vs par; Medellín Lun/Vie rotación actual; festivo excludes; shiftOffset=+1; placa XYZ123 en Medellín lunes; Día sin Carro Bogotá → full-ban; Barranquilla taxis-only; Cali vigencia siguiente semestre.
- **Criterio de éxito:** `npm test` 100% tests pasan.
- **Tiempo estimado:** 120 min

## Tarea 4: UI Core - Home + componentes base + AdSlot/Banner (placeholders anti-CLS)
- **Objetivo:** Home completa, responsive, con slots para anuncios ya reservados (CLS<0.1).
- **Subtareas:**
  1. Layout base `layouts/BaseLayout.astro`: `<SeoHead />` inyectado, `<CookieConsent />` banner placeholder, footer con enlaces legales y fuentes oficiales.
  2. Componentes Astro (estáticos):
     - `<HeaderAstro />` (logo, menú, links blog/ciudades/pro).
     - `<HeroToday date={today} holiday? specialDay? />`.
     - `<RecommendationCard restriction={...} />`.
     - `<CityCard restriction={...} />` con link a ciudad (grid 1/2/3 cols).
     - `<TipsSection />` 4-6 tips estáticos con links internos a posts.
     - `<AdSlot slotId="home-hero" size="responsive" />` → placeholder tamaño fijo cuando no hay provider/consentimiento.
     - `<BannerSponsor location="home-top" />` → obtiene banners de `/api/ads` o renderiza vacío.
  3. React island `<DatePickerIsland />`: selector fecha (nativo `<input type="date">`) + al cambiar actualiza URL `?date=` y re-hidrata contenido dinámico de restricciones (o bien re-render con Astro params de consulta).
  4. Ensamblar `pages/index.astro`.
- **Criterio de éxito:** Mobile viewport 360x640 y desktop 1280 se ven correctos; ningún layout shift al cargar (placeholders anuncios ocupan espacio).
- **Tiempo estimado:** 180 min

## Tarea 5: Verificador de placa + Páginas por ciudad + Calendarios SSG + Landing /pro
- **Objetivo:** Páginas SEO-friendly para cada ciudad y el calendario anual, más el verificador interactivo.
- **Subtareas:**
  1. React island `<PlateCheckerIsland />`: inputs placa/ciudad/fecha, validación Zod, botón submit, panel resultado (✅/⚠️/🚫) + AdSlot post-resultado nativo con placeholder.
  2. `pages/[citySlug]/index.astro` SSG con: descripción larga, FAQ, horarios, multa, enlaces oficiales, AdSlot sidebar+inline, banner city-bottom, enlaces internos ("ver calendario 2026", "rotación próximo semestre", posts relacionados), breadcrumbs.
  3. `pages/calendario-pico-y-placa-[citySlug]-[year].astro` SSG para combinaciones: 6 ciudades × 3 años (2025/2026/2027) = tabla de 12 meses × 5 días con dígitos. Breadcrumbs y links interno a la ciudad.
  4. `pages/pro.astro` landing Plan Pro (B2B): copy beneficios (API flotas, recordatorios, soporte), formulario lead (empresa, email, teléfono, tamaño flota, mensaje) + honeypot anti-spam, Cloudflare Turnstile.
  5. Añadir enlace a verificador en header y CTA floating en mobile.
- **Criterio de éxito:** build genera 6 páginas ciudad + 18 calendarios + /pro; verificador retorna resultado coherente con placa/fecha seleccionada.
- **Tiempo estimado:** 180 min

## Tarea 6: SEO on-page técnico + Analytics + Sitemap/Robots
- **Objetivo:** Cumplir RF-30 a RF-35 del spec: meta único, JSON-LD ricos, canonical, OG/Twitter, sitemap/robots.
- **Subtareas:**
  1. Componente `components/SeoHead.astro` props-based: `{title, description, canonical, image?, type?, jsonLd?, breadcrumbs?}`. Inyecta `google-site-verification` y `msvalidate.01` (Bing) como meta tags configurables.
  2. Componente `components/Breadcrumbs.astro` + `JsonLdBreadcrumbList`.
  3. Generar JSON-LD utilitarios:
     - `jsonld/website.ts` → home (con Sitelinks Searchbox opcional).
     - `jsonld/faq.ts` → FAQPage (array Q&A).
     - `jsonld/city.ts` → City + Schedule (página ciudad).
     - `jsonld/blog.ts` → BlogPosting.
     - `jsonld/review.ts` → Product + AggregateRating + Review (comparativas).
     - `jsonld/event.ts` → Event (día sin carro).
  4. `pages/robots.txt.ts` (endpoint Astro): reglas Disallow /admin/*, Allow /*, Sitemap apuntando a sitemap-index.xml.
  5. Configuración `@astrojs/sitemap` custom para generar `sitemap-index.xml` con sub-sitemaps: páginas estáticas, ciudades, calendarios, blog, comparativas. Añadir `lastmod` y `changefreq: weekly` (ciudades/blog), `monthly` (comparativas).
  6. Integrar Cloudflare Web Analytics y GA4 (snippets), **cargados condicionalmente después de consentimiento CMP** (no se insertan hasta aceptar).
  7. Páginas legales placeholder: `pages/legal/politica-privacidad.astro`, `terminos-y-condiciones.astro`, `politica-cookies.astro` con copy estándar CO (LSSPD).
- **Criterio de éxito:** home, ciudad, blog post, comparativa tienen title/description/canonical únicos y por lo menos un JSON-LD detectado al inspeccionar `<script type="application/ld+json">`.
- **Tiempo estimado:** 150 min

## Tarea 7: Blog MDX + Páginas comparativas + Links afiliados + Tags/relacionados
- **Objetivo:** Arquitectura de blog y páginas "mejores X" listas para SEO comercial (long-tail + afiliados).
- **Subtareas:**
  1. `pages/blog/index.astro`: listado posts con paginación (10/page), filtros por categoría y tags; canonical /blog/.
  2. `pages/blog/[...slug].astro`: render MDX, portada, author, fecha, tags, FAQs renderizados, JSON-LD BlogPosting + FAQPage, "posts relacionados" (mismo tag o relatedCityIds).
  3. Pages de categorías y tags: `pages/blog/categoria/[categoria].astro`, `pages/blog/tag/[tag].astro`.
  4. `pages/[comparisonSlug].astro` (o colección dedicada) para `/mejores-seguros-vehiculares-colombia`, `/comparar-soat-2026`, `/mejores-renting-carros-colombia`:
     - Hero con título, intro, tabla comparativa top, fichas pros/cons por ítem con `⭐ rating`, links afiliados con `rel="sponsored noopener noreferrer"`, UTM params, schema Review+Product+AggregateRating, FAQ, conclusión.
  5. Añadir links internos automáticos: en ficha ciudad → "Lee: Multa pico y placa 2026" → blog post; en post → "Ver restricciones hoy en Bogotá".
- **Criterio de éxito:** build genera 10 URLs de posts + 3 comparativas; Google Rich Results Test sobre una comparativa detecta Product + AggregateRating.
- **Tiempo estimado:** 150 min

## Tarea 8: API Pages Functions + KV/D1 + Panel Admin Ampliado
- **Objetivo:** Admin puede gestionar: rotaciones, ads slots/banners, posts editables, leads Pro.
- **Subtareas:**
  1. Crear migrations D1 SQL en `migrations/0001_create_tables.sql`: tablas `blog_posts`, `banners`, `leads`, `rotation_history`, `ads_slots`; seed inicial.
  2. Pages Functions (en `functions/` o Astro endpoints en `pages/api/`):
     - `api/config.json` → GET público: cities+rotations+holidays+specialDays+banners activos+adsSlugs (sin IDs sensibles; solo si slot está enabled).
     - `api/ads.json` → GET público: banners activos según fecha/location.
     - `api/leads` → POST: valida honeypot/Turnstile; insert en D1 leads; retorna 201.
     - `api/admin/*` → CRUD autenticado:
       - `/rotations` + `shiftOffset` editable.
       - `/ads/slots` (on/off, provider, clientId, slotIds, sizes, sticky, placeholder).
       - `/banners` CRUD con fechas vigencia/UTM.
       - `/blog-posts` para edición WYSIWYG simple (textarea markdown).
       - `/leads` GET → lista leads últimos 30 días.
  3. Middleware auth: Cloudflare Access policy `include: emails = [admin@picoyplaca.co]` (recomendado) o bearer token con bcrypt en KV.
  4. Página `pages/admin/index.astro` SPA React: dashboard con tabs Ciudades / Rotaciones / Ads / Banners / Blog / Leads; preview "Cómo se verá el día X" antes de guardar rotación.
- **Criterio de éxito:** Login en /admin; desde Admin se crea rotación, se cambia AdSense slot ID y ambos cambios aparecen al refrescar `/api/config` en menos de 60 s (KV cache).
- **Tiempo estimado:** 240 min

## Tarea 9: Setup Monetización + Consentimiento Cookies/CMP
- **Objetivo:** AdSense/Ezoic listos para aprobación; banners, afiliados, leads funcionando.
- **Subtareas:**
  1. Componente React `components/ads/GoogleAdSense.tsx`:
     - Inserta `adsbygoogle.js` solo si: (a) slot.enabled, (b) consentimiento "marketing" aceptado, (c) no estamos en /admin.
     - Renderiza `<ins class="adsbygoogle">` con `data-ad-client`, `data-ad-slot`, `data-ad-format=auto responsive`.
     - Reserva aspect-ratio 1:1 o 9:16 según slot antes de cargar (CLS safe).
     - Si provider = ezoic/mediavine → misma estructura cambiando etiqueta y data attrs.
  2. Componente `components/legal/CookieConsent.tsx` **NATIVO 100% Free** (sin CookieYes premium):
     - Categorías: Necesarias (siempre) / Analytics / Marketing.
     - Guarda elección en `localStorage` + cookie `cookie_consent_v1` (expiración 180 días).
     - Hook `useConsent()` en AdSense y GA4: no insertan script hasta categoría concedida.
     - Botones "Aceptar todo", "Rechazar no necesarias", "Personalizar".
     - Banner sticky bottom en mobile (no bloquea CTA; z-index ≤ 40).
  3. Endpoint `/api/adsense-check` opcional: retorna si hay IDs configurados, útil QA.
  4. Banners patrocinador: `<BannerSponsor>` fetch `/api/ads`; si hay, muestra imagen + link `target="_blank"` + `rel=sponsored noopener noreferrer` + appends `utm_source=picoyplaca.co&utm_medium=banner&utm_campaign=...`.
  5. Landing `/pro`: form envía POST a `/api/leads`; muestra éxito/error; lead **se guarda únicamente en tabla D1 `leads`**. **NO usar Cloudflare Email Workers** (es pago). El administrador consulta leads desde `/admin/leads` export CSV/Tabla. Opcional (solo si usuario aporta API key): webhook a **Resend Free Tier** (100 emails/día) para notificación; por defecto: OFF.
- **Criterio de éxito:** en DevTools al cargar home sin consentimiento → 0 peticiones a doubleclick.net; al aceptar marketing → se carga adsbygoogle.js e inserta slot. Form /pro guarda registro en D1 visible desde admin.
- **Tiempo estimado:** 120 min

## Tarea 10: PWA + Accesibilidad + Core Web Vitals + Optimizaciones
- **Objetivo:** Lighthouse ≥ 90 en Perf/A11y/SEO; CWV "Good".
- **Subtareas:**
  1. `public/manifest.webmanifest`: nombre, short_name, theme_color, background_color, icons 192/512px, start_url, display=standalone.
  2. Service Worker con `@astrojs/service-worker` o `vite-plugin-pwa`: estrategia cache-first para JS/CSS/imágenes; network-first para HTML.
  3. Favicon multi-tamaño: `public/favicon.ico`, `public/favicon.svg`, `public/apple-touch-icon.png`.
  4. Accesibilidad: skip-link, labels en datepicker/placa/ciudad select, aria-live en resultado verificador, contraste texto ≥ 4.5:1, focus visibles outlines, landmarks `<header><main><aside><footer><nav>`.
  5. Optimizaciones Tailwind: `corePlugins` solo usados; `content` config correcta; purgecss built-in Astro.
  6. Placeholders en todos los `<img>`: `width/height` + `loading="lazy"` + `decoding="async"`; imágenes ≥ 200KB en AVIF/WebP si aplica.
  7. Anuncios sticky en mobile: altura fija 60px; posición `sticky bottom-0` con `contain: layout style paint` para evitar CLS.
  8. Run Lighthouse local (mobile) + ajustar hasta ≥ 90 en Perf, A11y, SEO, Best Practices.
- **Criterio de éxito:** `npx unlighthouse --site http://localhost:4321` o DevTools Lighthouse: 4 categorías ≥ 90; PSI mobile LCP < 2.5, CLS < 0.1.
- **Tiempo estimado:** 90 min

## Tarea 11: Despliegue Cloudflare Pages + Dominio picoyplaca.co + DNS/SSL/Cache/GSC
- **Objetivo:** Sitio en vivo en `https://picoyplaca.co`, SSL estricto, reglas caché, Search Console listo.
- **Subtareas:**
  1. Confirmar `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` disponibles y con permisos: Pages:Edit, KV:Edit, D1:Edit, DNS:Edit, Zone:Read.
  2. `npm run build` → production build.
  3. Deploy via MCP Cloudflare (@cloudflare/mcp-server-cloudflare) o `wrangler pages deploy ./dist --project-name=picoyplaca-co`.
  4. Ejecutar migraciones D1: `wrangler d1 migrations apply PICOPLACA_BLOG --remote`.
  5. En Pages → Custom domains: agregar `picoyplaca.co` y `www.picoyplaca.co`; Cloudflare debe crear automáticamente los DNS records.
  6. DNS y Rules (FREE Tier límites respetados):
     - NS del dominio ya apuntando a Cloudflare nameservers (pedir verificación al usuario si no).
     - **Page Rule 1/3**: `www.picoyplaca.co/*` → 301 a `https://picoyplaca.co/$1` (Forwarding URL 301).
     - **Page Rule 2/3**: RESERVADA (regla de seguridad WAF básica o IP geobloqueo si hace falta). NO consumir la 3ª si no es estrictamente necesario.
     - Trailing-slash unificado usando **Transform Rules** (Rewrite URL) → Free, no gasta Page Rules.
     - Cache de assets usando **Cache Rules** → Free tiene 5 reglas; usar 1: `File extension matches css,js,png,jpg,jpeg,webp,avif,woff2,svg,ico` → Edge TTL 1 year + Cache Everything.
     - Cache `/api/config` con Cache Rule: Edge TTL 600s (10 min) para reducir invocaciones Functions.
  7. SSL/TLS → **Full** (NO Strict; Free Tier puede fallar Strict con Pages origin). Security → Always Use HTTPS ON. HSTS: max-age=31536000; includeSubDomains (preload solo después de 2 semanas sin problemas).
  8. Caché y rendimiento (todo Free):
     - HTML → Bypass cache en Cache Rules (ISR no usado; si fuera, 5-10 min).
     - Auto Minify: ON para HTML, CSS, JS (gratis).
     - Rocket Loader → OFF por defecto para evitar romper AdSense/GA4 scripts; solo activar si Lighthouse indica mejora y QA manual pasa.
     - Brotli ON, HTTP/2 ON, HTTP/3 (QUIC) ON (todos gratis).
     - NO Argo Smart Routing, NO WAF paid rules, NO Rate Limiting paid, NO Image Resizing paid (usar formatos AVIF/WebP build-time con Astro assets).
  9. Webmaster Tools:
     - Subir `google<HASH>.html` meta tag ya insertado en SeoHead → verificar propiedad GSC.
     - Insertar `msvalidate.01` en SeoHead y verificar en Bing Webmaster.
     - Enviar `https://picoyplaca.co/sitemap-index.xml` en ambas herramientas.
     - Pedido de indexación URL: home, 6 ciudades, 10 posts.
- **Criterio de éxito:** `curl -I https://picoyplaca.co` → 200, `strict-transport-security` header presente; `curl -I https://www.picoyplaca.co` → 301 hacia apex.
- **Tiempo estimado:** 120 min

## Tarea 12: QA final + SEO testing + Bug fixes
- **Objetivo:** Revisar todo el checklist; corregir defects P1/P2; validaciones externas pasan.
- **Subtareas:**
  1. Recorrido manual mobile (Chrome 116, Safari iOS 16) y desktop (Chrome, Firefox, Edge):
     - Home → selector fecha → verificador → 6 ciudades → 3 calendarios → 3 blog posts → /pro → /legal.
     - AdSlot se renderiza placeholder antes de consentir; después de aceptar cookies carga anuncio.
     - Enviar formulario /pro → crea lead en D1.
  2. SEO testing externo:
     - https://validator.schema.org → home, ciudad, blog, comparativa.
     - https://search.google.com/test/rich-results → al menos FAQPage + BlogPosting / AggregateRating detectados.
     - https://pagespeed.web.dev mobile: LCP<2.5, INP<200, CLS<0.1 (good/green).
  3. Tests unitarios + build final.
  4. Redeploy a producción (incremental).
- **Criterio de éxito:** 0 bugs P1/P2 pendientes; todas las validaciones externas pasan sin errores.
- **Tiempo estimado:** 90 min

## Tarea 13: Free Tier Compliance Audit (antes de entrega final)
- **Objetivo:** Verificar 100% que nada excede cuotas Free Tier de Cloudflare y ningún servicio pago está activado.
- **Subtareas:**
  1. Login Cloudflare Dashboard → Account → Billing → Subscriptions → confirmar "You're on the Free plan". 0 cargos recurrentes.
  2. Account → Usage overview: Pages builds < 200 min en el mes actual (500 min Free).
  3. Workers & Pages → Functions → Request count última 24h ≤ 100k (Free limit diario).
  4. Workers KV → 2 namespaces exactamente; storage < 1 MB.
  5. D1 → 2 databases; storage < 10 MB.
  6. Rules → Page Rules: 1 o 2 usadas de 3 disponibles (NUNCA 3 de 3 sin justificar).
  7. SSL/TLS → Overview → modo **Full** (no Strict; no Advanced cert).
  8. Zero Trust → Access → Applications → exactamente 1 app (/admin); usuarios ≤ 5.
  9. No hay creados: R2 buckets (Free tiene 10 GB, pero no los necesitamos; si existen sin uso, borrar), Workers independientes fuera de Pages Functions, Queues, Durable Objects.
  10. `wrangler pages deployment list` y confirmar plan FREE en `deployment_meta.subdomain` pages.dev.
- **Criterio de éxito:** checklist sección J del check_list.md marcada en ≥ 95%; 0 features pagas activadas.
- **Tiempo estimado:** 30 min

---

**Orden de ejecución recomendado:**
T1 → T2 → T3 → T4 → T5 → T6 → T7 → T9 (parcial, AdSlot/CMP) → T8 → T9 (final legal/leads) → T10 → T11 → T12 → T13

**Total tiempo estimado: 1670 min ≈ 28 h efectivas (4-5 días de trabajo concentrado)**
