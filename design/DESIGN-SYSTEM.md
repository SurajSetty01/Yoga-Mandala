# Yoga Mandala — design system

Everything here was **measured or decided during the hero tournament**, not assumed. It exists
so no one has to rediscover it: four agents independently spent real effort learning the same
handful of facts, and two of them shipped bugs by guessing.

Read this before writing a section. The hero at `design/index.html` + `design/hero.css` is the
reference implementation of every rule below.

---

## 1. The rules that were learned the hard way

**Sand is ornament. It is never text.**
`--sand #F6D9C1` on a photograph measured **4.0:1** at 1280×720 — short of the 4.5 a small
label needs. Its luminance is too close to the frames it sits on. Sand is for the rule beside
an eyebrow, a tick on a rail, a hairline under a caption. Text on a picture is `--ink-onPic`.

**Clay cannot carry text either.**
`--clay #C1613C` is **3.90:1** with cream and 3.99:1 with ink. Two candidates found this
independently. It is a hairline and an accent. The ground a button actually stands on is
`--clay-deep #9C4526` (5.98:1), pressing to `--clay-press #7A3319` (8.5:1).

**A label on a photograph gets a ground, not a gradient.**
Tuning a scrim until small text passes is whack-a-mole: 1440 and 2560 pass while 1024×768
fails, because a fixed-geometry gradient cannot guarantee a ratio over an arbitrary crop at an
arbitrary viewport. Give the label the navigation pill's own material —
`rgba(var(--shade), 0.74)` + a `rgba(251,247,242,0.18)` hairline + `backdrop-filter: blur(14px)`.
Its contrast becomes a constant. Reusing the pill's material rather than inventing a third
surface is cohesion, not repetition.

**A transparent bar over a photograph is a contrast trap.**
Concept B's `rgba(28,23,20,0.34)` composites over the hall's skylight to ~`#7e7c76`: cream at
**3.91:1**, a fail. `0.74` composites to ~`#4b4743`: **8.6:1**. No tint fixes a bar whose
backdrop changes with every viewport. The bar owns a ground.

**Short viewports are the hard case, and it is a height problem.**
At 1024×768 the type block has nowhere to sit but high in the frame where the roof is
brightest — the headline measured 2.43:1 while 1440×900 and 2560×1440 were clean. Laptops in
this band are common. Any scrim that protects type must scale with `max-height`, not width.

**Never put `clip-path` that clips to zero on an element you `IntersectionObserver`.**
Chromium computes the intersection rect *after* clips, so the element reports ratio 0, never
fires, and stays invisible forever. This shipped once as a blank page. Clip a child.

**Specificity, twice:** `.nav a` (0,2,0) beats a bare `.cta` (0,1,0); `.nav a:not(.cta)`
(0,2,1) beats `.nav .menu` (0,2,0). Both shipped — an unreadable button, and a mobile nav that
did not exist.

**A `<video>` under a visible `<img>` must not have a `poster`.**
The poster is downloaded even when `src` is never set. Three of them cost **948 KB on every
device** — 1,777 KB → 161 KB on a phone once removed. The `<img>` beneath is the poster.

**Portrait viewports crop landscape frames hard.** Set a mobile `object-position` deliberately
and *look at it*, or the subject ends up off-screen. This shipped once with the teacher gone
and an air-cooler centre-frame.

**The client's name is set in Inter, never in Fraunces. This is not a style choice.**
*Praṇav Śāstrī* needs ṇ U+1E47, Ś U+015A, ā U+0101 and ī U+012B. Both faces load the
`latin-ext` subset (U+0100–02BA, U+1E00–1E9F), which covers all four — but **Fraunces still
mis-sets it**: it has no precomposed ā or ī, so the browser decomposes them and Fraunces'
mark positioning fails, dropping both macrons and leaving one orphaned after the final "i".
Rendered side by side at 64px, Inter is correct and Fraunces reads "Śastri ¯". Getting a
person's name wrong is not a typographic detail. If display type is wanted around the name,
set the name itself in Inter and the words around it in Fraunces.

---

## 2. Tokens

Defined in `design/_shared.css` (palette, type, reveal primitives) and extended by
`design/hero.css` (`:root`). **`_shared.css` is mandatory — extend it, never fork it.**

```
GROUNDS   --ground      #FBF7F2   the paper
          --ground-warm #F2E9DE   inset panels, alternating bands
          --ground-deep #1C1714   the reversed ground (warm black, not grey)
          --shade       16,12,10  scrim ink, as an rgb triple for rgba()

INKS      --ink         #241D18   body on paper
          --ink-soft    #5C5049   secondary on paper
          --ink-onPic   #FBF7F2   any text on a photograph
          --ink-onPic-2 rgba(251,247,242,0.90)

VOICES    --teal        #2C6E6B   rope rails, the blue kurta in shade
          --teal-deep   #265E5B   6.95:1 on cream
          --clay        #C1613C   ORNAMENT ONLY — 3.90:1
          --clay-deep   #9C4526   the CTA ground — 5.98:1
          --clay-press  #7A3319   pressed — 8.5:1
          --sand        #F6D9C1   ORNAMENT ONLY

TYPE      --font-display  Fraunces  (optical sizing on; italic carries emphasis)
          --font-text     Inter

METRICS   --rail  clamp(1.35rem, 4.2vw, 4.25rem)   page gutter
          --ease     cubic-bezier(0.22, 1, 0.36, 1)
          --ease-io  cubic-bezier(0.4, 0, 0.2, 1)
```

Every colour above was measured against its real ground. Do not introduce a new one without
measuring it with `tools/contrast-probe.mjs`.

---

## 3. Non-negotiables

1. **Contrast is verified, not estimated.** `node tools/contrast-probe.mjs <url>` measures
   composited pixels under actual glyphs. Every section must return 0 FAIL at 320×568,
   390×844, 768×1024, 1024×768, 1280×720, 1440×900 and 2560×1440.
2. **`prefers-reduced-motion: reduce` yields a complete, static, usable page.** Nothing may be
   reachable only through motion.
3. **Scroll is never hijacked.** Scroll-driven is welcome; the user's scroll position is theirs.
4. **Animate only `transform` and `opacity`.** Never width/height/top/left/box-shadow/filter in
   a scroll or pointer handler. One passive listener that raises a flag; all reads and writes
   inside one `requestAnimationFrame`. Measure geometry on load/resize only.
5. **Touch has no hover.** Every hover affordance needs a non-hover equivalent. Custom cursor
   work stays behind `(hover: hover) and (pointer: fine)`.
6. **Focus is visible on any ground** — the hero's treatment is a cream ring inside a dark
   halo, inverted on paper. Never `outline: none`.
7. **One `<h1>` per page.** Real `alt` on every image. No horizontal overflow, 320→2560.

---

## 4. Content law

`content/copy.ts` holds the client's words verbatim; `npm run check:copy` fails the build on
paraphrase. `content/site.ts` holds facts and links, with `null` meaning *not yet supplied* —
which must render as **nothing**, never a placeholder.

**Nothing may be invented.** The previous build published *"700+ teachers across India and
abroad"*, a figure in none of the client's source material. Two tournament candidates invented
a fifth nav page; a third misattributed a photograph to an event it was not taken at.

- Four pages only: About `/`, Within `/within/`, Join `/join/`, Contact `/contact/`.
- Tagline is Connect · Learn · Collaborate · **Grow**. Page 2's pillars end on **Share**.
  Both are the client's; they are not the same list.
- No location as an organisational fact until the client supplies an address. "Bengaluru"
  belongs only in photo provenance captions.
- Yoga Mandala is **an initiative under Pranava Seva Trust**. Pranava Vaakya is a Praṇava
  offering surfaced within Yoga Mandala — label it as such.

---

## 5. Every section introduces its own idea

The client was explicit: sections must not be one template with different content. The hero is
a sticky three-movement video sequence; section 02 is deliberately its inverse — one wide
moving frame on dark becomes four narrow stills on cream, type beside pictures rather than on
them.

Continuity comes from the tokens, the type scale, the caption system and the interaction
grammar. **Novelty comes from composition, media treatment and scroll behaviour.** A section
that could be swapped with its neighbour without anyone noticing has failed.

Three of four tournament candidates, left to themselves, produced a cream text column for
their second section. That is exactly how the previous build failed. If a section is turning
into body copy on paper, that is the signal to rethink it.

---

## 6. The media

`design/media/stills.json` (32 stills: role, quality, `textHeadroom`, focal point, alt,
subject) and `design/media/clips.json` (21 silent 12s loops with `videoLoop` scores). The full
703-frame vision audit is in `Context/Media/_audit/vision/`. `Context/` is read-only.

Landscape clips are scarce — **11 of 21 are portrait**. The strong landscape loops are
`ss-ven0096`, `ss-ven0139`, `ss-ven0153` (all loop-5, same hall, same light), and the hero
already uses all three. Plan around stills, or use portrait clips in portrait slots.

The dance frames (`ss-dsc0715x`, `ss-ven026x`–`031x`) are the highest-scoring in the archive
but are a Bharatanatyam performance, not yoga teaching. Use only where the festival context is
explicit; never as the primary image of what Yoga Mandala is.
