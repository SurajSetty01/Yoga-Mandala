# Sequence

**Thesis: the hero is a moving image — and the movement is one yoga class settling from standing to stillness, so the hero *earns* its exit instead of stopping.**

Three clips of the same class in the same hall, in the order the class actually
happened: **Fold → Settle → Rest.** The bodies in the frame descend as the reader
descends. Then the next section climbs over the picture for 46svh, so for most of a
screen-height the hero and section 02 are both on screen, moving together. The
handoff is an overlap, not a cut.

---

## What the media told me (before any design)

`ffprobe` on all 21 clips: **11 are portrait 1080×1920, only 10 are landscape.** The
brief names `ss-ven0139 / ss-ven0096 / ss-ven0070` as the strongest loops, but
`ss-ven0070` is portrait and cannot be a desktop full-bleed ground.

The loop-5 **landscape** clips are exactly three: `ss-ven0096`, `ss-ven0139`,
`ss-ven0153`. Same venue, same green floor, same tree mural, same skylight roof,
same camera height. And they happen to be standing forward fold → seated forward
bends → savasana. That arc was in the footage; I did not impose it.

Mobile gets a portrait trio from the same room and the same arc:
`ss-ven0070` → `ss-ven0052` → `ss-ven0131`.

---

## Bandwidth: measured, then decided

| | bytes |
|---|---|
| `ss-ven0096.mp4` (desktop opener, 1920×1080) | **2,597,784** |
| all three desktop clips | **8,299,759** |
| `ss-ven0096.avif` poster | **144,104** (5.5% of the clip) |
| the three **mobile** AVIF posters, together | **259,914** |
| same clip re-encoded 1280w crf28 | 1,403,751 |
| same clip re-encoded 960w crf30 | 710,884 |

Even the most aggressive re-encode is **2.7× the entire three-still mobile
sequence.** At a realistic thin-connection 1.5 Mbps, 2.6 MB is ~14 s; 260 KB is
~1.4 s. **There is no width at which video wins on a phone**, so:

- **Phone (≤860px), Save-Data, `effectiveType` 2g/3g, or no H.264 → no video at
  all.** The same three-movement choreography runs on stills. Verified: 0 video
  `src` assigned, on a *desktop* viewport too when Save-Data is on.
- **Desktop → clip 1 immediately (2.48 MiB).** Clip 2 loads at p>0.015, clip 3 at
  p>0.12. A reader who never scrolls pays 2.48 MiB + 412 KB of posters, not 8.3 MB.
- Videos occluded by a fully-opaque layer above them are paused. Decoding three
  1080p streams to show one is just heat.

Load story: the poster `<img>` is never removed and the `<video>` fades in only
once `readyState >= 3` **and** `currentTime > 0`. A stall, an eviction or a blocked
autoplay leaves a photograph, never a black rectangle. Both are `position:absolute;
inset:0`, so the video contributes exactly **zero** layout shift.

---

## Tried and rejected

- **GSAP.** The whole choreography is one scalar and a smoothstep. ~90 lines. Not
  loading 70 KB for that.
- **A masked wipe / scale-through between clips.** Rejected on the evidence that
  the three frames share camera height, floor and back wall — a straight
  cross-dissolve reads as *one continuous camera settling*, which is the whole
  idea. A wipe would announce itself and break it. (Reasoned from the frames, not
  A/B-built; that is the honest version.)
- **A FLIP handoff** — measuring the hero's final rect onto a slot in §02. Fragile
  across viewports and needs per-frame maths. A negative-margin overlap gives the
  same continuity with static layout and no arithmetic.
- **`--clay #C1613C` as the CTA ground.** The obvious pick from the shared
  palette. Measured **3.90:1** with cream and **3.99:1** with ink — it cannot carry
  a label in either direction. Deepened to `#9C4526` (5.98:1). `--clay` is now a
  hairline colour only.
- **Concept B's 0.34 glass pill.** Over the skylight in these frames it composites
  to ~#7e7c76 → **3.91:1**. A fail at any viewport. The bar owns a 0.74 ground.
- **Two buttons.** The client has one primary action. The secondary is now a link.
- **Dimming nav links to 0.74 opacity for hover.** That *was* the old contrast bug.
  Labels are full-opacity; hover is a hairline that draws.
- **Hiding the nav links to clean the frame.** Removes keyboard-reachable
  navigation. The whole pill lifts instead, and comes back on the first upward
  pixel or on `:focus-within`.
- **A radial-only "pool" scrim.** First build measured 0.25 alpha where the eyebrow
  sits → **1.38:1**. Rebuilt as pool + directional wedge + bottom lift, re-measured
  at 6.4:1.
- **Sand `#F0C3A4` on the picture.** On a photograph luminance is the only lever
  that survives every frame, so it went paler: `#F6D9C1`.
- **Landscape clips on a phone.** A 16:9 hall cropped into 390px is a slice of
  nothing. Art-directed to portrait sources via `<picture media=…>`.
- **Teal `#2C6E6B` for the §02 eyebrow.** 5.55:1 on clean cream, but **4.04:1**
  under the light pill's own drop shadow, which is exactly where it lands after an
  in-page jump. `#265E5B` holds 5.06:1 there.

## Kept from Concept B

One frame filling the viewport · type set *inside* it on the frame's own dark
region · a directional scrim shaped to the light, not a flat wash · a pill that
inverts as it leaves the picture.

---

## Interaction decisions

**Scroll is never touched.** The hero is `250svh` with a `position:sticky` stage;
the choreography is a function of `scrollY`, never a writer of it. Verified:
`scrollTo(0,777)` lands on 777, and the document bottom is reachable in one flick.
The only scroll the page performs is a sequence-mark click, which is user-initiated.

**Timeline** (p = progress through the stuck range):

| p | what happens |
|---|---|
| 0.00–0.16 | picture at rest, everything legible, frame at 1.10 |
| 0.16–0.36 | the type lifts and fades; it never *gains* anything, so nothing is motion-only |
| 0.20–0.42 | Fold dissolves into Settle |
| 0.42–0.69 | **the photograph alone** — no type, no chrome, scrim down to 0.38, pill lifted away |
| 0.50–0.72 | Settle dissolves into Rest |
| 0.69–1.00 | the cream climbs over it; both sections move as one |

The frame scales **1.10 → 1.00**, the reverse of the usual parallax push-in, so the
hall opens *out* as the class settles.

**Navigation.** Dark glass with a real ground over the picture (0.74, measured
8.6:1 against the worst pixel), paper over the cream. It lifts away only during the
picture-alone stretch and only while scrolling down; it returns on any upward
scroll, on `:focus-within`, and before the cream arrives — so the CTA is present for
the handoff. Mobile links live in a container, so hiding them is one `(0,1,0)` rule
and there is no specificity fight with the CTA. The Menu button opens a real sheet
that Escape closes and that returns focus.

**CTA.** A clay rectangle at 5px radius, not a pill and not white. Hover is a
darker ground that *wipes* in from the left (transform only), so `:active` gives
touch the same feedback; the arrow steps right. The secondary is a link with a
hairline, because there is one primary action.

**The right-side element** is no longer a provenance caption. It is the sequence:
three real buttons with screen-reader names, a progress hairline, and the active
label — which **walks down the rail** as the sequence advances, mirroring the
descent inside the frame. The scroll affordance and the right-hand element are one
object. Under reduced motion or no JS it is replaced by the venue line, because a
control that leads nowhere is worse than a caption.

**Focus** is a cream ring inside a dark halo — visible on the photograph, on the
cream and on the clay, without being colour-aware.

**Reduced motion** collapses the hero to exactly one screen: one photograph, all
the type, no video element ever given a `src`, no overlap, no index. Verified.

---

## Verified (Playwright, one Chromium at a time)

1440×900, 390×844, 320×568, reduced-motion, Save-Data, JS-disabled. All three clips
reach `readyState 4` with `currentTime` advancing; poster proven decoded before the
video is faded in; one `<h1>`; alt on every image; no console or page errors; no
failed requests; no horizontal overflow at 320/360/390/480/768/1024/1280/1440/1920/2560.
Contrast is measured against the *composited pixels*, by hiding the glyphs,
screenshotting, and sampling the 2nd and 98th luminance percentile of each text
rect — not by trusting the CSS. Every pair passes: worst on-picture value 6.40:1
(the hero eyebrow), worst overall 5.98:1 (the CTA, at its designed floor).

## What I did not get right

- **CLS is 0.0128, not 0.** It is the webfont swap re-flowing the bottom-anchored
  type block, not the media — video and posters are absolutely positioned and shift
  nothing. The fonts come from the shared stylesheet, so I left it.
- **The scrim's pool is visible as a soft arc** on the brightest frames of the loop
  (the bare concrete moments of `ss-ven0096`). That is the price of guaranteeing
  4.5:1 on an uncontrolled *moving* ground; I would rather see the shape than fail
  the text.
- **Loop seams.** The clips are 9–12 s and cut hard at the loop point. Nothing
  cheap fixes that; a production build should ping-pong or cross-fade the tail.
- **The third movement gets little clean screen time** before the cream starts
  climbing — roughly p 0.60–0.69. Lengthening the hero would fix it and cost
  patience; I chose patience.
- Never tested on a real device on a real Indian network. The bandwidth call is
  arithmetic on real byte counts, not a field measurement.
