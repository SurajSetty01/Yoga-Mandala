import { about } from '@/content/pranava';
import { Eyebrow, FRAMES, Shot } from './parts';

/**
 * 06 · THE FOUNDER — the sentence he teaches by, set at the size of the room.
 *
 * The brief's §13 says in as many words: do not let the Founder section dominate the page.
 * So the hierarchy is inverted on purpose. The pull-quote is the largest thing here and the
 * biography that produced it is set beneath it at reading size, in a single column beside
 * one photograph in which he is plainly not the only person in the room. Five sentences,
 * one picture, one quotation, no portrait and no second display line.
 *
 * `about.founder.action` — "Meet Pranav" — is NOT rendered. There is no founder page in
 * this app and none in the client's material, and a button that goes nowhere is worse than
 * no button. It stays in the content file for whoever builds that page.
 *
 * The name is set in Inter, never Fraunces — DESIGN-SYSTEM §1. It carries no diacritic in
 * the client's spelling of it here, but a person's name is not the place to discover that a
 * display face mis-sets one.
 */
export function Founder() {
  return (
    <section className="apr-s apr-founder" id="apr-founder">
      <div className="apr-rail">
        <Eyebrow n="06">The founder</Eyebrow>

        <blockquote className="apr-founder__q" data-ap="up">
          {about.founder.quote}
        </blockquote>

        {/* the client's own kicker, not a <cite>: it identifies the founder, and this agent
            cannot assert from the source document who said the sentence above it. */}
        <p className="apr-founder__by" data-ap="up">
          <span className="apr-founder__name">{about.founder.kicker}</span>
          <span>{about.founder.role}</span>
        </p>

        <div className="apr-founder__lower">
          <figure className="apr-founder__fig" data-ap="fade">
            <Shot frame={FRAMES.founderRoom} sizes="(max-width: 899px) 100vw, 40vw" />
          </figure>
          <div className="apr-founder__bio" data-ap="up" style={{ ['--apr-d' as string]: '110ms' }}>
            {about.founder.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
