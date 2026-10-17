import { links } from '@/content/site';
import { GROUND, groundSrcSet } from './media';

/**
 * 04 · PRĀṆĀYĀMA. Rebuilt at the owner's review (Oct 2026): one screen. The old version hung
 * a clip of leaves above a wall of type and put the people at the very bottom.
 *
 * IMAGE-LED on paper: the people come first, five women seated on the grass beneath the trees
 * with their hands on their knees, large on the left. On the right the word, set in EB Garamond
 * so its ā and ṇ are drawn correctly, with a slow ring behind it that widens and settles like
 * a breath (still with reduced motion), and the ask.
 */
export function Tp5Pranayama() {
  const message = 'Hello Praṇava. I would like to know more about Prāṇāyāma.';

  return (
    <section className="tp5" id="pc-pranayama" aria-labelledby="tp5-h">
      <div className="tp5-rail tp5-grid">
        <figure className="tp5-pic">
          <img
            src={`/media/stills/${GROUND.id}-960.webp`}
            srcSet={groundSrcSet}
            sizes="(min-width: 1000px) 56vw, 100vw"
            width={1620}
            height={1080}
            alt={GROUND.alt}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="tp5-copy">
          <h2 className="tp5-eyebrow" id="tp5-h">
            <span className="tp5-eyebrow-n">04</span>
            Prāṇāyāma
          </h2>
          <div className="tp5-word-wrap">
            <span className="tp5-breath" aria-hidden="true" />
            <p className="tp5-word">Prāṇāyāma</p>
          </div>
          <p className="tp5-ask">
            <span className="tp5-ask-note">
              Named by Praṇava as part of a sustained practice. No description, format or fee
              for it is published on this site yet.
            </span>
            <a
              className="tp5-ask-link"
              href={`${links.whatsapp}?text=${encodeURIComponent(message)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Ask about Prāṇāyāma <span aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
