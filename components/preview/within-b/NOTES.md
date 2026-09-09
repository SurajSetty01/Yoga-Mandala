# Within — concept B · SHOW IT HAPPENING. DO NOT DESCRIBE IT.

`/preview/within-b/` · `styles/preview-within-b.css` · every selector under `.within-b`.

---

## The premise

The rejected page **told** the reader that this community connects, learns, collaborates and
shares, in twenty-five bullet points. But not one of those twenty-five phrases is a promise:
"community discussions", "teacher introductions", "workshops", "expert conversations", "local
Sangha meetups" are all things that have **already happened in front of a camera**, on three
dated days, and the archive holds the frames. So the page is built as evidence rather than as
a prospectus, and the sentence it has to be able to finish is:

> *This section works like a wall of evidence with the labels pinned to it, because the
> content is a list of things that have already been photographed.*

The mechanic follows from that in one move: **the list is never the object. The list is pinned
to the picture that proves it.**

---

## How each pillar is evidenced

The four frames are the four moments of one day, in order — people arriving and talking, a
session, hands on a body, the teaching handed to the whole room — which is the approved hero's
own logic (three clips in the order the class happened) applied to a different argument.

| | Idea | Evidence | Why this frame | Provenance |
|---|---|---|---|---|
| 01 | **Connect** | `p13-img_0593` loop | Three people standing and talking while the room is laid out. "Teachers meet one another, exchange experiences." | Pranava Workshop · 13 Apr 2025 |
| 02 | **Learn** | `ss-ven0183` loop | An audience seated on the floor facing a lit screen. A session actually in progress. | Samskrithi Sadhana · 29 Jun 2025 |
| 03 | **Collaborate** | `p27-img_0889` loop | Two teachers working on one student while two more watch. Collaboration, literally, in one frame. | Pranava Workshop · 27 Apr 2025 |
| 04 | **Share** | `p13-img_0569` loop | One teacher, one student, the whole class watching and copying. It is a caption for *"teachers help teachers"* before it is a sentence. | Pranava Workshop · 13 Apr 2025 |

**The instrument for 01–03: the arch.** A tall aperture with a domed head, alternating sides
down the page, on alternating paper. The picture *drifts inside it* as the reader passes, so it
reads as a window walked past rather than a rectangle pasted on. That is the only scroll
behaviour on the page and it is transform-only.

**The list: chips that straddle the aperture's inner edge.** Half on the photograph, half on
the paper, cascading outward. This is the whole idea in one detail — and it is only possible
because the chip carries its own ground: the navigation pill's material, `rgba(--shade, 0.82)`,
whose contrast is a *constant* rather than a function of the pixel underneath (DESIGN-SYSTEM
§1: a label on a photograph gets a ground, not a gradient). One material is legible over cream
paper and over blown-out skylight alike, which is what lets a single chip sit on both at once.

**04 breaks the pattern, because the content does.** SHARE is the shortest pillar — one line
and six one-word gifts — and it is the one that turns outward. It gets the only wide frame, run
edge to edge, and the paper never comes back: from there the page is dark to the footer.

**The masthead is a contents page made of evidence.** Four narrow windows, one per idea, each
showing the footage its section opens into, hanging off the bottom of the dark band and
crossing the horizon into the paper below — the handover happens *through* the pictures, the
same move the hero makes with its 46svh overlap. They are anchors, so the contents page works.

**Every frame carries a wall label**, always visible: what is in it, then the day it was shot.
Provenance is the argument, so putting it behind a hover would weaken the page and break the
no-hover-only rule in the same stroke.

---

## Verdict on the existing Community Initiatives section

**The taxonomy is right and is kept. The rendering is not, and is gone.**

What the old section got right, and what this one inherits: two of the four are programmes
carrying long "may include" lists and two are a paragraph, and treating them identically would
be one template wearing two hats. Splitting them is correct. Tagging Pranava Vaakya as a
Praṇava offering surfaced within Yoga Mandala is correct and non-negotiable.

What it got wrong: a heading, a paragraph, a row of pale chips and a rectangular photograph
beside them is *precisely* the arrangement the client named — "right-side text, left-side text…
boxy images". Being the least-bad section on a rejected page is not an argument for shipping
it. Judged on its own, it has no idea in it: it is a card list with a nice chip treatment.

What replaces it — and this is the page's second idea, not a variation on the first:

> **The pillars are proven. The initiatives are being built.**

Everything above has already happened. The client's own word for these four is *"gradually
developing"*. So the section stands in the one room in the archive with **nobody in it** — the
Samskrithi gallery, hung and waiting, photographed before the day filled it — and that
photograph is used as *ground*, dissolving downward into `--ground-deep` so the type below is
standing inside the same picture rather than underneath it. It carries no people, so it claims
nothing, which is exactly why it can hold this content.

And **the instrument inverts.** Up the page the type is pinned to the evidence (chips on the
photograph). Down here the evidence is pinned to the type: each initiative is a measure of
prose with one photograph hung in the margin beside it, on a cord dropped from the rule that
opens the entry. Marginalia, not a card. The two prose entries are set larger, in the display
face, as statements — because that is what they are; the two programmes are set as working
documents. Different weights for different content, which is the brief's own test.

---

## What I rejected, and why

- **A tile wall.** Twenty-five phrases × twenty-five frames is the same failure as a bullet
  list wearing a coat, and the archive cannot honestly support it: it holds no photograph of a
  "reading circle" or a "retreat", and attaching one to a frame of a yoga class would be
  inventing a claim. The frame proves the **pillar**, not each item.
- **"1,311 photographs, 398 clips."** I was briefed to use the archive's scale in the argument.
  The audit's own inventory says **307 photographs and 396 clips** (`inventory.json`: 307
  `kind:photo`, 396 `kind:video`; the other 309 JPEGs are camera-generated video posters). The
  briefed figure would have been published wrong, and no count the client has not made belongs
  on the page either way. **No statistic appears anywhere on this page.**
- **The dance frames.** The highest-scoring images in the archive and completely unusable here:
  nothing on this page establishes festival context, and they are a Bharatanatyam performance,
  not yoga teaching.
- **The gallery frames as the picture of "curation".** `ss-ven0024/25/27/28` are the obvious
  literal answer for the Bulletin — pictures hung and selected on a wall. Every one of them
  reproduces third-party paintings and the audit flags all four as needing the artist's
  clearance before publication. Cut on that alone.
- **`ss-ven0092`**, the best "a room of people who came" frame in the archive: `minorsVisible`.
- **`p13-img_0610`**, the cleanest teaching frame: a derivative exists but it is not in
  `public/media/stills.json`, so it is not part of the shipped curated set.
- **The About page's four pillar tiles** (`ss-dsc07137/18/43/20`) and the hero's three loops and
  three mobile posters: all deliberately untouched, so this page shows the reader new evidence
  rather than recycling the frames they met one page earlier.
- **A fade-in on any text.** See below — it is a real contrast problem, not a stylistic one.
- **Hover-revealed provenance.** Tested as an idea, cut: the dates *are* the argument, so they
  are always on.

### Consent tiers — one open question for the client

`Context/Media/README.md` tiers every asset and says the site ships **Tier A + B only** (nobody
identifiable, or people only as a group). Every frame on this page is Tier A or B **except
`ss-dsc07144`**, the panel frame used for Pranava Vaakya. It is here because it is the only
frame in the archive of a person actually *speaking*, and the Praṇava medallion is on the wall
behind them — which is precisely what that entry has to say. It is also no new exposure: the
approved About page already ships `ss-dsc07143`, the neighbouring frame of the same four people
on the same stage. **Flagged for the client to rule on**; if it goes, the entry loses its plate
and nothing else changes.

---

## Two things worth carrying to the other concepts

**1. Text on this page never animates its opacity.** A fade is the usual way to bring a block
in, and it means that for most of a second every word sits at a fraction of its stated
contrast. Measured: the pillar heading "Learn" 300 ms into its own entrance reads **1.31:1**.
Here the type only ever *translates*; only the pictures fade, and a picture has no ratio to
fail. The number the probe reports at rest is the number a reader gets at any moment.

**2. `tools/contrast-probe.mjs` mis-reads elements sitting over playing video, and the chips
carry a 1.5px solid ring because of it.** The probe builds its glyph mask by diffing two
screenshots taken 400 ms apart. A playing loop changes between them, so *every pixel of moving
footage inside an element's floored bounding box* is counted as a glyph and then sampled
against the film. Pixel dump for one chip at 1280×720: 251 of 2,395 "glyph" pixels lay on the
single row **above** the chip — somebody's kurta, at 1.44:1 — dragging p5 to 3.44. Nothing was
wrong with the chip. `box-shadow: 0 0 0 1.5px #1c1714` extends the chip's own ground past its
border box so that row is the chip's colour in both frames. It is also simply a better edge to
read against footage. **Any concept putting small text near a `<video>` will hit this.**

Two real bugs the screenshots caught that source review would not have:

- The masthead's windows carry a negative bottom margin so they hang past the horizon. Without
  a BFC on the masthead that margin **collapsed straight out of the box**, shortening the
  header *and* pulling the next section up by the same amount — the crossing cancelled itself
  out exactly, and looked like a deliberate flush edge. `display: flow-root`.
- Wrapping the room photograph in `<picture>` made the *picture* the grid item, and a
  positioned grid item paints above every static sibling regardless of DOM order — so the
  photograph covered its own scrim and its own heading. "Community Initiatives" was invisible
  and the room was unscrimmed. z-index on the scrim and the head.

Also: `.cap`, the site's shared caption class, is `position: absolute; display: none` by the
time the hero layer has finished with it (it is the hero's no-JS provenance line). Borrowing it
silently deleted every date on this page. `styles/within.css` hit the same wall; this file
carries its own `.wb-lbl__where` in the same caption language.

---

## Measurements

**Contrast — `node tools/contrast-probe.mjs`, 0 FAIL everywhere:**

| viewport | 320×568 | 390×844 | 768×1024 | 1024×768 | 1280×720 | 1440×900 | 2560×1440 |
|---|---|---|---|---|---|---|---|
| top of page | 0 FAIL | 0 FAIL | 0 FAIL | 0 FAIL | 0 FAIL | 0 FAIL | 0 FAIL |

Because the probe only samples the first viewport, it was also run deep-linked at every
section — `#wb-01 #wb-02 #wb-03 #wb-04 #wb-init` at 390×844, 1024×768 and 1440×900: **0 FAIL in
all fifteen.** Two real failures were found and fixed this way: the chip run walked over the
pillar numeral at 1024×768 (`02` at **1.93:1**, `Learn` at **1.31:1**), which is why the
overhang is now a named token and the say column is padded by the part of it that crosses the
gutter, rather than by hoping the two never meet.

**Transferred bytes — production build (`next build`), served static, cold cache:**

| | initial load | after scrolling the whole page |
|---|---|---|
| **390 × 844** | **1,669 KB** | **2,602 KB** — no video is fetched at all |
| **1440 × 900** | **2,118 KB** | **10,906 KB**, of which 8,304 KB is the four loops |
| *approved homepage, same method* | *1,916 / 5,050 KB* | *2,457 KB @390 · 10,946 KB @1440* |
| *the page being replaced, `/within/`* | *1,484 KB @390* | *1,995 KB @390* |

The page's own photography is 359 KB of AVIF posters plus 409 KB of WebP plates. The rest of
the initial load is the site-wide baseline: 625 KB of fonts, 471 KB of framework JS, and 171 KB
of CSS that still contains all nine tournament stylesheets and will shrink when they are
deleted.

**Video discipline.** Each loop is attached and played only when its own frame is on screen,
and paused the moment it is not — nothing is downloaded before the reader reaches the frame it
belongs to. No `<video>` carries a `poster`: the visible `<img>` beneath is the poster, and
three stray posters cost 948 KB on every device on this site once already. On a phone there are
no loops at all — the same capability gate the approved hero uses
(`lib/hero-choreography.ts`: reduced motion, `saveData`/2G-3G, no MP4 support, or ≤860px), and
for the same measured reason: `p13-img_0593.mp4` is 1,733,432 B, its AVIF poster is 67,593 B,
and all four posters together are a fifth of one clip.

**Everything else:** one `<h1>`; real `alt` on all 13 images; no console errors at any
viewport; `document.scrollWidth === innerWidth` at 320, 390, 768, 1024, 1280, 1440 and 2560;
`npx tsc --noEmit` and `npx next build` clean; `eslint` clean. Focus is visible on both grounds
and follows the arch on the masthead windows. `prefers-reduced-motion: reduce` and
JavaScript-off both render the complete page from the same static HTML — four posters, four
plates, every chip, every wall label — because nothing that is already painted is ever hidden
by CSS that is not gated on the `.is-live` class the island adds.

**Scroll behaviour:** one passive listener that raises a flag; all writes inside one
`requestAnimationFrame`; geometry cached on load, resize and a `ResizeObserver`, never read in
the scroll path; only `transform` and `opacity` animate. The `IntersectionObserver`s observe
`<figure>` elements, never the arch masks — Chromium computes the intersection rect *after*
clips, and an observed element that clips to zero never fires. That shipped a blank page on
this project once.

---

## Files

```
app/preview/within-b/page.tsx
components/preview/within-b/frames.ts          the evidence + its provenance, and what was cut
components/preview/within-b/Masthead.tsx       four windows crossing the horizon
components/preview/within-b/Pillars.tsx        01–03: the arch, the chips, the wall label
components/preview/within-b/Share.tsx          04: the page opens out
components/preview/within-b/Initiatives.tsx    the empty room, and the margin
components/preview/within-b/WithinBMotion.tsx  the single client island
styles/preview-within-b.css
```

Nothing outside these files and `styles/preview-within-b.css` was touched.
