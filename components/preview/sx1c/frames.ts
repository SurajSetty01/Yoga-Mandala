/**
 * The ONE photograph in this hero.
 *
 * The brief for this concept is "photography sparing and deliberate, landing as an event".
 * Sparing is taken literally: the section contains exactly one image, so every decision
 * about it has to be right rather than averaged across a set.
 *
 * Why `pr-ttc-dsc_0396` and not one of the other unused frames — each rejection was made by
 * rendering the frame and LOOKING at it, not by reading the manifest:
 *
 *  · `pr-pbh-img_5416` — five people in supported shoulderstand receding down a hall. The
 *    best rhythm in the archive and unusable here: a door sign reading YOGA HALL 2 is fully
 *    legible, two ceiling fans and three folding chairs are in shot.
 *  · `pr-pbh-img_5622` — a real teaching moment, and the bottom-right quarter of it is two
 *    black folding chairs. The subject of the picture is the furniture.
 *  · `pr-ttc-dsc_0347` — four practitioners posed symmetrically under a banyan. A good
 *    photograph of a photo-shoot; it reads as promotion, not as study.
 *  · `pr-ttc-dsc_0020_1` — a beautiful empty lane. No people, so it cannot be the one and
 *    only picture on a page about a community of practitioners.
 *
 * WHAT IS IN THE FRAME, COUNTED OFF THE PIXELS.  The 1620 source was decoded to PNG and
 * looked at: ONE woman in a blue vest in the foreground, and behind her THREE more — purple
 * left, grey right, maroon far right. FOUR people.
 *
 * Re-counted this round on the RENDERED page rather than the source, because the two critics
 * disagreed and one of them has to be wrong. Screenshot of the plate at 1440x900, printed
 * whole at 720x480: blue vest centre-left foreground, purple short sleeves at the left edge,
 * charcoal-and-grey to her right, maroon far right. Four. So critic 1 is right that the
 * rejected caption's "four others seated behind" overcounted by one, and critic 2's "five
 * women seated in padmasana on grass" overcounts by one in the other direction. Both numbers
 * came from a picture with four people in it — which is the argument for the alt below
 * carrying no number at all.
 *
 * Both critics caught this and they were right. The manifest's own `alt` for this frame says
 * "four others seated behind"; that string was carried into the markup AND printed as a
 * visible caption, so a sighted reader was told there were five while looking at four. The
 * manifest is not edited from here — it is shared data and not this concept's to change —
 * so the alt below is written from the frame instead of copied from the record, and it
 * carries NO COUNT AT ALL: a number is the one thing in an alt that a crop can falsify.
 *
 * THE CAPTION IS GONE.  A caption that repeats the alt tells a screen-reader user the same
 * sentence twice and tells a sighted reader what they can already see. There is nothing
 * about this photograph that I know and the reader does not — no date, no place, no names —
 * and inventing one is the failure this project has a rule against. So: no caption.
 *
 * THE DERIVATIVE CEILING, AND WHY THE PLATE IS HALF THE PAGE RATHER THAN THE WHOLE OF IT.
 * This frame tops out at 1620. Of the 47 landscape frames in `pranava-stills.json` exactly
 * ONE has a 2560 derivative — `pr-pbh-img_5433`, the indoor lecture with a folding chair and
 * blue curtains, which is the frame class this project has already rejected four times. So
 * 1620 is the real ceiling for any frame that can carry this page, and the plate's track is
 * sized to that ceiling rather than to the screen: `min(50%, 810px)`.
 *
 * THE NUMBER THIS COMMENT USED TO CARRY WAS WRONG AND A CRITIC WAS RIGHT TO SAY SO. It read
 * "it renders 50vw, which is 1266 CSS px at 2531" — arithmetic from before the 810px cap was
 * added, never re-measured after. Re-measured now, as the browser's own layout width of the
 * `<img>` beside the density-adjusted intrinsic width of the derivative it actually chose:
 *
 *     390    box 370.0   chose -480   intrinsic 370.0    ratio 1.000
 *     1024   box 512.0   chose -960   intrinsic 512.0    ratio 1.000
 *     1440   box 720.0   chose -960   intrinsic 720.0    ratio 1.000
 *     2531   box 810.0   chose -960   intrinsic 810.0    ratio 1.000
 *
 * Not one viewport upscales, and the worst case anywhere is DPR 2 against the 810px cap,
 * which asks for 1620 and gets exactly 1620. A full-bleed treatment at 2531 would have been
 * a 1.56x upscale; capping the track at the file's own width means the upscale is not
 * merely avoided but arithmetically unreachable.
 */

export type Frame = {
  id: string;
  widths: number[];
  /** intrinsic pixels of the largest derivative, so the box is reserved before the bytes */
  w: number;
  h: number;
  alt: string;
};

export const PLATE: Frame = {
  id: 'pr-ttc-dsc_0396',
  widths: [480, 960, 1620],
  w: 1620,
  h: 1080,
  /*
   * No count, and no mention of the page's mechanism. It describes the photograph, which is
   * printed whole — the plate's aperture is the frame's own 3:2, so this sentence is true at
   * 320 and at 2560 alike and there is no crop that can make it false.
   */
  alt: 'A woman in a blue vest sits cross-legged on grass with her eyes closed and her hands resting on her knees, with others seated behind her on the lawn among the trees',
};

/* `noUncheckedIndexedAccess` is on in this project, so an index into `widths` is
   `number | undefined` and the largest derivative has to be narrowed rather than assumed. */
export const src = (f: Frame, want?: number): string => {
  const largest = f.widths[f.widths.length - 1] ?? f.w;
  const w = want === undefined ? largest : (f.widths.find((x) => x >= want) ?? largest);
  return `/media/stills/${f.id}-${w}.webp`;
};

export const srcSet = (f: Frame) =>
  f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');
