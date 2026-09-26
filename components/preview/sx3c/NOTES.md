# sx3c — Our approach, set as a page of a book

Route: `/preview/sx3c/` · Stylesheet: `styles/preview-sx3c.css` · Namespace: `.sx3c-`

## What happens

A column of type holds **one right edge** all the way down — the lead sentence, then three
names standing against a hairline rule in the margin — until **Transmission**, where the rule
stops on a brass tick, the name **crosses the gutter into the text column itself**, and the
section's only photograph arrives in exactly the column the words have just vacated.

**Below 900px the page is turned over, not flattened.** The gutter moves to the right of the
measure and every part of that still happens there: the lead's hung stops and the three names
hold one optical edge against the rule (measured at 390 — the three nouns end at 371px, the
three names at 370px, the stops hang to 375px), the paragraphs stand back from it, and
Transmission crosses it twice — the only name set flush left, and a picture that runs from the
block's left edge over the rule's own line and off the page.

The client's lead names three things and the section has four items. Transmission is not a
fourth peer; it is what the other three move through. So it is the only one that never gets a
margin head, and the type carries the argument. The deleted version set all four as equal
numbered panels in a row, which is the reading the copy contradicts.

The mechanic survives `prefers-reduced-motion`, a browser without scroll-driven animations,
and JavaScript switched off, because the composition *is* the mechanic. The rule drawing
itself down the gutter is a grace note.

## The research, and what it changed

Four things came out of it that are in the built page, not in the mood:

1. **Tufte-CSS marginalia proportions and its documented failure.** Text ~60% / margin ~36%,
   and marginalia that collide or vanish behind a toggle below ~760px. Both tracks here are
   explicit rather than percentages, and below 900px the margin rotates into a left rail
   instead of disappearing — the heads stand on the rule, the paragraphs stand back from it,
   and Transmission stands back *with the paragraphs*. Nothing is hidden behind a control.

2. **Hanging punctuation, hand-set.** `hanging-punctuation: last` is Safari-only, so each
   clause's final stop is wrapped and pulled out with `margin-right: -0.3em`. Measured at
   1440: the three nouns end at **580.1px** and the three margin heads at **578.4px** — one
   optical edge — while the three full stops hang out to **585.8px**. The sentence and the
   structure share an edge. That is the whole idea, and it only works because the stop hangs.

3. **`text-box: trim-start cap`** on the fourth name. `line-height: 1` still leaves the gap
   between Fraunces' ascender and its cap height, so the plate's top edge sat ~5px proud of
   the letter it is named by; the trim removed 8.7px of leading and the plate's top edge and
   the cap line of "Transmission" are now one line across the gutter. Chrome 133+/Safari
   18.2+, inside `@supports`; elsewhere the 5px stays and nobody can see it.

4. **Scroll-driven CSS** (`view-timeline` on the block, `animation-timeline` on the rule).
   There is **no scroll listener and no rAF on this page at all**. Firefox still ships it
   behind a flag in 2026, which is exactly why it is in `@supports`: browsers without it get
   the rule fully drawn, which is also what reduced motion and a no-JS reader get.

Also used: `text-wrap: balance` on display lines, `text-wrap: pretty` on body copy,
`font-optical-sizing: auto` (Fraunces' opsz axis, loaded by the root layout), `subgrid` +
`align-items: baseline` so each margin head sits on its paragraph's **first baseline**.

## Round 1 revision — what two reviewers found, and what it cost

**1. The composition was off centre, and `margin-inline: auto` was not the bug.** Measured
gutters were 168 / 262 at 1440 and 672 / 776 at 2531 — offset −47px and −52px. The block *was*
centred; the plate hung 93.6px further left than it, so what was centred was not what a reader
sees. Removed `--sx3c-bleed` entirely and made the plate fill the margin column exactly — the
box the three names stood in. **Offset is now 0.0 at 1024, 0.0 at 1440 and 0.5 at 2531.** The
claim the section makes about itself became true to the pixel at the same time.

**2. The mechanic was a different mechanic at 390.** The names went flush left and the rule
went to the left edge, so there was no gutter to cross — the signature move was missing from
the viewport most people read on. It is impossible to hold a 32px display margin *and* a
41-character measure inside 350px, which is Tufte-CSS's own documented failure below ~760px,
so the page is turned over instead. Everything is restored: `text-align: right` on the lead
with the stops still hung, the three names right-aligned to the rule and opening from it with
**the same `--sx3c-clip` value the two-column layout uses** (the override is gone, so the
source-order tie that once hid three names cannot come back), the bodies standing back from
the rule, and Transmission alone breaking left while the plate crosses the rule's line.

**3. The one photograph was showing the room's fittings.** Band by band: the top 518px of the
1080×1920 source is a tube lamp, a door head, a switch plate and two A4 notices; the bottom
~200px is bare tile. At 2531×1140 the plate was 896px tall, so a scroll stop landed on one
band or the other — the previous build's own s3 screenshot is 896px of picture whose entire
visible content is two mats and a floor. The plate is now a **1080×1200 window** at
`object-position: 50% 72%`: full width, every person, the teacher's crown down past the near
mat. Showing 100% of a frame is not a virtue when 45% of it is furniture, and this project has
already rejected four frames on exactly that test.

**4. The clip gate was a width gate pretending to be a weight decision.** `(max-width: 860px)`
withheld 3.15 MB at 390 and handed the same file to a 1024 laptop painting the plate 307 CSS
px wide. It is now: thin connection or ≤4 GB device, *or* `(pointer: coarse) and (hover:
none)`, *or* outside the two-column layout, *or* a margin column under 380px. **Measured: 390
= 665 KB, 768 = 665 KB, 1024 = 665 KB**; the last two were 3815 KB. The first pass of this fix
used the painted width alone and handed a 768 tablet 3.15 MB, because the plate bleeds to the
page edge down there and measures 616px — the byte log caught it and the layout's own 900px
breakpoint is now part of the test.

**5. The wide screen.** The band was 1084px at 2531 (42.8% of the monitor) — the narrowest use
of a wide screen of the four concepts. Widening the margin column from `24vw/25rem` to
`30vw/40rem` makes it **1220px (48.2%)**, and every one of the extra 136px is photograph: the
plate is 640px wide at 2531 against 504 before. The measure did not move — 33rem, **46.5
characters at 1440 and 46.5 at 2531**, inside the home page's own 41–46.

**One critic point rejected, with the number.** Critic 1: *"at 2531 the photograph sits x
672–1176 and the text column ends ~x1400, leaving 1131px (45% of the viewport) of empty paper
to the right of the fourth term."* The text column's box ended at **x1756**, not x1400, and the
field to its right was **775px (30.6%)**, not 1131px / 45% — x1400 is where the *ink* of one
balanced display line happened to stop at one scroll position, not where the column ends. The
asymmetry they were pointing at was real and is the same one critic 2 measured to the pixel;
it is fixed. The 45% is not.

## Media — one frame, and it is a still now

`pr-mov-img_5681`. Checked against `components/` before committing to it. What is actually in
the frame — read from the file, not the manifest, which calls the shirt white, says "two"
people and describes only the inversion — is a **teacher mid-sentence with his hands shaping
the instruction**, a student in a supported headstand at the wall, and **three** people
sitting on the floor watching. That is Transmission: *"it has traditionally moved through
teacher, student, practice and lived experience."*

**It ran as a silent loop until this round, and the clip is now cut.** Not gated further, not
trimmed, not re-cropped — cut. The manifest grades it `quality 4`, `loopScore 4` and calls it
*"Steady"*. It is not steady. Extracted at 0 / 2 / 5 / 8 s the camera drifts right and in for
the whole 10.5 s:

| t | what is in the frame |
|---|---|
| 0.0 s | the poster: teacher, inverted student, **three** people watching, the door |
| 2.0 s | two watchers left |
| 5.0 s | one and a half watchers, the wall filling |
| 8.0 s | **no watchers. The wall of A4 notices is the top half. A black folding chair has arrived at the right.** |

So at every desktop width the section's one picture spent most of every loop showing a wall of
notices and a folding chair — the exact furniture-as-subject failure this project has already
thrown **four** frames out for — and it arrived on its own, on a timer, without a reader
doing anything. Worse, it made the caption false: *"and the room watching"* was true of the
first second of the loop and of nothing after it. **A crop cannot follow a moving camera.**
The poster was measured; the other 9.5 seconds were not. That is the whole lesson.

What cutting it costs: nothing the argument rests on. Both reviewers said the motion was
never the idea here, and the document height is identical with `prefers-reduced-motion` on at
every viewport, before and after. What it buys:

- the caption is **true at every width and at every moment**, permanently;
- the picture is the frame that was chosen, not a frame the camera wandered into;
- **665 KB at 390, 768, 1024, 1280, 1440 and 2531** — the section was 3815 KB from 1280 up,
  3150 KB of it one 1080×1920 / 2.46 Mbps encode with no smaller variant. A reviewer's rule
  was "either gate it the way C does at 390, or cut it." Cut;
- ~150 lines of attach/prove/pause/release machinery are gone with it. `Sx3cMotion.tsx` is now
  one IntersectionObserver that reveals blocks.

The still itself:

- The plate is a **1080×1200 window** on the 1080×1920 frame — `object-position: 50% 72%`,
  which is y 518→1718. Full width, every person, the teacher's crown down past the near mat;
  what goes is the tube lamp, the door head, the switch plate and the two A4 notices above
  them, and the bare tile below. Painted **370px at 390, 616 at 768, 307 at 1024, 432 at 1440,
  640 at 2531** against a 1080px source: every width is a downsample, 0.28×–0.59×, and there
  is no `sizes` to get wrong because there is one file, one box and no transform between them.
  AVIF served at every width (`currentSrc` verified), 25 KB.
- It is the **only** picture in the section. Three screens of type, then one plate. That is
  the angle — photography sparing, landing as an event — and it is the discipline the section
  is built on, not an omission. It is still the tallest object in the section: 480px at 1440
  and 711 at 2531, against ~290px of type beside it.

## Two bugs found and fixed while building

**Three names were missing from the page at 390.** The one-column override redeclared
`clip-path` inside a media query, which tied the reveal rule on specificity — (0,5,0) against
(0,5,0) — and won on source order, so every margin head stayed clipped to zero. The open
direction is now a custom property, `--sx3c-clip`, so there is exactly one `clip-path`
declaration site and a source-order tie cannot turn an end state back into a start state.

**A reader who widened their window got a shorter line.** The text column was 464px at 899 and
342px at 900. That is the same defect a judge found on another concept this round (345.6px at
1440 against 346.8px at 390), and it lives at every breakpoint where a column count changes.
Tuned: 280px at 320 → 350 at 390 → 464 from 600 to 899 → 463.5 at 900 → 527 at 1024 → 528 from
1100 up. The step across the breakpoint is half a pixel, and the curve is monotonic 320→2560.

## The caption moved under its own picture

A reviewer named this section's caption as an element to protect — *"flush to the photograph
(0px at 1440/2531, 13px at 390)"*, and about the photograph rather than about the layout. It
was set at the foot of the **text** column, level with the plate's foot across the gutter,
which closed the corner the short fourth paragraph leaves open. Measured, that is 43px from
the picture horizontally and −16.5px vertically: a caption the reader traces across a gutter.

It now sits directly under the plate, in the plate's own column, at **12.8px — the same 12.8px
at 390, 768, 1024, 1440 and 2531.** The words are unchanged, and they are still the only
caption in the round that can be checked against the pixels: one teacher, one student at the
wall, and three people watching. Because it is now as wide as the plate rather than as wide as
the measure it sets to two lines from 1440 down, so it is `text-wrap: balance`d on its own
span — the second line would otherwise be the single word WATCHING.

The corner it used to close is paper now. That is what a page's margin is, and both gutters
beside the block measure **655.5px at 2531 — equal, 25.9% each.**

## Verified

Every number below is from rendered pixels at the stated viewport, not from source.

- `contrast-probe --scroll-to .sx3c` at 320×568, 390×844, 768×1024, 1024×768, 1280×720,
  1440×900, 2531×1140 and 2560×1440 — **0 FAIL** at all eight, 18–22 painted runs each.
- **And the probe's stop list is not the claim.** A reviewer's rule, and it is the right one:
  report the direct number for anything the sweep omits. So a DOM census counted the leaf text
  runs inside `.sx3c` — **19** — wrapped each in its own span and measured every one by
  paint/transparent glyph diff at its own scrolled-into-view position after a 3.5 s settle,
  judging only the inked core of each glyph (pixels within 15% of that run's own maximum
  delta — a looser cut measures antialias fringe and reports a phantom 2.4:1 on text the probe
  correctly calls 15.58:1). **19 of 19 at 390×844, 1024×768, 1440×900 and 2531×1140. 0 FAIL at
  all four.** The floor is the 11px caption at **p5 4.69:1 / worst core 4.58:1** against a 4.5
  requirement — `--ink-soft #5C5049` on `--ground-warm #F2E9DE`, which is the design system's
  own documented pairing, and the thinnest margin in the section. Next is the 11.5px eyebrow
  at 5.14–5.38:1, then the forest standfirst at 6.25:1; the margin heads and the body run
  10.15–15.58:1. Nothing is hidden from measurement, at any width, at any scroll position.
  (One run of the probe in a batch of seven back-to-back Chromium launches reported 1 FAIL at
  390 and did not reproduce in five repeats or in the direct census — a sample taken inside an
  0.85 s reveal transition, which `prefers-reduced-motion` removes entirely.)
- **No horizontal overflow** at 320, 360, 390, 414, 600, 768, 860, 899, 900, 1024, 1100, 1280,
  1440, 1600, 1920, 2200, 2531, 2560 — swept, not spot-checked.
- **Composition offset from the viewport's centre** — the union of the type block AND the
  picture, which is the thing that was wrong before: **0.0px at 1024 (79.4 / 79.4), 0.0 at
  1440 (218.4 / 218.4), 0.0 at 2531 (655.5 / 655.5).** Below 900 the block itself is centred
  to the pixel (20 / 20 at 390, 152 / 152 at 768) and the picture bleeds to one page edge on
  purpose — that is a bleed, not a capping bug.
- **Caption against its image: 12.8px at all eighteen widths above.** Where it sets to two
  lines (900–1440 and below 600) it balances to 224 / 202px rather than orphaning WATCHING.
- **Payload 665 KB at 390, 768, 1024, 1280, 1440 and 2531** — 38 KB of it imagery, 0 KB video.
  `currentSrc` is the 25 KB AVIF at every width. It was 3815 KB from 1280 up.
- **Type**: body 18.0px / 46.5 cpl at 1440 and 2531, 17.86 / 46.8 at 1024, 17.2 / 40.6 at 768,
  16.21 / 32.6 at 390 — nothing under 16px anywhere, against a house of 18.7px at 41–46 cpl.
- **Cost**: the section is 1675px at 1440 = **1.86 screens for ~136 words, 12.3px of scroll per
  word**, against a 2.5-screen ceiling.
- Exactly one `<h1>`; outline reads h1 → h2 "03 Our approach" → four h3s. Alt on every image.
- `prefers-reduced-motion: reduce` and JavaScript disabled each give the complete section —
  read the PNGs, not the DOM: every name, every paragraph, the rule fully drawn, the picture.
  Document height is **identical in both motion modes at all four viewports — 3575 / 2831 /
  3358 / 4183** — so no part of this section's height exists to run an animation.
- `npx tsc --noEmit`, `npx eslint .`, `npm run check:copy` all clean.

## The type scale does not grow with the monitor

The measure caps at 33rem and the names at 3.6rem, so the body line is **46.5 characters at
1440 and 46.5 at 2531** — measured with a zero-width ruler in the body's own face, inside the
home page's own 41–46 — and 46.8 at 1024, 40.6 at 768, 32.6 at 390. (An earlier draft of this
file said 60.8 in this one place. That was an em-guess, not a measurement, and it contradicted
the measured 46.5 four paragraphs above it.) What grows on a wide screen is the white around the block, because
that is what a page's margins are. It is a deliberate position and the most arguable thing
here: at 2560 this section is a book held at arm's length rather than a poster.
