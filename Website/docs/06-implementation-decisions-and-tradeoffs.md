# 06 — Implementation Decisions & Tradeoffs

A running log of notable decisions and why they were made. Newest at the bottom.

## Stack: Next.js (App Router) + TypeScript + Tailwind + framer-motion
Chosen for SEO-friendly static rendering, file-based routing that maps cleanly to the locked
sitemap, and — decisively — maintainability by an unknown future developer (framework §15).
No exotic dependencies. Motion library is imported only in the client components that need it.

## Fonts self-hosted via `next/font/google`
Downloads and self-hosts Fraunces / Inter Tight / Tiro Devanagari at build time, so there are
no runtime external font requests and no CLS from font swap beyond `font-display: swap`.
Satisfies "self-hosted" without shipping binaries into the repo.

## Content as typed local files with future-DB field names
The content shapes deliberately mirror the framework §19 database entities. Phase B becomes an
attach exercise, not a rewrite. Schema guards enforce the framework's hard rules structurally
(a resource cannot exist without `rights`/`source`; a publishable entity cannot exist without a
valid `origin` that maps to a badge) rather than by policy.

## Palette: warm sand / forest / gold (from the client artifact)
The client's own promotional artifact uses cream, deep forest green and gold. Building the
palette from that real brand signal (a) grounds the design in something the client already owns,
and (b) makes this build visually distinct. Lotus/mandala/om motifs in that artifact are
deliberately NOT carried over — the framework's avoid-list bans them as decoration.

## `/connect/sangha` omitted from navigation
The framework lists a "Sangha" page but never defines it. Per the integrity principle that a
hollow page is worse than none, the route and nav item are omitted until the client supplies a
one-sentence definition (C3). Everything else in the Connect cluster ships.

## Phase-A imagery uses art-directed CSS placeholders in most photographic slots
No real community photography or portraits exist yet, and stock wellness imagery is forbidden.
Rather than ship binaries that risk looking like clichés — or fake people — photographic slots
use intentional duotone/plate/typographic compositions that read as design, are swappable via
one data field, and keep the build fast and fully offline. Real public-domain archival imagery
is used where it is genuinely available (the Library).

## Polish pass (final)
- Removed the dev-only `/styleguide` route and the temporary `PagePlaceholder` component before
  delivery. No scratch artefacts remain in the shipped app.
- Added `app/sitemap.ts` (all static routes + every dynamic detail slug from the loaders, with
  `/connect/sangha` deliberately excluded) and `app/robots.ts`.
- Added Organization JSON-LD in the root layout, using only facts stated in the client material.
- Strengthened the test suite to 29: added a discover-slug global-uniqueness test (so the shared
  `/discover/[slug]` route always resolves) and badge-never-blurred assertions across all sample
  content.
- `metadataBase`, the sitemap base and the JSON-LD `url` use the placeholder domain
  `https://yogamandala.example`. Swap to the real domain once it exists (client item A5). This is
  the only place the domain is hardcoded.

## Known Phase-A limitations (by design)
- Photographic slots are art-directed placeholders (`ArtPlate`), not real photography — see
  `04-asset-strategy-and-credits.md`. Real community photography (D8/D9) replaces them via content
  fields, with no layout change.
- Forms (Join, Submit) validate but do not send — submission processing, moderation and email are
  Phase B. The non-functional state is clearly labelled on every form.
- `/connect/sangha`, appeals process, privacy/terms/contact copy, founding story, who-runs-it, the
  Pranava wording and the two continuity administrators are all shown as honest pending states,
  not invented — tracked in `07-client-data-needed.md`.