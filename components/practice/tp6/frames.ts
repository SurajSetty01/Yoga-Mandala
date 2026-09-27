/**
 * §05 · Retreats and immersions — four outdoor frames, one for each edge of the screen they
 * arrive from. All four are Prabodha TTC landscapes at 3:2 with a 1620 cap: no 2560 exists,
 * so nothing here is ever asked for more than 1620.
 *
 * The order is the order of arrival, clockwise from the top. The alts are the manifest's,
 * verbatim. The captions say what each picture shows and nothing else: no place, no event,
 * no "retreat", no names — these were made on a teacher-training shoot, not on a retreat.
 */
export type Tp6Edge = 'top' | 'right' | 'bottom' | 'left';

export type Tp6Frame = {
  id: string;
  edge: Tp6Edge;
  alt: string;
  cap: string;
  /** object-position — only the top frame is ever cropped, to a wider box */
  pos: string;
};

export const TP6_WIDTHS = [480, 960, 1620] as const;

export const TP6_FRAMES: readonly Tp6Frame[] = [
  {
    id: 'pr-ttc-dsc_0311',
    edge: 'top',
    alt: 'Two women in tree pose with arms overhead beside a bamboo clump above dry fields',
    cap: 'Tree pose, beside the bamboo.',
    pos: '50% 6%',
  },
  {
    id: 'pr-ttc-dsc_0347',
    edge: 'right',
    alt: 'Four women posing beneath a banyan in side bends and with arms raised, one seated with palms joined',
    cap: 'Four beneath a banyan.',
    pos: '50% 50%',
  },
  {
    id: 'pr-ttc-dsc_0366',
    edge: 'bottom',
    alt: 'A woman balancing on her hands on a large boulder among trees',
    cap: 'A balance on a boulder.',
    pos: '50% 50%',
  },
  {
    id: 'pr-ttc-dsc_0459',
    edge: 'left',
    alt: 'Three women holding balancing poses against an exposed brick wall',
    cap: 'Three balances at a brick wall.',
    pos: '50% 50%',
  },
];

export const tp6Src = (id: string, w: number) => `/media/stills/${id}-${w}.webp`;
export const tp6SrcSet = (id: string) =>
  TP6_WIDTHS.map((w) => `${tp6Src(id, w)} ${w}w`).join(', ');
