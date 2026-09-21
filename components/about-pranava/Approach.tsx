import { about } from '@/content/pranava';
import { Eyebrow, FRAMES, Shot } from './parts';

/**
 * 03 · OUR APPROACH — three columns standing, and a fourth lying across their feet.
 *
 * The brief's own note on this section is "four, and the fourth breaks the pattern", and
 * the client's text says why: Tradition, Practice and Inquiry are three ideas, and
 * Transmission is not an idea at all — it is the thing that carries the other three
 * between two people. So it is not a fourth column. It is a beam, on the reversed ground,
 * laid across the feet of the three and pulled up over them by a negative margin, and it
 * is the only one of the four given a photograph: a hand held above a student's back.
 *
 * Nothing here is invented — the four names and the four paragraphs are the client's, in
 * the client's order, and the split into three-plus-one is a layout, not an edit.
 */
export function Approach() {
  const [tradition, practice, inquiry, transmission] = about.approach.items;
  const standing = [tradition, practice, inquiry];

  return (
    <section className="apr-s apr-app" id="apr-approach">
      <div className="apr-rail">
        <Eyebrow n="03">Our approach</Eyebrow>
        <p className="apr-display apr-lead" data-ap="up">
          {about.approach.lead}
        </p>

        <div className="apr-app__cols">
          {standing.map((item, i) => (
            <article
              className="apr-app__col"
              key={item.name}
              data-ap="up"
              style={{ ['--apr-d' as string]: `${i * 90}ms` }}
            >
              <span className="apr-app__n">{`0${i + 1}`}</span>
              <h3 className="apr-app__name">{item.name}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>

      {/* The beam bleeds edge to edge, but its words travel inside the page's own rail so
          they start on exactly the same axis as the three columns above them — at 2531 a
          `margin-left: auto` inside a full-bleed half put them 90px off that axis. The
          photograph is absolutely positioned over the right of the beam, which is what
          lets the beam bleed and the type stay on the rail at the same time. */}
      <div className="apr-app__beam" data-ap="fade">
        <div className="apr-app__beamType apr-rail">
          <span className="apr-app__n">04</span>
          <h3 className="apr-app__name">{transmission.name}</h3>
          <p>{transmission.body}</p>
        </div>
        <figure className="apr-app__beamFig">
          <Shot frame={FRAMES.hand} sizes="(max-width: 899px) 100vw, 50vw" />
        </figure>
      </div>
    </section>
  );
}
