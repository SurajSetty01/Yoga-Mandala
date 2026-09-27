/**
 * The two photographs in Praṇava & Seva, concept A — chosen by looking, and each for one
 * reason the other 115 frames in both libraries cannot supply.
 *
 * THE HELD CLIMB — `pr-ttc-dsc_0479`, 960×1440, derivatives 480 and 960 only (checked on
 * disk). A woman climbing into the roof rope of the training hall, standing on a man's
 * shoulder while two women hold her shins. It is the one frame in 1,211 in which one
 * person's practice physically rests on other people, which is exactly the turn the lead
 * sentence makes ("From individual practice to collective responsibility."). It is cut
 * ONCE, at y = 0.51 — her shins, just above the first hand — and the cut was chosen by
 * rendering the two crops and looking, not by reading the manifest's `focal`:
 *   · above it, x 0.26–0.56: nobody in the frame but her, the rope and the roof beam;
 *   · below it, x 0.15–0.88: her shins arrive on his shoulder and into two women's hands.
 * Both are windows onto ONE image at ONE scale (see `--sx8a-W` in the stylesheet), so her
 * legs run straight on across the sentence set in the cut. 960 is the ceiling, so the
 * whole-frame width is capped at 1040 CSS px — the held window is then 759px from 701
 * source pixels, 1.08×, and nothing on the page upscales further than that.
 *
 * Not used live anywhere on the site. It WAS the window of the About hero the client
 * rejected (as `pr-ttc-dsc_0479x`, a 556px crop standing in front of the hall). That
 * design showed it as a view of a place; this one reads it as an act, cut where the act
 * happens, and never puts it in a window or over another photograph.
 *
 * THE ROW UNDER THE MARK — `ss-ven0208`, 960×540, derivatives 480 and 960. Four teachers
 * seated in conversation on a stage, one reading from notes into a microphone, under a
 * wall disc that reads "PRANAVA — Centre for Indian Culture & Yogic Studies". A vertical
 * stack of four holding one up, then a horizontal row of four sharing what they know —
 * and in both, something held above the people beneath it. It is the only unused frame in
 * the Yoga Mandala library that shows the Praṇava mark and a gathering of teachers in one
 * picture. Its high-resolution siblings (`ss-dsc07143`/`07144`) are already on /, on
 * /yoga-mandala/, on /within/ and on /contact/; this one is on no live page. 960 wide, so
 * the plate is capped at 960 CSS px.
 *
 * NO CAPTION NAMES AN EVENT. The TTC folder name is not a confirmed programme and the
 * panel's festival is not recorded as the Trust's; each alt says what is in the picture.
 * Nobody is named.
 *
 * REJECTED, and why:
 *  · p13-img_0519 (the whole class, moving) — same session, same camera position and same
 *    pose as p13-img_0513, which About §02 already opens on. Six sections apart it would
 *    read as a repeat.
 *  · p13-img_0614 / 0615 — the seated studio group again, beside Closing's p13-img_0617.
 *  · pr-pbh-img_5738 (one handstand alone, one steadied, in one frame) — a perfect pairing,
 *    but five other About concepts, two of them the Faculty section directly above this
 *    one, already hold it.
 *  · pr-mov-img_5681 / 5739 — a teacher steadying an inversion; nine and six other About
 *    concepts respectively.
 *  · the Bharatanatyam frames — the highest-scoring in the archive, but "preserving India's
 *    living knowledge traditions" beside a dance frame would claim the Trust as the dance's
 *    keeper, which nothing in the client's material says.
 */

export const HELD = {
  id: 'pr-ttc-dsc_0479',
  widths: [480, 960],
  alt: 'A woman climbs towards a rope anchored to the roof beam of a training hall, standing on a man’s shoulder while two women steady her shins with their hands.',
} as const;

export const ROW = {
  id: 'ss-ven0208',
  widths: [480, 960],
  alt: 'Four teachers seated in a row on a stage in conversation, one reading from notes into a microphone, beneath a wall disc bearing the Praṇava mark.',
} as const;

export const srcOf = (id: string, w: number) => `/media/stills/${id}-${w}.webp`;
export const setOf = (f: { id: string; widths: readonly number[] }) =>
  f.widths.map((w) => `${srcOf(f.id, w)} ${w}w`).join(', ');
