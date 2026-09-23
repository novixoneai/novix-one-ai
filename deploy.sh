#!/usr/bin/env bash
# One-command deploy to Hostinger (novixone.co). Run: bash deploy.sh (or: bun run deploy)
set -euo pipefail
cd "$(dirname "$0")"

# Not secrets - just the FTP account identifiers from hPanel > Files > FTP Accounts.
# Only the password is sensitive; it stays in Settings > Advanced as NOVIXONE_HOSTINGER_PASSWORD.
FTP_HOST="145.223.106.160"
FTP_USER="u918724337.novixone.co"

if [ -z "${NOVIXONE_HOSTINGER_PASSWORD:-}" ]; then
  echo "Missing NOVIXONE_HOSTINGER_PASSWORD env var. Add it in Settings > Advanced." >&2
  exit 1
fi

echo "==> Type-checking"
bunx tsc --noEmit

echo "==> Building"
bun run build

echo "==> Prerendering per-route meta tags + generating dist/.htaccess (vite build doesn't do this)"
bun run scripts/prerender-static.ts

echo "==> Uploading dist/ to /public_html/ over FTP"
# ssl:verify-certificate off: Hostinger's shared-IP cert doesn't match the bare FTP IP.
# index.html and .htaccess are always force-put after the mirror: lftp's mirror can compare
# files by size only and silently skip re-uploading index.html when the old and new versions
# happen to be the same byte size, even though its content (asset hashes) changed - see README.
lftp -c "
set ftp:list-options -la
set ftp:passive-mode on
set ssl:verify-certificate no
open -u $FTP_USER,$NOVIXONE_HOSTINGER_PASSWORD ftp://$FTP_HOST
mirror -e -R --ignore-time --parallel=4 dist/ /public_html/
put -O /public_html/ dist/index.html
put -O /public_html/ dist/.htaccess
quit
"

echo "==> Verifying the live bundle matches this build"
LOCAL_JS="$(basename dist/assets/index-*.js)"
LIVE_JS="$(curl -s "https://novixone.co/?t=$(date +%s)" | grep -o 'assets/index-[A-Za-z0-9]*\.js' | head -1)"
if [ "$LIVE_JS" = "assets/$LOCAL_JS" ]; then
  echo "==> Deploy verified: $LIVE_JS is live on novixone.co"
else
  echo "WARNING: live bundle ($LIVE_JS) does not match this build (assets/$LOCAL_JS)." >&2
  echo "Re-run this script, or check the site manually." >&2
  exit 1
fi
