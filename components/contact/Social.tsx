import { contact } from '@/content/copy';
import { links, site } from '@/content/site';
import { Arrow } from './ChannelList';

/**
 * BAND 03 — TWO MORE DOORWAYS, CUT INTO A DARK WALL.
 *
 * The colonnade ends and the wall goes dark. Two openings of the same arch are cut into it
 * and lit from the far side — same shape, no photograph in them, because what is through
 * them is not ours. Yoga Mandala is an initiative under Pranava Seva Trust and keeps no
 * accounts of its own; that is the reason these handles read the way they do, so it is
 * stated as the heading rather than tucked underneath as a disclaimer.
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
          {site.name} is an initiative under {site.parentOrg}.
        </h2>
        <p className="cx-social__say">
          It keeps no accounts of its own. These are the Trust&rsquo;s.
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
            <a
              className="cx-door"
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="cx-door__k">WhatsApp</span>
              <span className="cx-door__v">The community</span>
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
