import { about } from '@/content/pranava';
import { Eyebrow } from './parts';

/**
 * 01 · INTRODUCTION — five lines opening like a fan.
 *
 * The client's five sentences, in the client's order, none of them touched. The first is
 * the shortest and it is the claim, so it is set largest on the narrowest measure; every
 * line after it is wider and quieter, and the warm paper they are printed on widens with
 * them — a real wedge, clipped to the shape the type makes.
 *
 * There is no photograph. The page has just closed one full-bleed room and is about to
 * open another, and a third picture here would make the first three sections one texture.
 */
export function Introduction() {
  return (
    <section className="apr-s apr-intro" id="apr-intro">
      <div className="apr-rail">
        <Eyebrow n="01">Introduction</Eyebrow>
        <div className="apr-intro__fan">
          {about.intro.map((line, i) => (
            <p
              className={`apr-intro__l apr-intro__l--${i + 1}`}
              key={line}
              data-ap="up"
              style={{ ['--apr-d' as string]: `${i * 70}ms` }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
