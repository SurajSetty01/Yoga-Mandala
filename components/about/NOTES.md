# Page 1 — sections 03 to 07, the client's final assembly

Three concepts were built independently and compared at `/preview/about-a|b|c/`. The client
picked one idea per section. This folder is the assembly. Nothing under `app/preview/`,
`components/preview/` or `styles/preview-*.css` was touched — every selector taken from a
concept was copied out and re-namespaced under `.ab-*`, so all three previews still run.

| # | idea | ground | source |
|---|------|--------|--------|
| 03 · why we began | ONE WORD is a window onto a photograph | deep | concept **B**'s idea, **rebuilt** |
| 04 · our purpose | four mounted plates dealt left to right, Grow the only one still whole | warm | concept **C**, carried over |
| 05 · our approach | two voices from one typeface over a figure with no edges | paper | concept **B**, carried over |
| 06 · members | the display line's baseline IS the horizon | deep | concept **B**, carried over |
| 07 · guiding thought | a quotation with no author; the marks close around it | paper | **new** |

Grounds alternate **deep · warm · paper · deep · paper**, so no two neighbours share a
material, section 02's cream hands over to a reversed plate, and the footer's dark is the
page's actual ending.

Continuity: the register mark (`.ab-eyebrow` is `.within__eyebrow`'s own object — 11.5px
Inter, 0.19em, uppercase, Fraunces numeral in clay), the tokens, the type scale, and the
site-wide `[data-r]` reveal that `lib/hero-choreography.ts` already drives for the whole page.
**No new client island was added**: everything here rides that one observer. Two one-line rules
(`.js .ab-hand[data-r]`, `.js .ab-quote[data-r]`, both 0,3,0) cancel the container fade
globals.css gives every `[data-r]`, so the deal and the arrival keep their sequence.

---

## 03 — the one that needed real work

### Why the concept failed, and what changed

Concept B filled the **whole sentence** with a photograph. At sentence length every glyph is
~100px tall with ~12px strokes, so the picture inside is texture, not a picture — the client's
word for it was noise, and the rendered preview at `/preview/about-b/` confirms it exactly.

The fix is the client's own reference: fill **one word**, enormous. The word is `vast`, so the
meaning of the picture and the meaning of the word are the same thing — a room with more people
in it than any one teacher could know. The rest of the sentence sits around it at reading scale
in the page's normal display face, so the word reads as a window cut into the sentence.

The claim runs **rail to rail**, not inside the 92rem measure, exactly as the approved section
02's row of four frames does. A word whose point is that it does not fit has to keep growing
with the screen; capped at 92rem it strands itself in the middle of a 2560 display, which is
the one weakness concept B recorded about its own premise plate. Below 861px it steps out of
the rail entirely and runs edge to edge.

### The face — Fraunces wins, and the brief's guess was wrong

The brief expected Fraunces to be too fine and authorised a heavy grotesque instead. It was
tested rather than assumed: Archivo `wght 900 / wdth 125` was loaded through `next/font`, both
faces were fitted to the identical 1319px measure at 1440, and the painted glyph mask was
measured.

| face at the same measure | fit | size | cap height | median stroke run | ink coverage |
|---|---|---|---|---|---|
| Archivo `wght 900 wdth 125` | 0.2830 | 373px | **267px** | 93px (34.8% of cap) | 45.0% |
| Fraunces `wght 700 SOFT 100 WONK 1` | 0.3779 | 498px | **382px** | 95px (24.9% of cap) | 40.1% |
| Fraunces `wght 900 SOFT 100 WONK 1` | 0.3779 | 498px | 365px | 110px (30.1% of cap) | 45.4% |

Because Fraunces is the narrower face it has to be set **larger** to fill the same width, so
its capitals come out **43% taller** and its strokes are just as thick in absolute pixels. It
therefore shows *more* photograph per letter, not less. Rendered side by side in context the
difference is obvious: the grotesque version is a smaller picture in a more generic word.
Archivo was deleted — it cost a second display family and a font download to make the image
smaller. `wght 900` was also tried: fatter strokes but shorter capitals and a clotted `S`.

Settings: `wght 700`, `SOFT 100` (rounds the terminals, which widens the thinnest part of every
stroke), `WONK 1`, `opsz` pinned to 144 with `font-optical-sizing: none`, tracking −0.02em,
`line-height: 0.86` — the tightest box that still contains the capitals, because
`background-clip: text` paints nothing outside the element's box and a glyph that escapes it
goes invisible against the dark ground.

`--fit` is the reciprocal of `VAST`'s advance width in ems at those settings, **measured in the
browser and iterated to convergence**: 0.3779. Expressed against a `container-type: inline-size`
parent as `calc(var(--fit) * 100cqw)`, one number holds at every viewport. Verified — ink width
equals the measure to within 0.2px at 320, 390, 768, 1024, 1280, 1440 and 2560, and
`scrollWidth === innerWidth` at all seven.

| viewport | measure | font-size | box height |
|---|---|---|---|
| 320 | 320px (edge to edge) | 120.9px | 110px |
| 390 | 390px (edge to edge) | 147.4px | 134px |
| 1440 | 1319px | 498.5px | 454px |
| 2560 | 2424px | 916px | 835px |

`text-transform: uppercase` is a typographic setting, not an edit: the DOM text is still the
client's lowercase `vast`, so assistive technology reads the sentence as written. The paragraph
is one string from `copy.ts`, sliced at its own `". "` and again either side of its own word;
`head + word + tail` concatenates back to the client's sentence character for character,
spaces intact. Nothing is retyped.

### The photograph

`p13-img_0544` — *the whole class holds downward-facing dog on mats across the room while a
teacher stands observing at the right.* Chosen by eye from rendered crops, not from the JSON.

- Tested against `p13-img_0516` (arms overhead: one foreground back dominates the V) and
  `p13-img_0513` (a line of ten: good, but the top half of the frame is bare wall).
- `background-size: 100% auto` — **the frame's full width across the word's full width**, so
  the whole class spans the whole word and every letter gets its own share of the room. The
  teacher at the right of the frame lands inside the `T`.
- Tighter crops were tried at 114%, 132%, 170%, 210%, 250%, 320% and 420%. Past about 2× the
  bodies stop being bodies and the letters fill with abstract colour. All rejected.
- `p13-img_0617` was excluded here: section 06 uses it as its horizon.
- A phone gets the 1920 derivative (2560 across a 390px word is a third of a megabyte nobody
  can see) and drops the crop a little further into the room, to `50% 72%`.

### Contrast — the measurement for the image-filled word

`background-clip: text` is invisible to `tools/contrast-probe.mjs`: hiding the text does not
stop the background painting, so A and B are identical under the glyphs and the run is skipped.
It is therefore **guaranteed by construction and then measured separately**.

```
fill  = linear-gradient(rgba(251,247,242,0.44)) over the photograph
      → the image runs at 0.56, the highest opacity the ground allows
darkest pixel a letter can ever contain = 0.44 x #FBF7F2 = #6E6B69
#6E6B69 against --ground-deep #1C1714     = 3.35:1
requirement for display type              = 3.0:1
```

The floor was found by measurement, not caution. The construction floors are 0.40 → 2.92:1,
0.42 → 3.14:1, 0.44 → 3.35:1, and the *measured* p1 tracks the construction floor closely,
which means this photograph really does contain near-black pixels under the glyphs. 0.44 is the
highest image opacity that clears 3.0 with any margin at all; 0.50 (the concept's value) throws
away visible picture for nothing.

Measured on the real render with the probe's own algorithm — screenshot with the word painted,
screenshot with it hidden, sample only the pixels that differ strongly (antialiased edges
excluded), judge on p5 as the probe does:

| 1440×900, crop position | painted px | worst | p1 | **p5** | median |
|---|---|---|---|---|---|
| `50% 64%` (drift start) | 217,107 | 1.40 | 3.34 | **3.60** | 7.30 |
| `50% 74%` (at rest) | 217,072 | 1.41 | 3.15 | **3.63** | 7.04 |
| `50% 88%` (drift end) | 217,057 | 1.41 | 3.01 | **3.61** | 6.54 |
| 390×844, `50% 72%` | 19,305 | 1.43 | 1.81 | **3.45** | 6.76 |

The single-pixel "worst" figures are antialiased glyph edges that slip past the 90-unit
difference threshold; the whole point of the probe's p5 rule is that one stray pixel under a
serif is not a word being unreadable. Their share is much larger at 390 because the
perimeter-to-area ratio of a 147px word is much larger than that of a 498px one.

Blend modes were tried instead of a flat veil and rejected:

- `lighten` against `#7A7774` — clamps every channel to the floor, which is mathematically the
  same guarantee and shows 100% of everything above it, but it **clips the shadows to flat
  grey** and the bodies dissolve. Visibly worse. Rejected.
- `screen` against `#6E6B69` — a clean curve with the same guarantee, and visually
  indistinguishable from the flat veil. Rejected as machinery with no gain.

### Motion

`background-position` drifts `50% 64% → 50% 88%` over 44s, `alternate`, so the room pans slowly
down behind the letters and the word is never quite the same picture twice. Only the y axis
moves: `background-size` is 100% of the box on x, and buying horizontal slack would mean
cropping the class narrower than the word.

It is a CSS `@keyframes` animation, never a scroll or pointer handler, so nothing on this page
touches paint from an event listener. It is gated to `(min-width: 861px)` and
`(prefers-reduced-motion: no-preference)` — on a phone the strokes are too narrow for the drift
to read and the repaint is not worth the battery — and globals.css already kills every
animation under reduced motion, so the reduced-motion state is the static crop at `50% 74%`.
The word itself arrives on the shared `[data-r="scale"]` reveal.

---

## 07 — new, from scratch

None of A/B/C was kept. B's per-letter convergence on *together* was clever but it is a
lettering trick, not a quotation; A and C both closed on a centred line with nothing in it.

**The idea.** Nobody said this sentence. It is not a testimonial, it has no author, and there is
deliberately no attribution — so the quotation marks cannot point at a speaker. They behave
instead like a community adopting a saying: they start **wide of the sentence** and settle
**in** onto it as it lands, in the order a sentence is spoken. Open, three clauses, close. The
last thing that moves on the whole page is the closing mark, which is the full stop of the
document.

- Real typographic marks, U+201C and U+201D, never straight quotes, and treated as a designed
  element rather than punctuation: clay, and roughly three times the display size. The opening
  mark is a block above the sentence, outdented by its own side bearing; the closing mark is
  hung out of the flow off the end of the last clause (`position: absolute; left: 100%` on a
  `width: fit-content` row), so a mark twice the size of the sentence cannot open a gap under
  it and cannot land on a letter at any width. Both are `aria-hidden` — the `<blockquote>`
  already carries the quotation to assistive technology and nobody needs "left double quotation
  mark" read to them.
- Clay is ornament and this is ornament. At this size it is also large text by every definition
  the probe uses: `#C1613C` on `#FBF7F2` is **3.90:1** where the bar is 3.0, and the marks are
  placed clear of the sentence at every width, so no ink ever crosses them.
- The sentence is split into three clauses at its **own** spaces so they can arrive in
  sequence; the three spans concatenate back to the client's line exactly. Nothing is retyped
  and nothing is added.
- Motion: `transform` and `opacity` only, one class from the shared observer, staggered with
  `transition-delay` — mark 0ms, clauses 150/260/370ms, closing mark 660ms. Start states are
  scoped to `.js`, so with JavaScript off the quotation is simply set, and the reduced-motion
  block resolves every child. Verified: under `prefers-reduced-motion: reduce` the plate renders
  complete, both marks in place, nothing transformed.
- One sentence, one plate, no photograph, no link, no second line of copy. 06's room dissolves
  into night, 07 comes back to paper, and the footer's dark ends the page.

`line-height: 0` on an oversized mark was tried first and is a trap: it makes an inline-block
whose baseline is undefined in practice, and the closing mark parked itself a whole line above
the clause it belonged to. Marks are laid out with a real line box and anchored from the top.

---

## Carried over, and the three things that changed on promotion

**04 · Our Purpose — concept C, unchanged.** `Print.tsx` and the four frames came across as
they were; `frames.ts` was cut down to the four the promoted section actually uses. The hover
lift deliberately does not change `z-index` (raising a plate over its neighbour would cover
that neighbour's label) and needs no touch equivalent, because below 900px the plates do not
overlap their pictures at all and every word is on the page in both layouts.

**05 · Our Approach — concept B, two changes, neither of them the idea.**

1. **Ground `--ground-warm` → `--ground`.** Section 04 above now owns warm, and two warm
   neighbours would have merged. Measured, and it is an improvement: the figure at 0.40 over
   cream produces a worst possible pixel of `#96948F`, which is **5.45:1** with `--ink` (it was
   5.00:1 over warm). `--ink-soft` is 2.55:1 there and `--teal-deep` 2.42:1, so tone in this
   plate is still carried by the weight axis and the register mark is still kept off the
   picture by geometry, exactly as the concept had it.
2. **Figure `ss-dsc07120` → `ss-dsc07126`.** `ss-dsc07120` is already the fourth still in the
   **client-approved section 02**, a screen and a half up this same page. The preview had no
   section 02 above it, so the collision only exists once promoted. `ss-dsc07126` is the same
   idea from the same shoot — one practitioner balancing on one leg — and no other section on
   the page uses it.

**06 · A Community Built by Its Members — concept B, unchanged except its foot.** See the
measurement below; `about.members.lines[3]` is still not printed, for the concept's own reason:
"Everyone has something to learn. Everyone has something to contribute." is already section 02's
display headline about 1,200px up this page, at a larger size than anything available here.
Printing the page's best sentence twice spends it twice. Nothing is paraphrased or added.

### The bug this section taught, worth recording

A single narrow-width `.ab-sec { padding-block: ... }` rule, written last in the stylesheet,
**won on source order** over every per-section padding rule above it — same specificity (0,1,0),
later in the file. It flattened 06's 15rem foot to 3.4rem, which dropped the four-clause stair
onto the lit half of its photograph: **1.86:1 at 320, 2.56:1 at 360**, where 18px cream needs
4.5. The rule was replaced by per-section narrow paddings, and 06's foot was then measured
rather than guessed, because the clause block wraps to seven lines on a phone:

```
                 plate    horizon   stair sits at   result
320 x 568        902px    469px     0.198 of the mask    0 FAIL
360 x 640        860px    447px     0.159                0 FAIL
390 x 844        880px    458px     0.148                0 FAIL
```

The clearance is not empty space — it is filled by the photograph.

---

## Rejected

- **A grotesque for the image-filled word.** Measured against Fraunces and it lost: smaller
  capitals, less picture, one more font family on the page. Numbers above.
- **`lighten` and `screen` blends for the glyph fill.** One clips the shadows flat, the other
  is indistinguishable from a flat veil.
- **Dimming the image "to be safe".** The construction floor was solved for, not chosen: 0.44
  cream is the highest image opacity that still measures ≥ 3.0 with margin, and it is 6
  percentage points more picture than the concept it replaces.
- **Filling the whole sentence, at any weight.** That is the thing that was rejected.
- **A photograph in 07.** It is one sentence and the brief says give it room; 06 is the
  photograph, 07 is the silence after it.
- **Attributing the quotation.** Nobody said it. There is no `<cite>` and no name.
- **Adding a link, button or hover affordance in 03, 05, 06 or 07.** The hero owns the primary
  action and the footer follows immediately. These sections contain **zero focusable elements**
  (verified), so there is no hover-only affordance needing a touch equivalent.
- **A cross-seam plate from 03 into 04.** It belonged to concept C's *own* 03 and would be an
  invention here. 03 → 04 and 04 → 05 are honest hard cuts between grounds; 06 → 07 earns its
  handoff because the room dissolves into night before the paper arrives.
- **Centring the closing quotation.** Every block on this page hangs off the left rail, as the
  hero and section 02 do. At 2560 a centred column steps ~470px away from that edge.

---

## Verification

Everything below is against the **production `out/` build** unless stated.

**Contrast.** `node tools/contrast-probe.mjs http://localhost:3000/` at **320×568, 390×844,
768×1024, 1024×768, 1280×720, 1440×900, 2560×1440 — 0 FAIL at every size.**

That tool samples only the first screen, so the same glyph-mask algorithm was walked down the
whole document at 0.7-viewport steps, excluding the fixed nav pill's rect (it is measured on its
own account) and the Next devtools badge:

```
320×568   105 runs — 0 FAIL      1280×720   108 runs — 0 FAIL
390×844   113 runs — 0 FAIL      1440×900   114 runs — 0 FAIL
768×1024  106 runs — 0 FAIL      2560×1440  109 runs — 0 FAIL
1024×768  118 runs — 0 FAIL
```

Tightest run anywhere on the page: **5.31:1** (the 13px Fraunces `--clay-deep` numeral on
`--ground-warm`, needs 4.5). Everything else is above it.

Those sweeps run with `prefers-reduced-motion: reduce`, which makes the hero static and every
reveal resolved. **Run without it, the sweep reports failures on hero elements only** — "Yoga is
vast.", "No one holds it all.", the hero lede and CTA, and section 02's eyebrow — all at hero
scroll positions and mostly at exactly 1:1. They are an artefact of measuring an element whose
opacity the hero choreography is writing between the two screenshots: the same elements measure
clean at rest (the official probe, 0 FAIL at all seven sizes) and clean under reduced motion.
Nothing in `styles/about.css` was changed on account of them, and no hero CSS was touched.

**Reduced motion.** Renders complete, static and usable at every size: hand already dealt at its
final rotations, quotation set with both marks in place, drift never started, nothing reachable
only through motion.

**Structure.** At all seven viewports: `scrollWidth === innerWidth` (max horizontal overflow
**0px**, re-sampled every half-viewport down the page), exactly **one `<h1>`** (the hero's), 13
images all with real `alt`, **0 console errors**. Every focusable element on the page shows the
site's cream-ring-in-dark-halo focus treatment; these five sections add none.

**Toolchain.** `npx tsc --noEmit`, `npx next build` and `npm run check:copy` (73 sentences,
verbatim) all pass. `npx eslint` is clean on `app/page.tsx`, `components/about/**` and
`styles/`.

---

## Two things found, not fixed — they are not in this agent's files

1. **`npx eslint .` reports one pre-existing error**, in a file this agent was explicitly told
   not to touch: `components/preview/about-c/Motion.tsx:71` — *"'io' is never reassigned. Use
   `const` instead"* (`prefer-const` fires on `let io; … io = new IntersectionObserver(…)`
   because there is exactly one write). There is also a warning at
   `app/preview/compare/page.tsx:189` for an unused eslint-disable directive. Both are inside
   the preview tree the client is keeping; a one-word fix in each clears them.
2. **`<Link>` prefetch 404s under `output: 'export'`.** Prefetches request
   `/within/__next.within.__PAGE__.txt` while the export writes
   `out/within/__next.within/__PAGE__.txt`. Harmless — navigation works — but it is a 404 per
   nav link on a static host. Site-wide, not page-1 specific, and previously recorded.
