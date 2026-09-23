import { about } from '@/content/pranava';
import { FRAMES, Shot } from './parts';

/**
 * HERO — A WINDOW IN THE HALL, AND THE TWO VIEWS THROUGH IT MOVE APART.
 *
 * One room, photographed twice on the same afternoon. The wide frame is the whole hall,
 * full bleed. Standing in front of it on the right is a tall window onto the same hall,
 * cropped to one practitioner on the ropes, bleeding off the bottom of the viewport. The
 * sentence is set between the two planes: in front of the hall, behind the window.
 *
 *   0  __hall    the hall, full bleed, under its veil
 *   1  __shade   the ground the words stand on
 *   2  __type    the label, the sentence, the paragraph
 *   3  __win     the standing window, nearest, unveiled
 *   4  __datum   one hairline, in front of both planes, across the seam
 *
 * THE EVENT. The window's FRAME never moves — a window in a wall does not. What moves is
 * what you see through each of the two planes: as you descend, the hall's picture sinks
 * inside the viewport and the window's picture climbs inside its aperture, in opposite
 * directions, so the two views of one room slide apart and the wall between them acquires
 * thickness. Both are `translateY` on the <img>, inside apertures that are 16% and 24%
 * oversized so no edge can ever be exposed. The words hold still through all of it.
 *
 * AND ONE THING CROSSES THE SEAM. Two pictures moving at different rates cannot be READ as
 * a shear unless something continuous lies across the join for them to break against;
 * without it, it is only parallax, whatever a comment claims. `__datum` is a single hairline
 * at z4 — in front of the window as well as the hall — running from the end of the measure
 * to the window's far edge. It is the registration mark, and it is the only new graphic
 * element in the hero.
 *
 * The previous build's mechanic was two overlapping windows that were supposed to part.
 * They never did: the relative travel was 10vw against an overlap that was also 10vw at
 * 1440, so the "gap" resolved to exactly zero — a pixel-flush butt joint — and it was
 * negative at every width below that. Travel here is a percentage of each image's own
 * height and is therefore proportional at every viewport; measured separation runs 93px at
 * 320 to 200px at 2560 and is tabulated in components/about-pranava/NOTES.md.
 *
 * WHY THIS IS NOT THE HOME PAGE'S HERO. That one sets type inside ONE moving picture on a
 * scrim shaped to that frame's light. This one is two still pictures of one room at two
 * depths with the type threaded between them, and the only thing that moves is the
 * relationship between the planes. Nothing else on this site interleaves type with
 * photographs in depth.
 *
 * CONTRAST IS A GROUND, NOT A TUNED GRADIENT. `__shade` is a flat panel whose stops are
 * written off `--apr-col`, the same custom property that caps the sentence's measure, so
 * the ground can never be narrower than the words standing on it at any viewport. The
 * measured worst pixel is in NOTES.md.
 *
 * `prefers-reduced-motion` and no-JavaScript both give `--apr-open: 0`, which is what a
 * reader with JavaScript sees at the top of the page: both images at their neutral
 * position, the whole composition present. For a hero the composed state is the finished
 * state — the motion is what happens as it leaves.
 *
 * The <h1> is the client's page title at label scale; an <h1> is a rank, not a font size,
 * and the sentence under it is the one worth setting at the size of the room.
 */
export function Hero() {
  return (
    <header className="apr-s apr-s--deep apr-hero">
      <div className="apr-hero__room">
        {/* 0 · the hall */}
        <div className="apr-hero__hall">
          <Shot frame={FRAMES.heroHall} eager sizes="100vw" />
        </div>

        {/* 1 · the ground the words stand on. A surface, not content. */}
        <span className="apr-hero__shade" aria-hidden="true" />

        {/* 2 · the words */}
        <div className="apr-hero__type">
          <h1 className="apr-hero__mark">
            <span>{about.hero.heading}</span>
          </h1>
          <p className="apr-hero__line">{about.hero.sub}</p>
          <p className="apr-hero__support">{about.hero.support}</p>
        </div>

        {/* 3 · the window, nearest, and the only unveiled plane.

            `sizes` DESCRIBES THE RENDERED WIDTH OF THE SOURCE, NOT THE APERTURE. A portrait
            aperture with `object-fit: cover` scales the source by HEIGHT, so the intrinsic
            width the browser needs is the aperture's height times the source's ratio, not
            the aperture's own width. Stating the aperture width here is what made the
            previous window fetch 480w for a 1362w job. Measured requirement: 307px at 390,
            534px at 1024, 626px at 1440, 793px at 2531 — so 480w narrow and 960w from 900
            up, which is every derivative this frame has. */}
        <figure className="apr-hero__win">
          <Shot frame={FRAMES.heroHands} eager sizes="(max-width: 899px) 320px, 700px" />
        </figure>

        {/* 4 · THE DATUM. One hairline at the window's own top edge, run right across the
            room IN FRONT of both planes — the only thing in the hero that touches the hall
            and the window at once. Without it the two pictures shear 122px past each other
            with nothing to break against, and opposite-direction travel reads as ordinary
            parallax; with it the seam has a straight edge to be measured by. It is also the
            window's lintel, continued. Decorative, so aria-hidden. */}
        <span className="apr-hero__datum" aria-hidden="true" />
      </div>
    </header>
  );
}
