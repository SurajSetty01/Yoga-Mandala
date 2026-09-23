import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { CUTS, INQUIRY, SIZES, WHOLE, aperture, markIn, src, srcSet, stepBack } from './frame';

/**
 * §03 · OUR APPROACH — the viewfinder steps back.
 *
 * Four ideas, and emphatically not four boxes: ONE photograph of the hall, shown four
 * times, each time from further away. Tradition is the foundation under a single body —
 * a bolster, a block, a hand on the mat. Practice is that body entire over its chair.
 * Inquiry is the whole row it belongs to. And Transmission is not a fourth crop: the sheet
 * of paper the first three were cut into runs out, and the photograph is there whole, the
 * room the other three were fragments of.
 *
 * That is the content's own asymmetry, not a layout imposed on it. The client's lead names
 * three — rooted in tradition, alive in practice, open to inquiry — and the fourth term is
 * the one that changes what those three are for: a thing that moves between people rather
 * than a fourth idea to hold beside them.
 *
 * Every larger view carries a hairline rectangle marking exactly what the previous view
 * showed, computed from the crops themselves in `frame.ts`. So does the whole photograph.
 *
 * Each aperture's ratio IS its crop's ratio, which means `object-fit: cover` never has
 * anything left to crop and the four pictures are identical in content at 320 and at 2560.
 * Only the fourth needs saying twice: its aperture is 3:2, the file's own ratio, so the
 * complete photograph is on screen at every width with nothing cut off any edge.
 *
 * The client's four names and four paragraphs are verbatim and in the client's order. The
 * only words this component adds are the two step-back notes, and those are arithmetic on
 * the crop rectangles, not claims about the photograph.
 */
export function Approach() {
  /* the client's four, in the client's order; the first three are cut into the sheet and
     the fourth is the photograph the sheet was laid over */
  const views = about.approach.items.slice(0, 3);
  const transmission = about.approach.items[3];
  const wholeMark = markIn(WHOLE, INQUIRY);

  return (
    <section className="aa-s aa-app" id="aa-approach">
      <div className="aa-rail">
        <h2 className="aa-eyebrow">
          <span className="aa-eyebrow__n">03</span>
          <span className="aa-eyebrow__rule" aria-hidden="true" />
          Our approach
        </h2>
        <p className="aa-app__lead" data-aa="up">
          {about.approach.lead}
        </p>
      </div>

      <div className="aa-app__sheet">
        {views.map((item, i) => {
          const { crop, from } = CUTS[i] ?? CUTS[0]!;
          const mark = from ? markIn(crop, from) : null;
          return (
            <div className={`aa-view aa-view--${i + 1}`} key={item.name} data-aa="up">
              <div
                className="aa-win"
                style={
                  {
                    '--aa-ar': aperture(crop),
                    '--aa-cx': crop.x,
                    '--aa-cy': crop.y,
                    '--aa-cw': crop.w,
                    '--aa-ch': crop.h,
                  } as CSSProperties
                }
              >
                {/*
                  The same file in all four apertures, and one `sizes` across the four so
                  the browser fetches it exactly once. Each carries its OWN description,
                  because each shows something different — see `frame.ts`.
                */}
                <img
                  className="aa-win__img"
                  src={src(1620)}
                  srcSet={srcSet()}
                  sizes={SIZES}
                  alt={crop.alt}
                  loading="lazy"
                  decoding="async"
                />
                {mark ? (
                  <span
                    className="aa-win__mark"
                    aria-hidden="true"
                    style={
                      {
                        '--aa-mx': mark.x,
                        '--aa-my': mark.y,
                        '--aa-mw': mark.w,
                        '--aa-mh': mark.h,
                      } as CSSProperties
                    }
                  />
                ) : null}
              </div>

              <div className="aa-view__text">
                <h3 className="aa-view__name">{item.name}</h3>
                <p className="aa-view__body">{item.body}</p>
                {from ? <p className="aa-view__note">{stepBack(crop, from)}</p> : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* THE FOURTH. No aperture, no sheet, no crop — the whole photograph. */}
      <div className="aa-app__whole" data-aa="fade">
        <figure className="aa-whole__fig">
          <img
            className="aa-whole__img"
            src={src(1620)}
            srcSet={srcSet()}
            sizes={SIZES}
            alt={WHOLE.alt}
            loading="lazy"
            decoding="async"
          />
          <span
            className="aa-win__mark"
            aria-hidden="true"
            style={
              {
                '--aa-mx': wholeMark.x,
                '--aa-my': wholeMark.y,
                '--aa-mw': wholeMark.w,
                '--aa-mh': wholeMark.h,
              } as CSSProperties
            }
          />
        </figure>
        {/* The plate is a SIBLING of the figure, not a child of it: the figure is a fixed
            3:2 box with `overflow: hidden`, so a plate inside it would be clipped the
            moment it stops being absolutely positioned — which is exactly what happens on
            a phone, where the whole frame is only about 260px tall and the paragraph has
            to stand under the picture instead of on it. */}
        {transmission ? (
          <div className="aa-whole__plate">
            <span className="aa-whole__n">04</span>
            <h3 className="aa-whole__name">{transmission.name}</h3>
            <p className="aa-whole__body">{transmission.body}</p>
          </div>
        ) : null}
      </div>
      <p className="aa-whole__cap">The same photograph, whole</p>
    </section>
  );
}
