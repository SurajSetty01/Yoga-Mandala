# Praṇava — the Practice page

`/practice/`. Blueprint §6 in the Blueprint's own order — ongoing Sādhana → regular practice
→ Prayatna and related offerings → Prāṇāyāma → retreats/immersions → schedule/enquiry — for
the visitor §3 describes as *"I want consistent Sādhana."*

**The page's subject is not a list of offerings. It is duration and return** — what sustained
practice actually asks of someone. The client's own framing is the argument: practice is what
lets knowledge become experience, and it "requires consistency, observation, refinement and
time". So the page is built to *behave* like the thing it is about: something repeats in every
section, and the last section is the first one again.

Everything is a server component except one client island. Every client sentence is read out
of `content/pranava.ts` and split only at the client's own full stops
(`components/practice/sentences.ts`), so joining the parts back together reproduces the
paragraph character for character. `npm run check:copy` passes.

---

## The seven, each as the thing that happens

| # | section | the mechanic, as an event | ground |
|---|---------|---------------------------|--------|
| — | Hero | **Three windows onto the same practice, and the middle one is still going.** Three tall apertures side by side, each holding a row of people in one identical shape receding down a hall; two are photographs and the centre one is a loop. All three open from 0.62 of their width to full as the page arrives, the moving one first | deep |
| 01 | Ongoing Sādhana | **One word said again and again, a little larger each time, cut through the middle of a letter at both ends of the frame.** Fifteen settings of "Sādhana" in a column taller than its well, drifting up slower than the page | paper |
| 02 | Regular practice | **The room, set out again, running off both edges of the screen.** Three photographs of a practice room prepared and empty, laid twice along a frieze wider than any viewport and drifting sideways | warm |
| 03 | Prayatna and related offerings | **The client's one sentence about sustained practice, with its grammar turned down to a whisper and its six practices turned up to display size.** Beside it, a name with nothing published under it | deep |
| 04 | Prāṇāyāma | **The one place on this site that moves while the reader is still.** Two clay rules draw apart and come back on a ten-second cycle driven by a clock, with the archive's only unpeopled moving frame between them | paper |
| 05 | Retreats and immersions | **Four frames, each wider than the last, so the same flick of a wheel buys less and less picture.** The reading slows to a quarter of the speed it started at, and the page has left the room | deep |
| 06 | Schedule and enquiry | **The page comes back to the window it opened with.** The hero's centre clip again, a quarter the size and on paper instead of dark — and because it is the same URL it is the same cache entry, so the return costs nothing | warm |

Grounds run **deep · paper · warm · deep · paper · deep · warm**, and the footer's dark is the
ending. No two neighbours share a ground or a move.

---

## How duration and return are expressed without inventing a schedule

Six different ways, one per section, because a single device repeated seven times would be the
thing `SECTION-MECHANICS.md` forbids:

1. **A loop.** A still cannot show that something is still happening; the hero's centre window
   can. It is the only claim of duration a web page can make literally.
2. **A word with no beginning and no end.** §01's column is *always* cut mid-glyph at the top
   and the bottom — solved arithmetic, below — so the reader can see that it did not start here
   and does not stop here. "Ongoing" stated without a number, a date or a count.
3. **A frieze with both ends off-screen.** §02 is the same room laid out twice and cut by both
   screen edges. What is regular is not a timetable; it is the room being made ready again.
4. **Accretion in one sentence.** §03 sets the six things a sustained practice is developed
   *through* at one size and their grammar at another, so what you read is a practice made of
   six parts rather than a sentence with a list in it.
5. **A clock.** §04 keeps moving when the reader stops. Nothing else on this site does.
6. **The reader's own time.** §05's frames grow from 0.42 to 1.0 of the measure, so the last one
   takes roughly four times as much scrolling to pass as the first. Duration spent rather than
   stated.
7. **A literal return.** §06 is §hero again, smaller and on paper.

**Nothing anywhere on the page states a fact the client has not supplied.** There is no day, no
hour, no session length, no duration, no fee, no start date, no class size, no level and no
testimonial in any of the three source documents — Blueprint §16 lists all of it as content
still required — so there is none here. Where a description would go, a small object called
`Ask` says in one line that it is not published on this site yet and opens the one channel that
works. It appears three times, at §03, §04 and §06, and its shape is deliberately identical
each time: on a page about repetition, the same honest mark recurring at each unanswered
question is the right form for it as well as the truthful one.

`links.emailGeneral` is `null` in `content/site.ts` and renders as nothing. The subject rides in
the WhatsApp message rather than in a mailbox that does not exist — the same device
`components/contact/routes.ts` uses, so a reader arriving at Contact from here meets behaviour
they have already met.

---

## What was rejected

**A week laid out in seven columns.** The single easiest invention available on this page, and
a lie. Blueprint §6 asks for "schedule/enquiry" and there is no schedule. §02 answers it with
the three frames in the archive of a practice room prepared and *empty* instead — the only
honest photograph of regularity this project has.

**Three copies of the same clip at three phases of its own timeline**, so one movement would
cross the hero from left to right. The best idea of the round and the most literal statement of
"the same practice, again". Rejected on bytes: three `<video>` elements attaching one 2,329 KB
file within a frame of each other risks three parallel requests before the HTTP cache is
populated, and staggering the attachments to avoid that turns a hero into a loading sequence.
Two stills and one loop say the same thing for a third of the risk.

**A tally that fills one mark per completed loop of the hero clip.** Counting is the wrong
register for this client — Blueprint §2.4 asks the site to invite trust rather than create
urgency — and it would have needed a caption explaining itself.

**A pulsing circle, a lung, a wave for §04.** Decoration, and a teaching claim this project
cannot make: nothing in the client's material describes how Prāṇāyāma is taught here. Two rules
and a measure that opens and closes assert nothing.

**All five programme names.** Blueprint §6 gives the full list to Learn and gives this page
Prayatna alone. `/learn/` is this page's nearest neighbour in subject and printing the same
five names on both would make one of the two redundant.

**A gradient fade at the cut in §01.** Prettier, and it would have put pale type on paper at
exactly the place `tools/contrast-probe.mjs` samples. A hard edge is both honest and
measurable; every word in the column is full ink at 15.6:1.

**A JavaScript reveal for the hero's opening.** A reveal has to be switched on after hydration,
which lands the start state *after* the browser has painted the finished one — a visible snap
on the first thing a reader looks at. It is CSS keyframes with `both` instead, so the start
state is in the first paint, it needs no JavaScript at all, and the global
`@media (prefers-reduced-motion) { * { animation: none } }` leaves the windows simply open.

**Narrating captions.** §05 first read "The way out", "What stands at the end of it" and "One
person, under the banyan, not moving". The last of those is not something a photograph can
show. The captions now say what is in the frame; the order carries the journey.

**"The centre window is moving" as the hero's caption.** True at 1440 with JavaScript, false on
a phone and false under reduced motion, where no clip is ever attached. Replaced with a
sentence that is true in every state.

---

## §01 — the arithmetic, because the first cut of it was wrong in the rendered pixels

A word cut cleanly below its baseline looks **whole**. Sādhana has no descender, so a cut that
lands between two lines says the column *ends* there — which is the one thing this section must
not say. The first build centred the column in its well and the bottom edge landed 88% into a
line box, which is below the baseline. Visible in the screenshot, invisible in the CSS.

Fifteen settings, `line-height: 1.12`, a 5.8% step, so line *k* is `1.12(1 + 0.058k)em` of the
base tall and the top of line *k* is at `c(k) = 1.12(k + 0.029k(k−1))em`. The ink of a line sits
between 17.6% and 82.5% of its box: Inter's ascent is 0.969em and its descent 0.242em, so at
1.12 the half-leading is −0.0455em, the baseline is 0.9235em down the box and the cap top
0.1965em down it.

Aim both edges at the middle of a line:

```
top      c(4)  + 0.5·h(4)  =  4.870 + 0.690 =  5.560em
bottom   c(12) + 0.5·h(12) = 17.727 + 0.950 = 18.677em
well height                = 18.677 − 5.560 = 13.12em
column offset                              = −5.56em   (not centred)
```

The throw is capped at 0.9em (±0.45em) by the same arithmetic: the ink reaches about 0.45em
either side of each target, so the drift can never park a cut in the gap between two words.
Every number scales with one `font-size`, so the cut is mid-glyph at 320 and at 2560 alike —
checked in the rendered pixels at 390, 1024, 1440 and 2531.

**The face is Inter and that is correctness, not preference.** Fraunces has no precomposed `ā`;
the browser decomposes it, Fraunces' mark positioning fails and the macron is dropped.
`DESIGN-SYSTEM.md §1` recorded this for the client's name, `/about/` §09 hit it again on these
four value words, and this page hits it three times — Sādhana, Prāṇāyāma, and "regular Sādhana"
inside §03's sentence. Every one of those is set in Inter.

The column is `aria-hidden`. A screen reader is told "01 Ongoing Sādhana" once by the register
mark and then reads the two sentences; fifteen repetitions of a word are a picture, and a
picture of a word is not a word.

---

## The media

Twelve photographs and **two clip files**, chosen off a contact sheet of the whole archive
rather than from the manifest. See `frames.ts` for every decision; the ones that matter:

- **`pr-pbh-*` (the "Prabhava Photos" drop) is used here, and no caption names it.** "Prabhava"
  appears in none of the client's three documents. `components/contact/routes.ts` reached the
  same conclusion and avoided the collection entirely; this page solves it the other way, since
  the collection is by a long way the strongest material for sustained practice — every caption
  says what the photograph *shows* and never where it was taken. Nobody is named anywhere.
- **`pr-ttc-dsc_0185_1` and `pr-ttc-dsc_0392` are deliberately not used**: `components/learn/`
  had already claimed both when this page was composed. `pr-ttc-dsc_0284_1`, `0285_1` and
  `0049` belong to `/about/`. No frame on this page appears on another.
- **`pr-mov-img_5576` contains a wasp nest** with wasps on it, dead centre at about 55–68% of
  the frame's height. The vision audit describes the take as "close green leaves moving gently
  in daylight" and says nothing else about it; `object-position: 50% 50%` would have put it in
  the middle of a breath section. The crop is `50% 16%`, and it is checked as arithmetic rather
  than by eye because the visible band changes with the aperture's aspect: a 9:16 source under
  `object-fit: cover` in a band this wide shows 11% of the frame at 2531 and 36% at 390, and at
  16% the bottom of the band is 0.21 of the frame at 2531 and 0.46 at 390 — clear of the nest
  at every width from 320 to 2560.
- **`pr-mov-img_5687`'s manifest alt says "three people"; the frame holds five.** Counted, not
  copied.
- Derivative widths are not uniform. Only ten stills in the Praṇava library have a 2560 and two
  of them are here; every `pr-ttc-*` caps at 1620, which is why §05's largest frame is capped at
  84rem — a 1620px source is exact at 1440 and still unstretched at 2531.
- Every `pr-pbh-*` derivative is portrait 3:4 and every `pr-ttc-*` landscape one is 3:2,
  measured with sharp rather than read from the manifest's pre-rotation `w`/`h`.

### The clips

`muted`, `playsinline`, `loop`, `preload="none"`, `data-src` rather than `src`, **and no
`poster` attribute anywhere** — the `<picture>` beneath is the poster and is never removed; a
poster is fetched even when `src` is never set, which cost this site 948 KB on every device
once already. Attached on approach after a 180 ms settle, paused when off screen or when the
tab is hidden, and released — source dropped, request aborted — a viewport and a half past,
but **never** released once the transfer has finished, because then a reader working back up
the page would pay twice.

Two additions to the `/within/` contract:

1. **Nothing is fetched until the page's own `load` event.** This page's hero differs from
   `/within/`'s arches in one way that matters: its centre window is on screen at scroll 0, so
   the 180 ms settle fires during the initial load and a 2,329 KB clip goes out alongside the
   stylesheet, four web fonts and the hero's two photographs — for a loop nobody can watch
   before the page it sits in has painted.
2. **The return is free.** `pr-mov-img_5687.mp4` plays in the hero and again in §06 and is
   **transferred exactly once** — verified over CDP: one `loadingFinished` for that URL, 2,329 KB,
   across a full scroll of the page. A page about coming back to one practice pays for it once.

---

## Every measurement

Measured against the **production build** served from `out/`, not the dev server. (The dev
server's Next.js indicator badge sits in the bottom-left corner and lands on §01's register
numeral at 768×1024, where it reported a phantom 1.34:1 — the same element measures 0 FAIL in
production.)

### Contrast — `tools/contrast-probe.mjs`, every section at all seven viewports

| viewport | hero | 01 | 02 | 03 | 04 | 05 | 06 |
|---|---|---|---|---|---|---|---|
| 320×568 | 0 FAIL | 0 | 0 | 0 | 0 | 0 | 0 |
| 390×844 | 0 FAIL | 0 | 0 | 0 | 0 | 0 | 0 |
| 768×1024 | 0 FAIL | 0 | 0 | 0 | 0 | 0 | 0 |
| 1024×768 | 0 FAIL | 0 | 0 | 0 | 0 | 0 | 0 |
| 1280×720 | 0 FAIL | 0 | 0 | 0 | 0 | 0 | 0 |
| 1440×900 | 0 FAIL | 0 | 0 | 0 | 0 | 0 | 0 |
| 2560×1440 | 0 FAIL | 0 | 0 | 0 | 0 | 0 | 0 |

**49 runs, 0 FAIL.** The page's worst measured p5 is 6.17:1 (the register mark's teal-deep on
the warm ground); no text on this page ever sits on a photograph, so every ratio is a constant
rather than a bet on a crop. Cream on the reversed ground is 16.66:1, the 0.90-alpha cream
13.5:1, ink on paper 15.6:1, `--ink-soft` on paper 6.89:1, `--clay-deep` on paper 5.98:1.

### Weight

Cold load, production build, Chromium throttled to 4 Mbps / 40 ms:

| | at the `load` event | +4 s | full scroll to the footer |
|---|---|---|---|
| **390×844** | **1,412 KB** | 1,412 KB | **3,071 KB** |
| **1440×900** | **1,609 KB** | 2,442 KB | **6,118 KB** |

At 390 the capability gate (`max-width: 860px`, save-data, or no h.264) means **no clip is ever
attached** — verified in the DOM: all three `<video>` elements report `attached=false`. The
phone gets twelve photographs and three posters and a complete page.

At 1440 the two clip files are 2,329 KB and 1,401 KB of the 6,118 KB; the remaining ~2.4 MB is
twelve photographs at their correct derivatives plus the shared shell (238 KB CSS, 529 KB JS,
625 KB of fonts). **The floor for the photographs is 960w**: no smaller derivative exists in
`public/media/stills`, and at 390 a 268px frieze tile therefore still pulls a 960.

Unthrottled, on localhost, the totals are 3,977 KB at 390 and 8,674 KB at 1440 — the difference
is that an unthrottled browser also completes every cross-route speculative prefetch the shared
`SiteNav` issues (850–1,097 KB of other pages' media plus 441–625 KB of their documents), which
is shell behaviour on every page of this site and not this page's to fix.

### Everything else

- **No horizontal overflow, 320 → 2560.** `scrollWidth === clientWidth` at 320, 390, 768, 1024,
  1280, 1440, 2531 and 2560.
- **Centred at 2531.** Every capped block goes through `.pc-rail`
  (`max-width` **and** `margin-inline: auto`) or sets `margin-inline: auto` itself; checked on
  the rendered pixels at 2531×1140, content centred to within a pixel.
- **Exactly one `<h1>`** ("Practice"). The register marks are the `<h2>`s, and Prayatna and
  Prāṇāyāma are `<h3>`s under their own marks, so the outline is a usable table of contents.
- **Alt on every image**: `main img:not([alt])` returns 0. The frieze's second pass carries
  `alt=""` because it is the same three photographs, and a reader who meets each of them twice
  has been told the room is six rooms.
- **`prefers-reduced-motion: reduce` yields a complete, static, usable page**, screenshotted and
  read at 1440×900: `.is-live` is never added, no `[data-pc]` block is invisible, no clip is
  attached, the hero windows are open and §04's rules stand still. Nothing on this page is
  reachable only through motion.
- **JavaScript off**: identical result — same document height, same 0 invisible blocks, the
  frieze static and still cut by both screen edges.
- **Focus is visible on both grounds** — cream ring in a dark halo on the reversed sections, ink
  ring in a cream halo on paper. Four focusable elements in `main`, all real links.
- **No console errors, no 4xx, no 5xx.** Two kinds of aborted request appear in devtools and
  both are deliberate: the shared `SiteNav`'s `<Link>` prefetches of the other eight routes
  (shell behaviour, present on every page), and `release()` dropping a clip that is still in
  flight a viewport and a half after it left the screen — which is the whole point of
  `release()` and is what `/within/` already does.
- `npx tsc --noEmit`, `npx next build`, `npx eslint .` and `npm run check:copy` all pass.

### One thing that could not be improved

**1,350 KB of photographs at 390.** Twelve frames is the fewest this page's mechanics allow —
the hero's triptych is three, §02's frieze is three distinct files however many tiles it shows,
§05's run is four, and §03 and §04 are one each — and 960w is the smallest derivative that
exists for any of them. Encoding a 480w tier would roughly halve it, but `public/media/` is not
this page's to touch.
