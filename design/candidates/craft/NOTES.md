# craft — notes

**Thesis: every element answers the pointer, and every answer has a keyboard and a touch twin.**

---

## What I rejected, and why

**Letter-level type reveal.** Tried on the h1. At 82px Fraunces it destroys the kerning
pairs the face is designed around (`Yo`, `va`), and eight words became forty-one animating
boxes for no gain. Word-level reads as typography; letter-level reads as a toy. Kept words.

**Blur intensifying on the pill as you approach.** The client asked about it directly. It is
a `filter`, and a `backdrop-filter` radius change re-blurs the whole backdrop every frame of
the transition — over a hero image that is *already* moving under it, that is the most
expensive thing on the page. Measured: with the pointer parallax running, disabling the
pill's backdrop-filter altogether moved the settle window from 86% → 70% of frames over
20ms. So the approach is expressed as ground alpha `0.42 → 0.52`, saturation `1.25 → 1.6`
and a **specular sheen** — a 320px radial that tracks the pointer across the glass on pure
`transform` + `opacity`. Same read, zero raster cost.

**A drag cursor state.** There is no drag surface in this hero. Building a "grabbing"
cursor for a gesture that does not exist is decoration pretending to be affordance. The
press state is real and is implemented; drag is not.

**Magnetism on the secondary link.** Text that leans toward you is a gimmick — it makes a
link feel like a button. Only the two capsules are magnetic. The link answers with an
underline that draws from the side you entered on, which is information, not spectacle.

**Auto-advancing the frame rail.** A hero that changes itself steals the user's place. The
rail moves only when the pointer, a finger, or an arrow key moves it.

**Hover-peek with no intent delay.** The first build swapped the hero the instant the
pointer touched a thumbnail; sweeping across the rail strobed the whole page. 110ms of
intent in, 320ms of grace out fixed it completely.

**Two competing pills (concept B's fill + outline).** The most generic pattern there is,
and it splits the hierarchy in half. Now: one button, one link.

**A clay-filled primary CTA.** `#C1613C` with near-white text measures **3.95:1** — it
fails. The button is warm off-white at **15.9:1** and the colour lives in the halo it casts
*into the picture*, where no text sits. No pointer state can erode a contrast ratio.

**Concept B's 0.22 scroll parallax.** To avoid a gap it needs roughly a 1.25× zoom on the
image, which crops this frame into an unreadable dark diagonal (I shipped that by accident
once and the screenshot showed it immediately). 0.038 with a 1.09 zoom is the largest
parallax the source resolution actually affords.

**A nav that hides entirely on scroll-down.** Hiding forces a hunt. See the rule below.

**Nearly cut: the pointer lamp.** It costs real compositing. Before cutting it I diffed two
renders with the lamp on and off: **max per-channel delta 22/255, 11% of pixels changed by
≥3**. It is genuinely visible — a warm lift that follows attention across the photograph —
so it stayed, and it sits *under* the scrim so it can never touch the type's contrast.

---

## What I kept, with the numbers

**Two easings, page-wide.** `--out: cubic-bezier(.16,1,.30,1)` for arrivals (hard
deceleration, long settle). `--soft: cubic-bezier(.33,.10,.20,1)` for departures and colour.

**One spring, for everything physical.** Semi-implicit Euler, `k = 0.22`, velocity
retention `0.60`. Swept in a simulator rather than guessed — at a 14px pull:

| k | retention | release settle | overshoot |
|---|---|---|---|
| 0.22 | 0.56 | 267ms | 4.1% |
| **0.22** | **0.60** | **233ms** | **8.6% (1.2px)** |
| 0.22 | 0.64 | 333ms | 14.2% |
| 0.24 | 0.68 | 400ms | 22.7% |

0.60 is the one that comes home with a single confident bounce you feel rather than see.
The *pull* is dragged by the pointer and hides its own dynamics; the tuning is entirely
about the release.

**Magnetic field.** radius = `max(w,h)/2 + 82px`, smoothstepped (`p²(3−2p)`) so there is no
edge to the field. Shape follows `0.30 × delta`, clamped ±15px. The **label rides a further
0.45× of the shape's displacement** — ≈1.45× total — so the type leads and the ground
follows, which is what makes the capsule read as a body rather than a sticker. The halo
counter-drifts at −0.40× for depth. The hit area moves *with* the shape, so a click never
lands where the button no longer is.

**Press vs hover, deliberately different.** Hover: ground → `#FFFFFF`, halo in over 420ms,
arrow +5px. Press: scale **0.955**, ground → **`#FFEEDC`** (warm, not brighter), halo in
over 100ms, arrow snaps back to +1px. Warm-and-smaller reads as *pressed*; bright-and-
larger reads as *hovered*.

**The cursor.** The dot is written at the **raw** pointer position every frame — it never
lags by more than the one rAF frame every custom cursor costs, so it never fights the hand.
Only the ring is damped (`k = 0.21`/frame, τ ≈ 72ms), because only the ring is expressive.
Ring base 40px, state by `transform: scale()` only (composited), 340ms
`cubic-bezier(.2,.85,.25,1)`; weight comes from border-*colour*, never border-width:

| state | ring | dot |
|---|---|---|
| ground | 0.78 (31px) | 6px |
| over media | 1.30 (52px), faint fill | 0.6 |
| over text | 0 | 1.8 × 21px I-bar |
| over a link | 0.46 (18px), warm | 0 |
| **approaching the CTA** | 0.50, warm — *the ring shows you the magnetic field before you arrive* | 4px |
| **over the CTA** | hidden — the button already is the feedback; two moving things is noise | hidden |
| pressed | 0.42, thicker | 1.4 |

It carries a 1px dark rim and a soft shadow: without them it vanished over the bright right
half of the photograph, which I only found by screenshotting it.

**Nav underline from the entry side.** `transform-origin` is set from `e.clientX` against
the element's rect on `pointerenter`, and re-set to the *exit* side on `pointerleave`, so it
retracts the way you left. `scaleX` over 420ms `--out`. Two `getBoundingClientRect` reads
per hover event — never inside a move or scroll handler.

**The pill.** fit-content, centred, an object rather than a bar. Ground `rgba(22,17,14,.42)`
+ `blur(18px)`, constant.

*The hide/show rule, stated once:*
1. While any part of the hero is behind it, the pill is **expanded and dark, and never
   hides** — the hero *is* the pitch and Join must stay one pointer-move away.
2. Past the hero it inverts to light, and **24px** of downward scroll **contracts** it to
   mark + Join. It does not translate away; it **reflows** (width, 460ms `--out`, one
   transition per state change, never per frame), so you never lose your place.
3. **40px** of upward scroll expands it again — scrolling up means you are looking for
   something, so give the map back.
4. Top of page (`< 8px`), pointer within 96px, or **keyboard focus inside it**: expanded,
   unconditionally. A collapsed nav that a Tab cannot open is a trap.

**Load sequence** (~1.75s, nothing fires at once): picture out of the dark (curtain 1.05s,
zoom 1.045→1 over 1.7s) · pill 60ms · eyebrow 220ms · **headline word by word, 300ms +
62ms each, 950ms `--out`, rising 105% from a clipped box with a 2° pivot** · lede 640ms ·
rule draws 720ms · button 800ms · link 880ms · rail 950ms + 70ms per frame · cue 1250ms.
It waits on `document.fonts.ready` and the hero's `decode()` (2s timeout) so it never
begins against a fallback face.

**The right-side element, rethought.** Concept B credited the picture and stopped. This
credits it *and* lets you choose it: four frames, **peek** on hover/focus (110ms in, 320ms
out, 720ms crossfade), **commit** on click / tap / arrow. Each frame carries its own
`object-position` for landscape and portrait, so no crop ever loses its subject.

---

## Frame cost

Chromium 1440×900, software raster (headless has no GPU here). Idle rAF ceiling **16.70ms**.

| | |
|---|---|
| `tick()` main-thread JS, 2.5s real-pointer sweep (151 moves) | **p50 0.30 · p90 0.70 · p99 2.00 · max 5.90ms** |
| `tick()` during scroll | p50 0.10 · p90 0.60 · **max 2.20ms** |
| frame interval, scrolling | p50 16.70 · **max 16.80ms · 0% of frames over 20ms** |
| frame interval, settle after a fast move | p50 16.70 · p90 16.70 · max 33.30ms · 1–21% of frames over 20ms across runs |

The worst frame is **5.90ms of JS** (best run 3.40), well inside budget. The residual over-20ms frames in
the settle window are raster, not script: a full-bleed photograph moving under a static
scrim forces a full-viewport re-blend, and the pill's live backdrop blur re-runs with it.
Attribution, one variable at a time on a fresh page (% of frames over 20ms):

| | |
|---|---|
| as first written | 86% |
| − pointer parallax on the image | **22%** |
| − lamp | 63% |
| − pill backdrop-filter | 70% |
| − custom cursor | 87% (free) |

So the image parallax was the whole story. The fix was not to remove it: **sub-pixel
movement of a photograph is invisible, so the image and lamp transforms are quantised to
whole pixels and the write is skipped when the rounded value has not changed.** That alone
took the settle window from 86% → ~20% and scrolling to 0%, with no visible difference.
On real GPU hardware a 1440×900 composite is microseconds; this is a software-raster
ceiling, and the JS number is the one that generalises.

**Architecture that makes it hold:** one `pointermove` listener that writes two numbers;
one `scroll` listener that only restarts the loop; one rAF loop that reads `scrollY` exactly
once at frame start and then does arithmetic on rects cached in `measure()`. No layout is
read inside the loop. Class toggles happen on state *change*, never per frame. The loop
parks itself 400ms after everything settles.

---

## Every hover affordance, and its twins

| affordance | pointer | keyboard | touch |
|---|---|---|---|
| nav link | underline draws from the entry side, retracts to the exit side | `:focus-visible` draws it from the left + a 2px `#FFC996` ring at 4px offset | permanent underline at 30% opacity; `:active` takes it to 100% |
| secondary link | rule draws from the entry side, colour → full white | same, plus ring | rule permanently at 45%; `:active` full |
| primary CTA | magnetic lean, halo lights, ground → white, arrow +5px | halo + white ground + arrow on `:focus-visible`, ring at 6px offset | halo lit **at rest**; `:active` = white ground + `scale(.975)` |
| CTA pressed | `scale(.955)`, ground `#FFEEDC`, arrow snaps back | Enter/Space fire the same `:active` path | identical |
| pill glass | firms + specular sheen tracks the pointer | `:focus-within` firms the glass identically (no sheen — there is no point to track) | `--pill-a: 0.5` permanently; no approach state to miss |
| pill contract | expands when the pointer comes within 96px | **expands on `focusin`, unconditionally** | never contracts (links are not rendered below 900px) |
| frame rail | hover peeks (110ms), click commits, label slides out | arrows/Home/End move **and** commit (`role="radiogroup"`, roving tabindex), `aria-live` announces the new frame and its alt text | tap commits; all four labels are **permanently visible**, not hover-revealed |
| custom cursor | dot + damped ring with six states | not applicable — focus rings carry the same information | never enabled: gated behind `(hover:hover) and (pointer:fine)` *and* torn down on the first `pointerdown` from a touch pointer |
| pointer lamp | warm light follows the pointer across the picture | — | — (it is ambience, and nothing is reachable only through it) |

**Reduced motion** yields the complete hero, verified: curtain 0, all eight headline words at
`opacity:1 / transform:none`, cursor `display:none`, lamp `display:none`, zoom `none`, cue
animation `none`, CTA halo lit at 0.5, CTA reachable, and the rail still commits frames on
click and arrow keys. Nothing on this page is reachable only through motion.

---

## Verified

- Contrast sampled from real screenshots with the text hidden, using tight `Range`
  line-boxes and each element's own colour and alpha, for **all four frames × three
  viewports** (1440×900, 390×844, 320×720): **0 failures**. Tightest values —
  eyebrow 4.9–10.0 (needs 4.5), nav links 6.4–10.0, lede 5.7–10.7, italic headline
  3.96–10.3 (needs 3.0 at 82px), rail index 12.1–17.8.
- No horizontal overflow at 320 / 360 / 390 / 500 / 600 / 700 / 834 / 900 / 1024 / 1200 /
  1280 / 1440 / 1800 / 1920 / 2560.
- One `<h1>`. `alt` on every `<img>`; the hero's alt is swapped with the frame and the
  inactive crossfade layer is `alt="" aria-hidden`.
- No console errors, no page errors, no failed or cancelled requests.
- Tab order: skip → mark → About → Within → Contact → Join → CTA → link → rail. Every one
  of them has a designed ring; none uses the browser default and none uses `outline:none`.

## Known limits

- The pill's live backdrop blur plus a moving full-bleed photograph is inherently the most
  expensive pairing on the page. It is fine here and fine on hardware, but if this ships to
  low-end Android I would drop the blur radius to 10px below `(max-width: 900px)`.
- Frame-interval numbers come from headless software raster and are pessimistic; the JS
  numbers are the transferable ones.
- The four rail frames are stills. A 12s clip in the rail would be the obvious next move,
  but it needs a save-data and reduced-motion path that I did not want to half-build.
