import { contact } from '@/content/copy';

/**
 * CONCEPT B — the eight subjects as eight photographs.
 *
 * Each `alt` here is copied VERBATIM from public/media/stills.json, which is the vision
 * audit's own description of what is in the frame. That matters: the word on the arch is a
 * SUBJECT the community is open to talking about, and the alt says what the picture
 * actually shows. Nothing captions a photograph as an event it was not taken at — the one
 * misattribution this project has already shipped once (design/DESIGN-SYSTEM.md §4).
 *
 * `focal` is the manifest's focal point, used as object-position so a landscape frame
 * cropped into a tall doorway keeps its subject. Portrait crops of landscape frames are how
 * a teacher ended up off-screen with an air-cooler centre-frame the last time.
 *
 * `srcs` lists the derivatives that EXIST on disk with their MEASURED intrinsic widths, not
 * the ones the manifest hopes for. Two traps live here and both were hit: ss-ven0056 has only
 * the one derivative (the manifest claims three, and asking for 1920 is a 404), and the files
 * called "-960" for ss-ven0024 and ss-ven0056 are actually 720px wide portrait crops, so a
 * "960w" descriptor would make the browser pick them for spaces they cannot fill.
 */
export type Moment = {
  n: string;
  label: string;
  id: string;
  alt: string;
  focal: [number, number];
  /** file suffix → real intrinsic width, measured with sharp. */
  srcs: Array<{ suffix: number; w: number }>;
};

const ITEMS = contact.collaborations.items;

export const MOMENTS: Moment[] = [
  {
    n: '01',
    label: ITEMS[0]!,
    id: 'p13-img_0544',
    alt: 'A full class holding downward-facing dog on mats while a teacher watches from the side of the hall.',
    focal: [0.5, 0.55],
    srcs: [{ suffix: 960, w: 960 }, { suffix: 1920, w: 1920 }, { suffix: 2560, w: 2560 }],
  },
  {
    n: '02',
    label: ITEMS[1]!,
    id: 'ss-dsc07137',
    alt: 'A barefoot man on a green stool talks to a small group seated on the floor beside him.',
    /* Pulled left of the manifest's 0.35: at this crop 0.35 centres an air cooler, which is
       the exact failure design/DESIGN-SYSTEM.md records from the last portrait crop. */
    focal: [0.28, 0.45],
    srcs: [{ suffix: 960, w: 960 }, { suffix: 1920, w: 1920 }],
  },
  {
    n: '03',
    label: ITEMS[2]!,
    id: 'ss-dsc07118',
    alt: "A teacher leans in and holds a hand above a student's back to adjust a plank position.",
    focal: [0.5, 0.42],
    srcs: [{ suffix: 960, w: 960 }, { suffix: 1920, w: 1920 }],
  },
  {
    n: '04',
    label: ITEMS[3]!,
    id: 'ss-ven0139',
    alt: 'Students seated on mats in forward bends across a wide open hall with chairs along the wall',
    focal: [0.45, 0.62],
    srcs: [{ suffix: 960, w: 960 }],
  },
  {
    n: '05',
    label: ITEMS[4]!,
    id: 'p13-img_0614',
    alt: 'Group seated on mats facing the front of a studio with ropes and ceiling slings',
    focal: [0.45, 0.66],
    srcs: [{ suffix: 960, w: 960 }, { suffix: 1920, w: 1920 }, { suffix: 2560, w: 2560 }],
  },
  {
    n: '06',
    label: ITEMS[5]!,
    id: 'ss-dsc07143',
    alt: 'Four panellists on wooden chairs on a green stage before a wall with a painted tree and mandala.',
    focal: [0.5, 0.55],
    srcs: [{ suffix: 960, w: 960 }, { suffix: 1920, w: 1920 }],
  },
  {
    n: '07',
    label: ITEMS[6]!,
    id: 'ss-ven0024',
    alt: 'Framed paintings on a wooden rack beneath a tree with a moulded face on its trunk',
    focal: [0.5, 0.5],
    srcs: [{ suffix: 960, w: 720 }],
  },
  {
    n: '08',
    label: ITEMS[7]!,
    id: 'ss-ven0056',
    alt: 'Covered hall with red roof trusses and skylights above a line of people practising on mats',
    focal: [0.5, 0.5],
    srcs: [{ suffix: 960, w: 720 }],
  },
];

export const srcSet = (m: Moment) =>
  m.srcs.map((s) => `/media/stills/${m.id}-${s.suffix}.webp ${s.w}w`).join(', ');
