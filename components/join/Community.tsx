import { join } from '@/content/copy';
import { links } from '@/content/site';

/**
 * MOVEMENT 2 — THE DOOR. The single most important thing on this site.
 *
 * Its idea is the inverse of the hero's. There, type stands on a photograph and a scrim has
 * to be tuned until the words survive the frame. Here the photograph *becomes* the ground:
 * a full-bleed strip dissolves into --ground-deep, and every word below stands on flat,
 * measured warm black. No text ever meets a pixel of picture, so contrast is a constant
 * instead of a negotiation with the crop (DESIGN-SYSTEM §1).
 *
 * Weight, not decoration, is what makes this block the primary one: it is the only reversed
 * ground on the page, it is full-bleed where everything else is inset, and its action is a
 * slab set in display type — sized like a headline, not like a button — rather than the
 * 14px link the two secondary blocks get.
 */
export function Community() {
  return (
    <section className="jn-door" id="community" aria-labelledby="jn-community">
      <div className="jn-door__strip">
        <img
          src="/media/stills/p13-img_0544-1920.webp"
          srcSet="/media/stills/p13-img_0544-960.webp 960w, /media/stills/p13-img_0544-1920.webp 1920w, /media/stills/p13-img_0544-2560.webp 2560w"
          sizes="100vw"
          width={2560}
          height={1440}
          loading="lazy"
          decoding="async"
          alt="A full class holding downward-facing dog on mats while a teacher watches from the side of the hall."
        />
        <span className="jn-door__dissolve" aria-hidden="true" />
      </div>

      <div className="jn-door__body">
        <div className="jn-door__head">
          <p className="jn-eyebrow jn-eyebrow--dark">The way in</p>
          <h2 id="jn-community">{join.community.heading}</h2>
        </div>

        <div className="jn-door__what">
          <p className="jn-door__lead">{join.community.lead}</p>
          <ul className="jn-litany">
            {join.community.items.map((item, i) => (
              <li key={item} data-jn-r style={{ '--jn-d': `${i * 70}ms` } as React.CSSProperties}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="jn-door__act">
          <a
            className="jn-slab"
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-jn-r
          >
            <span className="jn-slab__text">
              <span className="jn-slab__label">{join.community.action}</span>
              <span className="jn-slab__sub">Opens WhatsApp in a new tab</span>
            </span>
            <span className="jn-slab__arw" aria-hidden="true">
              <svg width="19" height="13" viewBox="0 0 19 13" focusable="false">
                <path
                  d="M0 6.5h16M11.6 1.2 17 6.5l-5.4 5.3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
