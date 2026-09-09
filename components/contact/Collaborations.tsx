import { contact } from '@/content/copy';
import { links } from '@/content/site';
import { Arrow, buildChannels } from './ChannelList';
import { LANE, MOMENTS, srcSet } from './moments';

/**
 * BAND 02 — THE COLONNADE.
 *
 * The client lists eight things they are open to conversations around. This is not that
 * list. Eight arched openings are cut down the paper at four sizes, tilted, overlapping,
 * two of them running off the edge, and each subject is a nameplate set into the picture it
 * belongs to. You walk down a colonnade rather than read a column. The arch is not
 * ornament: a doorway is the shape of "we are open to".
 *
 * ITS OWN IDEA, not the hero's. The hero is type beside a single framed still on warm
 * black, contained, nothing bleeding. This is the inverse — paper, non-rectangular media,
 * layered and off the edge, with the type set INTO the pictures.
 *
 * THE NULL EMAIL. `links.emailCollaborations` is null and null renders as nothing, so there
 * is no second address, no "coming soon" and no invented mailbox. The client's own words on
 * the button are "Write to us"; where writing to them actually goes is named in plain sight
 * directly beneath it. The destination comes from buildChannels(), so the day an address is
 * supplied this is a data change and not a redesign.
 */
export function Collaborations() {
  /* One open line today. If an address ever lands in content/site.ts the builder returns a
     second channel and this row keeps naming, honestly, wherever the button goes. */
  const write = buildChannels(links.emailCollaborations)[0]!;

  return (
    <section className="cx-collab" aria-labelledby="cx-collab-h">
      <header className="cx-collab__head">
        <p className="cx-eyebrow">{contact.collaborations.heading}</p>
        <h2 className="cx-q" id="cx-collab-h">
          {contact.collaborations.lead}
        </h2>
        <p className="cx-openTo">{contact.collaborations.listLead}</p>
      </header>

      <div className="cx-wall">
        {MOMENTS.map((m, i) => (
          <figure
            className="cx-arch"
            key={m.id}
            data-lane={LANE[i]}
            data-br=""
            style={{ '--d': `${(i % 3) * 90}ms` } as React.CSSProperties}
          >
            <div className="cx-arch__cut">
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
              {/* The plate carries the subject AND where the frame was taken. The subject is
                  a thing the community will talk about; the provenance is a fact about the
                  photograph. Keeping both on the plate is what stops one being read as the
                  other — this project has already published a Samskrithi Sadhana frame
                  captioned as a Yoga Mandala gathering once. */}
              <figcaption className="cx-arch__plate">
                <span className="cx-arch__n" aria-hidden="true">
                  {m.n}
                </span>
                <span className="cx-arch__t">{m.label}</span>
                <span className="cx-arch__src">
                  {m.event.at}
                  <span className="cx-arch__on">{` · ${m.event.on}`}</span>
                </span>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>

      <div className="cx-act" data-br="">
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
    </section>
  );
}
