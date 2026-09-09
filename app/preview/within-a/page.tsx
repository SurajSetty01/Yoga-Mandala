import { SiteNav } from '@/components/SiteNav';
import { Approach } from '@/components/preview/within-a/Approach';
import { Rooms } from '@/components/preview/within-a/Rooms';
import { Board } from '@/components/preview/within-a/Board';
import { WithinAMotion } from '@/components/preview/within-a/WithinAMotion';

/**
 * ISOLATED PREVIEW — concept A for "What Happens Within Yoga Mandala".
 *
 * PREMISE: FOUR ROOMS. The reader goes somewhere, four times.
 *
 * Connect, Learn, Collaborate and Share are four different activities that happen in four
 * different physical settings in this archive — a hall of practitioners standing apart, a
 * study room facing a board, a panel on a stage, a floor where one person's hand is held
 * over another's back. Each is built as a full-viewport place with its own ground, its own
 * light and its own way of holding its five-to-seven items, and each RISES OVER the last so
 * moving between them is a move, not a section break.
 *
 * Then the page leaves the rooms: Community Initiatives is one flat, open, brightly lit
 * plane where all four are visible at once. Four rooms is a mechanic; eight would be a
 * template, and a template is what got the last two builds rejected.
 *
 * Nothing outside `app/preview/within-a/`, `components/preview/within-a/` and
 * `styles/preview-within-a.css` is touched. Every selector is namespaced under `.within-a`.
 *
 * <SiteNav light /> because the page opens on paper and there is no hero here to hand the
 * pill its dark treatment.
 */
export const metadata = { title: 'Preview A — Four Rooms' };

export default function PreviewWithinA() {
  return (
    <>
      <SiteNav light />
      <main className="within-a" id="top">
        <Approach />
        <Rooms />
        <Board />
      </main>
      <WithinAMotion />
    </>
  );
}
