# Praṇava — Events

`/events/`. Three sections, six photographs, no JavaScript, and the page is a record rather
than a programme.

---

## The three, each as the thing that happens

| # | section | the mechanic, as an event | ground |
|---|---------|---------------------------|--------|
| — | Masthead | **The answer first.** The largest type on the page is the thing the visitor came to find out, and it is a negative — "Nothing is scheduled at the moment." The section's bottom padding is collapsed so the dark strip begins directly under it and the two read as one object | paper |
| 01 | What has happened here | **An exposed strip with one frame still blank.** Six photographs butted along one continuous band between two rebates — a number above each, what it shows below each. You leaf along it, and at the end the exposures stop: the seventh place is blank paper on the dark band, which is where the next event is not yet | deep |
| 02 | Hearing about the next one | **One line in the schedule, and the line is "ask."** A full-measure ruled row, label left and arrow right, hairlines above and below — the shape an entry in a schedule has. The schedule has one entry | warm |

Grounds run **paper · deep · warm**, and the footer's dark is the page's ending.

### Why that is the mechanic

**A grid of six photographs is a gallery**, and a gallery of past events on a page with no
future ones reads as nostalgia. A strip is a *record*: it has an order, it has an end, and the
end is the point. The empty state therefore lives **inside the object** rather than printed
underneath it, which is the difference between an honest page and an apology.

The film-rebate edge markings — the frame number above, the description below, both on a
continuous dark rail — are what make seven separate cells read as one strip, and they are also
what says "this is a record, not a listing". A listing has dates in that position. This one has
what the photograph shows.

---

## The empty state, and how it is handled

### What does not exist

`events.upcoming` is `null`. **No event name, date, venue, fee, duration, capacity or
registration detail appears in the Blueprint, the About document or the Website brief.**
`design/PRANAVA-BUILD.md`'s table records "Upcoming events: **no**".

Blueprint §6's shape for this page is: upcoming events → event details → registration/enquiry
→ past events later.

| Blueprint §6 asks for | why nothing renders |
|---|---|
| Upcoming events | none supplied. No calendar, no list, no "TBA" row and no skeleton card |
| Event details | there is no event to detail |
| Registration | nothing to register for, and no backend to register with |
| Past events (later) | **this is the interesting one** — see below |

### The past-events problem, and the rule that solves it

The archive *does* hold photographs of gatherings that have already happened: a residential
teacher training on a rural campus — the approach path, the pavilion, the hall, practice, rest,
the grass under the trees. An events page with no scheduled events but visible evidence that
things happen here is honest, and it is a far better page than an empty calendar.

But a "past events" section would need each frame to be captioned with an event: a name, and
usually a date. **Nothing in the archive may be captioned with an event name the client has
not used.** The manifest records a collection and a source path; it does not record what any
gathering was called, when it ran, or who was there. No audit dates the two new collections at
all.

So the rule this page keeps, without exception:

- **Every caption says what its frame SHOWS.** "An earth path between trees". "A circle of
  chairs in an open pavilion". "A speaker, and a seated group". Not what it was, not when it
  was, not who is in it.
- **The masthead says so out loud**, once: *"The captions say what each photograph shows. None
  of them is an announcement."* A reader should not have to infer that a photograph is not a
  listing.
- **The strip is labelled as an archive, not as an event list**: "From Praṇava's own archive ·
  Prabodha TTC".
- **Nobody is named anywhere**, because the archive does not record who is in any frame and
  the client has supplied no names.

### The one word of provenance that is allowed

"Prabodha" is the client's own programme name from Blueprint §4.3, and `source` in
`public/media/pranava-stills.json` puts all six frames in the "Prabodha TTC Photos" collection.
That is why the provenance line can name anything at all.

The other collection in the media drop, **"Prabhava", appears in none of the client's three
documents** — not the Blueprint, not `Pranava Website.docx`, not `Pranava About Page.docx` —
so it is a folder label and cannot be printed. `components/contact/routes.ts` reached the same
conclusion independently and its reasoning is followed here. No date is printed because none is
recorded for either new collection.

### The route

Blueprint §6 asks for registration. There is nothing to register for and no backend to
register with, so the page does not pretend to a booking flow. The ruled row opens WhatsApp
with *"Hello Praṇava. Please let me know about upcoming events."* already typed, and the
message is printed on the page beneath the label so nobody presses it without knowing what it
will say. The paragraph above it states the mechanism: **you read it, change it and send it
yourself.**

---

## The six photographs

All six are `pr-ttc-*` frames whose manifest `source` is the Prabodha TTC collection. The order
is a reading order — outside, then talking, then working, then still, then outside again — and
**the page never claims it is one day or one gathering**, because no audit says so.

```
01  pr-ttc-dsc_0015_1   An earth path between trees
02  pr-ttc-dsc_0278_1   A circle of chairs in an open pavilion
03  pr-ttc-dsc_0191     A speaker, and a seated group
04  pr-ttc-dsc_0046_1   Five practitioners in one shape
05  pr-ttc-dsc_0262_1   Four at rest over bolsters and chairs
06  pr-ttc-dsc_0402     Four sitting on the grass under trees
07  —                   (blank)
```

`alt` on each is **verbatim** from `public/media/pranava-stills.json` — the vision audit's own
description of what is in the frame. The visible caption is the strip's shorter reading of the
same thing. Three different kinds of statement are kept apart: the number is position, the alt
is what the picture shows, the provenance is where it was taken, and none of them is an event.

### Why they are all the same shape, and never large

**Measured on the encoded files, not read out of the manifest** — whose `w`/`h` are
pre-rotation camera values and are wrong for every rotated frame. Every landscape `pr-ttc-*`
derivative on disk is exactly **1620 × 1080** and **960 × 640**; the portrait ones are
960 × 1440 and are not used here. A strip needs one ratio, and 3:2 is the ratio the archive
actually has.

1620 is the largest derivative any of the six has —
`design/PRANAVA-BUILD.md` records the same ceiling for this collection: "good to ~1600 wide,
never a 2560 full-bleed". The cell height caps at **340 CSS px**, so a cell is **510px** wide
and the 1620 file still covers it at 2× with room to spare. `sizes` is explicit
(`(max-width: 759px) 100vw, min(510px, 45vw)`) so a phone never pulls a 1620 for a 347px cell.

The first two are `loading="eager"` because they are in the fold on a wide screen; the rest are
lazy. **No `<video>` and no `poster` attribute anywhere** — a poster is fetched even when `src`
is never set, which cost this site 948 KB on every device once already.

---

## The strip, measured

```
cell height    clamp(190px, 30vh, 340px)
cell width     height × 1.5            → 285px … 510px
gap            4px
rebate above   24px    number, 12px Fraunces in sand, 1px hairline below
rebate below   38px    caption, 10.5px Inter at 0.10em uppercase, 1px hairline above
track          7 cells + six 4px gaps  → 2019px … 3594px
```

The track always overflows its own scroller and never the document: 2019px against a 320px
viewport at the floor, 3594px against 2560px at the cap. Verified at 2531×1140:
`scrollWidth 2980 / clientWidth 1440` at 1440, and `document.scrollWidth === clientWidth` at
every width tested.

**The rebate heights are fixed**, and that is what makes seven separate cells read as one
continuous strip: the numbers across the whole track sit on one line and the captions on
another, and the two hairlines run level from end to end.

**The strip starts on the page's axis and runs off the right.** `padding-inline: var(--rail)`
alone put the first frame against the viewport edge, which at 2531 is 558px left of every word
on the page — the strip read as unmoored. It now takes
`max(var(--rail), calc((100% - var(--ev-max)) / 2))`, which resolves to the rail's own content
left edge at every width. Measured: **21.6px at 320, 37.8px at 900, 80px at 1440 and 625.5px at
2531** — the same x as the register mark above it in all four.

**Caption clipping was checked rather than assumed.** The longest caption, "FOUR AT REST OVER
BOLSTERS AND CHAIRS", is the hard case at the narrowest cell. `scrollHeight - clientHeight` on
every caption at 320, 390, 519, 760, 900, 1440 and 2531: **0px everywhere.** The 38px rebate
holds two lines of 10.5px/1.35 with room, which is what the 320 case needs.

### Why the reader moves it, and not a script

No script runs on this page. The band is a **native horizontal scroller** with proximity
snapping, so it behaves identically with JavaScript disabled, under `prefers-reduced-motion`
and on a touch screen — and nothing on the page is reachable only through motion, because
there is no motion.

It is `role="region"` with an `aria-label` and `tabIndex={0}`, which is what makes a scrollable
region reachable and scrollable from the keyboard; focused, it takes the global cream ring in a
dark halo, which is correct on the deep ground. The affordance is stated rather than implied —
**"Leaf along →"** at the right of the section's lead — because a band running off the right
edge says "there is more" to a mouse and says nothing to a reader who has never met a
horizontal scroller.

**The blank cell carries no link, on purpose.** A focusable element inside a horizontal
scroller drags the whole band sideways the moment a keyboard user tabs past it. The route out
lives in section 02, where it can be reached without the page moving.

**Below 760px the strip stops being a strip.** A region that can only be read by scrolling it
sideways is a reflow problem on a phone, so the track becomes a column and the frames stack at
3:2 — the rebates stay, so it is still a record. Both axes are set back to `visible` there, not
just `overflow-x`: when one axis is not `visible` the other computes to `auto`, and
`overflow-x: visible; overflow-y: hidden` would have left the band a scroller with nothing in
it to scroll.

---

## Measurements

### Contrast — glyph-accurate, on rendered pixels, against the production build

Measured against the static `out/` build served over HTTP, not against `next dev`: the Next
dev-tools badge is a `nextjs-portal` custom element whose own box is not `position: fixed`, so
the probe's overlay filter never sees it and it produces phantom failures. It does not exist in
the production build.

`node tools/contrast-probe.mjs <url> --width W --height H --scroll-to <section>` for all three
sections at nine viewports — **27 runs, 354 sampled text runs, 0 FAIL** — plus five runs with
no `--scroll-to` (the fold) at 320×568, 390×844, 1024×768, 1440×900 and 2531×1140, also
0 FAIL.

```
320x568   390x844   768x1024   900x800   1024x768
1280x720  1440x900  2531x1140  2560x1440
```

**The captions are the reason the rebate exists, and the reason it is dark.** A 10.5px caption
laid over a photograph cannot be guaranteed any ratio at any viewport — the ground is whatever
the frame happens to be. On the rebate it is `--ink-onPic-2` (cream at 0.90) over the strip's
own `rgba(251,247,242,0.05)` on warm black, which is fixed by construction and measures around
15:1 regardless of which photograph is beside it. The frame numbers take `--sand`, which is
what sand is for on a dark ground.

On the reversed strip section the register mark cannot use teal (2.44:1) or clay (4.2:1) at
11.5px, so it goes cream with a sand rule. On the two light sections it is `--teal-deep`
(6.95:1 on cream) with a `--clay-deep` numeral at **weight 600** — at 400 the identical colour
pair measures 4.57:1, because at 13px a 400-weight Fraunces numeral loses enough of its stroke
to antialiasing that the 5th-percentile sample drops half a point.

`--clay` (#C1613C) appears on this page only as hairlines and as the 9%-alpha hover wash on the
ruled row. It is 3.90:1 with cream and may never carry text.

**No image-filled type** on this page, so `tools/check-image-text.mjs` has nothing to measure
here.

### Structure

At 320, 360, 390, 519, 520, 640, 759, 760, 768, 899, 900, 1024, 1280, 1440, 1920, 2531 and 2560
— both sides of the 759/760 breakpoint where the strip changes axis — walking the whole
document in 600px steps at each:

- `scrollWidth === clientWidth`. **Maximum horizontal overflow 0px at all 17 widths**, with the
  track overflowing its own scroller by up to 2154px at 1440 and never the page.
- Exactly **one `<h1>`** ("Events") and **two `<h2>`** — the two register marks, so the outline
  is Events → 01 What has happened here → 02 Hearing about the next one.
- **6 images, every one with a real `alt`.** `noAltAttr = 0`, and no `alt=""` anywhere: there
  is no decorative photograph on this page.
- **Three focusable elements in `<main>`** — the strip region, the enquiry row and the Contact
  link. Each was focused in turn and the computed outline read back: the strip gets
  `2px solid rgb(251, 247, 242)` in a `rgba(16,12,10,0.92)` halo (the global ring, correct on
  the deep ground) and the two on paper get `2px solid rgb(36, 29, 24)` in a
  `rgba(251,247,242,0.95)` halo. No `outline: none` anywhere.
- **0 console errors, 0 failed requests.**

### Centring at 2531

Every capped block goes through `.ev-rail`
(`max-width: calc(80rem + 2 * var(--rail)); margin-inline: auto`). Measured on the render at
**2531×1140**: all four rails span x = 558 → 1974, centre **1266**, against a viewport centre of
**1266**. The strip is the one thing that deliberately does not go through the rail — it is
full-bleed — but its first frame is aligned to the rail's content edge by the expression above,
so it starts on the same axis as the type.

### Reduced motion, and JavaScript disabled

**This page runs no JavaScript.** There is no client island, no scroll listener, no
IntersectionObserver and no reveal.

Rendered side by side at 1440×900 with `prefers-reduced-motion: reduce` and without it:
document height identical, `main.innerText` identical (1,166 characters), **0 elements carrying
a transform** and **0 elements with text at `opacity: 0` or `visibility: hidden`** in either.
Two things are declared for reduce: the 6px nudge on the ruled row's arrow is switched off, and
`scroll-snap-type` is set to `none` — a snap point is a scroll behaviour rather than an
animation, but a reader who has asked for less movement should not have the page correcting
their scroll.

With scripting off the static HTML holds all 1,135 characters of the page's text, all six
photographs with their captions and alt text, the blank seventh cell, and both links.

---

## Rejected

- **An empty calendar, a month grid, or a "no upcoming events" row in a table.** All three are
  a listing component rendering zero rows, which is the shape of a broken page.
- **"TBA", "Dates to be announced", or a skeleton card.** Claims about the future are still
  claims, and the client has not made one.
- **Naming any photograph with an event.** The archive records a collection and nothing else.
  The captions say what the frames show.
- **A "Past events" heading over the strip.** It would turn six captions into six event
  records, which is precisely the claim that cannot be supported. The heading is "What has
  happened here" and the label under the strip is "From Praṇava's own archive".
- **A date on the provenance line.** No audit dates either of the two new collections.
- **A registration or booking flow.** Nothing to book, no backend to book with.
- **Frames that grow as the strip advances.** The Practice page's section 05 is "four frames,
  each bigger than the last, so the reading slows"; a second run of it here would be the
  template repeating itself. Every cell on this strip is the same size, which is also what a
  record looks like.
- **Scattering the frames and packing them as you scroll.** A good idea, listed as available in
  `design/SECTION-MECHANICS.md` — and the Learn page's section 02 is "the heap straightens:
  eight scattered practices draw into one ordered column". Same family, so not this page's.
- **A scroll-driven horizontal travel pinned in a sticky viewport.** It would need a spacer, a
  rAF and a `.is-live` gate to keep a complete no-JS fallback, and the fallback would have been
  the native scroller this page already uses. The reader moving the strip themselves is also
  the better reading of "leafing through a record".
- **A link inside the blank seventh cell.** It would drag the band sideways whenever a keyboard
  user tabbed past it.
- **A filled clay plate for the route.** The Heal page ends on one and the Insights page on a
  quiet underlined line; three held-back pages that all ended on the same button would be three
  versions of one page.

---

## How the three held-back pages differ from one another

```
            media        the mechanic                ground arc            the reader's move
Heal        none         a drawing that stops        paper throughout      none; it is still
Insights    one frame    type at two sizes at once   deep → paper → warm   reading
Events      six frames   a strip with a blank end    paper → deep → warm   leafing sideways
```

The media gradient is the archive's, not a preference: there is nothing in 1,211 frames for
Heal, almost nothing for Insights, and a great deal for Events. Events is the only one of the
three that is photograph-led, the only one with a scrollable object, and the only one whose
largest statement is a plain negative rather than a sentence of the client's.
