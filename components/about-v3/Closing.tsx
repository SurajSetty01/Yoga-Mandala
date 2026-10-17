import Link from 'next/link';
import { about } from '@/content/pranava';

/**
 * 10 BEGIN. The page ends on a card: the photograph (four practitioners under the banyan and
 * the bamboo at the Prabodha teacher training) settles from a slight zoom behind it as the
 * section arrives, and a paper card floats over its left side holding the closing words, the
 * call and the client's two routes, with a third, quieter way to simply ask.
 */
export function A3Closing() {
  const c = about.closing;
  return (
    <section className="a3-close" aria-labelledby="a3-close-h">
      <div className="a3-close__bgwrap">
        <img
          className="a3-close__bg"
          data-a3-zoom
          src="/media/about-v3/ttc-0347-1620.webp"
          srcSet="/media/about-v3/ttc-0347-640.webp 640w, /media/about-v3/ttc-0347-1280.webp 1280w, /media/about-v3/ttc-0347-1620.webp 1620w"
          sizes="100vw"
          alt="Four practitioners in side bends and a seated pose beneath a banyan tree and bamboo"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="a3-rail a3-close__in">
        <div className="a3-close__card" data-a3r>
          <p className="a3-label">
            <span className="a3-label__n">10</span> Begin
          </p>
          <h2 className="a3-close__h" id="a3-close-h">
            {c.lead}
          </h2>
          <p className="a3-close__body">{c.body}</p>
          <p className="a3-close__call">{c.call}</p>
          <nav className="a3-close__acts" aria-label="Where to go next">
            {c.actions.map((a, i) => (
              <Link
                key={a.href}
                className={i === 0 ? 'a3-close__btn' : 'a3-close__btn a3-close__btn--line'}
                href={a.href}
              >
                {a.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </nav>
          <Link className="a3-close__ask" href="/contact/">
            Or simply enquire
          </Link>
        </div>
      </div>
    </section>
  );
}
