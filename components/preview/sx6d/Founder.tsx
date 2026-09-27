import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';
import {
  LEFT,
  RIGHT,
  WIDE,
  MEDIUM,
  NARROW,
  LINE_WORDS,
  px,
  r2,
  splitLines,
  src,
  srcSet,
  type Wall,
} from './geometry';

/**
 * §06 THE FOUNDER — concept sx6d, the spatial one.   "THE POINT THE ROOM VANISHES TO."
 *
 * WHAT HAPPENS
 *   Two photographs of the same row of chair-supported shoulderstands, taken from its two
 *   ends, close in from either side of the page until they are the two walls of one
 *   corridor: legs raised against a wall on the left, legs raised against a wall on the
 *   right, every line of both rooms running to one point in the middle. Nothing stands at
 *   that point. The biography comes down the ceiling of the corridor, each paragraph a
 *   little narrower than the last, and stops just above it; the founder's sentence opens
 *   out of it along the floor, each line nearer and so larger than the one before —
 *   "The role of a teacher" smallest, at the far end; "themselves." largest, at the
 *   reader's feet.
 *
 * WHY THIS CONTENT BEHAVES THIS WAY
 *   The archive has no picture of the founder, and the section refuses to fake one. What it
 *   has is a room of students holding a pose by themselves, the wall doing the work a
 *   teacher's hands might otherwise do. In the uncropped left frame a teacher is bent over a
 *   student exactly where the row vanishes; both walls stop short of that spot. The teacher
 *   is the point the whole room is organised around and that occupies none of it — which is
 *   the sentence, laid out as a room: the role of a teacher at the vanishing point, and the
 *   student's own capacity growing toward the reader.
 *
 * THE CLIENT'S SPACING NOTE, answered: the heading does not stack on one side of an empty
 * page, and no rectangle of photograph stands beside a block of text. The composition is
 * symmetrical about one point, the pictures are cut to the walls they show, and every piece
 * of text sits in the space between them.
 *
 * Everything here is static HTML and CSS: with no JavaScript, and under reduced motion, the
 * room is already assembled. Motion.tsx only rewinds it and plays it back against scroll.
 *
 * `about.founder.action` ("Meet Pranav") is NOT rendered — there is no such page, and a
 * control that goes nowhere is worse than none.
 */

/** A wall's cut, as a clip-path through the frame's own vanishing point. */
function clip(w: Wall, side: 'l' | 'r'): string {
  const X = `${r2(w.vp.x * 100)}%`;
  const Y = `${r2(w.vp.y * 100)}%`;
  const dir = side === 'l' ? '-' : '+';
  const far = '4000px';
  const g = `var(--sx6d-g${side})`;
  const u = `var(--sx6d-u${side})`;
  const d = `var(--sx6d-d${side})`;
  return (
    `polygon(` +
    `calc(${X} ${dir} ${far}) calc(${Y} - ${far} * ${u}), ` +
    `calc(${X} ${dir} ${g}) calc(${Y} - ${g} * ${u}), ` +
    `calc(${X} ${dir} ${g}) calc(${Y} + ${g} * ${d}), ` +
    `calc(${X} ${dir} ${far}) calc(${Y} + ${far} * ${d}))`
  );
}

function WallImg({ w, side }: { w: Wall; side: 'l' | 'r' }) {
  return (
    <div className={`sx6d-wall sx6d-wall--${side}`} style={{ clipPath: clip(w, side) }}>
      <img
        src={src(w, 960)}
        srcSet={srcSet(w)}
        /* the wall's box is --sx6d-w{side} wide; these mirror the stylesheet's three sizes */
        sizes={
          side === 'l'
            ? '(max-width: 699px) 87vw, 58vw'
            : '(max-width: 699px) 100vw, 67vw'
        }
        alt={w.alt}
        width={1920}
        height={2560}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** Angle (deg, CSS rotation) and length factor of the hairline from C to a wall's tip corner. */
function ray(slope: number, side: 'l' | 'r', above: boolean) {
  const x = side === 'l' ? -1 : 1;
  const y = above ? -slope : slope;
  return { a: r2((Math.atan2(y, x) * 180) / Math.PI), k: r2(Math.hypot(1, slope) * 1000) / 1000 };
}

export function Founder() {
  const f = about.founder;
  const lines = splitLines(f.quote);
  const cascade = lines.length === LINE_WORDS.length;

  /* "Founded by Pranav Murthy" → the phrase and the name, cut at the client's own " by ",
     so the paragraph's text is the kicker character for character. */
  const cut = f.kicker.indexOf(' by ');
  const kicker =
    cut === -1 ? (
      <span className="sx6d-kicker__name">{f.kicker}</span>
    ) : (
      <>
        <span className="sx6d-kicker__by">{f.kicker.slice(0, cut + 3)}</span>{' '}
        <span className="sx6d-kicker__name">{f.kicker.slice(cut + 4)}</span>
      </>
    );

  /* every slope the stylesheet needs, from the one source of truth */
  const wide = { ul: px(LEFT.up), dl: px(LEFT.down), ur: px(RIGHT.up), dr: px(RIGHT.down) };
  const narrow = { ul: px(LEFT.upN), dl: px(LEFT.downN), ur: px(RIGHT.upN), dr: px(RIGHT.downN) };
  const rays = (s: typeof wide) => ({
    lu: ray(s.ul, 'l', true),
    ld: ray(s.dl, 'l', false),
    ru: ray(s.ur, 'r', true),
    rd: ray(s.dr, 'r', false),
  });
  const rw = rays(wide);
  const rn = rays(narrow);
  const stage: Record<string, number> = {
    '--sx6d-ul-w': r2(wide.ul * 1000) / 1000,
    '--sx6d-dl-w': r2(wide.dl * 1000) / 1000,
    '--sx6d-ur-w': r2(wide.ur * 1000) / 1000,
    '--sx6d-dr-w': r2(wide.dr * 1000) / 1000,
    '--sx6d-ul-n': r2(narrow.ul * 1000) / 1000,
    '--sx6d-dl-n': r2(narrow.dl * 1000) / 1000,
    '--sx6d-ur-n': r2(narrow.ur * 1000) / 1000,
    '--sx6d-dr-n': r2(narrow.dr * 1000) / 1000,
    /* the narrowest half of the ceiling, as a divisor: a centred block of width w clears
       both walls when it sits at least w / vk above the point */
    '--sx6d-vk-w': r2(2 / Math.max(wide.ul, wide.ur)),
    '--sx6d-vk-n': r2(2 / Math.max(narrow.ul, narrow.ur)),
    /* where each wall stops, as a share of its drawn width */
    '--sx6d-tl': r2((LEFT.vp.x - LEFT.tip) * 1000) / 1000,
    '--sx6d-tr': r2((RIGHT.tip - RIGHT.vp.x) * 1000) / 1000,
    '--sx6d-vxl': LEFT.vp.x,
    '--sx6d-vyl': LEFT.vp.y,
    '--sx6d-vxr': RIGHT.vp.x,
    '--sx6d-vyr': RIGHT.vp.y,
  };
  for (const [k, v] of Object.entries(rw)) {
    stage[`--sx6d-a${k}-w`] = v.a;
    stage[`--sx6d-k${k}-w`] = v.k;
  }
  for (const [k, v] of Object.entries(rn)) {
    stage[`--sx6d-a${k}-n`] = v.a;
    stage[`--sx6d-k${k}-n`] = v.k;
  }
  const last = (set: typeof WIDE) => set[set.length - 1]!;
  stage['--sx6d-qh-w'] = r2(last(WIDE).d + last(WIDE).s * 0.32);
  stage['--sx6d-qh-m'] = r2(last(MEDIUM).d + last(MEDIUM).s * 0.32);
  stage['--sx6d-qh-n'] = r2(last(NARROW).d + last(NARROW).s * 0.32);

  return (
    <section className="sx6d" id="sx6d-founder">
      <div className="sx6d-stage" style={stage as CSSProperties}>
        <header className="sx6d-head">
          <Eyebrow n="06">The founder</Eyebrow>
        </header>

        {/* ── the ceiling: who, and the five sentences, narrowing toward the point ── */}
        <div className="sx6d-ceiling">
          <div className="sx6d-by">
            <p className="sx6d-kicker">{kicker}</p>
            <p className="sx6d-role">{f.role}</p>
          </div>
          <div className="sx6d-bio">
            {f.body.map((p, i) => (
              <p key={p} className={`sx6d-bio__p sx6d-bio__p--${i + 1}`}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* ── the room: two walls, one vanishing point. A zero-height box in the flow at
               exactly that point; everything inside is positioned from it. ── */}
        <figure className="sx6d-room" aria-labelledby="sx6d-cap">
          <div className="sx6d-walls">
            <WallImg w={LEFT} side="l" />
            <WallImg w={RIGHT} side="r" />
            <div className="sx6d-rays" aria-hidden="true">
              <span className="sx6d-ray sx6d-ray--lu" />
              <span className="sx6d-ray sx6d-ray--ld" />
              <span className="sx6d-ray sx6d-ray--ru" />
              <span className="sx6d-ray sx6d-ray--rd" />
              <span className="sx6d-vp" />
            </div>
          </div>
        </figure>

        {/* ── the floor: the sentence, from the vanishing point to the reader ── */}
        <blockquote className={`sx6d-q${cascade ? '' : ' sx6d-q--flat'}`}>
          <p>
            {lines.map((l, i) => {
              const style = (
                cascade
                  ? {
                      '--dw': r2(WIDE[i]!.d),
                      '--sw': r2(WIDE[i]!.s),
                      '--dm': r2(MEDIUM[i]!.d),
                      '--sm': r2(MEDIUM[i]!.s),
                      '--dn': r2(NARROW[i]!.d),
                      '--sn': r2(NARROW[i]!.s),
                    }
                  : {}
              ) as CSSProperties;
              return (
                <span className="sx6d-q__l" key={i} style={style}>
                  {l}
                  {i < lines.length - 1 ? ' ' : null}
                </span>
              );
            })}
          </p>
        </blockquote>

        {/* The photographs' caption. It sits after the sentence in the flow and under the
            LEFT wall on the page — a line centred under a quotation reads as its attribution,
            and this is not one. The figure above takes it as its name. */}
        <p className="sx6d-cap" id="sx6d-cap">
          Left and right, one row of chair-supported shoulderstands photographed from either
          end — Prabhava, a five-day Hatha-Iyengar immersion, 2–6 October 2023.
        </p>
      </div>
    </section>
  );
}
