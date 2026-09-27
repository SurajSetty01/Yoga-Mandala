import { about } from '@/content/pranava';
import { TH1_HAND, TH1_HELD, TH1_REST, th1Src, th1SrcSet } from './frames';
import { Th1Clip } from './Th1Clip';

/**
 * HEAL · THE HERO: CARE, IN THREE PLATES.
 *
 * What it says: the area is Yoga and allied approaches to health, and the pictures show what
 * that looks like when it is done responsibly: a body held by props, a teacher's attention,
 * and rest. The page's name is set large, as on Learn and Practice, with the client's line for
 * the area directly under it; the two stand together as one block, centred on the plates
 * beside them. Each plate carries its own short caption, set just under the photograph.
 *
 * What happens: the plates open in order, each widening from a band to its full height while
 * its picture settles, once, on arrival, and its caption follows. The first plate is a clip
 * that plays on approach: a supported shoulderstand held almost still on a bolster while a
 * helper's hand comes in at the edge. Nothing loops except the clip, and no type moves.
 *
 * Reduced motion: no opening, and the clip is never attached; the first plate is its own first
 * frame as a still image, so the composition is complete and identical in layout. The same
 * holds with scripting off.
 *
 * Content: `about.journey[2]` (name and body), verbatim. The captions describe the photographs,
 * are not client copy, and name nobody. Images are `loading="lazy"`: the site header prefetches
 * every route, and an eager image here would be fetched by other pages; a lazy image already
 * in the viewport still loads at once.
 */
const SIZES = '(max-width: 899px) 44vw, 26rem';

export function Th1Care() {
  const { name, body } = about.journey[2];

  return (
    <header className="th1" data-th1>
      <div className="th1-rail">
        <div className="th1-say">
          <h1 className="th1-h1">{name}</h1>
          <p className="th1-deck">{body}</p>
        </div>

        <div className="th1-plates">
          <figure className="th1-plate th1-plate--held" data-th1-held>
            <div className="th1-frame">
              <picture>
                <source type="image/avif" srcSet={TH1_HELD.avif} />
                <img
                  className="th1-img"
                  src={TH1_HELD.jpg}
                  width={TH1_HELD.w}
                  height={TH1_HELD.h}
                  alt={TH1_HELD.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <video
                className="th1-clip"
                data-src={TH1_HELD.clip}
                muted
                playsInline
                loop
                preload="none"
                disablePictureInPicture
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
            <figcaption className="th1-cap">{TH1_HELD.caption}</figcaption>
          </figure>

          <figure className="th1-plate th1-plate--hand">
            <div className="th1-frame">
              <img
                className="th1-img"
                src={th1Src(TH1_HAND.id, 960)}
                srcSet={th1SrcSet(TH1_HAND.id)}
                sizes={SIZES}
                width={TH1_HAND.w}
                height={TH1_HAND.h}
                alt={TH1_HAND.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="th1-cap">{TH1_HAND.caption}</figcaption>
          </figure>

          <figure className="th1-plate th1-plate--rest">
            <div className="th1-frame">
              <img
                className="th1-img"
                src={th1Src(TH1_REST.id, 960)}
                srcSet={th1SrcSet(TH1_REST.id)}
                sizes={SIZES}
                width={TH1_REST.w}
                height={TH1_REST.h}
                alt={TH1_REST.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="th1-cap">{TH1_REST.caption}</figcaption>
          </figure>
        </div>
      </div>
      <Th1Clip />
    </header>
  );
}
