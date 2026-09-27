import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { SX1A_FRAMES, sx1aSrc, sx1aSrcSet } from './frames';

/**
 * SX1A — THE HERO. "The one being read is the page."
 *
 * The client's sentence names three things — the STUDY, PRACTICE and TRANSMISSION of
 * Yoga — and each of the three nouns carries its own photograph, set into the sentence
 * at the size of a word. One of the three is not in the sentence: it is the page, a
 * full-bleed band of the room above the words, and its slot in the sentence stands empty.
 *
 * Scroll, and the photographs change places. The next noun's photograph swells out of
 * the sentence and becomes the page; the one that was the page shrinks back down into
 * its word. By the end of the hero all three have been the page once, in the order the
 * client wrote them, and none of them ever left the sentence for longer than it took to
 * read. That is the argument, made with pictures rather than about them: a COMPLETE
 * discipline — nothing on this page is ever just the big picture.
 *
 * The motion is one way of reading it, not the only one. With JavaScript off this markup
 * is what renders and it is complete: the room full-bleed, a sentence carrying two
 * photographs of what the room is for, and an empty frame marking the noun that is up
 * above. Under `prefers-reduced-motion` the same exchange happens with nothing moving —
 * the page and the stamps dissolve at the same scroll thresholds (see Motion.tsx).
 *
 * COPY. Every string comes out of content/pranava.ts. The sentence is split at the three
 * nouns with `indexOf` on the client's own string — nothing is retyped — and the slots
 * carry no text, so the paragraph's textContent is the client's sentence character for
 * character. If any noun cannot be found the sentence renders whole and unillustrated.
 *
 * The eyebrow is the organisation's full name, lifted from the client's §4 sentence
 * ("Pranava – Center for Indian Culture & Yogic Studies was established…") by pattern,
 * not retyped. If the pattern stops matching, the eyebrow renders as nothing.
 */

/** the client's sentence cut at its three nouns: the gaps between them, and the nouns
    themselves — both sliced out of the client's string, so nothing is retyped here */
function splitSentence(s: string) {
  const gaps: string[] = [];
  const words: string[] = [];
  let from = 0;
  for (const { noun } of SX1A_FRAMES) {
    const at = s.indexOf(noun, from);
    if (at < 0) return null;
    gaps.push(s.slice(from, at));
    words.push(s.slice(at, at + noun.length));
    from = at + noun.length;
  }
  gaps.push(s.slice(from));
  return { gaps, words }; // gaps: [before, between 1-2, between 2-3, after]
}

const FULL_NAME = /–\s(.+?)\swas established/.exec(about.what.body[0])?.[1] ?? null;

export function Sx1aHero() {
  const sub = about.hero.sub;
  const parts = splitSentence(sub);

  return (
    <section className="sx1a" aria-labelledby="sx1a-title" data-active="0">
      <div className="sx1a-track">
        <div className="sx1a-stage">
          {/* THE PAGE. Three plates, one per noun. Without the motion island only the
              first is displayed; the other two are display:none AND loading=lazy, so a
              reader who never gets the exchange never downloads their full-size files. */}
          <div className="sx1a-zone">
            {SX1A_FRAMES.map((f, i) => (
              <div
                className="sx1a-plate"
                data-i={i}
                key={f.id}
                style={
                  {
                    '--sx1a-y': `${f.y}%`,
                    '--sx1a-yn': `${f.yNarrow}%`,
                    '--sx1a-yw': `${f.yWide}%`,
                  } as CSSProperties
                }
              >
                <img
                  src={sx1aSrc(f, 1920)}
                  srcSet={sx1aSrcSet(f)}
                  sizes="100vw"
                  alt={f.alt}
                  width={1920}
                  height={Math.round(1920 / f.ratio)}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {/* THE SENTENCE. Paper, never photograph: the type stands on a ground whose
              contrast is a constant, so no crop at no viewport can put it at risk. */}
          <div className="sx1a-band">
            <div className="sx1a-band__in">
              <div className="sx1a-mast">
                <h1 className="sx1a-h1" id="sx1a-title">
                  {about.hero.heading}
                </h1>
                {FULL_NAME ? (
                  <p className="sx1a-name">
                    <span className="sx1a-name__rule" aria-hidden="true" />
                    {FULL_NAME}
                  </p>
                ) : null}
              </div>

              {parts ? (
                <p className="sx1a-sub" data-active="0">
                  {parts.gaps[0]}
                  {SX1A_FRAMES.map((f, i) => (
                    <span key={f.noun}>
                      <span className="sx1a-term" data-i={i}>
                        <span className="sx1a-slot" data-i={i}>
                          {/* The static stamp. In the static page the first is display:none
                              (its photograph is the page) and lazy, so it is never fetched;
                              the calm (reduced-motion) mode dissolves between all three; the
                              live plates take over from these once their own files have
                              decoded, so there is never an empty frame mid-load. */}
                          <img
                            className="sx1a-stamp"
                            src={sx1aSrc(f, 480)}
                            srcSet={sx1aSrcSet(f, 960)}
                            sizes="(max-width: 719px) 140px, 300px"
                            alt={i === 0 ? '' : f.alt}
                            width={480}
                            height={640}
                            loading={i === 0 ? 'lazy' : undefined}
                            decoding="async"
                            style={
                              {
                                '--sx1a-cx': `${f.stamp.cx * 100}%`,
                                '--sx1a-cy': `${f.stamp.cy * 100}%`,
                                '--sx1a-z': (1 / f.stamp.w).toFixed(3),
                              } as CSSProperties
                            }
                          />
                        </span>
                        {parts.words[i]}
                      </span>
                      {parts.gaps[i + 1]}
                    </span>
                  ))}
                </p>
              ) : (
                <p className="sx1a-sub">{sub}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="sx1a-after">
        <div className="sx1a-after__in">
          <p className="sx1a-support">{about.hero.support}</p>
        </div>
      </div>
    </section>
  );
}
