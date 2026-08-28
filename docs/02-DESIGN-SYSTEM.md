# 02 — Design System

**Status:** Proposal. Locks after one review round with the client. Everything here is reversible *before* page building starts and expensive after.

The framework's brief (§17), verbatim:
> **Desired feeling:** "Calm · Scholarly · Human · Warm · Indian without stereotypical decoration · Contemporary but not corporate · Trustworthy · Community-led"
> **Avoid:** "Aggressive sales language · Course-marketplace aesthetics · Too many banners/pop-ups · Excessive animation · Spiritual clichés · Generic wellness stock imagery · Gamification for shallow engagement"

---

## 1. The governing idea

**A scholarly journal that happens to be about Yoga — not a wellness brand.**

The nearest reference points are academic presses, archive catalogues and editorial magazines, not studio websites. This single decision resolves most design questions: when in doubt, choose the more restrained, more typographic, more archival option.

"Indian without stereotypical decoration" is solved through **provenance, not ornament** — Indian type design, indigo and paper colour derived from Indian textile and manuscript traditions, real archival manuscript imagery, Devanagari set properly as text rather than used as decoration. Never: mandalas as background patterns, lotus icons, om symbols, saffron gradients, silhouettes at sunset.

---

## 2. Typography

Typography carries the identity. Budget: zero — all fonts below are free for commercial use.

| Role | Typeface | Source | Why |
|---|---|---|---|
| **Display / headings** | **Erode** | Fontshare (Indian Type Foundry) | A contemporary literary serif with real character. Indian foundry — provenance without ornament. |
| **Body / UI** | **Satoshi** | Fontshare (ITF) | Neutral, warm geometric sans. Highly readable at small sizes. |
| **Sanskrit / Devanagari** | **Tiro Devanagari Sanskrit** | Google Fonts | Designed specifically for setting Sanskrit; scholarly and correct. Used for actual Sanskrit terms, never as decoration. |
| **Metadata / labels** | Satoshi, uppercase, tracked +0.08em, 11–12px | — | Section labels, dates, badges, filters |

**Alternates if the client rejects the above:** display → *Gambarino* (ITF) or *Newsreader* (Google); body → *Switzer* (ITF) or *Literata* (Google).

### Type scale (desktop → mobile)

| Token | Size | Use |
|---|---|---|
| `display-xl` | 96 → 44px | Homepage hero word, section openers |
| `display-l` | 64 → 34px | Page titles |
| `display-m` | 44 → 28px | Section headings |
| `title` | 28 → 22px | Card / entry titles |
| `lead` | 22 → 18px | Standfirst paragraphs |
| `body` | 17 → 16px | Running text |
| `small` | 15 → 14px | Secondary text |
| `label` | 12 → 11px | Metadata, uppercase, tracked |

**Rules.** Line length 62–72 characters, never wider. Display type sets tight: line-height 0.95–1.05, letter-spacing −0.02em. Body sets generous: line-height 1.65. Numerals in metadata use tabular figures. Never centre a paragraph longer than two lines.

---

## 3. Colour

Derived from Indian manuscript, indigo dye and brass — not from wellness palettes.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F4F1E9` | Primary background — warm, aged-paper ivory |
| `paper-deep` | `#EAE5D9` | Alternating section grounds, cards |
| `ink` | `#1A1917` | Primary text, near-black with warmth |
| `ink-soft` | `#55524B` | Secondary text |
| `indigo` | `#26354F` | Primary accent — Indian indigo dye. Dark sections, footer, emphasis |
| `indigo-deep` | `#161F2E` | Immersive full-bleed sections |
| `clay` | `#9C4A2A` | Single warm accent — links on hover, active states, badges. **Used sparingly.** |
| `brass` | `#A98B52` | Hairline rules, dividers, small marks only — never fills |
| `sage` | `#6E7A62` | Tertiary; category differentiation only |

**Rules.** Paper is the default ground; indigo sections are punctuation, not the norm. Clay appears at most twice per viewport. Brass is 1px lines only. **No gradients** anywhere except a subtle image scrim. Body text on paper must clear WCAG AA (`ink` on `paper` ≈ 14:1 — comfortable).

**Dark sections** invert to `indigo-deep` ground with `paper` text — used for immersive full-bleed moments and the footer, giving the scroll a rhythm of light and dark.

---

## 4. Spacing, grid, layout

- **Base unit 8px.** Scale: 8 / 16 / 24 / 40 / 64 / 96 / 144 / 200.
- **Grid:** 12 columns desktop, 6 tablet, 4 mobile. Gutter 24px. Max content width 1440px; text columns capped at 720px regardless.
- **Section rhythm:** vertical padding alternates deliberately — 200px, then 96px, then 144px — so the page breathes unevenly rather than metronomically.
- **Asymmetry is the default.** Content sits off-centre more often than centred. Full-bleed images break the grid on purpose.
- **Whitespace is a feature.** Sections are permitted to be mostly empty. Do not fill the viewport out of habit.

---

## 5. Image treatment vocabulary

A fixed set of treatments. Each page doc names which it uses, so no two consecutive sections repeat one.

| # | Treatment | Description |
|---|---|---|
| T1 | **Full-bleed** | Edge to edge, viewport height, type overlaid |
| T2 | **Editorial inset** | Image occupying 5–7 columns, offset, generous space opposite |
| T3 | **Layered pair** | Two images overlapping with a 24–40px offset, differing scales |
| T4 | **Type-crossing** | Display type crosses in front of or behind the image |
| T5 | **Column strip** | Tall narrow crop (2:5), used in a row of three at varied vertical offsets |
| T6 | **Archival plate** | Manuscript/illustration on paper ground with a hairline brass frame + caption in `label` |
| T7 | **Masked shape** | Image inside an arch or soft-cornered rectangle — arch referencing temple/manuscript niches, used at most twice sitewide |
| T8 | **Scroll-scrubbed** | Image scale/position driven by scroll position within its section |
| T9 | **Horizontal rail** | Side-scrolling row of varied-width images |
| T10 | **Duotone ground** | Image reduced to indigo/paper duotone, used behind text as texture at low contrast |

**Global image rules.** Grain overlay at 3–5% opacity on every photograph to unify sources. Warm colour grade toward the paper temperature. No drop shadows. No rounded corners above 4px except T7. Captions in `label` style, brass-ruled above.

---

## 6. Motion

The framework says avoid "excessive animation". Motion is slow, few, and always in service of calm.

| Token | Value |
|---|---|
| `ease-standard` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `dur-fast` | 240ms — hovers |
| `dur-base` | 480ms — reveals |
| `dur-slow` | 900ms — hero, section transitions |

**Permitted:** fade-and-rise reveals (16–24px, once, never re-triggering); image mask-wipes on entry; scroll-scrubbed parallax capped at 12% travel; horizontal rails; marquee at a slow constant speed for a single element sitewide; hover scale ≤1.03 with a 600ms ease.

**Forbidden:** bounce/elastic easing, spinning, staggered letter-by-letter animation on body text, autoplaying carousels that move on their own, anything that re-animates on every scroll pass, parallax on mobile.

**`prefers-reduced-motion: reduce`** disables all transform/scroll animation and keeps opacity fades at 120ms. Non-negotiable — the framework requires accessible design (§17).

---

## 7. Components

Deliberately few. Novelty lives in composition, not in a component zoo.

`Button` (primary solid indigo / ghost hairline) · `Badge` (the four §10 badges, fixed colours) · `Filter chip` · `Metadata row` · `Hairline rule` · `Caption` · `Section label` · `Pull quote` · `Entry link` (title + meta, no box)

**There is no generic "Card" component.** Index pages compose entries from type, image treatment and rules. This is the main structural guard against a boxy site.

Badge colours are fixed and semantic:
`Yoga Mandala Learning Initiative` → indigo fill · `Curated Community Listing` → brass hairline outline · `Community Listing` → sage hairline outline · `Partner / Guest` → ink hairline outline

---

## 8. Accessibility

WCAG 2.2 AA. Visible focus rings (2px clay, 2px offset). All interactive targets ≥44px. Full keyboard operability for filters, rails and menus. Horizontal rails need keyboard and visible affordances, never scroll-only. Alt text on every content image; decorative images marked `aria-hidden`. Reduced-motion honoured. No information conveyed by colour alone — badges always carry text.

---

## 9. Performance budget

Framework §17: "Fast loading". Targets: LCP < 2.5s on 4G, CLS < 0.1, total JS < 180KB gzipped.

AVIF with WebP fallback · responsive `srcset` at 480/768/1200/1920 · explicit width/height on everything · only the hero image is priority-loaded · everything below the fold lazy · fonts self-hosted, `font-display: swap`, subset to Latin + Devanagari as needed · hero video ≤ 3MB, muted, `playsinline`, poster frame, never on mobile.

---

## 10. Open — needs client input

| # | Item | Blocking? |
|---|---|---|
| 1 | Logo / wordmark — does one exist? | **Yes** for header build |
| 2 | Any existing brand colours or typefaces to respect | Yes |
| 3 | Approval of the paper/indigo/clay/brass direction | Yes |
| 4 | Whether Devanagari appears in the interface at all | No — defaults to sparing use |
| 5 | Photography: is any real community photography available? | No — placeholders until it is |
