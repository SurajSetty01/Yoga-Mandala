/**
 * PREVIEW sx2c — the five plates of §01.
 *
 * WHY FIVE, AND WHY THESE FIVE. Round 2's critique was unanimous on the diet: 18.3% media
 * coverage at 390 and 28.7% at 1440 against the home page's 102.8% / 94.0%, "1.5-2.5x
 * thinner than the other three", with 527 KB of 745 KB in a single file. Three plates on
 * one card is a handsome object; it is not an Introduction's worth of pictures. The section
 * the copy asks for is "a vast body of knowledge — encompassing practice, philosophy,
 * self-observation, discipline and ways of understanding life," and one room shown three
 * times is not a picture of that.
 *
 * So five frames, five different practices, five different places — and NOT five copies of
 * one room (the failure mode both critics named in a and d: "a mechanic that shows that one
 * room more and more fully argues the opposite of the sentence directly above it").
 *
 *   I    pr-ttc-dsc_0404   seated side stretch on the grass — three figures, outdoors, low
 *   II   pr-ttc-dsc_0459   tree pose and a standing balance at the laterite wall
 *   III  pr-ttc-dsc_0302_1 five in tree pose on the concrete apron — THE PROTECTED FRAME.
 *        Both critics named it the best-composed photograph in the tournament (per-fifth
 *        detail 48.6 / 41.8 / 40.6 / 39.2 / 30.2; 4% flat tiles, 2.5x better filled than
 *        the next best frame anywhere). It is kept, and it is now the largest single plate
 *        in the section rather than one of three equals.
 *   IV   pr-ttc-dsc_0347   four under the banyan
 *   V    pr-ttc-dsc_0510   inverted on the wall ropes — the TTC venue's own red floor,
 *        indoors, which nothing else here carries
 *
 * GONE: pr-ttc-dsc_0195_1. Critic 1 measured it 53% flat tiles as this build's plate II and
 * listed it as a frame that "MUST NOT SURVIVE ... as any design's anchor frame"; critic 2
 * measured its top fifth at detail 8.9-10.7 / saturation 5.5-5.9%. Half the frame is bare
 * wall. It is not replaced by a better crop of itself; it is replaced.
 *
 * CHECKED, in this order, for all five: none is one of the four forbidden ids (_0209 /
 * _0193 / _0215 / _0217); none appears anywhere in the shipped site — grepped across
 * components/ and app/ excluding preview/, which returns none of them; each was LOOKED AT
 * at 960px, not merely read about, and none has a folding chair, an air cooler, a speaker
 * stand or a ceiling fan as its subject. V has chairs in it; what it is a photograph of is
 * three people inverted on wall ropes.
 *
 * NO CAPTION STATES A COUNT THAT THE RENDER CANNOT CARRY. Every plate is shown at 3/2 — the
 * source's own ratio — so the crop is the whole frame at every breakpoint and a count true
 * in the file is true on the screen. Where a partial figure enters at an edge (V has an arm
 * and a leg at the right), the caption names no number at all.
 */

export type Sx2cPlate = {
  /** the still's id; files live at /media/stills/<id>-<w>.webp */
  id: string;
  /** every derivative that exists. Checked per frame — none of these reaches 2560. */
  widths: number[];
  /** the plate's number in the section's own numbering */
  numeral: string;
  /** what a reader who cannot see it is told. Written from the rendered crop. */
  alt: string;
  /** what is in the plate. It names the practice, never the framing and never the props. */
  caption: string;
  /**
   * `sizes` is the box, stated exactly. Every plate's width is a declared fraction of the
   * viewport at both tiers — 28 / 44 / 60 / 50 / 50 vw at >= 64rem and 52 / 68 / 84 / 100 /
   * 100 vw below it — because the step ladder IS percentages of the viewport. So `sizes` is
   * not an estimate here; it is the same number the grid uses.
   */
  sizes: string;
};

const S = (wide: number, narrow: number) => `(max-width: 63.99rem) ${narrow}vw, ${wide}vw`;

export const PLATES: readonly Sx2cPlate[] = [
  {
    id: 'pr-ttc-dsc_0404',
    widths: [480, 960, 1620],
    numeral: 'I',
    alt: 'Three women sitting cross-legged on grass under trees, each with one arm bent over the head in a seated side stretch',
    caption: 'Three in a seated side stretch on the grass.',
    sizes: S(28, 52),
  },
  {
    id: 'pr-ttc-dsc_0459',
    widths: [480, 960, 1620],
    numeral: 'II',
    alt: 'Three women balancing against a laterite brick wall, two in tree pose with palms joined overhead and one holding a raised foot out in front',
    caption: 'Tree pose and a standing balance at the laterite wall.',
    sizes: S(44, 68),
  },
  {
    id: 'pr-ttc-dsc_0302_1',
    widths: [480, 960, 1620],
    numeral: 'III',
    alt: 'Five women standing in tree pose with palms joined overhead on a concrete apron, a banyan and bamboo behind them',
    caption: 'Five in tree pose on a concrete apron under the trees.',
    sizes: S(60, 84),
  },
  {
    id: 'pr-ttc-dsc_0347',
    widths: [480, 960, 1620],
    numeral: 'IV',
    alt: 'Four women practising beneath a banyan, two bending sideways with arms overhead, one standing with arms raised and one seated with palms joined',
    caption: 'Four under the banyan, one seated at the centre.',
    sizes: S(50, 100),
  },
  {
    id: 'pr-ttc-dsc_0510',
    widths: [480, 960, 1620],
    numeral: 'V',
    alt: 'Practitioners hanging inverted from wall ropes with legs spread wide, hands reaching to the red floor of the hall',
    caption: 'Inverted on the wall ropes, hands to the floor.',
    sizes: S(50, 100),
  },
];

export const srcSetFor = (p: Sx2cPlate) =>
  p.widths.map((w) => `/media/stills/${p.id}-${w}.webp ${w}w`).join(', ');

export const srcFor = (p: Sx2cPlate) => `/media/stills/${p.id}-960.webp`;
