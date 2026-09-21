import { SiteNav } from '@/components/SiteNav';
import { Board } from '@/components/preview/contact-a/Board';
import { contact } from '@/content/copy';
import { links, site } from '@/content/site';

/**
 * PREVIEW — CONTACT, CONCEPT A. "The board."
 *
 * Isolated route. Nothing here is imported by a real page; every selector is namespaced
 * under `.contact-a` and lives in styles/preview-contact-a.css.
 *
 * THE PREMISE — the eight subjects as a system you operate.
 *
 * The content's real shape is not "a list of eight". It is "eight subjects and one open
 * line", because `links.emailCollaborations` is null and the only destination that exists
 * is the WhatsApp number. So the section is drawn as a patch board: eight keys, eight cords
 * bundling down a gutter, one socket, one plate. Choosing a key lights its cord and changes
 * what the button does. The reader operates it; they do not read down it.
 *
 * The Social block is the same instrument seen from the other side — two lines OUT, and the
 * plate they leave from is Pranava Seva Trust's, because that is whose accounts they are.
 * The relationship is the composition, not a footnote under it.
 */
export const metadata = { title: 'Preview · Contact A' };

/** Derived from the link so the two can never drift apart. */
const igHandle = `@${links.instagram.replace(/\/+$/, '').split('/').pop()}`;

export default function PreviewContactA() {
  return (
    <>
      <SiteNav />

      <main className="contact-a">
        <h1 className="ca-sr">
          {contact.title} — section preview A
        </h1>

        {/* The approved hero ends on warm black. This slim band stands in for its lower
            edge so the handoff, the nav's ground and the first section's key can be judged
            in the same frame. It is a stand-in, not the hero. */}
        <div className="ca-handoff" aria-hidden="true">
          <span className="ca-handoff__t">Approved hero ends here</span>
        </div>

        <section className="ca-collab" aria-labelledby="ca-collab-h">
          <div className="ca-in">
            {/* The eyebrow and the question live inside <Board /> so that the header, the
                plate and the keys are cells of ONE grid — the cords are measured against
                that grid, and a second wrapper between them would put dead space where the
                bundle needs to sweep. */}
            <Board />
          </div>
        </section>

        <section className="ca-out" aria-labelledby="ca-out-h">
          <div className="ca-in">
            <div className="ca-out__head">
              <p className="ca-brow ca-brow--paper">{contact.social.heading}</p>
              <h2 className="ca-out__h" id="ca-out-h">
                Two lines out, and they are not ours.
              </h2>
              <p className="ca-out__say">
                {site.name} is an initiative under {site.trust}. It keeps no accounts of
                its own, so these are the Trust&rsquo;s.
              </p>
            </div>

            <div className="ca-out__wrap">
              {/* One plug, two lines — the board's own drawing, on paper. The viewBox is
                  stretched over the list with preserveAspectRatio="none", so the two cords
                  land on the two rows at any height; non-scaling-stroke keeps the weight
                  even under that stretch. */}
              <svg
                className="ca-out__wire"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M2 50 C 46 50, 52 25, 100 25" vectorEffect="non-scaling-stroke" />
                <path d="M2 50 C 46 50, 52 75, 100 75" vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="ca-out__plug" aria-hidden="true" />
              <ul className="ca-out__list">
              <li className="ca-out__i">
                <a className="ca-line" href={links.instagram} target="_blank" rel="noopener noreferrer">
                  <span className="ca-line__k">Instagram</span>
                  <span className="ca-line__v">{igHandle}</span>
                  <svg
                    className="ca-line__arw"
                    width="15"
                    height="10"
                    viewBox="0 0 15 10"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              </li>
              <li className="ca-out__i">
                <a className="ca-line" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
                  <span className="ca-line__k">WhatsApp</span>
                  <span className="ca-line__v">The community</span>
                  <svg
                    className="ca-line__arw"
                    width="15"
                    height="10"
                    viewBox="0 0 15 10"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
