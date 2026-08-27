# Novix One AI Agency Website

Novix One is a Miami-based AI solutions agency. This Zo Site is a polished, motion-led marketing website for AI voice agents, workflow automation, custom business apps, and conversion-focused websites.

## Project Notes

- The homepage uses an elegant navy editorial visual system: Libre Baskerville display typography, DM Sans body copy, restrained ice-blue/aqua/champagne accents, a subtle grid, orbit lines, and a looping hero video presented as a clean circular visual rather than a framed window.
- **Interactive ROI calculator**: Positioned after problem blocks 01-02 (missed calls / slow follow-up), the calculator lets visitors visualize the revenue cost of missed calls. Three range sliders adjust missed calls/week, new client value ($100–$30K), and conversion rate (5–80%), with real-time calculation of monthly/yearly lost revenue and recoverable amount assuming 90% AI capture. The "Get your free assessment" button links to the booking CTA. Implemented identically in English and Spanish versions with React useEffect logic; calculator styling uses CSS custom properties for consistent branding (`.nxcalc__*` classes in `src/styles.css`).
- The site is intentionally single-page and moves visitors through the opportunity, services, approach, process, FAQ, and contact form with a clear strategy-call CTA.
- Service content is interactive: selecting a service tab updates the featured service panel without navigating away, and FAQ items expand in place.
- The contact form opens the Novix One Cal.com booking flow in a branded modal after validation, and also fires a background `fetch` to `https://jsos.zo.space/api/leads` (see "Lead capture" below) so submissions land in the Novix CRM without blocking the booking UX.
- The hero video and current Novix One logo assets are stored in `public/novix-hero.mp4` and `public/images/` so the site works offline on this Zo computer and in production.
- The browser favicon uses the supplied transparent N1 mark converted into a self-contained SVG at `public/favicon.svg`, so it works without an additional favicon asset request.
- The design respects reduced-motion preferences and is responsive for mobile navigation, stacked sections, and touch-friendly controls. The busywork problem items use contrasting gradient cards with accent glows, staggered idle motion, and lift-on-hover interactions; reduced-motion preferences disable the idle animation.
- **Scheduling**: The English and Spanish contact forms open the public Cal.com event at `https://cal.com/novixone/45min?user=novixone` inside a branded, responsive modal, prefilled with `&name=` and `&email=` from the form so Cal.com's own booking screen doesn't ask for them again (verified via `agent-browser`: the modal's iframe `src` carries the encoded values and Cal.com's "Your name"/"Email address" fields render pre-populated).
- **Bilingual support**: The site includes both English (`/`) and US Spanish (`/es`) versions with language switcher in the header (EN/ES). The Spanish version uses optimized marketing copy tailored for Spanish-speaking audiences.
- **Industry-specific landing pages**: The site includes specialized landing page prototypes for targeted verticals (e.g., `/law-offices` for Miami law firms). Rather than a custom visual system, this page is built entirely from the homepage's shared global classes (`novix-site`, `hero`, `problem`, `services`/`service-tab`/`service-feature`, `why-section`, `stats-row`, `proof-card`, `booking-modal`, `site-footer`) defined in `src/styles.css`, so any future page for a new vertical should follow the same pattern: reuse the shared classes and only add small scoped `<style>` blocks (like `.cost-section`/`.cost-card` on this page) for layout pieces that don't already exist. Content covers the missed-call problem (1 in 3 unanswered, $90K/year lost), the AI receptionist solution (reusing the homepage's interactive service-tab/service-feature component), and the Appointment & Messages Desk (embedding the actual product screenshot at `public/images/appointment-desk.png`, not a stock photo). CTAs open the same Cal.com booking modal as the homepage.

## Lead capture

The English (`marketing-demo.tsx`) and Spanish (`marketing-demo-es.tsx`) contact forms POST to `https://jsos.zo.space/api/leads` on submit (fire-and-forget, `.catch(() => {})` — a failed request never blocks the Cal.com booking modal). That endpoint is a **Zo Space API route** (`/api/leads` on `jsos.zo.space`, source in this project's owner's Zo Space, not in this repo) that opens `novix-crm`'s SQLite file directly at `/home/workspace/novix-crm/novix-crm.sqlite` and inserts a customer at the `new_lead` stage — same insert path as `novix-crm`'s own `POST /api/customers`, plus an initial note noting the selected service. `law-offices.tsx` has no lead form of its own (it opens the Cal.com modal directly), so it isn't wired to this endpoint.

**Why this shape:** `novix-crm` itself stays a private Zo Site (its published service has no in-app auth, so making it public would expose all customer/billing data). A separate, narrow, public Zo Space endpoint that can only insert new leads keeps the CRM itself private while still letting this static, Hostinger-hosted site's client-side JS reach it.

**Security tradeoff, accepted deliberately:** because the form runs in the browser on a statically-hosted page, any shared secret would ship in the public JS bundle and offer no real protection — so the endpoint has no bearer token. Instead it does origin-checked CORS (`novixone.co` only), a per-IP rate limit (10/hour, in-memory, resets on Space restart), a honeypot field (`website`) if one is ever added to the form, and field length caps. Worst case for abuse is spam "new lead" rows in the CRM (easy to spot and delete), not data exposure — the endpoint can only `INSERT`, never read or update existing customers.

**Cal.com webhook (now live):** `/api/cal-webhook` on `jsos.zo.space` (also outside this repo) is subscribed to Cal.com's `BOOKING_CREATED` event, verified via HMAC signature (`CAL_WEBHOOK_SECRET`). When a booking completes it upserts the CRM customer by email: existing leads still at `new_lead`/`follow_up` advance to `evaluation_booked` (never regressing a lead already further along); unknown emails get a new customer created directly at `evaluation_booked`, source `cal.com_booking`. It logs a note with the formatted booking time and Cal.com's own "What is slowing your business down?" answer. This is why the site's own contact form no longer asks an open-ended question — Cal.com's booking screen is now the single place that's asked, and the webhook carries it into the CRM either way.

**Contact form simplified (2026-08-08):** the site's pre-booking form used to ask Name, Email, Service, and a free-text "Tell us a little more," then the Cal.com modal opened unprefilled and asked Name and Email again plus its own Location/Phone/"What is slowing your business down?" questions — real duplication, not just a look. Fixed by (1) dropping the free-text field from the site form since it duplicated Cal.com's own question, keeping Name/Email/Service, and (2) prefilling the Cal.com iframe with `&name=`/`&email=` from what was already typed. Cal.com's Location choice (In Person / Zoom / Google Meet) is still a 3-way pick configured on the Cal.com event itself (dashboard-side, not in this repo) — worth fixing to a single default given this is a remote/automation-first business, but no Cal.com login is connected on this Zo to do it from here.

## Architecture

This is a Zo Site using Bun + Hono + Vite + React. The runtime is managed by Zo; do not start or restart the server manually. 

**Pages:**
- `src/pages/marketing-demo.tsx` — English version (served at `/`)
- `src/pages/marketing-demo-es.tsx` — US Spanish version (served at `/es`)
- `src/pages/law-offices.tsx` — Law firm landing page (served at `/law-offices`) — built from the homepage's shared design-system classes (see Project Notes below), with law firm-specific copy: missed-call problem, cost of lost leads, the AI receptionist solution, and the Appointment & Messages Desk.

**Styling & assets:**
- Global design and responsive styles are in `src/styles.css`
- Static assets live in `public/`

## Deployment (Hostinger)

The site is static-hosted on Hostinger at `novixone.co` (this Zo Site's own dev/prod servers are not what's live there). To deploy:

```
bun run deploy
```

That's it — one command. It runs `bash deploy.sh`, which type-checks, builds, uploads `dist/` to `/public_html/` over FTP, and verifies the live bundle hash matches the build. It only needs `NOVIXONE_HOSTINGER_PASSWORD` set as a secret in Settings > Advanced (the FTP host and username aren't sensitive, so they're hardcoded directly in `deploy.sh` — no more digging up hPanel screenshots for every deploy).

`deploy.sh` also permanently fixes two bugs found the hard way:
- `lftp -f <script>` does **not** expand `$VAR`-style environment variables from a script file (only `lftp -c "..."` inside a shell's own double quotes does, because the shell expands it first) — so the script builds the whole `lftp` command inline via `-c`.
- lftp's `mirror` can compare files by size only and silently skip re-uploading `index.html` when the old and new versions happen to be the same byte size, even though the asset hashes it references changed — leaving the live site pointing at deleted JS/CSS. `deploy.sh` always force-`put`s `index.html` and `.htaccess` after the mirror to close that gap for good.
- Hostinger's shared-IP FTP cert doesn't match the bare IP, so `ssl:verify-certificate` is explicitly disabled for this connection.

See `HOSTINGER-DEPLOYMENT.md` for the manual File Manager fallback if FTP is ever unavailable.

## Development and verification

- Zo automatically hot reloads the site during development.
- Type check with `bunx tsc --noEmit`.
- Build with `bun run build` when validating production output.
- Use `agent-browser` against the managed preview port for visual and interaction checks. Do not expose localhost URLs to visitors.
- **Caveat**: `server.ts`'s Vite dev instance is created with `hmr: false, ws: false`, so edits to page files sometimes are not picked up by the running dev server (confirmed via `curl`ing the raw transformed module and seeing stale content). If a page edit isn't reflecting after a normal wait, find the dev process with `lsof -i :<local_port>`, `kill` it, and if the external supervisor doesn't respawn it within ~60-90s, restart it directly with `bun run dev` from the project root (the same command `zosite.json`'s entrypoint uses) — this is safe since nothing else is listening on that port once it's dead. Full-page `agent-browser` screenshots also show large blank gaps below the fold because `.reveal` sections are opacity:0 until scrolled into view by an IntersectionObserver; scroll incrementally and screenshot each viewport instead of relying on one full-page capture.

## Current content reference

The live Novix One reference site describes the company as a Miami-based AI agency offering AI voice agents, automated AI solutions, custom business apps, and beautiful websites. Contact details used in this design are `jorges@novixone.co` and `833-325-0830`.

## Configuration

`zosite.json` is auto-generated by Zo. Never edit its system-managed ports, entrypoints, or publish fields. Only edit safe environment fields if needed.
