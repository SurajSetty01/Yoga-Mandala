import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';
import { Sx2cIntroduction } from '@/components/preview/sx2c/Introduction';
import { Sx2cMotion } from '@/components/preview/sx2c/Motion';

/**
 * ISOLATED PREVIEW — Praṇava About §01 Introduction, concept sx2c ("a concordance of
 * practice"). See components/preview/sx2c/Introduction.tsx.
 *
 * Rendered in its real position rather than flatteringly: the paper pill above; the tail
 * of a DEEP hero above the section, carrying the page's one <h1> (`about.hero.heading`,
 * which is the hero's own heading on the real page); and the opening of §02 "What Praṇava
 * is" below on its real #12201A ground, with its real register mark and lead, so the
 * section is judged as the paper interval between two dark grounds it will actually be.
 */
export const metadata = {
  title: 'About §01 — concept sx2c',
  robots: { index: false, follow: false },
};

export default function PreviewSx2cPage() {
  return (
    <>
      <SiteNav light />
      <main className="sx2c-page" id="top">
        <header className="sx2c-above">
          <div className="sx2c-above__in">
            <h1 className="sx2c-above__h1">{about.hero.heading}</h1>
            <p className="sx2c-above__sub">{about.hero.sub}</p>
          </div>
        </header>

        <Sx2cIntroduction />

        <section className="sx2c-next" aria-label="Next section">
          <div className="sx2c-next__in">
            <Eyebrow n="02" dark>
              What Praṇava is
            </Eyebrow>
            <p className="sx2c-next__lead">{about.what.lead}</p>
          </div>
        </section>
      </main>
      <Sx2cMotion />
    </>
  );
}
