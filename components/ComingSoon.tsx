import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

/**
 * A holding page for a section whose content the client has not supplied yet.
 *
 * The client (14 Oct 2026): "go ahead with the Homepage, About Page, Yoga Mandala and the
 * Contact page for now and have a coming soon page for Learn, Heal and Insight pages so that
 * we could revisit it once my workload eases and I share the content with you."
 *
 * The line under the name is the client's own one-line description of the section (the
 * About page's journey), passed in verbatim. The full pages built earlier are kept in the
 * repo (components/learn, components/heal, components/insights) for when content arrives.
 */
export function ComingSoon({ name, line }: { name: string; line: string }) {
  return (
    <>
      <SiteNav light />
      <main className="cs" id="top">
        <section className="cs-wrap" aria-labelledby="cs-h">
          <h1 className="cs-name" id="cs-h">
            {name}
          </h1>
          <div className="cs-side">
            <p className="cs-line">{line}</p>
            <p className="cs-soon">Coming soon</p>
            <p className="cs-note">This page is being prepared and will open shortly.</p>
            <div className="cs-acts">
              <Link className="cs-btn" href="/contact/">
                Enquire
              </Link>
              <Link className="cs-link" href="/about/">
                About Praṇava
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
