import { about } from '@/content/copy';

/**
 * 06 — A COMMUNITY BUILT BY ITS MEMBERS.
 *
 * The section's headline is a photograph. One frame, edge to edge, carrying no type at all —
 * the exact inverse of the hero, where every word sits inside the picture, and of section 02,
 * where four narrow frames are labelled beside their type. It is also the only frame on this
 * page from the rope-wall shala rather than the Samskrithi hall, so the page shows two rooms
 * rather than one. Teachers sitting in a ring listening to one of their own is what the
 * heading actually says; nothing had to be captioned onto it.
 *
 * THE DUPLICATED LINE. `about.members.lines[3]` — "Everyone has something to learn. Everyone
 * has something to contribute." — is already section 02's display headline, twelve hundred
 * pixels up this same page. Printing it again would spend the page's best sentence twice and
 * flatten both. It stays where it already lands hardest, and this section keeps the three
 * lines that are only here: the refusal, the pivot, and the one that makes the pivot
 * concrete. Nothing is paraphrased and nothing is added — see components/about/NOTES.md.
 *
 * The three are set as a colophon in three columns rather than as a paragraph, with the pivot
 * in the display face. Its centre of gravity rhymes with the mandala above without repeating
 * its shape.
 */

const FRAME = {
  id: 'p13-img_0617',
  /* the audit's own alt for this frame, unedited */
  alt: 'Wide studio interior with participants seated on mats beneath ceiling slings and fans',
};

export function Members() {
  const [refusal, pivot, concrete] = about.members.lines;

  return (
    <section className="ab ab--warm ab-members">
      <div className="ab__inner">
        <h2 className="ab-eyebrow">
          <span>06</span>
          {about.members.heading}
        </h2>
      </div>

      {/* full-bleed: outside .ab__inner on purpose, so it reaches both edges at 2560 too */}
      <figure className="ab-members__fig" data-r="wipe">
        <img
          src={`/media/stills/${FRAME.id}-1920.webp`}
          srcSet={`/media/stills/${FRAME.id}-960.webp 960w, /media/stills/${FRAME.id}-1920.webp 1920w, /media/stills/${FRAME.id}-2560.webp 2560w`}
          sizes="100vw"
          loading="lazy"
          decoding="async"
          alt={FRAME.alt}
        />
      </figure>

      <div className="ab__inner">
        <div className="ab-members__lines">
          <p data-r="up">{refusal}</p>
          <p
            className="ab-members__pivot"
            data-r="up"
            style={{ '--d': '90ms' } as React.CSSProperties}
          >
            {pivot}
          </p>
          <p data-r="up" style={{ '--d': '180ms' } as React.CSSProperties}>
            {concrete}
          </p>
        </div>
      </div>
    </section>
  );
}
