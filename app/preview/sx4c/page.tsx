import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Journey } from '@/components/about-pranava/Journey';
import { Sx4cTeach } from '@/components/preview/sx4c/Teach';
import { Sx4cMotion } from '@/components/preview/sx4c/Motion';

/**
 * PREVIEW — Praṇava About, "How we teach", concept sx4c: a ruled page that writes itself
 * while five days pass in its margin. See components/preview/sx4c/Teach.tsx.
 *
 * Rendered in place. Above it is a marked stand-in for "Our approach", whose design is
 * still being decided, on paper — long enough that this section's head margin reads true.
 * Below it is the REAL live §05, "The Praṇava journey", imported rather than copied and
 * inside `.apr` so its own stylesheet applies; its motion island is absent, so it shows its
 * finished state. The seam between this section's closing sentence and that deep ground is
 * part of what is being judged.
 *
 * The hero owns the page's `<h1>` on /about/ and is not rendered here, so the harness
 * supplies one, visually hidden, from the client's own heading.
 */
export const metadata = {
  title: 'How we teach — concept sx4c',
  robots: { index: false, follow: false },
};

export default function Sx4cPreviewPage() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx4c-prev">
          <p className="sx4c-prev__label">Stand-in · the section before, “Our approach”, ends here</p>
        </div>

        <div className="apr">
          <Sx4cTeach />
          <Journey />
        </div>
      </main>
      <Sx4cMotion />
    </>
  );
}
