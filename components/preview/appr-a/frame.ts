/**
 * ONE PHOTOGRAPH, AND THE FOUR RECTANGLES §03 LOOKS AT IT THROUGH.
 *
 * `pr-ttc-dsc_0271_1` — the TTC hall: red oxide floor, white rendered wall, corrugated
 * roof, green shade netting down the open side, a rope hanging from a roof beam. Four
 * practitioners lie back over folding chairs in a line receding away from the camera, the
 * nearest large in the frame with her head on a bolster and her arms stretched out on the
 * mat behind her.
 *
 * WHY THIS FRAME AND NOT ANOTHER. §03 needs a photograph that survives being shown at four
 * scales, which means it needs three things at once: a legible close DETAIL, a single
 * legible BODY around that detail, and a legible ROOM around that. The vision audit's note
 * on this frame is "the most complete version of the restorative row: full length visible,
 * hanging rope giving the hall character, and plenty of clean wall above" — it is the only
 * free landscape frame in the TTC set with all three. `pr-ttc-dsc_0195_1` was the runner-up
 * and was dropped because its nearest figure is inverted with her legs vertical, so the
 * tight crop would have been an ambiguous limb rather than something a reader can name.
 *
 * IT IS NOT USED ANYWHERE ELSE ON THE SITE. Checked against every `pr-` id in `components/`
 * and `app/` before it was committed to; 48 of the 84 Praṇava stills are already spent and
 * this is not one of them.
 *
 * 1620 x 1080 on disk, exactly 3:2, in three derivatives. Nothing here assumes 2560 — this
 * frame has no 2560, which is why the sheet is capped at 112rem: at 2531 the tightest crop
 * is then asked to fill about 1.1x its own native pixels rather than 1.4x.
 */

export const PHOTO = {
  id: 'pr-ttc-dsc_0271_1',
  widths: [480, 960, 1620] as const,
  /** the source's own ratio, which is also the fourth view's aperture ratio */
  ratio: 1620 / 1080,
  alt:
    'Four practitioners lie back over folding chairs in a line receding down a hall with a ' +
    'red oxide floor, a rope hanging from the roof beam and green shade netting along the ' +
    'open side.',
} as const;

export function src(w: number): string {
  return `/media/stills/${PHOTO.id}-${w}.webp`;
}
export function srcSet(): string {
  return PHOTO.widths.map((w) => `${src(w)} ${w}w`).join(', ');
}

/**
 * ONE `sizes` FOR ALL FOUR VIEWS, DELIBERATELY.
 *
 * Each view renders the same file at a different scale, so an honest per-view `sizes` would
 * have the tight crop choose 1620 and the whole frame choose 480 — two downloads of one
 * photograph. Giving every view the widest view's requirement means the browser fetches the
 * 1620 (166 KB) exactly once and every aperture is served from it. Below 900px the tight
 * crop needs roughly 3x the viewport width of source, which is what the first clause says.
 */
export const SIZES = '(max-width: 899px) 300vw, 100vw';

/**
 * A rectangle of the photograph, in fractions of its width and height, with a description
 * of WHAT IS IN THAT RECTANGLE.
 *
 * Four alt texts rather than one, because the four views genuinely show four different
 * things. Giving the tight crop the whole photograph's description would tell a reader who
 * cannot see it about a room they are not being shown, and `alt=""` on the other three
 * would hide three quarters of the section from them. Nobody is named in any of them: the
 * archive does not record who is in which frame and this route cannot verify it.
 */
export type Crop = { x: number; y: number; w: number; h: number; alt: string };

/**
 * THE FOUR CROPS, NESTED. Each one contains the one before it, which is what lets the
 * larger view draw a hairline rectangle around exactly what the smaller one showed.
 *
 * They were chosen against the rendered file, not against the manifest, and each was
 * checked for whether a reader could NAME what is in it — the defect this section exists to
 * fix is a photograph sliced until its subject is unreadable.
 *
 *  1 · TRADITION     the floor under one body: the bolster, the wooden block, the mat, the
 *                    practitioner's head and her outstretched hands resting on it. The
 *                    foundation, which is the word the client's own paragraph uses.
 *  2 · PRACTICE      that same body entire, lying back over its chair from her feet on the
 *                    chair rail to her hands on the mat, with the next practitioner behind
 *                    her. One person, doing the thing, over time.
 *  3 · INQUIRY       the whole row of four, the wall and the mats — the context that
 *                    answers why it is done this way and not another.
 *  4 · TRANSMISSION  no crop at all, and the 1.3x it adds is not incidental: the fourth is
 *                    the only view that contains the corrugated roof, the rope hanging from
 *                    its beam and the green netting the whole room is lit through. The
 *                    first three are in a picture; the fourth is the room.
 */
/* Each rectangle is inset from the next one on ALL FOUR sides, not three: when an inner
   crop shares an edge with its parent the viewfinder rectangle drawn in the parent loses
   that side to the aperture's own edge and stops reading as a frame. */
export const TRADITION: Crop = {
  x: 0.52,
  y: 0.6,
  w: 0.34,
  h: 0.355,
  alt:
    'A close view of the floor of a practice hall: a head resting on a patterned bolster, ' +
    'two arms stretched out along the mat behind it, a wooden block by one open hand and ' +
    'the foot of a folding chair beside them.',
};
export const PRACTICE: Crop = {
  x: 0.335,
  y: 0.25,
  w: 0.545,
  h: 0.72,
  alt:
    'The same practitioner seen whole, lying back over the seat of a folding chair with ' +
    'her feet up on its rail and her head and arms down on the mat, a second practitioner ' +
    'in the same shape behind her.',
};
export const INQUIRY: Crop = {
  x: 0.115,
  y: 0.155,
  w: 0.775,
  h: 0.83,
  alt:
    'The same pair seen from further back, in a line of four practitioners all lying back ' +
    'over folding chairs along a red oxide floor, each on a mat with a bolster under her ' +
    'shoulders, a white rendered wall behind them.',
};
export const WHOLE: Crop = { x: 0, y: 0, w: 1, h: 1, alt: PHOTO.alt };

/** the three cut into the sheet, each paired with the one it steps back from */
export const CUTS: Array<{ crop: Crop; from: Crop | null }> = [
  { crop: TRADITION, from: null },
  { crop: PRACTICE, from: TRADITION },
  { crop: INQUIRY, from: PRACTICE },
];

/** the aperture ratio a crop needs so that `cover` has nothing left to crop */
export function aperture(c: Crop): number {
  return (c.w * PHOTO.ratio) / c.h;
}

/**
 * Where an inner crop falls inside an outer one, as percentages of the outer aperture.
 * This is the viewfinder rectangle: `inner` is what the previous view showed.
 */
export function markIn(outer: Crop, inner: Crop) {
  return {
    x: ((inner.x - outer.x) / outer.w) * 100,
    y: ((inner.y - outer.y) / outer.h) * 100,
    w: (inner.w / outer.w) * 100,
    h: (inner.h / outer.h) * 100,
  };
}

/**
 * How much wider the view is than the one before it, to one decimal place. A fact about the
 * two rectangles above, computed rather than asserted, so it cannot drift out of step with
 * them if a crop is retuned.
 */
export function stepBack(outer: Crop, inner: Crop): string {
  return `${(outer.w / inner.w).toFixed(1)}× wider`;
}
