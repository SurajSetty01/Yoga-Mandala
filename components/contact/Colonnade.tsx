import { contact } from '@/content/copy';
import { links, yogaMandalaContact } from '@/content/site';
import { Arrow, buildChannels } from './ChannelList';
import { LANE, ROUTES, srcSet } from './routes';

/**
 * BAND 02 — THE COLONNADE.
 *
 * Arched openings cut down the paper at four sizes, tilted, overlapping, two of them
 * running off the rail, each subject a nameplate set into the picture it belongs to. You
 * walk down a colonnade rather than read a column. The arch is not ornament: a doorway is
 * the shape of "we are open to". The composition is the one the client chose over the
 * typographic alternative and it is unchanged in kind — only its count, its labels and its
 * destinations are new.
 *
 * WHAT CHANGED. This was Yoga Mandala's eight collaboration subjects, which were eight
 * nouns. It is now Praṇava's SIX enquiry routes, each written as the enquirer's own
 * sentence, and each doorway is a LINK: it opens WhatsApp with that subject already in the
 * message. See components/contact/routes.ts for where the six come from and why Insights
 * and Events are not among them.
 *
 * THE MISSING FORM. Blueprint §14 asks for a general enquiry form, programme-specific
 * routing, a confirmation state, delivery verification, spam protection and a consent
 * checkbox. There is no backend, no form handler and no address to deliver to, so building
 * the form would build a thing that silently swallows enquiries — worse than not having
 * one. The routing is done instead by the channel that works: the doorway carries the
 * subject into the message, WhatsApp is the confirmation state, and delivery is verified by
 * the reader watching it send. NOTES.md records exactly what is needed to replace this with
 * a real form.
 *
 * ITS OWN IDEA, not the hero's. The hero is type beside a single framed still on warm
 * black, contained, nothing bleeding. This is the inverse — paper, non-rectangular media,
 * layered and off the edge, with the type set INTO the pictures.
 */
export function Colonnade() {
  /* The general line: no subject written into it, because this one is for the enquiry that
     is none of the six. `links.emailGeneral` is null, so buildChannels returns exactly one
     row and there is no second address, no "coming soon" and no invented mailbox. */
  const write = buildChannels(links.emailGeneral)[0]!;

  return (
    <section className="cx-routes" aria-labelledby="cx-routes-h">
      <header className="cx-routes__head">
        <p className="cx-eyebrow">Contact routes</p>
        <h2 className="cx-q" id="cx-routes-h">
          What is your enquiry about?
        </h2>
        <p className="cx-openTo">Each doorway opens WhatsApp with its subject</p>
      </header>

      <div className="cx-wall">
        {ROUTES.map((r, i) => (
          <a
            className="cx-arch"
            key={r.id}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            /* The visible label is the subject, and it is contained in the accessible name,
               which WCAG 2.5.3 requires. The number is decorative and the provenance
               describes the photograph, so neither belongs in the name of a link. */
            aria-label={`${r.label} — enquire on WhatsApp`}
            data-lane={LANE[i]}
            data-br=""
            style={{ '--d': `${(i % 3) * 90}ms` } as React.CSSProperties}
          >
            <figure className="cx-arch__cut">
              <img
                src={`/media/stills/${r.id}-960.webp`}
                srcSet={srcSet(r)}
                sizes="(min-width: 60rem) 46vw, 88vw"
                alt={r.alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                style={
                  {
                    objectPosition: `${(r.focal[0] * 100).toFixed(0)}% ${(r.focal[1] * 100).toFixed(0)}%`,
                  } as React.CSSProperties
                }
              />
              {/* The plate carries the subject AND where the frame was taken. The subject is
                  what the reader came for; the provenance is a fact about the photograph.
                  Keeping both on the plate is what stops one being read as the other — this
                  project has already published a Samskrithi Sadhana frame captioned as a
                  Yoga Mandala gathering once. */}
              <figcaption className="cx-arch__plate">
                <span className="cx-arch__n" aria-hidden="true">
                  {r.n}
                </span>
                <span className="cx-arch__t">{r.label}</span>
                <span className="cx-arch__go" aria-hidden="true">
                  <Arrow />
                </span>
                <span className="cx-arch__src">
                  {r.event.at}
                  {/* The date is null for the Prabodha frames — no audit records one — and
                      null renders as nothing here too, not as a dangling separator. */}
                  {r.event.on ? (
                    <span className="cx-arch__on">{` · ${r.event.on}`}</span>
                  ) : null}
                </span>
              </figcaption>
            </figure>
          </a>
        ))}
      </div>

      <div className="cx-act" data-br="">
        <div className="cx-act__row">
          <a
            className="cx-cta cx-cta--paper"
            href={write.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.collaborations.action}
            <Arrow />
          </a>
          <p className="cx-dest">
            {write.label} · {write.value}
          </p>
        </div>
        {/* Yoga Mandala's own contact detail, kept in its own sentence rather than folded
            into Praṇava's. The name here is the one the Yoga Mandala document gives; the
            About document's "Pranav Murthy" describes the founder and belongs on the About
            page. content/site.ts asks that the two not be silently reconciled. The Trust
            relationship is stated once, in the band below, rather than twice here. */}
        <p className="cx-note">
          Yoga Mandala keeps its own contact: community enquiries reach{' '}
          {yogaMandalaContact.name} on this same line.
        </p>
      </div>
    </section>
  );
}
