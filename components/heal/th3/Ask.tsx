import Link from 'next/link';
import { journeys } from '@/content/pranava';
import { links } from '@/content/site';
import { Mark, healHref, HEAL_MESSAGE } from '../parts';
import { Th3Strike } from './Th3Strike';

/**
 * /heal/ 02 · ASKING ABOUT IT — the message is the striker.
 *
 * Brass chimes hang from the top edge of the section. The line that holds their wooden
 * striker disc runs on out of the photograph, and on it hangs the enquiry: a forest plate
 * that carries the prefilled WhatsApp message in large italic, because that sentence is the
 * thing the visitor sends. Touch the plate (hover, keyboard focus, a tap, or simply scrolling
 * it into view once) and it swings a few degrees on the line while the photograph crossfades
 * to the second chime frame, where the disc has turned edge-on, as if struck.
 *
 * The route comes first; what the page does not offer follows it at note size.
 *
 * Content: the intent label is `journeys.heal.intent` verbatim; the message is HEAL_MESSAGE,
 * word for word the one behind Contact doorway 04. Everything else on the section is site
 * copy describing the mechanism. No consultation, form, email, address, name, fee, schedule
 * or response time exists, so none is shown.
 *
 * Frames: pr-pbh-img_5586 (rest: the striker disc face-on) and pr-pbh-img_5585 (struck: the
 * disc edge-on). Both 1920 portraits; each is cropped so its striker sits on the plate's axis.
 *
 * Reduced motion: nothing swings. The rest frame, the line and the plate are the whole
 * section; hover and focus still change the frame by a plain opacity fade.
 */

const srcSet = (id: string) =>
  [480, 960, 1920].map((w) => `/media/stills/${id}-${w}.webp ${w}w`).join(', ');

/* The rendered <img> is ~1.4-1.55x the photo box (that is the crop), and the box is at most
   ~29rem wide, so the image itself is at most ~680 CSS px. */
const SIZES = '(min-width: 960px) 680px, 110vw';

/* The message is shown unchanged; only its compound is kept from breaking at its own
   hyphen ("health- / oriented"). If the phrase ever leaves HEAL_MESSAGE, it renders whole. */
const KEEP = 'health-oriented';
const at = HEAL_MESSAGE.indexOf(KEEP);
const MSG_HEAD = at < 0 ? HEAL_MESSAGE : HEAL_MESSAGE.slice(0, at);
const MSG_KEEP = at < 0 ? '' : KEEP;
const MSG_TAIL = at < 0 ? '' : HEAL_MESSAGE.slice(at + KEEP.length);

export function Th3Ask() {
  return (
    <section className="th3" data-th3>
      <div className="th3-rail">
        <div className="th3-grid">
          <div className="th3-say">
            <Mark n="02">Asking about it</Mark>
            <p className="th3-lead">
              Ask in a message. The first line is already written for you.
            </p>
          </div>

          <div className="th3-axis">
            <figure className="th3-chime">
              <img
                className="th3-img th3-img--rest"
                src="/media/stills/pr-pbh-img_5586-960.webp"
                srcSet={srcSet('pr-pbh-img_5586')}
                sizes={SIZES}
                width={1920}
                height={2560}
                loading="lazy"
                decoding="async"
                alt="Brass wind chimes and a wooden striker disc hanging above a white parapet with trees behind"
              />
              <img
                className="th3-img th3-img--struck"
                src="/media/stills/pr-pbh-img_5585-960.webp"
                srcSet={srcSet('pr-pbh-img_5585')}
                sizes={SIZES}
                width={1920}
                height={2560}
                loading="lazy"
                decoding="async"
                alt="Brass wind chime tubes hanging beside a pillar above a white parapet with two potted plants"
              />
            </figure>

            <div className="th3-hang">
              <span className="th3-cord" aria-hidden="true" />
              <div className="th3-plate">
                <span className="th3-eye" aria-hidden="true" />
                <p className="th3-intent">{journeys.heal.intent}</p>
                <p className="th3-opens">It opens with</p>
                <p className="th3-msg" id="th3-msg">
                  “{MSG_HEAD}
                  {MSG_KEEP && <span className="th3-keep">{MSG_KEEP}</span>}
                  {MSG_TAIL}”
                </p>
                <a className="th3-go" href={healHref} rel="noopener" aria-describedby="th3-msg">
                  Open an enquiry
                  <svg
                    className="th3-arw"
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="th3-notes">
            <p>
              The link opens WhatsApp with this message in place. You read it, change it and
              send it yourself; the site submits nothing on your behalf.
            </p>
            <p>
              Nothing on this page is medical advice, and no assessment, treatment or
              consultation is offered through it.
            </p>
            <p>
              Or write to {links.whatsappDisplay}, or use{' '}
              <Link className="th3-link" href="/contact/">
                Contact
              </Link>{' '}
              for anything else.
            </p>
          </div>
        </div>
      </div>
      <Th3Strike />
    </section>
  );
}
