/**
 * 03 · PROGRAMME CATEGORIES — the five forms and the five frames that stand for them.
 *
 * THE NAMES are the client's list from the Website brief §8 — "teacher education,
 * continuing education, workshops, intensives and study programmes" — and not one word has
 * been added to any of them. 'Retreats' and 'regular practice' are named in the lead
 * sentence but belong to Practice, so they are not Learn categories here.
 *
 * THE FRAMES were allocated by the site-wide media plan so that no two sections share one,
 * and each was chosen because it looks like nothing else in the row: a teacher at the end of
 * a line, a supported inversion at a wall, a restorative row under a roof rope, sitting on
 * grass, a discussion circle. Alts say only what is shown; nobody is named.
 *
 * `shape` decides the cell: portrait frames take the narrower cells of the band, landscape
 * the broader, so the five stay visibly different forms even once they are one band.
 * `pos` is the wide-band crop, `posNarrow` the phone crop (DESIGN-SYSTEM §1).
 */
export type Tl4Form = {
  label: string;
  id: string;
  widths: number[];
  w: number;
  h: number;
  shape: 'p' | 'l';
  pos: string;
  posNarrow: string;
  alt: string;
};

export const TL4_FORMS: Tl4Form[] = [
  {
    label: 'Teacher education',
    id: 'pr-pbh-img_5616',
    widths: [480, 960, 1920],
    w: 1920,
    h: 2560,
    shape: 'p',
    /* the teacher is at the right edge of the frame, so the crop keeps the right */
    pos: '78% 50%',
    posNarrow: '60% 52%',
    alt: 'A line of people folding forward over chairs while a teacher adjusts the hands of one at the far end',
  },
  {
    label: 'Continuing education',
    id: 'pr-pbh-img_5738',
    widths: [480, 960, 1920],
    w: 1920,
    h: 2560,
    shape: 'p',
    pos: '52% 50%',
    posNarrow: '50% 34%',
    alt: "A person holding a handstand against a yellow wall while a man steadies another person's legs",
  },
  {
    label: 'Workshops',
    id: 'pr-ttc-dsc_0271_1',
    widths: [480, 960, 1620],
    w: 1620,
    h: 1080,
    shape: 'l',
    pos: '66% 50%',
    posNarrow: '60% 56%',
    alt: 'Four practitioners in supported bridge over chairs with a rope hanging from the roof beam',
  },
  {
    label: 'Intensives',
    id: 'pr-ttc-dsc_0384',
    widths: [480, 960, 1620],
    w: 1620,
    h: 1080,
    shape: 'l',
    pos: '52% 60%',
    posNarrow: '50% 62%',
    alt: 'Five women sitting cross-legged on grass among tall trees with their hands on their knees',
  },
  {
    label: 'Study programmes',
    id: 'pr-ttc-dsc_0280_1',
    widths: [480, 960, 1620],
    w: 1620,
    h: 1080,
    shape: 'l',
    pos: '70% 60%',
    posNarrow: '62% 60%',
    alt: 'A discussion circle of people on chairs in an open pavilion, one man leaning forward speaking',
  },
];

export const tl4Src = (f: Tl4Form) => `/media/stills/${f.id}-960.webp`;
export const tl4SrcSet = (f: Tl4Form) =>
  f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');

/* The wide band is 5.55 units across (portraits 0.9, landscapes 1.25) inside a measure that
   stops at 1620px. So a portrait cell is ~15vw and a landscape ~21vw until the cap, and
   the last clause pins them once the measure stops growing. On a phone the photo column
   is 60% of the measure. */
export const tl4Sizes = (f: Tl4Form) =>
  f.shape === 'p'
    ? '(max-width: 899px) 60vw, (min-width: 1760px) 270px, 15vw'
    : '(max-width: 899px) 60vw, (min-width: 1760px) 370px, 21vw';
