import Link from 'next/link';
import { about } from '@/content/pranava';

/**
 * BEGIN WHERE YOU ARE. The page ends IMAGE-LED: one photograph across the whole width (four
 * practitioners under the banyan and the bamboo at the Prabodha teacher training, each in
 * their own shape, together), the closing words over it and the client's two routes.
 */
export function A3Closing() {
  const c = about.closing;
  return (
    <section className="a3-close" aria-labelledby="a3-close-h">
      <img
        className="a3-close__bg"
        src="/media/about-v3/ttc-0347-1620.webp"
        srcSet="/media/about-v3/ttc-0347-640.webp 640w, /media/about-v3/ttc-0347-1280.webp 1280w, /media/about-v3/ttc-0347-1620.webp 1620w"
        sizes="100vw"
        alt="Four practitioners in side bends and a seated pose beneath a banyan tree and bamboo"
        loading="lazy"
        decoding="async"
      />
      <div className="a3-rail a3-close__in">
        <p className="a3-label a3-label--dark" data-a3r>
          <span className="a3-label__n">10</span> Begin
        </p>
        <h2 className="a3-close__h" id="a3-close-h" data-a3r>
          {c.lead}
        </h2>
        <p className="a3-close__body" data-a3r>
          {c.body}
        </p>
        <p className="a3-close__call" data-a3r>
          {c.call}
        </p>
        <nav className="a3-close__acts" aria-label="Where to go next" data-a3r>
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
      </div>
    </section>
  );
}
