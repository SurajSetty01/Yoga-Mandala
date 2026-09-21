# Praṇava — the About page

`/about/`. Eleven sections, eleven mechanics, and no two neighbours sharing a ground or a
move. Everything on the page is a server component except one client island; every sentence
comes out of `content/pranava.ts` verbatim and nothing on the page states a fact the client
has not supplied.

---

## The eleven, each as the thing that happens

| # | section | the mechanic, as an event | ground |
|---|---------|---------------------------|--------|
| — | Hero | **One room, cut into three, whose horizons close into one as you descend.** Three panes carry thirds of a single photograph at three different vertical offsets, with a sand seam on each cut; the offsets resolve to zero and the seams fade, and the room becomes continuous | deep |
| 01 | Introduction | **Five lines opening like a fan.** The shortest line is the claim and is set largest on the narrowest measure; each line after it is wider and quieter, and the warm paper they are printed on is clipped to the shape the type makes | paper |
| 02 | What Praṇava is | **An enlargement you cannot place, stepping back into its room.** The plate opens at 2.4× on a patch of floor and two pairs of hands and pulls back until the same frame is ten people doing one thing | deep |
| 03 | Our approach | **Three columns standing, and a fourth lying across their feet.** Tradition, Practice and Inquiry are three ideas on three clay risers; Transmission is not an idea but the thing that carries them between two people, so it is a reversed beam laid over the columns' feet — and the only one of the four given a photograph | paper |
| 04 | How we teach | **A flight of stairs drawn in clay, one practice per tread.** Each of the eight items is one riser and one tread, indented a step further than the last; the client's closing sentence is the landing the stairs arrive at | warm |
| 05 | The Praṇava journey | **A wheel of four doors; the lit quarter turns as you scroll.** Each quadrant is a quarter of its own photograph, the sector carrying the rotation and the picture inside carrying the equal and opposite one; a clay arc steps round with the door nearest the middle of the screen | deep |
| 06 | The founder | **The sentence he teaches by, set at the size of the room.** The quotation is the largest thing in the section and the biography that produced it is set beneath it at reading size, beside one photograph in which he is plainly not the only person there | paper |
| 07 | Faculty | **Four teachers at four depths, none of them named.** Four frames, four rooms, four ways of teaching, drifting at four rates as the section passes | deep |
| 08 | Praṇava Seva Trust | **Six lines gathered under one bracket, and one door beneath it.** A drawn bracket closes over the Trust's six areas of work; a stem drops out of it and Yoga Mandala hangs off the bottom of the stem as a plate with a photograph and a link | warm |
| 09 | What we value | **Four words of different lengths stretched to one measure.** Each Sanskrit term is set at the size that makes it fill the measure exactly, so none of them outranks another | paper |
| 10 | Begin where you are | **The last line, and two roads leaving it.** The two routes are reversed bands whose photographs pull apart in opposite directions as they arrive, so the last thing the page does is open | warm |

Grounds run **deep · paper · deep · paper · warm · deep · paper · deep · warm · paper ·
warm**, and the footer's dark is the page's ending — the same logic as the home page's
deep → warm → paper → deep → paper.

---

## 07 · Faculty — the section the brief called the hardest

**The problem.** The Blueprint asks for faculty cards with a photograph, a name, areas of
teaching and a link to a profile, and supplies **none of the four**.
`about.faculty.members` is `null`. But `about.faculty.lead` and `about.faculty.body` are
real, delivered content, and dropping them would be worse than any of the bad answers.

The three bad answers, all easy: invent people; draw four empty card outlines with a
"coming soon" in them; or silently delete the section.

**The answer.** What the client has not supplied is the **roster**. What the archive has
actually documented — and what those two sentences are about — is the **act**. So the
section shows teaching rather than teachers.

Four frames, four rooms, four different people working in four different ways:

- `p27-img_0889` — two teachers setting one standing student's shoulder and lower ribs **at
  the same moment**, with two more people watching from the floor. This frame alone is the
  argument: shared teaching, photographed.
- `ss-ven0052` — a teacher crouched beside a seated practitioner, others watching from chairs.
- `p13-img_0569` — one teacher with one student in the middle of the hall while the class
  stands on their own mats and watches.
- `ss-ven0131` — a teacher standing still in the middle of a class lying face down, reading
  a row of backs. Teaching with nothing in his hands.

They are laid out as a field rather than a row: four positions, four sizes, overlapping,
each drifting at its own rate as the section passes (`--k` of −34, +46, −20, +28 px against
a −0.5…0.5 progress). The result reads as many people at work in the same moment, which is
the client's sentence, rather than as four portraits waiting for captions.

**No card, no outline, no silhouette, no placeholder, no count, no name** appears anywhere
in the section, and nothing about the future is promised. When the client sends names,
photographs and links, they become a *fifth* thing in this section and the field stays true.

Its one bug, and it is recorded because the ratios are scale-invariant and so it was wrong
at every width and merely invisible at some: the deepest frame ran to 0.452 of the field
*width* inside a field only 0.391 of the field width tall, so it hung 80px below the field
at 1440 and 90px at 2531 and sat on top of the second paragraph — **1.22:1 measured at
320×568**. Solved rather than nudged: the field is now `2 / 1` and every frame's bottom edge
is computed against it, the deepest clearing the words by 0.042 of the field width (62px at
1440, 87px at 2531) before the ±23px of drift. In the stacked layouts below 900px the drift
is switched off entirely (`--k: 0`) because there is nothing there for a frame to be deep
*against*, and a translate in a grid is just a collision waiting for a narrow viewport.

---

## 09 · What We Value — four words made equal

Sādhana, Adhyayana, Viveka and Sevā are seven, nine, six and four letters long. At one size
they rank themselves by length, and the shortest of them — Sevā, the one about other people
— comes last **and** smallest. So each is set at the size that makes it fill the measure
exactly. One block of type, four lines deep, every line the same length. Not a four-box grid,
and not four headings with paragraphs.

`--fit` is the reciprocal of the word's advance in ems and `calc(var(--fit) * 100cqw)`
against a `container-type: inline-size` parent holds at every width with no media query.

**Measured, not estimated**, in the live page with a canvas 2D context carrying the
element's own computed font, weight and letter-spacing, so what comes back is the **ink**
bounding box and not the advance width. That distinction matters twice: the advance includes
a trailing letter-space, and the `S` of Sādhana and Sevā carries a 0.0625em left side
bearing. Both are corrected — the words are pulled left by their own bearing with
`margin-left: calc(-1em * var(--lsb))` — so the ink of all four starts exactly on the left
rail and ends exactly on the right one.

```
word        ink width (em)   --fit     left bearing (em)   size at 1440   size at 2531
Sādhana        3.7060       0.2698          0.0625            356px          397px
Adhyayana      4.7814       0.2091          0.0156            276px          308px
Viveka         2.8294       0.3534          0.0156            466px          520px
Sevā           2.0403       0.4901          0.0625            646px          722px
```

Identical to four places measured at 400px and at 4000px.

**The face is Inter, and that is a correctness decision rather than a preference.** Fraunces
has no precomposed `ā`, so the browser decomposes it and Fraunces' mark positioning fails —
the macron is dropped or left orphaned. `DESIGN-SYSTEM.md §1` recorded exactly this for the
client's name; Sādhana and Sevā each carry one. Rendered at 356px and 646px and **looked
at**: Inter sets both macrons correctly and in the right place. It also makes the four terms
the only display type on the site set in the text face, which is the right kind of *other*
for four Sanskrit words.

**No Devanagari was added.** The Blueprint mentions Noto Serif Devanagari for Devanagari
content; the client wrote these four words in transliteration, and script the client did not
write is an invention like any other.

---

## The media

`public/media/pranava-stills.json` (83 stills, `pr-` ids) and `pranava-clips.json` **landed
after the page was already built**, and three things changed on the strength of it. They are
recorded here in full because two of them are content-integrity decisions rather than
design ones.

1. **The founder photograph was replaced.** See §06 below — the audit is explicit that
   nothing in 1,211 frames identifies any person, so no photograph on this page may be read
   as a portrait of the founder.
2. **The Insights door was replaced.** It had been a museum desk with a clock and a
   gramophone, standing in for "study" because nothing better existed. The audit records
   that **there is not a book or a written text anywhere in the archive**, so the door that
   the client describes as "writing, reflection, study and exploration" has nothing literal
   to be photographed with; it is now a path running away between trees with one figure at
   the far end, which is the only contemplative non-figure frame in either library and the
   honest answer to a door that is not yet a practice.
3. **The Practice door moved to the new library** (`pr-pbh-img_5560`), which gave it a
   2560-wide portrait where it had had a 960-wide landscape.

**The hero did NOT move, and that is a measurement.** The brief asked to prefer the new
library for the hero; the new library cannot serve it. Every `pr-pbh-*` still is portrait,
and the landscape `pr-ttc-*` frames stop at 1620 — the one 2560-wide landscape in the set
(`pr-pbh-img_5433`) has a child standing in the group. A wide full-bleed band has to come
from the old archive, and `ss-dsc07127` at 1920 is both the widest usable frame and the only
picture in either library with Praṇava's own roundel on the wall.

`pr-ttc-dsc_0284_1` (the study circle with open notebooks — the clearest "people studying"
frame in either archive) was fitted and rejected for a dial quadrant for a geometric reason
worth recording: `object-fit: cover` in a **square** box can only slide a source along its
long axis, so a landscape frame has no vertical lever at all and always shows its own top
half in the two upper quarters. In that frame the top half is pavilion roof and trees. Three
of the four quadrants are therefore portrait sources, where the lever exists.

**Two things the manifest gets wrong**, both found by measuring the files rather than
reading the JSON:

1. `w`/`h` in `stills.json` are the pre-rotation camera values. `p13-img_0615` is listed as
   4032×3024 (landscape) and the encoded derivative is 960×1280 (**portrait**). Every ratio
   in `frames.ts` is the one the browser actually sees.
2. `ss-dsc07127` and `p13-img_0610` are encoded, committed and tracked but **absent from the
   manifest**, so they carry no alt text there. Both are used here and both are described in
   full in `frames.ts`.

Derivative widths are not uniform and that decided several placements:

```
2560   p13-img_0513 0516 0614 0615 0617 0620 0621
1920   the above, plus p13-img_0610 and every ss-dsc07xxx
 960   every ss-ven0xxx still          ← never full-bleed above 960 CSS px
```

So the `ss-ven` stills appear only in a disc quadrant (`ss-ven0096`, `ss-ven0027`) and in a
plate capped at 62rem (`ss-ven0139`). Clip posters (1920 on the long edge) are used as
ordinary stills for the Faculty field.

**No `<video>` anywhere on this page, and therefore no `poster` attribute anywhere.** The
home page's hero and the Within page's arches already carry the site's moving image; a third
run of silent loops would be the one thing SECTION-MECHANICS forbids — a section that could
be swapped with its neighbour. A poster attribute is fetched even when `src` is never set,
which cost this site 948 KB on every device once already; there is nothing here to make that
mistake with.

**Nobody is named in an alt text.** The archive does not record who is in which frame, the
client has supplied no faculty names, and "Praṇav teaching" is a claim this agent cannot
verify from a file. Every description says what is happening, which is also what a reader
who cannot see the picture actually needs.

### §06's photograph, and why it changed

The section originally carried `ss-dsc07137` — one teacher on a stool with listeners seated
around him — with a deliberately neutral alt text that named nobody. The media audit's
finding made that insufficient rather than wrong: a single teacher, printed beside a
biography of the founder, **is read as a portrait of the founder** whatever the alt text
says, and the archive cannot support that identification. It is the same class of error as
the invented "700+ teachers", one step quieter.

It is now `pr-ttc-dsc_0049` — four people in a loose circle of folding chairs, talking, with
notes and phones in their hands and **nobody at the front of the room**. A circle cannot be
read as a portrait of anyone, and it is the literal picture of the sentence the whole section
is built around: *the role of a teacher is not to create dependence*. It carries a visible
caption in the site's caption object — "A discussion circle, with no one at the front of the
room." — so the page states what the photograph shows rather than leaving a reader to assume
who is in it.

### The hero frame

`ss-dsc07127` is the only picture in the archive with **Praṇava's own roundel physically on
the wall** behind the group — a teacher seated cross-legged with palms joined, leading a
semicircle of students, the colour wheel and the wall of charts behind him. It says whose
room this is without a caption, which is what an About hero has to do. Its largest
derivative is 1920, which is why the band is 44svh rather than a full screen: across 2531
that is a 1.32× upscale, checked on the rendered pixels at 2531×1140 and soft enough in the
original that it does not show. `p13-img_0617` at 2560 was the alternative and was rejected —
it is the home page's section 06 photograph, and it is a room with no Praṇava in it.

---

## Every other decision worth the words

**The hero's type is on the ground, never on the picture.** The home page's hero already owns
type-inside-a-moving-photograph on a shaped scrim. Putting this one's on the reversed ground
makes its contrast a constant (16.66:1) rather than a bet on where the skylight falls at
1024×768 — which is the viewport DESIGN-SYSTEM §1 records as the hard case.

**The `<h1>` is the client's own page title at label scale.** `about.hero.heading` is "About
Pranava"; the sentence underneath it is the one worth reading at size. An `<h1>` is a rank,
not a font-size, and there is exactly one on the page.

**The founder section is deliberately inverted.** The brief's §13 says do not let it dominate.
The quotation is the largest thing in the section and the five biography sentences sit under
it at reading size. `about.founder.action` — "Meet Pranav" — is **not rendered**: there is no
founder page in this app and none in the client's material, and a button that goes nowhere is
worse than no button. The byline is the client's own kicker rather than a `<cite>`, because
this agent cannot assert from the source document who said the sentence above it.

**The client's name is set in Inter.** It carries no diacritic in this document's spelling,
but a person's name is not the place to discover that a display face mis-sets one.

**The lead of §02 is split at its own full stops** with a lookbehind, so the three "A place
to …" spans concatenate back to the client's sentence character for character. Nothing is
retyped anywhere on the page; every string is read out of `content/pranava.ts`.

**One client island, four properties and one attribute.** `AboutMotion.tsx` runs one passive
scroll listener that raises a flag, and every read of `scrollY` and every write happens inside
one `requestAnimationFrame`. Geometry is measured on load, on resize and on a `ResizeObserver`
tick, never inside the frame loop. It writes `--apr-close`, `--apr-zoom`, `--apr-drift` and
`--apr-part`, all of which feed `transform` and `opacity` only, plus `data-lit` on the wheel —
four times in the whole section, not once a frame, with the clay arc's quarter-turn and the
dimming of the other three quarters both CSS transitions off that one attribute.

**Every scroll-linked property has a FINISHED default in the stylesheet**, and `.is-live` is
added only after the first frame has written all four. So the page with JavaScript disabled,
and the page under reduced motion, is the completed state and not the start state: room
closed, plate stepped back, wheel unturned with all four quarters lit, the four teachers at
rest, both roads square in their frames.

**Nothing that is observed is clipped.** Chromium computes an IntersectionObserver's rect
after clips, and an element clipped to zero reports ratio 0 and never fires — that shipped a
blank page on this site once. The clipped things here (the disc's quadrants, the hero's panes,
the zoom plate) are all children of, or siblings to, the observed elements.

**Both crops travel with every photograph.** `--op` and `--op-n` are set on the element and
the stylesheet chooses between them at 719px, because a portrait viewport crops a landscape
frame hard and this site has already shipped a hero with the teacher out of shot.

---

## Rejected

- **A four-box grid for the values.** It is what the brief says not to do, and it is what
  four words of different lengths become the moment they are set at one size.
- **Devanagari beside the transliteration.** Not in the client's text. Script the client did
  not write is an invention.
- **Fraunces for the values**, at any size. Measured and looked at: it drops the macron on
  `ā`. This is the documented defect from DESIGN-SYSTEM §1 and it is not negotiable for a
  section whose entire subject is four Sanskrit words.
- **Faculty cards with silhouettes, initials, or blank photo frames.** Every one of them is
  an empty card by another name, and the rule is that `null` renders as nothing.
- **Any sentence promising faculty profiles later.** A claim about the future is still a
  claim, and the client has not made it.
- **A "Meet Pranav" button.** The page it names does not exist.
- **Video anywhere on the page.** Two of the four finished pages already run silent loops;
  a third would be the template repeating itself, and it would be megabytes for it.
- **`p13-img_0617` as the hero.** It is the home page's section 06 photograph, and the
  roundel frame says something this one cannot.
- **`ss-ven0027` for the Insights quadrant, at any crop.** It is a museum desk with a clock
  and a gramophone under a painted portrait of an elderly man — an exhibited work by someone
  this site cannot name, which at quadrant scale reads as a guru portrait however low it is
  cropped. It survived one round as the least-bad stand-in for "study" and was dropped the
  moment the Praṇava library offered anything better.
- **`pr-ttc-dsc_0326`, the banyan meditation.** A beautiful frame, and a single man looking
  straight down the lens. On a page with a founder section that is exactly the photograph
  that gets captioned by the reader rather than by us.
- **`pr-pbh-img_5405` for the Heal door.** A white coat in the frame reads as clinical
  practice, and Praṇava Svasthya's services have no descriptions yet. `p13-img_0610` — a
  teacher steadying a student over two chairs — is supported practice without the claim.
- **`pr-pbh-img_5433` anywhere.** It is the one 2560-wide landscape in the new library and
  its own quality note records a child standing with the adults.
- **A full-bleed beam with its type free-floating in the left half.** It measured 90px off
  the page's axis at 2531. The beam still bleeds; its words now travel inside a real
  `.apr-rail` and the photograph is absolutely positioned over the right of it.
- **The depth drift in the stacked faculty layouts.** See above — it put a photograph on a
  paragraph at 320.
- **A continuously rotating dial arc driven from the scroll loop.** Replaced by four
  `[data-lit]` sibling selectors and one CSS transition: the same sweep, one attribute write
  per quarter instead of a custom property per frame, and it now lands exactly on the lit
  quadrant instead of drifting between two.

---

## Measurements

### Contrast — glyph-accurate, on rendered pixels

**`node tools/contrast-probe.mjs http://localhost:3000/about/ --width W --height H
--scroll-to <section>` for all eleven sections at all seven viewports — 77 runs, 0 FAIL.**

Because that tool samples one scroll position per run, the same glyph-mask algorithm was
also walked down the **whole document** at 0.7-viewport steps at each of the seven sizes:

```
320×568    192 runs — 0 FAIL      1280×720    200 runs — 0 FAIL
390×844    191 runs — 0 FAIL      1440×900    189 runs — 0 FAIL
768×1024   184 runs — 0 FAIL      2560×1440   199 runs — 0 FAIL
1024×768   200 runs — 0 FAIL
```

Tightest run anywhere on the page: **4.69:1** at 320×568 — the 13px Fraunces `--clay-deep`
numeral on `--ground-warm` in the stair, which needs 4.5.

That numeral is the one thing the sweep changed. At `font-weight: 400` it measured **4.57:1**
at 320 and 1024 while the identical colour pair in the register mark measured 5.31:1. The
difference is not colour, it is stroke: at 13px a 400-weight Fraunces numeral loses enough of
its stroke to antialiasing that the p5 drops half a point. Set at 600, the weight the register
mark already uses, it measures 4.69–5.6.

**Three failures were found and all three were measurement artefacts, not design faults** —
recorded because the next person will hit them:

| where | what it looked like | what it was |
|---|---|---|
| 320×568, faculty paragraph | 1.22:1, cream on cream | the paragraph's top lines were under the **navigation pill**. The tool skips an element only when an overlay covers >25% of it; at 27% coverage it passes the filter and the pixels under the pill are sampled |
| 768×1024, stair numeral | 1.86:1 | the **Next dev-tools badge** in the bottom-left corner. It is a `nextjs-portal` custom element whose own box is not `position: fixed`, so the overlay filter never sees it |
| 1024×768, register numeral | 2.92:1 | the same badge |

The sweep above excludes overlay **pixels** from the sample rather than dropping the whole
element, which both removes the phantom failures and stops a long paragraph going unmeasured
because its first line is under the bar.

**No image-filled type on this page** — nothing uses `background-clip: text`, so
`tools/check-image-text.mjs` has nothing to measure here. Every piece of type over a
photograph is either on the reversed ground or, in the two closing routes, on the navigation
pill's own material: `rgba(var(--shade), 0.74)` + a `rgba(251,247,242,0.18)` hairline +
`backdrop-filter: blur(14px)`, which is 8.6:1 by construction over any crop at any viewport.

### Structure

At 320, 390, 520, 768, 900, 1024, 1280, 1440, 2531 and 2560:

- `document.documentElement.scrollWidth === innerWidth` — **maximum horizontal overflow 0px**,
  re-sampled at every screenshot position down the page.
- Exactly **one `<h1>`** ("About Pranava").
- **17 images, every one with an `alt` attribute.** Ten carry a description; seven carry
  `alt=""` and are correct that way: the hero's three panes are slices of one photograph
  which the `role="img"` container describes once, and the wheel's four quadrants are inside
  an `aria-hidden` decorative wheel whose four doors are real links with real text.
- **0 console errors and 0 failed requests.**

### Centring at 2531

The trap DESIGN-SYSTEM §8 records: a capped container with no `margin-inline: auto` looks
right at 1440 and is 462px wrong at 2531. Every capped block on this page goes through
`.apr-rail`, which is `max-width: calc(92rem + 2 * var(--rail)); margin-inline: auto`.
Measured on the render at **2531×1140**: the rail's content spans x = 529.5 → 2001.5, centre
**1265.5**, against a viewport centre of 1265.5. The values block, the dial, the founder
quotation, the faculty field and the beam's type all sit on that same axis.

### Reduced motion

`prefers-reduced-motion: reduce` renders the page **complete and static** at every size: the
island attaches nothing, observes nothing and returns, `.is-live` is never added, and every
one of the four scroll-linked properties keeps the finished default the stylesheet gives it.
Nothing on the page is reachable only through motion — the four door names, the four door
sentences and the four links are all in the static HTML, and so is every word of the client's
copy.

### Toolchain

`npx tsc --noEmit`, `npx eslint .`, `npx next build` and `npm run check:copy` (138 client
sentences, verbatim) all pass. `npm run check:copy` must be run from a shell that has `unzip`
on the path — it shells out to it to read the `.docx` sources, and PowerShell does not.

---

## Left for whoever picks this up

1. **The hero still wants a wide, high-resolution frame.** Neither library has one better
   than `ss-dsc07127` at 1920. If a 2560-wide landscape of a Praṇava room is ever encoded,
   the hero band can grow past 44svh and the 1.32× upscale at 2531 goes away. It is one line
   in `frames.ts`.
2. **No photograph on this page is identified as any person**, and none may be until the
   archive records who is in a frame. Every alt text and the one visible caption say what is
   happening, not who.
3. **`about.founder.action` is unrendered** and stays in the content file for whoever builds
   the founder page.
4. **Faculty is ready for real people.** The field is the honest state of *no roster*; the
   cards the Blueprint asks for become a fifth element in that section, under the same lead.
