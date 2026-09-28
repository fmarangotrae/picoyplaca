#!/usr/bin/env bash
# ============================================================
#  apply-dns-and-zone-settings.sh  ·  picoyplaca.co
#  Crea registros DNS (CNAME apex y www → Pages) + configura
#  SSL Full / Always HTTPS / Minify / Brotli / HSTS / HTTP3.
#
#  REQUISITO: API Token Cloudflare con ESTOS SCOPES:
#    Zone.Zone:Read     Zone.DNS:Edit     Zone.Settings:Edit
#    Zone.Page Rules:Edit    Account.Cloudflare Pages:Edit
#
#  COMO EJECUTARLO:
#    export CLOUDFLARE_API_TOKEN="TU_NUEVO_TOKEN_AQUI"
#    bash scripts/apply-dns-and-zone-settings.sh
# ============================================================
set -euo pipefail

CF_API_TOKEN="${CLOUDFLARE_API_TOKEN:-}"
ZONE_NAME="picoyplaca.co"
PAGES_TARGET="picoyplaca-co.pages.dev"

if [ -z "$CF_API_TOKEN" ]; then
  echo "❌ Falta CLOUDFLARE_API_TOKEN. Exportalo primero."
  echo "   export CLOUDFLARE_API_TOKEN=\"...\""
  exit 1
fi
H="Authorization: Bearer $CF_API_TOKEN"
JSON="Content-Type: application/json"

echo "✅ TOKEN verify..."
VERIFY=$(curl -sH "$H" https://api.cloudflare.com/client/v4/user/tokens/verify)
if [ "$(echo "$VERIFY" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("success","false"))' 2>/dev/null)" != "True" ]; then
  echo "❌ Token invalido."
  echo "$VERIFY"; exit 1
fi

echo "✅ Detectar ZONE_ID..."
ZONE_ID=$(curl -sH "$H" "https://api.cloudflare.com/client/v4/zones?name=$ZONE_NAME&status=active" \
  | python3 -c 'import json,sys;d=json.load(sys.stdin);print(d["result"][0]["id"] if d.get("success") and d.get("result") else "")')
if [ -z "$ZONE_ID" ]; then echo "❌ Zone $ZONE_NAME no encontrada."; exit 1; fi
echo "   ZONE_ID = $ZONE_ID"

echo "✅ Detectar ACCOUNT_ID..."
ACCOUNT_ID=$(curl -sH "$H" https://api.cloudflare.com/client/v4/accounts?per_page=1 \
  | python3 -c 'import json,sys;d=json.load(sys.stdin);print(d["result"][0]["id"] if d.get("success") and d.get("result") else "")')
if [ -z "$ACCOUNT_ID" ]; then echo "❌ No hay account id (scope Account.Read falta)."; fi
echo "   ACCOUNT_ID = ${ACCOUNT_ID:-<no detectado>}"

# ---------- 1. DNS RECORDS ----------
echo ""
echo "============================================================"
echo " 1. CREAR REGISTROS DNS → Pages ($PAGES_TARGET)"
echo "============================================================"
EXISTING=$(curl -sH "$H" "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?per_page=100")

create_cname() {
  local name=$1 content=$2 comment=$3
  local id=$(echo "$EXISTING" | python3 -c "import json,sys;d=json.load(sys.stdin);\
rs=[r for r in (d.get('result') or []) if r['type']=='CNAME' and r['name']=='$name'];print(rs[0]['id'] if rs else '')")
  if [ -n "$id" ]; then
    echo "   ⚙️  Actualizar CNAME $name → $content"
    curl -s -X PUT -H "$H" -H "$JSON" \
      "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$id" \
      -d "{\"type\":\"CNAME\",\"name\":\"$name\",\"content\":\"$content\",\"ttl\":1,\"proxied\":true,\"comment\":\"$comment\"}" \
      | python3 -c 'import json,sys;d=json.load(sys.stdin);print("   OK" if d.get("success") else "   FAIL: "+str(d.get("errors") or d.get("messages")))'
  else
    echo "   ➕ Crear CNAME $name → $content"
    curl -s -X POST -H "$H" -H "$JSON" \
      "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
      -d "{\"type\":\"CNAME\",\"name\":\"$name\",\"content\":\"$content\",\"ttl\":1,\"proxied\":true,\"comment\":\"$comment\"}" \
      | python3 -c 'import json,sys;d=json.load(sys.stdin);print("   OK" if d.get("success") else "   FAIL: "+str(d.get("errors") or d.get("messages")))'
  fi
}

create_cname "$ZONE_NAME"  "$PAGES_TARGET" "Pages apex (CNAME flattening)"
create_cname "www.$ZONE_NAME" "$PAGES_TARGET" "Pages www"

echo ""
echo "✅ Listado DNS final:"
curl -sH "$H" "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?per_page=50" \
  | python3 -c 'import json,sys;d=json.load(sys.stdin);\
[print(f"   {r[\"type\"]:5} {r[\"name\"]:30} -> {r[\"content\"]:50} proxied={r[\"proxied\"]} ttl={r[\"ttl\"]}") for r in (d.get("result") or [])] if d.get("success") else print("   ERR", d.get("errors"))'

# ---------- 2. ZONE SETTINGS ----------
echo ""
echo "============================================================"
echo " 2. ZONE SETTINGS · SSL / HSTS / Minify / Brotli / HTTP3"
echo "============================================================"
patch_setting() {
  local k=$1 v=$2
  local status=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH -H "$H" -H "$JSON" \
    "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/$k" \
    -d "{\"value\":$v}")
  case "$status" in
    200) echo "   ✅ $k = $v" ;;
    403) echo "   ⚠️  $k  403  Scope Zone.Settings:Edit FALTA (manual dashboard)" ;;
    *)   echo "   ❌ $k  HTTP $status" ;;
  esac
}

patch_setting "ssl"                       "\"full\""
patch_setting "always_use_https"          "\"on\""
patch_setting "automatic_https_rewrites"  "\"on\""
patch_setting "brotli"                    "\"on\""
patch_setting "http3"                     "\"on\""
patch_setting "0rtt"                      "\"on\""
patch_setting "minify"                    "{\"css\":\"on\",\"html\":\"on\",\"js\":\"on\"}"
patch_setting "polish"                    "\"lossless\""
patch_setting "opportunistic_encryption"  "\"on\""
patch_setting "browser_cache_ttl"         "\"14400\""
patch_setting "cache_level"               "\"simplified\""
patch_setting "development_mode"          "\"off\""

# HSTS (max-age 1 año, includeSubDomains, no preload Free)
echo -n "   ✅ hsts (31536000 includeSubDomains) → "
curl -s -X PATCH -H "$H" -H "$JSON" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/security_header" \
  -d '{"value":{"strict_transport_security":{"enabled":true,"max_age":31536000,"include_subdomains":true,"preload":false,"nosniff":true}}}' \
  | python3 -c 'import json,sys;d=json.load(sys.stdin);print("OK" if d.get("success") else "FAIL "+str(d.get("errors")))'

# ---------- 3. PAGE RULE 301 www → apex (confirmar 1/3 Free) ----------
echo ""
echo "============================================================"
echo " 3. Page Rule: www.$ZONE_NAME/* → 301 https://$ZONE_NAME/\$1"
echo "============================================================"
PR_EXISTS=$(curl -sH "$H" "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/pagerules?status=active" \
  | python3 -c "import json,sys;d=json.load(sys.stdin);\
rs=[r for r in (d.get('result') or []) if any(t.get('constraint',{}).get('value')=='www.$ZONE_NAME/*' for t in (r.get('targets') or []))];\
print('1' if rs else '')")
if [ -n "$PR_EXISTS" ]; then
  echo "   ✅ Page Rule ya existe (1/3 Free)."
else
  curl -s -X POST -H "$H" -H "$JSON" "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/pagerules" \
    -d "{\"status\":\"active\",\"priority\":1,\"targets\":[{\"target\":\"url\",\"constraint\":{\"operator\":\"matches\",\"value\":\"www.$ZONE_NAME/*\"}}],\
\"actions\":[{\"id\":\"forwarding_url\",\"value\":{\"status_code\":301,\"url\":\"https://$ZONE_NAME/\\\$1\"}}]}" \
  | python3 -c 'import json,sys;d=json.load(sys.stdin);print("   ✅ Page Rule creada (1/3 Free)" if d.get("success") else "   ❌ Fail: "+str(d.get("errors")))'
fi

# ---------- 4. Pages CUSTOM DOMAINS re-verify ----------
echo ""
echo "============================================================"
echo " 4. Pages custom domains · re-trigger verificación + cert"
echo "============================================================"
if [ -n "$ACCOUNT_ID" ]; then
  for DOM in "$ZONE_NAME" "www.$ZONE_NAME"; do
    echo "   🔁 PATCH $DOM"
    curl -s -X PATCH -H "$H" -H "$JSON" \
      "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/picoyplaca-co/domains/$DOM" \
      -d '{"name":"'"$DOM"'"}' 2>/dev/null \
      | python3 -c 'import json,sys;d=json.load(sys.stdin);\
x=d.get("result") or {}; print(f"      status={x.get(\"status\")}  verified={x.get(\"verified\")}  validation_errors={x.get(\"validation_errors\")}") if d.get("success") else print("      FAIL",d.get("errors"))'
    sleep 2
  done
  echo "   📋 Estado final Pages domains:"
  curl -sH "$H" "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/picoyplaca-co/domains" \
    | python3 -c 'import json,sys;d=json.load(sys.stdin);\
[print(f"      {x[\"name\"]:30} status={x[\"status\"]:<8} verified={x.get(\"verified\")} cert={x.get(\"ssl\",{}).get(\"status\",x.get(\"ssl_status\",\"\"))}") for x in (d.get("result") or [])]'
fi

# ---------- 5. DNS propagation + smoke test ----------
echo ""
echo "============================================================"
echo " 5. Esperar propagación y smoke tests (10s + curl)"
echo "============================================================"
sleep 10
echo "   dig A   $ZONE_NAME   → $(dig +short @1.1.1.1 "$ZONE_NAME" | tr '\n' ' ')"
echo "   dig CNAME www.$ZONE_NAME → $(dig +short @1.1.1.1 "www.$ZONE_NAME")"
for U in "https://$ZONE_NAME/" "https://www.$ZONE_NAME/" "https://$ZONE_NAME/sitemap-index.xml"; do
  CODE=$(curl -sIL -o /dev/null -w "%{http_code}" --max-time 10 "$U" || echo "ERR")
  echo "   🌐 $U  → HTTP $CODE"
done
echo ""
echo "🎉 apply-dns-and-zone-settings.sh TERMINADO."
echo "   Espera ~2-10min y prueba:  https://www.picoyplaca.co/"
