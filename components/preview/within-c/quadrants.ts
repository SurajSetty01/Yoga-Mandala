import { within } from '@/content/copy';

/**
 * The four quadrants of the figure — the client's four pillars, each given one photograph
 * and one compass position.
 *
 * The positions are clockwise from the top right, which is how the reader turns the figure:
 * 01 NE → 02 SE → 03 SW → 04 NW. That order is what lets the whole mechanic reduce to one
 * number: the lit quarter of the conic scrim, the clay arc on the rim and the corner the
 * text block occupies are all `index * 90deg`.
 *
 * Each photograph was chosen by looking at it CIRCLE-CROPPED, not rectangular — the disc
 * masks the frame to its own geometry, so a subject sitting in a corner is simply gone. The
 * `pos` value is the `object-position` that keeps the subject inside the circle; it is not
 * the still's stored focal point, which is measured for a rectangle.
 *
 * No dance frames. They are a Bharatanatyam performance and nothing on this page makes the
 * festival context explicit.
 */
export type Quadrant = {
  index: string;
  name: string;
  lines: readonly string[];
  listLead: string | null;
  items: readonly string[];
  closing: string | null;
  /** compass label, for the tab's accessible description */
  corner: 'ne' | 'se' | 'sw' | 'nw';
  img: { id: string; w: number; h: number; pos: string; alt: string; cap: string };
};

const CORNERS = ['ne', 'se', 'sw', 'nw'] as const satisfies readonly Quadrant['corner'][];

const FALLBACK_CORNER: Quadrant['corner'] = 'ne';

const PICTURES: Record<string, Quadrant['img'] | undefined> = {
  Connect: {
    id: 'ss-dsc07137',
    w: 1920,
    h: 1280,
    pos: '30% 52%',
    alt: 'A barefoot man in a light blue kurta sits on a green stool talking, with listeners seated on the floor beside him.',
    cap: 'Teachers in conversation',
  },
  Learn: {
    id: 'p13-img_0617',
    w: 1920,
    h: 1440,
    pos: '52% 58%',
    alt: 'A studio full of participants seated on coloured mats facing the front of the room, a rope wall at the left and ceiling slings overhead.',
    cap: 'A community class, seated',
  },
  Collaborate: {
    id: 'ss-dsc07143',
    w: 1920,
    h: 1280,
    pos: '50% 56%',
    alt: 'Four panellists sit on wooden chairs on a green stage in front of a wall painted with a tree and a circular emblem.',
    cap: 'Teachers on a panel together',
  },
  Share: {
    id: 'ss-dsc07118',
    w: 1920,
    h: 1280,
    pos: '50% 42%',
    alt: "A teacher leans over a student and holds his hand just above the student's back to correct the line of a plank position.",
    cap: 'An adjustment, mid-practice',
  },
};

/** `closing` exists only on SHARE, so the union has to be narrowed before it is read. */
const closingOf = (p: (typeof within.pillars)[number]): string | null =>
  'closing' in p ? p.closing : null;

export const quadrants: Quadrant[] = within.pillars.map((p, i) => {
  const img = PICTURES[p.name];
  if (!img) throw new Error(`within-c: no photograph chosen for pillar "${p.name}"`);
  return {
    index: p.index,
    name: p.name,
    lines: p.lines,
    listLead: p.listLead,
    items: p.items,
    closing: closingOf(p),
    corner: CORNERS[i] ?? FALLBACK_CORNER,
    img,
  };
});

/** The figure needs a quadrant for every state it can be in; indexing is checked once here. */
export const quadrantAt = (i: number): Quadrant => quadrants[i] ?? quadrants[0]!;
