import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { FRAMES, box, srcOf, srcSetOf, type RegFrame } from './frames';

/**
 * §04 HOW WE TEACH — THE HOLD.
 *
 * What happens: a tall frame stands still in the middle of the section, and in it someone is
 * upside down with their legs straight up. The eight practices scroll past on alternating
 * sides, and each one replaces the photograph with another person holding an inversion in
 * another corner of the room — registered so that the toes never leave one line and the legs
 * never leave one axis. The pose does not move; everything around it does. On the sixth a
 * teacher's hands arrive; on the eighth, "Continue learning beyond a single course", the room
 * itself changes to another course's. Then the photographs stop replacing each other and
 * settle on top of each other at equal weight: a long exposure in which eight rooms blur and
 * the one thing they share stays standing. The last two sentences flank it.
 *
 * The motion is the time-lapse. The static page is the exposure — which is the same argument
 * made in one image, so reduced motion and no-JavaScript lose the watching, not the idea.
 *
 * Server component: every word and every photograph is in the HTML. Sx4bMotion is the only
 * client code and it adds nothing the page needs to be complete.
 *
 * RESEARCH, AND WHAT EACH FINDING CHANGED
 *  · Noah Kalina, "Everyday" / "7777 days": thousands of self-portraits aligned on five facial
 *    landmarks so only time moves, then averaged over a sliding window. → Landmark
 *    REGISTRATION (toes, hip line, leg axis — frames.ts) and an average at the end.
 *  · Jason Salavon, "The Class of 1988", and Idris Khan, "every… Bernd & Hilla Becher Gable
 *    Sided Houses": a whole set averaged into one print, which shows what the set has in
 *    common and reads as the passage of time. → The finale is an equal-weight average, and
 *    it is also the static page, so reduced motion keeps the idea rather than a still of it.
 *  · Bernd & Hilla Becher's typologies and ICP's "Magnum Contact Sheets" ("the sense of time
 *    unfolding"): one subject, one framing, in a row. → The registered strip under the frame.
 *  · The Pudding, "Easier scrollytelling with position: sticky": the figure is sticky in CSS
 *    and script only reacts to steps. → The first plan pinned the list beside the frame; this
 *    pins only the frame and lets the practices scroll past it, which is also why every word
 *    is in normal flow where the contrast probe can measure it.
 *  · scrollytelling pattern references (sticky figure / scroll-scrubbed sequence): "steps that
 *    do not earn their scroll" → every practice changes the photograph; scrubbed sequences
 *    need pre-rendered frames, not <video> → ffprobe shows the landscape clip has keyframes
 *    at 0s and 8.3s only, so a scrubbed video would stall; the scrub here is continuous
 *    opacity between stills (as SBS "The Boat" scrubs painted frames), never video.
 */

function Layer({ f, n, sizes, alt }: { f: RegFrame; n: number; sizes: string; alt: string }) {
  const b = box(f);
  const style = { ...b.style, '--n': String(n) } as CSSProperties;
  const [iw, ih] = f.kind === 'poster' ? [1080, 1920] : f.aspect > 1 ? [1620, 1080] : [1920, 2560];
  if (f.kind === 'poster') {
    return (
      <picture className="sx4b-layer" style={style} data-course={f.course}>
        <source type="image/avif" srcSet={`/media/posters/${f.id}.avif`} />
        <img src={srcOf(f)} alt={alt} width={iw} height={ih} loading="lazy" decoding="async" />
      </picture>
    );
  }
  return (
    <div className="sx4b-layer" style={style} data-course={f.course}>
      <img
        src={srcOf(f, 960)}
        srcSet={srcSetOf(f)}
        sizes={sizes}
        alt={alt}
        width={iw}
        height={ih}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** A registration mark: a circle and a cross, the printer's sign that plates coincide. */
function Mark({ side }: { side: 'l' | 'r' }) {
  return (
    <svg className={`sx4b-reg sx4b-reg--${side}`} viewBox="0 0 17 17" aria-hidden="true" focusable="false">
      <circle cx="8.5" cy="8.5" r="4.6" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M8.5 0v17M0 8.5h17" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function HowWeTeach() {
  const t = about.teach;
  /* the client's closing paragraph is two sentences; they flank the frame. Split on the
     sentence boundary only, so each half is verbatim. */
  const close = t.close.split(/(?<=\.)\s+(?=[A-Z])/);

  return (
    <section className="sx4b" id="sx4b" aria-labelledby="sx4b-h">
      <div className="sx4b-rail">
        <header className="sx4b-head">
          <h2 className="sx4b-mark" id="sx4b-h">
            <span className="sx4b-mark__n">04</span>
            <span className="sx4b-mark__rule" aria-hidden="true" />
            How we teach
          </h2>
          <p className="sx4b-lead">{t.lead}</p>
          <p className="sx4b-open">{t.open}</p>
          <p className="sx4b-prompt" id="sx4b-prompt">
            {t.prompt}
          </p>
        </header>

        <div className="sx4b-track">
          <div className="sx4b-stage">
            <figure className="sx4b-fig" data-cap="all">
              <div className="sx4b-framebox">
                <div className="sx4b-frame">
                  {FRAMES.map((f, i) => {
                    /* the layer's rendered width is W frame-widths. A frame is 0.62·fh wide, and
                       fh is 0.885·(100vh − 196px) — about 69% of a 900px viewport's height — on
                       a desktop, 44–62% of it below 900px wide, and never more than 900px. So a
                       layer is ≈ W·45vh wide, ≈ W·30vh on a phone, W·558px at most. */
                    const W = box(f).W;
                    return (
                      <Layer
                        key={f.id}
                        f={f}
                        n={i + 1}
                        alt={f.alt}
                        sizes={`(max-width: 899px) ${Math.round(W * 30)}vh, (min-height: 1300px) ${Math.round(W * 558)}px, ${Math.round(W * 45)}vh`}
                      />
                    );
                  })}
                </div>
                <Mark side="l" />
                <Mark side="r" />
                <span className="sx4b-reg sx4b-reg--a" aria-hidden="true" />
              </div>

              {/* The eight frames, registered like the big one: toes on one line across all
                  eight. Hidden from assistive technology in the HTML, because without script
                  it is a picture of the figure above and the figure already has its caption.
                  Sx4bMotion turns each frame into a button: in the static page it lifts that
                  photograph out of the exposure on its own; with motion it scrolls to its
                  practice. */}
              <div className="sx4b-strip" aria-hidden="true">
                {FRAMES.map((f, i) => {
                  const W = box(f).W;
                  return (
                    <div className="sx4b-mini" key={f.id} data-i={i}>
                      <div className="sx4b-mini__frame">
                        <Layer f={f} n={1} alt="" sizes={`${Math.max(2, Math.round(W * 5))}vh`} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <figcaption className="sx4b-cap">
                <span className="sx4b-sr">
                  Eight photographs of people holding supported inversions, registered so that
                  their feet and legs coincide and laid over one another at equal weight: seven
                  from Prabhava, a five-day Hatha-Iyengar immersion held 2–6 October 2023, and one
                  from Prabodha TTC.
                </span>
                <span className="sx4b-cap__v sx4b-cap__v--all" aria-hidden="true">
                  Eight inversions laid over one another — seven at Prabhava, one at Prabodha TTC
                </span>
                <span className="sx4b-cap__v sx4b-cap__v--pbh" aria-hidden="true">
                  Prabhava — a five-day Hatha-Iyengar immersion, 2–6 October 2023
                </span>
                <span className="sx4b-cap__v sx4b-cap__v--ttc" aria-hidden="true">
                  Prabodha TTC
                </span>
              </figcaption>
            </figure>
          </div>

          <ol className="sx4b-steps" aria-labelledby="sx4b-prompt">
            {t.practices.map((p, i) => (
              <li className="sx4b-step" key={p} data-i={i}>
                <span className="sx4b-step__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="sx4b-step__t">{p}</span>
              </li>
            ))}
          </ol>

          <div className="sx4b-close">
            {close.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
