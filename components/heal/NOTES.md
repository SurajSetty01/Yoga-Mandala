# Praṇava — Heal

`/heal/`. Three sections, no photographs, no JavaScript, and the page never goes dark.

The brief is explicit about what this page is. `Context/new/Pranava Website.docx` §7:

> These two items should appear in the main navigation now, but we do not need to build them
> fully. **Heal: create a simple page saying this area is being developed. It will eventually
> connect with Pranava Svasthya and related work.**

Simple means not pretending to content that does not exist. It does not mean generic, and it
does not mean a centred paragraph on an empty page. A placeholder that is beautifully made is
a promise kept; one that looks unfinished damages the institution the rest of the site is
trying to establish.

---

## The three, each as the thing that happens

| # | section | the mechanic, as an event | ground |
|---|---------|---------------------------|--------|
| — | Standing notice | **The client's own line for this area, set at the size of the page.** The largest type is "An evolving area exploring Yoga and allied approaches to health and wellbeing", and the word the whole page turns on is *evolving* | paper |
| 01 | What this area will hold | **Four names reaching for a name they have not joined yet.** A stem drops from each of the four area names and runs toward one point; all four stop short of it, and the point is an open ring — a joint that has not been made | warm |
| 02 | Asking about it | **The caveat, and then the link.** What the page cannot do is set at reading size *before* the route, because a caveat printed under a button is a caveat nobody reads | paper |

Grounds run **paper · warm · paper**, and the footer's dark is the page's ending.

---

## The empty state, and how it is handled

### What actually exists

The entire supply, checked against all three client documents:

```
heal.areas      Yoga Therapy · Ayurveda · Nutrition · Women's Wellness
heal.svasthya   "Pranava Svasthya"
heal.note       "It will eventually connect with Pranava Svasthya and related work."
about.journey[2].body
                "An evolving area exploring Yoga and allied approaches to health and wellbeing."
journeys.heal.intent
                "I want health-oriented guidance."          (Blueprint §3)
```

Five strings. **There is no description of Yoga Therapy, Ayurveda, Nutrition or Women's
Wellness anywhere in the Blueprint, the About document or the Website brief** —
`design/PRANAVA-BUILD.md`'s own table records "Praṇava Svasthya service descriptions: **no**
— only the four area names". Blueprint §6's eventual shape for this page (Praṇava Svasthya →
Yoga Therapy → Ayurveda → Nutrition → Women's Wellness → responsible consultation CTA) is
therefore a structure with nothing to put in it.

### What the page does about it

**It states the absence as a fact about the material, in one sentence, at reading size:**
"Four areas are named. Nothing beyond the names has been written yet, so nothing beyond the
names is shown here." That is the only editorial sentence on the page that is about the
page's own condition, and it is placed where a section introduction goes rather than as a
banner or a badge.

**It draws the absence rather than describing it twice.** The client's sentence is a future
tense — *will eventually connect* — so the section is that sentence as a drawing: four stems,
one point, and a measured gap between them. Nothing in the drawing says "coming soon"; the
gap says it.

**The four names are plain type.** Not cards, not tiles, not links, not accordions. An area
with no description is not a thing you can click into, and putting a box round a name is the
commonest way of implying it has contents. There is no hover state and no affordance on them
at all.

**The client's sentence sits above the drawing, not under the name.** Printed under
"Praṇava Svasthya" it merely repeats the words directly above it; printed above, it is the
promise the drawing then shows unkept.

### The health-claim rule, which is stricter here than anywhere else on the site

This is the one page where inventing content could actually harm someone, so:

- **No service is described.** Not one sentence on the page says what Yoga Therapy, Ayurveda,
  Nutrition or Women's Wellness would consist of, who would deliver it, or what it would be
  for.
- **No benefit is claimed.** The words "heal", "treat", "relieve", "improve", "manage" and
  "support" do not appear as claims anywhere. The page's `<h1>` is the navigation's own label
  and carries no verb.
- **No clinical capability is implied.** No qualification, registration, protocol or
  condition is named.
- **The page says what it is not**, in its own voice, at reading size and before the route:
  *"Nothing on this page is medical advice, and no assessment, treatment or consultation is
  being offered through it."*
- **No consultation is offered.** Blueprint §6 asks for a "responsible consultation CTA"; a
  button reading "Book a consultation" would be the page inventing a service that has no
  description, no named practitioner and no stated scope. The action is "Open an enquiry".
- **The mechanism is stated.** There is no form handler, no backend and no mailbox —
  `links.emailGeneral`, `links.emailProgrammes` and `links.emailCollaborations` are all
  `null`. The link opens WhatsApp with the subject already typed and the page says so:
  *"You read it, change it and send it yourself — the site submits nothing on your behalf."*
  The message itself is printed on the page under "It opens with", so nobody presses a button
  without knowing what it will say.
- **The route's label is the Blueprint's own visitor intent**, verbatim: "I want
  health-oriented guidance". The message it opens is word for word the one behind the Contact
  page's fourth doorway, so a reader arriving by either route sends Praṇava the same sentence.

---

## The page with no picture

**The media archive has nothing for Heal, and that is a finding rather than a gap to paper
over.** `Context/new/_audit/` covers 1,211 frames and 256 clips. There is no photograph of
therapy, consultation, assessment, a clinical setting or a practitioner working with an
individual on a health problem. The nearest things in the archive are supported and
restorative practice — bolsters, chairs, wall ropes — and those are *asana with props*, not
therapy.

Borrowing one of those frames for this page would be a health claim made in pictures. It is
the same error as making one in words, and harder to notice, because a photograph is never
audited the way a sentence is. The About page reached the same conclusion from the other
direction and recorded it: `pr-pbh-img_5405` was rejected for its Heal door because "a white
coat in the frame reads as clinical practice".

So this page carries **no photograph at all**, and it is the only page on the site that does.
That is also what makes it unmistakable beside its two neighbours — see the table at the
bottom of this file.

Two consequences follow, and both are checked:

- `main` contains **0 `<img>` elements**, so "alt on every image" is satisfied vacuously and
  no `poster` attribute exists to be fetched. The page's only network requests are the
  document, the stylesheet and the two font files the whole site shares.
- The only drawn object is an inline SVG of four lines and one ellipse, `aria-hidden`, whose
  entire content is said in the text around it.

---

## The drawing, measured

`viewBox="0 0 1200 200"`, `preserveAspectRatio="none"`, every stroke
`vector-effect="non-scaling-stroke"`.

Stems begin at x = 150 / 450 / 750 / 1050 — the centres of the four equal grid columns the
names sit in, so each stem leaves from under the middle of its own name at every width. All
four aim at **J = (600, 186)** and each stops **48 user units short of J along its own line**,
so the four ends lie on one circle about the joint and the gap is equal for all four rather
than merely looking it:

```
from x=150    ends (555.6, 167.7)     line length 486.9
from x=450    ends (569.9, 148.6)     line length 238.9
from x=750    ends (630.1, 148.6)     line length 238.9
from x=1050   ends (644.4, 167.7)     line length 486.9
joint         ellipse cx 600 cy 186 rx 9.4 ry 10   (open, 1px stroke)
```

48 against a joint of radius 10 leaves 38 units of nothing between the line ends and the ring.

**The viewBox is 6:1 because the box it renders into is.** The rail's content width caps at
76rem = 1216px and the drawing's height is `clamp(110px, 13vw, 200px)`, which gives a rendered
aspect of:

```
 760   696 / 110  =  6.33 : 1
 900   824 / 117  =  7.04 : 1
1024   938 / 133  =  7.05 : 1
1440  1216 / 187  =  6.50 : 1
2531  1216 / 200  =  6.08 : 1
```

So the anisotropy the stems actually suffer is between 1.01 and 1.17, not the 2× a mismatched
viewBox would impose. The joint is an **ellipse** for the same reason — a true circle renders
as an upright oval under a non-uniform scale. A circle needs `rx/ry = 6H/W`, which across that
band is 0.85 – 0.99; `rx 9.4 / ry 10` = 0.94 is the middle of it, and the ring reads as round
at every width that was looked at.

**Below 760px the SVG is not used at all.** The four names stack, the list's own `border-left`
becomes the spine, each `li::before` is a 1.05rem feeder into it, and a 2.2rem stub of spine
runs on past the last name and stops. The joint is drawn as `.hl-svasthya::before` — an 11px
open circle on the spine's axis, level with the name's cap line, **with no feeder**, where all
four areas above it have one. The absence is the drawing: four things are connected to the
spine and this one is not. Borders and a border-radius cannot distort, so the narrow variant
has no aspect-ratio problem at all.

The four names at every width (measured on the render, one line each, no overflow):

```
 760  17px  column 174px      1024  21px  column 235px
 768  17px  column 176px      1440  27px  column 304px
 800  18px  column 183px      2531  32px  column 304px
 900  19px  column 206px
```

760 is the hard case and it is the breakpoint: a column is 174px and the widest of the four,
"Women's Wellness", sets to 130px at 17px.

---

## Measurements

### Contrast — glyph-accurate, on rendered pixels, against the production build

Measured against the static `out/` build served over HTTP, not against `next dev`: the Next
dev-tools badge is a `nextjs-portal` custom element whose own box is not `position: fixed`, so
the probe's overlay filter never sees it and it produces phantom failures. It does not exist
in the production build.

`node tools/contrast-probe.mjs <url> --width W --height H --scroll-to <section>` for all three
sections at nine viewports — **27 runs, 303 sampled text runs, 0 FAIL** — plus five runs with
no `--scroll-to` (which samples the fold) at 320×568, 390×844, 1024×768, 1440×900 and
2531×1140, also 0 FAIL.

```
320x568   390x844   768x1024   900x800   1024x768
1280x720  1440x900  2531x1140  2560x1440
```

The tightest pair on the page is the register mark's Fraunces numeral, 13px `--clay-deep` on
`--ground-warm`: **5.31:1**, against the 4.5 it needs. It is set at **weight 600, not 400**,
which is not a style choice — the About page measured the identical colour pair at 4.57:1 at
400 and 4.69–5.6 at 600, because at 13px a 400-weight Fraunces numeral loses enough of its
stroke to antialiasing that the 5th-percentile sample drops half a point.

`--clay` (#C1613C) appears on this page **only** as the stems, the ring and the hairlines. It
is 3.90:1 with cream and 3.99:1 with ink and may never carry text; the enquiry plate stands on
`--clay-deep` (5.98:1 with cream) and darkens to `--clay-press` (8.5:1) on press.

**No image-filled type**, so `tools/check-image-text.mjs` has nothing to measure here.

### Structure

At 320, 360, 390, 519, 520, 640, 759, 760, 768, 899, 900, 1024, 1280, 1440, 1920, 2531 and
2560 — both sides of each breakpoint — walking the whole document in 600px steps at each:

- `scrollWidth === clientWidth`. **Maximum horizontal overflow 0px at all 17 widths.**
- Exactly **one `<h1>`** ("Heal") and **two `<h2>`** — the two register marks, so the outline
  is Heal → 01 What this area will hold → 02 Asking about it.
- **0 images**, so `noAltAttr = 0` by construction.
- **Two focusable elements in `<main>`** — the enquiry and the Contact link. Both were focused
  in turn and the computed outline read back: `2px solid rgb(36, 29, 24)` in a
  `rgba(251,247,242,0.95)` halo, which is the inverted ring paper needs. No `outline: none`
  anywhere.
- **0 console errors, 0 failed requests.**

### Centring at 2531

The trap `design/SECTION-MECHANICS.md` §8 records: a capped container with no
`margin-inline: auto` looks right at 1440 and is hundreds of px wrong on a wide monitor.

Every capped block on this page goes through `.hl-rail`
(`max-width: calc(76rem + 2 * var(--rail)); margin-inline: auto`). Measured on the render at
**2531×1140**: all three rails span x = 590 → 1942, centre **1266**, against a viewport centre
of **1266**. The masthead, the drawing and the enquiry are on one axis.

### Reduced motion, and JavaScript disabled

**This page runs no JavaScript.** There is no client island, no scroll listener, no
IntersectionObserver and no reveal. Nothing on it is painted, positioned or revealed by
script.

Rendered side by side at 1440×900 with `prefers-reduced-motion: reduce` and without it:
document height identical, `main.innerText` identical, **0 elements carrying a transform** and
**0 elements with text at `opacity: 0` or `visibility: hidden`** in either. The only
`transition` declared in `styles/heal.css` is the 4px nudge on the enquiry arrow, and it is
switched off under `prefers-reduced-motion: reduce`.

With scripting off the static HTML holds all 918 characters of the page's text, both links and
the whole drawing.

---

## Rejected

- **Any photograph.** See "The page with no picture". The archive has nothing for this page
  and an unrelated asana frame standing in for therapy is a health claim in pictures.
- **A "Book a consultation" button.** Praṇava Svasthya has no published description, no named
  practitioner and no stated scope. The button would be the page inventing the service.
- **Four cards, tiles or accordions for the four areas.** Every one of them implies contents.
  The rule on this project is that `null` renders as nothing, and four empty disclosures are
  `null` wearing a box.
- **A "coming soon" badge, a progress bar, or a date.** No date has been supplied, and a badge
  is decoration applied to an absence.
- **Writing one-line descriptions of the four areas "just to have something".** This is the
  page where that could hurt somebody.
- **Devanagari for Svasthya.** The client wrote the name in transliteration. Script the client
  did not write is an invention, and the About page recorded the same decision for the four
  value words.
- **Setting the four names in Fraunces at a size where the diacritic mattered.** Not an issue
  here — none of the four carries one — but "Women's Wellness" uses the client's own
  apostrophe form (U+2019) as it appears in `content/pranava.ts`.
- **A dark section anywhere on the page.** Every other Praṇava page alternates paper and the
  reversed ground. This one stays on paper end to end because the page's argument is that it
  is quiet, not that it is impressive — and because it is the cleanest way to make it
  unmistakable beside Insights, which opens dark.
- **`heal.note` printed under the Svasthya name.** It repeats the two words immediately above
  it. It is the section's second sentence instead.

---

## How the three held-back pages differ from one another

Built together, on purpose: three agents each arriving separately at "a page that says content
is coming" would have given the site three near-identical pages. They are separated along four
axes, and the separation follows from what each page actually has rather than from decoration.

```
            media        the mechanic                ground arc            the reader's move
Heal        none         a drawing that stops        paper throughout      none; it is still
Insights    one frame    type at two sizes at once   deep → paper → warm   reading
Events      six frames   a strip with a blank end    paper → deep → warm   leafing sideways
```

The media gradient is the archive's, not a preference: there is nothing in 1,211 frames for
Heal, almost nothing for Insights (no book and no written text appears anywhere in the
archive), and a great deal for Events. Their three closing routes are three different objects
for the same reason — a filled clay plate here, a quiet underlined line on Insights, a ruled
ledger row on Events — because three near-empty pages that all end on the same button are
three versions of one page.
