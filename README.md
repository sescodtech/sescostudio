# SESCO STUDIO — Digital Innovation Studio Platform

A complete Next.js 16 + TypeScript + Tailwind CSS website and admin CMS for SESCO STUDIO, a premium digital innovation studio.

## What's Included

**Public Website** (7 pages)
- `/` — Home (hero, services preview, about preview, process, why-us, portfolio preview, testimonials, CTA)
- `/about` — Mission, vision, values, team
- `/services` — Full service breakdown + pricing tiers
- `/portfolio` — Filterable project grid
- `/case-studies` — Detailed project breakdowns with challenge/results
- `/blog` — Category-filterable blog grid
- `/contact` — Contact form + info

**Admin CMS** (`/admin`)
- Supabase Auth-protected dashboard (email + password — see `SUPABASE_SETUP.md` to create your admin account)
- Logo & favicon upload (replaces site-wide branding without code changes)
- Homepage, About, Contact info editors
- Full CRUD for Services, Projects, Testimonials, Blog Posts, Case Studies
- Media library with drag-and-drop upload
- Data export/import (JSON backup) and reset-to-defaults

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + custom CSS tokens
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Data layer:** Supabase-backed CMS context (single JSONB document), with `localStorage` used only as an instant first-paint cache — see `SUPABASE_SETUP.md`
- **Auth:** Supabase Auth (email + password) gates `/admin`

## Brand System

- **Colors:** Deep Navy `#0B0F1A`, Electric Blue `#2F6BFF`, Premium Gold `#C8A24A`, White `#FFFFFF`, Gray `#A7B0C0`
- **Typography:** Plus Jakarta Sans (headings), Inter (body), Montserrat (labels/uppercase)
- **Tagline:** "We build systems, not just designs."

## Getting Started

```bash
npm install
npm run dev
```

Follow `SUPABASE_SETUP.md` first to create your Supabase project, `.env.local`, and admin account. Then visit `http://localhost:3000` for the site and `http://localhost:3000/admin` for the CMS (sign in with the Supabase Auth account you created).

## Project Structure

```
app/                      Next.js App Router pages (one folder per route)
components/
  layout/                 Navbar, Footer
  sections/                Page-specific section components
  ui/                       Shared UI: LogoMark, ParticleCanvas, Motion primitives
  admin/                    Admin dashboard: Sidebar, tabs, modals, toast system
lib/
  cms.ts                    Default CMS data + localStorage get/save/reset
  CMSContext.tsx             React context exposing CMS data to public site
  AdminAuthContext.tsx        PIN-based session auth for /admin
types/
  cms.ts                     TypeScript interfaces for all CMS-managed content
```

## Replacing the Official Logo

Per the brand brief, the project ships with a generated SVG monogram placeholder (circle + "SS" + dashed gold ring) used consistently across navbar, hero, and footer via `components/ui/LogoMark.tsx`.

To install your official logo:
1. Go to `/admin` → log in → **Logo & Favicon**
2. Upload your logo file (PNG/SVG/WebP, transparent background recommended)
3. Click **Save Logo** — it propagates instantly across the entire site, no code changes or redeploy required

The `LogoMark` component automatically prefers the uploaded image over the SVG fallback wherever it's used.

## Current Backend: Supabase

This build is already wired to Supabase — see `SUPABASE_SETUP.md` for the full setup guide. In short:

- CMS content lives in a single `sesco_cms` row (`content` JSONB column), read by the public site and written by the admin dashboard, protected by Row Level Security (public read, authenticated write)
- Admin login is Supabase Auth (email + password)
- `localStorage` is used only as an instant first-paint cache; Supabase is always the source of truth

**Known limitation to address next:** logo, favicon, and media library images are currently stored as base64 data URIs directly inside the `content` JSONB blob (via `FileReader`), not Supabase Storage. This works but means every page load fetches the whole CMS document including every embedded image. Moving these to Supabase Storage buckets (storing public URLs instead of data URIs) is recommended before the media library grows large.

## Notes

- The contact form currently confirms submission in the UI only. Wire `components/sections/ContactPage.tsx`'s `handleSubmit` to an API route plus an email service (e.g. Resend, already used elsewhere in the Sesco ecosystem) for production use.
- All pages are statically generated — `next build` confirms 9/9 routes prerendered — and ready to deploy on Vercel.
