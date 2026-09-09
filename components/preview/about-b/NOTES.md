# About · concept B — **the words are the graphic**

Preview route: `/preview/about-b/` · stylesheet: `styles/preview-about-b.css` (every selector
namespaced under `.about-b`) · nothing outside this folder and that one file was touched.

The rejected build failed by treating this page's text as text — paragraphs in columns beside
rectangles of photograph. The premise here is the opposite: **at the right scale, weight and
behaviour the typography IS the visual event, and the photograph works inside it** — clipped
into the letterforms, feathered out of the ground behind them, or holding up the baseline.
There is not one rectangle of photograph anywhere on the page.

The spine underneath it is the client's own rhetoric. Three of these five blocks are a claim
about **one** — *no single teacher*, *not one particular school*, *not a few people* — answered
by a **plural**. So scale carries the argument: the claim about one is the loudest thing in
its plate, and the answer is what the reader is left holding.

---

## One sentence per section

| | idea |
|---|---|
| **03 premise** | The founding sentence is set at viewport scale and **filled with a photograph of a room full of teachers** — the letterforms are the only aperture onto the picture, so the sentence that says no single teacher can know everything is literally made out of a room full of them. |
| **04 purpose** | The lead ends in a colon, so the four names are four completions of one sentence, not four items: each is **scaled until it fills the same measure exactly**, which makes size a function of letter count rather than taste — and makes GROW, the word the client's tagline ends on, the largest thing on the page. |
| **05 approach** | **Two voices out of one typeface** — the refusal thin, wide and soft (wght 250 / SOFT 100), the answer heavy, sharp, wonky and italic (wght 600 / SOFT 0 / WONK 1) — because a community that refuses to represent one school should not be set in one style; one figure stands behind them, feathered out of the paper on every edge. |
| **06 members** | The display line's baseline **is** the horizon: a whole room fades up out of the ground beneath it with no top edge, no side edges and no bottom edge, and the four-clause sentence about one teacher on four different days **walks down into the crowd** in four steps. |
| **07 guiding** | One sentence at the page's top scale, whose **last word draws itself together as the reader descends the last plate** — `together` is whole exactly when the page is. |

## Rhythm — which sentence is loud, and why

Measured at 1440×900: `Grow` **570px** · the premise **121px** · the closing thought **127px** ·
the two answers in 05 and 06 **83px** · every refusal, definition and elaboration **17–19px**.

The page's largest **word** is *Grow*, because the fitting system put it there. The page's
largest **sentence** is the closing thought, because it is the last thing anyone reads. Nothing
sits in the middle of that range: this page has one shout, two speaking voices and two
whispers, and the type scale (`--b-mega … --b-read`) has no steps between them.

Grounds alternate so no two neighbours share a material and the whole run never reads as one
column: **deep → paper → warm → deep → paper**, handing over to the footer's dark.

---

## What I tried and rejected

- **A marquee — the premise sliding sideways as you scroll, so you cannot see all of it at
  once.** The justification (a sentence about partial knowledge that will not fit one view) is
  seductive and post-hoc; horizontally-scrolling type is the single most over-used device of
  the last five years and would have read as motion for its own sake. Cut.
- **Outlining the refusal in 05 with `-webkit-text-stroke`.** Unfilled type on the negation,
  solid on the affirmative, is a clean idea — but it makes the client's sentence look
  *cancelled*, and `text-stroke` is invisible to `tools/contrast-probe.mjs` (A and B are
  identical under the stroke, so the run is skipped). One probe-invisible technique on the page
  is a considered risk; two is a habit.
- **Setting the four nouns of "school, lineage, organisation or methodology" each in a
  different cut of Fraunces.** The sentence refuses a single school; the setting refuses a
  single style. Tight as an argument, but it turns a client sentence into a type specimen and
  makes the half of the plate that is supposed to whisper the fussiest thing on it.
- **The word `Connect` straddling the seam between 03's dark plate and 04's paper**, drawn
  twice and clipped, so the word that means *join* literally joins the two grounds. Rejected
  because it breaks the only system section 04 has — four words, one measure, one ledger — for
  one joke, and only one of the four rows could do it.
- **Four small figures in 06, one per clause.** Four pictures in a diagonal is section 02's
  language (four narrow stills in a row) at a different angle, and four feathered cut-outs is a
  collage, not a composition. One room containing many people says *members* better than four
  crops of individuals.
- **`--ink-soft` for the elaboration in 05.** Over the figure the worst background a glyph can
  land on is `#9D9790`: `--ink` measures **5.00:1** there and `--ink-soft` only **2.32:1**. No
  opacity fixes it — the figure would have to drop to ~0.19 to carry pale text, which is
  invisible. So tone in that plate is carried by the **weight axis**, not by a paler colour,
  and the one genuinely coloured element (the teal register mark) is kept off the picture by
  geometry at every width. Same lesson as the nav pill's opaque ground.
- **A dark plate for 07.** The rejected build closed on deep ground straight into the deep
  footer and the two merged. Coming back to paper for the last sentence makes the footer's dark
  the actual ending.
- **Parallax on 06's horizon.** Free to add, transform-only, and meaningless. One scroll-driven
  behaviour that carries an idea beats two where one is decoration.
- **Any link, button or hover affordance inside these five sections.** The hero owns the primary
  action and the footer follows immediately; a third call to action between them competes with
  both. These sections contain no focusable elements at all, so there is no hover-only
  affordance to give a touch equivalent to.

---

## Interaction decisions

**Reveals.** `[data-br]` blocks rise 26px and fade, staggered by `--d`. Opt-in through
`.about-b.is-live`, which `AboutBMotion` adds *after* marking everything already on screen as
revealed — so nothing the browser has painted is ever hidden again, and with JavaScript off the
page is complete. Verified with `javaScriptEnabled: false`.

**The closing word.** One passive scroll listener raises a flag; one `requestAnimationFrame`
reads the plate's rect and writes one custom property, `--b-close` (0 → 1). Each letter is
`translate3d(calc(var(--dx) * (1 - var(--b-close))), 0, 0)` — transform only, no layout, no
`letter-spacing` in a handler. `--b-close` defaults to **1** in CSS, so before hydration, with
no JavaScript, and under reduced motion the sentence is simply set.

The span was **measured, not guessed**: at `innerHeight * 0.64` the word finished converging
while the plate was still below the fold and the gesture was never actually seen. At one full
viewport of travel the reader watches it close from about 0.34 to 1. Sampled: `--b-close` 0 →
0.30 → 0.55 → 0.80 → 1.00, last letter 132px → 0px.

**Accessibility of the split word.** The per-letter spans are inside an `aria-hidden` wrapper
followed by the intact string in `.b-sr`, so screen readers read "…we learn together." and
never spell it. `.b-sr` uses `clip-path: inset(50%)` deliberately — that is the shape the
contrast probe skips, so the duplicate cannot be measured as a failure it could never be.

**Focus.** No focusable elements are added; the nav and footer inherit the site's cream-ring-in-
dark-halo treatment. Tabbed through all nine: outline `2px solid #FBF7F2` plus
`0 0 0 4px rgba(16,12,10,0.92)` on every one.

**Reduced motion.** `AboutBMotion` returns before attaching anything. Measured: `is-live` false,
**0 of 16** reveal blocks below full opacity, `--b-close` = 1, **0** letters transformed.

---

## Content law

Every string is rendered from `content/copy.ts`; `npm run check:copy` passes (73 sentences,
verbatim). Nothing is retyped in a component.

- `about.opening[1]` is one `<p>` and one string, **sliced at its own `". "`** so the first
  sentence can be set at display scale and the second at reading scale. Both sentences are
  intact, in order, and adjacent in the DOM — the paragraph decelerates, it is not rewritten.
- `about.members.lines[2]` is one `<p>` and one string, **split on its own commas**
  (`/(?<=,)\s+/`) to make the four steps. Text content is identical to the source.
- `about.guiding.line` is split at its own last space so the final word can carry the
  behaviour. Head and tail concatenate back to the client's sentence exactly.
- **`about.members.lines[3]` is not printed.** "Everyone has something to learn. Everyone has
  something to contribute." is already section 02's display headline about 1,200px up this same
  page, at a larger size than anything available here. Printing the page's best sentence twice
  spends it twice. Nothing is paraphrased and nothing is added; one line is left where it
  already lands hardest. (Rejected: giving 06 the line at a smaller size — that is the same
  words demoted.)
- Register marks use the client's own headings (`about.title`, `purpose.heading`,
  `approach.heading`, `members.heading`, `guiding.heading`) — no invented eyebrows. Numbered
  03–07 to match the positions these five occupy on the real page.
- The `<h1>` is on 03's register mark **only because this preview has no hero**. Promoted into
  `/`, it becomes an `<h2>` — a one-line change, flagged in `Premise.tsx`.
- Media: `p13-img_0615` (a seated room) inside the letterforms; `ss-dsc07120` (one practitioner)
  as the single figure in 05; `p13-img_0617` (a full studio) as the horizon in 06. No dance
  frames — this page never establishes the festival context. No `texture` stills.

---

## Measurements

### Contrast — `tools/contrast-probe.mjs`, all seven viewports, **0 FAIL**

```
320×568    6 runs — 0 FAIL      1024×768   10 runs — 0 FAIL
390×844    7 runs — 0 FAIL      1280×720    9 runs — 0 FAIL
768×1024   7 runs — 0 FAIL      1440×900   10 runs — 0 FAIL
                                2560×1440  11 runs — 0 FAIL
```

### Contrast below the fold

The official probe only samples the first screen (`if (r.top > innerHeight) continue`), so a
five-plate page is almost entirely unmeasured by it. The same glyph-mask algorithm was stepped
down the whole page at 0.7-viewport intervals:

```
390×844    73 runs across the page — 0 FAIL
1024×768   98 runs across the page — 0 FAIL
1440×900   81 runs across the page — 0 FAIL
2560×1440  91 runs across the page — 0 FAIL
```

Tightest run anywhere: **5.17:1** (the 13px Fraunces `--clay-deep` numeral on `--ground-warm`,
needs 4.5). Everything else is ≥ 5.9:1.

One trap worth recording: run naively, that sweep reported three failures at ~1.2:1 on the
largest headlines. They were the **fixed navigation pill's own glyphs** landing inside the
bounding rect of whatever was scrolling underneath it, and being counted as that element's
text. Excluding the pill's rect (it is measured on its own account) clears them. Any future
scrolling probe on this site needs that exclusion.

### The photograph inside the letterforms

`background-clip: text` is invisible to the probe: hiding the text does not stop the background
painting, so A and B are identical under the glyphs and the run is skipped. It is not measured
by luck either — it is **guaranteed by construction**, exactly the way the design system says a
label on a photograph gets a ground rather than a gradient:

```
fill = linear-gradient(rgba(251,247,242,0.50) …) over the photograph
darkest pixel a letter can ever contain = 0.50 × #FBF7F2 = #7D7B79
#7D7B79 against --ground-deep #1C1714 = 4.31:1
requirement for 121px display type   = 3.0:1
```

The figure holds for *any* frame in the archive, at any crop, at any viewport. Verified against
the real render by masking the glyphs (fill removed) and sampling the painted pixels, eroding
the mask so partial-coverage edges are excluded the way the probe excludes them:

```
1440×900   glyph core   worst 4.21:1   p1 4.27   p5 4.33   median 6.28   best 16.96
390×844    glyph core   worst 4.26:1   p1 4.27   p5 4.33   median 7.37   best 17.21
```

Two more composited cases, computed the same way and then confirmed by the sweep:

- **05's figure at 0.40 over `--ground-warm`** — worst possible background `#9D9790`, which is
  **5.00:1** with `--ink`: any size of ink may cross it. (`--ink-soft` is 2.32:1 there, which is
  why nothing pale does.)
- **06's horizon**, masked, over `--ground-deep` — where the stair sits the image is ≤ 0.25
  alpha, worst background `#403A36`-ish, **≥ 5.8:1** with `--ink-onPic-2`.

### Fit — the four purposes

`--fit` is the reciprocal of each word's advance width in ems at the weight and tracking as set,
**measured in the browser and iterated to convergence**, not estimated. Because it is expressed
in `cqw` against a container, one number holds at every viewport:

```
                fit      1440×900 (1152px measure)     390×844 (346.8px measure)
Connect      0.3337      384.4px   → 1151.9  (0.9999)   115.7px → 346.8  (1.0000)
Learn        0.4829      556.3px   → 1152.1  (1.0001)   167.5px → 346.8  (1.0001)
Collaborate  0.2375      273.6px   → 1152.2  (1.0001)    82.4px → 346.8  (1.0000)
Grow         0.4948      570.0px   → 1152.0  (1.0000)   171.6px → 346.8  (1.0000)
```

Weight is optical compensation, not decoration: the same cut reads heavier at 570px than at
274px, so `wght` runs **380 / 400 / 440 / 500** *against* size and `SOFT` runs **0 / 8 / 16 /
30** with it, so the four words have one typographic colour and the smallest keeps the softest
terminals. (`font-optical-sizing: auto` was tried first and does nothing useful here — every
one of the four is far past 144px, where Fraunces' `opsz` axis saturates.)

### Layout

- **No horizontal overflow, 320 → 2560.** `scrollWidth === clientWidth` at all seven viewports,
  and re-sampled every 2% of scroll through the closing word's full spread: **max overflow 0px**
  at every one.
- Page height 1440×900: **7,082px**. 390×844: **4,847px**.
- `npx tsc --noEmit` clean · `npx next build` clean, `/preview/about-b` prerendered static ·
  `npx eslint` clean on both new folders · **no console errors** at any viewport.

---

## What I could not make work

**A handoff between plates as good as the hero's overlap.** 06 earns one — the room dissolves
into night before the paper of 07 arrives, so the photograph has no edge at all — but 03→04 and
04→05 are honest hard cuts between grounds. The `Connect`-across-the-seam idea was the one that
would have fixed it and it cost the section its system.

**The premise at 2560 is the weakest frame on the page.** The measure caps at 100rem, so past
about 1900px the giant sentence stops growing with the screen and the plate opens up around it.
Raising `--b-mega` to 10.2rem recovers most of it, but a sentence whose whole point is that it
fills the view is always going to be happiest between 1024 and 1600.
