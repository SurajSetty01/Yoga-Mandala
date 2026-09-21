import Link from 'next/link';
import { about } from '@/content/pranava';
import { links } from '@/content/site';
import { ROOM } from './frames';
import { Says, Shot } from './parts';

/**
 * 07 — A PLACE IS TAKEN.
 *
 * The page closes on the one photograph in the archive of a room with nobody in it: four
 * folding chairs in a row, each beside a mat with a blanket, a bolster and a block, and
 * daylight from the open side. A room set out for people who have not arrived yet.
 *
 * That is the whole close, and it is the answer to this page's problem rather than an
 * apology for it. Every other section has had to work around the fact that no programme
 * details exist; here the emptiness is simply the subject, and the client's own last line
 * — "Begin where you are." — is set on a plate that lands in one of the empty places. A
 * seat is taken. Nothing is claimed and nothing is missing.
 *
 * WHY A PLATE AND NOT TYPE ON THE PICTURE. The plate is the navigation pill's own material,
 * `rgba(--shade, 0.82)` with a cream hairline, and its contrast is therefore a CONSTANT
 * rather than a function of whichever pixel of a red oxide floor happens to be under a
 * glyph at 1024x768. Tuning a scrim until a label passes at one viewport and fails at
 * another is the trap DESIGN-SYSTEM §1 was written about. The plate's position is set
 * deliberately at each breakpoint, in step with the frame's own `object-position`, so it
 * lands on an empty place and not on a chair at every width from 320 to 2560.
 *
 * The band is capped at `--ln-max` (1620px, the ceiling of this frame's derivatives) and
 * centred with `margin-inline: auto`. A cap without that is invisible at 1440 and 455px
 * wrong at 2531, which this project has shipped once.
 *
 * ROUTES, and only ones that exist: the enquiry page, the WhatsApp number the client has
 * supplied in writing, and the sibling journey. No e-mail address appears anywhere —
 * `links.emailGeneral` is null and null renders as nothing.
 */
export function Begin() {
  return (
    <section className="ln-bg" id="begin">
      <div className="ln-bg__band">
        <figure className="ln-bg__fig">
          <Shot
            className="ln-bg__img"
            frame={ROOM}
            sizes="(max-width: 1620px) 100vw, 1620px"
          />

          <div className="ln-bg__seat" data-ln="seat">
            <h2 className="ln-bg__call">{about.closing.call}</h2>
            {/* the client's own pairing: About §12 opens on this line and then says
                "Begin where you are." The two belong together and arrive together. */}
            <p className="ln-bg__sub">{about.closing.lead}</p>
            <div className="ln-bg__acts">
              <Link className="ln-bg__cta" href="/contact/">
                Enquire
                <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                  <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
              <a
                className="ln-bg__alt"
                href={links.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
              >
                WhatsApp
                <span className="ln-bg__ext" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>

          <figcaption className="ln-bg__cap">
            <Says>{ROOM.alt}</Says>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
