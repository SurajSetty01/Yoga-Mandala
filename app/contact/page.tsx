import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { ChannelList, buildChannels } from '@/components/contact/ChannelList';
import { Depth } from '@/components/contact/Depth';
import { Colonnade } from '@/components/contact/Colonnade';
import { Social } from '@/components/contact/Social';
import { contact } from '@/content/copy';
import { links, site } from '@/content/site';

/**
 * ENQUIRE — the Praṇava contact page. `/contact/`, and the navigation's primary action.
 *
 * WHAT THIS PAGE IS FOR NOW. It was written for Yoga Mandala: one community, one named
 * person, eight collaboration subjects. Context/new/Pranava Website.docx §9 asks for the
 * rewrite — "covering general enquiries, programme enquiries, collaborations, location,
 * WhatsApp/email and social links. Keep Yoga Mandala's community contact details within its
 * own section where appropriate." The composition the client chose is unchanged in kind:
 * an open line, then arched photographic doorways cut down the paper, then two more cut
 * into a dark wall. What changed is who the doorways are for, how many there are, and
 * where they send people. See components/contact/routes.ts and NOTES.md.
 *
 * THE IDEA, still. A conventional contact page is a form, an address block and a rack of
 * channels. This site has none of those: `site.address` is null and all three of
 * `links.emailGeneral`, `links.emailProgrammes` and `links.emailCollaborations` are null.
 * What it has is one live channel. So the page is built around that single open line
 * rather than around the shape of a contact page — the number is set at display scale on
 * the dark ground and is the largest object on the page after the headline.
 *
 * THE ABSENT CHANNELS ARE ABSENT. No mailto, no "coming soon", no greyed-out row, no
 * invented mailbox and no address block. ChannelList.tsx builds the rows from a filtered
 * array, so supplying an address later is a data change rather than a redesign.
 *
 * THE LOCATION SLOT. Blueprint §6 asks for "location/mode information" and `site.address`
 * is null, so there is no place to name and none is named — no city appears anywhere on
 * this page except inside a photograph's provenance caption, where it is a fact about where
 * a picture was taken. What IS true about the mode is stated instead: enquiries are read
 * and answered on WhatsApp.
 *
 * THE FORM. Blueprint §14 asks for one, with routing, a confirmation state, delivery
 * verification, spam protection and consent. There is no backend and no mailbox to deliver
 * to. A form that silently goes nowhere is worse than no form, so the routing is carried by
 * the channel that works — each doorway opens WhatsApp with its own subject written into
 * the message. NOTES.md lists exactly what is needed to replace that with a real form.
 *
 * THE FAQs. Blueprint §6 asks for them. None have been supplied, and writing plausible ones
 * would be inventing the client's answers. Nothing renders.
 *
 * WHO IS NAMED. `yogaMandalaContact.name` ("Praṇav Śāstrī") is the contact the Yoga Mandala
 * document gives and `founder.name` ("Pranav Murthy") is the About document's founder;
 * content/site.ts records that the two are not to be silently reconciled. Neither is
 * presented here as "the contact for Praṇava", because no document says that. The Yoga
 * Mandala name appears once, in the Yoga Mandala sentence beneath the wall, which is its
 * own context.
 */
export const metadata = {
  title: contact.title,
  description:
    'Enquire about Praṇava — structured learning, ongoing practice, programmes, health-oriented guidance, collaborations and the Yoga Mandala community. Enquiries are answered on WhatsApp.',
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
              {site.name} keeps one open line. Whatever an enquiry is about, it arrives on
              the same number.
            </p>

            <div className="cx-open__grid">
              <div className="cx-open__col">
                <p className="cx-mark">
                  <span className="cx-mark__n">01</span>
                  <span className="cx-mark__r" aria-hidden="true" />
                </p>
                <h2 className="cx-h2">{contact.general.heading}</h2>
                {/* The honest answer to Blueprint §6's location/mode slot: the mode is
                    named because it is true, and no place is named because none is known. */}
                <p className="cx-lead">
                  Learning, practice, programmes, health-oriented guidance, collaborations
                  and the Yoga Mandala community — all of it is read and answered on
                  WhatsApp.
                </p>

                {/* One card, one line in it. A single filled row reads as a complete
                    object; a rack of slots with two of them empty reads as broken. */}
                <div className="cx-card">
                  <p className="cx-card__k">Enquiries reach</p>
                  <p className="cx-card__who">{site.name}</p>
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

        {/* ── THE SIX ROUTES, AS SIX DOORWAYS ────────────────────────────────
            No list. Arched openings cut down the paper, tilted and overlapping,
            each one a link that opens the line with its own subject written in. */}
        <Colonnade />

        {/* ── WHOSE ACCOUNTS THESE ARE ────────────────────────────────────────
            The wall goes dark and two more doorways are cut into it. Praṇava Seva
            Trust keeps the accounts; Yoga Mandala, one of its community
            initiatives, keeps none of its own. That is the reason the handle
            reads the way it does, so it is the heading and not a footnote. */}
        <Social />
      </main>

      <SiteFooter />
    </>
  );
}
