import { serveStatic } from "hono/bun";
import type { ViteDevServer } from "vite";
import { createServer as createViteServer } from "vite";
import config from "./zosite.json";
import { Hono } from "hono";
import { ROUTE_META } from "./src/lib/seo";

// AI agents: read README.md for navigation and contribution guidance.
type Mode = "development" | "production";
const app = new Hono();

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * This is a client-rendered SPA: every route serves the same dist/index.html,
 * with per-page title/OG/canonical tags applied by JS after mount (see
 * src/lib/seo.ts). Crawlers and services that don't execute JS — social link
 * previews, some bots — would otherwise see the homepage's tags on every
 * route. This injects the same ROUTE_META values server-side so the raw HTML
 * is already correct before any JS runs.
 */
function injectRouteMeta(html: string, path: string): string {
  const meta = ROUTE_META[path];
  if (!meta) return html;

  let out = html;
  const title = escapeHtmlAttr(meta.title);
  const description = escapeHtmlAttr(meta.description);
  const ogTitle = escapeHtmlAttr(meta.ogTitle ?? meta.title);
  const ogDescription = escapeHtmlAttr(meta.ogDescription ?? meta.description);

  out = out.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta name="description" content=".*?"\s*\/>/,
    `<meta name="description" content="${description}" />`
  );
  out = out.replace(
    /<meta property="og:title" content=".*?"\s*\/>/,
    `<meta property="og:title" content="${ogTitle}" />`
  );
  out = out.replace(
    /<meta property="og:description" content=".*?"\s*\/>/,
    `<meta property="og:description" content="${ogDescription}" />`
  );
  if (meta.ogImage) {
    const ogImage = escapeHtmlAttr(meta.ogImage);
    out = out.replace(
      /<meta property="og:image" content=".*?"\s*\/>/,
      `<meta property="og:image" content="${ogImage}" />`
    );
  }
  if (meta.canonicalUrl) {
    const canonicalUrl = escapeHtmlAttr(meta.canonicalUrl);
    out = out.replace(
      /<meta property="og:url" content=".*?"\s*\/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
    if (/<link rel="canonical"/.test(out)) {
      out = out.replace(
        /<link rel="canonical" href=".*?"\s*\/>/,
        `<link rel="canonical" href="${canonicalUrl}" />`
      );
    } else {
      out = out.replace("</head>", `    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
    }
  }

  // The en/es/x-default hreflang set only applies to "/" and "/es" — strip it
  // for every other route so we don't claim a translation that doesn't exist.
  if (path !== "/" && path !== "/es") {
    out = out.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/>\n?/g, "");
  }

  return out;
}

const mode: Mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

/**
 * Add any API routes here.
 */
app.get("/api/hello-zo", (c) => c.json({ msg: "Hello from Zo" }));

if (mode === "production") {
  configureProduction(app);
} else {
  await configureDevelopment(app);
}

/**
 * Determine port based on mode. In production, use the published_port if available.
 * In development, always use the local_port.
 * Ports are managed by the system and injected via the PORT environment variable.
 */
const port = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : mode === "production"
    ? (config.publish?.published_port ?? config.local_port)
    : config.local_port;

export default { fetch: app.fetch, port, idleTimeout: 255 };

/**
 * Configure routing for production builds.
 *
 * - Streams prebuilt assets from `dist`.
 * - Static files from `public/` are copied to `dist/` by Vite and served at root paths.
 * - Falls back to `index.html` for any other GET so the SPA router can resolve the request.
 */
function configureProduction(app: Hono) {
  app.use("/assets/*", serveStatic({ root: "./dist" }));
  app.get("/favicon.ico", (c) => c.redirect("/favicon.svg", 302));
  app.use(async (c, next) => {
    if (c.req.method !== "GET") return next();

    const path = c.req.path;
    if (path.startsWith("/api/") || path.startsWith("/assets/")) return next();

    const file = Bun.file(`./dist${path}`);
    if (await file.exists()) {
      const stat = await file.stat();
      if (stat && !stat.isDirectory()) {
        return new Response(file);
      }
    }

    const indexHtml = await Bun.file("./dist/index.html").text();
    const html = injectRouteMeta(indexHtml, path);
    // Unrecognized paths render the SPA's NotFound route client-side; return a
    // real 404 status so crawlers don't index them as live pages (soft 404s).
    const isKnownRoute = path in ROUTE_META || path === "/_design";
    return c.html(html, isKnownRoute ? 200 : 404);
  });
}

/**
 * Configure routing for development builds.
 *
 * - Boots Vite in middleware mode for transforms with file watching enabled.
 * - File changes invalidate the module cache so fresh code is always served.
 * - Static files from `public/` are served at root paths (matching Vite convention).
 * - Mirrors production routing semantics so SPA routes behave consistently.
 */
async function configureDevelopment(app: Hono): Promise<ViteDevServer> {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: "custom",
  });

  app.use("*", async (c, next) => {
    if (c.req.path.startsWith("/api/")) return next();
    if (c.req.path === "/favicon.ico") return c.redirect("/favicon.svg", 302);

    const url = c.req.path;
    try {
      if (url === "/" || url === "/index.html") {
        let template = await Bun.file("./index.html").text();
        template = await vite.transformIndexHtml(url, template);
        return c.html(template, {
          headers: {
            "Cache-Control": "no-store, must-revalidate, no-cache, max-age=0",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        });
      }

      const publicFile = Bun.file(`./public${url}`);
      if (await publicFile.exists()) {
        const stat = await publicFile.stat();
        if (stat && !stat.isDirectory()) {
          return new Response(publicFile, {
            headers: { "Cache-Control": "no-store, must-revalidate" },
          });
        }
      }

      let result;
      try {
        result = await vite.transformRequest(url);
      } catch {
        result = null;
      }

      if (result) {
        return new Response(result.code, {
          headers: {
            "Content-Type": "application/javascript",
            "Cache-Control": "no-store, must-revalidate",
          },
        });
      }

      let template = await Bun.file("./index.html").text();
      template = await vite.transformIndexHtml("/", template);
      return c.html(template, {
        headers: { "Cache-Control": "no-store, must-revalidate" },
      });
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      console.error(error);
      return c.text("Internal Server Error", 500);
    }
  });

  return vite;
}
