# 02 — Design System · "The Living Manuscript"

A fresh visual language, built from scratch for this project. It is grounded in the
client's own promotional artifact (warm sand, deep forest green, gold) and in the
framework's brief (§17), and is deliberately **distinct** from any prior build.

> **Framework brief (§17), verbatim.**
> Desired feeling: "Calm · Scholarly · Human · Warm · Indian without stereotypical decoration · Contemporary but not corporate · Trustworthy · Community-led."
> Avoid: "Aggressive sales language · Course-marketplace aesthetics · Too many banners/pop-ups · Excessive animation · Spiritual clichés · Generic wellness stock imagery · Gamification."

---

## 1. The governing idea

**A living manuscript** — the calm authority of a scholarly journal, warmed by the vitality
of a growing community of teachers. Growth and "Indianness" are expressed through
**provenance and composition**, never through ornament: warm handmade-paper grounds,
real public-domain manuscript plates, Devanagari set correctly as text, and botanical
warmth in colour — not lotuses, oms, mandalas, saffron gradients or sunset silhouettes.

When in doubt, choose the more restrained, more typographic, more editorial option.

## 2. Colour

Derived from the client artifact (cream / forest / gold) rather than a wellness palette.

| Token | Hex | Use |
|---|---|---|
| `sand` | `#F3EEE3` | Primary ground — warm handmade-paper ivory |
| `sand-deep` | `#E7DFCE` | Alternating grounds, insets |
| `bark` | `#211E19` | Primary text — warm near-black |
| `bark-soft` | `#5C574C` | Secondary text |
| `forest` | `#26402C` | Primary accent — dark sections, footer, emphasis |
| `forest-deep` | `#182A1D` | Immersive full-bleed sections |
| `terracotta` | `#B4562E` | Single warm accent — hover / active / links. **Sparing.** |
| `gold` | `#A6853F` | Hairline rules, small marks, badges — **never fills** |
| `moss` | `#7C8A63` | Tertiary — category differentiation only |

**Rules.** Sand is the default ground; forest sections are punctuation that give the
scroll a rhythm of light and dark. Terracotta appears at most twice per viewport. Gold is
1px lines and small marks only. No gradients anywhere except a subtle image scrim.
`bark` on `sand` clears WCAG AA comfortably (~13:1).

## 3. Typography

Zero budget — all fonts free for commercial use, self-hosted at build time via `next/font`.

| Role | Typeface | Why |
|---|---|---|
| Display / headings | **Fraunces** (variable, opsz/SOFT/WONK) | A warm optical literary serif with real character; expressive at large sizes, calm at small. |
| Body / UI | **Inter Tight** (fallback Hanken Grotesk) | Humanist, warm, highly readable at small sizes. |
| Sanskrit / Devanagari | **Tiro Devanagari Sanskrit** | Designed for setting Sanskrit correctly; used for real terms, never decoration. |
| Metadata / labels | Inter Tight, uppercase, tracked +0.14em, 12px | Section labels, dates, badges, filters. |

### Type scale (fluid, `clamp` desktop → mobile)

`display-xl` (96→44px) · `display-l` (64→34px) · `display-m` (44→28px) · `title` (28→22px)
· `lead` (22→18px) · `body` (17→16px) · `small` (15px) · `label` (12px, tracked).

**Rules.** Line length 62–72ch, never wider. Display sets tight (line-height 0.98–1.06,
tracking −0.02em). Body sets generous (1.65). Tabular numerals in metadata. Never centre a
paragraph longer than two lines.

## 4. Spacing, grid, layout

- Base 8px. Section rhythm uses `section` (~200px), `section-md` (~144px), `section-sm` (~96px)
  deliberately out of order so the page breathes unevenly.
- 12-col desktop / 6 tablet / 4 mobile; gutter 24px; max content 1440px; text capped ~672px.
- **Asymmetry is the default.** Content sits off-centre more often than centred; full-bleed
  images break the grid on purpose. Whitespace is a feature — sections may be mostly empty.

## 5. Image treatment vocabulary

A fixed named set. Each page names which it uses; **no two adjacent sections repeat one, and
no page uses one more than twice.**

| # | Treatment | Description |
|---|---|---|
| T1 | Full-bleed + scrim | Edge to edge, viewport height, type overlaid on a forest-deep scrim |
| T2 | Editorial inset | Image 5–7 cols, offset, generous space opposite |
| T3 | Layered pair | Two images overlapping with a 24–40px offset, differing scales |
| T4 | Type-crossing | Display type crosses in front of / behind the image |
| T5 | Column strips | Tall narrow crops (2:5) in a row at varied vertical offsets |
| T6 | Archival plate | Manuscript/illustration on sand with a gold hairline frame + caption |
| T7 | Arch mask | Image inside a soft arch (manuscript-niche reference) — **≤2 sitewide** |
| T8 | Scroll-scrubbed | Image scale/position driven by scroll within its section |
| T9 | Horizontal rail | Side-scrolling row of varied-width images |
| T10 | Duotone ground | Image reduced to forest/sand duotone behind text at low contrast |

**Global image rules.** Subtle grain overlay (3–5%) on photographs to unify sources; warm
grade toward sand temperature; no drop shadows; radii ≤4px except T7; captions in `label`
style, gold-ruled.

## 6. Motion

Slow, few, always in service of calm. Framework forbids "excessive animation".

| Token | Value |
|---|---|
| ease | `cubic-bezier(0.22, 1, 0.36, 1)` |
| fast | 240ms (hovers) |
| base | 480ms (reveals) |
| slow | 900ms (hero, section transitions) |

**Permitted:** fade-and-rise reveals (16–24px, once, never re-trigger); image mask-wipes on
entry; scroll parallax capped at 12% travel; horizontal rails; one slow marquee sitewide;
hover scale ≤1.03. **Forbidden:** bounce/elastic, spinning, letter-by-letter body text,
autoplaying carousels, anything that re-animates on every scroll pass, parallax on mobile.

**`prefers-reduced-motion: reduce`** disables all transform/scroll animation and keeps opacity
fades at ~120ms. Non-negotiable.

## 7. Components

Deliberately few — novelty lives in composition, not a component zoo.

`Button` (solid forest / ghost hairline) · `Badge` (the four fixed badges) · `FilterChip` ·
`MetadataRow` · `Rule` (gold hairline) · `Caption` · `SectionLabel` · `PullQuote` ·
`EntryLink` (title + meta, no box). **There is no generic Card component** — index pages
compose entries from type, image treatment and rules. This is the main guard against a boxy site.

Badge colours are fixed and semantic (and always carry text, never colour-only):
`Yoga Mandala Learning Initiative` → forest fill · `Curated Community Listing` → gold hairline
· `Community Listing` → moss hairline · `Partner / Guest` → bark hairline.

## 8. Accessibility

WCAG 2.2 AA. Visible focus rings (2px terracotta, 2px offset). Targets ≥44px. Full keyboard
operability for filters, rails, menus and mega-panels. Alt text on every content image;
decorative images `aria-hidden`. Reduced-motion honoured. No information by colour alone.

## 9. Performance budget

LCP < 2.5s on 4G, CLS < 0.1. AVIF/WebP with responsive `srcset`; explicit width/height;
only the hero is priority-loaded; everything below the fold lazy. Fonts self-hosted with
`font-display: swap`. Total JS kept lean; motion library loaded only where used.
