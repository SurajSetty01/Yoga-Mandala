# Concept A — **THE ROOM**

> Premise: **the page is a place, and the reader moves through it.**

Not five sections. **One traverse of one room.** The p13 frames are a single shala — dark
wooden floor, white walls, red ceiling slings, a rope wall, windows at the far end —
photographed from eight positions. That is what makes a journey possible instead of a stack:
the reader steps in through a lit doorway, walks the length of the room past four things
standing in it, stops at its quietest point, watches it fill with people, and walks out into
the light. One dark ground the whole way, one cream arrival at the end.

Route: `/preview/about-a/` · `components/preview/about-a/` · `styles/preview-about-a.css`

---

## One sentence per section

| # | client content | the mechanic |
|---|---|---|
| 1 | `about.opening` | **A lit doorway, far off in a dark wall, grows until you are standing inside it** — `opening[0]` is the inscription you read before you go in, the founding premise arrives at the moment you cross the threshold, and `opening[2]` is read from inside. |
| 2 | `about.purpose` | **Four things standing at four distances**, not four items: Connect is nearest and largest, Learn and Collaborate recede as you pass them, and **Grow** breaks the recession because it is the far end you arrive AT rather than pass — which is also the client's own emphasis. |
| 3 | `about.approach` | **The held breath — the only stretch of the page with no photograph in it at all.** A community that represents no single school, lineage or methodology is shown a room with nothing in it to look at. The thread that runs down the whole traverse is absent here too. |
| 4 | `about.members` | **The room fills.** Three positions of the same place arrive overlapping at three depths, so the emptied space becomes crowded with itself. Built by its members: the members ARE the room's contents. |
| 5 | `about.guiding` | **Arrival.** The cream is not a section — it is the light at the far end, and it rises over the pinned room because it is in normal document flow while the room is not. No JavaScript is involved in the arrival at all. |

`about.members.lines[3]` — *"Everyone has something to learn. Everyone has something to
contribute."* — is **not printed**. On the real page it is already the approved section 02's
display headline about 1,200px above this. Printing the page's best sentence twice spends it
twice. Nothing paraphrased, nothing added; one line simply lands where it already lands
hardest.

---

## How the depth is built

Three layers, and the words are the middle one:

```
.aa-far      sticky, height 0, z 0   → the room behind the words
.aa-interior                     z 2 → its own stacking context
   .aa-near  sticky, height 0, z 3   → the room's foreground, IN FRONT of the words
   .aa-path                      z 2 → every word, in normal document flow
.aa-arrival                      z 4 → the cream, which therefore covers everything
```

* **Height 0 is deliberate.** A sticky box stays pinned only while its own bottom edge is
  inside its container, so a zero-height box stays pinned for the container's whole length.
  Its `100svh` children overflow it and paint over the viewport.
* **`.aa-space`** is an `overflow: clip` box the size of the viewport inside each sticky layer.
  Planes are bled past its edges on purpose (a doorway scaled to 6×, a plane hung off the
  right); this is what stops that bleed becoming page overflow. It clips a *child* of the
  sticky element, never the sticky element itself, so pinning is untouched. `overflow: clip`
  is not a scroll container, which `hidden` would have been.
* **`.aa-arrival` is a later sibling at a higher level**, so no foreground plane can ever be
  caught on top of the light at the far end. That is a structural guarantee, not a timing one
  — the first build got it wrong by timing and a photograph sat on top of the closing
  sentence.
* **No photograph is a rectangle.** Every plane but the doorway is masked with a radial
  gradient anchored to the corner it is bled into, so it dissolves into the dark on every
  edge. The doorway keeps one hard edge and a sand hairline, because a door has one.

## Contrast, by measurement not by taste

Cream (`--ink-onPic`) over the room's brightest pixel — the window at the far end, effectively
`#FFF` — needs the composited ground below **L 0.165** to clear 4.5:1, i.e. an alpha of 0.59
on its own. A constant **`.aa-veil` at 0.50**, plus a **`.aa-pool`** anchored left/top/bottom
where the reading column actually is, walks the whole document clean with 5.85:1 to spare at
the worst. 0.62 was tried first and measured **7.3:1 at its worst across the entire page** —
it was spending picture for contrast it did not need, so it came back down and the room got
its light back. Both are constants; neither is a gradient tuned per viewport, which is the
trap `DESIGN-SYSTEM §1` records.

**Compositional rule that falls out of it:** body copy lives in the scrimmed left band; only
display type crosses into the bright middle-right, where the picture lives and where large
type needs only 3.0:1.

---

## Tried and REJECTED

**`p13-img_0610`, the rope wall, for the held breath.** It is the archive's most beautiful
quiet texture and it was the obvious pick. It is also the only frame that is unmistakably ONE
school's method — a rope-wall inversion on a chair — and it would have sat directly under the
sentence *"not intended to represent one particular school, lineage, organisation or
methodology."* Cropping to ropes-only would have worked until one viewport cropped
differently. It is also absent from the curated `stills.json`. Cut, and cutting it produced
the better idea: **the approach gets no photograph at all.**

**A second venue.** `ss-ven0056` / `ss-ven0092` (the festival hall with the skylight and red
trusses) would have given a "look up at the light" arrival. They are a *different place*, and
a page whose premise is that it IS a place cannot cut to another venue halfway through. The
hero already owns that hall.

**The dance frames.** Highest-scoring in the archive, a Bharatanatyam performance, and this
page never establishes the festival context. Never used.

**A curtain: two cream leaves parting to reveal the room.** Transform-only and easy, but it
reads as theatre, not architecture, and the cream leaves would have had to carry body copy
that then had nowhere to go once they left. Replaced by the doorway that grows — the same
"you go in", with the page's own dark as the wall.

**Numbered eyebrows (`03 WHY WE BEGAN`, `04 OUR PURPOSE` …).** Continuity with
`.within__eyebrow` is real, but a number reasserts "these are five sections", which is the one
thing this concept argues against. The marker keeps the eyebrow's *material* — same size,
weight, tracking, uppercase — and swaps the clay numeral for a sand tick. The labels
themselves are the client's own `heading` strings.

**Occlusion under reduced motion.** In the still room the near layer drops **behind** the
words (`z-index: 0`). Occlusion is something the camera does; with the camera stopped it is
just content covered up, which is exactly what reduced motion must never produce.

**A provenance caption.** Every picture on this site carries one. The p13 frames' venue is not
recorded in `public/media/stills.json`, and `DESIGN-SYSTEM §4` forbids inventing one, so these
planes carry none.

**An onward link.** The hero owns the primary action and the footer follows immediately. There
are no focusable elements in this section at all.

**A custom cursor.** Considered for the "camera" reading and dropped before it was written: it
would draw attention to itself rather than to the room, and it is dead on touch.

**Splitting `opening[1]` at its sentence boundary** to set the thesis huge and the rest small.
It is the client's paragraph; it is set whole, and the escalation is purely typographic.

---

## Interaction decisions

* **Scroll-driven, never scroll-jacked.** The reader's scroll position is never written to.
  No wheel or touch interception, no snapping.
* **One passive `scroll` listener** that raises a flag; every read of `scrollY` and every style
  write happens inside a single `requestAnimationFrame`. Geometry is measured on load and
  resize only.
* **Only `transform` and `opacity`** are ever written. Masks, grounds and gradients are static
  CSS.
* **Timings are fractions of the REAL measured stations**, not guessed fractions of the
  section, so the station heights in the stylesheet can be retuned without touching a number in
  the JavaScript. The one timing that matters most — the foreground clearing out before GROW —
  is derived from `.aa-thing--4`'s own measured position, because occlusion is only worth
  having if the thing occluded is readable when you reach it.
* **The doorway's start and end scale are derived from the measured box**, so a 320px portrait
  phone and a 2560px desktop both get a door that is ~42% of the screen wide when far away and
  larger than the viewport when you are through it.
* **Reveals** use the proven opt-in pattern: everything already on screen is marked revealed
  *before* the class that creates the reveal's start state exists, and the whole reveal is
  scoped to `.aa-live`, so a reader whose JavaScript never arrives keeps the entire page.
  Nothing observed is clipped — Chromium computes an IntersectionObserver's rect after clips.
* **`prefers-reduced-motion: reduce`** takes an early exit and adds `.aa-still`; **no JS at
  all** reaches the same styles through `html:not(.js)`. Both anchor each plane to its own
  station and stop the camera. The composition — bled, masked, overlapping — survives, because
  the composition was never the animation.
* **`--aa-at` is a percentage of the traverse, not a number of viewport heights.** The stations
  do not occupy the same number of viewports on a phone as on a desktop, and an svh anchor put
  the still room's pictures in the wrong stations at 390px.

## Two bugs worth recording

1. **An absolutely positioned box with neither `left` nor `right` shrink-to-fits.** In the
   still room `.aa-far` became `position: absolute` with only `top`/`height` set; its only
   child is itself absolute, so it collapsed to **zero width**, and `overflow: clip` on the
   walls then hid the entire still room. It rendered as an empty dark page for every
   reduced-motion reader and looked perfectly fine in the source. Caught only by reading the
   PNG.
2. **`min(-29vw, -13rem)` picks the MORE negative value.** Half of `min(58vw, 26rem)` is
   `max(-29vw, -13rem)`. The wrong one pushed the doorway off the left edge of every narrow
   viewport.

---

## Measurements

**`node tools/contrast-probe.mjs` at 320×568, 390×844, 768×1024, 1024×768, 1280×720, 1440×900,
2560×1440 — 0 FAIL at every size.**

That tool measures only the first viewport, and this concept puts type on a moving photograph,
so the whole document was also walked with the same glyph-mask algorithm, stepping 0.42 of a
viewport at a time and skipping anything mid-reveal:

| viewport | painted runs | FAIL | worst measured (needs 4.5 small / 3.0 large) |
|---|---|---|---|
| 320×568 | 66 | **0** | 5.85:1 — `Discover authentic learning opportunities,` |
| 390×844 | 60 | **0** | 5.97:1 — `Support one another in becoming better tea` |
| 768×1024 | 61 | **0** | 7.30:1 — `Our Guiding Thought` (ink-soft on cream) |
| 1024×768 | 60 | **0** | 7.30:1 |
| 1280×720 | 63 | **0** | 7.30:1 |
| 1440×900 | 54 | **0** | 7.30:1 |
| 2560×1440 | 60 | **0** | 7.30:1 |
| 1440×900 · reduced | 54 | **0** | 7.30:1 |
| 390×844 · reduced | 60 | **0** | 6.42:1 — the premise, on a still |

Every run over a photograph beats the worst run on paper, which is the point of the veil +
pool being constants.

Also asserted at every size above: **no horizontal overflow** (`scrollWidth === innerWidth`,
320→2560), **exactly one `<h1>`**, **6 images, 0 missing `alt`**, **0 console errors, 0 page
errors, 0 failed requests**. `prefers-reduced-motion: reduce` and JavaScript-disabled both
render the complete traverse: every word, every photograph, nothing covered.

`npx tsc --noEmit`, `npx eslint app/preview/about-a components/preview/about-a`,
`npx next build` and `npm run check:copy` (73 client sentences, verbatim) all pass.

Geometry at 1440×900: section 8,185px — threshold 1,921 · the length of the room 2,412 · the
held breath 1,368 · the room fills 1,584 · arrival 900. Six `webp` planes, no video.

## Things noted, not fixed — they are outside this concept's files

* **The nav pill stays dark over the closing cream.** `pill.is-light` is applied only by the
  hero choreography, which is the one thing that knows where the picture ends; this preview has
  no hero and may not edit `SiteNav`. Cream-on-dark is legible over cream and measures clean,
  but on the real page the handover point would move to the top of `.aa-arrival`.
* **This concept opens on `--ground-deep` deliberately.** Stepping out of the approved cream
  section above and into a darker room IS the arrival, so `<SiteNav />` is intentionally not
  given `light` here.
