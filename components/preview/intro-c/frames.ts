/**
 * The twelve prints on the table — concept C, About §01.
 *
 * ONE CAMPUS, ONE TEACHER TRAINING. Every frame here is a `pr-ttc-` file: the same rural
 * venue, the same red oxide floor, the same white walls and corrugated roof, the same green
 * daylight through the shade netting, and the same trees outside it. That is deliberate and
 * it is the whole reason this section can be a PILE rather than a gallery. A pile of prints
 * is something somebody brought back from one place; mixing in the PBH studio frames (yellow
 * walls, tiled floor, tungsten) would have made it a stock selection instead, and
 * DESIGN-SYSTEM §1 already records what happens when two venues meet in one composition.
 *
 * WIDTHS ARE NOT UNIFORM and that decided two placements. Every TTC landscape frame tops out
 * at 1620; the two portrait frames (`_0254_1`, `_0328`) top out at 960, so neither is given a
 * box wider than about 20% of the stage — at 2531 that is 400 CSS px against a 960 source and
 * still oversampled. `sizes` is explicit on every image, because a srcset without one makes
 * the browser assume 100vw and pull a 1620 for a 340px print.
 *
 * FOUR FRAMES WERE LOOKED AT AND DROPPED, not read about and dropped:
 *   · `pr-ttc-dsc_0209` / `_0215` / `_0217` — the single-teacher frames. The whiteboard
 *     behind her carries a legible handwritten heading, and a print on a table is shown at a
 *     size where it would be read.
 *   · `pr-ttc-dsc_0364` and `pr-ttc-dsc_0049` — both already carry weight on the live
 *     /about/ page (the Insights door and the founder circle). Re-using them here would make
 *     the two sections look like one set.
 *   · `pr-ttc-dsc_0500` — the other rope-inversion frame. `_0510` is the same wall a moment
 *     later with the legs wider and the line cleaner, and two of them would be one idea
 *     twice.
 *
 * NOBODY IS NAMED. The archive does not record who is in which frame, so every description
 * says what is happening — which is also what a reader who cannot see the print needs.
 */

export type Print = {
  /** file stem under /media/stills */
  id: string;
  /** widths that actually exist on disk, largest last */
  widths: number[];
  /** the shape of the box it is cut to; the image covers it */
  shape: 'wide' | 'tall' | 'band';
  /** object-position for the desktop crop */
  pos: string;
  /** object-position when the box turns narrower — set deliberately, never defaulted */
  posNarrow?: string;
  alt: string;
  /** the archive number pencilled in the paper margin. Only prints that sit WHOLLY
   *  on the table carry one — on a print that runs off the edge the margin goes
   *  with it, and a mark cut in half is a mistake rather than a filing note. */
  mark?: string;
};

/** Six prints to a bank, fixed — typed as a tuple so the placement table below can index
 *  it without every entry widening to `Print | undefined`. */
type Bank = readonly [Print, Print, Print, Print, Print, Print];

const W_LAND = [480, 960, 1620];
const W_PORT = [480, 960];

export function src(p: Print): string {
  return `/media/stills/${p.id}-${p.widths[p.widths.length - 1]}.webp`;
}

export function srcSet(p: Print): string {
  return p.widths.map((w) => `/media/stills/${p.id}-${w}.webp ${w}w`).join(', ');
}

/** Left bank, top to bottom. */
export const LEFT: Bank = [
  {
    id: 'pr-ttc-dsc_0077',
    widths: W_LAND,
    /* cut to a band, not left at 3:2. At 3:2 the top third of this frame is
       corrugated roof and the cohort sits along the bottom edge; the print a
       person would actually have cut is the one with the room in it. */
    shape: 'band',
    pos: '50% 72%',
    posNarrow: '52% 74%',
    alt: 'A large group seated on the floor of an open-sided hall listening to two teachers sitting on chairs at the front.',
  },
  {
    id: 'pr-ttc-dsc_0274',
    widths: W_LAND,
    shape: 'wide',
    pos: '50% 46%',
    posNarrow: '46% 48%',
    alt: 'A line of practitioners lying with their legs raised over folding chairs, seen from the foot of the row so the chairs stack into a receding pattern.',
  },
  {
    id: 'pr-ttc-dsc_0328',
    widths: W_PORT,
    shape: 'tall',
    pos: '50% 46%',
    posNarrow: '50% 44%',
    alt: 'A man sitting cross-legged on a stone slab beneath a banyan tree, the trunk rising the full height of the frame behind him.',
  },
  {
    id: 'pr-ttc-dsc_0190_1',
    widths: W_LAND,
    shape: 'wide',
    pos: '48% 62%',
    posNarrow: '52% 64%',
    alt: 'A close view along a row of mats laid with folded blankets, bolsters, wooden blocks and folding chairs.',
  },
  {
    id: 'pr-ttc-dsc_0402',
    widths: W_LAND,
    shape: 'wide',
    pos: '50% 58%',
    posNarrow: '52% 58%',
    alt: 'Four practitioners sitting cross-legged in a staggered line on grass among tall trees.',
    mark: '0402',
  },
  {
    id: 'pr-ttc-dsc_0146_1',
    widths: W_LAND,
    shape: 'wide',
    pos: '52% 54%',
    posNarrow: '56% 56%',
    alt: 'A practitioner arching backwards over a folding chair with hands and feet on the mat, a second working on a chair behind.',
    mark: '0146',
  },
];

/** Right bank, top to bottom. */
export const RIGHT: Bank = [
  {
    id: 'pr-ttc-dsc_0510',
    widths: W_LAND,
    shape: 'wide',
    pos: '50% 50%',
    posNarrow: '48% 48%',
    alt: 'Three practitioners hanging inverted from wall ropes with their legs spread wide and their hands on the red floor.',
    mark: '0510',
  },
  {
    id: 'pr-ttc-dsc_0193',
    widths: W_LAND,
    shape: 'wide',
    pos: '46% 58%',
    posNarrow: '44% 58%',
    alt: 'A teacher standing at the left addressing a small group seated on the red floor of a wide hall, a whiteboard on an easel to one side.',
  },
  {
    id: 'pr-ttc-dsc_0254_1',
    widths: W_PORT,
    shape: 'tall',
    pos: '52% 48%',
    posNarrow: '52% 46%',
    alt: 'Three practitioners in supported shoulderstand over folding chairs against a white wall.',
  },
  {
    id: 'pr-ttc-dsc_0396',
    widths: W_LAND,
    shape: 'wide',
    pos: '44% 52%',
    posNarrow: '42% 52%',
    alt: 'A practitioner sitting cross-legged on grass with her eyes closed and her hands on her knees, four others seated behind her.',
    mark: '0396',
  },
  {
    id: 'pr-ttc-dsc_0262_1',
    widths: W_LAND,
    shape: 'wide',
    pos: '50% 60%',
    posNarrow: '52% 62%',
    alt: 'Four practitioners lying back over bolsters with their legs resting on chair seats and their arms out along the mats.',
    mark: '0262',
  },
  {
    id: 'pr-ttc-dsc_0056',
    widths: W_LAND,
    shape: 'wide',
    pos: '50% 50%',
    posNarrow: '50% 50%',
    alt: 'A coconut palm crown seen from below, clusters of green coconuts among the fronds.',
  },
];
