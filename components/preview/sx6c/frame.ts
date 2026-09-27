/**
 * The one photograph in this section, and why it is this one.
 *
 * `pr-ttc-dsc_0146_1` — two practitioners arched backward over folding chairs, hands and
 * feet on their mats, on the red floor of the Prabodha hall. Chosen after looking at every
 * frame in both libraries that nobody else has spent, for reasons that belong to THIS frame:
 *
 *  · IT IS THE PICTURE OF THE SENTENCE ON THE TISSUE. "The role of a teacher is not to
 *    create dependence." Each body here is held up — by a chair. Nobody stands over either
 *    of them, nobody's hands are on them; the support in the room is a prop each of them
 *    chose and can leave. A frame of a man adjusting or demonstrating would be read as a
 *    portrait of the founder beside his own biography, which the archive cannot support:
 *    nothing in it identifies anyone.
 *  · NOBODY ELSE HAS IT. When this section was first built it carried `pr-pbh-img_5648`
 *    (two students folded to their blocks). Since then three other candidates for this
 *    same page — sx4d, sx5a and sx5d, two of them for the section immediately before this
 *    one — have taken 5648, and the live §05 already shows its room (5560). This frame
 *    appears nowhere in components/ or app/ outside this route (checked by id).
 *  · ITS GEOMETRY IS THE MECHANIC. The top sixth of the frame is shade netting and nothing
 *    else; the nearer figure's hip, the highest point of the arch, is at 34% and the far
 *    figure's back at 18%. The tissue comes to rest over exactly that band (`--sx6c-rest`
 *    in the stylesheet), so the part left frosted is the part with no one in it — and it is
 *    also the part of the frame the media audit flags as its flaw ("a hard flat colour").
 *  · TWO CROPS, BOTH LOOKED AT. Wide, the plate is cut to 1.36:1 from the right edge, which
 *    drops the backpack and loose bags at the left edge and keeps the whole scene. Narrow, a
 *    4:5 crop centred on the frame loses the bolster stack too and keeps both arches, so a
 *    phone gets a TALL plate (357×446 at 390) instead of a 357×238 letterbox.
 *
 * RESOLUTION, STATED: the Prabodha set caps at 1620. The plate never exceeds 60rem (960
 * CSS px) wide, so a 1x screen is always served real pixels and a 2x screen at the cap gets
 * 84% of them — the ceiling of this archive, not a choice.
 *
 * CAPTIONED FOR WHAT IT SHOWS, and where, in the words the live Contact page already uses
 * for this set ("Prabodha TTC"). No date: no audit records one for this collection.
 */
export type Still = {
  id: string;
  widths: readonly number[];
  /** intrinsic size of the largest derivative on disk */
  w: number;
  h: number;
  /** wide plate: aspect (width / height) and focus */
  wide: { ar: number; pos: string };
  /** narrow plate: aspect and focus */
  narrow: { ar: number; pos: string };
  alt: string;
  /** what the frame shows — printed on the tissue */
  shows: string;
  /** where it was taken, as the site already names that collection */
  at: string;
};

export const PLATE: Still = {
  id: 'pr-ttc-dsc_0146_1',
  widths: [480, 960, 1620],
  w: 1620,
  h: 1080,
  wide: { ar: 1.36, pos: '100% 50%' },
  narrow: { ar: 0.8, pos: '50% 50%' },
  alt: 'Two practitioners arch backward over folding chairs, hands and feet planted on their mats on a red floor, with shade netting along the wall behind them.',
  shows: 'Two backbends over folding chairs — each body held by a prop, not by a hand.',
  at: 'Prabodha TTC',
};

export const stillSrc = (s: Still, w: number) => `/media/stills/${s.id}-${w}.webp`;
export const stillSet = (s: Still) => s.widths.map((w) => `${stillSrc(s, w)} ${w}w`).join(', ');
