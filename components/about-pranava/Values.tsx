import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from './parts';

/**
 * 09 · WHAT WE VALUE — four words of different lengths, stretched to one measure.
 *
 * Sādhana, Adhyayana, Viveka and Sevā are seven, nine, six and four letters long. Set at
 * one size they rank themselves by length and the shortest of them — Sevā, which is the
 * one about other people — comes last and smallest. So each is set at the size that makes
 * it fill the measure exactly: `--fit` is the reciprocal of that word's advance width in
 * ems at these exact settings, MEASURED IN THE BROWSER and iterated to convergence, and
 * `calc(var(--fit) * 100cqw)` against a container-query parent then holds at every width
 * from 320 to 2560 without a single media query.
 *
 * It is deliberately NOT a four-box grid. It is one block of type four lines deep in which
 * every line is the same length, which is what "we value these four things equally" looks
 * like when it is set rather than stated.
 *
 * THE FACE IS INTER AND THAT IS A CORRECTNESS DECISION. Fraunces has no precomposed ā, so
 * the browser decomposes it and Fraunces' mark positioning fails — the macron is dropped or
 * left orphaned. Sādhana and Sevā both carry one. DESIGN-SYSTEM §1 recorded the same defect
 * for the client's name; this is the same font and the same answer. Rendered at 190px and
 * looked at, Inter sets both correctly.
 *
 * NO DEVANAGARI IS ADDED. The Blueprint mentions Noto Serif Devanagari for Devanagari
 * content; the client wrote these four words in transliteration and nothing else belongs
 * on the page.
 *
 * MEASURED, not estimated. `tools`-free: a canvas 2D context in the live page, with the
 * element's own computed font, weight and letter-spacing, gives the INK bounding box rather
 * than the advance width — which matters, because the advance includes a trailing
 * letter-space and the S of Sādhana and Sevā carries a 0.0625em left side bearing. Both are
 * corrected, so the ink of all four words starts exactly on the left rail and ends exactly
 * on the right one. Stable to four places at 400px and at 4000px:
 *
 *   word        ink width (em)   --fit     left bearing (em)
 *   Sādhana        3.7060        0.2698         0.0625
 *   Adhyayana      4.7814        0.2091         0.0156
 *   Viveka         2.8294        0.3534         0.0156
 *   Sevā           2.0403        0.4901         0.0625
 *
 * At 1440 that is 356px, 276px, 466px and 646px of type, all of them 1319px wide.
 */
const WORDS: Record<string, { fit: number; lsb: number }> = {
  'Sādhana': { fit: 0.2698, lsb: 0.0625 },
  Adhyayana: { fit: 0.2091, lsb: 0.0156 },
  Viveka: { fit: 0.3534, lsb: 0.0156 },
  'Sevā': { fit: 0.4901, lsb: 0.0625 },
};

export function Values() {
  return (
    <section className="apr-s apr-val" id="apr-values">
      <div className="apr-rail">
        <Eyebrow n="09">What we value</Eyebrow>

        <dl className="apr-val__list">
          {about.values.map((v, i) => (
            <div
              className="apr-val__row"
              key={v.name}
              data-ap="up"
              style={
                {
                  '--fit': WORDS[v.name]?.fit ?? 0.25,
                  '--lsb': WORDS[v.name]?.lsb ?? 0,
                  '--apr-d': `${i * 90}ms`,
                } as CSSProperties
              }
            >
              <dt className="apr-val__w">{v.name}</dt>
              <dd className="apr-val__b">{v.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
