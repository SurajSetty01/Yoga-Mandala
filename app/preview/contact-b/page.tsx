import { SiteNav } from '@/components/SiteNav';
import { Depth } from '@/components/preview/contact-b/Depth';
import { MOMENTS, srcSet } from '@/components/preview/contact-b/moments';
import { contact } from '@/content/copy';
import { links, site } from '@/content/site';

/**
 * PREVIEW — CONTACT, CONCEPT B. "Eight doorways."
 *
 * Isolated route. Every selector is namespaced under `.contact-b`, in
 * styles/preview-contact-b.css.
 *
 * THE PREMISE — photography carries it.
 *
 * The eight subjects are not abstractions. Every one of them is a thing that has already
 * happened in this community and been photographed: a class, someone talking from a stool,
 * a teacher's hand on a student's back, a panel, a hall. So there is no list. There are
 * eight arched openings cut down the page — overlapping, tilted, at four different sizes,
 * two of them running off the edge of the paper — and each subject is a nameplate set into
 * the picture it belongs to. You walk down a colonnade rather than reading a column.
 *
 * The arch is not decoration for its own sake: it is the shape of a doorway, and a doorway
 * is what "we are open to conversations around" actually means.
 *
 * Social closes it on warm black — the wall ends, and the plate on the back of it says
 * whose accounts these are.
 */
export const metadata = { title: 'Preview · Contact B' };

const igHandle = `@${links.instagram.replace(/\/+$/, '').split('/').pop()}`;

/** Near lane / far lane. Far doorways are smaller, paler and travel slower. */
const LANE = ['near', 'far', 'near', 'far', 'near', 'far', 'far', 'near'] as const;

export default function PreviewContactB() {
  return (
    <>
      <SiteNav />
      <Depth />

      <main className="contact-b">
        <h1 className="cb-sr">{contact.title} — section preview B</h1>

        <div className="cb-handoff" aria-hidden="true">
          <span className="cb-handoff__t">Approved hero ends here</span>
        </div>

        <section className="cb-collab" aria-labelledby="cb-collab-h">
          <header className="cb-head">
            <p className="cb-brow">{contact.collaborations.heading}</p>
            <h2 className="cb-q" id="cb-collab-h">
              {contact.collaborations.lead}
            </h2>
            <p className="cb-lead">{contact.collaborations.listLead}</p>
          </header>

          <div className="cb-wall">
            {MOMENTS.map((m, i) => (
              <figure
                className="cb-m"
                key={m.id}
                data-lane={LANE[i]}
                data-br=""
                style={{ '--d': `${(i % 3) * 90}ms` } as React.CSSProperties}
              >
                <div className="cb-m__arch">
                  <img
                    src={`/media/stills/${m.id}-960.webp`}
                    srcSet={srcSet(m)}
                    sizes="(min-width: 60rem) 46vw, 88vw"
                    alt={m.alt}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={
                      {
                        objectPosition: `${(m.focal[0] * 100).toFixed(0)}% ${(m.focal[1] * 100).toFixed(0)}%`,
                      } as React.CSSProperties
                    }
                  />
                  <figcaption className="cb-m__plate">
                    <span className="cb-m__n" aria-hidden="true">
                      {m.n}
                    </span>
                    <span className="cb-m__t">{m.label}</span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>

          <div className="cb-act" data-br="">
            <a
              className="cb-cta"
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.collaborations.action}
              <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                <path
                  d="M0 5h12.5M8.5 1L12.8 5 8.5 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
            <p className="cb-dest">WhatsApp · {links.whatsappDisplay}</p>
          </div>
        </section>

        <section className="cb-social" aria-labelledby="cb-social-h">
          <div className="cb-social__in">
            <p className="cb-brow cb-brow--dark">{contact.social.heading}</p>
            <h2 className="cb-social__h" id="cb-social-h">
              {site.name} is an initiative under {site.trust}.
            </h2>
            <p className="cb-social__say">
              It keeps no accounts of its own. These are the Trust&rsquo;s.
            </p>

            {/* Two more doorways — but cut into the dark wall and lit from the far side,
                because the light through them is not ours. Same arch, no photograph. */}
            <ul className="cb-social__list">
              <li>
                <a
                  className="cb-door"
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="cb-door__k">Instagram</span>
                  <span className="cb-door__v">{igHandle}</span>
                  <span className="cb-door__go">
                    Open
                    <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                      <path
                        d="M0 5h12.5M8.5 1L12.8 5 8.5 9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="cb-door"
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="cb-door__k">WhatsApp</span>
                  <span className="cb-door__v">The community</span>
                  <span className="cb-door__go">
                    Open
                    <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                      <path
                        d="M0 5h12.5M8.5 1L12.8 5 8.5 9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
