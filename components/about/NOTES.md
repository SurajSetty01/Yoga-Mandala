# Page 1 — sections 03 to 07

The hero and section 02 were finished. These are the five beneath them. The failure this page
had to avoid was named in the brief and is visible in the previous build: five prose blocks in
a row become a cream text column. So each block was asked what **shape** it wants, and the
answers had to differ. No two neighbours share a ground, and no section here reuses the hero's
language (a sticky sequence, type inside the picture) or section 02's (four narrow stills in a
row with type beside them).

| # | Idea | Ground | Media |
|---|------|--------|-------|
| 03 · premise | A two-column spread with a hairline down the middle. Deliberately mute. | `--ground-warm` | none |
| 04 · purpose | A **mandala**: four quadrants around a centre, the rules broken where the lead sits. | `--ground-deep` | none |
| 05 · approach | An **aside** — the only block pushed right, with a clay change-bar in the margin. | `--ground` | none |
| 06 · members | The headline **is** a photograph: one frame edge to edge carrying no type at all. | `--ground-warm` | `p13-img_0617` |
| 07 · guiding | One sentence, centred, at the page's top scale. The only centred thing on the page. | `--ground-deep` | none |

Continuity is `.ab-eyebrow` (the same object as `.within__eyebrow`, same size, tracking and
clay numeral), the type scale, the tokens and the shared `[data-r]` reveal. Novelty is
composition and ground.

## The two repeated sentences

**`about.members.lines[3]` — "Everyone has something to learn. Everyone has something to
contribute."** is already section 02's display headline, about 1,200px up this same page. It is
**not printed again.** Section 06 keeps the three lines that exist only there — the refusal,
the pivot, the one that makes the pivot concrete — and lets the line land where it already
lands hardest, at 49.6px. Printing the page's best sentence twice spends it twice and flattens
both. Nothing is paraphrased, nothing added; one line is simply not repeated.
(Rejected: giving 06 the line at a smaller size — that is the same words demoted. Rejected:
folding 06 into section 02 — section 02 is finished and not mine to edit.)

**`about.opening[1]`** has the opposite problem: it is circled twice before you reach it. The
hero's `<h1>` is drawn from it, and section 02 signs off by whispering its first sentence in
italic at 21.6px. Here it is set **whole and unsplit** at 41.6px in full ink. The escalation is
entirely typographic — no string surgery, no emphasis picked out inside a client sentence — so
the sentence arrives rather than repeats.

## Why the four purposes are not a list

They must not look like two other things: section 02, directly above, is *already* four names
in a row above four narrow stills, and page 2's pillars are a numbered 01–04 register with
lists under each. So this set is **unnumbered, radial, reversed out**, and its names are
Fraunces **roman** at 37.6px where section 02's are Fraunces *italic* at 25.3px. Same family,
nothing else shared. `Connect · Learn · Collaborate · Grow` — page 2 ends on *Share*; the two
lists are different and both are the client's.

Built mobile-first: the base is a stacked column and the quadrants only exist from 861px, so
there is no `!important` in the block. The lead is definitely placed into the middle row and
the four quadrants auto-fill around it, which keeps the markup lead-then-items. Headings, not
a `<ul>` — `display: contents` on a list drops list semantics in some screen readers.

## Rejected

- **A third dark plate for the premise.** Three reversed sections plus the hero is a page that
  is mostly dark; the premise went to warm and the deep ground was kept for the two that earn
  it.
- **A picture in 03.** Four stills have just gone past. The silence is what makes 06 land.
- **The `texture` stills** (`ss-ven0024–0028`, `ss-ven0165`): an art exhibition, a cafe truck
  cab. Decorative filler that says nothing about a teaching community.
- **The dance frames.** Highest-scoring in the archive, but a Bharatanatyam performance. This
  page never establishes the festival context, so they are never used.
- **`ss-ven0092` for the full-bleed plate.** Same hall as all three hero clips. `p13-img_0617`
  is a second room — teachers sitting in a ring listening to one of their own, which is what
  the heading actually says — so the page shows two places rather than one.
- **Onward links in these sections.** The hero owns the primary action and the footer follows
  immediately; a third CTA between them would compete with both. These sections contain no
  focusable elements at all.
- **Centring the measure.** At 2560 a centred column steps ~470px away from the left edge the
  hero and section 02 share. `.ab__inner` hangs off the left rail instead. The mandala and the
  closing sentence are the exceptions — a mandala whose centre is not the page's centre is not
  a mandala — so those two centre themselves within a 104rem cap.

## Also changed

`app/page.tsx` — the `.tail` spacer (42svh of cream that held the bottom of the page open while
there was nothing under section 02) is removed. There is a page under it now, and it would have
left a stripe of paper between the closing dark plate and the footer.

## Measurements

`tools/contrast-probe.mjs` at **320×568, 390×844, 768×1024, 1024×768, 1280×720, 1440×900,
2560×1440 — 0 FAIL at every size.** That tool measures only the first viewport, so the whole
document was also walked with the same glyph-mask algorithm at the same seven sizes, against
the **production `out/` build** — again **0 FAIL at every size**, 40–42 painted runs each.

Worst runs in these sections (p5, glyph-accurate, need 4.5 small / 3.0 large):

| run | measured |
|---|---|
| `--clay-deep` 13px numeral on `--ground-warm` | **5.31:1** |
| `--teal-deep` 11.5px eyebrow on `--ground-warm` | **6.17:1** |
| `--ink-soft` 16.1px body on `--ground-warm` | **6.48:1** |
| `--ink-soft` 17.6px body on `--ground` | **7.30:1** |
| cream + cream-at-0.72 on `--ground-deep` | **16.66:1** |

Two dev-only artefacts cost time and are worth recording: measuring while scrolling picks up
(a) text passing under the translucent, backdrop-blurred nav pill and (b) text passing under
the Next devtools badge, both of which read as contrast failures that no reader experiences.
Neither appears in the production export.

Also asserted at all seven sizes: no horizontal overflow (`scrollWidth === innerWidth`),
exactly one `<h1>`, 8 images all with real `alt`, no console/page errors, no failed requests.
`prefers-reduced-motion: reduce` renders the complete page, identical but static.
`npx tsc --noEmit`, `npx next build` and `npm run check:copy` (73 sentences) all pass.

## Two things found, not fixed — they are not in this agent's files

1. **Nothing adds the `js` class to `<html>`.** The design workspace's `hero.js` did; the Next
   port dropped it. So `.js .hero { height: 250svh }`, `.js .within { margin-top: -46svh }` and
   every `.js [data-r]` reveal are inert: the hero renders as one screen with its static
   provenance caption instead of the three-movement sticky sequence, and nothing on the page
   animates in. The choreography module itself still runs (the clips load and play), it simply
   has `range = 1` to work with. The fix belongs in `app/layout.tsx` or a hero client island.
   These five sections are correct either way — they read as complete with the class absent and
   reveal normally once it is present.
2. Under `output: 'export'`, `<Link>` prefetches request `/join/__next.join.__PAGE__.txt` while
   the export writes `out/join/__next.join/__PAGE__.txt`. Harmless (navigation still works) but
   it is a 404 per nav link on a static host. Site-wide, not page-1 specific.
