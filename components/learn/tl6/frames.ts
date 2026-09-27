/**
 * 05 · How to choose — one photograph per reader the client's sentence names.
 *
 * Each frame was chosen so the clause could be matched to it with the words covered:
 *
 *   beginning      ss-dsc07118   a teacher bent over one student in a plank, a hand held
 *                                over the student's back: one person being shown a pose
 *   deepening      0146_1        one practitioner alone in a full backbend over a chair:
 *                                a practice that is already strong and exact
 *   to teach       p27-img_0889  two people adjusting a third while two more watch from the
 *                                floor: hands-on teaching, practised on a peer
 *   traditions     ss-dsc07137   a man in a kurta on a low stool, listeners seated on the
 *                                floor before him: learning by sitting and listening
 *
 * None of these is used anywhere else on /learn/. Nobody in the archive is identified, so
 * every alt says what is happening and never who.
 *
 * SIZES ARE THE FILES ON DISK, not the manifest. `ss-dsc07118` is catalogued 7008 × 4672 but
 * its derivatives are 2:3 portrait (1920 × 2880); `p27-img_0889` exists only as its clip's
 * poster, one 1080 × 1920 JPEG with an AVIF twin, so it carries no srcset.
 *
 * The apertures are 4:5 in the row of four and square in the phone's 2 × 2, so each frame
 * has a crop for both (`pos`, `posNarrow`). A 3:2 frame in a 4:5 box renders 1.875 × the
 * box's width, and `sizes` says so, or a retina screen would pull a derivative too small.
 */

export type Tl6Photo = {
  id: string;
  /** derivative widths in /media/stills, largest last; absent for a clip poster */
  widths?: number[];
  /** intrinsic pixels of the largest file */
  w: number;
  h: number;
  /** object-position in the 4:5 row */
  pos: string;
  /** object-position in the phone's square */
  posNarrow: string;
  sizes?: string;
  alt: string;
};

const PORTRAIT = '(max-width: 819.98px) 46vw, (min-width: 1620px) 370px, 23vw';
const LANDSCAPE = '(max-width: 819.98px) 70vw, (min-width: 1620px) 700px, 44vw';

export const PHOTOS: Tl6Photo[] = [
  {
    id: 'ss-dsc07118',
    widths: [480, 960, 1920],
    w: 1920,
    h: 2880,
    pos: '50% 40%',
    posNarrow: '50% 42%',
    sizes: PORTRAIT,
    alt: "A teacher bends over a student holding a plank, one hand just above the student's back to correct the line of the pose",
  },
  {
    id: 'pr-ttc-dsc_0146_1',
    widths: [480, 960, 1620],
    w: 1620,
    h: 1080,
    pos: '56% 50%',
    posNarrow: '56% 50%',
    sizes: LANDSCAPE,
    alt: 'A practitioner arches back over a folding chair in a deep backbend, hands and feet planted on the mat, another working on a chair behind',
  },
  {
    id: 'p27-img_0889',
    w: 1080,
    h: 1920,
    pos: '50% 34%',
    posNarrow: '50% 34%',
    alt: "Two people place their hands on a third person's shoulder and back to adjust a standing posture while two others watch from the floor",
  },
  {
    id: 'ss-dsc07137',
    widths: [480, 960, 1920],
    w: 1920,
    h: 1280,
    pos: '42% 50%',
    posNarrow: '42% 50%',
    sizes: LANDSCAPE,
    alt: 'A man in a light blue kurta sits on a low stool speaking, with listeners seated on the floor before him',
  },
];
