#!/usr/bin/env bun
/**
 * Post-build step for the Hostinger static deploy (run by deploy.sh, after `vite build`).
 *
 * Hostinger serves dist/ as plain files with no server process, so it can't inject
 * per-route tags or return real HTTP status codes at request time the way server.ts
 * does for Zo. This script does the equivalent work at build time instead:
 *
 * 1. For every route in ROUTE_META (plus /_design), stamp its title/OG/canonical tags
 *    into a copy of the built index.html and write it to dist/_prerendered/<slug>.html.
 * 2. Generate .htaccess rewrite rules that map each known route to its prerendered file.
 * 3. Anything NOT in that list has no matching file or rewrite rule, so Apache falls
 *    through to its native 404 handling — wired to /404.html via ErrorDocument, which
 *    still boots the SPA (so users see the app's own NotFound page) but with a real
 *    404 status, not a silent 200.
 *
 * Keeps ROUTE_META as the single source of truth: add a route there and this script
 * picks it up automatically, no separate .htaccess edits needed.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ROUTE_META, injectRouteMeta } from "../src/lib/seo";

const ROOT = join(import.meta.dir, "..");
const DIST = join(ROOT, "dist");
const PRERENDERED_DIR = join(DIST, "_prerendered");

const BEGIN_MARKER = "# BEGIN GENERATED SPA ROUTES";
const END_MARKER = "# END GENERATED SPA ROUTES";

function slugify(route: string): string {
  // "/blog/missed-calls-cost" -> "blog-missed-calls-cost", "/es" -> "es"
  return route.replace(/^\//, "").replace(/\//g, "-");
}

async function main() {
  const template = await readFile(join(DIST, "index.html"), "utf-8");

  // Every client-side route except "/" (dist/index.html already has the right
  // tags baked in from the source index.html template).
  const routes = [...Object.keys(ROUTE_META).filter((r) => r !== "/"), "/_design"];

  await mkdir(PRERENDERED_DIR, { recursive: true });

  const rewriteRules: string[] = [];
  for (const route of routes) {
    const slug = slugify(route);
    const html = injectRouteMeta(template, route);
    await writeFile(join(PRERENDERED_DIR, `${slug}.html`), html);
    rewriteRules.push(`  RewriteRule ^${route.replace(/^\//, "")}/?$ _prerendered/${slug}.html [L]`);
  }

  // Real 404: same shell as every other route, so the SPA boots and its own
  // "*" NotFound route renders client-side, but Apache reports it as a real 404.
  await writeFile(join(DIST, "404.html"), template);

  const htaccessTemplate = await readFile(join(ROOT, ".htaccess"), "utf-8");
  const beginIdx = htaccessTemplate.indexOf(BEGIN_MARKER);
  const endIdx = htaccessTemplate.indexOf(END_MARKER);
  if (beginIdx === -1 || endIdx === -1) {
    throw new Error(`.htaccess is missing ${BEGIN_MARKER} / ${END_MARKER} markers`);
  }
  const generatedHtaccess =
    htaccessTemplate.slice(0, beginIdx + BEGIN_MARKER.length) +
    "\n" +
    rewriteRules.join("\n") +
    "\n  " +
    htaccessTemplate.slice(endIdx);
  await writeFile(join(DIST, ".htaccess"), generatedHtaccess);

  console.log(`Prerendered ${routes.length} route(s) + 404.html, wrote dist/.htaccess`);
}

main();
