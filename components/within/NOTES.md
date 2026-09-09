# Within — the shipped page

`/within/` · `styles/within.css` · every selector under `.wi`.

This page is the promoted tournament concept **within-b**, *"show it happening, do not describe
it"*. The client chose it and asked for it **as it is**, so this was a promotion and not a
redesign: composition, mechanics, frames, copy and wall labels are the ones they approved. The
only thing that changed is when the film is fetched.

The concept's own reasoning — why each pillar is evidenced by the frame it is, what was
rejected and on what grounds, the consent tiers, the two probe artefacts — lives in
`components/preview/within-b/NOTES.md` and has not been restated here. **That preview is kept
alive on purpose** so the client can show the comparison to their own client; nothing under
`app/preview/`, `components/preview/` or `styles/preview-*.css` was touched.

---

## What was carried over

Everything. The four components are byte-for-byte the concept's, with `wb-` renamed to `wi-`
and `data-wb` to `data-wi`; `styles/within.css` is `styles/preview-within-b.css` with
`.within-b` renamed to `.wi`, plus two comment rewordings that were describing the preview's
relationship to the page it has now become.

```
app/within/page.tsx                the composition, <SiteNav light /> … <SiteFooter />
components/within/frames.ts        the evidence and its provenance, and what was cut
components/within/Masthead.tsx     four windows crossing the horizon
components/within/Pillars.tsx      01–03: the arch, the chips, the wall label
components/within/Share.tsx        04: the page opens out
components/within/Initiatives.tsx  the empty room, and the margin
components/within/WithinMotion.tsx the single client island   ← the only real change
styles/within.css
```

The rejected build's `Ideas.tsx` is gone; `Masthead.tsx`, `Initiatives.tsx` and
`WithinMotion.tsx` were replaced wholesale.

**Verified identical, not assumed.** `/within/` and `/preview/within-b/` were screenshotted
side by side under `prefers-reduced-motion` (which pins every reveal at rest, so the comparison
is deterministic) at seven scroll positions each, at 320×568, 390×844, 1440×900 and 2560×1440:
**0 pixels differ in all 28 pairs**, and the page is the same height to the pixel at every one.
With motion on, the two are the same frame-for-frame apart from the loops running out of phase
with each other, which they must.

One bug that only the screenshots caught: renaming `wb-` → `wi-` does not touch `data-wb`,
because there is no hyphen after it. The stylesheet kept twelve `[data-wb=…]` selectors while
the components emitted `data-wi`, so **every reveal start state silently stopped applying** —
the page still looked finished, just with nothing ever animating in, which is exactly the kind
of thing a source review nods through.

---

## The loading changes

The concept already had the right shape: `preload="none"`, the real source in `data-src`, no
`poster` under a visible `<img>`, no video at all on a phone or a thin connection. What it did
not have was any way to stop a transfer once it had started, and that is where its weight was.

`WithinMotion.tsx` now runs the same contract as `lib/hero-choreography.ts`, plus one verb the
hero does not need because its three clips share one sticky stage and these four are spread
down 8,000 pixels:

- **`demand()`** — attach `data-src`, play, and fade the loop in over the photograph **only**
  once `readyState >= 3` **and** `currentTime` has advanced past 0. The preview faded in when
  `play()` resolved, which is a promise about intent rather than about pixels. Proof means a
  stall, an eviction or a blocked autoplay leaves the still on screen instead of a black hole.
- **`pace()`** — play what is on screen, pause what is not, pause everything when the tab is
  hidden.
- **`release()`** — the arch is a viewport and a half clear: pause, drop the source, `load()`.
  **This is the one that costs megabytes.** `pause()` stops the decoder but not the transfer;
  Chromium keeps buffering a paused clip to the end of the file, so the preview pulls all four
  loops in full — 8,304 KB — however briefly any of them was looked at.

Two rules on top of that, both of them measured rather than reasoned:

**Attach at the first pixel of the arch, not one scroll-tick before it.** A lead margin was
tried first. At 1440×900 the first arch begins 34px under the fold, so *any* positive
`rootMargin` attaches a 1.7 MB clip during the initial load — cold first paint went from
1,735 KB to 3,252 KB. A frame that is not yet on the page does not get to spend the reader's
data. A 180 ms settle sits in front of the attach as well, so a reader flinging the page to the
footer passes four arches without paying for any of them.

**Abort what is in flight; never throw away what has already been paid for.** The first cut of
`release()` dropped the source unconditionally, and a reader who scrolled down and back up
re-fetched every clip: a down-then-up read went from 10,324 KB to **13,823 KB**, a third
*worse* than the page being replaced. `release()` now checks `buffered` against `duration` and
keeps a clip that has finished arriving, and no clip is ever dropped more than once, so the
worst an oscillating reader can be charged is twice.

### Measured effect

Production build (`next build`), served static out of `out/`, cold cache, CDP
`Network.dataReceived` so an aborted request is counted for exactly the bytes that crossed the
wire. Both routes measured on the same build with the same script. "Read-through" is eleven
stops of 1.1 s; "continuous" is a steady scroll straight down the page.

**390 × 844 — unchanged, and expected to be.** Neither page fetches a single byte of video on a
phone; the capability gate (`saveData`, 2G/3G, no MP4, or ≤860px) already saw to that, and the
page's whole weight there is posters, plates and the site-wide baseline.

| 390 × 844 | initial | after the whole page |
|---|---|---|
| `/preview/within-b/` — before | 1,180 KB | **2,019 KB** |
| `/within/` — after | 1,180 KB | **2,020 KB** |

**1440 × 900.**

| 1440 × 900 | before | after | |
|---|---|---|---|
| initial load | 1,535 KB | 1,535 KB | — |
| read-through, **unthrottled loopback** | 10,330 KB | **10,331 KB** | — |
| read-through, 6 Mbps | 8,628 KB | **6,084 KB** | −29% |
| continuous scroll, 6 Mbps | 6,933 KB | **4,497 KB** | −35% |
| down the page and back up, unthrottled | 10,324 KB | 10,324 KB | — |

**The unthrottled number does not move, and that is the honest result.** A local server hands
over a 2 MB clip in a fraction of a second, so by the time a reader has finished looking at an
arch there is nothing left in flight to abort — all four loops complete, and 8,304 KB of
footage is what this design costs when the pipe is faster than the reader. Every gain above is
therefore a gain on real connections, which is the entire audience: at 6 Mbps a reader now pays
only for the footage they actually watched, and no clip transfers more than about 900 KB.

**If the page has to get lighter than that, the media has to change, not the loading.** The
four loops are 1.7–2.7 MB of 12-second 1080p. The hero's own note records that a 960w/crf30
re-encode of a comparable clip lands at 711 KB — roughly a quarter. Four re-encoded loops would
take the unthrottled read-through from 10.3 MB to about 4.9 MB with no change to the design at
all. That is a media-derivative job in `public/media/clips/`, outside this page's files, and it
is the single biggest remaining win. **Recommended, and not done here.**

---

## What differs from the preview

Nothing that is visible once everything has loaded. In behaviour, four things:

1. The loop fades in on proof (`readyState >= 3` **and** `currentTime > 0`) rather than on
   `play()` resolving, so it appears a beat later on a slow line and never appears at all if it
   cannot actually run. The still underneath is the state either way.
2. Clips attach when the arch touches the viewport rather than at 35% visible — earlier in
   scroll, and after a 180 ms settle.
3. Clips that scroll well past and are still downloading are dropped; clips that have finished
   are only paused.
4. Everything pauses when the tab is hidden.

`prefers-reduced-motion`, `saveData`, 2G/3G, no-MP4 and ≤860px all still mean **no video is
attached at all** — verified in the browser at each gate, with the `<img>` painted in every
case, not inferred from the source.

## Verification

- **Contrast:** `tools/contrast-probe.mjs` at 320×568, 390×844, 768×1024, 1024×768, 1280×720,
  1440×900, 2560×1440 — **0 FAIL** in all seven. The probe only samples the first viewport, so
  it was also deep-linked at `#wi-01 #wi-02 #wi-03 #wi-04 #wi-init` (390×844 and 1024×768, and
  02/04/init at 1440×900): **0 FAIL in all thirteen.** Twenty runs, no failure.
- One `<h1>`. 13 images, every one with a real sentence of `alt`. 4 `<video>`, all
  `preload="none"`, **none with a `poster`**. Every `#wi-…` anchor resolves.
- `document.scrollWidth === innerWidth` at 320, 360, 390, 430, 768, 860, 1024, 1280, 1440, 1920
  and 2560, measured again after scrolling to the bottom.
- Focus is visible on all fourteen tab stops — the cream ring in a dark halo, following the
  arch on the masthead windows.
- No console errors and no failed requests at any viewport.
- `npx tsc --noEmit`, `npx next build`, `npx eslint`, `npm run check:copy` — clean.
