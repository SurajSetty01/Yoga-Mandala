/**
 * The two photographs of /preview/sx2d/ — and they are one row.
 *
 * `pr-ttc-dsc_0274` and `pr-ttc-dsc_0271_1` are DSC_0274 and DSC_0271 of the same card: the
 * photographer walked the length of one row of five practitioners in supported shoulder-
 * stand over folding chairs and shot it from each end. Checked by looking, not by reading
 * the manifest: the order of the five from one end is pink top, blue tie-dye leggings,
 * black, red, teal; from the other end it is teal, red, black, blue tie-dye, pink. Same
 * bolsters, same jute mats, same white wall. Neither frame is used anywhere else on the
 * site (grep components/ for either id).
 *
 * Each recedes toward the side it is hung on: 0274's row runs away to the RIGHT, 0271_1's
 * to the LEFT. So hung on the left and right walls of the room, both rows run INTO the
 * corner where the walls meet the words — the two ends of one row meeting at the sentence.
 *
 * DERIVATIVES, CHECKED ON DISK: both are 480 / 960 / 1620. Nothing assumes 2560. At the
 * near edge of a wall the picture is magnified by the perspective (about 1.6x at the full
 * fold), so a desktop wall wants the 1620 and gets it; a phone wall wants about 560.
 *
 * NOBODY IS NAMED. The alt text says what is happening and, where it is true, that the two
 * pictures are the same row.
 */

export type Wall = {
  id: string;
  widths: number[];
  /** object-position inside the wall, desktop */
  pos: string;
  /** object-position inside the wall, phone */
  posNarrow: string;
  alt: string;
};

export const WALLS = {
  left: {
    id: 'pr-ttc-dsc_0274',
    widths: [480, 960, 1620],
    pos: '50% 50%',
    /* the phone room is 4:5; keep the half of the row that runs into the corner (right) */
    posNarrow: '82% 50%',
    alt: 'A row of practitioners lying back with their legs raised over folding chairs and bolsters under their shoulders, seen from one end so the row recedes along the white wall of the hall.',
  },
  right: {
    id: 'pr-ttc-dsc_0271_1',
    widths: [480, 960, 1620],
    pos: '50% 50%',
    /* the phone room is 4:5; keep the half of the row that runs into the corner (left) */
    posNarrow: '18% 50%',
    alt: 'The same row seen from its other end, on the red floor under the roof, with a rope hanging from a beam and green shade netting along the open side.',
  },
} as const satisfies Record<string, Wall>;

export function src(w: Wall): string {
  return `/media/stills/${w.id}-${w.widths[w.widths.length - 1]}.webp`;
}

export function srcSet(w: Wall): string {
  return w.widths.map((x) => `/media/stills/${w.id}-${x}.webp ${x}w`).join(', ');
}
