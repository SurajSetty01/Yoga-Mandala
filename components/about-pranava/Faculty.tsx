import { about } from '@/content/pranava';
import { Eyebrow, FRAMES, Shot } from './parts';

/**
 * 07 · FACULTY — four teachers at four depths, none of them named.
 *
 * THE PROBLEM. The brief asks for "faculty cards with photograph, name, areas of teaching
 * and a link to the profile" and supplies none of the four. `about.faculty.members` is
 * `null`. The three wrong answers are all easy: invent people; draw four empty card
 * outlines with "Coming soon" in them; or quietly drop the section. The client's two
 * sentences about shared teaching are real, delivered content and deleting them would be
 * the worst of the three.
 *
 * THE ANSWER. What the client has not supplied is the roster. What the archive HAS
 * documented — and what those two sentences are actually about — is the act. So the section
 * shows teaching rather than teachers: four frames, four rooms, four different people
 * working in four different ways. Two teachers setting one student's shoulder and ribs at
 * the same moment; one teacher with one student while the class watches; one crouched
 * beside a seated practitioner; one standing still in the middle of a room reading a row of
 * backs. They sit at four depths in one field and drift at four rates as the section
 * passes, so they read as many people at work in the same moment rather than as a row of
 * portraits waiting for captions.
 *
 * Nothing is named, nothing is counted, and there is no card, outline, silhouette or
 * placeholder anywhere in it. When the client sends names, photographs and links, they
 * become a fifth thing on this page and this field stays true.
 */
const FIELD = [
  { k: 'a', frame: FRAMES.facPair },
  { k: 'b', frame: FRAMES.facSeated },
  { k: 'c', frame: FRAMES.facRoom },
  { k: 'd', frame: FRAMES.facWatch },
] as const;

export function Faculty() {
  return (
    <section className="apr-s apr-s--deep apr-fac" id="apr-faculty">
      <div className="apr-rail">
        <Eyebrow n="07" dark>
          Faculty
        </Eyebrow>
        <p className="apr-display apr-fac__lead" data-ap="up">
          {about.faculty.lead}
        </p>

        <div className="apr-fac__field">
          {FIELD.map(({ k, frame }, i) => (
            <figure
              className={`apr-fac__f apr-fac__f--${k}`}
              key={frame.id}
              data-ap="fade"
              style={{ ['--apr-d' as string]: `${i * 120}ms` }}
            >
              <Shot frame={frame} sizes="(max-width: 899px) 50vw, 30vw" />
            </figure>
          ))}
        </div>

        <div className="apr-fac__words">
          {about.faculty.body.map((p, i) => (
            <p key={p} data-ap="up" style={{ ['--apr-d' as string]: `${i * 90}ms` }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
