import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Sx4dHowWeTeach } from '@/components/preview/sx4d/HowWeTeach';
import { Sx4dMotion } from '@/components/preview/sx4d/Sx4dMotion';

/**
 * TOURNAMENT PREVIEW — Praṇava / About / §04 "How we teach", concept sx4d (spatial).
 *
 * A floor five days deep. One immersion, laid out the way its own camera recorded it —
 * each photograph standing in the row of the day it was taken — and the reader walks it,
 * day by day, to the one frame standing past the end of the course.
 *
 * Rendered honestly. The pill above is the paper treatment the real page gives it. Above
 * the section is the tail of §03 on PAPER, carrying §03's own lead verbatim; below it is
 * the opening of §05 on DEEP ground, so the section's spacing is judged against what it
 * will actually meet and no two neighbours share a ground (this section is WARM). Neither
 * band designs its section; each carries the real section's register mark and nothing
 * the client did not write.
 *
 * The page's one <h1> is the client's page heading, off-screen: on the real page the hero
 * owns it and this section is an <h2> beneath it.
 */
export const metadata = {
  title: 'Preview sx4d — Five days deep',
  description:
    'Concept D for Pranava About §04: a floor five days deep, each photograph standing on the day it was taken, walked day by day to the one frame past the end of the course.',
  robots: { index: false, follow: false },
};

export default function PreviewSx4d() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx4d-before">
          <div className="sx4d-before__rail">
            <h2 className="sx4d-mark">
              <span className="sx4d-mark__n">03</span>
              <span className="sx4d-mark__rule" aria-hidden="true" />
              Our approach
            </h2>
            <p className="sx4d-before__line">{about.approach.lead}</p>
          </div>
        </div>

        <Sx4dHowWeTeach />

        <div className="sx4d-after">
          <div className="sx4d-after__rail">
            <h2 className="sx4d-mark sx4d-mark--dark">
              <span className="sx4d-mark__n">05</span>
              <span className="sx4d-mark__rule" aria-hidden="true" />
              The Praṇava journey
            </h2>
          </div>
        </div>
      </main>
      <Sx4dMotion />
    </>
  );
}
