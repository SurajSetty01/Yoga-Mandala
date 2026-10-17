import Link from 'next/link';
import { about } from '@/content/pranava';

/**
 * 09 PRAṆAVA & SEVA. Kept short, as the client's brief asks. MIXED on the deep ground: the
 * lead, the two sentences and the six initiatives on one side; on the other the Yoga Mandala
 * community itself (its April 2025 gathering, everyone in the room) with the sentence that
 * names it and a clear way through to /yoga-mandala/.
 */
export function A3Seva() {
  const s = about.seva;
  return (
    <section className="a3-sec a3-seva" aria-labelledby="a3-seva-h">
      <div className="a3-rail a3-seva__grid">
        <div className="a3-seva__copy">
          <p className="a3-label a3-label--dark" data-a3r>
            <span className="a3-label__n">09</span> Praṇava &amp; Seva
          </p>
          <h2 className="a3-seva__h" id="a3-seva-h" data-a3r>
            {s.lead}
          </h2>
          <div className="a3-seva__body" data-a3r>
            {s.body.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <p className="a3-seva__prompt" data-a3r>
            {s.prompt}
          </p>
          <ul className="a3-seva__list" data-a3r>
            {s.initiatives.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <figure className="a3-seva__mandala" data-a3r>
          <img
            src="/media/about-v3/p13-0630-1280.webp"
            srcSet="/media/about-v3/p13-0630-640.webp 640w, /media/about-v3/p13-0630-1280.webp 1280w, /media/about-v3/p13-0630-1920.webp 1920w"
            sizes="(min-width: 1000px) 46vw, 100vw"
            width={1280}
            height={960}
            alt="The Yoga Mandala community gathered for a group photograph in a studio, some standing and some seated on the floor"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <p>{s.mandala}</p>
            <Link className="a3-seva__link" href="/yoga-mandala/">
              Visit Yoga Mandala <span aria-hidden="true">→</span>
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
