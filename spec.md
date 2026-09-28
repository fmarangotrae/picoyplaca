# Especificación Técnica: Aplicación Web Pico y Placa Colombia (picoyplaca.co)

## 1. Resumen Ejecutivo

Aplicación web informativa que muestra las restricciones de pico y placa vigentes en las principales ciudades de Colombia, agrupadas por ciudad, con sistema de rotación parametrizable y recomendaciones de movilidad sostenible. La aplicación se desplegará en Cloudflare Pages con el dominio personalizado `picoyplaca.co`.

## 2. Requisitos Funcionales

### 2.1 Visualización del Pico y Placa por Ciudad
- **RF-01:** Mostrar el pico y placa del día actual para cada ciudad principal (Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Cartagena, Pereira, Cúcuta, Ibagué, Manizales, Pasto, Villavicencio, Soacha, Armenia, Popayán, Tunja).
- **RF-02:** Agrupar la información por ciudad en tarjetas o secciones independientes.
- **RF-03:** Mostrar los dígitos de placa restringidos para el día en cada ciudad.
- **RF-04:** Mostrar los horarios de restricción aplicables en cada ciudad.
- **RF-05:** Permitir consultar el pico y placa para cualquier fecha futura o pasada (selector de fecha).
- **RF-06:** Indicar si el día seleccionado es festivo (sin restricción en la mayoría de ciudades).

### 2.2 Sistema de Rotación Parametrizable
- **RF-07:** Implementar un sistema de rotación configurable por ciudad.
- **RF-08:** Para ciudades con rotación por día de semana (Medellín, Cali, etc.): permitir definir qué dígitos corresponden a cada día de la semana, con vigencia por período (semestre, trimestre, etc.).
- **RF-09:** Para Bogotá (sistema par/impar): mantener el esquema basado en fecha del calendario, configurable si la alcaldía cambia el esquema.
- **RF-10:** Permitir la "rotación de rotación": desplazar todos los dígitos un día hacia adelante o atrás (lo que aplicaba lunes pasa a martes, etc.) mediante parámetro de configuración, con fecha de inicio de vigencia.
- **RF-11:** Panel de administración (protegido) para editar las rotaciones, fechas de vigencia y horarios por ciudad.

### 2.3 Verificador de Placa
- **RF-12:** Permitir al usuario ingresar un número de placa (últimos dígitos o placa completa) y seleccionar una ciudad.
- **RF-13:** Indicar instantáneamente si la placa tiene restricción en la fecha seleccionada, incluyendo el horario aplicable.

### 2.4 Recomendaciones del Día
- **RF-14:** Mostrar recomendaciones para días de pico y placa:
  - Uso de transporte público (SITP, TransMilenio, Metro, etc.)
  - Uso de bicicleta y ciclorrutas
  - Carpooling / vehículo compartido
  - Teletrabajo si es posible
  - Patinetas eléctricas y modos sostenibles
- **RF-15:** Mostrar recomendaciones específicas por tipo de vehículo:
  - Carros particulares
  - Taxis (restricciones especiales, p. ej. Bogotá taxis con terminación específica en Día sin Carro)
  - Transporte público (operación normal, rutas adicionales)
  - Motocicletas (esquema especial en Medellín: primer dígito)
  - Vehículos de carga
  - Vehículos eléctricos/híbridos (exentos)
- **RF-16:** Días especiales: Día sin Carro y sin Moto (primer jueves de febrero en Bogotá), restricciones ampliadas, jornadas pedagógicas.

### 2.5 Información Adicional
- **RF-17:** Mostrar el valor de la multa vigente por incumplimiento (en UVB / SMDLV).
- **RF-18:** Indicar las excepciones generales por ciudad (vehículos de emergencia, eléctricos, diplomáticos, personas con discapacidad, etc.).
- **RF-19:** Enlaces a fuentes oficiales (Secretarías de Movilidad, Ministerio de Transporte).

### 2.6 Monetización del Sitio Web (multi-canal)
- **RF-20:** Integrar **Google AdSense** como fuente de ingresos principal:
  - Bloque de anuncio responsive en el hero/entre tarjetas de ciudades.
  - Anuncio sticky en footer móvil (consciente de UX, no intrusivo).
  - Anuncio en sidebar o intercalado en páginas de ciudad y blog.
  - Bloque "anuncio nativo" dentro del verificador de placa (post-resultado).
- **RF-21:** Integración preparada para **Ezoic** o **Mediavine** como alternativa/upgrade cuando el tráfico supere 10k/50k sesiones mensuales (estructura de slots reutilizable, IDs configurables por env vars).
- **RF-22:** Programa de **afiliados** contextual:
  - Banners/recomendaciones de SOAT, seguros vehiculares, revisiones técnico-mecánicas con partners colombianos (ej. Seguros Bolívar, Sura, axa, o marketplaces como ComparaOnline, Rastreator, TuSeguro).
  - Enlaces afiliados a renting/alquiler de vehículos (Localiza, Hertz Colombia, etc.) especialmente en recomendaciones de "si hoy no circula, alquila".
- **RF-23:** Sección de **patrocinio / contenido patrocinado**: banner configurable desde el panel admin para partners de movilidad (empresas de buses, apps de ride-hailing, plataformas de bicicletas compartidas).
- **RF-24:** Modelo freemium / **Plan Pro** (opcional, vía integraciones sin pasarela en la V1, pero con landing de captura):
  - API para flotas empresariales.
  - Recordatorios por email/WhatsApp cuando cambie la rotación.
  - Landing `/pro` con formulario de contacto (captura de leads para negociación B2B).
- **RF-25:** Gestión centralizada de slots publicitarios desde el panel admin: activar/desactivar AdSense, cambiar IDs, subir banners de patrocinadores sin tocar código.
- **RF-26:** Páginas de "Compara" o "Mejores X" SEO-ready que atraen tráfico comercial intencional:
  - `/mejores-seguros-vehiculares-colombia`
  - `/comparar-soat-2026`
  - `/mejores-renting-carros-colombia`
  (contenido comparativo con links afiliados y datos estructurados de Review/Product).
- **RF-27:** Cumplimiento legal: página `/politica-privacidad`, `/terminos-y-condiciones`, `/politica-cookies` con consentimiento de cookies (banner CMP compatible con AdSense: opción gratuita como CookieYes o tarjeta nativa).

### 2.7 SEO Orgánico (sin pago de publicidad)
- **RF-28:** **Arquitectura de páginas orientada a keywords long-tail**:
  - Home `/` → keyword principal: "pico y placa hoy colombia", "pico y placa 2026".
  - Páginas por ciudad `/{ciudad}` → "pico y placa bogota hoy", "pico y placa medellin", "pico y placa cali 2026".
  - Páginas por ciudad + mes `/pico-y-placa-{ciudad}-{mes}-{año}` → "pico y placa medellin octubre 2026" (generadas estáticamente al build o vía ISR).
  - Páginas por tipo de vehículo `/pico-y-placa-{ciudad}-taxis`, `/pico-y-placa-{ciudad}-motos`.
  - Páginas de calendario `/calendario-pico-y-placa-{ciudad}-{año}`.
- **RF-29:** **Blog de contenido informativo** (ruta `/blog/[slug]`) con posts evergreen y actualizables:
  - "¿Qué es el pico y placa solidario en Bogotá y cómo funciona?"
  - "Multa por pico y placa 2026: valor UVB y cómo pagar"
  - "Rotación pico y placa Medellín segundo semestre 2026"
  - "Día sin Carro en Bogotá 2026: horarios y excepciones"
  - "Vehículos eléctricos exentos de pico y placa en Colombia"
  - "Cómo evitar comparendos de pico y placa: 10 consejos"
  Mínimo 10 posts en el lanzamiento, actualizables desde panel admin.
- **RF-30:** **SEO on-page técnico**:
  - Meta title, description únicos por cada página (incluyendo ciudad + fecha dinámica en SSR/edge).
  - Etiquetas H1, H2-H6 con jerarquía semántica correcta y palabras clave objetivo.
  - URLs cortas, amigables, en minúsculas, sin espacios ni caracteres raros.
  - Canonical tags para evitar contenido duplicado (mismo día, múltiples rutas).
  - Open Graph + Twitter Cards completos (incluyendo imagen OG con datos del día: ciudad, dígitos).
  - Breadcrumbs (`/ > Bogotá > Octubre 2026`) con schema.org BreadcrumbList.
- **RF-31:** **Datos estructurados (JSON-LD)** enriquecidos para cada tipo de página:
  - Home: `WebSite` + `FAQPage` (preguntas frecuentes) + `ScheduleAction`.
  - Página ciudad: `City` + `FAQPage` + `Schedule` (horarios).
  - Blog post: `BlogPosting` con author, datePublished, keywords.
  - Páginas "mejores X": `Review` / `Product` + `AggregateRating`.
  - Día sin carro / eventos: `Event`.
  - Multa: `MonetaryAmount`.
- **RF-32:** **Sitemap.xml** dinámico (generado al build) que incluya: home, todas las ciudades, calendarios 2025/2026/2027, posts del blog, páginas comparativas.
- **RF-33:** **Robots.txt** con reglas claras (no indexar `/admin`, permitir el resto).
- **RF-34:** **Core Web Vitals optimizados** (métricas Google):
  - LCP (Largest Contentful Paint) < 2.5 s.
  - FID/INP < 200 ms.
  - CLS (Cumulative Layout Shift) < 0.1 (reservar espacio para ads con placeholders de tamaño fijo para evitar CLS de AdSense).
- **RF-35:** **Enlaces internos**: en cada página de ciudad, links a otras ciudades, al calendario del año, a posts del blog relacionados ("ver multa 2026", "rotación próximo semestre").
- **RF-36:** **SEO local**: schema.org `LocalBusiness` por ciudad, enlaces a alcaldías/secretarías, NAP (nombre, dirección, teléfono) si fuera aplicable; optimización para búsquedas "cerca de mí" / "pico y placa en [ciudad]".
- **RF-37:** **Estrategia de contenido fresco y actualizable**: panel admin permite actualizar posts y páginas SEO-friendly cuando cambie la rotación o salga un decreto nuevo, manteniendo el histórico (sin borrar URLs antiguas, mejor añadir update al pie del post y refrescar fecha `dateModified`).

## 3. Requisitos No Funcionales

### 3.1 Rendimiento y Disponibilidad
- **RNF-01:** Tiempo de carga inicial < 2 segundos en conexión 4G.
- **RNF-02:** Disponibilidad del 99.9% soportada por Cloudflare Pages.
- **RNF-03:** Caché en CDN de Cloudflare para contenido estático.

### 3.2 Compatibilidad y UX
- **RNF-04:** Diseño responsive (mobile-first): móvil, tablet, desktop.
- **RNF-05:** Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge, últimas 2 versiones).
- **RNF-06:** PWA: instalable, modo offline básico (mostrar último dato cargado).
- **RNF-07:** Accesibilidad WCAG 2.1 AA (contraste, navegación por teclado, ARIA).

### 3.3 Seguridad
- **RNF-08:** Panel administrativo protegido con autenticación (Cloudflare Access o JWT simple).
- **RNF-09:** Datos de configuración almacenados en KV/D1 de Cloudflare, nunca en cliente.
- **RNF-10:** HTTPS obligatorio (HSTS).

### 3.4 Internacionalización
- **RNF-11:** Idioma por defecto: Español (Colombia).
- **RNF-12:** Zona horaria: America/Bogota (UTC-5).
- **RNF-13:** Formato de fechas y moneda en pesos colombianos.

## 4. Arquitectura Técnica

### 4.1 Stack Tecnológico (100% compatible con Cloudflare Free Tier)
TODOS los servicios listados a continuación están disponibles en el plan gratuito de Cloudflare, con sus cuotas confirmadas.
| Capa | Tecnología | Compatibilidad Free Tier confirmada | Justificación |
|------|-----------|---------------|---------|
| Framework UI | **Astro 4.x + React (islas)** | ✅ Sin coste | Generación estática (SSG) de páginas SEO-friendly por ciudad/mes/año; islands solo donde hay interacción. Build dentro de los 500 min/mes gratuitos de Pages. |
| Lenguaje | **TypeScript** | ✅ Sin coste | Tipado seguro y mantenibilidad. |
| Estilos | **Tailwind CSS** | ✅ Sin coste | Diseño rápido, responsive, optimizado para producción; purge automático. |
| Estado/Cliente | **React + Zod** | ✅ Sin coste | Validación en cliente y edge. |
| CMS/Contenido | **Astro Content Collections** (Markdown/MDX) + D1 para admin editables | ✅ D1 Free: 5 GB / 25 DBs / 5M reads/día | 10 posts + 3 comparativas ocupan < 1 MB; 5M reads/día Free cubren tráfico pico. |
| Backend/Edge | **Cloudflare Pages Functions** | ✅ Workers Free: 100k req/día, 10ms CPU | Endpoints admin + config + ads + leads; 100k/día son ~3M req/mes, más que suficiente para etapa de crecimiento. |
| Persistencia KV | **Cloudflare KV** (2 namespaces: `PICOPLACA_CONFIG`, `PICOPLACA_ADS`) | ✅ KV Free: 1 GB / 100k reads/día / 1k writes/día | Configuraciones pesan < 500 KB; 1k writes/día Free cubren cambios admin. |
| Persistencia SQL | **Cloudflare D1** (2 bases: `PICOPLACA_BLOG`, `PICOPLACA_LEADS`) | ✅ D1 Free 5GB + 5M read rows + 100k write rows/día | Guarda blog posts editables, banners, leads Pro; límites Free muy holgados. |
| Auth Admin | **Cloudflare Access** (Zero Trust Free) | ✅ Zero Trust Free: 50 usuarios, 1 app sin coste | Protege `/admin` con email/pin sin código; reemplaza JWT bcrypt con mejor seguridad y gratis. |
| Monetización Ads | **Google AdSense** (inicio) + slots preparados para **Ezoic / Mediavine** | ✅ 100% Free (AdSense paga al propietario; Ezoic/Mediavine son revenue-share) | IDs slots se almacenan en KV; gestionables desde admin sin redeploy. |
| Anti-spam forms | **Cloudflare Turnstile** | ✅ Free unlimited requests | Captcha invisible para forms de `/pro` y admin login; reemplaza reCAPTCHA; sin límite Free. |
| CMP Cookies | **Banner nativo minimalista** (preferido) o CookieYes gratuito (1 dominio) | ✅ Sin coste | Cumplimiento LSSPD/GDPR y requisito AdSense; la implementación nativa evita dependencias externas pagas. |
| Hosting | **Cloudflare Pages** | ✅ Free: builds 500 min/mes, bandwidth ilimitado, sitios ilimitados | Dominio personalizado incluido gratis; despliegues ilimitados. |
| DNS | **Cloudflare DNS (Free)** | ✅ Free: zonas ilimitadas, DNSSEC, 100+ data centers | Gestión `picoyplaca.co`; 3 Page Rules Free (usamos 2: www→apex, trailing-slash). Cache Rules Free y Transform Rules Free. |
| SSL / HSTS | **Cloudflare Universal SSL (Full/Strict)** | ✅ Free: certificado compartido universal; HSTS sin coste | Full/Strict requiere que el origen (Pages) tenga certificado — Pages lo incluye; sin coste adicional. |
| CDN Cache | **Cloudflare CDN Free** | ✅ Free: bandwidth ilimitado, Auto Minify HTML/CSS/JS, 3 Page Rules, Cache Rules Free básicas, Rocket Loader | Minificación y caché global gratuita; reduce LCP sin coste. |
| Leads email notificación | **NO usar Email Workers (fuera de Free)** | ❌ Email Workers es pago; en su lugar: **leads guardados en D1 y consultados desde `/admin/leads`** (hook webhook opcional a **Resend free tier** 100 emails/día si el usuario integra su API key manualmente) | Evitar cualquier servicio Cloudflare de pago; lector manual de leads Free. |
| Analytics | **Cloudflare Web Analytics (Free)** + **Google Analytics 4 (Free)** | ✅ Ambos Free tier | Cloudflare Analytics privacy-first + GA4 para optimizar AdSense RPM. |
| Webmaster Tools | **Google Search Console** + **Bing Webmaster Tools** | ✅ Free | Seguimiento del SEO orgánico, envío de sitemaps, indexación. |

### 4.2 Estructura de Datos

#### Ciudad (`City`)
```ts
interface City {
  id: string; // "bogota", "medellin", ...
  name: string;
  department: string;
  schemeType: "par-impar" | "digits-per-weekday" | "taxis-only" | "none";
  schedules: {
    [vehicleType: string]: { start: string; end: string }; // "06:00" - "21:00"
  };
  activeDays: number[]; // 1=lunes ... 5=viernes; 6=sábado si aplica
  excludesHolidays: boolean;
  fineAmount: number; // UVB
  officialUrl: string;
}
```

#### Rotación (`Rotation`)
```ts
interface Rotation {
  id: string;
  cityId: string;
  validFrom: string; // ISO date YYYY-MM-DD
  validTo: string | null;
  type: "par-impar" | "digits-per-weekday";
  // Para digits-per-weekday:
  weekdayDigits?: Record<number, number[]>; // 1: [5,8], 2: [1,4], ...
  shiftOffset?: number; // +1 = todo se desplaza un día adelante
  // Para par-impar:
  oddDigits?: number[];
  evenDigits?: number[];
}
```

#### Excepciones / Días especiales (`SpecialDay`)
```ts
interface SpecialDay {
  id: string;
  date: string;
  cityId?: string | null; // null = nacional
  title: string; // "Día sin Carro"
  type: "no-restriction" | "full-ban" | "extended" | "pedagogical";
  description?: string;
}
```

#### Festivos (`Holiday`)
```ts
interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
}
```

#### Configuración Publicitaria (`AdConfig`)
```ts
interface AdSlot {
  id: string; // e.g. "home-hero", "city-sidebar", "blog-inline"
  provider: "adsense" | "ezoic" | "mediavine" | "custom";
  enabled: boolean;
  clientId?: string; // ca-pub-XXXX (AdSense)
  slotId?: string; // AdSense slot ID
  width?: "responsive" | 320 | 728 | 970;
  height?: "auto" | 50 | 90 | 250;
  placeholder?: boolean; // reserva espacio antes de cargar para evitar CLS
  sticky?: boolean;
}
interface BannerSponsor {
  id: string;
  imageUrl: string;
  linkUrl: string;
  altText: string;
  startAt: string;
  endAt: string;
  location: "home-top" | "city-bottom" | "blog-footer";
  utmParams?: string;
}
```

#### Blog Post / Artículo (`BlogPost`)
```ts
interface BlogPost {
  id: string;
  slug: string; // "multa-pico-placa-2026-valor-uvb"
  title: string;
  excerpt: string;
  contentMarkdown: string;
  coverImage?: string;
  author: string;
  datePublished: string;
  dateModified: string;
  tags: string[]; // ["bogota","multas","2026"]
  category: "guias" | "noticias" | "rotaciones" | "comparativas" | "movilidad-sostenible";
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
  faqs?: { question: string; answer: string }[]; // genera FAQPage JSON-LD
  relatedCityIds?: string[]; // enlaces internos automáticos
  published: boolean;
}
```

#### Páginas SEO comparativas (`ComparisonPage`)
```ts
interface ComparisonPage {
  slug: string; // "mejores-seguros-vehiculares-colombia"
  title: string;
  intro: string;
  items: {
    name: string;
    brand: string;
    imageUrl?: string;
    affiliateLink: string;
    price?: string;
    rating?: number; // 1-5
    pros: string[];
    cons: string[];
  }[];
  conclusion: string;
  faqs?: { question: string; answer: string }[];
}
```

#### Lead Plan Pro (`ProLead`)
```ts
interface ProLead {
  id: string;
  company: string;
  email: string;
  phone?: string;
  fleetSize?: number;
  message?: string;
  createdAt: string;
}
```

### 4.3 Flujo de Renderizado del Día
1. El navegador solicita `/` → Cloudflare Pages sirve HTML+CSS estático.
2. JS en cliente calcula fecha actual en zona horaria `America/Bogota`.
3. Carga (desde JSON estático empaquetado o endpoint `/api/config`) las ciudades + rotación vigente.
4. Para cada ciudad:
   - Obtener rotación vigente por fecha.
   - Aplicar `shiftOffset` si existe (rotación de rotación).
   - Si es festivo y `excludesHolidays: true` → sin restricción.
   - Si es `SpecialDay` → aplicar regla.
   - Calcular dígitos restringidos según `schemeType`.
5. Renderizar tarjetas por ciudad con dígitos, horarios, recomendaciones.

### 4.4 Panel Administrativo
- Ruta `/admin` protegida por Cloudflare Access Policy (emails autorizados).
- Formulario CRUD para:
  - Rotaciones por ciudad (vigencia, dígitos por día, shiftOffset).
  - Días especiales.
  - Horarios y multas.
- Endpoints:
  - `GET /api/rotations` → lista
  - `POST /api/rotations` → crear
  - `PUT /api/rotations/:id` → actualizar
  - `DELETE /api/rotations/:id` → borrar
  - Lo mismo para `cities`, `special-days`, `holidays`.

### 4.5 Despliegue con Cloudflare MCP (todo en Free Tier)
- **Herramienta:** `@cloudflare/mcp-server-cloudflare` (instalado vía npx) — funciona con Free Tier.
- **Credenciales requeridas:**
  - `CLOUDFLARE_API_TOKEN` (scoped: Pages:Edit, KV:Edit, D1:Edit, DNS:Edit, Zone:Read; sin permisos Billing).
  - `CLOUDFLARE_ACCOUNT_ID`.
- **Límites Free Tier a respetar en todo momento:**
  - Pages: ≤ 500 minutos de build al mes; ≤ 10,000 preview builds al mes.
  - Functions: ≤ 100,000 requests al día; ≤ 10 ms CPU por invocación (no hacer loops pesados en Functions).
  - KV: 2 namespaces máximo en Free (usamos exactamente 2).
  - D1: ≤ 25 bases; ≤ 5 GB total.
  - Page Rules: máximo 3 (usamos 2: `www → apex 301` y regla opcional de seguridad; la 3ª reservada).
  - Cache Rules Free: hasta 5 reglas básicas; uso para assets.
  - Access (Zero Trust): ≤ 50 usuarios; 1 aplicación sin coste (asignar `/admin*`).
- **Pasos de despliegue:**
  1. Construir el proyecto (`npm run build`). Verificar build time ≤ 3 min para no agotar cuota.
  2. Publicar en Pages: `wrangler pages deploy ./dist --project-name=picoyplaca-co` (plan Free).
  3. Crear/validar bindings KV (2 NS) y D1 (2 DBs) en `wrangler.toml` (no crear más namespaces).
  4. Configurar dominio custom: `picoyplaca.co` (debe estar en la misma cuenta Cloudflare Free) → Pages crea registro DNS automático.
  5. SSL modo **Full** (Free Tier no permite Full/Strict siempre en custom origin? Nota: Cloudflare Pages con Cloudflare origin cert permite Full; si falla, usar modo **Flexible** temporalmente o subir certificado Advanced que es pago. **Default recomendado Free: SSL Full + HSTS + Always Use HTTPS**).
  6. No habilitar: Argo Smart Routing (pago), Spectrum (pago), Zero Trust Gateway (pago), R2 Billing (solo necesitamos KV/D1). No crear Workers separados si cabe todo en Pages Functions.

## 5. Diseño de la Interfaz de Usuario (UI)

### 5.1 Página Principal (`/`)
```
┌─────────────────────────────────────────────┐
│  Header: logo PicoYPlaca.co   selector fecha│
│              [Verificar mi placa]            │
├─────────────────────────────────────────────┤
│  Hero: "Viernes, 11 de septiembre de 2026"  │
│        Festivo: ❌ / ✅                      │
├─────────────────────────────────────────────┤
│  Recomendación destacada del día             │
│  🚌 "Hoy usa el SITP o comparte vehículo"    │
├─────────────────────────────────────────────┤
│  Ciudades (grid responsivo):                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │ BOGOTÁ   │ │ MEDELLÍN │ │ CALI     │     │
│  │ Par/Impar│ │ Dígitos  │ │ Dígitos  │     │
│  │ 🚫 67890 │ │ 🚫 7  9  │ │ 🚫 7  8  │     │
│  │ 6a-9p    │ │ 5a-8p    │ │ 6a-7p    │     │
│  └──────────┘ └──────────┘ └──────────┘     │
│  + 13 ciudades más...                       │
├─────────────────────────────────────────────┤
│  Tips del día (carrusel)                    │
│  💡 Taxista: tu dígito rotará en 2 semanas   │
│  🔋 Eléctricos: sin restricción en tu ciudad │
├─────────────────────────────────────────────┤
│  Footer: fuentes oficiales, admin, privacidad│
└─────────────────────────────────────────────┘
```

### 5.2 Página Ciudad (ej. `/bogota`)
- Detalle completo: esquema, horarios, excepciones, multa.
- Próximas 2 semanas de dígitos (vista calendario).
- Enlace a fuente oficial.

### 5.3 Verificador de Placa (modal o `/verificar`)
- Input: placa o últimos dígitos + selector ciudad + selector fecha.
- Output:
  - ✅ Puede circular (sin restricción)
  - ⚠️ Restricción parcial (fuera de horario ahora, pero luego no)
  - 🚫 Tiene pico y placa: dígito X, horario Y-Z

### 5.4 Panel Admin ( `/admin` )
- Tablas CRUD + editores JSON-friendly.
- Preview: "¿Cómo se verá el 15 de octubre?" antes de guardar.

## 6. Plan de Implementación (Fases)

| Fase | Descripción | Entregables | Tiempo estimado |
|------|-------------|-------------|-----------------|
| F0 | Setup del proyecto: Astro 4 + TS + Tailwind + React islands + wrangler.toml + bindings KV/D1 | Repo inicial, build exitoso, hello world en Pages, archivo .env.example | 1 h |
| F1 | Datos semilla: ciudades, rotación Q3/Q4 2026, festivos 2025-2027, días especiales + posts blog (10+) + páginas comparativas (3+) | `src/data/*.ts`, `src/content/blog/*.md`, `src/content/comparisons/*.md` | 1.5 h |
| F2 | Lógica de cálculo: pure functions `getRestrictionForDate`, `checkPlate`, `applyShift` + tests | `src/lib/pico-placa.ts` + Vitest | 2 h |
| F3 | UI pública core: Home grid ciudades, hero, recomendaciones, selector fecha, `<AdSlot />` con placeholder anti-CLS, `<BannerSponsor />` | Páginas Astro + componentes React islands | 3 h |
| F4 | Verificador de placa + página por ciudad + página calendario ciudad-mes-año + página Plan Pro landing | Rutas SSG `/[ciudad]`, `/calendario-pico-y-placa-[ciudad]-[año]`, `/pro` | 2 h |
| F5 | SEO on-page y contenido: meta dinámico, OG/Twitter, JSON-LD (WebSite, FAQPage, City, BlogPosting, Review), breadcrumbs, enlaces internos, sitemap.xml (build-time), robots.txt, GA4/Cloudflare Analytics snippets | Componente `<SeoHead />` utilitario, plugin sitemap, 404 friendly | 2 h |
| F6 | Blog y páginas comparativas: render MDX, página índice `/blog`, página post, 3 páginas comparativas, schema Review/AggregateRating, links afiliados con noopener/noreferrer/sponsored | Índice, páginas individuales, sistema de tags | 2 h |
| F7 | API Pages Functions + KV/D1 + panel admin (rotaciones, banners, AdSense IDs, blog posts editables, leads Pro) | `functions/api/*`, ruta `/admin` protegida, gestor ads slots | 3.5 h |
| F8 | Monetización setup y legal: script AdSense con consentimiento CMP banner, política de cookies, privacidad, términos; formulario captura leads Pro que guarda en D1; email notificación (opcional vía Email Workers) | Páginas legales `/legal/*`, banner CMP, integración AdSense (IDs placeholders hasta aprobación) | 1.5 h |
| F9 | PWA, accesibilidad, optimización Core Web Vitals, caché Cloudflare rules | manifest, service worker, test Lighthouse ≥ 90, ajustes CLS por anuncios | 1.5 h |
| F10 | Despliegue a Cloudflare Pages + dominio `picoyplaca.co` + DNS + SSL + HSTS + Page Rules/Cache Rules + Search Console verificación (HTML meta tag) | Sitio vivo, dominio oficial, robots + sitemap enviados manualmente a GSC | 1.5 h |
| F11 | QA final + testeo SEO técnico (Schema validator, Rich Results Test, PageSpeed Insights mobile) + cross-browser + fixes | Reporte QA, validación Google Rich Results OK | 1.5 h |

**Total estimado: ~24 horas efectivas (3-4 días de trabajo concentrado)**

## 7. Criterios de Aceptación

### 7.1 Funcionalidad Core
1. ✅ Al abrir `picoyplaca.co` se ve la fecha actual de Colombia y los dígitos restringidos para al menos 6 ciudades.
2. ✅ Al cambiar la fecha al lunes siguiente, los dígitos corresponden a la rotación vigente en cada ciudad.
3. ✅ Al introducir placa "ABC123" en Medellín y fecha lunes, el verificador indica si tiene restricción según el dígito "3" y la rotación.
4. ✅ En festivos (ej. 7 de agosto) se muestra "Sin restricción" en ciudades con `excludesHolidays: true`.
5. ✅ Desde el panel admin se crea una rotación con `shiftOffset: +1` y fecha de inicio 1 de enero; al consultar esa fecha los dígitos del lunes son los que antes eran viernes.

### 7.2 Performance y UX
6. ✅ El sitio carga en móvil < 3 s y puntaje Lighthouse Performance ≥ 90.
7. ✅ CLS < 0.1 (los espacios para anuncios se reservan con placeholders de tamaño fijo).
8. ✅ Diseño responsive validado en 360x640, 768x1024, 1280x800.

### 7.3 Monetización
9. ✅ `<AdSlot id="home-hero">` renderiza correctamente el script de AdSense cuando `clientId` y `slotId` están configurados en admin; si no, muestra placeholder.
10. ✅ Los banners de patrocinio aparecen en las rutas configuradas y llevan `rel="sponsored noopener noreferrer"` + UTM params.
11. ✅ Landing `/pro` muestra formulario de lead B2B; al enviarlo se guarda en D1 y retorna success.
12. ✅ Páginas comparativas `/mejores-seguros-vehiculares-colombia` tienen al menos 3 ítems con links afiliados y schema `AggregateRating`.
13. ✅ Banner de consentimiento de cookies (CMP) aparece en primera visita; los scripts de AdSense/GA4 se cargan condicionalmente **solo después** de que el usuario acepte la categoría correspondiente (si rechaza, no se cargan).

### 7.4 SEO Orgánico
14. ✅ Home, `/bogota`, `/medellin`, `/cali` tienen `<title>`, `<meta description>`, canonical y OG únicos que incluyen palabra clave objetivo + ciudad + mes/año.
15. ✅ `https://picoyplaca.co/sitemap.xml` se sirve y contiene home + mínimo 6 ciudades + 10 posts de blog + 3 páginas comparativas.
16. ✅ `https://picoyplaca.co/robots.txt` permite indexar todo excepto `/admin*`; apunta al sitemap.
17. ✅ La Google Rich Results Test detecta al menos `FAQPage` y `WebSite` en home; `BlogPosting` en posts.
18. ✅ PageSpeed Insights móvil: LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
19. ✅ Google Search Console se puede verificar mediante meta tag o archivo HTML (ya incluido).

### 7.5 Hosting y Dominio
20. ✅ Sitio accesible públicamente en `https://picoyplaca.co` con certificado SSL válido (Universal SSL Free) y HSTS habilitado (SSL modo **Full**, no requiere Strict).
21. ✅ El subdominio `www.picoyplaca.co` redirige 301 al dominio apex (mediante Page Rule, consumiendo solo 1 de 3 disponibles en Free).
22. ✅ Ninguna regla de negocio requiere Workers independientes, R2 buckets, Durable Objects ni servicios pagos de Cloudflare (Argo, Spectrum, Email Workers, Advanced Cert Manager).

### 7.6 Cloudflare Free Tier Compliance (Obligatorio)
23. ✅ KV: exactamente 2 namespaces creados (PICOPLACA_CONFIG, PICOPLACA_ADS) → coincide con el límite Free.
24. ✅ Page Rules utilizadas ≤ 2 de 3 disponibles.
25. ✅ Zero Trust Access: 1 sola aplicación protegida (/admin*), con ≤ 5 emails autorizados (dentro del límite Free de 50 usuarios).
26. ✅ Usage billing: en el momento de entrega, Dashboard Cloudflare muestra plan FREE, 0 suscripciones de pago activas, y build time mensual < 500 min.

## 8. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| MCP Cloudflare no instalado/configurado en el cliente | No se puede desplegar | Documentar setup manual con `wrangler` CLI como plan B |
| Token Cloudflare sin permisos DNS para `picoyplaca.co` | Dominio no apunta | Solicitar al usuario revisar nameservers y que el dominio esté en la misma cuenta de Cloudflare |
| Rotaciones cambian más rápido que lo esperado | Info desactualizada | Diseñar datos de rotación versionados y facilitar panel admin |
| Sistema par/impar Bogotá cambia a dígitos/día | Cálculo erróneo | Mantener `schemeType` configurable; no hardcodear |
| Fecha en cliente incorrecta (zona horaria) | Día mal calculado | Usar `Intl.DateTimeFormat('es-CO', {timeZone: 'America/Bogota'})` + cálculo de dígito del día en servidor/edge como fallback |
| **Cuenta AdSense no aprobada** en el lanzamiento | Sin ingresos ads inmediatos | Lanzar con slots placeholder y banners de patrocinio manuales; tener plan B tráfico mínimo antes de solicitar AdSense (100+ visitas/día). |
| **Core Web Vitals penalizados por anuncios** | Menor ranking SEO | Placeholders tamaño fijo en todos los slots; lazy load de scripts ads después de onload; usar etiqueta `ins` responsive; evitar más de 3 anuncios above-the-fold. |
| **Contenido delgado / thin content** en páginas por ciudad | Google no indexa | Añadir descripción por ciudad de ~200+ palabras, FAQ en cada página ciudad, enlaces internos al blog y calendario anual. |
| **Palabras clave competidas** (dificultad alta) | Tarda en posicionar | Priorizar long-tail primero ("pico y placa medellin octubre 2026", "multa pico y placa 2026 valor"), usar blog para pillar pages. |
| **GDPR/LSSPD incumplimiento** por cookies sin consentimiento | Rechazo AdSense + multas | Implementar CMP nativo/banner minimalista gratuito y bloquear carga de AdSense/GA4 hasta aceptación. |
| **Exceder límites Cloudflare Free** (ej: Functions > 100k req/día o KV writes > 1k/día) | 429 rate limit o errores | Monitorizar desde Cloudflare Dashboard; cachear `/api/config` con Edge TTL 10 min en reglas caché para reducir Functions invocations; writes admin manuales son < 10/día → 1k/día Free es holgado. |
| **SSL Full/Strict no disponible en Free** para custom origin | Redirecciones erróneas | Configurar SSL modo **Full** (no Strict) + Always Use HTTPS + HSTS; Pages ya cuenta con certificado origin válido. |
| **Solo 3 Page Rules Free** y necesitamos más | Algunas reglas no aplican | Usar **Transform Rules** y **Cache Rules** (free tienen límites mayores) en lugar de Page Rules para trailing-slash, cache assets; reservar 2 Page Rules: www→apex, IP geobloqueo opcional (cuota 3 Free). |

## 9. Referencias y Fuentes Oficiales

- Secretaría Distrital de Movilidad Bogotá: https://www.movilidadbogota.gov.co
- Área Metropolitana del Valle de Aburrá / Medellín: https://www.antioquia.gov.co
- Secretaría de Movilidad Cali: https://www.cali.gov.co/movilidad
- Ministerio de Transporte de Colombia: https://www.mintransporte.gov.co
- Cloudflare Pages + Custom Domains: https://developers.cloudflare.com/pages/platform/custom-domains
- Cloudflare MCP Server Oficial: https://github.com/cloudflare/mcp-server-cloudflare
- Guía Pico y Placa Colombia (Colombia Move) - referencia 2026.
