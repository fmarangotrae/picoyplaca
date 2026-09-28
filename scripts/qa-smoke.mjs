import https from 'node:https';
import http from 'node:http';

function follow(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const u = new URL(url);
    const mod = u.protocol === 'https:' ? https : http;
    const req = mod.get({
      hostname: u.hostname, port: u.port || (u.protocol === 'https:' ? 443 : 80),
      path: u.pathname + u.search,
      headers: { 'Accept': 'application/json, text/html, */*', 'User-Agent': 'ppc-qa/1.0' }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = new URL(res.headers.location, url).href;
        follow(next, maxRedirects - 1).then(resolve, reject);
        return;
      }
      let c = '';
      res.setEncoding('utf8');
      res.on('data', d => c += d);
      res.on('end', () => {
        try {
          const json = (c[0] === '{' || c[0] === '[') ? JSON.parse(c) : null;
          resolve({ status: res.statusCode, content: c, json, url });
        } catch (e) {
          resolve({ status: res.statusCode, content: c, json: null, url });
        }
      });
    });
    req.on('error', reject);
  });
}

const base = process.argv[2] || 'https://b257107d.picoyplaca-co.pages.dev';
const tests = [
  { name: 'Home HTML',              path: '/',                                       status: 200, html: '<h1' },
  { name: 'Ciudad Bogotá',          path: '/bogota/',                               status: 200, html: 'Bogotá' },
  { name: 'Pico y Placa Bog taxis', path: '/pico-y-placa/bogota/taxis/',            status: 200, html: 'taxi' },
  { name: 'Mes-año 09/2026 Bog',    path: '/pico-y-placa/bogota/09/2026/',          status: 200, html: 'septiembre' },
  { name: 'Calendario anual 2026',  path: '/calendario-pico-y-placa-bogota-2026/',  status: 200, html: '2026' },
  { name: 'Blog listado',           path: '/blog/',                                 status: 200, html: 'Blog' },
  { name: 'Guía multa 2026',        path: '/multa-pico-placa-2026/',                 status: 200, html: 'UVB' },
  { name: 'Comparativa SOAT',       path: '/comparar-soat-2026/',                    status: 200, html: 'SOAT' },
  { name: 'Comparativa renting',    path: '/mejores-renting-carros-colombia/',       status: 200, html: 'renting' },
  { name: 'Landing Pro',            path: '/pro/',                                   status: 200, html: 'Pro' },
  { name: 'Admin dashboard',        path: '/admin/',                                 status: 200, html: 'Panel Administración' },
  { name: 'Legales Privacidad',     path: '/legal/politica-privacidad/',             status: 200, html: 'Política de privacidad' },
  { name: 'Sitemap XML',            path: '/sitemap-index.xml',                      status: 200, html: 'urlset' },
  { name: 'API /api/config.json',   path: '/api/config.json',                        status: 200, json: true },
  { name: '404 page',               path: '/no-existe-ruta-xyz',                     status: 404, html: '404' }
];

// Detectar un slug blog válido
const sitemapContent = await (await follow(base + '/sitemap-index.xml')).content;
const blogMatch = sitemapContent.match(/<loc>[^<]*\/blog\/([a-z0-9-]+)<\/loc>/i);
if (blogMatch) {
  tests.push({ name: 'Blog post slug', path: '/blog/' + blogMatch[1] + '/', status: 200, html: '<h1' });
}

let ok = 0;
for (const t of tests) {
  const r = await follow(base.replace(/\/$/, '') + t.path);
  const sOk = r.status === t.status;
  const hOk = t.html ? (r.content || '').toLowerCase().includes(String(t.html).toLowerCase()) : true;
  const jOk = t.json ? !!r.json : true;
  const pass = sOk && hOk && jOk;
  ok += pass ? 1 : 0;
  const line = (pass ? '\x1b[32m✅ PASS\x1b[0m' : '\x1b[31m❌ FAIL\x1b[0m') + ' ' + t.name.padEnd(28, ' ') + ' ' + String(r.status).padStart(3) +
    ' html=' + (hOk ? 'OK  ' : 'MISS') + ' json=' + (t.json ? (jOk ? 'OK  ' : 'MISS') : '----');
  console.log(line);
  if (!pass) {
    console.log('     · url resolvida:', r.url);
    if (!sOk) console.log('     · expected status', t.status);
    if (!hOk) console.log('     · expected html contains:', t.html, 'got snippet:', (r.content || '').slice(0, 200).replace(/\s+/g, ' '));
    if (t.json && !jOk) console.log('     · expected json body, got:', (r.content || '').slice(0, 200));
  }
}
console.log('\nResultado: ' + ok + '/' + tests.length + ' pruebas de humo HTTPS production OK.');
process.exit(ok === tests.length ? 0 : 1);
