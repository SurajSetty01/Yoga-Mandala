/**
 * The three photographs of About §01, Introduction. The client's review: "reduce the number
 * of images to 2 to 3 of the strongest photographs so the section does not become an image
 * gallery. The text content is the HERO in this section." So the five sentences lead, and
 * these three sit beneath them in one quiet row: study, practice, a group.
 *
 *   study     a discussion circle in the open pavilion, notebooks open as one person speaks.
 *   practice  a woman seated on grass with her eyes closed, others behind her among trees.
 *   group     four women practising together beneath the banyan.
 *
 * NOBODY IS NAMED. Every alt says what is happening.
 */

export type Still = {
  id: string;
  widths: number[];
  /** object-position inside the row's 4:3 tile */
  pos: string;
  alt: string;
};

export const PLATES: Still[] = [
  {
    id: 'pr-ttc-dsc_0284_1',
    widths: [480, 960, 1620],
    pos: '50% 60%',
    alt: 'A discussion circle on chairs in an open pavilion, several people writing in notebooks as one of them speaks, a lawn and trees beyond the columns.',
  },
  {
    id: 'pr-ttc-dsc_0396',
    widths: [480, 960, 1620],
    pos: '42% 45%',
    alt: 'A woman sits cross-legged on grass with her eyes closed and her hands resting on her knees, four others seated behind her among the trees.',
  },
  {
    id: 'pr-ttc-dsc_0347',
    widths: [480, 960, 1620],
    pos: '50% 50%',
    alt: 'Four women practise beneath a banyan tree, two bending sideways with their arms overhead, one standing and one seated with her palms joined.',
  },
];

export function srcOf(s: Still): string {
  return `/media/stills/${s.id}-${s.widths[s.widths.length - 1]}.webp`;
}

export function srcSetOf(s: Still): string {
  return s.widths.map((w) => `/media/stills/${s.id}-${w}.webp ${w}w`).join(', ');
}
