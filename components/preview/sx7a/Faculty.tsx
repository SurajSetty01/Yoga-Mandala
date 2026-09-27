import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { FRAMES, PROVENANCE, stillSrc, stillSrcSet, type Frame } from './frames';

/**
 * FACULTY, concept A — PHOTOGRAPHY LEADS.
 *
 * THE EVENT. A photograph is pinned beside the words, and each time the next caption rises
 * into view the next photograph is wiped up over it. The five are registered on the
 * STUDENT — the point where support lands sits on the same spot of the pane in every frame —
 * so across the cuts the practice stays still and only the teacher changes: a hand that
 * takes the weight, a hand stopped just above a back, a teacher watching from the frame
 * edge, then nobody. The last frame holds both ends of that at once, one student steadied
 * and the one beside her unaided, and the client's lead lands on it: "Learning is a shared
 * journey." The photographs make the argument; the sentence concludes it.
 *
 * WHY THE LEAD IS LAST. It is the essay's clincher (the LIFE formula's last shot type), set
 * on the one frame that proves it. The section is labelled from its first line by the
 * "Faculty" heading, so nothing is out of order for a screen reader: DOM order is visual
 * order.
 *
 * WHAT IS NOT HERE. `about.faculty.members` is null: no names, no portraits, no cards, no
 * outlines, no count. Nobody is named in any caption or alt. The two paragraphs are read
 * from content, verbatim.
 *
 * TWO LAYOUTS, CHOSEN BY CSS FROM FIRST PAINT. Scripted and motion-OK (`.js` is added
 * pre-paint in app/layout.tsx): the pinned stage. No JavaScript, or reduced motion: the
 * same DOM laid out as a static photo essay, each photograph beside (or above) its own
 * caption, in the same order — the argument is the order, so it survives intact.
 */
export function Faculty() {
  const [first, second] = about.faculty.body;

  return (
    <section className="sx7a" id="sx7a-faculty" aria-labelledby="sx7a-h">
      <div className="sx7a-track">
        <div className="sx7a-stage">
          {FRAMES.map((f, i) => (
            <FramePlate key={f.key} f={f} i={i} />
          ))}
        </div>

        <div className="sx7a-steps">
          {FRAMES.map((f, i) => (
            <div
              className="sx7a-step"
              data-k={f.key}
              key={f.key}
              style={{ ['--sx7a-i' as string]: i + 1, ['--sx7a-o' as string]: 2 * i + 2 }}
            >
              <div className="sx7a-card">
                {i === 0 ? (
                  <h2 className="sx7a-eyebrow" id="sx7a-h">
                    <span className="sx7a-eyebrow__rule" aria-hidden="true" />
                    Faculty
                  </h2>
                ) : null}

                {i === FRAMES.length - 1 ? <Recap /> : null}

                <p className="sx7a-cap" id={`sx7a-cap-${f.key}`}>
                  <em className="sx7a-cap__slug">{f.slug}.</em> {f.caption}
                </p>

                {i === 0 ? <p className="sx7a-body">{first}</p> : null}
                {i === 3 ? <p className="sx7a-body">{second}</p> : null}
                {i === 4 ? (
                  <>
                    <p className="sx7a-lead">{about.faculty.lead}</p>
                    <p className="sx7a-prov">{PROVENANCE}</p>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * THE RECAP: the four frames before the last, each cut down to what the hands are doing —
 * the LIFE essay's close-up, used at the end as the sequence in one line: a teacher's grip,
 * a teacher's hand with air under it, a teacher's face, and then the practitioner's OWN
 * hands on the ropes. Beside the full fifth frame it is the section's scale contrast: one
 * photograph at the size of the screen, four at the size of a thumbnail. Same files as the
 * stage, so on a desktop they are usually already in the cache.
 */
function Recap() {
  const items = FRAMES.filter((f) => f.detail);
  return (
    <ol className="sx7a-strip" aria-label="The four photographs before this one, in detail">
      {items.map((f) => {
        const d = f.detail!;
        const style = {
          '--sx7a-r': f.r,
          '--sx7a-ufx': d.fx,
          '--sx7a-ufy': d.fy,
          '--sx7a-uz': d.z,
        } as CSSProperties;
        return (
          <li className="sx7a-strip__i" key={f.key} style={style}>
            <span className="sx7a-strip__win">
              {f.kind === 'still' ? (
                <img
                  className="sx7a-img"
                  src={stillSrc(f, 480)}
                  srcSet={stillSrcSet(f)}
                  sizes="(max-width: 899px) 240px, 400px"
                  alt={d.alt}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <picture>
                  <source srcSet={`/media/posters/${f.id}.avif`} type="image/avif" />
                  <img className="sx7a-img" src={`/media/posters/${f.id}.jpg`} alt={d.alt} loading="lazy" decoding="async" />
                </picture>
              )}
            </span>
            <span className="sx7a-strip__slug">{f.slug}</span>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * One frame of the stage. `.sx7a-frame` is the moving window and `.sx7a-frame__in` counters
 * it, so during a wipe the picture holds still and only its top edge travels — which is
 * what keeps the registration legible through the cut.
 *
 * `sizes`: the picture is placed wider than its pane whenever the pane is narrower than the
 * source's ratio, so it is sized from the pane's HEIGHT on phones (75vh ≈ the width of a
 * 3:4 frame filling a portrait screen) and from its width on desktop.
 */
function FramePlate({ f, i }: { f: Frame; i: number }) {
  const style = {
    '--sx7a-r': f.r,
    '--sx7a-fx': f.fx,
    '--sx7a-fy': f.fy,
    '--sx7a-z': f.z,
    '--sx7a-fxn': f.fxN,
    '--sx7a-fyn': f.fyN,
    '--sx7a-zn': f.zN,
    '--sx7a-i': i + 1,
    '--sx7a-o': 2 * i + 1,
  } as CSSProperties;

  return (
    <div className="sx7a-frame" data-k={f.key} style={style}>
      <div className="sx7a-frame__in">
        {f.kind === 'still' ? (
          <img
            className="sx7a-img"
            src={stillSrc(f, 960)}
            srcSet={stillSrcSet(f)}
            sizes="(max-width: 899px) 75vh, min(54vw, 80vh)"
            alt={f.alt}
            aria-describedby={`sx7a-cap-${f.key}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <picture>
            <source srcSet={`/media/posters/${f.id}.avif`} type="image/avif" />
            <img
              className="sx7a-img"
              src={`/media/posters/${f.id}.jpg`}
              alt={f.alt}
              aria-describedby={`sx7a-cap-${f.key}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </picture>
        )}
        {f.clip ? (
          /* No `poster`: the <img> beneath IS the poster, and a poster attribute is fetched
             even when src is never set (948 KB once, DESIGN-SYSTEM §1). No src either: the
             motion island attaches `data-src` on approach and releases it a screen past. */
          <video
            className="sx7a-clip"
            data-src={f.clip}
            muted
            playsInline
            loop
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : null}
      </div>
    </div>
  );
}
