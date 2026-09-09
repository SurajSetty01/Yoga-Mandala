# Candidate: DEPTH

**Thesis — the photograph has volume: you are looking *into* a room, not at a picture of one.**

Same frame as Concept B (`ss-dsc07137`), on purpose. If the argument is that B is flat, the
honest test is to prove it on B's own photograph rather than by swapping in a better one.

---

## What the frame actually allows (measured before designing)

I rendered the hero with all type hidden and sampled the worst-case luminance of every cell in
a 12 x 9 grid, then computed the contrast cream (`#FBF7F2`) would get against the *brightest*
pixel in each cell. At 1440x900:

```
        0  120  240  360  480  600  720  840  960 1080 1200 1320
  0  12.8 11.6 11.5  5.6  5.6  5.0! 1.8! 1.9! 2.0! 1.9! 1.8! 1.8
200   6.4 11.2  2.4! 2.1! 1.9! 6.2! 1.6! 1.3! 1.3! 1.3! 1.3! 1.4
400  15.3 16.2  3.5! 2.9! 2.5! 2.8! 1.7! 1.6! 1.8! 1.6! 1.5! 2.2
600  17.0 17.0 10.4 10.6  8.2  8.8  5.5  5.8  4.5  4.6  3.8  6.3
700  15.9 15.0 14.8 14.7 13.6 13.6 13.1 18.5 13.6 10.1 11.3  8.9
800  11.1 10.1 12.6 15.0  8.5  8.4 12.1 13.1 14.7 10.8  9.5  7.5
```

Two facts fell out of this and drove every layout decision:

1. **Above y≈600 only the left two columns are usable.** Everything else is the teacher, the
   listeners, or daylight. Concept B's 37rem type block sat straight across the teacher's body.
2. **Below y≈700 the whole width is usable**, 8.9:1 to 18.5:1 — and that band is exactly the
   near plate's shadow. The depth treatment is what *creates* the place the type can live.

## What is on screen

Two plates cut from one photograph:

| plate | scroll travel | scale over one hero | pointer |
|---|---|---|---|
| `--far` (the room) | 70 % of scroll | 1.160 → 1.190 | ±5 px |
| `.frame` (the words) | **84 %** | none — type is never resampled | ±3 px |
| `--near` (the ground plane) | 95 % | 1.160 → 1.235 | ±18 px |

Measured live, not asserted: at scroll 540 the far plate reads `scale(1.190) translateY(148.5)`,
the near `scale(1.235) translateY(13.5)`, the words `translateY(86.4)`. The words genuinely
travel *between* the two planes. Nearer things also grow faster, which is what a dolly does.

The near plate is masked to the bottom of the frame and carries `blur(3.5px)` plus its own
shadow. **This is the single move that does the most work.** The photograph was shot wide open —
the foreground heads really are out of focus — so a second, blurrier copy of the same frame
fading in from 40 % down reads as a *depth-of-field falloff*, not as a duplicated layer. It also
hides any misregistration the parallax introduces, and it is static, so `prefers-reduced-motion`
keeps the whole depth grade and loses only the movement.

Each plate carries its **own** scrim, inside its own transform, so the scrim travels with the
picture and reads as light in the room rather than a sheet of glass laid over it. One extra
gradient (`.ground`) is viewport-locked and purely functional: it guarantees the contrast under
the words at every scroll position, whatever the plates are doing.

---

## Tried and REJECTED

**A third plate ("the sill") painted over the headline, to occlude it.** Built it, tested it,
cut it. Two independent failures:

- A horizontal-band mask has **no silhouette**, so it reads as a smudge over the letters rather
  than as an object in front of them. At an alpha low enough to be safe it was invisible; at an
  alpha high enough to read it swallowed the CTA — the screenshot of that variant shows "Join
  the WhatsApp community" half-eaten. It looked like a rendering bug, not like depth.
- I then shaped the mask into ellipses matching the real out-of-focus heads. Better in theory,
  worse in practice: it is pinned to one crop, and at a strength that reads it *buries* the
  photograph's genuine foreground figures — which are the thing that actually communicates
  "there are people between you and the teacher". Turning the sill off made the frame read as
  *more* three-dimensional, not less.

Honest conclusion: **without a depth map, believable occlusion of the headline is not
achievable in this photograph.** The brief's "type occluded by a foreground element" is the one
item on the list I could not make work. Cutting it also bought back the most expensive layer.

**An ember-coloured eyebrow** (`#EFC0A2`, Concept B's accent). It measured 4.09:1. The ground
under it peaks at L≈0.198, and at that luminance *no colour whatsoever* reaches 4.5:1 — pure
white tops out at 4.23. So either the ground got much heavier (the exact flattening Concept B is
criticised for) or the text changed. The text changed: the eyebrow is cream, the ember survives
as the rule beside it, and the ground was deepened just enough — now 8.33:1 desktop, 5.37:1
at 390.

**A two-column hero (headline left, lede + CTA right).** It put a paragraph directly over the
listeners' faces. Three crop variants and a right-aligned version all failed the same way.
Dropped the lede from the hero entirely — the client's full sentence now opens the section
below, where it has room. The hero is eyebrow, headline, one action, one quiet link.

**Art-directing a portrait frame for phones.** At 390x844 a 3:2 source shows only ~30 % of its
width, so the group is cropped out and you get a portrait of one man. I tested crops at 28/31/
40/46 % and a portrait swap. 31 % keeps the teacher whole and is the least-bad; a `<picture>`
swap would need one `alt` valid for two different photographs, which I was not willing to fudge.
**This is the weakest part of the candidate and I am not happy with it.**

---

## Bugs the harness caught that the eye did not

1. **The sill plate ate every click on the primary CTA.** Full-bleed plates over the type with
   no `pointer-events: none`. A hit test at each element's centre now runs on every pass.
2. **The CTA collided with the bottom rail on scroll.** The rail was pinned to the hero's bottom
   edge (100 % of scroll) while the words lagged at 84 %, so the button rose into the credit and
   the credit rendered cream-on-cream — measured 1:1. The rail now travels on the words' plane
   and fades out over the first 25 % of the hero, because a scroll cue is an at-rest affordance.
   An overlap assertion runs at five scroll depths.
3. **At 2560 the headline wrapped to four lines.** `max-width` was on the padded `.frame`, and
   the wide-screen `padding-inline` ate the content box. The measure now sits on the columns.

---

## Interaction decisions

**Navigation.** The pill owns a ground (`rgba(20,14,10,.50)` + `blur(18px)`), never a bare tint —
the brief's contrast trap. Links are at **full opacity**; the hierarchy is weight and size, not
alpha, so their contrast never depends on what the photograph is doing behind them (measured
6.97–11.65:1 at every scroll position). The hover highlight is a **ground that slides** between
items (one 1px element, `translateX` + `scaleX`), which also gives touch a real `:active` state
instead of a hover it cannot perform. The pill parks upward after 55 % of the hero on a sustained
downward scroll, returns on any upward scroll, and returns immediately on `focusin` so keyboard
users never chase it. It inverts to cream-on-ink when it leaves the picture — Concept B's one
behaviour worth keeping. Narrow viewports get a real `<button aria-expanded>` disclosure and an
inline sheet: closes on Escape, on outside pointerdown, on link click, and on resize past 900px.
Concept B's dead "Menu" link is gone.

**CTA.** Reconsidered in colour, shape, position and relationship to the image. It is the only
fully opaque object in the frame and it sits on the front plane with a real cast shadow, so it
reads as being *in* the room rather than printed on it. Default cream on ink (15.6:1). On hover
and on `:focus-visible` a `--clay-deep` fill sweeps in from the left on `scaleX` and the label
crosses to cream — 6.95:1, verified; the sampled `--clay #C1613C` only manages 4.23:1 with cream
and was darkened to `#8B3F22` for exactly that reason. The arrow steps 4px. The second action is
no longer a competing outlined pill but a quiet link with a rule that redraws from the left.
Both moved out of the frame's centre-right — the busiest part of the picture — into the bottom
band.

**The right-side element.** Reconsidered entirely. The provenance caption is demoted to
furniture at the bottom-left beside the scroll cue, and the space it held now carries
*Connect / Learn / Collaborate / Grow* — the client's own four words, linked to the section that
opens them out. Dead credit text became the hinge between the room and what follows.

**Cursor.** Damped (lerp 0.08) parallax, opposite the pointer, nearer planes moving more:
±18px near, ±5px far, ±3px on the words. Gated behind `(hover: hover) and (pointer: fine)` and
`pointerType === 'mouse'`, and not registered at all under reduced motion.

**Scroll.** Never hijacked — the rig only reads `scrollY` and writes transforms. One rAF loop,
one read per frame, transforms and opacity only, and it idles when nothing is moving.

---

## Measurements

- **Contrast**, sampled on the real rendered pixels under each text line (Range rects, elements
  hidden for the reading), at 5 scroll positions x 2 viewports. Worst values now:
  eyebrow 8.33 desktop / 5.37 at 390; headline 6.13–14.86 (needs 3.0); quiet link 15.5;
  bridge 16.0; nav links 6.97; button label 15.58. Everything clears its threshold.
- **No horizontal overflow** at 320 / 360 / 390 / 480 / 768 / 900 / 1024 / 1280 / 1440 / 1920 / 2560.
- **Reduced motion**: every element renders at full opacity and identical size; the far plate's
  transform is byte-identical before and after a 450px scroll. Nothing is reachable only through
  motion.
- **Focus**: 11 focusable elements walked in tab order, every one with a 2px ring and scrolled
  into view. The ring carries a dark halo so it survives on cream and on photograph alike.
- **Cost**: 38 rAF frames/sec under continuous synthetic scroll-thrashing vs 42 for the same page
  with the depth plates removed (`?flat=1`). ~4 fps for the whole rig. The blurred plate is
  served the 960px source, not the 1920 — nobody can see resolution through `blur(3.5px)`.
- One console warning and one aborted preload appeared only when the harness resized the
  viewport eleven times in a row; a clean single load has neither.

`?flat=1` renders the identical page with the depth plates removed, as an A/B control.

## What I would do next

Find or shoot a portrait frame for phones. Everything else here holds at 320px; the mobile
photograph does not, and no amount of cropping fixes a 3:2 negative on a 9:19.5 screen.
