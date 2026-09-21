import { contact } from '@/content/copy';
import { links, site } from '@/content/site';
import { Arrow } from './ChannelList';

/**
 * BAND 03 — TWO MORE DOORWAYS, CUT INTO A DARK WALL.
 *
 * The colonnade ends and the wall goes dark. Two openings of the same arch are cut into it
 * and lit from the far side — same shape, no photograph in them, because what is through
 * them is not this page's.
 *
 * WHOSE ACCOUNTS THESE ARE, corrected. This band used to read "<site.name> is an initiative
 * under <site.trust>", which was written when `site.name` was Yoga Mandala. After the
 * conversion `site.name` is "Praṇava", and the sentence became a claim about Praṇava that
 * no client document makes: the About document says Praṇava Seva Trust "works towards
 * supporting the Yoga community", and names YOGA MANDALA — not Praṇava — as "one such
 * community initiative under Praṇava Seva Trust". So the heading now says only what is
 * sourced: the Trust is who keeps the accounts, and Yoga Mandala is the initiative that
 * keeps none of its own. That is the client's own message, in design/CONTENT.md:
 *
 *   "We don't have exclusive Social for Yoga Mandala, as this is now an initiative under
 *    Pranava Seva Trust, you can add the socials for the same."
 *
 * Both links leave the site, so both carry target and rel. The Instagram handle is derived
 * from the URL so the label and the destination cannot drift apart, and the client's
 * personal share token is already stripped in content/site.ts.
 */
export function Social() {
  const igHandle = `@${links.instagram.replace(/\/+$/, '').split('/').pop()}`;

  return (
    <section className="cx-social" aria-labelledby="cx-social-h">
      <div className="cx-social__in">
        <p className="cx-eyebrow cx-eyebrow--dark">{contact.social.heading}</p>
        <h2 className="cx-social__h" id="cx-social-h">
          {site.trust} keeps the accounts.
        </h2>
        <p className="cx-social__say">
          Yoga Mandala is a community initiative under the Trust and keeps none of its own.
        </p>

        <ul className="cx-soc">
          <li>
            <a
              className="cx-door"
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="cx-door__k">Instagram</span>
              <span className="cx-door__v">{igHandle}</span>
              <span className="cx-door__go">
                Open
                <Arrow />
              </span>
            </a>
          </li>
          <li>
            {/* The same open line the whole page routes to, restated at the foot of it.
                `links.emailGeneral`, `links.emailProgrammes` and `links.emailCollaborations`
                are all null and render as nothing — there is no third doorway. */}
            <a
              className="cx-door"
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="cx-door__k">WhatsApp</span>
              <span className="cx-door__v">{links.whatsappDisplay}</span>
              <span className="cx-door__go">
                Open
                <Arrow />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
