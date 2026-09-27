import hall640 from './media/hall-640.webp';
import hall960 from './media/hall-960.webp';
import hall1620 from './media/hall-1620.webp';

/**
 * ONE FRAME, WITH ITS WALLS TAKEN DOWN.
 *
 * Source: `pr-ttc-dsc_0064_1`, the Prabodha TTC hall. Five women in a line that recedes
 * from the lower right of the frame to the upper left, each on a mat with a hand on a
 * folding chair. It is the archive's clearest single statement of DEPTH: five figures of
 * five sizes on five mats, and a floor whose two wall lines meet in a corner behind them.
 * Not used anywhere else on the site (grepped across app/, components/ and styles/,
 * excluding the other tournament entrants' folders, before it was chosen).
 *
 * WHAT WAS DONE TO IT, AND WHY THE RESULT LIVES HERE AND NOT IN public/media/
 *   public/media is read-only for this entrant. The three files beside this module are
 *   derivatives of the site's own 1620px encode (which is also the camera original's full
 *   size: `Context/new/…/DSC_0064(1).JPG` is 1620×1080), built by `media/build-hall.py`:
 *
 *   1. people and props: a matte from `isnet-general-use` (rembg), cleaned of the bamboo
 *      pole and the rope ties above the heads, islands under 4,000px dropped;
 *   2. the floor: a polygon on the MEASURED wall base, not an eyeballed one — the red floor
 *      was detected column by column where no one stands in front of it, and fits two
 *      straight lines, y = 459 − 0.11x on the netting wall and y = 508 + 0.27(x − 840) on
 *      the plaster wall, meeting in the corner at (468, 408);
 *   3. alpha = max(people, floor), with the floor alone fading over its outer 13% at the
 *      left and 11% at the right, so where the stage is narrower than the screen the floor
 *      dissolves into the page instead of stopping on a vertical edge;
 *   4. edge colour pulled in from the nearest solid pixel wherever a figure's matte meets
 *      a WALL (never the floor), so the teal netting and the white plaster do not ring the
 *      hair as a fringe on the green.
 *
 *   Everything that remains is the photograph's own pixels. Nothing is drawn, recoloured or
 *   moved; the walls are simply not there, and the page's ground stands where they were.
 *
 * WIDTHS: 640 · 960 · 1620, the last being the source's own full width. The wide stage is
 * capped so the cut-out never renders wider than 1620 CSS px (see the CSS), which makes
 * every desktop tier a downscale at DPR 1.
 *
 * FLAWS, stated rather than hidden: the maroon-top practitioner's leggings carry a small
 * garment wordmark down the calf, legible at the widest tier; all five faces are
 * identifiable, as they are across this whole archive; the frame shows practice, not
 * teaching, which the client's document suggested for this slot — the archive has no
 * frame that can be verified as the founder teaching, so nothing here claims one.
 */
export const HALL = {
  id: 'pr-ttc-dsc_0064_1',
  w: 1620,
  h: 1080,
  src: hall1620.src,
  srcSet: `${hall640.src} 640w, ${hall960.src} 960w, ${hall1620.src} 1620w`,
  /**
   * Checked against every crop this section makes, 320 to 2560 and a landscape phone: all
   * five women are on screen at every width. On phones the nearest is cut by the right
   * edge below the shoulder — her head and turn are what the crop keeps.
   * It names what they are doing and nothing the file cannot show — no place, no count
   * beyond what is visible, no name.
   */
  alt: 'Five women in a line that recedes across a red floor, each on a mat with one hand on a folding chair and the other at her waist, all turning to look the same way.',
} as const;
