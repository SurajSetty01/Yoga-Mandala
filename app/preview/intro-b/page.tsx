import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Passage } from '@/components/preview/intro-b/Passage';
import { PassageMotion } from '@/components/preview/intro-b/PassageMotion';

/**
 * TOURNAMENT PREVIEW — the Introduction of the Praṇava About page, concept B.
 *
 *      THE SECTION IS A PLACE, AND THE READER WALKS THROUGH IT.
 *
 * The client's note on the shipped section is that the content is decent but
 * it "feels empty because there is no image or visual element on the right
 * side". The answer here is not an image on the right — that is the layout
 * this site exists to avoid, and it would also misread the copy. These five
 * lines are not a caption to a photograph; they are an argument that widens,
 * from one short claim to a stated belief. So the room is put on BOTH sides of
 * the reader and the reader is put inside it:
 *
 *   · four stations of one shala standing as two continuous photographic
 *     walls, with the reader's line of type running down between them;
 *   · the walls stepping back at every station, so the passage opens out by
 *     exactly as much as the argument does, while the reader's own line of
 *     travel stays where it was;
 *   · a band of daylight travelling down the walls with the reader, so the
 *     only part of the room that is fully lit is the part they are level with;
 *   · and at the fifth line the walls stop: the passage gives onto one wide
 *     frame of the whole class with a teacher among them — the only picture in
 *     the section that fills the width, the only one that is never in shade,
 *     and one of only two that move.
 *
 * The light is a `position: sticky` gradient painted in the ground's own
 * colour. There is no scroll listener and no rAF on this route; the only
 * JavaScript is the observer that attaches and releases the two clips. With
 * JavaScript disabled the light still travels and all nine photographs and all
 * five sentences are present; under prefers-reduced-motion the lamp is removed
 * and the corridor stands evenly lit. Neither is a degraded page.
 *
 * Isolated on its own route so three concepts can be judged side by side.
 * Every selector is namespaced `.ib-` in styles/preview-intro-b.css and
 * nothing outside components/preview/intro-b/ is touched. <SiteNav light />
 * because the section opens on paper and the pill takes its paper treatment
 * from the first pixel; <SiteFooter /> so the ground below the section is the
 * real ground and its spacing reads true.
 */
export const metadata = {
  title: 'Introduction — concept B',
  description:
    'Tournament preview: the five lines of the Praṇava introduction walked as a corridor of one shala, lit where the reader is standing.',
};

export default function IntroBPreview() {
  return (
    <>
      <SiteNav light />
      <main className="ib" id="top">
        <Passage />
      </main>
      <PassageMotion />
      <SiteFooter />
    </>
  );
}
