import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { FRAMES, box, dayOf, srcOf, srcSetOf, whenOf, type RegFrame } from './frames';
import { Sx4Motion } from './Sx4Motion';

/**
 * §04 HOW WE TEACH: THE HOLD.
 *
 * What happens: a tall frame stands still in the middle of the section, and in it someone is
 * upside down with their legs straight up. The eight practices scroll past on alternating
 * sides, and each one swaps in another person holding the same inversion in another corner
 * of the room, registered so that the toes never leave one line and the legs never leave one
 * axis. The pose does not move; everything around it does. On the sixth a teacher's hands
 * arrive; on the eighth, "Continue learning beyond a single course", the room itself changes
 * to another course's, and the last two sentences flank that final hold.
 *
 * Then the frame is released and the eight holds stand side by side in the order the camera
 * took them, feet on one line, each with its day and minute: the same pose, again and again,
 * over days and beyond one course. Every photograph is whole and sharp at every scroll
 * position; the swap is a short timed fade, never a mix the reader can stop on.
 *
 * Reduced motion, a short viewport or no JavaScript: the frame shows the first hold, the
 * practices sit around it, and the row of eight closes the section. Nothing is lost but the
 * watching.
 *
 * Server component: every word and every photograph is in the HTML. Sx4Motion is the only
 * client code and it adds nothing the page needs to be complete.
 *
 * RESEARCH, AND WHAT EACH FINDING CHANGED
 *  · Noah Kalina, "Everyday": thousands of self-portraits aligned on facial landmarks so only
 *    time moves. → Landmark REGISTRATION (toes, hip line, leg axis; frames.ts).
 *  · Bernd & Hilla Becher's typologies and ICP's "Magnum Contact Sheets" ("the sense of time
 *    unfolding"): one subject, one framing, in a row. → The ending: the eight holds in a row.
 *  · The Pudding, "Easier scrollytelling with position: sticky": the figure is sticky in CSS
 *    and script only reacts to steps, so every word is in normal flow where the contrast
 *    probe can measure it.
 */

function Layer({ f, sizes, alt, loop = false }: { f: RegFrame; sizes: string; alt: string; loop?: boolean }) {
  const b = box(f);
  /* Sx4Motion attaches the loop on approach; the HTML carries only where it is */
  const clip = loop && f.clip ? { 'data-clip': f.clip.src, 'data-hold': String(f.clip.hold) } : {};
  const [iw, ih] = f.kind === 'poster' ? [1080, 1920] : f.aspect > 1 ? [1620, 1080] : [1920, 2560];
  if (f.kind === 'poster') {
    return (
      <picture className="sx4-layer" style={b.style} data-course={f.course} {...clip}>
        <source type="image/avif" srcSet={`/media/posters/${f.id}.avif`} />
        <img src={srcOf(f)} alt={alt} width={iw} height={ih} loading="lazy" decoding="async" />
      </picture>
    );
  }
  return (
    <div className="sx4-layer" style={b.style} data-course={f.course}>
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

export function HowWeTeach() {
  const t = about.teach;
  /* the client's closing paragraph is two sentences; they flank the final hold. Split on the
     sentence boundary only, so each half is verbatim. */
  const close = t.close.split(/(?<=\.)\s+(?=[A-Z])/);

  return (
    <section className="sx4-sec" id="apr-teach" aria-labelledby="sx4-h">
      <div className="sx4-rail">
        <header className="sx4-head">
          <h2 className="sx4-mark" id="sx4-h">
            <span className="sx4-mark__n">04</span>
            How we teach
          </h2>
          <p className="sx4-lead">{t.lead}</p>
          <p className="sx4-open">{t.open}</p>
          <p className="sx4-prompt" id="sx4-prompt">
            {t.prompt}
          </p>
        </header>

        <div className="sx4-track">
          <div className="sx4-stage">
            <figure className="sx4-fig">
              <div className="sx4-frame">
                {FRAMES.map((f) => {
                  /* the layer's rendered width is W frame-widths. A frame is 0.62·fh wide, and
                     fh is 0.885·(100vh − 196px), about 69% of a 900px viewport's height, on
                     a desktop, 44–62% of it below 900px wide, and never more than 900px. So a
                     layer is ≈ W·45vh wide, ≈ W·30vh on a phone, W·558px at most. */
                  const W = box(f).W;
                  return (
                    <Layer
                      key={f.id}
                      f={f}
                      alt={f.alt}
                      loop
                      sizes={`(max-width: 899px) ${Math.round(W * 30)}vh, (min-height: 1300px) ${Math.round(W * 558)}px, ${Math.round(W * 45)}vh`}
                    />
                  );
                })}
              </div>
              <figcaption className="sx4-cap">
                <span className="sx4-sr">
                  One supported inversion, photographed eight times and registered so that the
                  feet and legs stay in one place, shown one at a time in the order the
                  photographs were taken: seven at Prabhava, a five-day Hatha-Iyengar immersion
                  held from 2 to 6 October 2023, and one at Prabodha TTC.
                </span>
                {FRAMES.map((f, i) => (
                  <span className="sx4-cap__v" aria-hidden="true" key={f.id} data-on={i === 0 ? '' : undefined}>
                    {whenOf(f)}
                  </span>
                ))}
              </figcaption>
            </figure>
          </div>

          <ol className="sx4-steps" aria-labelledby="sx4-prompt">
            {t.practices.map((p, i) => (
              <li className="sx4-step" key={p} data-i={i}>
                <span className="sx4-step__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="sx4-step__t">{p}</span>
              </li>
            ))}
          </ol>

          <div className="sx4-close">
            {close.map((s, i) => (
              <p key={s} className={i === 0 && close.length > 1 ? 'sx4-close__back' : undefined}>
                {s}
              </p>
            ))}
          </div>
        </div>

        {/* The ending: the eight holds side by side, registered like the frame above, so the
            toes sit on one line across the row. Each keeps its own day and minute. */}
        <figure className="sx4-seq" aria-labelledby="sx4-seq-cap">
          <ol className="sx4-seq__row">
            {FRAMES.map((f, i) => {
              const W = box(f).W;
              const d = dayOf(f);
              return (
                <li className="sx4-seq__i" key={f.id} style={{ '--i': String(i) } as CSSProperties}>
                  <div className="sx4-seq__frame">
                    <Layer
                      f={f}
                      alt={f.alt}
                      sizes={`(max-width: 899px) ${Math.round(W * 23)}vw, (min-width: 1620px) ${Math.round(W * 172)}px, ${Math.round(W * 11)}vw`}
                    />
                  </div>
                  <p className="sx4-seq__when">
                    <span className="sx4-seq__day">{d.day}</span>
                    {d.time ? <span>{d.time}</span> : null}
                  </p>
                </li>
              );
            })}
          </ol>
          <figcaption className="sx4-seq__cap" id="sx4-seq-cap">
            Eight holds of one inversion: seven at Prabhava, one at Prabodha TTC
          </figcaption>
        </figure>
      </div>
      <Sx4Motion />
    </section>
  );
}
