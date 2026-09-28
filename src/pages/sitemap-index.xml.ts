export const prerender = true;

const SITE = 'https://picoyplaca.co';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const today = new Date().toISOString().slice(0, 10);

const ciudadSlugs = [
  'bogota',
  'medellin',
  'cali',
  'barranquilla',
  'bucaramanga',
  'cartagena'
];

const years = [2025, 2026, 2027];
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const baseEntries: SitemapEntry[] = [
  { url: `${SITE}/`, lastmod: today, changefreq: 'daily', priority: 1.0 },
  { url: `${SITE}/ciudades`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
  { url: `${SITE}/blog`, lastmod: today, changefreq: 'weekly', priority: 0.8 },
  { url: `${SITE}/pro`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
  { url: `${SITE}/multa-pico-placa-2026`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { url: `${SITE}/dia-sin-carro-bogota`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
  { url: `${SITE}/mejores-seguros-vehiculares-colombia`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { url: `${SITE}/comparar-soat-2026`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { url: `${SITE}/mejores-renting-carros-colombia`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
  { url: `${SITE}/legal/politica-privacidad`, lastmod: today, changefreq: 'yearly', priority: 0.2 },
  { url: `${SITE}/legal/terminos-y-condiciones`, lastmod: today, changefreq: 'yearly', priority: 0.2 },
  { url: `${SITE}/legal/politica-cookies`, lastmod: today, changefreq: 'yearly', priority: 0.2 }
];

const ciudadEntries: SitemapEntry[] = ciudadSlugs.flatMap(slug => {
  const entries: SitemapEntry[] = [
    { url: `${SITE}/${slug}`, lastmod: today, changefreq: 'daily', priority: 0.9 },
    { url: `${SITE}/pico-y-placa/${slug}/taxis`, lastmod: today, changefreq: 'weekly', priority: 0.7 },
    { url: `${SITE}/pico-y-placa/${slug}/motos`, lastmod: today, changefreq: 'weekly', priority: 0.7 }
  ];
  for (const year of years) {
    entries.push({
      url: `${SITE}/calendario-pico-y-placa-${slug}-${year}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7
    });
    for (const month of months) {
      entries.push({
        url: `${SITE}/pico-y-placa/${slug}/${month}/${year}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.6
      });
    }
  }
  return entries;
});

const postSlugs = [
  'como-saber-cual-es-mi-digito-de-pico-y-placa',
  'exenciones-pico-y-placa-vehiculos-electricos',
  'rotacion-pico-y-placa-segundo-semestre-2026',
  'multa-pico-y-placa-2026-valor-y-recursos',
  'dia-sin-carro-bogota-2026-que-no-circula',
  'pico-y-placa-solidario-bogota-como-funciona',
  'mejores-apps-para-rutas-sin-pico-y-placa',
  'taxis-medellin-restricciones-especiales',
  'festivos-colombia-sin-pico-y-placa',
  'diferencias-pico-y-placa-bogota-medellin-cali'
];

const blogEntries: SitemapEntry[] = postSlugs.map(slug => ({
  url: `${SITE}/blog/${slug}`,
  lastmod: today,
  changefreq: 'monthly',
  priority: 0.6
}));

const all: SitemapEntry[] = [...baseEntries, ...ciudadEntries, ...blogEntries];

const url = (e: SitemapEntry) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>${e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : ''}${e.priority !== undefined ? `\n    <priority>${e.priority.toFixed(1)}</priority>` : ''}
  </url>`;

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(url).join('\n')}
</urlset>`;

export async function GET() {
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  });
}
