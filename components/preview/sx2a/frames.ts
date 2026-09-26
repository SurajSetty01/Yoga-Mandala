/**
 * §01's ONE photograph, and the four windows cut over it.
 *
 * ── ROUND 2: THE FRAME CHANGED, THE GEOMETRY DID NOT ──────────────────────────────────
 *
 * Both critics landed on the same defect and it was the same one: the ladder was engineered
 * to unveil a blank wall. Measured on the old plate (pr-ttc-dsc_0274), 16px tiles, sd < 7
 * counted flat: the whole frame was 60.2% flat at detail 12.2, and the band window 4 ADDED —
 * the payoff, the top 28% nobody had seen — was 76.6% flat at detail 10.2. The mechanic's
 * reward was an empty upper wall. A ladder that opens onto less than it opened on is a
 * ladder pointed the wrong way.
 *
 * The plate is now pr-ttc-dsc_0392, and the same probe over the same bands reads:
 *
 *                      whole frame        the band the payoff adds (top 28%)
 *   pr-ttc-dsc_0274    60.2% flat, det 12.2, sat 21.6    76.6% flat, det 10.2, sat 10.3
 *   pr-ttc-dsc_0392     3.2% flat, det 30.1, sat 36.3     1.8% flat, det 37.8, sat 28.6
 *
 * And the ladder now gets denser at every rung, which is the thing the mechanic was always
 * claiming: the NEW band each window adds measures detail 18.8 → 30.5 → 32.7 → 37.8, and
 * flat tiles 6.3% → 5.0% → 0.8% → 1.8%. The last 28% of the photograph is its richest 28%.
 * For reference the home page's own hero — the site's quality benchmark — measures 41% flat
 * at chroma 27.2; this plate is 12.8× less flat and more saturated than the page's own hero.
 *
 * Critic 1 named two acceptable targets, "b's dsc_0396 (13% flat) or c's dsc_0302_1 (4%)".
 * Neither is used. pr-ttc-dsc_0392 measures 3.2% flat at detail 30.1 and saturation 36.3
 * against dsc_0396's 11.5 / 20.2 / 38.0 and dsc_0302_1's 4.2 / 26.3 / 20.6 — it is denser
 * than both, more saturated than dsc_0302_1 by 1.8×, and it is the only one of the three
 * that carries no borrowed weight: dsc_0302_1 is concept C's plate I and concept B's and D's
 * as well, and taking it would have handed the combiner one frame with three owners.
 *
 * It also settles the other half of the argument. Critic 1: "One chair-supported class on a
 * red oxide floor is not a picture of [a vast body of knowledge] … a mechanic that shows
 * that one room more and more fully argues the opposite of the sentence directly above it."
 * The room is gone. There is no hall, no red floor, no bolster, no block and no chair in
 * this section now. The photograph is five practitioners sitting still on a lawn under tall
 * trees — and the client's FIRST line is "Yoga is more than a practice on the mat", set over
 * a window in which there is no mat at all.
 *
 * WHY ONE PHOTOGRAPH, STILL. The client's last line is "not merely by collecting techniques,
 * but through a relationship between study, practice and experience." A section that answers
 * "vast" by dealing out five different frames is collecting techniques. This one refuses to,
 * and the refusal is visible in exactly one place: the sentence that IS a list — structured
 * learning, sustained practice, teacher education, continuing inquiry, community — is the
 * only sentence in the section with no photograph under it at all.
 *
 * WHY BOTTOM-ANCHORED. Every window ends on the same edge of the photograph — the near edge
 * of the grass — and opens UPWARD: 26%, 44%, 72%, all of it. The held edge is what makes the
 * mechanic legible without a diagram drawn beside it. The first build carried a 68×48px
 * outline-and-band thumbnail showing which slice you were being shown; both critics called it
 * a spec sheet narrating its own mechanism. It is gone. The geometry states itself: same
 * edge, more above it, every time. Both critics then measured the result — 26.0 / 44.0 /
 * 72.0 / 100.0% identical to three decimals at 390, 1024, 1440 AND 2531, horizontal coverage
 * 100.0% at all four, reduced-motion pixel diff 0.00–0.20% — and both named it this design's
 * best element. Not one number in it changes here. Only the file behind it does.
 *
 * THE CAPTIONS. Critic 2: "Jute mats on a red oxide floor, the edge of a bolster, a hand on
 * a wooden block" is the room-and-object inventory this project already rejected on C, and
 * "their raised legs cut off by the frame" narrates the crop — "name the practice, not the
 * furniture, and never the framing." Critic 1, separately: "The same photograph as the first
 * window, whole" performs the reader's recognition and so destroys the payoff it names.
 * Every caption below has been rewritten to the same rule: what is being DONE, at the scale
 * this window shows it. No object is catalogued. No caption mentions a frame, an edge, a
 * crop or another window. The convention's two words — Detail, Full frame — carry the
 * mechanism, because that is what a museum label does and it is the reader's own to notice.
 *
 * WHY THIS FRAME SURVIVED BEING LOOKED AT. Four frames have been rejected on this project
 * for having an air cooler, a speaker stand, a ceiling fan or a folding chair as their actual
 * subject, so this one was opened at 1100px and then at each of the four window heights
 * before it was kept. At 26%: five pairs of crossed legs and five hands resting open on the
 * knees, on grass. At 44%: all five, eyes closed, the tallest head exactly at the edge. At
 * 72%: the palm trunks, the hedge and the compound wall behind them. At 100%: the canopy.
 * The archive's own note on it — "the best balance of figures to setting in this run" — is
 * the reason it is the one that can carry an aperture. A hose crosses the grass behind the
 * group and a low building shows through the hedge; both are in the middle distance of a
 * garden and neither is ever the subject of a window. `minorsVisible` is false.
 * It is unused on the About page it belongs to; it appears once elsewhere on the site.
 *
 * The four forbidden ids (dsc_0209 / _0193 / _0215 / _0217) appear nowhere here.
 * NOBODY IS NAMED: the archive does not record who is in the frame and the client has
 * supplied no faculty names, so every description says what is happening.
 */

/** The file, and the widths that actually exist on disk — verified by listing the folder. */
export const PLATE = {
  id: 'pr-ttc-dsc_0392',
  widths: [480, 960, 1620],
  /** the whole frame, 1620 × 1080 */
  ratio: 1.5,
} as const;

/**
 * THE `sizes` STRING DESCRIBES THE BOX, NOT A WISH.
 *
 * The plate's CSS width is `min(100%, clamp(39rem, 38.5vw + 24.1rem, 85rem))`, so:
 *   ≤ 627px viewport  the plate is the viewport            → 100vw
 *   627 – 2531px      the slope runs                       → calc(38.5vw + 386px)
 *   ≥ 2531px          the 85rem ceiling binds              → 1360px
 * (the 39rem floor never wins above 627, where 100vw already takes over, so it
 * needs no clause of its own.)
 * Media queries rather than `min()`/`clamp()` inside `sizes`, which is honoured unevenly.
 *
 * Critic 2 measured the result and it is the reason to leave every character of it alone:
 * "resolves to 390 / 780 / 940 / 1360px and the rendered boxes measure 390 / 780 / 940 /
 * 1360px — four for four, max upscale anywhere 1.003." The ratio is unchanged (1.5) and the
 * width ladder is unchanged, so that contract holds exactly as measured on the new file.
 *
 * WHAT THE NEW PLATE COSTS, stated rather than hidden. Detail is bytes: a canopy does not
 * compress like a white wall. The same four <img> share one src, one srcSet and one sizes,
 * so the section is still ONE image request, but that request is 55 KB at 390 (was 20),
 * 218 KB at 1440 (was 66) and 583 KB at 2531 (was 167). At 1440 that is still 3.4× lighter
 * than the lightest of the other three concepts in this round (b 819 KB, c 745 KB, d 2851 KB)
 * and 13× lighter than d. Both critics asked for density over leanness in the same breath —
 * "45.9–53.6% coverage of one low-detail floor shot is thin in a way the coverage number
 * hides" — and this is what density costs. It is the trade, made deliberately and once.
 */
export const PLATE_SIZES =
  '(max-width: 627px) 100vw, (min-width: 2531px) 1360px, calc(38.5vw + 386px)';

export type Rung = {
  /** the share of the frame's HEIGHT this window shows, measured from the BOTTOM edge.
   *  `null` is the one sentence with no window — the list, and the section's only pause. */
  open: number | null;
  /** index into about.intro. The client's five lines, in the client's order. */
  line: number;
  /** which of the two registers the sentence is spoken in. `say` opens, `close` lands, and
   *  the three sentences between them are peers set identically. */
  voice: 'say' | 'peer' | 'close';
  /** the museum label's first line, the convention's own word */
  what?: 'Detail' | 'Full frame';
  /** what is being DONE, at the scale this window shows it. Never an object list, never a
   *  reference to the crop, the frame, an edge or another window. */
  of?: string;
  /** describes WHAT THE WINDOW SHOWS, not what the whole photograph contains */
  alt?: string;
};

export const RUNGS: readonly Rung[] = [
  /* 01 · THE SEAT. The bottom 26%: five pairs of crossed legs on grass, five hands resting
     open on the knees, bare feet. Measured 6.3% flat at detail 18.8. There is no mat in it,
     and the client's first line above it says Yoga is more than a practice on one. */
  {
    open: 0.26,
    line: 0,
    voice: 'say',
    what: 'Detail',
    of: 'Crossed legs on the grass, hands resting open on the knees.',
    alt: 'Five pairs of crossed legs on a lawn, each with a hand resting open on the knee.',
  },

  /* 02 · THE PRACTITIONERS. The bottom 44% — the same grass, and now all five of them, eyes
     closed, sitting still; the tallest head sits exactly on the top edge. The added band
     measures 5.0% flat at detail 30.5, against the old plate's 54.2% and 13.8. */
  {
    open: 0.44,
    line: 1,
    voice: 'peer',
    what: 'Detail',
    of: 'Five practitioners sitting still, eyes closed.',
    alt: 'Five practitioners sitting cross-legged in a line on a lawn with their eyes closed and their hands resting on their knees.',
  },

  /* 03 · THE PLACE. The bottom 72%: the grove they are sitting in — palm trunks, a hedge, a
     low building through it. The added band measures 0.8% flat at detail 32.7, the cleanest
     band in the photograph. The line above it is the one about holding two things at once. */
  {
    open: 0.72,
    line: 2,
    voice: 'peer',
    what: 'Detail',
    of: 'Practice held outdoors, in the garden it happens in.',
    alt: 'Five practitioners sitting on a lawn with palm trunks, a hedge and a low building in the garden behind them.',
  },

  /* 04 · THE PAUSE. The client's fourth line is the one that is a list — structured learning,
     sustained practice, teacher education, continuing inquiry and community. It is the
     section's only sentence with no photograph under it, and that is the argument: the
     sentence that enumerates is the sentence the section refuses to illustrate by collecting.
     Both critics measured the pause it makes — 309px against 188 and 166, a 1.85× breath
     before the payoff — and it is kept to the pixel. */
  { open: null, line: 3, voice: 'peer' },

  /* 05 · ALL OF IT. 100%, and the reward lands on the client's thesis — "not merely by
     collecting techniques, but through a relationship between study, practice and
     experience." The band this window adds, the top 28% no earlier window contained, is the
     canopy: 1.8% flat at detail 37.8, the densest 28% of the photograph. Nothing has been
     enlarged — this is laid in at the SAME rendered width as the 26% window, so the grass at
     its foot is the same grass at the same size on the screen. What changed is how much of
     it the page is willing to show. */
  {
    open: 1,
    line: 4,
    voice: 'close',
    what: 'Full frame',
    of: 'Five practitioners on a lawn, beneath trees at their full height.',
    alt: 'Five practitioners sitting cross-legged on a lawn beneath tall trees, with a hedge and a low building in the garden behind them.',
  },
] as const;

export const srcOf = () => `/media/stills/${PLATE.id}-${PLATE.widths[PLATE.widths.length - 1]}.webp`;
export const srcSetOf = () => PLATE.widths.map((w) => `/media/stills/${PLATE.id}-${w}.webp ${w}w`).join(', ');
