import { about } from '@/content/pranava';

/**
 * 04 HOW WE TEACH. The client: "keep the eight teaching principles ... ONE strong teaching
 * photograph. Remove raw image captions, dates and programme-gallery metadata."
 *
 * The one photograph is cut out of its background: Praṇav steadying a student's side bend,
 * standing in the section itself rather than in a box, in front of a tall sandstone arch
 * like the shala's doorways, and drifting slower than the page (Motion.tsx, data-a3-float). The opening sentence
 * and the eight practices sit on the other side, the practices arriving one by one.
 */
export function A3Teach() {
  const t = about.teach;
  return (
    <section className="a3-sec a3-teach" aria-labelledby="a3-teach-h">
      <div className="a3-rail a3-teach__grid">
        <div className="a3-teach__fig">
          <span className="a3-teach__door" aria-hidden="true" />
          <img
            data-a3-float="0.35"
            src="/media/about-v3/teach-cutout.webp"
            width={656}
            height={1884}
            alt="Praṇav Śāstrī steadying a student's hip as she reaches into a standing side bend"
            loading="lazy"
            decoding="async"
          />
        </div>

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
          <ol className="a3-teach__list" data-a3-rise>
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
