globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CABi7P6S.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_B6XzWbUy.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BKg8zs2I.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "seo": {
    title: "Panel Admin \xB7 Pico y Placa Colombia",
    description: "Panel de administraci\xF3n picoyplaca.co: banners, anuncios, configuraci\xF3n y leads. Protegido por Cloudflare Access Zero Trust.",
    noindex: true,
    nofollow: true
  }, "pageTitle": "\u2699\uFE0F Panel Administraci\xF3n" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", `<div class="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm"> <p class="font-bold mb-1">\u{1F6E1}\uFE0F Requiere Cloudflare Access Zero Trust</p> <p>Esta ruta <code>/admin/*</code> y sus APIs asociadas <code>/api/admin/*</code> deben protegerse mediante Cloudflare Access con pol\xEDtica de emails permitidos \u2264 5 correos. Sin protecci\xF3n Zero Trust estos endpoints son p\xFAblicamente accesibles. <a href="https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps/" target="_blank" rel="noopener noreferrer" class="underline">Ver documentaci\xF3n Zero Trust \u2192</a></p> </div> <div class="grid gap-4 mb-8 grid-cols-2 md:grid-cols-4"> <div class="card p-5"> <p class="text-xs uppercase tracking-wide text-slate-500">Ciudades configuradas</p> <p id="statCities" class="mt-2 text-3xl font-black text-brand-700">-</p> </div> <div class="card p-5"> <p class="text-xs uppercase tracking-wide text-slate-500">Banners activos</p> <p id="statBanners" class="mt-2 text-3xl font-black text-brand-700">-</p> </div> <div class="card p-5"> <p class="text-xs uppercase tracking-wide text-slate-500">Leads Pro recibidos</p> <p id="statLeads" class="mt-2 text-3xl font-black text-brand-700">-</p> </div> <div class="card p-5"> <p class="text-xs uppercase tracking-wide text-slate-500">Slots AdSense</p> <p id="statSlots" class="mt-2 text-3xl font-black text-brand-700">-</p> </div> </div> <div class="flex flex-wrap gap-2 border-b border-slate-200 mb-6"> <button data-tab="config" class="tab-btn active btn-secondary !py-2 !text-sm">\u{1F527} Configuraci\xF3n</button> <button data-tab="banners" class="tab-btn btn-secondary !py-2 !text-sm">\u{1F5BC}\uFE0F Banners & Slots</button> <button data-tab="leads" class="tab-btn btn-secondary !py-2 !text-sm">\u{1F4E9} Leads Pro</button> <button data-tab="dns" class="tab-btn btn-secondary !py-2 !text-sm">\u{1F310} DNS \xB7 Dominio \xB7 SSL</button> <button data-tab="docs" class="tab-btn btn-secondary !py-2 !text-sm">\u{1F6E1}\uFE0F Zero Trust Setup</button> </div>  <section data-tabpanel="config" class="tab-panel"> <div class="card p-6"> <h2 class="text-xl font-extrabold mb-2">Configuraci\xF3n global KV (PICOPLACA_CONFIG)</h2> <p class="text-sm text-slate-600 mb-5">Edita JSON bruto del objeto almacenado en KV Cloudflare. Modificar <code>ads.clientId</code> (AdSense), <code>analytics.ga4MeasurementId</code>, y <code>global.shiftOffsetByCity</code> para ajustar rotaciones.</p> <div class="grid gap-3 md:grid-cols-[1fr,auto] items-center mb-3"> <div> <button id="cfgLoad" class="btn-primary !text-sm">\u{1F504} Recargar desde KV</button> <button id="cfgSave" class="btn-secondary !text-sm ml-2">\u{1F4BE} Guardar cambios en KV</button> <span id="cfgMsg" class="ml-3 text-sm"></span> </div> </div> <textarea id="cfgJson" rows="28" class="input font-mono text-xs leading-5" spellcheck="false"></textarea> </div> </section>  <section data-tabpanel="banners" class="tab-panel hidden"> <div class="grid gap-5 md:grid-cols-2"> <div class="card p-6"> <h2 class="text-xl font-extrabold mb-3">\u{1F195} Nuevo banner patrocinio</h2> <div class="grid gap-3"> <label class="label" for="bnTitle">T\xEDtulo (hasta 60 car.)</label> <input id="bnTitle" class="input" maxlength="60" placeholder="Ej. Seguro Vehicular 10% OFF"> <label class="label" for="bnDesc">Descripci\xF3n corta</label> <textarea id="bnDesc" class="input" rows="2" maxlength="160" placeholder="Ej. Compara SOAT y ahorra. Enlace afiliado."></textarea> <label class="label" for="bnUrl">URL destino (incluye UTMs)</label> <input id="bnUrl" class="input" placeholder="https://aseguradora.com/?utm_source=picoyplaca&utm_medium=banner"> <label class="label" for="bnCta">Texto CTA</label> <input id="bnCta" class="input" maxlength="30" placeholder="Ver oferta \u2192"> <label class="label" for="bnSponsor">Patrocinador</label> <input id="bnSponsor" class="input" maxlength="40" placeholder="Ej. Seguros Sura"> <div class="flex items-center gap-2 text-sm mt-2"> <input id="bnActive" type="checkbox" class="h-4 w-4 accent-brand-600" checked> <label for="bnActive">Activo</label> </div> <button id="bnAdd" class="btn-primary !text-sm mt-2">\u2795 A\xF1adir banner y guardar</button> <span id="bnMsg" class="text-sm"></span> </div> </div> <div class="card p-6"> <h2 class="text-xl font-extrabold mb-3">\u{1F3AF} Slots AdSense (PICOPLACA_ADS)</h2> <p class="text-sm text-slate-600 mb-4">Edita JSON de slots y banners actuales. Modifica los IDs de slots AdSense (data-ad-slot) cuando est\xE9n aprobados.</p> <div class="flex gap-2 mb-3"> <button id="adsLoad" class="btn-primary !text-sm">\u{1F504} Recargar</button> <button id="adsSave" class="btn-secondary !text-sm">\u{1F4BE} Guardar</button> <span id="adsMsg" class="text-sm self-center"></span> </div> <textarea id="adsJson" rows="22" class="input font-mono text-xs leading-5" spellcheck="false"></textarea> </div> </div> <div class="card p-6 mt-5"> <h3 class="text-lg font-bold mb-3">\u{1F4CB} Lista de banners activos</h3> <div id="bnList" class="grid gap-3 md:grid-cols-2"></div> </div> </section>  <section data-tabpanel="leads" class="tab-panel hidden"> <div class="card p-6"> <div class="flex flex-wrap gap-2 justify-between items-center mb-4"> <h2 class="text-xl font-extrabold">\u{1F4E9} Leads Plan Pro (D1 PICOPLACA_LEADS)</h2> <div class="flex gap-2 items-center"> <button id="ldReload" class="btn-primary !text-sm">\u{1F504} Refrescar</button> <span id="ldMeta" class="text-xs text-slate-500"></span> </div> </div> <div class="overflow-x-auto"> <table class="min-w-full text-sm"> <thead class="bg-slate-50 text-slate-600"> <tr> <th class="p-3 text-left font-semibold">Fecha</th> <th class="p-3 text-left font-semibold">Empresa</th> <th class="p-3 text-left font-semibold">Nombre</th> <th class="p-3 text-left font-semibold">Email / Tel</th> <th class="p-3 text-left font-semibold">Plan</th> <th class="p-3 text-left font-semibold">Ciudades</th> <th class="p-3 text-left font-semibold">IP</th> <th class="p-3"></th> </tr> </thead> <tbody id="ldTbody" class="divide-y divide-slate-100"></tbody> </table> </div> </div> </section>  <section data-tabpanel="dns" class="tab-panel hidden"> <div class="space-y-6"> <div class="card p-6"> <div class="flex flex-wrap items-start justify-between gap-4 mb-4"> <div> <h2 class="text-xl font-extrabold">\u{1F310} Por qu\xE9 NO ves la web en picoyplaca.co / www.picoyplaca.co</h2> <p class="mt-2 text-sm text-slate-600">Diagn\xF3stico: Nameservers correctos (Cloudflare), pero <strong class="text-amber-700">faltan los registros DNS CNAME (Apex flattening + www) que apunten a Cloudflare Pages</strong> y el API Token actual <strong>NO tiene Zone.DNS:Edit</strong> para crearlos autom\xE1ticamente. Pages custom domains aparecen status=<code>pending</code>; cuando existan los DNS pasan a <code>active</code> y se emite el certificado SSL.</p> </div> <div class="shrink-0 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 w-full md:w-72"> <p class="font-bold mb-1">\u{1F4CB} Estado actual detectado</p> <ul class="list-disc pl-4 space-y-1"> <li>NS Cloudflare: \u2705 stella + vern</li> <li>DNS Records: \u274C 0 registros A/CNAME</li> <li>Pages Apex domain: \u23F3 pending</li> <li>Pages WWW domain: \u23F3 pending</li> <li>Token scopes DNS: \u274C sin Zone.DNS:Read/Write</li> </ul> </div> </div> <h3 class="font-bold text-lg mt-4 mb-3">\u{1F6E0}\uFE0F Opci\xF3n A (RECOMENDADA) \xB7 Script autom\xE1tico</h3> <ol class="list-decimal pl-5 space-y-2 text-sm"> <li>Crea un <strong>nuevo API Token</strong> aqu\xED \u2199 con ESTOS 6 scopes exactos y <strong>Zone Resources = Include \xB7 Specific zone = picoyplaca.co</strong>:
<div class="mt-2 rounded-lg bg-slate-900 text-slate-50 p-3 text-xs font-mono overflow-x-auto">
Zone.Zone:Read<br>
Zone.DNS:Edit<br>
Zone.Settings:Edit<br>
Zone.Page Rules:Edit<br>
Account.Cloudflare Pages:Edit<br>
Account.Account Settings:Read
</div> </li> <li>
Ejecuta en tu terminal (sustituye TU_NUEVO_TOKEN):
<pre class="mt-2 rounded-lg bg-slate-900 text-slate-50 p-3 text-xs font-mono whitespace-pre-wrap">export CLOUDFLARE_API_TOKEN="TU_NUEVO_TOKEN_AQUI"
chmod +x scripts/apply-dns-and-zone-settings.sh
bash scripts/apply-dns-and-zone-settings.sh</pre> </li> <li>Espera 2-10 minutos. Comprueba:
<pre class="mt-2 rounded-lg bg-slate-900 text-slate-50 p-3 text-xs font-mono whitespace-pre-wrap">dig +short @1.1.1.1 picoyplaca.co
dig +short @1.1.1.1 www.picoyplaca.co
curl -I https://www.picoyplaca.co/
node scripts/qa-smoke.mjs https://www.picoyplaca.co</pre> </li> </ol> <h3 class="font-bold text-lg mt-6 mb-3">\u{1F4DD} Opci\xF3n B \xB7 Manual Cloudflare Dashboard (sin script)</h3> <ol class="list-decimal pl-5 space-y-2 text-sm"> <li>Entra \u2192 Dash Cloudflare \u2192 <strong>picoyplaca.co</strong> \u2192 <strong>DNS \u2192 Records</strong> \u2192 <strong>Add record</strong></li> <li>Crea <strong>CNAME \xB7 Name @ (picoyplaca.co)</strong> \u2192 Target <code>picoyplaca-co.pages.dev</code> \xB7 Proxy status: <strong>Proxied (amarillo)</strong> \xB7 TTL Auto \u2192 <strong>Save</strong></li> <li>Crea <strong>CNAME \xB7 Name www</strong> \u2192 Target <code>picoyplaca-co.pages.dev</code> \xB7 Proxy status: <strong>Proxied</strong> \xB7 TTL Auto \u2192 <strong>Save</strong></li> <li>SSL/TLS \u2192 Edge Certificates:
<ul class="list-disc pl-5 mt-1 space-y-0.5"> <li>SSL/TLS encryption mode \u2192 <strong>Full</strong> (NO Strict en Free)</li> <li>Always Use HTTPS \u2192 <strong>On</strong></li> <li>Automatic HTTPS Rewrites \u2192 <strong>On</strong></li> <li>HSTS \u2192 Enable \xB7 Max-Age=31536000 \xB7 Include Subdomains=On \xB7 Preload=Off</li> </ul> </li> <li>Speed \u2192 Optimization:
<ul class="list-disc pl-5 mt-1 space-y-0.5"> <li>Auto Minify \u2192 <strong>JS \u2713 CSS \u2713 HTML \u2713</strong></li> <li>Polish \u2192 <strong>Lossless</strong> (Free)</li> <li>Brotli \u2192 <strong>On</strong> \xB7 HTTP/3 \u2192 <strong>On</strong> \xB7 Rocket Loader \u2192 <strong>Off</strong></li> </ul> </li> <li>Caching \u2192 Configuration: Cache Level <strong>Standard</strong>, Browser TTL <strong>4 horas</strong>, Development Mode <strong>Off</strong></li> <li>Rules \u2192 Page Rules \u2192 confirmar 1/3 activa: <code>www.picoyplaca.co/*</code> \u2192 301 \u2192 <code>https://picoyplaca.co/$1</code></li> <li>Pages \u2192 <strong>picoyplaca-co</strong> \u2192 <strong>Custom domains</strong>. Ambos (apex + www.) deben pasar de <span class="text-amber-600 font-semibold">Pending</span> a <span class="text-emerald-700 font-bold">Active \xB7 SSL valid</span> en 2-10 min.</li> </ol> </div> <div class="card p-6"> <h3 class="font-bold text-lg mb-3">\u2705 Pasos de verificaci\xF3n que YO har\xE9 cuando apliques el fix</h3> <ol class="list-decimal pl-5 space-y-2 text-sm text-slate-700"> <li>Abrir\xE9 el navegador integrado con <code>https://www.picoyplaca.co/</code> y tomar\xE9 snapshot.</li> <li>Verificar\xE9 que <code>www.</code> redirige 301 \u2192 <code>https://picoyplaca.co/</code> con Page Rule.</li> <li>Ejecutar\xE9 <code>node scripts/qa-smoke.mjs https://www.picoyplaca.co</code> \u2192 <strong>16/16 PASS</strong>.</li> <li>Confirmar\xE9 HSTS header, canonical SEO, y JSON-LD schemas en rich results.</li> <li>Si TODO OK: redeploy OPCIONAL en Pages (ya estaba al d\xEDa; DNS solo apunta).</li> </ol> </div> </div> </section>  <section data-tabpanel="docs" class="tab-panel hidden"> <div class="card p-6"> <h2 class="text-xl font-extrabold mb-3">\u{1F6E1}\uFE0F C\xF3mo proteger /admin con Cloudflare Access Zero Trust (GRATIS hasta 5 usuarios)</h2> <ol class="list-decimal pl-5 space-y-3 text-slate-700 text-sm leading-relaxed"> <li>Entra al dashboard Cloudflare \u2192 <strong>Zero Trust</strong> \u2192 <strong>Access</strong> \u2192 <strong>Applications</strong> \u2192 <strong>Add an application</strong> \u2192 <strong>Self-hosted</strong>.</li> <li><strong>Application name:</strong> <code>PicoyPlaca Admin</code>. <strong>Session duration:</strong> 1 d\xEDa. <strong>Subdomain:</strong> (deja vac\xEDo para apex) <strong>Domain:</strong> <code>picoyplaca.co</code>.</li> <li><strong>Application URLs</strong> \u2014 a\xF1ade DOS rutas (ambas protegidas):
<ul class="list-disc pl-5 mt-1 space-y-1"> <li><code>https://picoyplaca.co/admin</code> y <code>https://picoyplaca.co/admin/*</code></li> <li><code>https://picoyplaca.co/api/admin</code> y <code>https://picoyplaca.co/api/admin/*</code></li> </ul> </li> <li>Salta logo/color. Next: <strong>Add policies</strong>. Crea policy: <code>Admins autorizados</code>, Action <strong>Allow</strong>. Include rules \u2192 a\xF1ade emisor <strong>Emails</strong> e introduce hasta <strong>5 correos autorizados</strong> (l\xEDmite Free Tier).</li> <li>Finaliza creaci\xF3n. Prueba acceso an\xF3nimo: debe aparecer login Cloudflare Access \u2192 error 403 si email no autorizado.</li> <li>Opcional SSO: a\xF1ade integraci\xF3n <strong>Google Workspace</strong> o <strong>Azure AD</strong> si tu empresa la usa.</li> </ol> <p class="mt-5 p-3 bg-slate-50 rounded text-sm">\u26A0\uFE0F <strong>Compliance Free Tier</strong>: No crees m\xE1s de <strong>1 aplicaci\xF3n Access</strong> ni invites m\xE1s de 5 correos \xFAnicos; para mayores usuarios Zero Trust requiere pago.</p> </div> </section> <script>
    (function () {
      // ============== TABS ==============
      document.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-tab');
          document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active', 'btn-primary'); b.classList.add('btn-secondary'); });
          btn.classList.add('active', 'btn-primary'); btn.classList.remove('btn-secondary');
          document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.toggle('hidden', p.getAttribute('data-tabpanel') !== target); });
        });
      });
      // ============== CONFIG KV ==============
      var jsonFmt = function (o) { return JSON.stringify(o, null, 2); };
      var cfgJson = document.getElementById('cfgJson');
      var cfgMsg = document.getElementById('cfgMsg');
      document.getElementById('cfgLoad').addEventListener('click', function () {
        fetch('/api/admin/config').then(function (r) { return r.json(); }).then(function (j) {
          cfgJson.value = j.ok ? jsonFmt(j.data) : '// ERROR: ' + (j.error || 'Desconocido');
          cfgMsg.innerHTML = j.ok ? '<span class="text-success-700">\u2713 Recargado</span>' : '<span class="text-danger-700">\u2717 '+(j.error||'')+'</span>';
          if (j.ok) {
            var stC = Object.keys(j.data?.global?.shiftOffsetByCity || {}).length;
            document.getElementById('statCities').textContent = String(stC || 6);
          }
        });
      });
      document.getElementById('cfgSave').addEventListener('click', function () {
        try {
          var parsed = JSON.parse(cfgJson.value);
          fetch('/api/admin/config', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) })
            .then(function (r) { return r.json(); })
            .then(function (j) {
              cfgMsg.innerHTML = j.ok ? '<span class="text-success-700">\u2713 Guardado '+(j.data?.lastUpdatedAt||'')+'</span>' : '<span class="text-danger-700">\u2717 '+(j.error||'')+'</span>';
            });
        } catch (e) { cfgMsg.innerHTML = '<span class="text-danger-700">\u2717 JSON inv\xE1lido</span>'; }
      });
      // ============== ADS / BANNERS ==============
      var adsJson = document.getElementById('adsJson');
      var adsMsg = document.getElementById('adsMsg');
      var bnMsg = document.getElementById('bnMsg');
      var bnList = document.getElementById('bnList');
      function renderBannerList(data) {
        bnList.innerHTML = '';
        (data.banners || []).forEach(function (b) {
          var el = document.createElement('div');
          el.className = 'card p-4 flex items-start gap-3';
          el.innerHTML = '<div class="flex-1"><div class="font-bold text-slate-900">'+(b.title||'Sin t\xEDtulo')+' '+(b.active ? '<span class="text-xs text-success-700">\u25CF Activo</span>' : '<span class="text-xs text-slate-400">\u25CB Inactivo</span>')+'</div>' +
            '<div class="text-xs text-slate-600 mt-1">'+(b.description||'')+'</div>' +
            '<div class="text-xs text-slate-500 mt-2">CTA: <code>'+(b.ctaText||'')+'</code> \xB7 Sponsor: <strong>'+(b.sponsor||'')+'</strong></div>' +
            '<a href="'+(b.url||'#')+'" target="_blank" rel="noopener sponsored" class="text-xs underline text-brand-700 break-all mt-1 inline-block">'+(b.url||'')+'</a></div>' +
            '<button class="btn-secondary !text-xs !py-1 del-bn" data-id="'+(b.id||'')+'">Eliminar</button>';
          el.querySelector('.del-bn').addEventListener('click', function () {
            fetch('/api/admin/banners', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bannerId: b.id }) }).then(function(r){return r.json();}).then(function(j){ if(j.ok) loadAds(); });
          });
          bnList.appendChild(el);
        });
        document.getElementById('statBanners').textContent = String((data.banners||[]).filter(function(b){ return b.active; }).length || 0);
        document.getElementById('statSlots').textContent = String(Object.keys(data.slots||{}).length || 0);
      }
      function loadAds() {
        fetch('/api/admin/banners').then(function (r) { return r.json(); }).then(function (j) {
          if (!j.ok) { adsMsg.innerHTML = '<span class="text-danger-700">\u2717 '+(j.error||'')+'</span>'; return; }
          adsJson.value = jsonFmt(j.data);
          renderBannerList(j.data);
        });
      }
      document.getElementById('adsLoad').addEventListener('click', function () {
        adsMsg.innerHTML = '<span class="text-slate-500">Cargando\u2026</span>';
        loadAds(); adsMsg.innerHTML = '<span class="text-success-700">\u2713 Recargado</span>';
      });
      document.getElementById('adsSave').addEventListener('click', function () {
        try {
          var parsed = JSON.parse(adsJson.value);
          fetch('/api/admin/banners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) })
            .then(function(r){return r.json();}).then(function(j){
              adsMsg.innerHTML = j.ok ? '<span class="text-success-700">\u2713 Guardado</span>' : '<span class="text-danger-700">\u2717 '+(j.error||'')+'</span>';
              if (j.ok) renderBannerList(j.data);
            });
        } catch (e) { adsMsg.innerHTML = '<span class="text-danger-700">\u2717 JSON inv\xE1lido</span>'; }
      });
      document.getElementById('bnAdd').addEventListener('click', function () {
        var title = document.getElementById('bnTitle').value.trim();
        var desc  = document.getElementById('bnDesc').value.trim();
        var url   = document.getElementById('bnUrl').value.trim();
        var cta   = document.getElementById('bnCta').value.trim();
        var sp    = document.getElementById('bnSponsor').value.trim();
        var actv  = document.getElementById('bnActive').checked;
        if (!title || !url) { bnMsg.innerHTML = '<span class="text-danger-700">\u2717 T\xEDtulo y URL obligatorios</span>'; return; }
        fetch('/api/admin/banners', { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ banner: { title: title, description: desc, url: url, ctaText: cta, sponsor: sp, active: actv, utmSource: 'picoyplaca', utmMedium: 'banner' } }) })
        .then(function(r){return r.json();}).then(function(j){
          bnMsg.innerHTML = j.ok ? '<span class="text-success-700">\u2713 Banner a\xF1adido '+(j.data.banners?.slice(-1)[0]?.id||'')+'</span>' : '<span class="text-danger-700">\u2717 '+(j.error||'')+'</span>';
          if (j.ok) { document.getElementById('bnTitle').value='';document.getElementById('bnDesc').value='';document.getElementById('bnUrl').value='';document.getElementById('bnCta').value='';document.getElementById('bnSponsor').value=''; loadAds(); }
        });
      });
      // ============== LEADS ==============
      var ldTbody = document.getElementById('ldTbody');
      var ldMeta = document.getElementById('ldMeta');
      function esc(s) { return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\\'':'&#39;'}[c]; }); }
      function loadLeads() {
        fetch('/api/admin/leads?limit=100').then(function(r){return r.json();}).then(function(j){
          if (!j.ok) { ldMeta.textContent = 'Error: '+(j.error||''); return; }
          ldMeta.textContent = 'Mostrando '+(j.data?.length||0)+' de '+j.meta.total+' leads';
          document.getElementById('statLeads').textContent = String(j.meta.total||0);
          ldTbody.innerHTML = '';
          (j.data||[]).forEach(function (row) {
            var tr = document.createElement('tr');
            tr.innerHTML = '<td class="p-3 align-top whitespace-nowrap text-xs text-slate-500">'+esc((row.created_at||'').slice(0,16))+'</td>' +
              '<td class="p-3 align-top font-semibold">'+esc(row.company||'-')+'</td>' +
              '<td class="p-3 align-top">'+esc(row.name||'-')+'</td>' +
              '<td class="p-3 align-top text-xs"><div>'+esc(row.email||'-')+'</div><div class="text-slate-500 mt-1">'+esc(row.phone||'')+'</div></td>' +
              '<td class="p-3 align-top"><span class="badge bg-brand-50 text-brand-800 !text-xs">'+esc(row.plan||'-')+'</span></td>' +
              '<td class="p-3 align-top text-xs text-slate-700 max-w-[200px]">'+esc(row.cities||'-')+'</td>' +
              '<td class="p-3 align-top text-xs text-slate-400">'+esc(row.ip_short||'-')+'</td>' +
              '<td class="p-3 align-top whitespace-nowrap"><button class="ld-del btn-secondary !text-xs !py-1" data-id="'+esc(row.id)+'">\u{1F5D1}\uFE0F</button></td>';
            tr.querySelector('.ld-del').addEventListener('click', function () {
              if (!confirm('\xBFEliminar este lead? No se puede deshacer.')) return;
              fetch('/api/admin/leads', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: row.id }) })
                .then(function(r){return r.json();}).then(function(j){ if(j.ok) loadLeads(); });
            });
            ldTbody.appendChild(tr);
          });
        });
      }
      document.getElementById('ldReload').addEventListener('click', loadLeads);
      // ============== AUTOLOAD ==============
      document.getElementById('cfgLoad').click();
      loadAds(); loadLeads();
    })();
  <\/script> `], [" ", `<div class="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm"> <p class="font-bold mb-1">\u{1F6E1}\uFE0F Requiere Cloudflare Access Zero Trust</p> <p>Esta ruta <code>/admin/*</code> y sus APIs asociadas <code>/api/admin/*</code> deben protegerse mediante Cloudflare Access con pol\xEDtica de emails permitidos \u2264 5 correos. Sin protecci\xF3n Zero Trust estos endpoints son p\xFAblicamente accesibles. <a href="https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps/" target="_blank" rel="noopener noreferrer" class="underline">Ver documentaci\xF3n Zero Trust \u2192</a></p> </div> <div class="grid gap-4 mb-8 grid-cols-2 md:grid-cols-4"> <div class="card p-5"> <p class="text-xs uppercase tracking-wide text-slate-500">Ciudades configuradas</p> <p id="statCities" class="mt-2 text-3xl font-black text-brand-700">-</p> </div> <div class="card p-5"> <p class="text-xs uppercase tracking-wide text-slate-500">Banners activos</p> <p id="statBanners" class="mt-2 text-3xl font-black text-brand-700">-</p> </div> <div class="card p-5"> <p class="text-xs uppercase tracking-wide text-slate-500">Leads Pro recibidos</p> <p id="statLeads" class="mt-2 text-3xl font-black text-brand-700">-</p> </div> <div class="card p-5"> <p class="text-xs uppercase tracking-wide text-slate-500">Slots AdSense</p> <p id="statSlots" class="mt-2 text-3xl font-black text-brand-700">-</p> </div> </div> <div class="flex flex-wrap gap-2 border-b border-slate-200 mb-6"> <button data-tab="config" class="tab-btn active btn-secondary !py-2 !text-sm">\u{1F527} Configuraci\xF3n</button> <button data-tab="banners" class="tab-btn btn-secondary !py-2 !text-sm">\u{1F5BC}\uFE0F Banners & Slots</button> <button data-tab="leads" class="tab-btn btn-secondary !py-2 !text-sm">\u{1F4E9} Leads Pro</button> <button data-tab="dns" class="tab-btn btn-secondary !py-2 !text-sm">\u{1F310} DNS \xB7 Dominio \xB7 SSL</button> <button data-tab="docs" class="tab-btn btn-secondary !py-2 !text-sm">\u{1F6E1}\uFE0F Zero Trust Setup</button> </div>  <section data-tabpanel="config" class="tab-panel"> <div class="card p-6"> <h2 class="text-xl font-extrabold mb-2">Configuraci\xF3n global KV (PICOPLACA_CONFIG)</h2> <p class="text-sm text-slate-600 mb-5">Edita JSON bruto del objeto almacenado en KV Cloudflare. Modificar <code>ads.clientId</code> (AdSense), <code>analytics.ga4MeasurementId</code>, y <code>global.shiftOffsetByCity</code> para ajustar rotaciones.</p> <div class="grid gap-3 md:grid-cols-[1fr,auto] items-center mb-3"> <div> <button id="cfgLoad" class="btn-primary !text-sm">\u{1F504} Recargar desde KV</button> <button id="cfgSave" class="btn-secondary !text-sm ml-2">\u{1F4BE} Guardar cambios en KV</button> <span id="cfgMsg" class="ml-3 text-sm"></span> </div> </div> <textarea id="cfgJson" rows="28" class="input font-mono text-xs leading-5" spellcheck="false"></textarea> </div> </section>  <section data-tabpanel="banners" class="tab-panel hidden"> <div class="grid gap-5 md:grid-cols-2"> <div class="card p-6"> <h2 class="text-xl font-extrabold mb-3">\u{1F195} Nuevo banner patrocinio</h2> <div class="grid gap-3"> <label class="label" for="bnTitle">T\xEDtulo (hasta 60 car.)</label> <input id="bnTitle" class="input" maxlength="60" placeholder="Ej. Seguro Vehicular 10% OFF"> <label class="label" for="bnDesc">Descripci\xF3n corta</label> <textarea id="bnDesc" class="input" rows="2" maxlength="160" placeholder="Ej. Compara SOAT y ahorra. Enlace afiliado."></textarea> <label class="label" for="bnUrl">URL destino (incluye UTMs)</label> <input id="bnUrl" class="input" placeholder="https://aseguradora.com/?utm_source=picoyplaca&utm_medium=banner"> <label class="label" for="bnCta">Texto CTA</label> <input id="bnCta" class="input" maxlength="30" placeholder="Ver oferta \u2192"> <label class="label" for="bnSponsor">Patrocinador</label> <input id="bnSponsor" class="input" maxlength="40" placeholder="Ej. Seguros Sura"> <div class="flex items-center gap-2 text-sm mt-2"> <input id="bnActive" type="checkbox" class="h-4 w-4 accent-brand-600" checked> <label for="bnActive">Activo</label> </div> <button id="bnAdd" class="btn-primary !text-sm mt-2">\u2795 A\xF1adir banner y guardar</button> <span id="bnMsg" class="text-sm"></span> </div> </div> <div class="card p-6"> <h2 class="text-xl font-extrabold mb-3">\u{1F3AF} Slots AdSense (PICOPLACA_ADS)</h2> <p class="text-sm text-slate-600 mb-4">Edita JSON de slots y banners actuales. Modifica los IDs de slots AdSense (data-ad-slot) cuando est\xE9n aprobados.</p> <div class="flex gap-2 mb-3"> <button id="adsLoad" class="btn-primary !text-sm">\u{1F504} Recargar</button> <button id="adsSave" class="btn-secondary !text-sm">\u{1F4BE} Guardar</button> <span id="adsMsg" class="text-sm self-center"></span> </div> <textarea id="adsJson" rows="22" class="input font-mono text-xs leading-5" spellcheck="false"></textarea> </div> </div> <div class="card p-6 mt-5"> <h3 class="text-lg font-bold mb-3">\u{1F4CB} Lista de banners activos</h3> <div id="bnList" class="grid gap-3 md:grid-cols-2"></div> </div> </section>  <section data-tabpanel="leads" class="tab-panel hidden"> <div class="card p-6"> <div class="flex flex-wrap gap-2 justify-between items-center mb-4"> <h2 class="text-xl font-extrabold">\u{1F4E9} Leads Plan Pro (D1 PICOPLACA_LEADS)</h2> <div class="flex gap-2 items-center"> <button id="ldReload" class="btn-primary !text-sm">\u{1F504} Refrescar</button> <span id="ldMeta" class="text-xs text-slate-500"></span> </div> </div> <div class="overflow-x-auto"> <table class="min-w-full text-sm"> <thead class="bg-slate-50 text-slate-600"> <tr> <th class="p-3 text-left font-semibold">Fecha</th> <th class="p-3 text-left font-semibold">Empresa</th> <th class="p-3 text-left font-semibold">Nombre</th> <th class="p-3 text-left font-semibold">Email / Tel</th> <th class="p-3 text-left font-semibold">Plan</th> <th class="p-3 text-left font-semibold">Ciudades</th> <th class="p-3 text-left font-semibold">IP</th> <th class="p-3"></th> </tr> </thead> <tbody id="ldTbody" class="divide-y divide-slate-100"></tbody> </table> </div> </div> </section>  <section data-tabpanel="dns" class="tab-panel hidden"> <div class="space-y-6"> <div class="card p-6"> <div class="flex flex-wrap items-start justify-between gap-4 mb-4"> <div> <h2 class="text-xl font-extrabold">\u{1F310} Por qu\xE9 NO ves la web en picoyplaca.co / www.picoyplaca.co</h2> <p class="mt-2 text-sm text-slate-600">Diagn\xF3stico: Nameservers correctos (Cloudflare), pero <strong class="text-amber-700">faltan los registros DNS CNAME (Apex flattening + www) que apunten a Cloudflare Pages</strong> y el API Token actual <strong>NO tiene Zone.DNS:Edit</strong> para crearlos autom\xE1ticamente. Pages custom domains aparecen status=<code>pending</code>; cuando existan los DNS pasan a <code>active</code> y se emite el certificado SSL.</p> </div> <div class="shrink-0 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 w-full md:w-72"> <p class="font-bold mb-1">\u{1F4CB} Estado actual detectado</p> <ul class="list-disc pl-4 space-y-1"> <li>NS Cloudflare: \u2705 stella + vern</li> <li>DNS Records: \u274C 0 registros A/CNAME</li> <li>Pages Apex domain: \u23F3 pending</li> <li>Pages WWW domain: \u23F3 pending</li> <li>Token scopes DNS: \u274C sin Zone.DNS:Read/Write</li> </ul> </div> </div> <h3 class="font-bold text-lg mt-4 mb-3">\u{1F6E0}\uFE0F Opci\xF3n A (RECOMENDADA) \xB7 Script autom\xE1tico</h3> <ol class="list-decimal pl-5 space-y-2 text-sm"> <li>Crea un <strong>nuevo API Token</strong> aqu\xED \u2199 con ESTOS 6 scopes exactos y <strong>Zone Resources = Include \xB7 Specific zone = picoyplaca.co</strong>:
<div class="mt-2 rounded-lg bg-slate-900 text-slate-50 p-3 text-xs font-mono overflow-x-auto">
Zone.Zone:Read<br>
Zone.DNS:Edit<br>
Zone.Settings:Edit<br>
Zone.Page Rules:Edit<br>
Account.Cloudflare Pages:Edit<br>
Account.Account Settings:Read
</div> </li> <li>
Ejecuta en tu terminal (sustituye TU_NUEVO_TOKEN):
<pre class="mt-2 rounded-lg bg-slate-900 text-slate-50 p-3 text-xs font-mono whitespace-pre-wrap">export CLOUDFLARE_API_TOKEN="TU_NUEVO_TOKEN_AQUI"
chmod +x scripts/apply-dns-and-zone-settings.sh
bash scripts/apply-dns-and-zone-settings.sh</pre> </li> <li>Espera 2-10 minutos. Comprueba:
<pre class="mt-2 rounded-lg bg-slate-900 text-slate-50 p-3 text-xs font-mono whitespace-pre-wrap">dig +short @1.1.1.1 picoyplaca.co
dig +short @1.1.1.1 www.picoyplaca.co
curl -I https://www.picoyplaca.co/
node scripts/qa-smoke.mjs https://www.picoyplaca.co</pre> </li> </ol> <h3 class="font-bold text-lg mt-6 mb-3">\u{1F4DD} Opci\xF3n B \xB7 Manual Cloudflare Dashboard (sin script)</h3> <ol class="list-decimal pl-5 space-y-2 text-sm"> <li>Entra \u2192 Dash Cloudflare \u2192 <strong>picoyplaca.co</strong> \u2192 <strong>DNS \u2192 Records</strong> \u2192 <strong>Add record</strong></li> <li>Crea <strong>CNAME \xB7 Name @ (picoyplaca.co)</strong> \u2192 Target <code>picoyplaca-co.pages.dev</code> \xB7 Proxy status: <strong>Proxied (amarillo)</strong> \xB7 TTL Auto \u2192 <strong>Save</strong></li> <li>Crea <strong>CNAME \xB7 Name www</strong> \u2192 Target <code>picoyplaca-co.pages.dev</code> \xB7 Proxy status: <strong>Proxied</strong> \xB7 TTL Auto \u2192 <strong>Save</strong></li> <li>SSL/TLS \u2192 Edge Certificates:
<ul class="list-disc pl-5 mt-1 space-y-0.5"> <li>SSL/TLS encryption mode \u2192 <strong>Full</strong> (NO Strict en Free)</li> <li>Always Use HTTPS \u2192 <strong>On</strong></li> <li>Automatic HTTPS Rewrites \u2192 <strong>On</strong></li> <li>HSTS \u2192 Enable \xB7 Max-Age=31536000 \xB7 Include Subdomains=On \xB7 Preload=Off</li> </ul> </li> <li>Speed \u2192 Optimization:
<ul class="list-disc pl-5 mt-1 space-y-0.5"> <li>Auto Minify \u2192 <strong>JS \u2713 CSS \u2713 HTML \u2713</strong></li> <li>Polish \u2192 <strong>Lossless</strong> (Free)</li> <li>Brotli \u2192 <strong>On</strong> \xB7 HTTP/3 \u2192 <strong>On</strong> \xB7 Rocket Loader \u2192 <strong>Off</strong></li> </ul> </li> <li>Caching \u2192 Configuration: Cache Level <strong>Standard</strong>, Browser TTL <strong>4 horas</strong>, Development Mode <strong>Off</strong></li> <li>Rules \u2192 Page Rules \u2192 confirmar 1/3 activa: <code>www.picoyplaca.co/*</code> \u2192 301 \u2192 <code>https://picoyplaca.co/$1</code></li> <li>Pages \u2192 <strong>picoyplaca-co</strong> \u2192 <strong>Custom domains</strong>. Ambos (apex + www.) deben pasar de <span class="text-amber-600 font-semibold">Pending</span> a <span class="text-emerald-700 font-bold">Active \xB7 SSL valid</span> en 2-10 min.</li> </ol> </div> <div class="card p-6"> <h3 class="font-bold text-lg mb-3">\u2705 Pasos de verificaci\xF3n que YO har\xE9 cuando apliques el fix</h3> <ol class="list-decimal pl-5 space-y-2 text-sm text-slate-700"> <li>Abrir\xE9 el navegador integrado con <code>https://www.picoyplaca.co/</code> y tomar\xE9 snapshot.</li> <li>Verificar\xE9 que <code>www.</code> redirige 301 \u2192 <code>https://picoyplaca.co/</code> con Page Rule.</li> <li>Ejecutar\xE9 <code>node scripts/qa-smoke.mjs https://www.picoyplaca.co</code> \u2192 <strong>16/16 PASS</strong>.</li> <li>Confirmar\xE9 HSTS header, canonical SEO, y JSON-LD schemas en rich results.</li> <li>Si TODO OK: redeploy OPCIONAL en Pages (ya estaba al d\xEDa; DNS solo apunta).</li> </ol> </div> </div> </section>  <section data-tabpanel="docs" class="tab-panel hidden"> <div class="card p-6"> <h2 class="text-xl font-extrabold mb-3">\u{1F6E1}\uFE0F C\xF3mo proteger /admin con Cloudflare Access Zero Trust (GRATIS hasta 5 usuarios)</h2> <ol class="list-decimal pl-5 space-y-3 text-slate-700 text-sm leading-relaxed"> <li>Entra al dashboard Cloudflare \u2192 <strong>Zero Trust</strong> \u2192 <strong>Access</strong> \u2192 <strong>Applications</strong> \u2192 <strong>Add an application</strong> \u2192 <strong>Self-hosted</strong>.</li> <li><strong>Application name:</strong> <code>PicoyPlaca Admin</code>. <strong>Session duration:</strong> 1 d\xEDa. <strong>Subdomain:</strong> (deja vac\xEDo para apex) <strong>Domain:</strong> <code>picoyplaca.co</code>.</li> <li><strong>Application URLs</strong> \u2014 a\xF1ade DOS rutas (ambas protegidas):
<ul class="list-disc pl-5 mt-1 space-y-1"> <li><code>https://picoyplaca.co/admin</code> y <code>https://picoyplaca.co/admin/*</code></li> <li><code>https://picoyplaca.co/api/admin</code> y <code>https://picoyplaca.co/api/admin/*</code></li> </ul> </li> <li>Salta logo/color. Next: <strong>Add policies</strong>. Crea policy: <code>Admins autorizados</code>, Action <strong>Allow</strong>. Include rules \u2192 a\xF1ade emisor <strong>Emails</strong> e introduce hasta <strong>5 correos autorizados</strong> (l\xEDmite Free Tier).</li> <li>Finaliza creaci\xF3n. Prueba acceso an\xF3nimo: debe aparecer login Cloudflare Access \u2192 error 403 si email no autorizado.</li> <li>Opcional SSO: a\xF1ade integraci\xF3n <strong>Google Workspace</strong> o <strong>Azure AD</strong> si tu empresa la usa.</li> </ol> <p class="mt-5 p-3 bg-slate-50 rounded text-sm">\u26A0\uFE0F <strong>Compliance Free Tier</strong>: No crees m\xE1s de <strong>1 aplicaci\xF3n Access</strong> ni invites m\xE1s de 5 correos \xFAnicos; para mayores usuarios Zero Trust requiere pago.</p> </div> </section> <script>
    (function () {
      // ============== TABS ==============
      document.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-tab');
          document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active', 'btn-primary'); b.classList.add('btn-secondary'); });
          btn.classList.add('active', 'btn-primary'); btn.classList.remove('btn-secondary');
          document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.toggle('hidden', p.getAttribute('data-tabpanel') !== target); });
        });
      });
      // ============== CONFIG KV ==============
      var jsonFmt = function (o) { return JSON.stringify(o, null, 2); };
      var cfgJson = document.getElementById('cfgJson');
      var cfgMsg = document.getElementById('cfgMsg');
      document.getElementById('cfgLoad').addEventListener('click', function () {
        fetch('/api/admin/config').then(function (r) { return r.json(); }).then(function (j) {
          cfgJson.value = j.ok ? jsonFmt(j.data) : '// ERROR: ' + (j.error || 'Desconocido');
          cfgMsg.innerHTML = j.ok ? '<span class="text-success-700">\u2713 Recargado</span>' : '<span class="text-danger-700">\u2717 '+(j.error||'')+'</span>';
          if (j.ok) {
            var stC = Object.keys(j.data?.global?.shiftOffsetByCity || {}).length;
            document.getElementById('statCities').textContent = String(stC || 6);
          }
        });
      });
      document.getElementById('cfgSave').addEventListener('click', function () {
        try {
          var parsed = JSON.parse(cfgJson.value);
          fetch('/api/admin/config', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) })
            .then(function (r) { return r.json(); })
            .then(function (j) {
              cfgMsg.innerHTML = j.ok ? '<span class="text-success-700">\u2713 Guardado '+(j.data?.lastUpdatedAt||'')+'</span>' : '<span class="text-danger-700">\u2717 '+(j.error||'')+'</span>';
            });
        } catch (e) { cfgMsg.innerHTML = '<span class="text-danger-700">\u2717 JSON inv\xE1lido</span>'; }
      });
      // ============== ADS / BANNERS ==============
      var adsJson = document.getElementById('adsJson');
      var adsMsg = document.getElementById('adsMsg');
      var bnMsg = document.getElementById('bnMsg');
      var bnList = document.getElementById('bnList');
      function renderBannerList(data) {
        bnList.innerHTML = '';
        (data.banners || []).forEach(function (b) {
          var el = document.createElement('div');
          el.className = 'card p-4 flex items-start gap-3';
          el.innerHTML = '<div class="flex-1"><div class="font-bold text-slate-900">'+(b.title||'Sin t\xEDtulo')+' '+(b.active ? '<span class="text-xs text-success-700">\u25CF Activo</span>' : '<span class="text-xs text-slate-400">\u25CB Inactivo</span>')+'</div>' +
            '<div class="text-xs text-slate-600 mt-1">'+(b.description||'')+'</div>' +
            '<div class="text-xs text-slate-500 mt-2">CTA: <code>'+(b.ctaText||'')+'</code> \xB7 Sponsor: <strong>'+(b.sponsor||'')+'</strong></div>' +
            '<a href="'+(b.url||'#')+'" target="_blank" rel="noopener sponsored" class="text-xs underline text-brand-700 break-all mt-1 inline-block">'+(b.url||'')+'</a></div>' +
            '<button class="btn-secondary !text-xs !py-1 del-bn" data-id="'+(b.id||'')+'">Eliminar</button>';
          el.querySelector('.del-bn').addEventListener('click', function () {
            fetch('/api/admin/banners', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bannerId: b.id }) }).then(function(r){return r.json();}).then(function(j){ if(j.ok) loadAds(); });
          });
          bnList.appendChild(el);
        });
        document.getElementById('statBanners').textContent = String((data.banners||[]).filter(function(b){ return b.active; }).length || 0);
        document.getElementById('statSlots').textContent = String(Object.keys(data.slots||{}).length || 0);
      }
      function loadAds() {
        fetch('/api/admin/banners').then(function (r) { return r.json(); }).then(function (j) {
          if (!j.ok) { adsMsg.innerHTML = '<span class="text-danger-700">\u2717 '+(j.error||'')+'</span>'; return; }
          adsJson.value = jsonFmt(j.data);
          renderBannerList(j.data);
        });
      }
      document.getElementById('adsLoad').addEventListener('click', function () {
        adsMsg.innerHTML = '<span class="text-slate-500">Cargando\u2026</span>';
        loadAds(); adsMsg.innerHTML = '<span class="text-success-700">\u2713 Recargado</span>';
      });
      document.getElementById('adsSave').addEventListener('click', function () {
        try {
          var parsed = JSON.parse(adsJson.value);
          fetch('/api/admin/banners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) })
            .then(function(r){return r.json();}).then(function(j){
              adsMsg.innerHTML = j.ok ? '<span class="text-success-700">\u2713 Guardado</span>' : '<span class="text-danger-700">\u2717 '+(j.error||'')+'</span>';
              if (j.ok) renderBannerList(j.data);
            });
        } catch (e) { adsMsg.innerHTML = '<span class="text-danger-700">\u2717 JSON inv\xE1lido</span>'; }
      });
      document.getElementById('bnAdd').addEventListener('click', function () {
        var title = document.getElementById('bnTitle').value.trim();
        var desc  = document.getElementById('bnDesc').value.trim();
        var url   = document.getElementById('bnUrl').value.trim();
        var cta   = document.getElementById('bnCta').value.trim();
        var sp    = document.getElementById('bnSponsor').value.trim();
        var actv  = document.getElementById('bnActive').checked;
        if (!title || !url) { bnMsg.innerHTML = '<span class="text-danger-700">\u2717 T\xEDtulo y URL obligatorios</span>'; return; }
        fetch('/api/admin/banners', { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ banner: { title: title, description: desc, url: url, ctaText: cta, sponsor: sp, active: actv, utmSource: 'picoyplaca', utmMedium: 'banner' } }) })
        .then(function(r){return r.json();}).then(function(j){
          bnMsg.innerHTML = j.ok ? '<span class="text-success-700">\u2713 Banner a\xF1adido '+(j.data.banners?.slice(-1)[0]?.id||'')+'</span>' : '<span class="text-danger-700">\u2717 '+(j.error||'')+'</span>';
          if (j.ok) { document.getElementById('bnTitle').value='';document.getElementById('bnDesc').value='';document.getElementById('bnUrl').value='';document.getElementById('bnCta').value='';document.getElementById('bnSponsor').value=''; loadAds(); }
        });
      });
      // ============== LEADS ==============
      var ldTbody = document.getElementById('ldTbody');
      var ldMeta = document.getElementById('ldMeta');
      function esc(s) { return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\\\\'':'&#39;'}[c]; }); }
      function loadLeads() {
        fetch('/api/admin/leads?limit=100').then(function(r){return r.json();}).then(function(j){
          if (!j.ok) { ldMeta.textContent = 'Error: '+(j.error||''); return; }
          ldMeta.textContent = 'Mostrando '+(j.data?.length||0)+' de '+j.meta.total+' leads';
          document.getElementById('statLeads').textContent = String(j.meta.total||0);
          ldTbody.innerHTML = '';
          (j.data||[]).forEach(function (row) {
            var tr = document.createElement('tr');
            tr.innerHTML = '<td class="p-3 align-top whitespace-nowrap text-xs text-slate-500">'+esc((row.created_at||'').slice(0,16))+'</td>' +
              '<td class="p-3 align-top font-semibold">'+esc(row.company||'-')+'</td>' +
              '<td class="p-3 align-top">'+esc(row.name||'-')+'</td>' +
              '<td class="p-3 align-top text-xs"><div>'+esc(row.email||'-')+'</div><div class="text-slate-500 mt-1">'+esc(row.phone||'')+'</div></td>' +
              '<td class="p-3 align-top"><span class="badge bg-brand-50 text-brand-800 !text-xs">'+esc(row.plan||'-')+'</span></td>' +
              '<td class="p-3 align-top text-xs text-slate-700 max-w-[200px]">'+esc(row.cities||'-')+'</td>' +
              '<td class="p-3 align-top text-xs text-slate-400">'+esc(row.ip_short||'-')+'</td>' +
              '<td class="p-3 align-top whitespace-nowrap"><button class="ld-del btn-secondary !text-xs !py-1" data-id="'+esc(row.id)+'">\u{1F5D1}\uFE0F</button></td>';
            tr.querySelector('.ld-del').addEventListener('click', function () {
              if (!confirm('\xBFEliminar este lead? No se puede deshacer.')) return;
              fetch('/api/admin/leads', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: row.id }) })
                .then(function(r){return r.json();}).then(function(j){ if(j.ok) loadLeads(); });
            });
            ldTbody.appendChild(tr);
          });
        });
      }
      document.getElementById('ldReload').addEventListener('click', loadLeads);
      // ============== AUTOLOAD ==============
      document.getElementById('cfgLoad').click();
      loadAds(); loadLeads();
    })();
  <\/script> `])), maybeRenderHead()) })}`;
}, "/workspace/src/pages/admin/index.astro", void 0);

const $$file = "/workspace/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
