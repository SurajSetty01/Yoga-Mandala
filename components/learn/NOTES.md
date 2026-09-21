# Learn — the build

`/learn/` · `app/learn/page.tsx` · `styles/learn.css` · every selector under `.ln`.

Visitor intent, the client's own words (Blueprint §3): **"I want structured education."**
Blueprint §6 asks for: explain structured learning → programme categories → featured/current
programmes → how to choose → FAQs → enquiry.

---

## The seven mechanics, one sentence each

| # | Section | What HAPPENS |
|---|---|---|
| 01 | `Masthead` | A narrow vertical slot in a sheet of paper **widens into the full room** as the reader scrolls — a door being opened, not a picture fading up. |
| 02 | `Method` | Eight practices arrive **scattered and out of true across the width of the section and draw themselves into one ordered column** — the client's own "collecting techniques" becoming study. |
| 03 | `Spine` | One claim of the client's is **carried by two frames at two distances**: a wide still of a class with the words set small, answered by a tall *moving* frame of one teacher's hands rising over its corner with the words set large. |
| 04 | `Forms` | Five categories are **five apertures of five different shapes standing on one baseline**, and the baseline is labelled with the intention they share. |
| 05 | `Register` | Five names **close on one shared stem** in a ruled two-column book whose second column honestly reads "On enquiry". |
| 06 | `Choose` | Four beginnings of one sentence **step in behind shortening rules until the block tapers to the vanishing point** of the path beside it, and the point is the way in. |
| 07 | `Begin` | A room set out with nobody in it, and **a plate lands in one of the empty places**: a seat is taken. |

Nothing here repeats a mechanic the site already ships (SECTION-MECHANICS.md's first table),
and nothing reproduces a concept from `/preview/compare/` verbatim. Two of the *offered*
rejected ideas were deliberately adapted rather than invented around:
**"plates that scatter and pack"** became section 02 (the doc names "scattered study →
structure" as its natural use), and **"steps walking across the floor toward a doorway"**
became section 06 — but drawn as a typographic wedge rather than as objects, because the
type must not shrink (see "what was rejected").

---

## The missing-programme-content problem

**Nothing was invented.** Not one duration, fee, level, prerequisite, date, outcome, intake,
syllabus or student quote appears on this page, because none exists in the Blueprint, the
About document or the Website brief. `programmes` in `content/pranava.ts` carries five names
and `blurb: null` for every one of them, and `null` renders as nothing.

**The page is an argument with a register at the end of it, not a catalogue.** Four moves
did the work:

1. **The spine is the client's own distinction, and it is real content.** "Teacher education,
   for us, is not only about learning how to conduct a class. It is about developing the
   understanding, discernment and responsibility required to guide another person's
   practice." That is a claim worth a whole section (03), and the page is built around it.
   Both halves are **sliced out of `about.teach.close` at its own sentence boundary** rather
   than retyped, so neither can drift.
2. **Section 05 is drawn as a REGISTER, not as cards.** A ruled book with two column
   headings — *Programme* and *Details* — the five names entered under the first and "On
   enquiry" with a route under the second. A ruled blank is how an institution records that
   something exists and has not been written up; a card with invented body copy is how a
   website pretends otherwise. The column heading is what makes the empty column read as a
   deliberate blank rather than as a failure to load.
3. **The one thing that is actually true of the five names is used, and nothing else.** All
   five open on the same three letters as Praṇava itself, so the stem is set back and the
   tails full strength; with `font-kerning: none` all five stems have identical advance
   widths and an exact vertical seam appears without a rule being drawn. **Nothing is
   translated** — glossing Sanskrit the client has not glossed would be inventing content.
   The typography makes the point silently; the page never claims it in words.
4. **No photographs in section 05.** A picture beside a name implies we know what the
   programme is. The section with no information gets no illustration, and its confidence
   comes from the type instead.

Everywhere else the copy is the client's, verbatim, from `content/pranava.ts`:
`journeys.learn.intent` (the eyebrow — the sentence the reader arrived with),
`about.journey[0].body` (the h1's deck), `about.teach.lead/open/prompt/practices`,
`about.intro[4]`, `about.what.body[2]` + `about.what.intention`, `about.closing.body`
(split at its own commas into four beginnings and a resolution) and `about.closing.lead` +
`.call`. The only words written for this page are structural labels — the six register
marks, the five category names (which are the client's, from the Website brief §8:
"teacher education, continuing education, workshops, intensives and study programmes"),
"Programme", "Details", "On enquiry", "Enquire", "Next".

**FAQs.** Blueprint §6 asks Learn for them; the client supplied none. There is no FAQ
section, and that is recorded in the header of `app/learn/page.tsx` so the omission reads as
a decision rather than an oversight.

**Enquiry routes are real or absent.** `/contact/`, and the WhatsApp number the client has
supplied in writing. No e-mail appears anywhere: `links.emailGeneral` is null.

---

## What was rejected, and why

- **A programme grid with "details coming soon" chips.** The failure mode the brief names.
  A ruled register with a column heading says the same thing without apologising for it.
- **Glossing the five names** (Pravesha = entry, Prabodha = awakening …). Defensible
  etymology, but the client has never written it down, and a gloss on a website is read as
  the programme's description. Not ours to supply.
- **Quoting Blueprint §4.3's "Current examples may include Pravesha, Pragraha…"** verbatim
  as the section's lead. It is the client's sentence, but it is written to a developer, not
  to a visitor, and reads as a page that has not been finished.
- **A full-bleed wide hero.** Every landscape frame in the new Praṇava archive stops at a
  1620px derivative, so a 2560 bleed is a 1.58× upscale. The masthead is a **window capped
  at 1620 and centred** instead, which is also what made the opening mechanic available.
- **A sticky cross-dissolve between the empty hall and the full one.** Two different rooms;
  dissolving them implies they are one place. Section 07 uses the empty room alone.
- **Whiteboard frames at size.** `pr-ttc-dsc_0209`, `-0215`, `-0217` carry a handwritten
  heading the vision audit says must be read and cleared before publication. None is used.
  `-0193`, the fourth, was tried in section 04's tall aperture and reduced at 250px to green
  netting over an empty floor; replaced with `pr-pbh-img_5616`.
- **Shrinking the type down section 06's wedge.** True perspective, but the fourth clause
  lands under a readable size and under its measured contrast. The wedge is drawn by indents
  and by rules that shorten; the type size is constant.
- **Eight photographic chips for the eight practices in section 02.** Eight 960px
  derivatives (~800 KB) for eight 80px squares that individually mean nothing. The heap is
  made of the words themselves and the section carries no picture at all, which also gives
  the page a breath between two image-heavy sections.
- **A second silent loop.** One is enough, and the clip set is 1.4–3.1 MB per file.
- **A "700+ teachers"-class statistic, a faculty name, a date, a fee.** None exists.

---

## Every measurement

### Contrast — `tools/contrast-probe.mjs`, rendered pixels, **0 FAIL everywhere**

Nine selectors — `.ln-mh`, `.ln-me`, `.ln-sp`, `.ln-fo`, `.ln-rg`, `.ln-ch`, `.ln-bg`,
`.ln-bg__seat`, `.ln-next` — each with `--scroll-to`, at **320×568, 390×844, 768×1024,
1024×768, 1280×720, 1440×900 and 2560×1440**. 63 runs, 0 FAIL in every one. Worst p5 by
section at 1440×900:

| section | worst p5 | on |
|---|---|---|
| `.ln-mh` | 7.3:1 | the intent line, `--ink-soft` on paper, 21.1px |
| `.ln-me` | 5.31:1 | the 11px numerals, `--clay-deep` on `--ground-warm` |
| `.ln-sp` | 13.21:1 | the register mark, `--sand` on `--ground-deep` |
| `.ln-fo` | 5.98:1 | the numeral, `--clay-deep` on cream |
| `.ln-rg` | 16.66:1 | cream on `--ground-deep` |
| `.ln-ch` | 5.98:1 | the CTA, cream on `--clay-deep` |
| `.ln-bg` | 5.98:1 | the CTA; the plate's own text measures **10.96–17.79:1** over the red oxide floor |
| `.ln-next` | 16.66:1 | cream on `--ground-deep` |

Two values the probe cannot see, computed by hand instead, because `contrast-probe` parses
only the RGB of `color` and ignores its alpha:

- the register stem, `rgba(251,247,242,0.48)` composited on `#1C1714` → **4.72:1**, and the
  name is never smaller than **33.6px** (`clamp(2.1rem, 6.6vw, 4.4rem)`), where the
  requirement is 3.0:1. 0.42 was measured first at 3.93:1 and raised for margin.
- `--ink-onDark-soft` `rgba(251,247,242,0.72)` on `#1C1714` → **9.3:1**.

### Layout

- **No horizontal overflow at any width.** `scrollWidth === clientWidth` at 320, 390, 768,
  1024, 1280, 1440, 2531 and 2560.
- **Centring at 2531 checked on pixels, not on source.** Every capped container carries
  `margin-inline: auto`: the masthead window and its caption, `.ln-sp__in`, `.ln-fo__in`,
  `.ln-bg__band` at `--ln-max` (101.25rem = 1620px, the archive's widest derivative), and
  `.ln-me__in`, `.ln-rg__in`, `.ln-ch__in`, `.ln-next__in` at `--ln-measure` (92rem, the
  measure `/about/` and `/within/` already use). At 2531 the 1620 bands sit at x = 455 and
  the 1472 measures at x = 529, both exact.
- **`.ln-mh__say` was moved from `--ln-measure` to `--ln-max`.** At 2531 the two differ by
  148px, which put the masthead caption 74px outside the word it belongs to. Caught on a
  screenshot, not in review.
- **Document height** 9,313px at 1440×900 with motion, **8,199px** under
  `prefers-reduced-motion` (the masthead stage collapses from 185svh to its natural height).
  9,386px at 390×844; 8,163px at 320×568.

### Breakpoints, each set by looking at the render

- **1024** — the masthead deck moves beside the word instead of under it. Stacked, the say
  block is 500px tall at 1440×900 and pushes the window's foot 105px below the fold; side by
  side it is 320px and the whole slot is visible before the reader has scrolled.
- **899** — section 03 stops overlapping (stacked, the close frame cannot rise over the wide
  one's corner without covering the first clause, measured at 390) and section 04's row
  breaks from five across into three and two. Five across still *fits* at 768, but the
  smallest shape is 88px wide there and its label wraps.
- **719** — the narrow `object-position` for every frame, and the masthead slot's closed
  width is floored at 0.56 instead of 0.23. At 390 a 0.23 slot is 90px of a 3:2 frame and
  shows the back of one person's head; the aperture has to hold a piece of the room.

### Media

Ten photographs and one silent loop. **The brief's warning that all 83 new stills are
portrait is wrong** — verified against the encoded files with sharp: 47 of the 83 are 3:2
landscape and 36 are portrait — which is why a wide masthead window was available at all.
Derivative widths are not uniform and this set `--ln-max`:

```
2560  ten pr-pbh- frames only, nine of them portrait
1920  the rest of pr-pbh-
1620  every pr-ttc-dsc_ landscape frame          ← the ceiling for any band here
 960  every pr-ttc-dsc_ portrait frame
```

Derivatives actually chosen at 1440×900, checked with `currentSrc` after a full scroll — not
one oversized pull:

```
pr-ttc-dsc_0284_1-1620  @1440px   masthead
pr-ttc-dsc_0077-960     @867px    03 wide
pr-mov-img_5455.avif    @415px    03 close, the clip's poster
pr-pbh-img_5616-960     @194px    04 teacher education
pr-ttc-dsc_0280_1-960   @344px    04 continuing education
pr-ttc-dsc_0569-960     @250px    04 workshops
pr-ttc-dsc_0392-960     @306px    04 intensives
pr-ttc-dsc_0285_1-960   @156px    04 study programmes
pr-ttc-dsc_0364-960     @480px    06 the path
pr-ttc-dsc_0185_1-1620  @1440px   07 the room
```

A flat `sizes="28vw"` on section 04 made a 2531 monitor pull 1620 derivatives for 445px
boxes; the last clause of `(max-width: 899px) 46vw, (max-width: 1799px) 28vw, 450px` pins it
once the container stops growing.

### Weight — production build, served out of `out/`, cold, CDP `Network.dataReceived`

| | 1440×900 | 390×844 |
|---|---|---|
| fold | 2,954 KB | 1,612 KB |
| read-through | 5,908 KB | 3,679 KB |
| …of which **this page's own media** | 1,670 KB | 1,320 KB |
| …the silent loop | 1,793 KB | **0 KB** (gated off ≤860px) |
| …js + css + fonts + html (site-wide) | 1,373 KB | 1,370 KB |
| …**other pages' media, pulled by the header's route prefetch** | 1,072 KB | 989 KB |

**That last row is a site-wide finding, not this page's doing, and it is worth someone
owning.** `SiteNav` prefetches all eight routes; in the static export those prefetches pull
each route's HTML, and any image marked `loading="eager"` in one of those documents is then
fetched by every other page on the site. `/yoga-mandala/within/` — a page with no connection
to this one — was loading `/learn/`'s masthead frame, and `/learn/` loads six of `/about/`'s.
`SiteNav.tsx` is not this agent's file, so nothing was changed there; what *was* changed is
this page's contribution to it:

- **Every image on this page is `loading="lazy"`, including the masthead.** With the masthead
  eager, `/yoga-mandala/within/`'s fold measured **3,108 KB**; with it lazy, **2,849 KB** —
  259 KB of `/learn/` was being posted to every reader of every other page. The cost on the
  page that owns the frame is nil: an image inside the viewport is fetched during the initial
  load whatever its `loading` value, and the masthead frame still completes at **258 ms** on
  the production build. `fetchPriority="high"` was tried and moved neither number.

### The loop

`pr-mov-img_5455.mp4`, 1,836,058 B — the clearest hands-on teaching in the clip set and the
lightest of the six teaching clips. `muted`, `playsinline`, `loop`, `preload="none"`, source
in `data-src`. Attached only after the figure has been on screen for **180 ms**, paused when
off screen or when the tab is hidden, and **released** — source dropped, `load()` — once the
figure is more than 1.4 viewports below or 0.4 above, which aborts the transfer in flight
(`pause()` stops the decoder but not the download). A clip that has already finished
arriving is never dropped, and nothing is dropped twice, so an oscillating reader cannot be
charged repeatedly.

**There is no `poster` attribute anywhere on this page.** The `<picture>`/`<img>` beneath is
the poster, is never removed, and the video sits at `opacity: 0` until `readyState >= 3` AND
`currentTime > 0` — proof of pixels, not a resolved `play()` promise. A stall or a blocked
autoplay leaves the photograph on screen. The capability gate is the approved hero's:
`saveData`, 2G/3G, no MP4 decoder, or ≤860px → no video at all, which is why the phone
column above reads 0 KB.

A **`net::ERR_ABORTED` on `pr-mov-img_5455.mp4`** appears in a devtools log when a reader
scrolls briskly past section 03. That is `release()` doing its job — the same line
`/yoga-mandala/within/` prints for its four loops — and it is the alternative to spending
1.8 MB on a frame nobody stopped at.

### Motion, and the state without it

One passive `scroll` listener that only raises a flag, one `requestAnimationFrame`, geometry
measured on load and resize and nowhere else, and exactly one custom property written per
frame (`--o`, rounded to 3 places and skipped when unchanged). Only `transform` and
`opacity` are ever animated. Scroll is never intercepted.

**No text on this page animates its opacity.** Type only translates, so the ratio the probe
reports at rest is the ratio a reader gets in every frame of every transition. Only pictures
fade.

**Nothing the island observes clips.** Chromium computes an IntersectionObserver's rect after
clips, so every mask here (`.ln-mh__winIn`, `.ln-fo__ap`, `.ln-sp__*Mask`, `.ln-ch__mask`) is
a child of the observed element, never the element itself.

Under `prefers-reduced-motion: reduce` the island returns immediately and the closed/scattered
start states never exist, because they are gated on `.js` **inside**
`@media (prefers-reduced-motion: no-preference)`. Screenshotted at 1440×900 at six scroll
positions: the window is open, the eight practices are the ordered column, the five shapes
are standing on their line, the register's rules are drawn, the wedge is complete and section
03 is two photographs. Nothing on this page is reachable only through motion, and the same is
true with JavaScript switched off entirely.

### Structure

- **One `<h1>`** — "Learn" + the client's own description of it, so its accessible name is a
  sentence and not a verb. Outline: h1 → `01 What structured learning means` → `02 What
  teacher education is` → `03 Programme categories` (+ five h3 category names) → `04 The
  named programmes` (+ six h3 names) → `05 How to choose` → `Begin where you are.`
- **Real `alt` on all ten images and the clip poster**; none is empty, none names a person.
  The archive does not record who is in any frame and the client has supplied no faculty
  names, so every description says what is happening.
- **Ten links in `<main>`, every one with an accessible name**; the six register rows carry
  `aria-label="Enquire about <name>"` so a screen-reader user does not hear six links called
  "Enquire". Focus is visible on every one — the global cream-ring-in-dark-halo on the dark
  sections, inverted to ink-in-cream on the paper ones.
- **No console errors and no failed requests** other than the deliberate clip abort above.
- `npx tsc --noEmit`, `npx next build`, `npx eslint .` and `npm run check:copy` (137 client
  sentences, PASS) all clean.

---

## Files

```
app/learn/page.tsx                 the composition, and the note about the absent FAQs
components/learn/frames.ts         every frame, its provenance and what was ruled out
components/learn/parts.tsx         Mark, Shot, Says — the three shared objects
components/learn/Masthead.tsx      01 the window opens
components/learn/Method.tsx        02 the heap straightens
components/learn/Spine.tsx         03 the sentence turns when the lens does
components/learn/Forms.tsx         04 five forms, one line
components/learn/Register.tsx      05 the register
components/learn/Choose.tsx        06 the sentence narrows to a door
components/learn/Begin.tsx         07 a place is taken
components/learn/LearnMotion.tsx   the single client island
styles/learn.css                   one `@import` added to app/globals.css
```

Nothing outside this list was touched.
