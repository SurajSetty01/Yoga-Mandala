# Concept A — FOUR ROOMS

`/preview/within-a/` · `components/preview/within-a/**` · `styles/preview-within-a.css`
Every selector is namespaced under `.within-a`. Nothing else in the repo is touched.

---

## The premise

**The reader goes somewhere, four times.**

Connect, Learn, Collaborate and Share are not four headings — they are four different
activities that happen in four different places in this archive. So each is built as a
full-viewport **room** with its own ground, its own light and its own spatial logic, and each
one **rises over the last** while that one is held perfectly still. Leaving a room is a move,
not a section break. Then the page comes *out* of the rooms: Community Initiatives is one
flat, open, brightly lit plane where all four initiatives are visible at once.

The sentence the brief asks for: *this section works like four rooms you walk through,
because the content is four activities that happen in four different physical settings.*

### The cover, in geometry

Each room is a sticky `100svh` stage inside a `--track: 260svh` block, and every room but the
last carries `margin-bottom: -100svh`:

```
stage N is stuck over          scroll ∈ [Tn , Tn + track − 100svh]
stage N+1 starts to show at    scroll  =  Tn + track − 200svh
stage N+1 fully covers at      scroll  =  Tn + track − 100svh
```

The last two are the same instant, which is why room N never twitches under the incoming room
and lets go on the exact frame it disappears. `--pull` is **not** a free parameter: anything
shallower than `-100svh` makes the covered room jump upward; anything deeper leaves a dead
band. Per room that is 60svh alone and 100svh of cover = 160svh. Later tracks paint above
earlier ones by DOM order; the explicit z-indexes just make the intent readable.

Anchor jumps land exactly: room N's track begins at the scroll position where room N finishes
covering, so `#within-a-learn` needs no `scroll-margin` fudge.

---

## The rooms, and what each does with its 5–7 items

**The approach** — a plan of the building. Four tall narrow openings, each a crop of the room
it leads to, at four different heights so the row reads as an elevation rather than four
cards. The title carries the paper with it and passes **in front of** the openings: type
occluding photograph. The openings are the page's only links and its four focus stops.

**01 CONNECT · the hall** — ground `--ground-deep` under a full-bleed photograph of a class
standing apart, each on their own mat, with a directional scrim pooled where the type sits.
The five items arrive **scattered across the hall** and pack into **one block, shoulder to
shoulder**, three pixels apart, with a ragged edge. "The Yoga teaching profession can
sometimes feel isolated" is the start state; the community is the end state — the mechanic is
the client's sentence. Reduced motion ships the end state, which is a *shape*, not a list.
Each plate carries the navigation pill's own material, so its ratio is a constant (17:1
measured) over any part of any frame.

**02 LEARN · the board** — the bright room. Warm plaster, a full-bleed band of a study circle
along the floor, and the seven items set at display scale on a **paper board standing in front
of the class**, overlapping it. The type *is* the graphic; the photograph is what the board is
standing in front of. Seven lines write in one after another as you descend, because
"continue studying beyond their initial teacher training" is accumulation. Longest list, so
it gets the room where the list is the architecture.

**03 COLLABORATE · the hang** — dark again. Three bands: a ceiling the wires come out of, the
panel on its stage in the middle of the room, the floor you are standing on. The seven items
hang on seven wires of seven lengths, generally lengthening toward the stage, and the deepest
placards hang **in front of** the photograph. Collaboration is the things people make
together, hung on the wall behind the people who made them. `--dropUnit` is the whole idea: a
short hang is a row of chips with ticks over them.

**04 SHARE · the stair** — the brightest room, paper, and the way out. Six steps walk across
the floor toward a doorway (the archive's warmest frame — a teacher's hand held just above a
student's back — masked to an arch and bled off the bottom), each reaching a little further
than the last. Sharing is a hand-off; reading down the list moves you across the room and out
of it. The doorway owns a reserved column so a long item can never collide with it.

**The board** — see the verdict below.

### What the four rooms share (continuity, not novelty)

The tokens, the type scale, one head grammar (numeral + name + a rule that spans the room),
one caption system, and one rule for the client's words: **the pillar's opening sentence is
the room's statement, set as display type; the sentence after it is body.** Both are the
client's. Nothing is paraphrased, nothing is added, `listLead: null` renders as nothing.

---

## Verdict on the existing Community Initiatives section

The client said it "might be good". Judged on the rendered page, **one idea in it is good and
the container around that idea is not.**

**Keep — the item lists as a field of phrases.** It is the only device on the existing
`/within/` page that stops a list reading as a list, and it absorbs the twelve-word item
"Other relevant opportunities for Yoga teachers and serious practitioners" without breaking
its own rhythm. Kept here, retuned, on paper rather than beige.

**Reject — the container.** The Learning Initiative entry is a beige card with a small
rectangular photograph on the left and a heading and a paragraph on the right. That is
literally the shape the client named: *"I don't want just boxy fucking images."*

**Reject — the Sangha / Pranava Vaakya pair.** Two equal columns of body copy, the same width,
the same size, indistinguishable from each other, and the one fact that must land — that
Pranava Vaakya is a **Praṇava** offering surfaced within Yoga Mandala, not Yoga Mandala's own —
reduced to an 11px teal eyebrow that reads as a photo caption.

**Reject — the uniform panel.** Every entry on the same beige with the same hairlines, so the
section reads as a continuation of the ledger above it rather than a different kind of space.

**What replaced it.** Four notices of four different sizes hung at four different heights on
one wall — a photograph dissolved into the warm ground at 13%, so the media is a *surface*
rather than a rectangle beside text. The two list-bearing entries keep the phrase field. The
two prose-only entries have no list to carry them, so **the prose is the graphic**: set in
Fraunces at 1.3–1.5rem. And Praṇava Vaakya is on a **different material entirely** — reversed
out on the deep ground, teal-ruled, its attribution set at the same size as its own body copy
and above the name. Different origin, different paper. That is the labelling, not a footnote.
`Praṇava` is set in Inter, never Fraunces (DESIGN-SYSTEM §1: Fraunces has no precomposed
ṇ/ā/ī and drops the marks).

It is deliberately **not** a fifth room. Four enclosed places, each covering the last, is a
strong mechanic exactly four times; run it eight times and it is a template, which is what got
the last two builds rejected.

---

## Rejected along the way

- **A ring / mandala for Share.** Six things around a centre was the obvious move for the
  word *Mandala*. The About page's `Purpose` section is already exactly that, and its own
  notes say so. Repeating it would weaken both. Replaced by the stair.
- **A ruled two-column register on dark** for Learn — that is precisely what the existing
  `/within/` page does with the same seven items, and it is the direct precedent for the
  rejection. Replaced by display-scale type on a board.
- **A contained horizontal scroller** for Collaborate. Sideways movement would have been a
  genuinely different spatial logic, but it hides content behind a gesture and reads as a
  widget. The hang gives the same "you move differently in here" without hiding anything.
- **Photo-left / text-right** for the panel room (first render). Replaced by the three-band
  ceiling/stage/floor with placards occluding the picture.
- **Rotated notices** on the board. Skeuomorphic, and it degrades type rendering. The varying
  sizes and heights do the work.
- **A custom cursor.** Never in scope; the brief is right that it draws attention to itself.
- **`ss-ven0092`** — the archive's best "spread-out group in a hall" frame, and the first
  choice for Connect. `stills.json` claims widths `[960, 1920, 2560]` but only the 960px
  derivative exists (the source is 1280×720). Unusable as a full-bleed ground above 1440.
  Swapped for `p13-img_0516`, which is a room of individuals each on their own mat and has a
  real 2560 derivative. **The `widths` field in `stills.json` is aspirational for every
  1280×720 `ss-ven*` source — check the filesystem, not the metadata.**
- **The dance frames.** Not used anywhere. This page never establishes festival context.

## Bugs found and fixed (the ones worth remembering)

- **An item whose start state translates it out of the viewport can never intersect.** Room
  01's plates begin up to `30vw / 28svh` from where they belong; observed individually, two of
  the client's five items never revealed and simply did not exist on the page. The fix is to
  observe the **container**, which never moves, and light its children together
  (`[data-wa-group]`). Same class of bug as clipping an observed element to zero.
- **`align-self: end` plus a negative bottom margin does not "overlap" — it overflows.** The
  Learn board hung 45px below its own stage and `overflow: hidden` ate three of the seven
  items. Replaced by `padding-bottom: calc(var(--band) − var(--lap))`, which is deterministic
  at every viewport.
- **A 1px rule centred in a flex row lands on a fractional device pixel** and composites as
  two half-strength greys: half of room 04's reaches rendered clay and half rendered putty.
  2px fixed it.
- **A percentage height inside an auto-sized grid row does not resolve** — on mobile the
  approach's name tags detached from the pictures they label.
- **`hyphens: auto` in a 112px column** broke the client's words in half ("gather-ings").

---

## Measurements

| Check | Result |
|---|---|
| `tools/contrast-probe.mjs` at 320×568, 390×844, 768×1024, 1024×768, 1280×720, 1440×900, 2560×1440 | **0 FAIL** at all seven |
| Room-scoped glyph probe (all six regions × all seven viewports, each parked where it is read) | **0 FAIL**, 42 measurements |
| Content fit: worst overflow of any text element beyond its own stage, all five stages × seven viewports | **0px** |
| Horizontal overflow 320 → 2560 | none |
| Console errors | none |
| `npx tsc --noEmit` · `npx next build` · `npm run check:copy` | pass · pass · pass (73 sentences verbatim) |
| Images / real `alt` | 9 / 9 |
| `<h1>` | 1 |
| Focus stops | 4 doorway links, ink ring in a cream halo on paper (measured visible) |
| Page height | 9,413px @1440×900 · 9,378px @390×844 · 14,514px @2560×1440 · 5,188px @320×568 |

**Worst measured ratios** (room-scoped, p5): plates on the hall photograph **17.4:1**; the
provenance caption on its pill-material plate over the study-circle band **12.9:1**; cream on
the deep ground **12.7:1**; ink on the paper board **14:1**. Nothing on this page sits on an
unprotected photograph — type is on a flat ground, on paper, or on the pill's own measured
material, whose ratio is a constant rather than a property of the frame beneath it.

### Reduced motion

`prefers-reduced-motion: reduce` installs neither the observer nor the scroll listener. The
cover is dropped, the tracks go to `height: auto`, the stages become `position: relative;
min-height: 100svh`, and the page is four rooms one after another — complete, static, every
word present, 6,274px at 1440×900. The same flattening applies at `max-height: 600px`, because
a stage that clips its own list is worse than no mechanic at all.

### One thing to know when re-running the probe

`tools/contrast-probe.mjs` makes *every* matching element transparent in one pass. On this
page two sticky stages can share screen coordinates during a cover, so if you load the page at
a fragment (`/preview/within-a/#within-a-connect`) the probe attributes the covering room's
glyph pixels to the covered room's bounding box and reports phantom failures for text no
reader can see. The plain-URL runs required by the brief are clean at all seven viewports, and
the room-scoped probe above — which makes one room's text transparent at a time — is clean for
every room at every viewport.
