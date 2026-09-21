import { about } from '@/content/pranava';
import { CLASS_WIDE, GUIDE_CLIP } from './frames';
import { Mark, Says, Shot } from './parts';

/**
 * 03 — THE SENTENCE TURNS WHEN THE LENS DOES.
 *
 * This is the page's spine, and it is the client's, not ours:
 *
 *   "Teacher education, for us, is not only about learning how to conduct a class.
 *    It is about developing the understanding, discernment and responsibility required
 *    to guide another person's practice."
 *
 * A refusal and an answer. The home page already argues a refusal typographically — one
 * typeface in two voices — so this one is argued PHOTOGRAPHICALLY instead: the two halves
 * of the sentence are carried by two frames at two distances, and the cut between them is
 * the whole mechanic.
 *
 *   the first clause   a wide still of a cohort being addressed, and the words set small
 *                      beside it. A class, conducted. Nothing is wrong with it.
 *   the second clause  a tall frame that RISES OVER the wide one's corner and is the only
 *                      moving picture on the page — a teacher's hands actually working —
 *                      with the words set large. The room becomes two people.
 *
 * Big picture with small type, answered by small picture with big type. Read the section
 * top to bottom and the camera walks in.
 *
 * The clauses are sliced out of `about.teach.close` at its own sentence boundary rather
 * than retyped, so neither half can ever drift from the client's wording.
 *
 * THE LOOP obeys the same contract as the rest of the site: `muted`, `playsinline`, `loop`,
 * `preload="none"`, the real source in `data-src`, attached by the island only once the
 * frame has been on screen for a moment and released when it is well past. There is NO
 * `poster` attribute — the <img> beneath is the poster, is never removed, and a poster
 * attribute is fetched even when `src` is never set. That cost this site 948 KB on every
 * device once already.
 */

const CUT = about.teach.close.indexOf('. ') + 1;
const CLAUSE_A = about.teach.close.slice(0, CUT);
const CLAUSE_B = about.teach.close.slice(CUT).trim();

export function Spine() {
  return (
    <section className="ln-sp" id="what-teacher-education-is">
      <div className="ln-sp__in">
        <Mark n="02" dark>
          What teacher education is
        </Mark>

        <div className="ln-sp__grid">
          <figure className="ln-sp__wide" data-ln="fig">
            <div className="ln-sp__wideMask">
              <Shot
                className="ln-sp__img"
                frame={CLASS_WIDE}
                sizes="(max-width: 899px) 100vw, 62vw"
              />
            </div>
            <figcaption>
              <Says>{CLASS_WIDE.alt}</Says>
            </figcaption>
          </figure>

          <p className="ln-sp__a" data-ln="up">
            {CLAUSE_A}
          </p>

          <figure className="ln-sp__close" data-ln="fig">
            <div className="ln-sp__closeMask">
              <picture>
                <source type="image/avif" srcSet={`/media/posters/${GUIDE_CLIP.id}.avif`} />
                <img
                  className="ln-sp__img"
                  src={`/media/posters/${GUIDE_CLIP.id}.jpg`}
                  width={GUIDE_CLIP.w}
                  height={GUIDE_CLIP.h}
                  style={{ objectPosition: GUIDE_CLIP.pos }}
                  loading="lazy"
                  decoding="async"
                  alt={GUIDE_CLIP.alt}
                />
              </picture>
              <video
                className="ln-sp__vid"
                muted
                playsInline
                loop
                preload="none"
                tabIndex={-1}
                aria-hidden="true"
                data-src={`/media/clips/${GUIDE_CLIP.id}.mp4`}
                width={GUIDE_CLIP.w}
                height={GUIDE_CLIP.h}
                style={{ objectPosition: GUIDE_CLIP.pos }}
              />
            </div>
            <figcaption>
              <Says>{GUIDE_CLIP.alt}</Says>
            </figcaption>
          </figure>

          <p className="ln-sp__b" data-ln="up">
            {CLAUSE_B}
          </p>
        </div>
      </div>
    </section>
  );
}
