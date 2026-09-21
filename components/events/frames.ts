/**
 * The six photographs on the strip, and why each one is allowed to be there.
 *
 * THE CONSTRAINT. `events.upcoming` is `null`. No event name, date, venue, price, duration
 * or capacity exists in the Blueprint, the About document or the Website brief. What DOES
 * exist is a photographic record of gatherings that have already happened — and the rule
 * the brief sets for it is exact: nothing in the archive may be captioned with an event
 * name the client has not used. So every caption below says what its frame SHOWS. None of
 * them says what it was, who is in it, when it was or what it was called.
 *
 * WHY THESE SIX, AND IN THIS ORDER. All six come from one collection — the manifest's
 * `source` puts each of them in "Prabodha TTC Photos", and "Prabodha" is the client's own
 * programme name from Blueprint §4.3, which is the only reason a provenance line on this
 * page can name anything at all. ("Prabhava", the other collection in the media drop,
 * appears in none of the client's three documents and is therefore not nameable; the
 * Contact page reached the same conclusion independently.) The order is a plausible
 * reading order — outside, then talking, then working, then still, then outside again —
 * and the page never claims it is one day, because no audit says so.
 *
 * WHY THEY ARE ALL THE SAME SHAPE. Every `pr-ttc-*` frame that is not in the portrait set
 * is exactly 1620 × 1080, measured on the encoded files rather than read out of the
 * manifest — whose `w`/`h` are pre-rotation camera values and are wrong for the rotated
 * frames. A strip needs one ratio; 3:2 is the ratio the archive actually has.
 *
 * WHY THE STRIP IS NEVER LARGE. 1620 is the largest derivative any of them has. The cell
 * height caps at 340 CSS px, so a cell is 510 px wide and the 1620 file still covers it at
 * 2× with room to spare. design/PRANAVA-BUILD.md records the same ceiling for this
 * collection: "good to ~1600 wide, never a 2560 full-bleed".
 *
 * `alt` is VERBATIM from public/media/pranava-stills.json — the vision audit's own
 * description of what is in the frame. `caption` is the strip's own shorter reading of the
 * same thing. Nobody is named in either, because the archive does not record who is in any
 * frame and the client has supplied no names.
 */
export type Cell = {
  id: string;
  /** the audit's description, verbatim from the manifest */
  alt: string;
  /** what the frame shows, in the strip's own voice. Never what it was. */
  caption: string;
  /** manifest focal point, as object-position */
  focal: string;
};

export const CELLS: Cell[] = [
  {
    id: 'pr-ttc-dsc_0015_1',
    alt: 'An earth path running away between dense green trees and clipped lawn into shade',
    caption: 'An earth path between trees',
    focal: '50% 50%',
  },
  {
    id: 'pr-ttc-dsc_0278_1',
    alt: 'A group seated in a circle on chairs inside an open-sided pavilion looking out onto a lawn and trees',
    caption: 'A circle of chairs in an open pavilion',
    focal: '50% 60%',
  },
  {
    id: 'pr-ttc-dsc_0191',
    alt: 'Women in saris seated on a red floor watching a woman speaking, two people on chairs beside her',
    caption: 'A speaker, and a seated group',
    focal: '45% 60%',
  },
  {
    id: 'pr-ttc-dsc_0046_1',
    alt: 'Five practitioners standing in warrior one with arms raised on mats across a red floor',
    caption: 'Five practitioners in one shape',
    focal: '45% 50%',
  },
  {
    id: 'pr-ttc-dsc_0262_1',
    alt: 'Four practitioners lying back over bolsters with their legs resting on chair seats',
    caption: 'Four at rest over bolsters and chairs',
    focal: '50% 65%',
  },
  {
    id: 'pr-ttc-dsc_0402',
    alt: 'Four women sitting cross-legged in a staggered line on grass among tall trees',
    caption: 'Four sitting on the grass under trees',
    focal: '45% 62%',
  },
];

/** `/media/stills/<id>-<w>.webp`. Both derivatives exist for all six; measured on disk. */
export const srcSet = (c: Cell) =>
  `/media/stills/${c.id}-960.webp 960w, /media/stills/${c.id}-1620.webp 1620w`;
export const src = (c: Cell) => `/media/stills/${c.id}-1620.webp`;
