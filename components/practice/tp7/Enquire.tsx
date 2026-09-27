import Link from 'next/link';
import { links } from '@/content/site';
import { TP7_BEND, TP7_REST, tp7Src, tp7SrcSet } from './media';
import { Tp7Motion } from './Tp7Motion';

/**
 * 06 · SCHEDULE AND ENQUIRY: THE LIGHTS GO DOWN, AND ONE THING STAYS LIT.
 *
 * The page closes the way a session closes. Two pictures of people at rest sit beside the
 * close: three lying back over bolsters, belts around the feet, and a loop of a row lying
 * back over chairs. As the reader nears the footer the room dims: a green-black veil rises
 * over both pictures, the sand ground itself lowers a shade, and the loop slows. The one
 * thing that does not dim is the enquiry, a filled pill with a lamp's glow rising behind it.
 *
 * No timetable, day, hour, fee, level, address, email or form exists in the client's
 * material, so none appears. `links.emailGeneral` and `links.emailProgrammes` are null and
 * are not rendered. WhatsApp is the only open route; the subject rides in the message.
 *
 * Reduced motion, or no JavaScript: the section rests at a fixed dusk (`--tp7-dim: 0.55`),
 * with the pictures lowered, the glow on and the loop not attached. Complete, and the same
 * meaning without the movement.
 */

const MESSAGE =
  'Hello Praṇava. I am looking for a regular practice. Could you tell me what is running, and when?';

function Arrow({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="10"
      viewBox="0 0 15 10"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PracticeEnquire() {
  return (
    <section className="tp7" id="pc-enquire" aria-labelledby="tp7-h">
      <div className="tp7-in">
        <header className="tp7-head">
          <h2 className="tp7-eyebrow" id="tp7-h">
            <span className="tp7-eyebrow-n">06</span>
            <span className="tp7-eyebrow-rule" aria-hidden="true" />
            Schedule and enquiry
          </h2>
          <p className="tp7-line">
            Begin with <em>a message.</em>
          </p>
        </header>

        <figure className="tp7-room">
          <span className="tp7-pic tp7-pic--rest">
            <img
              className="tp7-img"
              src={tp7Src(TP7_REST, 1920)}
              srcSet={tp7SrcSet(TP7_REST)}
              sizes="(min-width: 900px) min(44vw, 58rem), 92vw"
              width={TP7_REST.w}
              height={TP7_REST.h}
              alt={TP7_REST.alt}
              loading="lazy"
              decoding="async"
            />
          </span>
          <span className="tp7-pic tp7-pic--bend">
            <picture>
              <source type="image/avif" srcSet={`/media/posters/${TP7_BEND.id}.avif`} />
              <img
                className="tp7-img"
                src={`/media/posters/${TP7_BEND.id}.jpg`}
                width={TP7_BEND.w}
                height={TP7_BEND.h}
                alt={TP7_BEND.alt}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <video
              className="tp7-vid"
              muted
              playsInline
              loop
              preload="none"
              tabIndex={-1}
              aria-hidden="true"
              disablePictureInPicture
              data-src={`/media/clips/${TP7_BEND.id}.mp4`}
            />
          </span>
          <figcaption className="tp7-cap">
            <span className="tp7-cap-what">
              Resting over bolsters, belts around the feet. Backbends over folding chairs.
            </span>
            <span className="tp7-cap-when">Prabhava Hatha-Iyengar Immersion, October 2023</span>
          </figcaption>
        </figure>

        <div className="tp7-body">
          <p className="tp7-lead">
            Times and dates are shared by message. Write to Praṇava about where you are in your
            practice, and ask what is running, and when.
          </p>

          <div className="tp7-cta">
            <span className="tp7-lamp">
              <a
                className="tp7-pill"
                href={`${links.whatsapp}?text=${encodeURIComponent(MESSAGE)}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="tp7-pill-main">Enquire about practice</span>
                <span className="tp7-pill-sub">On WhatsApp, {links.whatsappDisplay}</span>
                <span className="sr"> (opens WhatsApp in a new tab)</span>
                <span className="tp7-pill-arw" aria-hidden="true">
                  <Arrow className="tp7-arw" />
                </span>
              </a>
            </span>
            <p className="tp7-more">
              <Link className="tp7-link" href="/contact/">
                Every way to reach Praṇava
                <Arrow className="tp7-arw" />
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Tp7Motion />
    </section>
  );
}
