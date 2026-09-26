import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Introduction } from '@/components/preview/sx2b/Introduction';

/**
 * TOURNAMENT PREVIEW — Praṇava About, section 01 "Introduction", concept B.
 *
 * The section is rendered under the navigation it will actually live beneath (`light` is
 * the state the hero's choreography leaves the pill in by the time section 01 arrives),
 * and it hands over to the real opening of "What Praṇava is" on its own #12201A ground,
 * so the seam at the bottom of the section can be judged rather than imagined.
 *
 * That block used to carry a line of editorial commentary about itself — "02 · What
 * Praṇava is — the ground this section hands over to" — which is a page explaining its
 * own production to the reader.  It now carries what actually comes next: the section
 * number and the client's own lead, split at its OWN full stops with a lookbehind so the
 * three lines concatenate back to the sentence character for character.  Nothing is
 * retyped and nothing is added.
 *
 * Everything is namespaced `.sx2b-` in styles/preview-sx2b.css. Nothing outside
 * app/preview/sx2b/, components/preview/sx2b/ and that one stylesheet is touched.
 */
export const metadata = {
  title: 'Introduction — concept B',
  description: 'Section preview: the page opens outward from one vertical seam.',
};

export default function Sx2bPreview() {
  const places = about.what.lead.split(/(?<=\.)\s+/);

  return (
    <>
      <SiteNav light />
      <main id="top">
        {/*
          The page's one <h1>, visually hidden. On the real page the hero above this
          section owns it; this route does not own the hero, and a preview with no <h1>
          at all is a different document outline from the one being judged.
        */}
        <h1 className="sr">{about.hero.heading}</h1>
        <Introduction />
        <div className="sx2b-after">
          <p className="sx2b-after__n">
            <span>02</span>
            <span>What Praṇava is</span>
          </p>
          <div className="sx2b-after__places">
            {places.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
