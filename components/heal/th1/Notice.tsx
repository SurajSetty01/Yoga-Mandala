import { about } from '@/content/pranava';
import { TH1_CROWN, TH1_GROVE, th1Src, th1SrcSet } from './frames';
import { Th1Motion } from './Th1Motion';

/**
 * HEAL · THE STANDING NOTICE — THE VIEW TILTS UP.
 *
 * What happens: the client's one line for this area is set at the size of the page, and
 * beside it stands a tall window onto four women seated on grass under trees. The screen is
 * held while the reader scrolls, and the view tilts upward: the sitters slide out below, the
 * trunks rise and lean in as a looking-up camera sees them, and it cuts to a palm crown seen
 * from beneath, still rising. In the sentence, "evolving" is the one word whose weight never
 * settles; it thickens and thins, slowly, the whole time the page is open.
 *
 * "An evolving area" asks for growth, not treatment, and looking up is the gesture of
 * something still growing. Neither frame shows practice, therapy or a body being treated —
 * NOTES.md's objection to "a health claim made in pictures" still holds, and is kept.
 *
 * Reduced motion (and a short landscape phone): no held screen, no tilt, no crown. The window
 * shows the grove whole, sitters to canopy in one still, and "evolving" rests at a heavier
 * weight than its neighbours, so the word is still marked.
 *
 * Both images are `loading="lazy"`: the site header prefetches every route, and an eager image
 * here would be fetched by every other page. A lazy image inside the viewport still loads.
 */
export function Th1Notice() {
  const line = about.journey[2].body;
  const m = /\bevolving\b/i.exec(line);
  const lede = m ? (
    <>
      {line.slice(0, m.index)}
      <span className="th1-ev" data-w={m[0]}>
        <span className="th1-ev__w">{m[0]}</span>
      </span>
      {line.slice(m.index + m[0].length)}
    </>
  ) : (
    line
  );

  return (
    <header className="th1" data-th1>
      <div className="th1-stage">
        <div className="th1-rail">
          <div className="th1-say">
            <h1 className="th1-h1">
              <span className="th1-h1__rule" aria-hidden="true" />
              {about.journey[2].name}
            </h1>
            <p className="th1-lede">{lede}</p>
          </div>

          <figure className="th1-fig">
            <div className="th1-win">
              <div className="th1-cam">
                <img
                  className="th1-grove"
                  src={th1Src(TH1_GROVE.id, 1620)}
                  srcSet={th1SrcSet(TH1_GROVE.id)}
                  sizes="(max-width: 899px) 300vw, 1620px"
                  width={TH1_GROVE.w}
                  height={TH1_GROVE.h}
                  alt={TH1_GROVE.alt}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="th1-crown"
                  src={th1Src(TH1_CROWN.id, 1620)}
                  srcSet={th1SrcSet(TH1_CROWN.id)}
                  sizes="(max-width: 899px) 300vw, 1620px"
                  width={TH1_CROWN.w}
                  height={TH1_CROWN.h}
                  alt={TH1_CROWN.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </figure>
        </div>
      </div>
      <Th1Motion />
    </header>
  );
}
