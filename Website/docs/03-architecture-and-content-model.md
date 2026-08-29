# 03 — Architecture & Content Model

## Stack

- **Next.js (App Router) + TypeScript** — SEO-friendly static rendering, file-based routing
  for the locked sitemap, and a clean handover path. Public pages are statically generated.
- **Tailwind CSS** — design tokens live in `tailwind.config.ts`; utility-first keeps CSS lean.
- **framer-motion** — orchestrated reveals/parallax, always gated behind `prefers-reduced-motion`.
  Loaded only in the client components that use it.
- **Self-hosted fonts** via `next/font/google` (downloaded at build time, no runtime external calls).
- **One shared IntersectionObserver reveal primitive** for scroll reveals (see `lib/motion`).

## Why this stack

The deciding factor is *who maintains this in year two* (framework §15). Next.js + TS + Tailwind
is the most widely-known, well-documented, hostable-anywhere combination that satisfies:
SEO-indexable public pages, cheap ownable hosting, and handover to an unknown future developer.
No exotic dependencies.

## Folder structure

```
Website/
  app/                 # routes (App Router)
    layout.tsx         # root: fonts, header, footer, metadata
    page.tsx           # home
    <route>/page.tsx   # per the locked sitemap
    sitemap.ts, robots.ts, not-found.tsx
  components/
    shell/             # SiteHeader, SiteNav, MegaPanel, MobileMenu, SiteFooter, PageTransition
    sections/          # composed page sections (home, learn, connect, ...)
    ui/                # Badge, FilterChip, MetadataRow, Rule, Caption, SectionLabel,
                       # PullQuote, EntryLink, Button, image-treatment wrappers
  content/
    initiatives/  bulletin/  resources/  events/  listings/  people/  reading-circle/
    samples/           # ALL sample content isolated here for one-commit removal
  lib/
    types.ts           # the 6 content types (field names = future DB entities)
    content.ts         # typed loaders + schema guards
    taxonomy.ts        # traditions, subjects, cities, languages, levels, roles
    badges.ts          # fixed badge vocabulary + origin -> badge mapping
    motion/            # reveal primitive, motion variants, reduced-motion hook
  public/assets/       # optimized imagery + texture; CREDITS.md, GENERATED.md
  styles/globals.css   # base typography, grain, focus, motion policy
  docs/                # this documentation set
```

## Content model — 6 types (field names mirror future DB entities)

The single most important architectural decision: **content files use the same field names
as the eventual database entities** (framework §19), so Phase B attaches a backend behind the
same shapes rather than rewriting.

- **`person`** — id, name, slug, location, experience, traditions[], areasOfTeaching[],
  qualifications[], languages[], teachingFormat, role, bio (100–150 words), links[],
  verified (bool), expert (bool), portrait?, sample.
- **`initiative`** — always `origin: yoga_mandala_initiative`. title, slug, type, facilitator,
  schedule, timezone, format, fee, audience, description, registration, image?, sample.
- **`bulletin`** — external offering. title, slug, submitter, category, source{name,url},
  description, expiry, origin (`curated_external` | `partner_guest`), image?, sample.
- **`resource`** — library catalogue record. title, author, subject (one of 11), tradition,
  description, level, **rights (REQUIRED)**, **source{name,url} (REQUIRED)**, plate?, sample.
- **`event`** — title, slug, host, category, date, time, location/online, audience, fee,
  description, registration (link-out), origin (badge), image?, sample.
- **`listing`** — unified Sangha Board / community listing. title, slug, category (7 kinds),
  author, location, description, expiry, origin (`community_submission`), sample.

`bulletin` and `listing` share a shape with different category vocabularies — modelled so the
Sangha Board is nearly free (framework's own recommendation).

## Origin → badge (structural, never hardcoded)

| `origin` | Badge |
|---|---|
| `yoga_mandala_initiative` | Yoga Mandala Learning Initiative |
| `curated_external` | Curated Community Listing |
| `community_submission` | Community Listing |
| `partner_guest` | Partner / Guest |

`lib/badges.ts` is the single source; components read the badge from data. Guards reject a
publishable entity with no valid `origin`, and a resource missing `rights`/`source`.

## Rendering & data flow

Loaders read typed content at build time; pages statically generate. Home pulls one featured
of each relevant type via `featured: true`. When a database replaces the files in Phase B, the
loader implementation changes and the pages do not.
