# Praṇava — Insights

`/insights/`. Three sections, one photograph, no JavaScript, and the page is a reading.

The brief is explicit about what this page is. `Context/new/Pranava Website.docx` §7:

> These two items should appear in the main navigation now, but we do not need to build them
> fully. **Insights: create a simple page saying that writings and resources will be added
> here. A full journal/blog can be developed later.**

Simple means not pretending to content that does not exist. It does not mean generic, and it
emphatically does not mean a grid of empty article cards — which is the worst version of this
page, because it manufactures exactly the impression ("there is writing here") that the
missing writing would have earned.

---

## The three, each as the thing that happens

| # | section | the mechanic, as an event | ground |
|---|---------|---------------------------|--------|
| — | Masthead | **The client's own line for this area, and one plain sentence about what is not here.** The notice sits under its own rule at reading size, so it reads as a notice rather than as an apology | deep |
| 01 | The kind of thinking that will be here | **A paragraph read at two distances at once.** Each passage is one continuous sentence of the client's, with the clause that carries the thought set in the display face at a little over twice the size of the rest — inline, in the same paragraph, wrapping with it. The paragraph swells where the point is and drops back around it | paper |
| 02 | When there is something to read | **Two seats with nobody on them, and the way to be told.** The one photograph the archive can honestly give a page about writing, and a route that says exactly what pressing it does | warm |

Grounds run **deep · paper · warm**, and the footer's dark is the page's ending.

### Why that is the mechanic

What a journal promises is not a number of posts. It is a standard of attention. This page
shows the standard by *applying* it — the only editorial act on the page is the choice of
which clause in each paragraph is the point, which is what an editor does and what a journal
is. It adds no words at all.

The folio in the margin is the second half of it: `position: sticky` inside each `<article>`,
so while you are reading a passage its source stays beside you and is replaced by the next
one when you leave it. That is the running head of a printed page, and it is CSS layout, not
animation.

---

## The empty state, and how it is handled

### What does not exist

`insights.articles` is `null`. **No article, title, date, author, excerpt, category, tag or
resource appears in the Blueprint, the About document or the Website brief.**
`design/PRANAVA-BUILD.md`'s table records "Articles for Insights: **no**".

Blueprint §6's eventual shape for this page is: featured article → categories → latest
articles → search → resources → subscription. Every one of the six needs articles to exist
first:

| Blueprint §6 asks for | why nothing renders |
|---|---|
| Featured article | there is no article |
| Category set | categories are a property of a body of writing that does not exist |
| Latest articles | nothing has been published |
| Search | a search box over nothing returns nothing, twice |
| Resources | no resource, reading list or download has been supplied; the media audit records that **there is not a book or a written text anywhere in the archive** |
| Subscription | there is no backend and no mailing list — see below |

**None of the six is stubbed.** There is no empty grid, no greyed card, no disabled search
field and no "0 results". The omissions are recorded here so they read as decisions rather
than as oversights.

### What the page does instead

The client's About document argues, at length and well, that Yoga is not understood by
collecting techniques, that a certificate does not make a teacher, and that inquiry is part of
practice. Those are the sentences a first article would be built from, they are already
published on `/about/`, and they are what a reader arriving with Blueprint §3's "I want to
understand more" actually came for.

So the page **reads three of them** rather than promising three that do not exist, and each
one links back to where it already lives.

```
01  about.approach.items[2].body   →  /about/#apr-approach   "Our approach"
02  about.teach.open               →  /about/#apr-teach      "How we teach"
03  about.founder.quote            →  /about/#apr-founder    "The founder"
```

The masthead says the plain thing once: **"Nothing has been published here yet."** It is set
in the display face at 1.85rem under a sand rule, above one sentence explaining what the page
does instead. It is not a banner, a badge or a toast.

### Nothing is retyped, and the build enforces it

`components/insights/pieces.ts` does not hold the passages. It holds three calls to
`mark(src, clause, from, href)`, where `src` is the string read out of `content/pranava.ts`
and `clause` is located inside it with `indexOf`. The function **throws** if the clause is not
found character for character, or if it is found twice.

These are server components, so that check runs during `next build`: if the client revises one
of these sentences, the build fails loudly instead of silently shipping a clause that is no
longer theirs. `lead`, `lit` and `tail` are then slices of the one string, so the three spans
concatenate back to the client's sentence exactly. It is the same guarantee
`npm run check:copy` gives, one layer closer to the page.

### The subscription, honestly

Blueprint §6 asks for one. `links.emailGeneral`, `links.emailProgrammes` and
`links.emailCollaborations` are all `null`; there is no backend, no list and no mailbox. An
email field would collect addresses into nothing, which is worse than no field.

The one live channel takes the request instead. The link opens WhatsApp with
*"Please let me know when writing is published on Insights"* already typed, and the paragraph
above it says so in those words — **you read it, change it and send it yourself.**

---

## The one photograph

**A page about writing has nothing literal to be photographed with.** The media audit is
explicit that there is not a book, a notebook of text, a printed page or a written document
anywhere in 1,211 frames; the About page recorded the same finding when it had to choose a
door for "writing, reflection, study and exploration".

What the archive does have is **a place to sit**: `pr-ttc-dsc_0014_1`, two painted circular
tree seats on open sandy ground under spreading trees, with nobody on them. It illustrates
nothing, claims nothing, contains no person to be misread, and captions cleanly as what it
shows. **One frame, not a gallery**, because one is all that is true — and because a page
about the absence of writing should not be padded with pictures.

- `alt` is **verbatim** from `public/media/pranava-stills.json`: "Two painted circular tree
  seats under spreading trees on open sandy ground".
- The caption is **provenance**, not subject: "Prabodha TTC". That is the manifest's own
  collection for this frame, and "Prabodha" is the client's own programme name from Blueprint
  §4.3 — the only reason it can be printed. No date: none is recorded for that collection
  anywhere. (The other collection in the media drop, "Prabhava", appears in none of the
  client's three documents and is not nameable; `components/contact/routes.ts` reached the
  same conclusion independently.)
- **Its largest derivative is 1620, so it is never full-bleed.** The plate caps at 60rem and
  `sizes="(max-width: 899px) 100vw, min(60rem, 52vw)"`, so a phone pulls the 960 and nothing
  ever asks for more than the file can give.
- `loading="lazy"`, `decoding="async"`, explicit `width`/`height`, and **no `<video>` and no
  `poster` attribute anywhere on the page** — a poster is fetched even when `src` is never
  set, which cost this site 948 KB on every device once already.

---

## The mixed leading, which is the one thing that can go wrong here

Setting a 3.1rem clause inline inside a 1.22rem paragraph is the mechanic, and it is also the
way to get two lines of type on top of each other. In CSS inline layout each inline box
contributes its own half-leading and the line box takes the **maximum**, so:

- the quiet spans carry `line-height: 1.62` — their own comfortable reading leading;
- the lit span carries `line-height: 1.1`;
- the paragraph's own strut is set to the quiet size and the quiet leading, so a line with no
  lit text in it still gets 1.62.

A line of quiet text alone is 1.62 em tall. A line containing any of the lit clause is
1.1 × its own size, which is always the larger of the two. Lines therefore never collide, and
the quiet text never inherits the display face's tight leading. Checked on the render at 320,
390, 768, 1024, 1440 and 2531: no overlap at any width.

**The measure is in `rem`, not `ch`, and that is a bug that was found and fixed.** `ch` is
computed against the paragraph's own font-size — which here is the QUIET size — so
`max-width: 30ch` set the *display* clause to about 15 characters a line and ran the passage
five lines deep in a column 355px wide at 1440. 36rem is 576px: 47 characters of the quiet
voice and about 24 of the display one, which is the balance the mechanic needs. At ≤1023px it
relaxes to 34rem, where the folio is above the passage rather than beside it.

**The reading section takes a narrower rail than the rest of the page** (`--in-max: 58rem`
against 78rem elsewhere) — a text block inside a page, which is what a book does. Without it
the folio and the 36rem measure sat together in the left half of a 78rem rail and the reading
was 190px left of the page's axis at 2531; at 58rem the block's own centre lands 28px from the
viewport centre at 2531 and 31px at 1440.

---

## Measurements

### Contrast — glyph-accurate, on rendered pixels, against the production build

Measured against the static `out/` build served over HTTP, not against `next dev`: the Next
dev-tools badge is a `nextjs-portal` custom element whose own box is not `position: fixed`, so
the probe's overlay filter never sees it and it produces phantom failures. It does not exist
in the production build.

`node tools/contrast-probe.mjs <url> --width W --height H --scroll-to <section>` for all three
sections at nine viewports — **27 runs, 271 sampled text runs, 0 FAIL** — plus five runs with
no `--scroll-to` (the fold) at 320×568, 390×844, 1024×768, 1440×900 and 2531×1140, also
0 FAIL.

```
320x568   390x844   768x1024   900x800   1024x768
1280x720  1440x900  2531x1140  2560x1440
```

On the reversed masthead the register mark cannot use teal (2.44:1) or clay (4.2:1) at
11.5px, so it goes cream and the accent becomes a **sand rule**, which is the one thing sand
is allowed to be. On the two light sections the mark is `--teal-deep` (6.95:1 on cream) with a
`--clay-deep` numeral at **weight 600** — at 400 the identical colour pair measures 4.57:1,
because at 13px a 400-weight Fraunces numeral loses enough of its stroke to antialiasing that
the 5th-percentile sample drops half a point.

**One real failure was found and fixed, and it was not a colour.** At 320×568 and 768×1024,
with the page scrolled so `.in-told` sits 110px below the viewport top, the last lines of
passage 03 sat under the navigation pill and measured **1.86:1** — ink showing through
`rgba(16,12,10,0.74)`. The probe skips an element only when an overlay covers more than 25% of
its box; this one measured **17.4%** (the span's box is 192px tall, only its last 45px were on
screen, and the pill covered 33 of those), so it passed the filter and the pixels beneath the
bar were sampled anyway. `.in-read` now takes a **deeper bottom padding than top**
(`clamp(7rem, 11vw, 9rem)` against 4rem), which is right on its own terms — the last thing in
the section is a 3.1rem display clause and 64px is not enough air under a line that size — and
both runs are 0 FAIL.

The underlying cause is worth recording because it will recur: **the site's navigation pill is
translucent in both of its states** (`rgba(16,12,10,0.74)` dark, `rgba(251,247,242,0.90)`
light), so text passing under it is not hidden, it is dimmed — and the painted/unpainted diff
therefore finds glyphs to sample. An opaque bar would produce no samples at all. The About
page hit the same thing from the light side and recorded it as "1.22:1, cream on cream".

**No image-filled type** on this page, so `tools/check-image-text.mjs` has nothing to measure
here.

### Structure

At 320, 360, 390, 519, 520, 640, 759, 760, 768, 899, 900, 1024, 1280, 1440, 1920, 2531 and
2560, walking the whole document in 600px steps at each:

- `scrollWidth === clientWidth`. **Maximum horizontal overflow 0px at all 17 widths.**
- Exactly **one `<h1>`** ("Insights") and **two `<h2>`** — the two register marks, so the
  outline is Insights → 01 The kind of thinking that will be here → 02 When there is something
  to read.
- **1 image, with a real `alt`.** `noAltAttr = 0`, and no `alt=""` anywhere.
- **Six focusable elements in `<main>`** — the three folio links, the enquiry, and the About
  and Contact links. Each was focused in turn and the computed outline read back:
  `2px solid rgb(36, 29, 24)` in a `rgba(251,247,242,0.95)` halo, the inverted ring paper
  needs. No `outline: none` anywhere.
- **0 console errors, 0 failed requests.**

### Centring at 2531

Every capped block goes through `.in-rail`
(`max-width: calc(var(--in-max) + 2 * var(--rail)); margin-inline: auto`). Measured on the
render at **2531×1140**: the masthead and closing rails span x = 574 → 1958, centre **1266**,
against a viewport centre of **1266**. The reading section's own narrower rail is centred on
the same axis, and the reading block inside it (folio + gap + 36rem measure) has its own
centre 28px from the viewport's.

### Reduced motion, and JavaScript disabled

**This page runs no JavaScript.** There is no client island, no scroll listener, no
IntersectionObserver and no reveal. The folio's `position: sticky` is layout, not animation,
and is therefore unaffected by `prefers-reduced-motion` — which is correct: nothing about it
moves under its own power.

Rendered side by side at 1440×900 with `prefers-reduced-motion: reduce` and without it:
document height identical, `main.innerText` identical (1,407 characters), **0 elements
carrying a transform** and **0 elements with text at `opacity: 0` or `visibility: hidden`** in
either. The only `transition` in `styles/insights.css` is the 5px nudge on the link's arrow,
and it is switched off under reduce.

With scripting off the static HTML holds all 1,381 characters of the page's text, the
photograph, and all six links including the three `/about/#…` anchors.

---

## Rejected

- **A grid of empty article cards.** Named in the brief as the worst version of this page, and
  it is: it manufactures the impression the missing writing would have earned.
- **Invented titles, dates, authors or excerpts.** Including plausible ones. Including
  "Coming soon: …".
- **A search field.** Over nothing it returns nothing, twice.
- **A category list.** Categories are a property of a body of writing that does not exist.
- **An email subscription form.** No backend, no list, no mailbox. A field that silently drops
  what is typed into it is worse than no field.
- **Printing `insights.note` ("A full journal/blog can be developed later") on the page.** It
  is a sentence in the conversion brief addressed to whoever builds the site, not a sentence
  addressed to a reader. Quoting it at a visitor would be odd, and it is not a claim the
  client has made to the public.
- **A gallery.** One frame is all the archive can honestly give this page.
- **Setting the emphasised clause in the same face at a heavier weight.** The home page's
  section 05 already owns "two voices from one typeface"; the size step across two faces is a
  different object, and it keeps the quiet voice in the text face where reading belongs.
- **Making the whole reading a sticky stack of full-screen panels.** It is the most common
  scroll effect on the web and it would have said nothing about reading that the type does
  not already say.
- **A filled clay plate for the route.** The Heal page ends on one and the Events page on a
  ruled ledger row; three held-back pages that all ended on the same button would be three
  versions of one page. This one is a reading page and its route reads like a sentence.
- **Printing the outgoing message in a quoted block, as Heal does.** Heal needs it — it is the
  page where a reader must know exactly what they are about to send. Here the sentence is
  carried inside the prose instead, so the two pages do not close with the same object.

---

## How the three held-back pages differ from one another

```
            media        the mechanic                ground arc            the reader's move
Heal        none         a drawing that stops        paper throughout      none; it is still
Insights    one frame    type at two sizes at once   deep → paper → warm   reading
Events      six frames   a strip with a blank end    paper → deep → warm   leafing sideways
```

The media gradient is the archive's, not a preference: there is nothing in 1,211 frames for
Heal, almost nothing for Insights, and a great deal for Events. Insights is the only one of
the three that opens on the reversed ground, the only one whose mechanic is typographic, and
the only one that carries a running folio.
