import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { ChannelList, buildChannels } from '@/components/contact/ChannelList';
import { contact } from '@/content/copy';
import { contactPerson, links, site } from '@/content/site';

/**
 * PAGE 4 — Connect With Us.
 *
 * THE IDEA. A conventional contact page is a form, an address block and a rack of channels.
 * This site has none of those: `site.address` is null, `links.emailGeneral` and
 * `links.emailCollaborations` are null. What it does have is one live, human channel — a
 * WhatsApp number belonging to a named person the client asked to be named. So the page is
 * built around that single open line rather than around the shape of a contact page: the
 * number is set at display scale, on the dark ground, with the person's name above it, and
 * it is the largest object on the page after the headline. Reaching someone, not filing a
 * ticket.
 *
 * The absent channels are absent. Nothing marks the hole — see ChannelList.tsx for how,
 * and why adding an address later is a data change rather than a redesign.
 *
 * ITS OWN IDEA, not the hero's. The hero is a sticky three-movement video sequence with the
 * type inside the picture. Here nothing moves and nothing is full-bleed: one still
 * photograph sits in a framed column beside the type, and the only scroll behaviour is the
 * invitation column staying with you while the eight subjects scroll past it — the line
 * stays open for as long as you are reading. Continuity is the tokens, the type scale, the
 * caption and the clay CTA with its wiping ground.
 */
export const metadata = {
  title: contact.title,
  description:
    'Reach Yoga Mandala on WhatsApp. Praṇav Śāstrī is the contact for questions about the community, collaborations and participation.',
};

/**
 * Samskrithi Sadhana, from the media inventory's own collection field. The Praṇava roundel
 * is in the frame. The caption is provenance — where a picture was taken — which is the one
 * place a city may appear on this site. It is not a claim about where anything is based.
 */
const FIGURE = {
  id: 'ss-dsc07144',
  alt: 'One of four seated panellists speaks into a handheld microphone while the others listen.',
  caption: 'Samskrithi Sadhana · Bengaluru',
};

/** Derived from the link itself so the two can never drift apart. */
const igHandle = `@${links.instagram.replace(/\/+$/, '').split('/').pop()}`;

export default function ContactPage() {
  const general = buildChannels(links.emailGeneral);
  const collab = buildChannels(links.emailCollaborations);
  /* The collaborations block's own words are "Write to us", and the destination is named
     beneath them in plain sight. Nothing is re-labelled and nothing is implied: the one
     open line is the one open line, whatever you are writing about. */
  const collabWrite = collab[0]!;

  return (
    <>
      <SiteNav />

      <main className="cx" id="top">
        {/* ── THE OPEN LINE ───────────────────────────────────────────────────
            Warm black, because the one real channel deserves the page's strongest
            ground. Type beside a framed still — never on it, which is the hero's
            move and stays the hero's. */}
        <section className="cx-open">
          <div className="cx-open__in">
            <p className="cx-brow">Contact</p>
            <h1 className="cx-h1">{contact.title}</h1>
            <p className="cx-say">
              Write to us on WhatsApp. Messages reach {contactPerson.name}, who is the
              contact for {site.name}.
            </p>

            <div className="cx-open__grid">
              <div className="cx-open__col">
                <p className="cx-mark">
                  <span className="cx-mark__n">01</span>
                  <span className="cx-mark__r" aria-hidden="true" />
                </p>
                <h2 className="cx-h2">{contact.general.heading}</h2>
                <p className="cx-lead">{contact.general.lead}</p>

                {/* One card, one line in it. A single filled row reads as a complete
                    object; a rack of slots with two of them empty reads as broken. */}
                <div className="cx-card">
                  <p className="cx-card__k">Speak with</p>
                  <p className="cx-card__who">{contactPerson.name}</p>
                  <ChannelList items={general} />
                </div>
              </div>

              <figure className="cx-fig">
                <img
                  src={`/media/stills/${FIGURE.id}-1920.webp`}
                  alt={FIGURE.alt}
                  width={1920}
                  height={1280}
                  decoding="async"
                  fetchPriority="high"
                />
                <figcaption className="cx-fig__cap">{FIGURE.caption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── THE SUBJECTS ────────────────────────────────────────────────────
            Paper. The invitation and its action are sticky on wide viewports while
            the eight subjects run past — the way to reach a person is never scrolled
            off while you read what you might reach them about. Sticky is position,
            not motion, so this survives prefers-reduced-motion intact. */}
        <section className="cx-collab" aria-labelledby="cx-collab-h">
          <div className="cx-collab__in">
            <div className="cx-collab__ask">
              <p className="cx-mark cx-mark--paper">
                <span className="cx-mark__n">02</span>
                <span className="cx-mark__r" aria-hidden="true" />
              </p>
              <h2 className="cx-h2 cx-h2--paper" id="cx-collab-h">
                {contact.collaborations.heading}
              </h2>
              <p className="cx-ask">{contact.collaborations.lead}</p>
              <a
                className="cx-cta cx-cta--paper"
                href={collabWrite.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.collaborations.action}
                <svg
                  className="cx-cta__arw"
                  width="15"
                  height="10"
                  viewBox="0 0 15 10"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M0 5h12.5M8.5 1L12.8 5 8.5 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </a>
              <p className="cx-dest">
                {collabWrite.label} · {collabWrite.value}
              </p>
            </div>

            <div className="cx-collab__reg">
              <p className="cx-reg__lead">{contact.collaborations.listLead}</p>
              <ol className="cx-reg">
                {contact.collaborations.items.map((item, i) => (
                  <li className="cx-reg__i" key={item}>
                    <span className="cx-reg__n" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="cx-reg__t">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── WHOSE ACCOUNTS THESE ARE ────────────────────────────────────────
            Not a disclaimer at the bottom of a list. Yoga Mandala being an initiative
            under Pranava Seva Trust is the reason these accounts read the way they do,
            so it is stated first and the handle is shown in full underneath. */}
        <section className="cx-social" aria-labelledby="cx-social-h">
          <div className="cx-social__in">
            <div className="cx-social__head">
              <p className="cx-mark cx-mark--paper">
                <span className="cx-mark__n">03</span>
                <span className="cx-mark__r" aria-hidden="true" />
              </p>
              <h2 className="cx-h2 cx-h2--paper" id="cx-social-h">
                {contact.social.heading}
              </h2>
              <p className="cx-trust">
                {site.name} is an initiative under {site.parentOrg}, and holds no social
                accounts of its own.
              </p>
            </div>

            <ul className="cx-soc">
              <li>
                <a
                  className="cx-soc__a"
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="cx-soc__k">Instagram</span>
                  <span className="cx-soc__v">{igHandle}</span>
                  <svg
                    className="cx-soc__arw"
                    width="15"
                    height="10"
                    viewBox="0 0 15 10"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M0 5h12.5M8.5 1L12.8 5 8.5 9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="cx-soc__a"
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="cx-soc__k">WhatsApp</span>
                  <span className="cx-soc__v">The community</span>
                  <svg
                    className="cx-soc__arw"
                    width="15"
                    height="10"
                    viewBox="0 0 15 10"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M0 5h12.5M8.5 1L12.8 5 8.5 9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
