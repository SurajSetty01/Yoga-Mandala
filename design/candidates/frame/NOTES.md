# Candidate · FRAME

**Thesis: the image is framed, not pasted — every edge is a decision, and the frame itself moves.**

Immersion by composition rather than coverage. One photograph, held inside an architecture of
warm ground, hairlines and negative space; the aperture closes from a plate (2.06:1) to a
masthead band (3.9:1) as you descend, gives its height back to the ground, and the headline it
was carrying lands in ink on that ground.

---

## Tried and rejected

**A genuinely portrait portal on desktop.** This was the brief's first suggestion and it does not
survive arithmetic. At 1440×900 (a 1.6:1 viewport) a 0.8:1 aperture 700px tall is 560px wide —
24% of the screen. You can have a tall aperture or a picture that dominates, not both. So the
desktop morph is **plate → band** (2.06 → 3.9), and the true portrait portal survives only where
the viewport is itself portrait: mobile runs **0.70 → 1.33**. Stated plainly because it is the
weakest joint in this candidate.

**Animating the aperture with `clip-path` on the plate.** Replaced by two opaque, ground-coloured
**blades** that only ever `translate`. Identical visual, zero paint, and the frame's hairlines get
trimmed by *occlusion* rather than by measuring and scaling them each frame. Measured: median
16.7ms, p95 16.8ms, **0 frames over 20ms** across the whole reshape. Exactly one `clip-path`
survives in the file, on the ink copy of the headline — a small element that nothing observes
(the IntersectionObserver trap is real; the reveal observers only ever see unclipped boxes).

**Concept B's directional gradient scrim.** A long feather reads as a wash, and its contrast
depends on whatever crop the viewport happens to produce. Replaced with a hard-topped, hard-edged
**plinth** of the frame's own warm black, whose right edge lands on the same column the actions
below end on, so the edge is a compositional decision instead of a fade. The worst *rendered*
pixel behind the headline measures 13.3:1; behind the eyebrow, 7.7:1.

**Cross-fading a second photograph inside the primary frame** (the individual dissolving into the
hall as the aperture closes). Seductive, and a gimmick: it fights "one photograph", and it makes
the `alt` story dishonest. Dropped in favour of a discrete second plate.

**The second plate as a permanent fixture.** At p=0 there is nowhere to put it — it either covers
the photograph or overflows the mat. It now arrives (p > 0.5) in the ground the aperture gives
back, and it is **hidden below 720px**, where a 100px plate in a 390px column is furniture, not
range. That is an honest "no", not an oversight.

**Reduced motion resting at the loaded, tall state.** Nicer picture, but the second plate would
then be reachable only by scrolling. It rests at the *resolved* shape instead. Real cost: 68% →
36% image coverage for those users.

**`width: 100vw` on the fixed masthead** — 100vw includes the scrollbar, so it overflowed by ~15px
at every width. Caught by the 320→2560 sweep, not by looking.

**`.four p` beating `.four__lead`** (0,1,1 over 0,1,0) shrank the section's display line to 14.5px.
The exact trap the brief warns about, hit anyway, caught by looking at a screenshot. There is now
a test asserting the lead keeps its size.

## Kept from Concept B

All four of its preserved ideas, re-grounded: one photograph leading; type set inside the frame on
the frame's own dark region; a scrim shaped to the picture (now architectural rather than gradient);
a pill navigation that inverts as it leaves the image — but only once it has actually left it.

---

## Interaction decisions

**Navigation.** At rest the masthead is *not* a pill: it is a bar on the warm mat whose bottom
hairline **is** the frame's top rule. Ink on ground — the transparent-header-over-a-photograph
contrast trap simply cannot arise. It becomes the client's glass pill at the exact moment the pin
releases and the composition starts scrolling away, which is the one moment a pill has to earn.
It hides on the way down as soon as the aperture starts to move (p > 0.10) so nothing competes
with the reshaping, and returns on any upward scroll; it never hides under reduced motion. Over
the reversed-out section it inverts (measured 7.95:1; the light pill over the picture, 14.7:1).
Hover/focus drive one clay indicator that *slides* between items rather than four underlines that
blink, and it returns to the current page on pointer-leave. Mobile is a real disclosure sheet:
focus moves in, Escape and outside-click close it.

**Buttons.** Squared to the frame's own 2px, never sitting on a photograph — so their focus rings
are always visible and their contrast never depends on a crop. Primary is a chip of the frame's
warm black that fills upward with a **darkened** clay on hover/focus: `#9E4B2B` at 5.63:1, because
the palette's `--clay` `#C1613C` under cream is 3.90:1 and fails. Secondary is not an outlined
pill but a label standing on its own rule — the frame's rule at a smaller scale — which thickens
and goes clay; under `(hover: none)` it is already in that state.

**The right-side element.** The provenance caption is gone entirely. Two things replace it: the
**plate register** on the rail (`Pl. i`, a hairline, the location set vertically) welded to the
frame's bottom rule so it rises with it; and **`Pl. ii`**, the second plate, tipped in with its own
rule and caption. Provenance became architecture instead of furniture.

**The headline.** It does not move, fade or restate. The frame's bottom rule sweeps across it and
it changes ground — cream on the plinth (13.3:1) above the rule, ink on the mat (15.6:1) below it,
mid-transition a clean horizontal split through the letterforms. Two copies, one `<h1>`; the ink
copy is `aria-hidden` decoration. The panel is sized in JS from the type it carries *and*
guaranteed to be fully consumed by the aperture, so no viewport can leave a black remnant strip —
and where a viewport is too short for the rule to clear the headline, the fade is not armed at all
and contrast wins over tidiness.

**Layout.** The mat is a CSS grid (rail | plate; masthead / plate / bottom mat), not four guessed
offsets. The bottom mat sizes itself from the type it carries and the plate takes what is left, so
nothing can collide at a viewport nobody screenshotted — which is precisely how the first pass put
the mobile lede underneath the plinth.

**Media.** Art-directed, not just resized: ≥720px gets the hall as a 12s silent loop
(`ss-ven0096`, muted/loop/playsinline/postered, paused off-screen, never under reduced motion or
save-data); portrait viewports get the standing figure (`ss-dsc07120`), because a 16:9 hall cropped
to 0.70 is a slice of two torsos. Two pictures means two truths, so `alt` is swapped with the
breakpoint.

**Scroll.** A sticky pin over 0.72 of a viewport of extra scroll. Scroll-*driven*; nothing is
intercepted, no wheel handler exists, the scroll position is always the user's.

## What I could not make work

- A portrait aperture on a landscape desktop viewport (above).
- The frame's left hairline against the photograph — a 1px rule at 0.30 alpha is invisible over a
  bright hall. The picture's own edge against the cream does that job; the rule is redundant there
  and only earns its keep over dark frames.
- The second plate on mobile.
- At 2560×900 — a very wide, short viewport — the plate is already ~3.5:1 at rest, so the reshape
  reads as a much smaller gesture. Real 2560×1440 screens are fine.

## Verification

`node verify.cjs` from this folder (Playwright, one Chromium). 54 assertions, all passing:
one `<h1>`, alt on every image and every image actually decoded, contrast measured from the
*rendered pixels* (text hidden, worst-luminance pixel in its own box) at eight text/ground pairs
including both pill states, no horizontal overflow at 19 widths from 320 to 2560, no console or
page errors, no failed requests, a full-scroll sweep asserting the masthead is never transparent
over the picture, 60fps through the reshape, and reduced-motion asserted to render a complete,
static, usable hero with no autoplay and no leftover panel.

---

## Verdict: framed vs full-bleed

**Framed wins on intentionality, craft and provable accessibility — and it is the only version
that can reshape at all, because a full-bleed hero has no ground to give back. It does not win on
immersion, and I am not going to pretend it does.**

At the first half-second, 68% coverage inside a mat reads as *a beautifully made page about a
community*; 100% coverage reads as *you are in the room*. That is a real gap and no amount of
hairline craft closes it. What the frame buys instead is a hero that is unambiguously composed:
every edge is a decision, the type is never at the mercy of a crop, contrast is provable by
construction rather than by tinting, and the composition has somewhere to go — it resolves from a
plate with a caption panel into a clean band with the headline in ink, which is a thing a
full-bleed photograph cannot do.

For this client I think that is the more truthful reading. Yoga Mandala is a peer community, not a
brand or a studio; a page that says "here is a considered frame around these people" fits it
better than one that says "be overwhelmed". It will also age better, and it is the version I would
defend in a year.

But if the client's "immersive" means what it usually means — *the picture should own the screen* —
then this candidate loses on its own terms and Concept B's full-bleed is the right answer. The
honest recommendation is to put `d-000` and Concept B in front of them side by side and let them
say which sentence they meant. The one hybrid worth testing, if there is time: keep this
composition's masthead, plinth-free type architecture, buttons and plate register, and let the
plate itself start full-bleed and *letterbox into the mat* on scroll — the reshape is the good
idea here, and it does not actually require the frame to be present at load.
