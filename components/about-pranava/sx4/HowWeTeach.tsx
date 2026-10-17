import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';

/**
 * §04 HOW WE TEACH: a MIXED section (the client's review, October 2026).
 *
 * The client's words, in the client's order, beside ONE photograph of a teacher teaching:
 * a teacher steadying a student's hip in a standing side bend at Samskrithi Sadhana. The frame
 * is a still from the venue's film ven0116, exported whole (9:16) so the raised hand and the
 * feet on the mat are never cropped away.
 *
 * No captions, dates or gallery metadata (the client asked for them to go). Motion is the
 * page's shared reveal only: `data-ap` blocks fade and rise once, driven by AboutMotion, and
 * stay still under reduced motion or without JavaScript.
 */
const PHOTO = '/media/about-v2/ss-ven0116-teach';

export function HowWeTeach() {
  const t = about.teach;

  return (
    <section className="sx4-sec" id="apr-teach">
      <div className="sx4-rail">
        <div className="sx4-grid">
          <header className="sx4-head" data-ap="up">
            <Eyebrow n="04">How we teach</Eyebrow>
            <p className="sx4-lead">{t.lead}</p>
            <p className="sx4-open">{t.open}</p>
          </header>

          <figure className="sx4-fig" data-ap="fade">
            <img
              src={`${PHOTO}-960.webp`}
              srcSet={`${PHOTO}-480.webp 480w, ${PHOTO}-960.webp 960w, ${PHOTO}-1080.webp 1080w`}
              sizes="(min-width: 900px) min(30vw, 36rem), min(26rem, 92vw)"
              width={1080}
              height={1920}
              alt="A teacher in a dark blue shirt stands behind a student on a blue mat, steadying his hip with both hands as the student reaches one arm straight up in a standing side bend."
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="sx4-body">
            <p className="sx4-prompt" id="sx4-prompt" data-ap="up">
              {t.prompt}
            </p>
            <ol className="sx4-list" aria-labelledby="sx4-prompt" data-ap="up">
              {t.practices.map((p, i) => (
                <li className="sx4-item" key={p}>
                  <span className="sx4-item__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="sx4-item__t">{p}</span>
                </li>
              ))}
            </ol>
            <p className="sx4-close" data-ap="up">
              {t.close}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
