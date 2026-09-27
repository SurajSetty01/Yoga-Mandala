/**
 * The five pictures of About §01, Introduction — "The mat's width" — in the order the
 * argument widens. Base: preview concept sx2a. Every crop was set by rendering it.
 *
 *   I    the mat — a CLIP (pr-mov-img_5659, portrait 1080x1920), the only moving thing in
 *        the section: the practice on the mat moves, everything it widens into is still.
 *   II   knowledge — a study circle's listener in the open pavilion.
 *   III  tradition and contemporary practice — practitioners beneath the banyan.
 *   IV   the work — ONE ROW OF FIVE MATS. Taken from concept sx2d, where it was a hinged
 *        wall. It replaces sx2a's second study-circle frame (pr-ttc-dsc_0284_1, already on
 *        /contact/, /learn/ and /practice/, and the same afternoon as plate II). With it the
 *        sequence says something the old one did not: one mat, then a row of mats — the
 *        structured, sustained, shared work — then, in V, practice with no mat at all.
 *   V    the belief — a woman seated on grass among the trees. The only full-bleed plate.
 *
 * Every TTC still stops at 1620px; plate V is upscaled above that at 2531 (accepted: it is
 * the one frame of practice with no mat in it).
 *
 * A PLATE OPENS FROM ITS CENTRE, so each frame's centre holds a subject on its own. On the
 * desktop plates (all wider than 3:2) only `pos` Y is a lever; on the phone (near-square)
 * `posNarrow` X is.
 *
 * NOBODY IS NAMED. Every alt says what is happening.
 */

export type Still = {
  id: string;
  widths: number[];
  pos: string;
  posNarrow: string;
  alt: string;
};

export type Clip = {
  id: string;
  /** the <img> beneath the video IS the poster — no `poster` attribute anywhere */
  still: string;
  stillAvif: string;
  src: string;
  pos: string;
  alt: string;
};

export const MAT: Clip = {
  id: 'pr-mov-img_5659',
  still: '/media/posters/pr-mov-img_5659.jpg',
  stillAvif: '/media/posters/pr-mov-img_5659.avif',
  src: '/media/clips/pr-mov-img_5659.mp4',
  pos: '58% 50%',
  alt: 'A woman in a pink top folds forward over a dark mat, a strap looped around her feet and a wooden block beside her.',
};

export const PLATES: Still[] = [
  {
    id: 'pr-ttc-dsc_0285_1',
    widths: [480, 960, 1620],
    pos: '36% 50%',
    posNarrow: '38% 50%',
    alt: 'Three women sit on chairs in an open pavilion, one listening with her chin on her hand, another holding a notebook and pen, trees beyond the columns.',
  },
  {
    id: 'pr-ttc-dsc_0347',
    widths: [480, 960, 1620],
    pos: '50% 55%',
    posNarrow: '50% 60%',
    alt: 'Four women practise beneath a banyan tree, two bending sideways with their arms overhead, one standing and one seated with her palms joined.',
  },
  /* The strip it opens from (the frame's centre) is the second practitioner's raised legs
     over her chair. Y 45% keeps the feet of the near two and the near block in the wide
     crop; on the phone X 20% keeps the near end of the row and lets it run away right. */
  {
    id: 'pr-ttc-dsc_0274',
    widths: [480, 960, 1620],
    pos: '50% 45%',
    posNarrow: '20% 50%',
    alt: 'A row of practitioners lying back with their legs raised over folding chairs and bolsters under their shoulders, seen from one end so the row recedes along the white wall of the hall.',
  },
  {
    id: 'pr-ttc-dsc_0396',
    widths: [480, 960, 1620],
    pos: '50% 20%',
    posNarrow: '44% 40%',
    alt: 'A woman sits cross-legged on grass with her eyes closed and her hands resting on her knees, four others seated behind her among the trees.',
  },
];

export function srcOf(s: Still): string {
  return `/media/stills/${s.id}-${s.widths[s.widths.length - 1]}.webp`;
}

export function srcSetOf(s: Still): string {
  return s.widths.map((w) => `/media/stills/${s.id}-${w}.webp ${w}w`).join(', ');
}
