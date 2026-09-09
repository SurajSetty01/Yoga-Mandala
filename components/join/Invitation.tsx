import { join } from '@/content/copy';

/**
 * MOVEMENT 1 — THE ADDRESS.
 *
 * The opening is the only place on this site where the copy speaks to one person, so it is
 * set as a dialogue rather than as a paragraph: the question in Fraunces italic, soft ink,
 * and its answer outdented past a clay rule in roman ink. Call, then reply. Nowhere else in
 * the design system does display italic carry a whole sentence at this size.
 *
 * Beside it, two photographs laid by hand rather than aligned to a grid — one person, and
 * one person inside a full room. Section 02 of the About page is four equal frames in a
 * strict row; this is deliberately its opposite, and neither is the hero's full-bleed
 * moving picture. No type sits on either photograph.
 */
export function Invitation() {
  return (
    <section className="jn-invite jn-paper" aria-labelledby="jn-title">
      <div className="jn-invite__type">
        <p className="jn-eyebrow">Join / Connect</p>
        <h1 id="jn-title">{join.title}</h1>

        <p className="jn-ask">{join.main[0]}</p>
        <p className="jn-reply">{join.main[1]}</p>
        <p className="jn-invite__note">{join.main[2]}</p>
      </div>

      <div className="jn-plate">
        <figure className="jn-plate__a">
          <img
            src="/media/stills/ss-dsc07126-1920.webp"
            srcSet="/media/stills/ss-dsc07126-960.webp 960w, /media/stills/ss-dsc07126-1920.webp 1920w"
            sizes="(max-width: 980px) 74vw, 34vw"
            width={1920}
            height={1280}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            alt="A practitioner balances on one leg with both arms lifted overhead in an outdoor class."
          />
        </figure>
        <figure className="jn-plate__b">
          <img
            src="/media/stills/p13-img_0620-960.webp"
            width={960}
            height={720}
            loading="lazy"
            decoding="async"
            alt="A participant sitting back on her heels on a purple mat in the foreground of a class, the rest of the group seated behind her."
          />
        </figure>
      </div>
    </section>
  );
}
