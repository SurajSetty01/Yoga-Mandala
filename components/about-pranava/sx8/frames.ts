/**
 * The three photographs in Praṇava & Seva (final sx8). Allocated by the site-wide media
 * planner; none of them is in any sx1–7 design.
 *
 * HER — `pr-pbh-img_5560`, 3024×4032, derivatives to 2560. One person folding forward from
 * standing, both hands on the back of a folding chair: the body is one clean horizontal
 * line. The disc is a square cut the full width of the portrait, so feet, hips, arms and
 * chair all stay in; only the ceiling and the bolsters in the foreground go.
 *
 * THE GATHERING — `pr-ttc-dsc_0077`, 1620×1080. Women in saris seated in a row on mats,
 * listening, two men on chairs at the left. It is shown only through ring six's band, and
 * placed so the row of seated women lies in the band's lowest arc.
 *
 * THE PLATE — `ss-ven0208`, 1280×720, derivatives 480 and 960 only, so it is capped at
 * 480 CSS px. Four speakers on a stage beneath a wall disc bearing the Praṇava mark — a
 * circle above a row of people, hung on the widest ring. It is the /yoga-mandala/ link.
 *
 * No caption names a person or an event; each alt says what is in the picture.
 */
export type Sx8Frame = { id: string; widths: readonly number[]; alt: string };

export const HER: Sx8Frame = {
  id: 'pr-pbh-img_5560',
  widths: [480, 960],
  alt: 'A person folding forward from standing with both hands on the back of a folding chair',
};

export const GATHERING: Sx8Frame = {
  id: 'pr-ttc-dsc_0077',
  widths: [480, 960, 1620],
  alt: 'A large seated group of women in saris listening to two men seated on chairs',
};

export const PLATE: Sx8Frame = {
  id: 'ss-ven0208',
  widths: [480, 960],
  alt: 'Four speakers seated in wooden chairs on a stage beneath a wall disc bearing the Praṇava mark, one reading from notes into a microphone.',
};

export const srcOf = (id: string, w: number) => `/media/stills/${id}-${w}.webp`;
export const setOf = (f: Sx8Frame) => f.widths.map((w) => `${srcOf(f.id, w)} ${w}w`).join(', ');
