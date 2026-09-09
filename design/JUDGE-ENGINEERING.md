# Engineering judgment — Yoga Mandala hero, four candidates

Judged on whether these things actually work and which is the soundest foundation for a
four-page site. Taste is somebody else's job.

**Method.** One Chromium at a time, Playwright 1.62. Contrast measured from rendered pixels:
every element with a direct text node is collected with its tight `Range` line boxes, then all
text on the page is set to `color: transparent` (not `visibility: hidden` — that would also
remove a button's own background and produce false failures), the viewport is screenshotted,
the PNG is decoded in-page to an `ImageData`, and every pixel inside each line box is composited
against the text's own colour and effective opacity. Reported figures are the 2nd-percentile
worst pixel; the absolute worst is given where it differs. Elements below 0.9 effective opacity
(mid-fade) and screen-reader-only text are excluded. Frame cost from an in-page rAF interval
recorder plus CDP `Performance.getMetrics` (`LayoutCount`, `RecalcStyleCount`, `LayoutDuration`)
before and after each interaction, identical conditions for all four, headless software raster —
absolute numbers are pessimistic, the *comparison between candidates* is the signal. Bytes from
`request.sizes()`. Content defects already logged centrally (invented nav items, location claims,
the Samskrithi Sadhana caption) are excluded throughout.

---

## Ranking

| # | Candidate | The single most important reason |
|---|---|---|
| **1** | **frame** | The only candidate that passes contrast at **every** viewport tested — including 320×568, 900×600 and 1440×620, where all three others fail — because its type sits on a solid mat and a hard-edged plinth and is never at the mercy of a crop. It is also the only one that *extends* `_shared.css` with a reusable button/header/section system instead of forking it. Its blocker is one CSS rule. |
| **2** | **sequence** | The cleanest stylesheet in the set — **zero** transitions on non-composited properties — the best media-failure path, and a second section that already demonstrates "different idea, same tokens". Held back by a 1.77 MB phone payload that falsifies its own headline argument, and a 1.20:1 eyebrow at a viewport it claims to have verified. |
| **3** | **depth** | The lightest page by a factor of three, near-zero CLS, and the only mobile disclosure sheet that is fully correct. But it forks the design system, its scroll rig is one global scalar bolted to one hero and cannot drive a second section, and it is by a wide margin the most expensive thing on the list to move a pointer over: **30 fps median, 89.3% of frames over budget**. |
| **4** | **craft** | The best runtime engineering here and the only ARIA that fully works — attached to a page that cannot become a site. **There is no navigation at all below 900px**, and at 320×568 the nav pill lands on the headline (measured 1.00:1). Two blockers, a forked palette, and JS that renders a black rectangle on any page without `#hero`. |

---

## Measured comparison

### Bytes transferred for the hero

| | desktop 1440 | phone 390 @DPR2 | phone + `Save-Data: on` + `effectiveType: 3g` |
|---|---|---|---|
| depth | **505 KB** | **307 KB** | **419 KB** |
| craft | 768 KB | 577 KB | 576 KB |
| frame | 3 341 KB | 671 KB | 671 KB |
| sequence | 4 452 KB | 1 767 KB | 1 766 KB |

All four spend ~193 KB on Google Fonts woff2 from a third-party origin — render-blocking, common
to all four, not differentiating, but it should be self-hosted in production.

### Frame cost and layout

Headless software raster, 1440×900, identical script for all four: 55 wheel steps for scroll,
140 pointer moves across the hero for pointer, 48 in/out moves over the nav links.

| | scroll p50 / p95 / max · %>20 ms | pointer p50 / p95 / max · %>20 ms | forced layouts (scroll · 48 nav hovers) | CLS at load · across a session |
|---|---|---|---|---|
| depth | 16.7 / 33.4 / **50.1** · **12.8 %** | **33.3 / 50.0 / 83.3** · **89.3 %** | 8 · 0 | **0.0010** · **0.0004** |
| sequence | 16.7 / 33.4 / 66.6 · 11.7 % | 16.7 / 16.7 / 16.8 · **0 %** | 9 · **0** | 0.0129 · 0.0135 |
| craft | **16.7 / 16.7 / 16.8 · 0 %** | **16.7 / 16.7 / 16.8 · 0 %** | 33 · **50** | 0.0690 · 0.0697 |
| frame | **16.7 / 16.8 / 16.8 · 0 %** | 16.7 / 16.8 / 16.8 · **0 %** | 45 · 0 | 0.0663 · **0.1461** |

Zero long tasks anywhere. No candidate hijacks scroll: all four return exactly 777 from
`scrollTo(0, 777)`, reach the document bottom, and return to the top. Nobody registers a `wheel`
handler. Requirement 5 is met by all four.

### Contrast failures from rendered pixels (2nd-percentile worst pixel, effective opacity ≥ 0.9)

| viewport | depth | sequence | craft | frame |
|---|---|---|---|---|
| 1440×900 | pass | `· Bengaluru` **4.37** (needs 4.5) | pass | pass |
| 2560×1440 | pass | pass | pass | pass |
| 768×1024 | pass | pass | pass | pass |
| 390×844 | pass | pass | pass | pass |
| 320×900 | pass | pass | pass | pass |
| **320×568** | eyebrow **2.66** (min 2.43) | eyebrow **1.20**, h1 **2.05** (needs 3.0) | eyebrow **1.69** (min 1.03), "vast." **1.00** (needs 3.0) | **pass** |
| **900×600** | eyebrow **2.63** (min 2.45) | eyebrow **3.76**, `· Bengaluru` **1.35**, lede **3.07** | pass | **pass** |
| **1440×620** | pass | `· Bengaluru` **3.11** | pass | **pass** |
| scroll sweep, 1440 | `.quiet` **1.32** at y=900 | pass, y 1500–2600 | — | (see F-8) |

### Traps and structure — all four

- **`clip-path` + IntersectionObserver:** I instrumented the `IntersectionObserver` constructor
  before navigation and logged every `observe()` target with its computed `clipPath`. **No
  candidate observes a clipped element.** All observers fire; no double-firing (every target
  reported exactly the initial entry plus one). Trap avoided by all four. frame's single
  `clip-path` (`.type--dark`, `inset(187.2px 0 0)` on a 187px box — clipped to zero area) is
  correctly not an observer target.
- **Exactly one `<h1>`:** all four. `lang="en-IN"`, `<header>`/`<nav>`/`<main>`, skip link: all
  four. No `<footer>` in any of them.
- **No horizontal overflow** at 320/360/390/414/768/834/900/1024/1280/1440/1920/2560, plus
  900×600, 1440×620 and 390×1200: all four pass. Elements that exceed the viewport edge are
  deliberately over-scaled media inside clipping parents in every case.
- **No console errors, no page errors, no failed requests** on a clean load: all four.
- **No link anywhere on any of the four points at `https://wa.me/919110891897`**, which the brief
  names as the primary call to action sitewide. Shared defect, not differentiating.

---

## Defects

### frame — ranked 1

**F-1 · BLOCKER — animates `width`, `height`, `padding`, `border-radius` and `box-shadow` on a
fixed full-width header, and the file says it does not.**
`frame.css:12` (file header comment): *"No width/height/top/left is animated anywhere."*
`frame.css:79–83`:
```css
transition:
  width 0.62s var(--ease), height 0.62s var(--ease), padding 0.62s var(--ease),
  border-radius 0.62s var(--ease), background 0.4s linear,
  border-color 0.4s linear, box-shadow 0.5s var(--ease),
  transform 0.45s var(--ease), color 0.35s linear;
```
`.mast[data-state="pill"]` (`frame.css:92–102`) changes `width`, `height`, `padding`,
`border-radius`, `box-shadow` **and `top`** — `top` is not in the transition list, so it snaps
while the rest animates. `backdrop-filter: blur(18px) saturate(1.4)` is applied in the same rule.
The state flips on `y > heroBottom` (`frame.js:130`) with no hysteresis. This is a direct
violation of hard requirement 6, and the false comment is the more serious half: it is exactly
what a reviewer would trust instead of checking.

**F-2 · SERIOUS — F-1 has a measured cost: frame is the only candidate that accrues CLS after
load.** Load CLS 0.0663 (webfont swap, like the others); across a session that flips the masthead
state, **0.1461** — over the 0.1 "good" threshold. The shift sources logged by
`PerformanceObserver` include `NAV.mast__nav [1028,18,368,41] → [1017,18,379,41]` and its child
`<a>`s: the header's own children move because the header's *width* is being animated. depth,
sequence and craft accrue essentially nothing after load (0.0004 / 0.0135 / 0.0697).

**F-3 · SERIOUS — the masthead still morphs under `prefers-reduced-motion: reduce`, and it lands
on top of the eyebrow.** frame is the only candidate whose reduced-motion render *changes on
scroll* (transform/opacity snapshot of the first 400 elements before and after a 450px scroll:
depth, sequence, craft identical; frame different). Screenshot `frame-rm-1440-s450.png` shows the
morphed pill sitting over "A COMMUNITY OF YOGA TEACHERS · BENGALURU", with the first half of the
eyebrow occluded. A 620 ms shape animation is motion, and this one destroys content.

**F-4 · SERIOUS — the mobile sheet is orphaned by a resize.** Open the sheet at 390, resize to
1100: `aria-expanded` stays `"true"`, the sheet stays `display:block` with **5 reachable links**,
and the burger that would close it becomes `display:none`. Screenshot `frame-sheet-1100.png`
shows the desktop masthead and the mobile sheet on screen together, with duplicate nav items and
**two** "Join the WhatsApp community" buttons over the hero. There is no `matchMedia` listener
for the wide breakpoint. (sequence has the identical bug; depth does not.)

**F-5 · SERIOUS — every link on the page is `href="#"`. All fifteen of them** — the wordmark,
all five nav items in the masthead, all five again in the sheet, the primary CTA, the secondary
link and the tail link. The only real anchor is the skip link (`#lede`). Nothing is wired; a
click on anything jumps to the top of the document. This is the worst link integrity of the four
by a distance and it is what let the five-item nav sail through 50+ self-tests.

**F-6 · SERIOUS — 340 KB `ss-ven0096.jpg` is downloaded at 390px, where the video is never given
a `src`.** `index.html:80` puts `poster="/media/posters/ss-ven0096.jpg"` on a `<video
preload="none">`; Chromium fetches a poster for a rendered `<video>` regardless of `preload`.
That is 51 % of frame's entire 671 KB phone payload spent on an image that is never shown — the
visible still is the 81 KB `ss-dsc07120-960.webp` supplied by the `<picture>` beneath it.

**F-7 · MINOR — `mqReduce.addEventListener('change', () => location.reload())`** (`frame.js:249`).
Toggling the OS motion preference throws away scroll position and any form state. Fine in a demo;
across four pages it is a user-visible page flash on a system setting change.

**F-8 · MINOR — the semantic `<h1>` is the invisible copy for most of the hero's scroll range.**
There are two type blocks; the ink one (`.type--dark`) is `aria-hidden` decoration and carries
the visible glyphs from y≈150 onward, while the real `<h1>` and `<p class="eyebrow">` are cream
on the cream mat: measured 1.00:1 and 1.69:1 continuously from y=150 to y=1200 at 1440×900. It
renders correctly — I checked the screenshots — but find-in-page, text selection and any
`forced-colors` / Windows High Contrast rendering (which drops the backgrounds that make the trick
work) will land on, or double, invisible text.

**F-9 · MINOR — `verify.cjs` is materially weaker than "54 assertions, all passing" implies.**
Its `clipped()` helper (lines 469–475) exempts any element with an ancestor whose `overflow-x`
is not `visible` — and `.hero__pin` and `.stage__clip` are `overflow: hidden`, so **the entire
hero is exempt from the per-element overflow check at all 19 widths**; line 478 also skips
`opacity: 0` elements, so `.inset` is never tested at any width. Two of the eight claimed
contrast pairs (lines 276–280, 294–296) push an `INFO` note and let the suite report all-passing
if the state is not reproduced. The header-trap assertion (line 251) compares
`backgroundColor === 'rgba(0, 0, 0, 0)'` — a string test, not a contrast test;
`rgba(251,247,242,0.01)` would pass it. `scroll-behavior: smooth` (`frame.css:39`) is live in
every test context while `setP()` scrolls and waits 260 ms, so the p=1 assertions may sample a
still-moving scroller. Do not treat this file as a scoreboard.

### sequence — ranked 2

**S-1 · BLOCKER (for its own thesis) — 1.77 MB on a 390px phone with `Save-Data: on` and
`effectiveType: '3g'`, of which 950 KB is three unused JPEG posters.**
The candidate's central argument is: *"There is no width at which video wins on a phone… 260 KB
is ~1.4 s."* It correctly assigns **no video src** on mobile — that part is true and verified.
But `index.html:72, 85, 98` put `poster="/media/posters/ss-ven{0096,0139,0153}.jpg"` on three
`<video>` elements, and those posters are fetched anyway: **340 + 338 + 272 = 950 KB**, on top of
the 254 KB of AVIF the `<picture>` actually displays. Measured phone payload is **6.8× depth's**
and about **7× the figure the argument rests on**. At the 1.5 Mbps the NOTES uses, that is ~9.4 s,
not 1.4 s. The fix is one attribute: the `<img>` underneath already *is* the poster.

**S-2 · SERIOUS — the desktop load figure in NOTES is 950 KB short.** Claimed: *"A reader who
never scrolls pays 2.48 MiB + 412 KB of posters."* Measured at 1440×900 on first load: **4 452 KB**
= 2 537 KB mp4 + **950 KB JPEG posters for clips 2 and 3 that have not been requested yet** +
403 KB AVIF + 315 KB webp + 193 KB fonts. The lazy-loading of clips 2 and 3 works; their posters
are not lazy at all.

**S-3 · SERIOUS — contrast fails at 320×568, a viewport the NOTES says was verified.**
NOTES: *"Verified (Playwright…) 1440×900, 390×844, 320×568… Every pair passes: worst on-picture
value 6.40:1."* Measured at 320×568 @0, full opacity, from rendered pixels: eyebrow **1.20:1**
(needs 4.5), `<h1>` **2.05:1** (needs 3.0), the italic `<em>` 3.25 (min 2.67). Also failing:
900×600 — eyebrow 3.76, `· Bengaluru` 1.35, lede 3.07; 1440×620 — `· Bengaluru` 3.11; and even
1440×900 — `· Bengaluru` **4.37** against a 4.5 threshold.

**S-4 · SERIOUS — the mobile sheet is orphaned by a resize** — identical to F-4.
`aria-expanded="true"`, sheet `display:flex` with 4 reachable links, burger `display:none` at
1100px, and it is still open on the way back to 390.

**S-5 · SERIOUS — the navigation is not wired and the primary CTA is `href="#"`.**
"Within", "Gatherings" and "Contact" **all point to `#within`** — three labels, one destination.
The primary CTA is `<a class="btn-join" href="#" id="join">`, and it carries `id="join"`, so the
two `href="#join"` links in the header scroll to the button itself, which by then is at
`opacity: 0; pointer-events: none`.

**S-6 · SERIOUS — the brief's documented specificity trap, shipped and papered over.**
`.sheet__cta` sits inside `.sheet__nav`, so `.sheet__nav a` (0,2,0) beats `.sheet__cta` (0,1,0).
It is patched with **six `!important`s** at `sequence.css:171–174` rather than by fixing the
selector. NOTES claims the opposite: *"there is no specificity fight with the CTA."* True for the
header pill, false for the sheet.

**S-7 · SERIOUS — two leaks in `demand()` (`sequence.js:156–163`).**
`v.addEventListener('timeupdate', live)` is never removed, so `live` keeps firing at ~4 Hz per
video for the life of the page; `setInterval(live, 120)` is cleared only on success or on
`error`, so a **stalled or autoplay-blocked** video polls at 8.3 Hz forever. Neither is visible in
a happy-path demo; both are exactly what a flaky phone network produces.

**S-8 · MINOR — the skip link goes to `#within`,** skipping the `<h1>` and the primary CTA. A
skip link should land on main content, not past it.

**S-9 · MINOR — `will-change` on five layers and never reset,** including under
`prefers-reduced-motion`. Reduced-motion users pay for five promoted compositor layers for
animations that will not run. (depth resets `will-change` under RM at `depth.css:574`; frame at
`frame.css:546`; craft does not.)

**S-10 · MINOR — hero stills have no `srcset`,** only art-direction `media`. One JPEG serves 390px
and 2560px. `.scrim-right` is declared twice back-to-back inside the 860px media query
(`sequence.css:482–487`); `.html-static` (`css:182`) is a dead selector. `setSheet(false)` calls
`btn.focus()` even when the user clicked a *link* in the sheet, yanking focus back to Menu and
fighting the anchor jump.

**S-11 · MINOR — `.pill__cta { display: none }` below 860px** puts the primary CTA behind a
JS-only sheet on phones. With JS off the phone header is a wordmark and a dead button. (depth
keeps `.navCta` visible there — the better call.)

### depth — ranked 3

**D-1 · SERIOUS — by a wide margin the worst frame cost of the four, and the NOTES number is not
reproducible.** NOTES: *"38 rAF frames/sec under continuous synthetic scroll-thrashing vs 42 for
the same page with the depth plates removed. ~4 fps for the whole rig."* Measured under identical
conditions to the other three:

| | measured | the others |
|---|---|---|
| pointer sweep, p50 frame interval | **33.3 ms (≈30 fps)** | 16.7 ms for all three |
| pointer sweep, p95 / max | **50.0 / 83.3 ms** | 16.7 / 16.8 |
| pointer sweep, frames over 20 ms | **89.3 %** | 0 % for all three |
| pointer sweep, script + style recalcs | 19.1 ms · 324 recalcs | sequence 5.4 ms · 0 |
| scroll, p95 / max · frames over 20 ms | 33.4 / 50.1 · **12.8 %** | craft & frame 0 % |

The cause is structural: `depth.css:280` puts `filter: blur(3.5px) saturate(0.84)` on the near
plate's `<img>`, which lives inside `.plateIn` whose `scale()` changes **every frame**
(`dz: 0.125`) — a filtered render surface re-rasterised at a new scale per frame, full viewport —
under `.grain { mix-blend-mode: overlay }` (`css:299–305`) inside `.stage { isolation: isolate }`,
which forces a full-viewport re-blend on top. This is not a software-raster artefact you can wave
away: it is 2× the frame budget on the *median* frame while the others sit at zero.

**D-2 · SERIOUS — contrast fails at two untested viewports.** The eyebrow measures **2.66:1**
(worst pixel 2.43) at 320×568 and **2.63:1** (worst pixel 2.45) at 900×600, against a 4.5
threshold. NOTES reports "eyebrow 8.33 desktop / 5.37 at 390" — both reproduced exactly (I get
8.44 and 5.68/5.37) — but the contrast rig only ran "5 scroll positions × 2 viewports", and
neither short viewport was one of them.

**D-3 · SERIOUS — the hero's secondary link goes cream-on-cream and stays focusable.**
`.quiet { color: var(--cream) }` (`depth.css:384–389`) with no ground of its own. At scrollY 900,
1440×900, it measures **1.32:1** at full opacity — invisible, still in the tab order, still
occupying layout (see `depth-exitfail-900.png`). This is the same failure class the NOTES
describes catching and fixing for the credit rail (*"the credit rendered cream-on-cream —
measured 1:1"*); the `.ground` gradient is claimed to *"guarantee the contrast under the words at
every scroll position"* and does not.

**D-4 · SERIOUS — it forks the design system.** `index.html:13` links only `depth.css`;
`_shared.css` is never loaded. `depth.css:13–41` redeclares 17 shared token *names* with drifted
values (`--ink-soft: #55483F` vs the shared `#5C5049`; `--page: 4.2vw` vs `4vw`) and adds a global
element reset on `html, body, img, video, svg, a, h1, h2, p, ol, li`. Page 2 must either inherit
this fork or fight it. Only `sequence` and `frame` load `_shared.css`.

**D-5 · SERIOUS — the scroll rig cannot drive a second section.** `RIG` looks parameterised, but
`prog = scrolled / heroH` is one global scalar measured off `#top`; `write()` is hard-wired to 13
`getElementById` lookups and exports nothing. Section 2 of page 1 would need a rewrite to
per-element ranges, not a second call.

**D-6 · SERIOUS — six dead anchors, and one link whose label contradicts its destination.**
`#join` ×3 and `#contact` ×3 have no matching `id` anywhere in the document (the ids are `top,
main, creed, within, …`). The closing secondary link is labelled "What happens within" and points
at `#contact`.

**D-7 · MINOR — `getComputedStyle` + `hero.offsetHeight` inside an undebounced `resize` handler**
(`readVars()`, `depth.js:49–55`, registered raw at `depth.js:214–215`): one style recalc and one
forced layout per resize tick. This is the source of the "one console warning and one aborted
preload when the harness resized eleven times" the NOTES mentions. `lightUp()` (`depth.js:145`)
does two `getBoundingClientRect()` reads then an immediate style write inside a
`pointerenter`/`focus` handler.

**D-8 · MINOR — `transition: … width 0.32s` on `.burgerBox i` (`depth.css:188`) and `box-shadow`
transitions on `.pill` (113–114) and `.btn` (363).** Small elements, small violation of
requirement 6, but a violation.

**D-9 · MINOR, and self-reported — the mobile crop.** At 390×844 the group is entirely cropped
out and the crown of the teacher's head is clipped by the viewport top (`depth-390x844.png`). The
candidate flags this itself and I agree with its own assessment that no crop of a 3:2 negative
fixes a 9:19.5 screen.

**D-10 · MINOR — one photograph, used twice.** The far plate and the near plate are the same
frame. The brief was written against a build that used 29 of ~1 700 assets; this uses one.

**Verified and correct, worth saying:** depth's disclosure sheet is the only fully correct one of
the three that have one. Enter and click both open it; Escape closes it and returns focus to the
burger; **resizing to 1100px closes it and hides the burger together**. Its `?flat=1` A/B control
condition is honest engineering that the other three do not offer.

### craft — ranked 4

**C-1 · BLOCKER — there is no navigation at all below 900px.**
`craft.css:753`: `@media (max-width: 900px) { .pill__rail { display: none } }`, and there is no
burger, no sheet and no disclosure anywhere in the file. Measured tab order at 390×844:
`skip → wordmark → Join → CTA → "What happens within" → rail button → body`. Visible links in
`header, nav`: `["Yoga Mandala", "Join"]`. **Three of the site's four routes are unreachable on
every phone**, by keyboard or by pointer. The NOTES describes this as "links are not rendered
below 900px" in a table cell about touch affordances and does not list it under "Known limits".

**C-2 · BLOCKER — at 320×568 the nav pill lands on the hero type.**
See `craft-320x568.png`. The eyebrow is almost entirely occluded by the pill —
measured **1.69:1**, worst pixel **1.03:1** — and the headline word "vast." measures **1.00:1**
against the pill's own cream ground, against a 3.0 threshold. NOTES claims contrast verified at
"1440×900, 390×844, **320×720**"; 320×568 (iPhone SE, and a very common Android) was never tested
and the layout does not survive it.

**C-3 · SERIOUS — cream on clay is shipped in two places, and the NOTES rejects exactly that
pairing.** NOTES: *"A clay-filled primary CTA. `#C1613C` with near-white text measures 3.95:1 —
it fails."* Shipped anyway:
- `craft.css:238–239` — `.pill.is-light .pcta { color: var(--onDark) }` +
  `.pill.is-light .pcta__bg { background: var(--clay) }`. Measured from rendered pixels once the
  pill inverts: **3.90:1** on the 13px/600 "Join" label. That is the primary nav CTA.
- `craft.css:627–630` — `.reg__grid i { color: var(--clay) }` at 10.5px on cream. Measured
  **3.90:1** on all four numerals. (Computed exactly: `#C1613C` on `#FBF7F2` = 3.93:1.)

**C-4 · SERIOUS — 50 forced synchronous layouts across 48 pointer moves over the nav.**
CDP `LayoutCount` delta: craft 50 layouts / 4.4 ms; depth 0, sequence 0, frame 0. Cause:
`pill.addEventListener('transitionend', …)` re-runs `measure()` on `propertyName === 'transform'`
(`craft.js:400–402`); `transitionend` bubbles, and `.nav a` transitions `transform 0.3s`
(`craft.css:203`) with `.nav a:hover { transform: translateY(-1px) }` (`craft.css:215`).
`measure()` then writes `pillRail.style.width = 'auto'`, reads `.width` back and resets
(`craft.js:114–119`) — a read-after-write reflow — **and wipes every magnet's inline transform**
(`craft.js:99–101`). NOTES says measure runs "on load / resize / transitionend only" and does not
notice that hovering a nav link is a transitionend.

**C-5 · SERIOUS — CLS 0.069 at load, unreported.** Attributed to a single 0.068 shift at 383 ms:
`DIV.hero__copy [54,329,612,508] → [54,441,612,396]` — the webfont swap reflowing the hero copy
block. 69× depth's and 5× sequence's, and sequence is the only candidate that reports its CLS at
all.

**C-6 · SERIOUS — it forks the design system too.** `_shared.css` is never loaded. The palette is
re-cut under new names with drifted values (`--deep #17110E` vs shared `--ground-deep #1C1714`;
`--ink #221B16` vs `#241D18`), with **66 colour literals outside the token block**, and a global
reset on `body, a, button, img, svg, video`. There is no spacing or type scale: `13.5px / 11.5px
/ 14.5px / 10.5px / 15px` are hand-picked.

**C-7 · SERIOUS — `craft.js` fails closed into a black rectangle.** `measure()` calls
`hero.getBoundingClientRect()` at init (`craft.js:90, 563`) with no guard, on one of 20 unguarded
hard-coded selectors. `.js` is set inline in `<head>`, so a page without `#hero` throws *before*
`root.classList.add('ready')` and the CSS leaves `[data-seq] { opacity: 0 }` and
`.curtain { opacity: 1 }` — a black screen. Any of the other three pages that forgets one id
gets this.

**C-8 · SERIOUS — a cream custom cursor with no light-ground variant, while the native cursor is
removed globally.** `html.cur-on * { cursor: none !important }` (`craft.css:670`); the ring is
`rgba(251,247,242,0.72)` (`craft.css:681`) with no inverted state. `root.classList.toggle('nav-light')`
exists (`craft.js:268`) but only drives `.veil`. On `.register`, `.closer` — and on every light
section of the other three pages — this is a cream cursor on a cream ground with no fallback.

**C-9 · MINOR, disclosed — `transition: width 0.46s` on `.pill__rail` (`craft.css:191`)** while
`backdrop-filter: blur(18px)` is live on the same element. Bounded and hysteresis-guarded, and
honestly reported, but it is still requirement 6.

**C-10 · MINOR — `will-change` on 13 declarations / ~24 permanently promoted elements,** including
both full-viewport hero images (`craft.css:276`), a 780px lamp (293) and eight headline words that
animate once at load and stay promoted forever (386). The reduced-motion block
(`craft.css:803–826`) never resets any of them.

**C-11 · MINOR — nav destinations.** About, Within and Contact all `href="#within"`; both CTAs
`href="#"`.

**Verified and correct, worth saying:** craft's ARIA is the only ambitious ARIA in the set that
fully works. `role="radiogroup"` + `aria-checked` + roving `tabindex` are genuinely maintained;
ArrowRight moved checked from `[true,false,false,false]` to `[false,true,false,false]`, moved the
tabindex, moved focus, and updated the `aria-live="polite"` region to *"In discussion. A barefoot
man on a green stool talks to a small group…"*. The hero image and its `alt` swap together —
before: `ss-dsc07118-960.webp` / "A teacher leans in and holds a hand just above a student's
back"; after committing frame 3: `ss-dsc07120-960.webp` / "A practitioner balances on one leg
with palms…". Verified, not asserted.

---

## NOTES.md claims I could not reproduce

| Candidate | Their claim | My measurement |
|---|---|---|
| depth | "38 rAF frames/sec under continuous synthetic scroll-thrashing vs 42 … ~4 fps for the whole rig" | Pointer sweep: **p50 33.3 ms (30 fps), 89.3 % of frames over 20 ms**, 19.1 ms script, 324 style recalcs. Scroll: p95 33.4 ms, max 50.1 ms, 12.8 % over 20 ms. The other three sit at 16.7 ms / 0 %. |
| depth | "Everything clears its threshold." | Eyebrow **2.66:1** at 320×568 and **2.63:1** at 900×600 (needs 4.5); `.quiet` **1.32:1** at scrollY 900 at 1440×900. |
| depth | "11 focusable elements walked in tab order, every one with a 2px ring **and scrolled into view**" | 11 focusable, all with rings — but tab stop 9 (`a.btn.btn--dark`) is focused at effective opacity **0** and out of view, and stop 10 (`a.quiet.quiet--dark`) at effective opacity **0**. The reveal observer only fires *after* the focus scroll. |
| depth | "nav links 6.97 [:1] … measured 6.97–11.65:1 at every scroll position" | Reproduced at the sizes they tested (7.64–8.44 at 1440×900) — but the `@supports (backdrop-filter)` block at `depth.css:118` drops the pill's ground from `rgba(20,14,10,.66)` to **0.50** for every modern browser, so the figure is a property of this photograph, not of the design. |
| sequence | "There is no width at which video wins on a phone… 260 KB is ~1.4 s" / "A reader who never scrolls pays 2.48 MiB + 412 KB of posters" | Phone + Save-Data + 3g: **1 766 KB** (950 KB of it unused JPEG `poster` attributes). Desktop first load: **4 452 KB**. |
| sequence | "Verified … 320×568 … Every pair passes: worst on-picture value 6.40:1" | 320×568: eyebrow **1.20:1**, h1 **2.05:1**. 900×600: `· Bengaluru` **1.35:1**, lede **3.07:1**. 1440×900: `· Bengaluru` **4.37:1**. |
| sequence | "there is no specificity fight with the CTA" | `.sheet__nav a` (0,2,0) beats `.sheet__cta` (0,1,0); patched with six `!important`s at `sequence.css:171–174`. |
| sequence | "CLS is 0.0128" | **0.0129 at load / 0.0135 across a session.** Reproduced. Credit where due — the only candidate that reported its CLS, and it was honest. |
| craft | "frame interval, scrolling: p50 16.70 · max 16.80 ms · 0 % of frames over 20 ms" | **Reproduced exactly**, and also 0 % during a 140-move pointer sweep. The best runtime numbers in the set. |
| craft | "Contrast … all four frames × three viewports (1440×900, 390×844, 320×720): 0 failures" | Reproduced at those three. At **320×568**: eyebrow 1.69 (worst pixel 1.03), "vast." **1.00:1**. Also `.pcta` **3.90:1** once the pill inverts, and `.reg__grid i` **3.90:1**. |
| craft | "Two `getBoundingClientRect` reads per hover event — **never inside a move or scroll handler**" / "`measure()` runs on load / resize / transitionend only" | **50 forced layouts / 4.4 ms across 48 nav hovers** (0 for all other candidates), because `.nav a`'s `transform` transition bubbles a `transitionend` into the pill's `measure()`. |
| craft | Tab order "skip → mark → About → Within → Contact → Join → CTA → link → rail" | Reproduced at 1440. At 390 it is `skip → mark → Join → CTA → link → rail` — **no nav links exist at all**, which the NOTES does not list as a limit. |
| frame | `frame.css:12`: "No width/height/top/left is animated anywhere." | `frame.css:79–83` animates `width`, `height`, `padding`, `border-radius`, `box-shadow` for 620 ms on the fixed `.mast`; `top` changes untransitioned. |
| frame | "the aperture is two OPAQUE GROUND-COLOURED BLADES that only ever translate … median 16.7 ms, p95 16.8 ms, 0 frames over 20 ms" | **Reproduced.** `.blade--t/--b` and `.edge--*` translate only; scroll p50/p95/max 16.7/16.8/16.8, 0 % over 20 ms. The blades are the best idea in the set. |
| frame | "reduced-motion asserted to render a complete, static, usable hero" | Complete and usable — yes, and the best reduced-motion render of the four. **Not static**: it is the only candidate whose RM render changes on scroll, and the morphed pill occludes the eyebrow at y≈450. |
| frame | "Mobile is a real disclosure sheet: focus moves in, Escape and outside-click close it" | True as far as it goes — and then a resize to 1100px leaves it open with `aria-expanded="true"`, 5 reachable links and no burger. |
| frame | "`node verify.cjs` … 54 assertions, all passing … no horizontal overflow at 19 widths" | 29 `ok()` sites → ~51–53 dynamic assertions. The overflow sweep exempts **the entire hero** via `clipped()`; two contrast pairs are conditional; the header-trap check is a string comparison. |

---

## What should make production

Named by candidate and by file/selector.

1. **frame — type on a ground the design owns, not on the photograph.** `.plinth` (a hard-topped,
   hard-edged block of the frame's own warm black, right edge landing on the actions column)
   instead of a feathered gradient scrim. This is the *only* reason frame passes contrast at
   320×568, 900×600 and 1440×620 while the other three fail there, and it makes contrast a
   property of the system rather than of the crop. **Adopt this as the sitewide rule for type
   over imagery.**
2. **frame — reshape by occlusion, not by clipping or resizing.** `.blade--t` / `.blade--b` /
   `.edge--*` (`frame.css:280–287`): opaque ground-coloured elements that only `translate`. Zero
   paint, hairlines trimmed by occlusion, measured 0 % of frames over 20 ms. Use this pattern
   anywhere a section needs to change shape — and use it to replace F-1's animated `.mast` width.
3. **craft — quantise transform writes to whole pixels and skip the write when the rounded value
   has not changed** (`craft.js:224–232`). Sub-pixel movement of a photograph is invisible;
   this is why craft is the only candidate with 0 % dropped frames during a pointer sweep *and*
   a scroll. Apply it to every scroll- or pointer-driven transform on the site.
4. **craft — the rail's accessibility pattern, entire.** `role="radiogroup"` + `aria-checked` +
   roving `tabindex` + Arrow/Home/End + an `aria-live="polite"` status that announces the new
   frame *and* its alt text, with the visible image's `alt` swapped in the same commit
   (`craft.js:452–453, 463–513`). It is the only ARIA in the set that I could verify end to end.
   Reuse it for any future gallery, tab set or filter.
5. **sequence — the poster-first video contract.** `preload="none"`, `<picture>` still underneath
   that is never removed, `src` assigned from `data-src` only on demand, video revealed only once
   `readyState >= 3 && currentTime > 0`, and an `error` handler that restores the still
   (`sequence.js:150–182`). With `**/*.mp4` aborted, sequence and frame both degraded to a
   photograph with zero page errors. Make this the sitewide video component — **and delete the
   `poster` attribute from it** (see S-1/F-6: the `<img>` beneath already is the poster, and the
   attribute costs 950 KB on a phone).
6. **sequence — `--shade` as a bare `r, g, b` triple** that ~40 scrim stops derive from
   (`sequence.css`). One token controls every scrim on the page. The best token idea in the set.
   Pair it with `_shared.css` as the single palette — **and make loading `_shared.css` mandatory**;
   two of the four forked it and would have given the site two different warm blacks.
7. **sequence — zero non-composited transitions.** Its entire stylesheet animates only
   `transform`, `opacity` and `background`. That is the standard the other three should be held
   to; it costs nothing and it is the only one that meets requirement 6 outright.
8. **depth — the mobile disclosure sheet, exactly as written.** Opens on Enter and click, closes
   on Escape / outside `pointerdown` / link click / **resize past 900px**, and returns focus to
   the burger. It is the only one of the three that survives a resize (F-4, S-4). Take depth's
   version, not frame's or sequence's.
9. **depth — rig constants declared in CSS and read back by JS** (`readVars()`, and the
   `--bias-x` / `--plate-scale` overrides at `depth.css:499–504`). One source of truth for
   breakpoint-varying motion values, tunable from a media query without touching JS. sequence
   duplicates `860px` in both `sequence.css:460` and `sequence.js:46`; depth's approach is
   better. (Keep the pattern; do not keep D-1's blurred-filter-inside-a-per-frame-scale.)
10. **depth — `?flat=1`.** A URL flag that renders the identical page with the expensive layer
    removed, as an A/B control. Cheap, honest, and the only reason any of these numbers could be
    attributed. Build the equivalent into the production hero.
11. **frame — layout by grid sized from the type it carries,** not by guessed offsets: the mat is
    a CSS grid (`rail | plate`; `masthead / plate / bottom mat`), the bottom mat sizes itself from
    its content and the plate takes what is left. That is why frame is the only candidate with no
    collision at a viewport nobody screenshotted, and why craft's C-2 happened.
12. **frame + craft — the darkened clay.** `--clay #C1613C` is 3.93:1 on cream and cannot carry
    text in either direction. Three candidates independently measured it and three landed on a
    darkened variant: frame `#9E4B2B` (5.63:1), sequence `#9C4526` (5.98:1), depth `#8B3F22`
    (6.95:1). **Put one of these in `_shared.css` as `--clay-deep` and make the raw `--clay` a
    hairline/rule colour only.** craft is the cautionary tale: it did the measurement, wrote the
    rejection down, and then shipped the rejected pair twice (C-3).

---

## Impressive in a demo, a liability across four pages

- **craft's custom cursor.** Six states, a damped ring, an undamped dot, a magnetic field with a
  smoothstepped falloff — genuinely the most sophisticated code here, and it costs the page
  nothing (measured "free" in their own attribution and mine). But it has **one cream palette**
  and `cursor: none !important` is global. Page 2, 3 and 4 are cream. Every light section of this
  site would have an invisible cursor. Building the light variant is not hard; carrying a
  bespoke cursor system across four pages, in every state, on every ground, for the rest of the
  project's life, is.
- **craft's magnetic capsules and per-word headline reveal.** ~320 of 568 JS lines are bespoke and
  share one closure, so you cannot lift the magnet rig without the scroll loop, the load ladder
  and the four hard-coded photographs. A second page inherits all of it or rewrites all of it.
- **depth's two-plate parallax.** The best-argued idea in the set — the grid luminance survey that
  produced it is real engineering — but the implementation costs 30 fps on a pointer sweep, and
  the mechanism (a `filter: blur()` surface re-rasterised inside a per-frame `scale()`, under a
  full-viewport `mix-blend-mode`) does not get cheaper on a phone. It is also inseparable from
  one photograph and one hero: `prog = scrolled / heroH` off `#top`. Section 2 cannot use it.
- **sequence's three-clip choreography.** The arc is real and the code is clean, but three
  1080p `<video>` elements in one DOM is three posters, three decoders and two listener leaks
  (S-7) before you have shown anything. On a four-page site this is one page's worth of budget
  spent on one section, and the pattern does not generalise: page 2 cannot afford a second one.
- **frame's `.mast` that morphs from bar to pill.** It is the most charming moment in the four,
  and it is also F-1 and F-2 — the only requirement-6 violation with a *measured* consequence
  (+0.08 CLS after load), the only reduced-motion violation, and the thing that occludes the
  eyebrow. It is fixable: reshape the bar the way frame already reshapes the aperture, with an
  opaque blade and a `transform`, and add hysteresis to the state flip.
- **Every candidate's self-verification.** frame ships a 54-assertion suite whose overflow check
  exempts the entire hero and whose header-trap check compares a string; craft, sequence and depth
  all report contrast pass-rates from viewport sets that exclude the sizes where they fail. All
  four "verified" pages fail contrast, keyboard or bandwidth somewhere I looked. **Whatever ships,
  the test harness needs to belong to the project and not to the candidate**, and it needs to
  enumerate viewports (including 320×568 and 900×600), not sample them.
