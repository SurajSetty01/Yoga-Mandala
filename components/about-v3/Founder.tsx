import { about } from '@/content/pranava';

/**
 * 07 THE FOUNDER. The client: "Keep the content, change the image ... me standing with folded
 * hands, or a formal portrait. Founder Quote: keep the quote, give it a quiet typographic
 * treatment with generous whitespace rather than another large photographic gallery."
 *
 * MIXED. The portrait is his own photograph from his individual set (standing with palms
 * joined on a mat by the river at sunrise), uncut and ungraded. Beside it the kicker, the
 * role, the biography with its first sentence as the lede, and then the quote alone, large
 * and quiet, in the remaining space. His name is set in Inter wherever it carries ā and ī,
 * because Fraunces misplaces those macrons.
 */
export function A3Founder() {
  const f = about.founder;
  const [first, ...rest] = f.body;
  return (
    <section className="a3-sec a3-found" aria-labelledby="a3-found-h">
      <div className="a3-rail a3-found__grid">
        <figure className="a3-found__pic" data-a3r>
          <img
            src="/media/about-v3/founder-standing-1280.webp"
            srcSet="/media/about-v3/founder-standing-640.webp 640w, /media/about-v3/founder-standing-1280.webp 1280w, /media/about-v3/founder-standing-1920.webp 1920w"
            sizes="(min-width: 1000px) 34vw, 100vw"
            width={1280}
            height={1950}
            alt="Praṇav Śāstrī standing with palms joined on a mat by a river at sunrise"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="a3-found__copy">
          <p className="a3-label" data-a3r>
            <span className="a3-label__n">07</span> The founder
          </p>
          <h2 className="a3-found__h" id="a3-found-h" data-a3r>
            {f.kicker}
          </h2>
          <p className="a3-found__role" data-a3r>
            {f.role}
          </p>
          <p className="a3-found__lede" data-a3r>
            {first}
          </p>
          <div className="a3-found__body" data-a3r>
            {rest.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          <blockquote className="a3-found__quote" data-a3r>
            <p>{f.quote}</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
