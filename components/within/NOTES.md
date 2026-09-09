# Page 2 — What Happens Within Yoga Mandala

**The idea in one line:** the four ideas are a dark ledger — the lists set as a ruled register
in the display face, each chapter's number and name held beside its list by `position: sticky`
— and the initiatives come back onto paper as panels with their lists set as phrases in a
field, so two content types get two instruments rather than one template twice.

## Tried and rejected

- **Horizontally-tracked scroll through the four pillars.** The most distinctive option and
  the first one considered. Rejected on cost, not taste: it needs a second complete layout for
  `prefers-reduced-motion`, it puts text off-screen where the contrast probe cannot see it, and
  a 320px panel holding seven items is a worse read than a column. The budget it would have
  eaten was spent on the register instead, which is what the page actually needed.
- **Numbered chapters that take the viewport in turn** (sticky panels, media swapping behind).
  That is the hero's grammar — sticky stage, type over picture — and the brief was explicit
  that this page must not look like it.
- **A photograph per chapter, four small frames in the rail.** Two problems: four narrow
  stills in a row is exactly the About page's section 02, and the four candidate frames have
  three different aspect ratios, so a common crop wasted every one of them. Two photographs
  that each do a job beat five that decorate.
- **A global sticky index of the four names beside the chapters.** It duplicated the chapter
  headings on screen and needed JS to say anything the headings did not already say. The
  per-chapter sticky rail does the same work with no script.
- **Video.** Eleven of twenty-one clips are portrait, the three good landscape loops are the
  hero's, and the one clip that fits the content (`p27-img_0889`, teachers adjusting) is
  2.6 MB for a decorative loop on a page of lists. Its poster is used as a still instead: 64 KB.
- **Bullets, chips or a plain two-column list for the pillar items.** The phrases are one to
  four words; at 1.05–1.38rem in Fraunces with a hairline above each row they stop being admin.
  Chips were kept — but for the initiatives, so the two list types do not read alike.

## Measured

Colour, computed against the real ground and then confirmed with `tools/contrast-probe.mjs`:

| on `--ground-deep` | ratio | | on `--ground-warm` | ratio |
|---|---|---|---|---|
| `--ink-onPic` cream | 16.6:1 | | `--ink` | 13.8:1 |
| `rgba(cream,0.72)` (`--ink-onDark-soft`) | 9.0:1 | | `--ink-soft` | 6.5:1 |
| `rgba(cream,0.62)` (`--wi-dim`) | **7.0:1** | | `--teal-deep` | 6.2:1 |
| `rgba(cream,0.38)` | **3.4:1 — fails** | | `--clay-deep` | 5.3:1 |
| `--clay` | 4.3:1 (rules only) | | `--clay` | rules only |

`rgba(cream,0.62)` is the floor for a label on the ledger; 0.38 was tried for the "/ 04" half
of the chapter number and fails at 11.5px, so both halves are one colour. Note that the probe
reads `getComputedStyle().color` and ignores its alpha, so it scores every one of these as
16.66:1 — the alpha ratios above were computed by hand, not taken from its output.

**Contrast probe — 0 FAIL at every required width**: 320×568 (10 runs), 390×844 (13),
768×1024 (13), 1024×768 (17), 1280×720 (17), 1440×900 (17), 2560×1440 (23). The probe only
samples the first viewport, so it was also run against `#idea-01` (23), `#idea-03` (24) and
`#wi-init-h` (29) at 1440×900 — the ledger and the panels — all 0 FAIL.

**Other checks**: no horizontal overflow at 320 or 2560 (`scrollWidth === clientWidth`, and no
element's right edge past the viewport); exactly one `<h1>`, five `<h2>`; `alt` on all three
images; no console errors, no page errors, no failed requests; all eleven interactive elements
show a focus ring (ink-on-cream ring inside a cream halo on paper); `#idea-03` lands at y=99
with the pill's bottom at y=76. `prefers-reduced-motion: reduce` → `is-live` is never added, so
no element is transformed or below opacity 1, and the page is identical minus the arrival.
Static export contains every sentence and every list item: no content depends on JavaScript.

**Page weight**: three images. `p13-img_0516` (960/1920/2560 srcset, 50–226 KB) full-bleed,
`ss-ven0208-960` 72 KB on the register's own column, `p27-img_0889.avif` 64 KB in the first
panel — the AVIF is confirmed to be the one the browser picks.

## Two things worth knowing before editing this

1. `.wi-close` must not be `grid-column: 1 / -1`. The rail is still stuck to the top of the
   viewport when SHARE's closing line arrives, and a full-width line scrolls straight through
   the pinned word. It shipped that way for one screenshot and read as a rendering fault.
2. The reveal is opt-in through `.wi.is-live`, added by the island only after the elements
   already on screen have been marked `.in`. Nothing the browser has painted is ever hidden,
   and with no JS — or with `reduce` — the CSS does nothing at all. Do not move the reveal
   onto the shared `[data-r]` attribute: its IntersectionObserver lives inside the hero
   choreography, which does not run on this route, so `.js [data-r] { opacity: 0 }` would make
   this page invisible the moment anything adds `js` to `<html>`.
