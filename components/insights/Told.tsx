import Link from 'next/link';
import { Mark, tellHref } from './parts';

/**
 * 02 · THE ONE PHOTOGRAPH ON THE PAGE, AND THE WAY TO BE TOLD.
 *
 * THE PICTURE. The media audit is explicit that there is not a book or a written text
 * anywhere in 1,211 frames, so a page about writing has nothing literal to be photographed
 * with. What the archive does have is a place to sit: two painted tree seats on open
 * ground with nobody on them. It illustrates nothing, claims nothing and captions cleanly
 * as what it shows, which is the only kind of picture this page can honestly carry — and
 * one, not a gallery, because one is all that is true.
 *
 * Its derivatives stop at 1620, so it is never full-bleed: the plate caps at 60rem and the
 * 1620 file covers it to 2× on any viewport up to 2560.
 *
 * THE SUBSCRIPTION. Blueprint §6 asks for one. There is no backend, no list and no mailbox
 * — all three email addresses in content/site.ts are null — so an email field would put
 * addresses into nothing. The live channel takes the request instead, with the subject
 * written in, and the page says exactly what pressing it does.
 */
const FIGURE = {
  id: 'pr-ttc-dsc_0014_1',
  /* VERBATIM from public/media/pranava-stills.json. */
  alt: 'Two painted circular tree seats under spreading trees on open sandy ground',
  /* Provenance — where the frame was taken, never what the page is about. "Prabodha" is
     the client's own programme name (Blueprint §4.3) and the manifest's source path puts
     this frame in that collection; no date is recorded for it anywhere, so none is given. */
  caption: 'Prabodha TTC',
  focal: '50% 50%',
};

export function Told() {
  return (
    <section className="in-s in-s--warm in-told">
      <div className="in-rail">
        <Mark n="02">When there is something to read</Mark>

        <div className="in-told__grid">
          <figure className="in-fig">
            <img
              src={`/media/stills/${FIGURE.id}-1620.webp`}
              srcSet={`/media/stills/${FIGURE.id}-960.webp 960w, /media/stills/${FIGURE.id}-1620.webp 1620w`}
              sizes="(max-width: 899px) 100vw, min(60rem, 52vw)"
              alt={FIGURE.alt}
              width={1620}
              height={1080}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: FIGURE.focal }}
            />
            {/* NOT the global `.cap` — that one is the hero's own object and is
                `position: absolute; display: none` until motion is off. */}
            <figcaption className="in-cap">{FIGURE.caption}</figcaption>
          </figure>

          <div className="in-told__col">
            <p className="in-told__lead">
              There is no mailing list yet, and no form on this site that goes anywhere.
            </p>
            <p className="in-told__body">
              If you would like to know when Praṇava starts publishing, send a message and
              it will be on the record. The link opens WhatsApp with “Please let me know
              when writing is published on Insights” already typed — you read it, change
              it and send it yourself.
            </p>

            {/* A quiet underlined line, NOT a filled plate. The Heal page ends on a clay
                plate and the Events page on a ruled ledger row; three held-back pages
                that all finished with the same button would be three versions of one
                page. This one is a reading page and its route reads like a sentence. */}
            <p className="in-told__go">
              <a className="in-cta" href={tellHref} rel="noopener">
                Ask to be told
                <svg
                  className="in-cta__arw"
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M0 5h16M12 1l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </a>
            </p>

            <p className="in-told__alt">
              Praṇava&rsquo;s thinking is set out in full on{' '}
              <Link className="in-ilink" href="/about/">
                About Praṇava
              </Link>
              , and anything else can go through{' '}
              <Link className="in-ilink" href="/contact/">
                Contact
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
