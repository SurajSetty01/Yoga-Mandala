'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { journeys, programmes } from '@/content/pranava';
import { links } from '@/content/site';
import { ROUTES } from '@/components/contact/routes';
import { Mark } from '../parts';

/**
 * 04 — THE NAMED PROGRAMMES. The register writes the enquiry.
 *
 * Nothing is known about any of the five programmes, so the honest service is to let the
 * reader ask about the right one. The names stand as ONE column; there is no right-hand
 * column repeating "On enquiry" six times. Beside it lies one enquiry slip, set down on a
 * photograph of the place, and choosing a name rewrites the slip: "…about structured
 * learning" becomes "…about Pragraha", written in letter by letter. The slip's one button
 * opens exactly that message on WhatsApp. With no name chosen it sends the Learn route's
 * own message, unchanged.
 *
 * WHAT IS NOT SAID. No gloss or translation of any name, no duration, fee, schedule, level,
 * outcome or badge. `blurb` is null for every programme and renders as nothing. Blueprint §6
 * places Prayatna under Practice, so nothing here calls these "Learn programmes": the mark
 * says "The named programmes" (§4.3's list) and the slip names only what the reader chose.
 *
 * THE PHOTOGRAPH shows the place — a pavilion at the end of a red paved approach — and the
 * slip lies on the approach. It is one frame on purpose: a second picture would end up
 * beside a name, and a picture beside a name implies we know what the programme is.
 *
 * THE STEM. All five names open on "Pra", set at 48% cream (measured on #12201A in the
 * rendered page, not assumed from the old warm black) so the stems form a seam. The chosen
 * name's stem comes up to full strength: the seam breaks exactly where the reader chose.
 */

const STEM = 'Pra';

/** Blueprint §4.3's "Prāṇāyāma-related programs" — a category, not a name, so it is set in
 *  the text face and does not join the stem seam. */
const PRANAYAMA = 'Prāṇāyāma-related programmes';

/** The Learn doorway from /contact/, read rather than retyped, so the two cannot drift. */
const FOUND = ROUTES.find((r) => r.label === journeys.learn.intent);
// Fail the build loudly rather than send a reader someone else's message.
if (!FOUND) throw new Error('tl5: no Learn route in components/contact/routes.ts');
const LEARN = FOUND;
const CUT = LEARN.message.lastIndexOf('about ') + 'about '.length;
/** "Hello Praṇava. My enquiry is about " */
const LEAD = LEARN.message.slice(0, CUT);
/** "structured learning" — what the slip says until a name is chosen. */
const GENERIC = LEARN.message.slice(CUT).replace(/\.$/, '');

const hrefFor = (name: string | null) =>
  name
    ? `${links.whatsapp}?text=${encodeURIComponent(`${LEAD}${name}.`)}`
    : LEARN.href;


/** Words stay unbreakable; letters inside them are what gets written in. */
function Ink({ text }: { text: string }) {
  let k = 0;
  const words = text.normalize('NFC').split(' ');
  return (
    <span className="tl5-ink" aria-hidden="true">
      {words.map((w, wi) => (
        <span key={wi}>
          {wi > 0 ? ' ' : null}
          <span className="tl5-word">
            {[...w].map((c) => {
              const i = k++;
              return (
                <span className="tl5-l" key={i} style={{ '--k': i } as CSSProperties}>
                  {c}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Tl5Register() {
  const root = useRef<HTMLElement>(null);
  const [pick, setPick] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [live, setLive] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // Reduced motion: no start state at all. The section renders complete and static.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0 },
    );
    // Start state is applied only once we know the observer will release it.
    const raf = requestAnimationFrame(() => {
      setLive(true);
      io.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const choose = (name: string) => {
    setTouched(true);
    setPick((cur) => (cur === name ? null : name));
  };

  const word = pick ?? GENERIC;

  return (
    <section
      ref={root}
      className={`tl5${live ? ' is-live' : ''}${seen ? ' is-in' : ''}`}
      id="the-named-programmes"
    >
      <div className="tl5-in">
        <Mark n="04" dark>
          The named programmes
        </Mark>

        <div className="tl5-grid">
          <div className="tl5-col">
            <p className="tl5-head" aria-hidden="true">
              Programme
            </p>
            <ul className="tl5-names">
              {programmes.map((p, i) => {
                const on = pick === p.name;
                const has = p.name.startsWith(STEM);
                return (
                  <li
                    className="tl5-row"
                    key={p.name}
                    data-on={on ? '' : undefined}
                    style={{ '--i': i } as CSSProperties}
                  >
                    <h3 className="tl5-name">
                      <button
                        type="button"
                        className="tl5-pick"
                        aria-pressed={on}
                        aria-controls="tl5-slip"
                        aria-label={p.name}
                        onClick={() => choose(p.name)}
                      >
                        <span className="tl5-nm">
                          {has ? <span className="tl5-stem">{STEM}</span> : null}
                          <span className="tl5-tail">{has ? p.name.slice(STEM.length) : p.name}</span>
                        </span>
                        <svg className="tl5-mk" width="22" height="12" viewBox="0 0 22 12" aria-hidden="true" focusable="false">
                          <path d="M0 6h19M14 1.5 19.5 6 14 10.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                        </svg>
                      </button>
                    </h3>
                    {/* null for every programme: renders as nothing, never a placeholder */}
                    {p.blurb ? <p className="tl5-blurb">{p.blurb}</p> : null}
                  </li>
                );
              })}
              <li
                className="tl5-row tl5-row--cat"
                data-on={pick === PRANAYAMA ? '' : undefined}
                style={{ '--i': programmes.length } as CSSProperties}
              >
                <h3 className="tl5-name tl5-name--cat">
                  <button
                    type="button"
                    className="tl5-pick"
                    aria-pressed={pick === PRANAYAMA}
                    aria-controls="tl5-slip"
                    onClick={() => choose(PRANAYAMA)}
                  >
                    <span className="tl5-tail">{PRANAYAMA}</span>
                    <svg className="tl5-mk" width="22" height="12" viewBox="0 0 22 12" aria-hidden="true" focusable="false">
                      <path d="M0 6h19M14 1.5 19.5 6 14 10.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </h3>
              </li>
            </ul>
          </div>

          <div className="tl5-place">
            <div className="tl5-frame">
              <img
                className="tl5-photo"
                src="/media/stills/pr-ttc-dsc_0017_1-960.webp"
                srcSet="/media/stills/pr-ttc-dsc_0017_1-480.webp 480w, /media/stills/pr-ttc-dsc_0017_1-960.webp 960w, /media/stills/pr-ttc-dsc_0017_1-1620.webp 1620w"
                sizes="(min-width: 900px) 56vw, 92vw"
                width={1620}
                height={1080}
                alt="An open-sided pavilion with a red tiled roof at the end of a red paved approach, framed by flowering creeper"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="tl5-slip" id="tl5-slip">
              <dl className="tl5-slip__det">
                <dt>Details</dt>
                <dd>On enquiry</dd>
              </dl>
              <p className="tl5-msg" aria-live="polite">
                {LEAD}
                <span
                  className="tl5-slot"
                  key={word}
                  data-write={touched ? '' : undefined}
                >
                  <span className="sr">{word}</span>
                  <Ink text={word} />
                </span>
                .
              </p>
              <div className="tl5-send">
                <a
                  className="tl5-go"
                  href={hrefFor(pick)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Enquire about ${word} on WhatsApp`}
                >
                  Enquire
                  <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                    <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
                <span className="tl5-via">WhatsApp {links.whatsappDisplay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
