# Novix One AI Agency Website

Novix One is a Miami-based AI solutions agency. This Zo Site is a polished, motion-led marketing website for AI voice agents, workflow automation, custom business apps, and conversion-focused websites.

## Project Notes

- The homepage uses an elegant navy editorial visual system: Libre Baskerville display typography, DM Sans body copy, restrained ice-blue/aqua/champagne accents, a subtle grid, orbit lines, and a looping hero video presented as a clean circular visual rather than a framed window.
- The site is intentionally single-page and moves visitors through the opportunity, services, approach, process, FAQ, and contact form with a clear strategy-call CTA.
- Service content is interactive: selecting a service tab updates the featured service panel without navigating away, and FAQ items expand in place.
- The contact form opens the Novix One Cal.com booking flow in a branded modal after validation; it does not persist form fields to a server.
- The hero video and current Novix One logo assets are stored in `public/novix-hero.mp4` and `public/images/` so the site works offline on this Zo computer and in production.
- The browser favicon uses the supplied transparent N1 mark converted into a self-contained SVG at `public/favicon.svg`, so it works without an additional favicon asset request.
- The design respects reduced-motion preferences and is responsive for mobile navigation, stacked sections, and touch-friendly controls. The busywork problem items use contrasting gradient cards with accent glows, staggered idle motion, and lift-on-hover interactions; reduced-motion preferences disable the idle animation.
- **Scheduling**: The English and Spanish contact forms open the public Cal.com event at `https://cal.com/novixone/45min?user=novixone` inside a branded, responsive modal.
- **Bilingual support**: The site includes both English (`/`) and US Spanish (`/es`) versions with language switcher in the header (EN/ES). The Spanish version uses optimized marketing copy tailored for Spanish-speaking audiences.
- **Industry-specific landing pages**: The site includes specialized landing page prototypes for targeted verticals (e.g., `/law-offices` for Miami law firms). Rather than a custom visual system, this page is built entirely from the homepage's shared global classes (`novix-site`, `hero`, `problem`, `services`/`service-tab`/`service-feature`, `why-section`, `stats-row`, `proof-card`, `booking-modal`, `site-footer`) defined in `src/styles.css`, so any future page for a new vertical should follow the same pattern: reuse the shared classes and only add small scoped `<style>` blocks (like `.cost-section`/`.cost-card` on this page) for layout pieces that don't already exist. Content covers the missed-call problem (1 in 3 unanswered, $90K/year lost), the AI receptionist solution (reusing the homepage's interactive service-tab/service-feature component), and the Appointment & Messages Desk (embedding the actual product screenshot at `public/images/appointment-desk.png`, not a stock photo). CTAs open the same Cal.com booking modal as the homepage.

## Architecture

This is a Zo Site using Bun + Hono + Vite + React. The runtime is managed by Zo; do not start or restart the server manually. 

**Pages:**
- `src/pages/marketing-demo.tsx` — English version (served at `/`)
- `src/pages/marketing-demo-es.tsx` — US Spanish version (served at `/es`)
- `src/pages/law-offices.tsx` — Law firm landing page (served at `/law-offices`) — built from the homepage's shared design-system classes (see Project Notes below), with law firm-specific copy: missed-call problem, cost of lost leads, the AI receptionist solution, and the Appointment & Messages Desk.

**Styling & assets:**
- Global design and responsive styles are in `src/styles.css`
- Static assets live in `public/`

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
