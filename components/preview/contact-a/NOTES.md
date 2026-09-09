# Contact — Collaborations + Social · three concepts

One agent, three premises, built independently and judged on rendered screenshots. Routes:

| | route | files |
|---|---|---|
| A | `/preview/contact-a/` | `app/preview/contact-a/page.tsx`, `components/preview/contact-a/Board.tsx`, `styles/preview-contact-a.css` |
| B | `/preview/contact-b/` | `app/preview/contact-b/page.tsx`, `components/preview/contact-b/{Depth.tsx,moments.ts}`, `styles/preview-contact-b.css` |
| C | `/preview/contact-c/` | `app/preview/contact-c/page.tsx`, `components/preview/contact-c/Assemble.tsx`, `styles/preview-contact-c.css` |

Every selector is namespaced under `.contact-a` / `.contact-b` / `.contact-c`. No shared file,
no real page and no `SiteNav` was touched. Each route carries a slim warm-black band standing
in for the approved hero's lower edge, so the handoff and the nav's ground can be judged in
the same frame.

---

## The problem

Eight near-identical subjects and two links. `links.emailCollaborations` is `null`, so the
"Write to us" action has no destination of its own. The rejected build answered this with a
numbered column of eight rows and two bordered link cards — the client's "just text in a box".

A list of eight subjects rendered as a list of eight subjects is the failure. All three
concepts below are attempts to stop the eight being a list, from three different directions.

---

## A · THE BOARD — the eight as a system you operate

**Works like a patch board, because the content is eight subjects and exactly one open line.**

The premise is not a metaphor laid over the content; it is read off the data. `emailGeneral`
and `emailCollaborations` are both null, so every one of these eight conversations arrives in
the same place — the WhatsApp number. The rejected version buried that behind a button. This
draws it: eight keys down the right, eight cords bundling across the gutter, one socket, one
plate that says *All eight arrive in the same place.*

Selecting a key is not decoration. It lights that cord and it changes what the button does —
the WhatsApp draft opens naming the subject you chose — and the line under the button says so
in plain sight (*Opens a message about Study circles*). Pointer, touch, focus and click all
select; nothing is hover-only.

Cord geometry is computed from measured DOM positions on mount, on `ResizeObserver` and on
`document.fonts.ready`, never per frame. There is no scroll listener on this route at all.

**Rejected along the way**
- *A rotating mandala dial* — eight labels on a ring. Killed at the sketch: at 390px a ring of
  eight labels is either unreadable or has to hide seven of the eight, and hiding content is
  what got the last build rejected.
- *A bordered "jack" card* — became a plate (a sand rule with the socket straddling it and the
  content hanging below), because a rounded bordered box is the exact thing the client named.

## B · EIGHT DOORWAYS — photography carries it

**Works like a colonnade, because each of the eight is a room this community already has.**

Eight arched openings cut down the paper at four sizes, tilted, overlapping, two of them
running off the edge of the page, each subject a nameplate set into the picture it belongs to.
The arch is the shape of a doorway and a doorway is what "we are open to" means. Near lane and
far lane travel at different rates under one `requestAnimationFrame` and the far lane sits
behind a veil of the paper's own colour, so the wall has a front and a back.

Every `alt` is verbatim from `public/media/stills.json`. The word on the arch is a **subject**;
the alt says what the picture actually **shows**. Nothing captions a photograph as an event it
was not taken at.

**Rejected along the way**
- *Type clipped by photograph* (`background-clip: text` filled with a still). Beautiful, and
  unmeasurable: the contrast probe reads the element's computed `color`, which for
  `-webkit-text-fill-color: transparent` is meaningless. A hard 0-FAIL gate is not the place
  to ship something the gate cannot see.
- *A gradient scrim under each nameplate* — DESIGN-SYSTEM §1 already paid for this lesson. The
  plates use the navigation pill's own material instead, and their contrast is a constant.
- *Rows of links for Social* — the first build of this section ended in two bordered rows, i.e.
  the thing that was rejected. Replaced with two more doorways, cut into the dark wall and lit
  from the far side, because what is through them is the Trust's and not ours.

## C · ONE STATEMENT — refuse the list

**Works like one spoken invitation, because the eight are not eight services — they are one
open door described eight ways.**

There is no list. The client's words are set as ONE running sentence at poster scale, rail to
rail, so the line breaks fall wherever they fall — some lines carry two subjects, some carry
half of one. That is the difference between a list and a statement. The eight are the only
words in full ink, the sentence carrying them is softer, and the only marks that are not
letters are eight clay discs, so the count is present as texture rather than as rows. The
action is the last clause of the same sentence, which is why it is set at the same size as
everything else. Social is the same voice one size down, with the two accounts inside a
sentence rather than printed under it.

**Rejected along the way**
- *A word-cycler* ("conversations around ___" changing). It is the obvious reading of "a
  sentence that keeps changing" and it makes seven of the eight subjects reachable only
  through motion.
- *Clay interpuncts.* `--clay` is 3.90:1 on cream and may never set a character, so the
  separators are empty inline-blocks with a background — which also keeps the glyph-diff probe
  from measuring an ornament as text.
- *A sticky poster that grows as you descend.* At 320×568 the finished sentence does not fit in
  a viewport, so the sticky version would have had a broken state on the hardest device.

---

## Measurements

**Contrast — `tools/contrast-probe.mjs`, 0 FAIL on all three at all seven mandated viewports**
(320×568, 390×844, 768×1024, 1024×768, 1280×720, 1440×900, 2560×1440).

The probe only measures text inside the *initial* viewport, so each concept was also run at
tall viewports to pull the below-fold text into the measured band: A at 1440×3000, 1440×1700,
390×2600 and 390×1900; B at 1440×4200, 1024×5200, 430×4100 and 390×3900; C at 1440×1600 and
390×1300. All 0 FAIL.

B's eight nameplates measured on their real photographs at 1440×4200:

| worst p5 | best p5 | need |
|---|---|---|
| 9.06:1 (`Other initiatives…`) | 17.05:1 (`03`) | 4.5 |

Colour decisions that were changed *because* of measurement, not taste:

| | on `--ground-deep` | verdict |
|---|---|---|
| `--teal` #2C6E6B | **3.08:1** | cannot be an eyebrow on the dark ground → cream at 0.72α (~9:1) |
| `--clay` #C1613C | **4.32:1** | cannot set the key numerals → cream at 0.62α |
| `--sand` #F6D9C1 | 13.4:1 | passes, but §1 forbids sand as text outright — it draws cords and the socket ring only |

**Overflow** — none on any concept at 320, 360, 390, 414, 600, 768, 900, 1024, 1280, 1440,
1920, 2560. Checked as page `scrollWidth` vs `clientWidth` and as the widest child overhang.

**Section length**, handoff band excluded:

| | 1440×900 | 390×844 |
|---|---|---|
| A | 1255px · 1.4 screens | 1655px · 2.0 screens |
| B | 4724px · 5.2 screens | 3639px · 4.3 screens |
| C | 1297px · 1.4 screens | 1040px · 1.2 screens |

**Reduced motion** — rendered with `reducedMotion: 'reduce'` and read. All three are complete
and usable: A's cords are geometry rather than motion so the whole drawing stands (only the
dash-draw transition goes); B's doorways are all present, unrevealed and un-parallaxed; C's
statement is whole. Nothing on any route is reachable only through motion, and the reveal CSS
on B and C is gated behind an `is-live` class that JavaScript adds *after* marking everything
already on screen — so a reader without JavaScript gets the finished page, not a blank one.

**Focus** — tabbed through every route and read the computed styles. One fix was needed:
`.cb-door` carries its own `box-shadow`, which outranks the global `:focus-visible` halo on
specificity, leaving a cream ring on a cream tile — invisible. The ring is now inverted to ink
and the halo restated alongside the tile's own shadows.

**Console / network** — clean on all three. One 404 was found and fixed: `ss-ven0056` has only
one derivative on disk while `stills.json` claims three. While fixing it, the files named
`-960` for `ss-ven0024` and `ss-ven0056` turned out to be **720px** wide, so the `w`
descriptors were wrong too; `moments.ts` now carries measured intrinsic widths.

**Other bugs found by looking at renders rather than at source**
- A: the cord control points were unclamped, so the lower cords swept *through* the plate's own
  words. Both control points are now clamped to the socket (x ≥ jx, y ≤ jy) and the socket
  moved to the plate's outer corner on wide viewports.
- A: at 320–430px the cord gutter was ~12px and the eight curves collapsed into one vertical
  stripe. The gutter is held at 3.9–4.6rem on a phone.
- A: a leftover four-column grid rule left the Social arrows floating mid-row at different x
  positions on each line.
- B: the wide-viewport overlaps, applied on a phone, put doorway 05 across 04's nameplate and
  08 across 07's. Phone overlaps are now shallower. A label another doorway can cover is a
  label that is not there.
- B: the manifest's focal point for `ss-dsc07137` (0.35) centres an air cooler in a portrait
  crop — the exact failure §1 records. Pulled to 0.28.
- C: Tailwind's preflight sets `svg { display: block }`, which threw the arrow onto its own
  line under "Write to us". Forced back to `inline-block`.

**Content law** — grepped all ten files for email addresses, `mailto:`, city names, and any
number describing the community's size, reach or age. Zero hits. Every rendered string is
either from `content/copy.ts`, derived from `content/site.ts`, or a factual sentence supported
by `design/CONTENT.md` (the Pranava Seva Trust relationship). `links.emailCollaborations` is
null on all three routes and renders as nothing; "Write to us" goes to WhatsApp with the
destination printed under it in every concept.

`npx tsc --noEmit` and `npx next build` both pass; all three routes prerender.

---

## Recommendation — **A, the board**

The bar the brief sets is the approved hero's: *the content and the mechanic are the same
thought.* Measured against that, the three separate cleanly.

- A's sentence is **"works like a patch board, because there are eight subjects and exactly one
  open line"** — and that second clause is a fact about this page's data, not a metaphor laid
  over it. It turns the hardest constraint in the brief (a null destination that must never be
  invented) from a caveat into the composition. Nothing else on the site could reuse it,
  because nothing else has this shape.
- B's sentence is **"works like a colonnade, because each subject is a room"** — true, warm, and
  the most obviously non-boxy thing here, but the arch is *applied* to the content. The same
  colonnade would hold any eight subjects equally well.
- C's sentence is **"works like one spoken invitation, because the eight are one open door"** —
  also derived, and the strongest single frame of the three. Its exposure is that a client who
  said "it's literally just text" may not accept "yes, but four times the size".

The rendered evidence that decided it: in the 1440 frame the cord bundle, not the rows, is what
the eye lands on first, and it is the only object among the three that makes a reader ask a
question whose answer is the section's actual meaning. A also puts the eight subjects, the
action and the destination inside 1.4 screens where B needs 5.2 — and at the bottom of a
contact page, five screens of photography is a lot of scrolling for content whose whole weight
is "here is what we would talk about".

**Where A is weak, honestly.** The right-hand side is still eight rows, and roughly 85% of A's
first screen is type. Someone can reasonably call it a list with wires attached. Two answers:
the rows are terminals on an instrument and they *do* something, and the eye demonstrably goes
to the bundle first. But if the client's priority turns out to be "more photograph, less text"
rather than "give it an idea", **B is the concept to take** — it is the only one of the three
that answers "I don't want just boxy images" with actual non-rectangular, layered,
bleeding media, and it holds its contrast on all eight photographs at every viewport.

**Not recommended: dropping C entirely.** A's plate already borrows C's move — *All eight
arrive in the same place.* set as a sentence rather than a label — and C's Social treatment
(the Trust relationship stated inside a sentence with the two accounts as clauses of it) is
better than A's or B's, because it makes the parent-organisation fact structural instead of
parenthetical. If A is built, take C's Social sentence with it.

## Things I could not make work

- **A photograph that honestly means "Resources".** The archive has classes, discussions, a
  panel, halls and a small still-life of framed works on a rack. B's 07 uses the rack; it is
  the weakest of the eight pairings and I would rather the client chose the image than have me
  force one.
- **Real occlusion between B's doorways at phone widths.** Overlapping them enough to occlude
  meant covering nameplates. Legibility won; the phone wall shingles rather than overlaps.
- **A prefilled draft in B and C.** A's keys can change the WhatsApp draft because the reader
  has already chosen a subject. B and C have no selection, so their buttons open the plain
  number — correct, but it means A's action is doing something the other two cannot.
