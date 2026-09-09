import { within } from '@/content/copy';

/**
 * THE APPROACH — the plan of the building, before you are inside any of it.
 *
 * Four narrow openings, each a tall crop of the room it leads to, each at a different height
 * so the row reads as an elevation rather than four cards. The title is set on the paper and
 * carries the paper with it, so it passes IN FRONT of the openings: type occluding
 * photograph, not type beside it.
 *
 * The openings are real links. They are the only navigation on the page, they give the
 * keyboard four visible focus stops, and — because each room's sticky track begins exactly
 * where that room finishes covering the one before it — an anchor jump lands on the room
 * squarely, with no scroll-margin fudge.
 */

type Door = {
  href: string;
  index: string;
  name: string;
  /** still id + the widths that exist for it in public/media/stills.json */
  id: string;
  widths: number[];
  /** object-position for a 1:3 crop — chosen by looking at the frame, not by focal maths */
  pos: string;
  alt: string;
};

const DOORS: Door[] = [
  {
    href: '#within-a-connect',
    index: '01',
    name: 'Connect',
    id: 'p13-img_0516',
    widths: [960, 1920, 2560],
    pos: '42% 58%',
    alt: 'A narrow view into a studio, a participant standing on his own mat with arms stretched overhead.',
  },
  {
    href: '#within-a-learn',
    index: '02',
    name: 'Learn',
    id: 'ss-dsc07137',
    widths: [960, 1920],
    pos: '34% 46%',
    alt: 'A narrow view of a teacher in a light blue kurta seated on a stool, talking to a group on the floor.',
  },
  {
    href: '#within-a-collaborate',
    index: '03',
    name: 'Collaborate',
    id: 'ss-dsc07143',
    widths: [960, 1920],
    pos: '54% 58%',
    alt: 'A narrow view of a stage, two of four panellists seated on wooden chairs beside a small table.',
  },
  {
    href: '#within-a-share',
    index: '04',
    name: 'Share',
    id: 'ss-dsc07118',
    widths: [960, 1920],
    pos: '52% 44%',
    alt: "A narrow view of a teacher's hand held just above a student's back during an adjustment.",
  },
];

const srcSet = (d: Door) =>
  d.widths.map((w) => `/media/stills/${d.id}-${w}.webp ${w}w`).join(', ');

export function Approach() {
  return (
    <section className="within-a__track within-a__track--approach" data-track>
      <div className="within-a__stage within-a__stage--approach">
        <div className="within-a__approach">
          <div className="within-a__approach-top">
            <div className="within-a__approach-say">
              <p className="within-a__kicker">
                {within.pillars.map((p) => p.name).join(' · ')}
              </p>
              <h1 className="within-a__title">
                What Happens Within
                <br />
                <em>Yoga Mandala</em>
              </h1>
            </div>
            <p className="within-a__lead">{within.lead}</p>
          </div>

          <ol className="within-a__doors">
            {DOORS.map((d, i) => (
              <li
                className="within-a__door"
                key={d.name}
                style={{ '--i': i } as React.CSSProperties}
              >
                {/* the number and the name are two spans in a flex row, so their text nodes
                    abut and a screen reader announces "01Connect" */}
                <a className="within-a__door-a" href={d.href} aria-label={`${d.index} ${d.name}`}>
                  <span className="within-a__door-fig" data-wa="rise">
                    <img
                      src={`/media/stills/${d.id}-960.webp`}
                      srcSet={srcSet(d)}
                      sizes="(max-width: 780px) 44vw, 20vw"
                      style={{ objectPosition: d.pos }}
                      loading={i > 1 ? 'lazy' : undefined}
                      decoding="async"
                      alt={d.alt}
                    />
                  </span>
                  <span className="within-a__door-tag">
                    <span className="within-a__door-n">{d.index}</span>
                    <span className="within-a__door-name">{d.name}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
