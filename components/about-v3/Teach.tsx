import { about } from '@/content/pranava';

/**
 * 04 HOW WE TEACH. The client: "keep the eight teaching principles. Replace the large image
 * sequence with ONE strong teaching photograph. Remove raw image captions, dates and
 * programme-gallery metadata."
 *
 * MIXED. One tall photograph of Praṇav adjusting a student's side bend under the emblem
 * and the tree mural; beside it the lead, the opening sentence, and the eight practices as
 * a two-column register (they are a list the client gives in order, so they are numbered).
 * The closing sentence sits under the register as the section's conclusion.
 */
export function A3Teach() {
  const t = about.teach;
  return (
    <section className="a3-sec a3-teach" aria-labelledby="a3-teach-h">
      <div className="a3-rail a3-teach__grid">
        <figure className="a3-teach__pic" data-a3r>
          <img
            src="/media/about-v2/ss-ven0116-teach-960.webp"
            srcSet="/media/about-v2/ss-ven0116-teach-480.webp 480w, /media/about-v2/ss-ven0116-teach-960.webp 960w, /media/about-v2/ss-ven0116-teach-1080.webp 1080w"
            sizes="(min-width: 1000px) 34vw, 100vw"
            width={960}
            height={1707}
            alt="Praṇav Śāstrī steadying a student's hip as she reaches into a standing side bend on a blue mat"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="a3-teach__copy">
          <p className="a3-label" data-a3r>
            <span className="a3-label__n">04</span> How we teach
          </p>
          <h2 className="a3-teach__h" id="a3-teach-h" data-a3r>
            {t.lead}
          </h2>
          <p className="a3-teach__open" data-a3r>
            {t.open}
          </p>
          <p className="a3-teach__prompt" data-a3r>
            {t.prompt}
          </p>
          <ol className="a3-teach__list" data-a3r>
            {t.practices.map((p, i) => (
              <li key={p}>
                <span className="a3-teach__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {p}
              </li>
            ))}
          </ol>
          <p className="a3-teach__close" data-a3r>
            {t.close}
          </p>
        </div>
      </div>
    </section>
  );
}
