import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { ChannelList, buildChannels } from '@/components/contact/ChannelList';
import { Collaborations } from '@/components/contact/Collaborations';
import { Depth } from '@/components/contact/Depth';
import { Social } from '@/components/contact/Social';
import { contact } from '@/content/copy';
import { yogaMandalaContact as contactPerson, links, site } from '@/content/site';

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
 * BENEATH IT, the eight subjects the client is open to conversations around are not a list.
 * They are eight arched photographic openings cut down the paper — four sizes, tilted,
 * overlapping, two of them running off the edge — with each subject set as a nameplate into
 * the picture it belongs to, and social is two more doorways cut into a dark wall and lit
 * from the far side. See components/contact/Collaborations.tsx and Social.tsx.
 *
 * ITS OWN IDEA, not the hero's. The open line is contained and rectangular: type beside one
 * framed still on warm black, nothing bleeding, no word on a photograph. Everything below it
 * is the inverse — paper, non-rectangular media, layered, off the edge, type set into the
 * pictures. Continuity is the tokens, the type scale, the caption system and the clay CTA
 * with its wiping ground.
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

export default function ContactPage() {
  const general = buildChannels(links.emailGeneral);

  return (
    <>
      <SiteNav />
      {/* The colonnade's reveal and its two-lane depth. Nothing below is reachable only
          through it, and it does not run at all under prefers-reduced-motion. */}
      <Depth />

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

        {/* ── THE EIGHT SUBJECTS, AS EIGHT DOORWAYS ──────────────────────────
            No list. Arched openings cut down the paper, tilted and overlapping,
            with the subject set into the picture it belongs to. */}
        <Collaborations />

        {/* ── WHOSE ACCOUNTS THESE ARE ────────────────────────────────────────
            The wall goes dark and two more doorways are cut into it. Not a
            disclaimer at the bottom of a list: Yoga Mandala being an initiative
            under Pranava Seva Trust is the reason these handles read the way
            they do, so it is the heading. */}
        <Social />
      </main>

      <SiteFooter />
    </>
  );
}
