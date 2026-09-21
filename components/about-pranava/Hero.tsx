import { about } from '@/content/pranava';
import { FRAMES, Shot } from './parts';

/**
 * HERO — one room, cut into three, whose horizons close into one as you descend.
 *
 * The three panes carry thirds of a SINGLE photograph: each `<img>` is three panes wide and
 * offset by its own pane index, so pane 0 shows the left third of the frame, pane 1 the
 * middle and pane 2 the right. At rest each third is translated vertically by a different
 * amount and a sand seam marks each cut; `--apr-close` resolves the offsets to zero and
 * fades the seams out, and the room becomes continuous. Transform and opacity only.
 *
 * The frame is `ss-dsc07127`, the one picture in the archive with Praṇava's own roundel
 * physically on the wall behind the group — so the hero says whose room this is without a
 * caption. It is encoded to 1920, which is why the band is 44svh rather than a full screen.
 *
 * TYPE IS NEVER ON THE PICTURE HERE. The home page's hero already owns type-inside-a-moving-
 * photograph, and putting this one's on the reversed ground makes its contrast a constant
 * rather than a bet on where the skylight falls at 1024×768.
 *
 * The <h1> is the client's own page title. It is set at label scale on purpose: the
 * sentence underneath it is the one worth reading at size, and an <h1> is a rank, not a
 * font-size.
 */
export function Hero() {
  /* the three offsets, as a percentage of each pane image's own height so the picture
     covers its pane at every band height — see the note in styles/about-pranava.css. */
  const panes = [
    { i: 0, off: -12 },
    { i: 1, off: 7 },
    { i: 2, off: -4.5 },
  ];

  return (
    <header className="apr-s apr-s--deep apr-hero">
      <div className="apr-rail">
        <h1 className="apr-hero__label">{about.hero.heading}</h1>
        <p className="apr-hero__line">{about.hero.sub}</p>
      </div>

      {/* one picture, described once — the three panes are slices of it */}
      <div className="apr-hero__room" role="img" aria-label={FRAMES.heroRoom.alt}>
        {panes.map((p) => (
          <div
            className="apr-hero__pane"
            key={p.i}
            style={{ ['--i' as string]: p.i, ['--off' as string]: p.off }}
          >
            <Shot
              frame={FRAMES.heroRoom}
              alt=""
              eager={p.i === 1}
              sizes="(max-width: 719px) 300vw, 100vw"
            />
          </div>
        ))}
        <span className="apr-hero__seam apr-hero__seam--1" aria-hidden="true" />
        <span className="apr-hero__seam apr-hero__seam--2" aria-hidden="true" />
      </div>

      <div className="apr-rail">
        <p className="apr-hero__support">{about.hero.support}</p>
      </div>
    </header>
  );
}
