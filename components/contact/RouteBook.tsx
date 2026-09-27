import { contact } from '@/content/copy';
import { links, yogaMandalaContact } from '@/content/site';
import { Arrow, buildChannels } from './ChannelList';
import { ROUTES, fallback, srcSet, type Route } from './routes';
import { RouteBookMotion } from './RouteBookMotion';

/**
 * BAND 02: THE ROUTES, AS A BOOK.
 *
 * The owner's review of the colonnade: "make it like a book of those cards which when
 * scrolled turns pages". So the six enquiry cards are bound into one book. Each spread is
 * one route: its photograph on the left page, and on the right page its subject, the
 * message WhatsApp will open with, and the link that opens it. Scrolling turns the pages.
 *
 * THE TECHNIQUE is the scrollytelling pin: a tall runway with a `position: sticky` stage,
 * whose scroll progress is written to each leaf as `--t` and turned into
 * `rotateY(t * -180deg)` about the spine, with perspective on the book. Each leaf is a sheet
 * with two faces (`backface-visibility: hidden`, the back pre-rotated 180deg), so turning
 * leaf k shows route k+1's photograph landing on the left while route k+1's text is
 * uncovered on the right. The stacking rule is the one flipbook carousels use: leaves
 * waiting on the right stack in reverse order, the leaf in motion goes on top of both
 * stacks, and a turned leaf stacks in order on the left. The turning face is shaded by its
 * angle and throws a shadow on the page beneath it, which is what makes it read as paper.
 *
 * ONE DOM, THREE LAYOUTS. Route k's photograph is printed twice: once inside its own page
 * (the phone book, where each page is a whole card) and once on the back of the leaf
 * before it (the spread). CSS shows exactly one of the two at any width, so a screen reader
 * meets each photograph once, and a lazy image that is not displayed is never fetched.
 *
 * NOTHING IS REACHABLE ONLY THROUGH MOTION. Without JavaScript, or under
 * prefers-reduced-motion, `data-book` is never set and the same markup lays out as six open
 * spreads (six cards on a phone): every page readable, every link in reading order. With the
 * book running, the six links are still in the DOM in order; tabbing to one turns the book
 * to its page, and the contents list beside the book turns to any page on request.
 */

/* What the browser should assume a page is, in CSS px, when it picks a file. A page is
   portrait, so a landscape frame is cropped by its HEIGHT: the file it needs is the page's
   height times the frame's own ratio, not the page's width. */
const spreadSizes = (r: Route) =>
  r.ratio > 0.76
    ? `(min-width: 40rem) calc((100vh - 7rem) * ${r.ratio}), 100vw`
    : '(min-width: 72rem) 36vw, (min-width: 40rem) 48vw, 100vw';
const CARD_SIZES = '100vw';

function Photo({ r, own }: { r: Route; own?: boolean }) {
  const big = r.srcs[r.srcs.length - 1]!;
  return (
    <figure className={own ? 'cxb-pic cxb-pic--own' : 'cxb-pic cxb-pic--spread'}>
      <img
        src={fallback(r)}
        srcSet={srcSet(r)}
        sizes={own ? CARD_SIZES : spreadSizes(r)}
        alt={r.alt}
        width={big.w}
        height={Math.round(big.w / r.ratio)}
        loading="lazy"
        decoding="async"
        style={{
          objectPosition: `${(r.focal[0] * 100).toFixed(0)}% ${(r.focal[1] * 100).toFixed(0)}%`,
        }}
      />
      {/* Provenance: where the frame was taken, never what the page beside it is called.
          The date is null for the Prabodha frames and renders as nothing. */}
      <figcaption className="cxb-cap">
        {r.event.at}
        {r.event.on ? ` · ${r.event.on}` : null}
      </figcaption>
    </figure>
  );
}

export function RouteBook() {
  /* The general line: no subject written into it, because this one is for the enquiry that
     is none of the six. `links.emailGeneral` is null, so buildChannels returns exactly one
     row and there is no second address and no invented mailbox. */
  const write = buildChannels(links.emailGeneral)[0]!;
  const last = ROUTES.length - 1;

  return (
    <section className="cxb" aria-labelledby="cxb-h">
      <RouteBookMotion />

      <div className="cxb-grid">
        <header className="cxb-head">
          <p className="cxb-eyebrow">Contact routes</p>
          <h2 className="cxb-q" id="cxb-h">
            What is your enquiry about?
          </h2>
          <p className="cxb-how">Each page opens WhatsApp with its subject.</p>

          {/* The contents page. Plain in-page links, so without JavaScript each one jumps to
              its open spread; with the book running each one turns the book to its page. */}
          <nav className="cxb-toc" aria-label="Contents">
            <p className="cxb-toc__k" aria-hidden="true">
              Contents
            </p>
            <ol className="cxb-toc__l">
              {ROUTES.map((r, i) => (
                <li key={r.id}>
                  <a className="cxb-toc__a" href={`#cxb-${r.n}`} data-k={i}>
                    <span className="cxb-toc__n" aria-hidden="true">
                      {r.n}
                    </span>
                    <span className="cxb-toc__t">{r.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </header>

        <div className="cxb-run">
          <div className="cxb-stage">
            <div className="cxb-book">
              {/* The left page of the first spread: route 01's photograph, glued to the
                  inside of the cover. */}
              <div className="cxb-face cxb-base">
                <Photo r={ROUTES[0]!} />
              </div>

              {ROUTES.map((r, i) => {
                const next = i < last ? ROUTES[i + 1]! : null;
                return (
                  <div className="cxb-leaf" key={r.id}>
                    <article
                      className="cxb-face cxb-front"
                      id={`cxb-${r.n}`}
                      data-k={i}
                      tabIndex={-1}
                      aria-labelledby={`cxb-${r.n}-t`}
                    >
                      <Photo r={r} own />
                      <div className="cxb-text">
                        <p className="cxb-folio" aria-hidden="true">
                          {r.n}
                        </p>
                        <h3 className="cxb-subj" id={`cxb-${r.n}-t`}>
                          {r.label}
                        </h3>
                        {/* The message, verbatim, so the reader knows what the link will
                            write for them before they follow it. */}
                        <p className="cxb-msg">
                          <span className="cxb-msg__k">Your message</span>
                          <q className="cxb-msg__q">{r.message}</q>
                        </p>
                        <a
                          className="cx-cta cxb-go"
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Enquire on WhatsApp
                          {/* The visible words lead the accessible name (WCAG 2.5.3); the
                              subject makes six identical links distinguishable. */}
                          <span className="sr">, {r.label}</span>
                          <Arrow />
                        </a>
                      </div>
                    </article>
                    <div className="cxb-face cxb-back" aria-hidden={next ? undefined : true}>
                      {next ? <Photo r={next} /> : null}
                    </div>
                  </div>
                );
              })}

              <span className="cxb-cast cxb-cast--l" aria-hidden="true" />
              <span className="cxb-cast cxb-cast--r" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="cx-act">
        <div className="cx-act__row">
          <a className="cx-cta cx-cta--paper" href={write.href} target="_blank" rel="noopener noreferrer">
            {contact.collaborations.action}
            <Arrow />
          </a>
          <p className="cx-dest">
            {write.label} · {write.value}
          </p>
        </div>
        {/* Yoga Mandala's own contact detail, kept in its own sentence rather than folded
            into Praṇava's. content/site.ts asks that this name and the About page's founder
            not be silently reconciled. */}
        <p className="cx-note">
          Yoga Mandala keeps its own contact: community enquiries reach{' '}
          {yogaMandalaContact.name} on this same line.
        </p>
      </div>
    </section>
  );
}
