# Lista de Verificación - Pico y Placa Colombia (picoyplaca.co)

## A. Configuración del Proyecto
- [ ] A.1 Repositorio inicializado con package.json
- [ ] A.2 **Astro 4.x + React islands + TypeScript** instalados y configurados (recomendado por SEO/SSG)
- [ ] A.3 Tailwind CSS configurado y funcionando
- [ ] A.4 Archivo `wrangler.toml` con bindings de Pages, KV (PICOPLACA_CONFIG, PICOPLACA_ADS) y D1 (BLOG, LEADS)
- [ ] A.5 Build de producción exitoso (`npm run build` sin errores, incluyendo SSG de ciudades + blog)
- [ ] A.6 Deploy "hola mundo" exitoso en Cloudflare Pages (`.pages.dev`)
- [ ] A.7 Archivo `.env.example` con las variables: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `GOOGLE_ADSENSE_CLIENT_ID` (placeholder), `GA4_MEASUREMENT_ID` (placeholder)
- [ ] A.8 `astro.config.mjs` con adaptador Cloudflare, output `hybrid` o `static`, integración sitemap, MDX activado

## B. Datos y Lógica de Negocio
- [ ] B.1 Datos semilla de al menos 6 ciudades principales con esquema correcto
  - [ ] Bogotá (par/impar)
  - [ ] Medellín (dígitos por día de semana)
  - [ ] Cali (dígitos por día de semana)
  - [ ] Barranquilla (solo taxis)
  - [ ] Bucaramanga
  - [ ] Cartagena
  - [ ] Pereira
- [ ] B.2 Rotaciones vigentes para semestre actual y siguiente con fechas de validez
- [ ] B.3 Lista de festivos colombianos 2025, 2026, 2027
- [ ] B.4 Días especiales cargados (Día sin Carro Bogotá, etc.)
- [ ] B.5 Función pura `getRestrictionForDate(city, date, rotations, holidays, specialDays)` implementada
- [ ] B.6 Lógica de `shiftOffset` (rotación de la rotación) implementada y probada
- [ ] B.7 Tests unitarios (Vitest) para casos clave:
  - [ ] Bogotá día impar vs par
  - [ ] Medellín lunes/viernes según rotación
  - [ ] Festivo con `excludesHolidays: true`
  - [ ] ShiftOffset = +1 mueve los dígitos un día adelante
  - [ ] Placa específica retorna restricción correcta

## C. UI Pública
- [ ] C.1 Página principal `/` con:
  - [ ] Header con logo, nombre y selector de fecha
  - [ ] Hero con fecha actual, día de semana, indicador festivo
  - [ ] Tarjeta de recomendación del día destacada
  - [ ] Grid responsivo de tarjetas por ciudad (mínimo 6)
  - [ ] Cada tarjeta muestra: nombre ciudad, departamento, dígitos restringidos, horario
  - [ ] Sección tips/recomendaciones
  - [ ] Footer con enlaces a fuentes oficiales, políticas legales
  - [ ] **AdSlot home-hero** con placeholder de tamaño fijo (evitar CLS)
  - [ ] **Banner patrocinador home-top** (si está activo en admin)
- [ ] C.2 Selector de fecha: cambia los cálculos al instante
- [ ] C.3 Verificador de placa:
  - [ ] Input de placa (últimos dígitos o completa)
  - [ ] Selector de ciudad
  - [ ] Selector de fecha
  - [ ] Resultado claro: ✅ puede circular / ⚠️ parcial / 🚫 restricción con horario
  - [ ] Bloque **anuncio nativo** post-resultado
- [ ] C.4 Página por ciudad (`/[ciudad]`) con:
  - [ ] Descripción textual ≥ 200 palabras (evita thin content)
  - [ ] FAQ con 5-8 preguntas → genera FAQPage JSON-LD
  - [ ] AdSlot sidebar + inline
  - [ ] Banner patrocinador city-bottom
  - [ ] **Enlaces internos** a otras ciudades, calendario anual, post relacionados
  - [ ] Breadcrumbs
- [ ] C.5 Páginas de calendario (`/calendario-pico-y-placa-[ciudad]-[año]`) generadas por SSG para 2025, 2026, 2027
- [ ] C.6 Landing **/pro** (Plan Pro para flotas B2B): descripción servicio, formulario lead, campos: empresa, email, teléfono, tamaño flota, mensaje
- [ ] C.7 Diseño responsive: móvil, tablet, desktop validados visualmente
- [ ] C.8 PWA: `manifest.webmanifest`, iconos en 5 tamaños, service worker con estrategia cache-first para estáticos
- [ ] C.9 Accesibilidad WCAG 2.1 AA: contraste, labels, navegación teclado, skip-link, aria-live en resultados dinámicos

## H. Monetización
- [ ] H.1 Componente `<AdSlot>` reutilizable:
  - [ ] Soporta provider "adsense", "ezoic", "mediavine", "custom"
  - [ ] Carga script de AdSense **solo si consentimiento de cookies aceptado**
  - [ ] Placeholder tamaño fijo cuando slot no está o no hay consentimiento (CLS < 0.1)
  - [ ] Slot IDs configurables desde admin (sin redeploy)
- [ ] H.2 Panel admin → Gestión publicitaria:
  - [ ] Editar `AdSense client_id` y `slot_ids` por posición
  - [ ] On/off por slot
  - [ ] Cambio de provider (AdSense → Ezoic) con un click
- [ ] H.3 Banners patrocinadores CRUD desde admin: imagen, link, fechas, ubicación, UTM params
- [ ] H.4 Páginas comparativas SEO/comerciales:
  - [ ] `/mejores-seguros-vehiculares-colombia`
  - [ ] `/comparar-soat-2026`
  - [ ] `/mejores-renting-carros-colombia`
  - [ ] Cada una con schema `Review` + `AggregateRating`, links afiliados con `rel="sponsored noopener noreferrer"`
- [ ] H.5 Cumplimiento legal:
  - [ ] `/legal/politica-privacidad`
  - [ ] `/legal/terminos-y-condiciones`
  - [ ] `/legal/politica-cookies`
  - [ ] **Banner CMP de consentimiento** (CookieYes o nativo) que bloquea cookies de terceros hasta aceptar
- [ ] H.6 Captura leads Plan Pro:
  - [ ] Formulario `/pro` envía a `POST /api/leads`
  - [ ] Endpoint guarda en tabla D1 `leads` + validación anti-spam (honeypot, Cloudflare Turnstile)
  - [ ] Email de notificación opcional (Cloudflare Email Workers)

## I. SEO Orgánico (sin pago de publicidad)
- [ ] I.1 **Arquitectura** de URLs amigable y keyword-targeted:
  - [ ] `/` → KW principal "pico y placa hoy colombia", "pico y placa 2026"
  - [ ] `/bogota`, `/medellin`, `/cali`, etc. → "pico y placa [ciudad] hoy"
  - [ ] `/pico-y-placa-[ciudad]-[mes]-[año]` → long-tail mensual
  - [ ] `/calendario-pico-y-placa-[ciudad]-[año]` → calendario anual
  - [ ] `/pico-y-placa-[ciudad]-taxis`, `-motos` → por tipo vehículo
- [ ] I.2 **Blog**:
  - [ ] Índice `/blog` con paginación, categorias y tags
  - [ ] Página `/blog/[slug]` MDX renderizado
  - [ ] Mínimo 10 posts en el lanzamiento (guías, rotaciones, multas, día sin carro, eléctricos exentos, consejos)
  - [ ] Cada post tiene `BlogPosting` JSON-LD con author, datePublished, dateModified, keywords, image
  - [ ] Campos `faqs` por post → se renderizan y generan `FAQPage` JSON-LD
  - [ ] Sistema de **posts relacionados** por ciudad/tags → enlaces internos
- [ ] I.3 **SEO on-page técnico**:
  - [ ] Componente `<SeoHead />` inyecta title, description, canonical, OG/Twitter únicos por página
  - [ ] Title dinámico en ciudad: `Pico y Placa {Ciudad} Hoy {dd/mm/aaaa} - Dígitos y Horarios`
  - [ ] Meta description ≥ 120 y ≤ 160 caracteres, con KW objetivo
  - [ ] **Canonical tags** en todas las páginas; evitar duplicados (ej: selector fecha por URL no canónica)
  - [ ] **Breadcrumbs** (schema BreadcrumbList) en: ciudad, calendarios, posts, páginas legales
  - [ ] Open Graph + Twitter Card con: `og:title`, `og:description`, `og:image` (≥1200x630), `og:type`, `og:url`
  - [ ] Datos estructurados (JSON-LD):
    - [ ] Home: `WebSite` + `FAQPage` + `ScheduleAction`
    - [ ] Ciudad: `City` + `FAQPage` + `Schedule`
    - [ ] Blog: `BlogPosting` + potencial `FAQPage`
    - [ ] Comparativas: `Review` + `Product` + `AggregateRating`
    - [ ] Eventos: Día sin Carro → `Event`
- [ ] I.4 **Crawling / Indexación**:
  - [ ] `robots.txt`: Disallow `/admin/*`, Allow `/*`, `Sitemap: https://picoyplaca.co/sitemap-index.xml`
  - [ ] `sitemap-index.xml` build-time con: sitemap páginas, sitemap ciudades, sitemap blog, sitemap comparativas, sitemap calendarios
  - [ ] `sitemap.html` opcional accesible para usuarios
  - [ ] Meta tag de verificación Google Search Console (`google-site-verification`) + Bing Webmaster
  - [ ] `404.astro` friendly con sugerencias de páginas populares
  - [ ] Redirecciones 301: `www` → apex, trailing slash/no-trailing slash unificado en Cloudflare Rules
- [ ] I.5 **Core Web Vitals y rendimiento SEO**:
  - [ ] LCP < 2.5 s (mobile, 4G): imágenes con `width/height`, `loading="lazy"`, formato AVIF/WebP cuando es posible
  - [ ] INP < 200 ms: poca hidratación (Astro islands solo donde hay interacción)
  - [ ] CLS < 0.1: placeholders en anuncios, aspect ratio en imágenes, anuncios sticky calculados
  - [ ] `<link rel="preconnect">` a dominios necesarios (googleapis, gstatic, Cloudflare CDN)
  - [ ] Carga diferida de scripts ads (defer o `LoadAds()` en onload)
- [ ] I.6 **Enlaces internos y topical authority**:
  - [ ] "Te podría interesar" en cada post (por tag/ciudad)
  - [ ] Menú footer con 10+ links internos profundos
  - [ ] Páginas pillar: "Guía completa pico y placa Colombia 2026" que enlaza a todas las ciudades + calendarios
- [ ] I.7 **Contenido fresco**:
  - [ ] Cuando cambia la rotación (junio/diciembre): panel admin actualiza posts sin borrar URLs antiguas (update `dateModified`)
  - [ ] Actualización meta `og:updated_time` y JSON-LD `dateModified`
- [ ] I.8 **Post-lanzamiento**:
  - [ ] Envío manual sitemap a Google Search Console y Bing Webmaster
  - [ ] Pedido de indexación para home + 6 ciudades + 10 posts vía GSC
  - [ ] Schema validado en https://validator.schema.org/ y Rich Results Test (Google)
  - [ ] PageSpeed Insights móvil: LCP/INP/CLS dentro de umbrales "Good"

## D. Panel Administrativo y API
- [ ] D.1 Endpoints `/api/cities`, `/api/rotations`, `/api/special-days`, `/api/holidays` (GET/POST/PUT/DELETE)
- [ ] D.2 Persistencia en Cloudflare KV o D1 con datos iniciales
- [ ] D.3 Ruta `/admin` protegida (Cloudflare Access o auth JWT simple)
- [ ] D.4 CRUD visual para rotaciones:
  - [ ] Seleccionar ciudad
  - [ ] Fecha inicio/fin de vigencia
  - [ ] Editor de dígitos por día (Lun a Vie)
  - [ ] Campo `shiftOffset` numérico
  - [ ] Preview "prueba con fecha X" antes de guardar
- [ ] D.5 CRUD para días especiales y festivos
- [ ] D.6 Validación server-side con Zod de todos los inputs del admin

## E. Despliegue y Dominio
- [ ] E.1 Cloudflare MCP disponible o `wrangler` CLI instalado global
- [ ] E.2 Variables de entorno `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` configuradas
- [ ] E.3 Proyecto Pages creado y primer deploy exitoso
- [ ] E.4 Dominio `picoyplaca.co` agregado como custom domain en Pages
- [ ] E.5 DNS: CNAME / registro apex correctamente apuntado
- [ ] E.6 SSL/TLS modo Full (Strict) activado
- [ ] E.7 HSTS habilitado
- [ ] E.8 `https://picoyplaca.co` abre correctamente desde red externa
- [ ] E.9 Cache rules configuradas para HTML/JS/CSS/imágenes

## F. Pruebas y QA Final
- [ ] F.1 Prueba manual en Chrome, Firefox, Safari móvil y desktop
- [ ] F.2 Prueba con fechas futuras (rotación siguiente semestre)
- [ ] F.3 Prueba con festivos
- [ ] F.4 Prueba verificador de placa con 10+ combinaciones
- [ ] F.5 Admin permite crear, editar y borrar una rotación
- [ ] F.6 ShiftOffset aplicado visiblemente correcto
- [ ] F.7 Lighthouse: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90
- [ ] F.8 Sin errores de consola (JS) en producción
- [ ] F.9 Tiempo de carga < 2 s en 4G ( throttling DevTools)

## G. Documentación (opcional, pero recomendada)
- [ ] G.1 `README.md` con instrucciones de instalación, build y deploy
- [ ] G.2 Explicación de cómo agregar nueva ciudad/rotación desde admin
- [ ] G.3 Listado de fuentes oficiales consultadas

## J. Cloudflare Free Tier Compliance (obligatorio)
- [ ] J.1 Cuotas Pages:
  - [ ] Build time ≤ 500 min/mes (build proyecto ≤ 3 min por build; ≤ 100 builds/mes)
  - [ ] Preview builds ≤ 10,000/mes (evitar commits que disparen 10 previews al día)
- [ ] J.2 Cuotas Functions / Workers:
  - [ ] Requests Functions ≤ 100,000/día; `/api/config` cacheado con Edge TTL 10 min para reducir invocaciones
  - [ ] CPU time ≤ 10 ms/invocación (ningún endpoint usa loops > 1000 iteraciones)
- [ ] J.3 KV:
  - [ ] Exactamente 2 namespaces: `PICOPLACA_CONFIG`, `PICOPLACA_ADS` (Free Tier tiene 2 NS)
  - [ ] Storage < 100 MB (objetivo < 1 MB total)
  - [ ] Writes ≤ 10/día en operaciones admin (≤ 1000/día Free)
- [ ] J.4 D1:
  - [ ] ≤ 2 databases creadas (Free permite 25, holgado)
  - [ ] Storage total < 100 MB (Free 5 GB)
  - [ ] Write rows ≤ 50/día (Free 100,000/día)
- [ ] J.5 DNS y Rules:
  - [ ] Page Rules usadas ≤ 2 (Free permite 3): (1) www → apex 301, (2) [reserva]
  - [ ] Trailing-slash y cache assets gestionados con Cache/Transform Rules (Free, sin consumir Page Rules)
  - [ ] No usar Workers Routes separados; todo en Pages Functions dentro de `/api/*`
- [ ] J.6 SSL / Seguridad:
  - [ ] SSL/TLS modo **Full** (no Strict; Free Tier no garantiza Strict a Pages origin en todos los casos)
  - [ ] Always Use HTTPS ON + HSTS encendido (ambos Free)
  - [ ] No habilitar: Argo Smart Routing (pago), Spectrum (pago), Zero Trust Gateway (pago), Advanced Certificate Manager (pago)
- [ ] J.7 Access (Admin):
  - [ ] 1 sola aplicación Access en Zero Trust (ruta `/admin*`); emails autorizados ≤ 5 (Free 50 usuarios)
  - [ ] Auth policy: `Include` emails allowlist; sin requerir hardware key (es pago). Pin + email es Free.
- [ ] J.8 Anti-spam:
  - [ ] Cloudflare Turnstile (free unlimited) en forms `/pro` y admin; NO reCAPTCHA enterprise.
- [ ] J.9 Monetización y legal:
  - [ ] CMP de cookies implementado como banner nativo en TS (sin pago CookieYes premium)
  - [ ] Sin usar servicios Cloudflare de pago: no Email Workers (leads guardados en D1, consulta manual desde `/admin/leads`); opcionalmente webhook a **Resend Free 100/día** solo si el usuario aporta su propia API key.
- [ ] J.10 Revisión final Dashboard:
  - [ ] Antes de entrega, abrir Cloudflare Dashboard y confirmar plan FREE visible; ningún warning "you have exceeded" en Account → Billing → Usage.
  - [ ] `wrangler pages project list` muestra el proyecto con plan Free.

