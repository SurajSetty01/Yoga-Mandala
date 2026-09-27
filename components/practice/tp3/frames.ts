/**
 * §02 · Regular practice — four frames from one hall, one for each thing the client's
 * sentence says practice requires. All four are 1920×2560 portraits (3:4); none has a
 * 2560 derivative, so nothing here is ever asked for more than 1920.
 *
 * `s` and `o` are the crop: a scale and the point it closes on. They step in — 1.05, 1.16,
 * 1.32 — and the fourth goes back to 1, which is the pull-back. `mark` is where the
 * viewfinder's corners stand for that frame, as an inset of the window.
 *
 * Captions say what each picture shows and nothing else: no place, no event, no names.
 */
export type Tp3Frame = {
  id: string;
  alt: string;
  cap: string;
  s: number;
  o: string;
  mark: string;
};

export const TP3_WIDTHS = [480, 960, 1920] as const;

export const TP3_FRAMES: readonly Tp3Frame[] = [
  {
    id: 'pr-pbh-img_5412',
    alt: 'A long row of people in supported shoulderstand seen low along a hall floor',
    cap: 'A row in supported shoulderstand, seen low along the hall floor.',
    s: 1.05,
    o: '50% 30%',
    mark: '6%',
  },
  {
    id: 'pr-pbh-img_5407',
    alt: 'A man in supported shoulderstand in the foreground while a teacher bends over a student behind him',
    cap: 'At the far end of the row, a teacher bends over a student.',
    s: 1.16,
    o: '84% 44%',
    mark: '11%',
  },
  {
    id: 'pr-pbh-img_5634',
    alt: 'A woman folding forward over a chair with a block under her back foot beside a wall of ropes',
    cap: 'Folding forward over a chair, the back foot set on a block.',
    s: 1.32,
    o: '62% 74%',
    mark: '16%',
  },
  {
    id: 'pr-pbh-img_5532',
    alt: 'Three people in supported shoulderstand against a yellow wall with daylight from an open window',
    cap: 'Three in supported shoulderstand against a yellow wall, in daylight from an open window.',
    s: 1,
    o: '50% 50%',
    mark: '3%',
  },
];

export const tp3Src = (id: string, w: number) => `/media/stills/${id}-${w}.webp`;
export const tp3SrcSet = (id: string) =>
  TP3_WIDTHS.map((w) => `${tp3Src(id, w)} ${w}w`).join(', ');
