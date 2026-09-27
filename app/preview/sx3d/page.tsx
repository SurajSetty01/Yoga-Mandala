import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Sx3dApproach } from '@/components/preview/sx3d/Approach';
import { Sx3dMotion } from '@/components/preview/sx3d/Sx3dMotion';

/**
 * TOURNAMENT PREVIEW — Praṇava / About / §03 "Our approach", concept sx3d (spatial).
 *
 * A room arrives drawn flat and stands up around a teacher and a student: floor, walls and
 * ceiling fold up in the order the lead names them, and the far wall — Transmission — is
 * the one surface that never moves, and the only picture in the room that does.
 *
 * Rendered honestly. The pill above is the paper treatment the real page gives it. Above
 * the section is the tail of the approved §02 on its own DEEP ground, ending on §02's own
 * closing sentence, so the seam is judged against what it will actually meet; below it is
 * the opening of §04 on WARM ground, so the section's bottom spacing is not the end of the
 * document and no two neighbours share a ground. Both bands carry the real sections' own
 * register mark and sentence, verbatim, and nothing more — this route does not design
 * either of them.
 *
 * The page's one <h1> is the client's page heading, off-screen: on the real page the hero
 * owns it and this section is an <h2> beneath it.
 */
export const metadata = {
  title: 'Preview sx3d — The room',
  description:
    'Concept D for Pranava About §03: a laid-out room folds up around a teacher and a student — floor, walls and ceiling in the order the lead names them.',
  robots: { index: false, follow: false },
};

export default function PreviewSx3d() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx3d-before">
          <div className="sx3d-before__rail">
            <p className="sx3d-before__line">{about.what.intention}</p>
          </div>
        </div>

        <Sx3dApproach />

        <div className="sx3d-after">
          <div className="sx3d-after__rail">
            <h2 className="sx3d-mark">
              <span className="sx3d-mark__n">04</span>
              <span className="sx3d-mark__rule" aria-hidden="true" />
              How we teach
            </h2>
            <p className="sx3d-after__lead">{about.teach.lead}</p>
          </div>
        </div>
      </main>
      <Sx3dMotion />
    </>
  );
}
