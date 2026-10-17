import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';

/**
 * §07 THE FOUNDER: a calm mixed section.
 *
 * The standing portrait sits in a warm niche beside the name, role and biography; the
 * founder's sentence follows on its own, set as quiet type with room around it. On a wide
 * screen the niche takes the left third of the page measure and the text the rest, the
 * biography's later sentences running in two columns; the quotation sits in the text
 * column with its attribution in the niche's column. On a phone the figure stands beside
 * the name and the rest follows full width.
 *
 * Applied from the client's review: the seated cut-out was replaced with the client's own
 * photograph of him standing with folded hands, and the two walls of chair-supported
 * shoulderstands (with their scroll motion) were removed. The only motion is the page's
 * shared data-ap fade and rise (AboutMotion.tsx), inert without script and under reduced
 * motion.
 *
 * NAME. Every instance of the client's name is set in Inter (DESIGN-SYSTEM §1: Fraunces
 * drops the macrons of ā and ī). The lede is Fraunces, so the name inside it is wrapped in
 * an Inter span; the text is still sliced from `about.founder`, character for character.
 *
 * `about.founder.action` ("Meet Pranav") is NOT rendered: there is no such page.
 */
export function Sx6Founder() {
  const f = about.founder;

  /* "Founded by Praṇav Śāstrī", cut at the client's own " by " */
  const cut = f.kicker.indexOf(' by ');
  const by = cut === -1 ? '' : f.kicker.slice(0, cut + 3);
  const name = cut === -1 ? f.kicker : f.kicker.slice(cut + 4);

  const [first, ...rest] = f.body;
  const at = first ? first.indexOf(name) : -1;
  const lede =
    first && at !== -1 ? (
      <>
        {first.slice(0, at)}
        <span className="sx6-name">{name}</span>
        {first.slice(at + name.length)}
      </>
    ) : (
      first
    );

  return (
    <section className="sx6-founder" id="apr-founder" aria-labelledby="sx6-title">
      <div className="sx6-wrap">
        <div id="sx6-title" className="sx6-head">
          <Eyebrow n="07">The founder</Eyebrow>
        </div>

        <div className="sx6-grid">
          <figure className="sx6-niche" data-ap="up">
            <img
              className="sx6-niche__img"
              src="/media/founder/pranav-shastri-standing.webp"
              alt="Praṇav Śāstrī standing with hands folded"
              width={388}
              height={1200}
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="sx6-by" data-ap="up">
            <p className="sx6-kicker">
              {by ? (
                <>
                  <span className="sx6-kicker__by">{by}</span>{' '}
                </>
              ) : null}
              <span className="sx6-kicker__name">{name}</span>
            </p>
            <p className="sx6-role">{f.role}</p>
          </div>

          <div className="sx6-bio" data-ap="up">
            <p className="sx6-lede">{lede}</p>
            <div className="sx6-cols">
              {rest.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        <figure className="sx6-quote" data-ap="up">
          <figcaption className="sx6-quote__who">{name}</figcaption>
          <blockquote className="sx6-quote__q">
            <p>{f.quote}</p>
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
