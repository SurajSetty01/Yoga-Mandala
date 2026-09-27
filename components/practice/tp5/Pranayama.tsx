import { links } from '@/content/site';
import { AIR, GROUND, groundSrcSet } from './media';
import { Tp5Air } from './Tp5Air';

/**
 * 04 · PRĀṆĀYĀMA — ONLY THE AIR MOVES.
 *
 * The section is the height between a canopy and the ground. Leaves hang from its top edge
 * in a small window and move on their own loop, the one thing on /practice/ that runs on a
 * clock and not on the reader. Five people sit on grass at its bottom edge, perfectly still,
 * with the trunks of their trees rising out of the frame toward the leaves. The word stands
 * in the air between the two, and the honest mark sits under it.
 *
 * Nothing here depicts a technique: no diagram, no count, no pulse. Prāṇāyāma is named in
 * the client's material and described nowhere, so the section carries the word, the air,
 * and one line saying no description is published yet.
 *
 * The word is set in Inter: it carries ā three times and ṇ once, which Fraunces drops.
 *
 * Reduced motion, no JavaScript, Save-Data: the clip is never attached and its first frame
 * stands in its place. The composition is the same; only the leaves hold still.
 */
export function Tp5Pranayama() {
  const message = 'Hello Praṇava. I would like to know more about Prāṇāyāma.';

  return (
    <section className="tp5" id="pc-pranayama" aria-labelledby="tp5-h">
      <div className="tp5-rail">
        <h2 className="tp5-eyebrow" id="tp5-h">
          <span className="tp5-eyebrow-n">04</span>
          <span className="tp5-eyebrow-rule" aria-hidden="true" />
          Prāṇāyāma
        </h2>

        <figure className="tp5-air">
          <div className="tp5-air-win">
            <picture>
              <source type="image/avif" srcSet={`/media/posters/${AIR.id}.avif`} />
              <img
                className="tp5-air-img"
                src={`/media/posters/${AIR.id}.jpg`}
                width={AIR.w}
                height={AIR.h}
                alt={AIR.alt}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <video
              className="tp5-air-vid"
              muted
              playsInline
              loop
              preload="none"
              tabIndex={-1}
              aria-hidden="true"
              disablePictureInPicture
              data-src={`/media/clips/${AIR.id}.mp4`}
            />
          </div>
          <figcaption className="tp5-cap">Leaves moving in the air.</figcaption>
        </figure>

        <div className="tp5-mid">
          <h3 className="tp5-word">Prāṇāyāma</h3>
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
              Ask about Prāṇāyāma
              <svg
                className="tp5-ask-arw"
                width="15"
                height="10"
                viewBox="0 0 15 10"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M0 5h12.5M8.5 1L12.8 5 8.5 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
          </p>
        </div>
      </div>

      <figure className="tp5-ground">
        <img
          className="tp5-ground-img"
          src={`/media/stills/${GROUND.id}-1620.webp`}
          srcSet={groundSrcSet}
          sizes="(min-width: 1620px) 1620px, 100vw"
          width={GROUND.w}
          height={GROUND.h}
          alt={GROUND.alt}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <Tp5Air />
    </section>
  );
}
