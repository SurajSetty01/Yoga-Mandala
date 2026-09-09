# Within — concept C · "The page is a mandala, and the reader turns it"

Route `/preview/within-c/` · styles `styles/preview-within-c.css` (every selector under
`.within-c`) · components `components/preview/within-c/`. Nothing outside those three places
was touched.

---

## The premise

The community is called Yoga Mandala, and this page's content is genuinely radial rather than
linear: **four ideas of equal weight around one community, each holding a set of related
things.** Stacking them vertically — what the page being replaced does — is the one
arrangement that throws that structure away.

So the page's primary object is **one figure the reader operates**. A disc holds a
photograph. One quarter of it is lit. A clay arc on the rim marks the same quarter. The hub in
the middle never changes, because the community in the middle never changes. Choosing a pillar
turns the light and the arc by 90° **and swings the set of items to the matching corner of the
page**. The four pillars are four states of one object, not four blocks.

The mandala here is structural, not decorative. There is no lotus, no motif, no ornament: the
only reason the figure is a circle is that the content is four things around one centre.

*This section works like a figure being turned, because the content is four equal quadrants of
one community and roughly twenty-five things they hold.*

Everything reduces to one number. `--turn: index × 90deg` drives the conic scrim, the rim arc
and the corner the text occupies. There is no second source of truth to fall out of sync.

## How selection works — pointer, keyboard and scroll

**All three funnel into one thing: scroll position.** That is the whole design of the
mechanic, and it is why they cannot disagree — the failure mode of a selector that keeps its
own index alongside a scroll observer.

- **Scroll.** The wide layout is a sticky stage inside a 420svh track. Which quarter of the
  track the reader is in is which quadrant is lit: `floor(progress × 4)`. There is no `wheel`
  or `touch` listener anywhere on the page, nothing is ever `preventDefault`-ed, and the
  reader's scroll position is written only when they themselves press a gate. One passive
  `scroll` listener raises a flag; every read and write happens inside one `requestAnimationFrame`;
  only `transform` and `opacity` change as a result.
- **Pointer.** Pressing a gate scrolls to the middle of that quadrant's range, exactly as an
  in-page anchor would. The figure then turns *because the scroll moved*. Verified: clicking
  each of the four gates lands on `on: 0,1,2,3` with `aria-selected` following.
- **Keyboard.** The gates are a `role="tablist"` with roving `tabindex` in the wide layout.
  `←` `→` `Home` `End` move selection and scroll to it; focus follows. `↑` `↓` are deliberately
  **not** intercepted, so the arrow keys still scroll the page from inside the control.
  Verified: `→ → → →` walks 01→02→03→04→01, `Home`→01, `End`→04.

`goTo` had a real bug worth recording: `track.offsetTop` is measured against the nearest
*positioned* ancestor — the section, not the document — so every press landed a whole masthead
early and the figure answered one quadrant behind. It uses `getBoundingClientRect().top +
scrollY` now.

## The 320px form — a different object, not a smaller one

Four corners do not exist on a phone, and a block of text that swaps under the reader
mid-sentence is hostile. So below **1000px** the figure is redesigned rather than shrunk:

- the figure becomes a **sticky compass** — a 38px quartered disc plus `01 02 03 04`, docked
  under the navigation pill, about 54px tall;
- the four sets stack in normal flow beneath it, **each opening on its own disc of
  photograph** with its own quadrant lit and the disc mirrored to its side;
- scrolling turns the compass to whichever set crosses the reading line; tapping a numeral
  scrolls to that set. Nothing ever swaps under the reader.

*On a phone you do not turn the figure — you walk around it.* Every gate is individually
tabbable there (no roving tabindex, because it is an index, not a tablist), and `Enter`
activates: verified on all four.

At 320px the compass measures 288px of usable width and needs 180; the numerals are 11.5px on
a solid ground at **18.25:1**.

## Verdict on the existing Community Initiatives section

**Its organising insight is right and is kept. Its execution is not, and is rebuilt.**

The insight: two of the four entries carry long lists and two are prose only, so they are two
different kinds of object and must not be given one template. That is correct and it is the
one thing on the old page that was doing real work. It survives here as `wc-progs` (two
programmes, register + note) and `wc-offers` (two offerings, prose given room).

What fails, on the evidence of the rendered page:

1. **Thirteen items as uniform rounded lozenges read as a filter bar.** That is an interface
   convention borrowed from shopping, and it makes "Retreats" look like something you can
   switch off. It is also a text list wearing rounded corners — precisely the move the brief
   calls out. Replaced with the same stepped register the quadrants use: rows that step
   outward with ticks that step with them, so a set of seven short phrases has rhythm.
2. **A rectangle of photograph beside a rectangle of text** opens the section. That is the
   default the brief says must be beaten. Replaced: the section opens with the disc **laid
   flat** — one photograph masked to an arc so shallow it reads as a horizon, which is what a
   circle looks like from the side.
3. **Sangha and Pranava Vaakya in two plain columns at the end** look like the page running
   out. They now arrive on their own dome of `--ground-warm`, so the change of *kind* is
   visible before a word is read.

And a behaviour note, which is the real reason this section is not another dial: after four
screens of choosing one quadrant at a time, **everything here is open at once.** No selection,
no state, no turning. The geometry carries over as arcs rather than boxes — every entry opens
on a hairline dome struck from a circle wide enough to cross the page — so the section is
recognisably the same figure without repeating the trick.

Pranava Vaakya carries `A Praṇava offering, surfaced within Yoga Mandala` above its own name,
set in Inter (Fraunces mis-sets ṇ).

## What I rejected

- **Items fanned on radii around the figure.** The most literally radial option and the first
  one I drew. It dies on the content: "Opportunities to discover people with shared interests"
  is 53 characters, and a fan gives each label about 67px of arc. Rotated type would be worse.
  The items are placed radially — the *block* occupies the quadrant its gate points at — but
  every word stays upright in a normal measure.
- **Rotating the photograph with the figure.** A turning picture is a novelty and makes the
  subject unreadable. The photograph stays upright and crossfades; the *light* turns.
- **A dashed circle for the rim arc.** `vector-effect: non-scaling-stroke` measures the dash in
  rendered pixels rather than viewBox units, so one `stroke-dasharray` drew a single quarter at
  one size and three arcs at another. It is a real `<path>` arc now. (`pathLength` on
  `<circle>` is also ignored by Chromium — that was the first version, and it drew two arcs.)
- **Alternating the two programmes left/right.** Zig-zag put a list of items visually before
  the heading it belongs to. The two are the same kind of thing; the honest arrangement says so.
- **Video in the disc.** Portrait clips would mask well, but the hero owns the moving image and
  four clips is 10 MB for a section whose idea is the turning, not the motion of the picture.
- **A custom cursor, and any lotus, ornament or motif.**

## Media

Chosen by looking at each frame **circle-cropped with the scrim on**, not rectangular — the
disc masks to its own geometry, so a subject in a corner is simply gone. `object-position` is
set per image and is not the still's stored focal point, which is measured for a rectangle.

| Quadrant | Frame | Crop | Why |
|---|---|---|---|
| 01 Connect | `ss-dsc07137` | 30% 52% | a teacher talking with people seated around him |
| 02 Learn | `p13-img_0617` | 52% 58% | a full studio seated and listening |
| 03 Collaborate | `ss-dsc07143` | 50% 56% | four teachers working together on a panel |
| 04 Share | `ss-dsc07118` | 50% 42% | a hand held just above a student's back |
| Horizon | `p13-img_0544` | 50% 62% | the community at scale, set down flat |
| Sangha | `ss-ven0083` | 50% 38% | people together, not a class |

No dance frames: they are a Bharatanatyam performance and nothing on this page makes the
festival context explicit.

## Measurements

**Contrast — 0 FAIL everywhere, twice over.**
`node tools/contrast-probe.mjs http://localhost:3000/preview/within-c/` at 320×568, 390×844,
768×1024, 1024×768, 1280×720, 1440×900, 2560×1440 → **0 FAIL** at all seven.

The shipped probe only measures what is inside the viewport at scroll 0, which on a
six-screen page with four selection states is the first screen and nothing else. So the page
was also walked with the same glyph-mask algorithm at 13–15 scroll stops per viewport, which
covers every quadrant state and both sections below the fold:

| Viewport | distinct runs | measurements | FAIL |
|---|---|---|---|
| 320×568 | 78 | 146 | 0 |
| 390×844 | 78 | 200 | 0 |
| 768×1024 | 78 | 225 | 0 |
| 1024×768 | 86 | 380 | 0 |
| 1280×720 | 86 | 380 | 0 |
| 1440×900 | 86 | 403 | 0 |
| 2560×1440 | 86 | 432 | 0 |

Worst measured pair anywhere on the page: **5.98:1** — cream on `#9C4526` (clay-deep), the
active gate. That is the design system's own measured value for the only clay a label may sit
on. `--clay` itself appears exclusively as hairlines, ticks and arcs; `--sand` is not used.

The walking probe excludes pixels behind the fixed navigation pill. Text sliding under an
opaque bar is not something a reader experiences, and measuring it invented three failures.

**Everything else.**
- No horizontal overflow at 320, 360, 390, 414, 480, 560, 620, 700, 768, 860, 900, 999, 1000,
  1024, 1100, 1280, 1440, 1600, 1920, 2200, 2560 — checked per element, not just `scrollWidth`.
- One `<h1>`. Headings run h1 → h2×5 → h3×4, in order.
- 10 images, every one with `alt`; the four with `alt=""` are the narrow-layout duplicates of
  discs already described, inside `aria-hidden` figures.
- 38 register items in the DOM at every width — 25 pillar items, 13 initiative items. Nothing
  is reachable only through motion or only through JavaScript.
- Visible focus: cream ring inside a dark halo on the dark ground, ink ring on paper. Checked
  on a gate over the disc and on the Next link.
- `prefers-reduced-motion: reduce`: complete and usable. The figure still turns — it arrives
  instead of travelling; transitions and the panel entrance are off and gate activation scrolls
  with `behavior: 'auto'`. All four sets reachable by pointer, keyboard and scroll.
- No JavaScript: `js` is put on `<html>` pre-paint, so this branch is only taken with scripting
  off. The gates disappear (a control that leads nowhere is the codebase's own rule) and the
  four sets come back into normal flow. Verified: no overlap between the four blocks, gates
  `display: none`, no overflow, all 38 items present.
- No console errors in any state. `npx tsc --noEmit`, `npx eslint`, `npx next build` all pass.

**The trap this page was warned about.** There is no `IntersectionObserver` anywhere in this
concept — the track is read from `getBoundingClientRect` inside one rAF — and the disc is
masked with `border-radius`, which cannot clip a box to zero area. The one `clip-path` in the
file is `inset(50%)` on the visually-hidden gate label in the narrow layout, which is on
nothing observed and is the pattern the probe itself already skips.

## Known limits

- At **1024×768** the wide layout is at its tightest: the panel measure is ~285px and three of
  Collaborate's seven items wrap to two lines. It reads, and the wrap is hanging-indented, but
  it is the least comfortable viewport. 1280×720 and up are clean.
- The stage exits by scrolling away at the end of the track, so the last set passes behind the
  navigation pill on its way out. Every page on this site does this; it is not specific to
  this concept, but it is the reason the walking probe needed a pill exclusion.
- The lit quarter is a step in scrim opacity (0 vs 0.55), so on a frame whose subject sits in
  a dim quadrant the light lands on background rather than on a person. The whole photograph
  stays legible either way, and no crop can put the subject in all four quarters at once.
