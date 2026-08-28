# P00 — Global Shell

**Applies to:** every route · **Status:** 🟢 Build now (logo is the only soft dependency)
**Framework source:** §4 navigation · §5 footer spec · §17 UX priorities

---

## 1. Purpose

The shell is what makes 26 separate pages feel like one website. Framework §17 asks for "clear navigation" and "minimal clicks for common actions", and the site must read as calm and scholarly from the first frame.

---

## 2. Header

**Locked nav (§4, verbatim):** `Home · Learn · Connect · Collaborate · Events · Discover · About · Join / Submit`

**Design.** Not a generic navbar. A hairline-ruled editorial masthead.

- **Over the hero:** fully transparent, `paper`-coloured text, 1px `paper`-at-20% rule along the bottom
- **On scroll past 80vh:** transitions over 480ms to `paper` background, `ink` text, `brass` hairline rule, subtle backdrop blur. Height reduces 96px → 68px
- **Wordmark left** — "YOGA MANDALA" in the display face, tracked +0.14em, small caps scale. Replaced by the real logo when supplied
- **Nav centre-right**, `label` type, uppercase, tracked. Hover: a 1px `clay` rule draws left-to-right beneath the item over 240ms
- **`Join the Sangha`** is the only nav item rendered as a button — ghost hairline over hero, solid `indigo` after scroll
- **Learn and Connect** open a mega-panel on hover/focus (desktop): child links on the left, one editorial image on the right that swaps as you move between links. This is the one place a small flourish earns its place — it previews the section's character before you enter it

**Mobile.** Full-screen overlay, not a slide-down list. Nav items set at `display-m`, stacked, left-aligned, generous leading. Background `indigo-deep`. Items fade-and-rise in sequence at 60ms intervals. A single full-bleed image occupies the lower third. Close is a hairline X, top right.

---

## 3. Footer

**Framework §5:** *"Footer with community links, governance/contact and submission links."*

Ground `indigo-deep`, text `paper`. Four columns desktop, stacked mobile.

| Column | Contents |
|---|---|
| 1 — Identity | Wordmark · "Learn. Connect. Collaborate. Serve." · one-sentence description · location line |
| 2 — Explore | Learn · Connect · Collaborate · Events · Discover |
| 3 — Participate | Join the Sangha · Submit an Event · Submit a Learning Opportunity · Submit a Resource · Submit a Community Listing |
| 4 — Governance | About · Community Principles · Community Guidelines · Governance & Ownership · Privacy · Terms · Contact & Moderation |

**Base bar:** © line · a single-line neutrality statement drawn from §2 · WhatsApp link if supplied.

The framework treats governance as a first-class value (§15), so governance links sit in the footer at equal weight to everything else — not buried in fine print.

---

## 4. Cross-page systems

**Page transitions.** A `paper` wipe from the bottom, 480ms, on route change. Content fades-and-rises 16px behind it. Disabled under `prefers-reduced-motion`.

**Scroll reveal primitive.** One shared observer: elements enter at `opacity 0 / translateY 24px` → settle over 480ms with `ease-standard`. Fires once. Never re-triggers.

**Section label primitive.** Every major section opens with a `label`-type marker above a brass hairline — e.g. `— LEARNING`. This is the connective tissue that lets compositions differ wildly while still feeling like one publication.

**404.** Full-bleed archival plate, large display type, three suggested routes. Not an error page — a detour.

**Skip link, focus management on route change, landmark regions.** Required by §17's accessibility priority.

---

## 5. Assets

| Slot | Source | Treatment |
|---|---|---|
| Mega-panel image × 2 (Learn, Connect) | Stream B documentary | T2 editorial inset |
| Mobile menu image | Stream B | T1 full-bleed |
| 404 image | Stream A archival | T6 archival plate |

---

## 6. Responsive

| Breakpoint | Header |
|---|---|
| ≥1200px | Full nav, mega-panels |
| 768–1199 | Condensed nav, no mega-panels — child links on the hub pages instead |
| <768px | Wordmark + menu trigger only; full-screen overlay |

---

## 7. Client data required

| # | Item | Blocking | Interim |
|---|---|---|---|
| A1 | Logo / wordmark file | Soft | Wordmark set in Erode |
| A5 | WhatsApp group link — should it be public in the footer? | No | Omitted until confirmed |
| B4 | Location line for the footer identity block | No | Omitted |
| C6 | Contact + moderation email | No | Link routes to `/about/contact` |

---

## 8. Buildable now

Everything. The nav labels come from the locked sitemap, the footer structure from §5, and the wordmark can be set typographically until a logo exists.

## 9. Acceptance criteria

- [ ] Header transition is smooth and never causes layout shift
- [ ] Full keyboard operation, including mega-panels (Esc closes, focus trapped in mobile overlay)
- [ ] Footer contains every governance link from §22's launch content list
- [ ] Wordmark swaps to a real logo via one asset change
- [ ] No layout shift on route transition
