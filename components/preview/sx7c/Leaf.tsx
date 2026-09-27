import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';
import { ILLUMINATION as IL } from './illumination';

/**
 * 07 · FACULTY — a root text and its commentary.
 *
 * The section is set as one leaf of a tripāṭha manuscript, the "threefold reading" in which
 * the root text sits in the middle of the folio and its commentary is written above and
 * beneath it. The client's copy already has that shape: one short aphorism, "Learning is a
 * shared journey.", then two paragraphs that explain it. So the aphorism is the root, at
 * display size, in the middle of the leaf, and the two paragraphs are its commentary,
 * smaller and in the italic, which the Talmud page also uses for the commentary's voice. The
 * layout is the second paragraph's own sentence made visible: every teacher's own
 * experience, written around one larger intention.
 *
 * Down the middle of the leaf runs the column a palm-leaf pothi leaves open for its binding
 * cord, and Jain paper manuscripts go on marking with a red disc long after the hole itself
 * was gone. Every line on the leaf breaks round that column and resumes on the far side. The
 * root sentence breaks there too, at "shared", and the disc sits in the break. As the leaf
 * rises into the screen the disc opens into the leaf's one picture: a single person moving
 * in the middle of a room while everyone either side of him watches, which is the leaf's
 * own layout done by people.
 *
 * Nothing about the faculty is invented: `about.faculty.members` is null and renders as
 * nothing. There is no card, outline, silhouette, count or placeholder anywhere here.
 *
 * Every word is in the static HTML, and the leaf is complete without JavaScript and under
 * reduced motion: the picture is simply open, and the still stands in for the clip.
 * `LeafMotion` only opens the disc and attaches the clip.
 */
export function Leaf() {
  const [rootA, rootB] = splitBefore(about.faculty.lead, 'shared');
  const [upper, lower] = about.faculty.body;
  const [upperA, upperB] = splitAfter(upper, 'expertise.');
  const [lowerA, lowerB] = splitAfter(lower, 'Pranava:');

  return (
    <section className="sx7c-sec" id="sx7c-faculty">
      <div className="sx7c-rail">
        <Eyebrow n="07" dark>
          Faculty
        </Eyebrow>

        <div className="sx7c-leaf">
          {/* THE ROOT. One <p>, whose two runs sit either side of the binding column. The
              literal space keeps its text whole for anyone reading it without the layout. */}
          <p className="sx7c-root">
            <span className="sx7c-root__a">{rootA}</span>{' '}
            <span className="sx7c-disc" aria-hidden="true">
              <i className="sx7c-disc__dot" data-sx7c-disc />
            </span>
            <span className="sx7c-root__b">{rootB}</span>
          </p>

          {/* THE ILLUMINATION, in the binding column. */}
          <figure className="sx7c-fig">
            <div className="sx7c-plate" data-sx7c-plate>
              <div className="sx7c-iris">
                <div className="sx7c-pic">
                  <picture>
                    <source type="image/avif" srcSet={IL.stillAvif} />
                    <img
                      src={IL.still}
                      width={IL.w}
                      height={IL.h}
                      alt={IL.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  {/* src is attached by LeafMotion on approach. No poster attribute: the
                      <img> above IS the poster, and a poster would be fetched even when the
                      clip never plays. */}
                  <video
                    muted
                    playsInline
                    loop
                    preload="none"
                    aria-hidden="true"
                    tabIndex={-1}
                    data-src={IL.video}
                  />
                </div>
              </div>
            </div>
            <figcaption className="sx7c-cap">{IL.caption}</figcaption>
          </figure>

          {/* THE COMMENTARY: above the root, and beneath it. Each paragraph breaks round
              the column at its own hinge, the way the root does: the upper one between its
              two sentences (103 and 104 characters, so the wings weigh the same), the lower
              one at its colon, the intention on one side and what it is for on the other. */}
          <p className="sx7c-com sx7c-com--up">
            <span className="sx7c-com__a">{upperA}</span>{' '}
            <span className="sx7c-com__b">{upperB}</span>
          </p>
          <p className="sx7c-com sx7c-com--down">
            <span className="sx7c-com__a">{lowerA}</span>{' '}
            <span className="sx7c-com__b">{lowerB}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Split a client sentence before `word` without retyping any of it: both runs are slices
 * of the string in content/pranava.ts, so check:copy still sees one verbatim value.
 */
function splitBefore(sentence: string, word: string): [string, string] {
  const i = sentence.indexOf(` ${word}`);
  if (i < 0) return [sentence, ''];
  return [sentence.slice(0, i), sentence.slice(i + 1)];
}

/** The same, splitting after `word` (which keeps its punctuation). */
function splitAfter(sentence: string, word: string): [string, string] {
  const i = sentence.indexOf(`${word} `);
  if (i < 0) return [sentence, ''];
  return [sentence.slice(0, i + word.length), sentence.slice(i + word.length + 1)];
}
