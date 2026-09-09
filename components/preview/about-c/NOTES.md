# Concept C — THE PHOTOGRAPHS ARE OBJECTS, NOT WINDOWS

Route: `/preview/about-c/` · styles: `styles/preview-about-c.css` (every selector under `.about-c`)

A window is a hole in the page you look through: it has to be a rectangle and it has to sit
still. An object can be handled. So on this page every photograph is a **print on a surface** —
it has a paper edge, it casts a shadow, it sits a degree or two off true, it was cut to a size
somebody chose, it overlaps and hides its neighbours, and it runs off the edge of the table
because the table is bigger than the screen. 1,311 frames; you are looking at a corner of a
pile somebody has been through.

The five sections are **one pile handled five ways** — opened, dealt, spliced, spread, put back.
That is what makes them a sequence rather than five templates.

---

## One sentence per section

**03 · Why we began — THE PILE IS OPENED.** It starts on an enlargement: one frame at 3.5×,
close enough that you cannot place the room; then the pile it came out of is dealt around and
down past it — five more prints, five more rooms, overlapping and running off both edges —
because *no single teacher can know everything* and no single frame is the tradition either.

**04 · Our Purpose — FOUR PLATES, DEALT LEFT TO RIGHT.** Four mounted prints, each laid over
the right edge of the one before, so Connect is the most covered and **Grow is the only one you
see whole**: growth is what rests on the other three.

**05 · Our Approach — ONE PICTURE CUT FROM FOUR.** The sentence says *not one particular school,
lineage, organisation or methodology*, so the picture under it is not one picture: four strips
from four rooms, cut to four widths and four lengths, taped together with the paper showing
between them and the horizons deliberately refusing to line up.

**06 · Built by its Members — THE WHOLE TABLE, DEALT FLAT.** Eight prints, none more than a
third bigger than the smallest, at eight angles, nothing centred and nothing featured — and the
client's three lines dealt into the same pile as three cream cards. Type is not the caption on
this table; it is another object on it.

**07 · Our Guiding Thought — THE FRAME IS PUT BACK.** The table is cleared and one small print
is left on it: the frame section 03 enlarged, now whole, carrying the crop mark of where the
enlargement was taken from — and it is the only object on the page at exactly 0°. The page picks
a photograph up and puts it back.

---

## The rule that makes the whole thing measure

**No type is ever set on a photograph.** A label belongs on the mount, which is what a print
actually is. That is DESIGN-SYSTEM §1 ("a label on a photograph gets a ground, not a gradient")
taken to its conclusion: give it the mount. Consequence: every text run on this page stands on a
flat, known ground, so its contrast is a constant instead of a function of the crop and the
viewport — the exact failure mode §1 was written about.

---

## Tried and REJECTED

- **Type as the mask for the closing sentence** (photograph inside the letterforms). Measured
  before building: on `--ground-deep` the darkest pixel inside a glyph must reach L ≥ 0.233
  (≈ #858585) for 4.5:1, which needs a ~70 % cream veil — at which point the photograph is a
  ghost and the picture has been spent for nothing. Worse, `background-clip: text` with
  `color: transparent` makes `tools/contrast-probe.mjs` parse the fill as black and mis-report.
  The die-cut variant (words knocked out of a dark plate) has the same luminance problem and
  stops being real text. Cut, and the picture kept its own light.
- **A photograph behind the whole premise paragraph, type reading through the gaps between
  prints.** Any occlusion of running text is unreadable at some viewport. The prints and the
  type interlock instead: above 1100px the foot is pulled up 20.5vw into the table's empty
  lower-left quarter, so the premise sits in the space the prints left. Below 1100px the measure
  is too wide relative to the viewport for that to be safe, so the table simply ends first.
- **Hover raising a plate above its neighbours** (z-index lift). Built it, screenshotted it, and
  it put the lifted plate over the next plate's label — see the geometry: each plate covers the
  next one's *left* edge when raised, and that is where the next one's word is. The lift now
  raises and **squares** the plate (rot → 0°, the same gesture 07 ends on) and changes no
  z-index, so it reveals nothing and hides nothing. It has no touch equivalent to invent,
  because below 900px the hand is a vertical stack that does not overlap the pictures at all.
- **Caption-on-hover / "wall label" provenance reveals** on the Members table. It gates content
  behind a pointer, needs a tap-to-read fallback that is worse than printing the words, and puts
  eight low-value tab stops in the page. The three lines are printed as objects instead.
- **`ss-ven0024` / `0025` / `0027` / `0028` — the framed paintings and the gallery wall.** They
  are literally pictures of framed pictures and would have been a pun on this concept's premise
  rather than evidence of what the community does. Also festival artwork, not Yoga teaching.
- **`ss-ven0088`, the barefoot teacher walking.** The photographer's own frame ends at his
  shoulders. However honest that is in the source, a headless figure on this table reads as a
  bad crop. Replaced with `p13-img_0614`.
- **The six dance frames** (highest-scoring in the archive) — a Bharatanatyam performance, not
  Yoga teaching. DESIGN-SYSTEM §6. Not used anywhere.
- **`ss-dsc07137 / 07118 / 07143 / 07120`** — the four frames the approved section 02 already
  carries, and **`ss-ven0096 / 0139 / 0153`**, the hero's clips. Reusing any of them under a new
  heading would read as a mistake.
- **Scroll-jacked "fan" of the pile.** The deal is an IntersectionObserver + CSS transition, one
  class write per group then unobserve. The reader's scroll position stays theirs.

---

## Interaction and motion decisions

- **The deal.** Every object starts squared up in the gathered stack — no rotation, slightly
  small, offset back toward where the pile came from — and travels to where it was dealt, in
  order. Transform and opacity only. The start states are scoped to `.js` (set pre-paint by the
  root layout), so **with JavaScript off the page is simply already dealt** — verified: zero
  hidden elements with `javaScriptEnabled: false`.
- **The seams (the only scroll-linked motion).** One passive listener raises a flag; a single
  rAF writes one custom property `--p` (−1 → 1) on the splice band; each strip multiplies it by
  its own `--k` so the four slide against one another by at most 20px. It exists for one reason:
  to prove the four are separate pieces of material. Geometry is measured on load and resize
  only, never in the handler.
- **Reduced motion.** Neither runs. Groups are marked `.is-in` immediately, the scroll listener
  is never attached, and every object renders at its dealt position with its rotation intact —
  screenshotted at 1440×900 with `reducedMotion: 'reduce'`, complete and identical in layout.
- **Focus.** These sections contain no interactive elements, so there is nothing in them to
  focus; the nav's cream-ring-in-dark-halo treatment is untouched and was screenshotted over the
  dark table.
- **Section handoffs.** Two prints are dealt past the end of their own section and land on the
  next ground: a whole class standing with their arms up crosses from the dark table of 03 onto
  the paper of 04, and the full class crosses from the paper of 05 onto the table of 06. That
  needs `overflow-x: clip` (not `hidden`) on the sections plus an explicit z-index order —
  03 and 06 above their neighbours — so the crossing prints paint over the section below.

---

## Measurements

- `node tools/contrast-probe.mjs http://localhost:3000/preview/about-c/` at **320×568, 390×844,
  768×1024, 1024×768, 1280×720, 1440×900, 2560×1440 — 0 FAIL at every one.**
- The project probe only samples the first viewport, so the same glyph-diff measurement was
  re-run **scrolled down the whole page** at 320, 390, 1024, 1440 and 2560. 1440 and 390 and
  2560 return 0 FAIL over every scroll step. The two remaining hits at 320 and 1024 are one
  thing: **text passing behind the fixed nav pill**, whose `rgba(251,247,242,0.90)` +
  `backdrop-filter: blur(18px)` composites the dark ground into whatever is beneath it. It is a
  property of the shared `SiteNav` on every page — the same test run against the approved live
  `/` returns 11 hits of the same kind — and `SiteNav` is out of scope here.
- Colours used, all against their real ground: cream on `--ground-deep` 16.7:1 · `--ink-onDark-soft`
  on deep 9.0:1 · ink on `--ground` 13.9:1 · `--ink-soft` on cream 7.1:1 · `--clay-deep` numeral on
  `--ground-warm` 5.3:1 · `--teal-deep` label on warm 6.2:1. On the reversed ground the register
  mark inverts to the two inks the hero already uses, exactly as `.ab--deep .ab-eyebrow` does:
  `--teal-deep` is 2.4:1 on `#1C1714` and `--clay` is 4.2:1, and neither can carry an 11.5px label.
- No horizontal overflow: `scrollWidth === clientWidth` at 320, 390, 768, 820, 1024, 1440, 2560.
- 25 images, **0 missing or empty `alt`, 0 broken**. One `<h1>` (visually hidden — on the real
  page the hero owns it). No console errors, no page errors.
- `npx tsc --noEmit` reports **no error in any `about-c` file**, and a scoped run over this
  concept alone under the project's own strict options (`noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes`, `verbatimModuleSyntax`) exits 0. `npx next build` compiled and
  prerendered `/preview/about-c` as static; a later re-run is blocked at the type-check step by
  in-flight errors in two OTHER agents' concurrent files (`components/preview/within-b/`,
  `components/preview/within-c/`), which are out of scope and were left alone.
- The enlargement is placed by arithmetic, not by eye: 350 % width in a 3:4 window at
  `left: −111%`, `top: −46.7%`, which puts the centre of the window on (0.46, 0.655) of the
  source. The crop mark on the 07 print is the same region — left 31.7 %, top 31.6 %,
  28.6 % × 67.7 %. Nobody is cropped out to make a shape work; the figure that fills the
  enlargement is whole from hands to feet.

## Known compromises

- On the phone the "Grow rests on the other three" argument is lost: four plates side by side
  leave a ~150px measure, so below 900px the hand becomes a stack flipped through downwards with
  the plate above on top. Every label stays whole, which mattered more.
- The Opening's premise/pile interlock is desktop-only (≥1100px), by measurement rather than by
  taste — see above.
