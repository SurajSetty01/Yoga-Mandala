import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { WithinCMasthead } from '@/components/preview/within-c/Masthead';
import { WithinCFigure } from '@/components/preview/within-c/Figure';
import { WithinCInitiatives } from '@/components/preview/within-c/Initiatives';
import { nav } from '@/content/site';

/**
 * TOURNAMENT PREVIEW — What Happens Within, concept C.
 *
 * THE PAGE IS A MANDALA AND THE READER TURNS IT. The four pillars are not four blocks: they
 * are four states of one figure, and the roughly twenty-five items are what each quadrant
 * of that figure holds. The initiatives are the figure set down.
 *
 * Everything is namespaced under `.within-c` and lives in `styles/preview-within-c.css`.
 * `<SiteNav />` is included so the pill can be judged over these grounds, with `light`
 * because the first thing under it is paper rather than a photograph.
 */
export const metadata = {
  title: 'What Happens Within — concept C',
  robots: { index: false, follow: false },
};

const NEXT = nav.find((n) => n.href === '/join/');

export default function WithinConceptCPage() {
  return (
    <>
      <SiteNav light />

      <main className="within-c" id="top">
        <WithinCMasthead />
        <WithinCFigure />
        <WithinCInitiatives />

        {NEXT ? (
          <nav className="wc-next" aria-label="Continue">
            <div className="wc-next__in">
              <p className="wc-next__lbl">Next</p>
              <Link className="wc-next__a" href={NEXT.href}>
                {NEXT.full}
                <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                  <path
                    d="M0 5h12.5M8.5 1L12.8 5 8.5 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </Link>
            </div>
          </nav>
        ) : null}
      </main>
    </>
  );
}
