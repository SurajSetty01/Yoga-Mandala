import Link from 'next/link';
import { footer } from '@/content/copy';
import { links, nav, site } from '@/content/site';

/**
 * THE SITEWIDE FOOTER.
 *
 * It lands beneath four very different sections, so it settles rather than competes: one
 * warm-black band, a calm masthead row, and then the client's two closing lines given the
 * whole width to themselves. Those two lines are the last thing anyone reads on this site,
 * so they are the largest type in the footer — not a legal strip with a tagline squeezed in
 * beside a copyright.
 *
 * Three facts and no more. The register is Praṇava's four doors — Learn · Practice · Heal ·
 * Insights — not Yoga Mandala's Connect · Learn · Collaborate · Grow, which belongs to the
 * community and not to the institution.
 *
 * THE PARENT CREDIT. This line read "{site.name} is an initiative under {site.trust}", which
 * after the rename rendered as "Praṇava is an initiative under Praṇava Seva Trust" —
 * circular, and asserted by no document. The client's documents say, twice and plainly, that
 * YOGA MANDALA is a community initiative under the Trust; they never say it of Praṇava. The
 * line now states only what is sourced, which is also why the Instagram account is a
 * Praṇava one rather than a Yoga Mandala one.
 *
 * What is NOT here, and must not be added until the client supplies it: an address, a city,
 * a country, an email, a founding year, a copyright year, a member count. `site.address`
 * and both e-mail links are null, and null renders as nothing.
 *
 * A server component with no client island — a footer has no behaviour. "To the top" uses
 * the `#top` fragment, which browsers resolve to the document top even on a page with no
 * element of that id, so it is safe on every route.
 */
export function SiteFooter() {
  const igHandle = `@${links.instagram.replace(/\/+$/, '').split('/').pop()}`;

  return (
    <footer className="ft">
      <div className="ft__in">
        <div className="ft__mast">
          <div className="ft__id">
            <p className="ft__name">{footer.name}</p>
            <p className="ft__desc">{footer.descriptor}</p>
            {/* The tagline verbatim, set as a register rather than a sentence. */}
            <p className="ft__reg">{footer.register.join(' · ')}</p>
          </div>

          <nav className="ft__col" aria-label="Footer">
            <p className="ft__k">Pages</p>
            <ul className="ft__list">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link className="ft__a" href={n.href}>
                    {n.full}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ft__col">
            <p className="ft__k">Connect</p>
            <ul className="ft__list">
              <li>
                <a
                  className="ft__a"
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                  <span className="ft__sub">{links.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  className="ft__a"
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                  <span className="ft__sub">{igHandle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* The envoi. The client's two closing lines, with room around them. */}
        <div className="ft__envoi">
          <p className="ft__rise">{footer.ym.rise}</p>
          <p className="ft__better">{footer.ym.better}</p>
        </div>

        <div className="ft__base">
          <p className="ft__trust">
            {footer.ym.name} is a community initiative under {site.trust}.
          </p>
          <a className="ft__top" href="#top">
            To the top
          </a>
        </div>
      </div>
    </footer>
  );
}
