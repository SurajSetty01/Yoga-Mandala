import { about } from '@/content/pranava';
import { site } from '@/content/site';
import { LEFT, RIGHT, src, srcSet, sizes, type Cell } from './frames';

/**
 * PRAṆAVA · ABOUT — HERO, concept sx1b.  "THE STILL CENTRE."
 *
 * WHAT HAPPENS: two standing walls of photographs shear past each other — the left wall
 * rising, the right wall falling — while the page's name and its one sentence do not move
 * at all, and a clay hairline lengthens beneath the sentence until it spans the whole gap
 * the two walls are holding open. You are not scrolling past a picture. You are standing
 * still in the one place on the page that is not moving.
 *
 * ONE SCREEN, PLUS A FIFTH. The section is 100svh with motion off and 120svh with it on:
 * a single screen of composition and 20svh of runway, and every pixel of that runway moves
 * both walls and lengthens the rule. There is no interval in which nothing changes.
 *
 * NO JAVASCRIPT AT ALL. Every word, every photograph and every alt is in the static HTML;
 * the shear is a native CSS scroll-driven animation on a named view timeline. Disable
 * scripting and the page is byte-identical. The previous version of this section shipped
 * two MP4s and an IntersectionObserver to attach them; both are gone, and with them
 * 5,075 KB that was transferred identically at 320 and at 2531.
 *
 * NO TEXT SITS ON A PHOTOGRAPH, at any viewport, at any scroll position. The channel is
 * paper on the wide layout and a full-bleed paper band on the narrow one — not a card laid
 * over a gallery — so contrast is a property of the structure rather than a function of the
 * crop, which is the trap DESIGN-SYSTEM §1 was written about.
 *
 * COPY is verbatim from content/pranava.ts (`about.hero`) and content/site.ts. The eyebrow
 * is the client's own descriptor from their lockup, not a label invented for the page; there
 * is no caption anywhere in the section, and nothing here is a count, a date, a fee or a
 * name the client has not supplied.
 */

/**
 * One cell. `echo` marks a REPEAT of a photograph that is already described once in this
 * wall: it carries the same two URLs, so it costs no transfer, and it is hidden from the
 * accessibility tree with an empty alt so the same picture is not announced twice.
 */
function Plate({ cell, eager, echo }: { cell: Cell; eager?: boolean; echo?: boolean }) {
  return (
    <figure className="sx1b-cell" aria-hidden={echo || undefined}>
      <img
        src={src(cell)}
        srcSet={srcSet(cell)}
        sizes={sizes(cell)}
        alt={echo ? '' : cell.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        style={{ '--sx1b-op': cell.pos } as React.CSSProperties}
      />
    </figure>
  );
}

/**
 * A WALL IS FOUR CELLS OF TWO PHOTOGRAPHS, ALTERNATING, so that there is always another
 * picture where the wall is about to travel and no scroll position can expose paper at
 * either end. The stylesheet's run note has the measurement that forced this.
 *
 * The two walls differ only in where the run is parked, and that is done in CSS: the
 * rising wall sits at the top of its window with three cells of run below it, the falling
 * wall is parked one whole cell high so it has a cell in hand above. The consequence here
 * is the ORDER — the falling wall leads with its second frame so that, once the run is
 * shifted up by one cell, the photograph standing whole in the window at rest is still
 * `cells[0]` for both walls.
 *
 * `slots` therefore says, for each of the four boxes, which frame goes in it and whether
 * this is the described instance or an echo. `eager` marks the two boxes that are in the
 * window before a pixel is scrolled: at 320×568 only one cell per wall is in the window at
 * rest, and this is what makes the phone fetch what it can actually see first rather than
 * the frame a reader meets last.
 */
function Wall({ side, cells }: { side: 'l' | 'r'; cells: readonly [Cell, Cell] }) {
  const [a, b] = cells;
  const slots =
    side === 'l'
      ? [
          { c: a, echo: false, eager: true },
          { c: b, echo: false, eager: true },
          { c: a, echo: true, eager: false },
          { c: b, echo: true, eager: false },
        ]
      : [
          { c: b, echo: true, eager: false },
          { c: a, echo: false, eager: true },
          { c: b, echo: false, eager: true },
          { c: a, echo: true, eager: false },
        ];

  return (
    <div className={`sx1b-wall sx1b-wall--${side}`}>
      <div className="sx1b-run">
        {slots.map((s, i) => (
          <Plate key={`${s.c.id}-${i}`} cell={s.c} eager={s.eager} echo={s.echo} />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const { heading, sub, support } = about.hero;
  const [first, ...restWords] = heading.split(' ');

  return (
    <section className="sx1b-hero" aria-labelledby="sx1b-title">
      <div className="sx1b-stage">
        <Wall side="l" cells={LEFT} />

        <div className="sx1b-channel">
          <p className="sx1b-eyebrow">{site.descriptor}</p>

          {/* The page's single h1. Two words, two lines, one left axis — the house hero's
              own move, roman then italic, set at the page's rail rather than centred. */}
          <h1 className="sx1b-h1" id="sx1b-title">
            <span>{first}</span>
            <span className="sx1b-h1__b">{restWords.join(' ')}</span>
          </h1>

          <p className="sx1b-sub">{sub}</p>

          {/* Ornament, not a thematic break: it is the measure the two walls hold open, and
              an <hr> would put a separator in the accessibility tree between a heading and
              the sentence that belongs to it. */}
          <div className="sx1b-rule" aria-hidden="true" />

          <p className="sx1b-support">{support}</p>
        </div>

        <Wall side="r" cells={RIGHT} />
      </div>
    </section>
  );
}
