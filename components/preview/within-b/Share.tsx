import { within } from '@/content/copy';
import { PILLAR_FRAMES } from './frames';
import { Chips, WallLabel } from './Pillars';

/**
 * 04 — SHARE. The page opens out.
 *
 * The first three pillars are apertures: tall, cut into paper, one room at a time. SHARE is
 * the shortest of the four — one line of introduction and six one-word gifts — and it is the
 * one that turns outward, so it gets the only wide frame on the page and the only one that
 * runs edge to edge. The composition changes because the content changes; that is the whole
 * reason it is allowed to.
 *
 * The frame is the archive's last unspent landscape loop, and what is in it is the pillar:
 * one teacher working with one student while the entire room stands watching and copies. The
 * client's closing sentence — "teachers help teachers" — is a caption for this photograph
 * before it is a sentence on a page, so it is set directly beneath it, and the paper never
 * comes back. From here the page is dark to the footer.
 */
export function Share() {
  const p = within.pillars[3];
  const f = PILLAR_FRAMES.Share!;
  const closing = 'closing' in p ? p.closing : null;

  return (
    <section className="wb-share" id={`wb-${p.index}`} aria-labelledby={`wb-h-${p.index}`}>
      <figure className="wb-share__fig wb-onDark" data-wb="fig">
        <span className="wb-fig__mask wb-share__mask" data-drift>
          <picture>
            <source type="image/avif" srcSet={`/media/posters/${f.id}.avif`} />
            <img
              className="wb-fig__img"
              src={`/media/posters/${f.id}.jpg`}
              width={f.w}
              height={f.h}
              style={{ objectPosition: f.pos }}
              loading="lazy"
              decoding="async"
              alt={f.alt}
            />
          </picture>
          {/* no `poster`: the <img> above is the poster and is never removed. */}
          <video
            className="wb-fig__vid"
            muted
            playsInline
            loop
            preload="none"
            tabIndex={-1}
            aria-hidden="true"
            disablePictureInPicture
            data-src={`/media/clips/${f.id}.mp4`}
          />
        </span>

        <div className="wb-share__say" data-wb="up">
          <p className="wb-share__no" aria-hidden="true">
            {p.index}
          </p>
          <h2 className="wb-share__name" id={`wb-h-${p.index}`}>
            <span className="sr">{`${p.index}. `}</span>
            {p.name}
          </h2>
          {p.lines.map((line) => (
            <p className="wb-share__line" key={line}>
              {line}
            </p>
          ))}
          {p.listLead ? <p className="wb-share__lead">{p.listLead}</p> : null}
        </div>

        <Chips items={p.items} className="wb-chips--wide" />
        <WallLabel f={f} />
      </figure>

      {closing ? (
        <div className="wb-share__closeIn" data-wb="up">
          <p className="wb-share__close">{closing}</p>
        </div>
      ) : null}
    </section>
  );
}
