import type { Action } from './action';
import { resolveAction } from './action';
import { join } from '@/content/copy';
import { links, taglines } from '@/content/site';

/**
 * MOVEMENTS 3 AND 4 — the two smaller doors, back on paper.
 *
 * Three blocks, not three equal cards: join >> contribute > submit. The hierarchy is carried
 * by ground (reversed / warm inset / bare paper), by column width (1.2fr against 1fr), by
 * heading size, and by the weight of the action — a display slab, then two 14px links.
 *
 * Both of these actions have a null destination. See ./action.ts for how that is handled and
 * why the slot never collapses.
 */
function ActionLink({ action }: { action: Action }) {
  return (
    <a
      className="jn-act"
      href={action.href}
      {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="jn-act__t">{action.label}</span>
      <svg
        className="jn-act__arw"
        width="15"
        height="10"
        viewBox="0 0 15 10"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 5h12.5M8.5 1 12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </a>
  );
}

export function Doors() {
  const contribute = resolveAction(
    links.emailGeneral,
    join.contribute.action,
    'Bring it to the WhatsApp community'
  );
  const submit = resolveAction(
    links.submitOffering,
    join.submissions.action,
    'Ask in the WhatsApp community'
  );

  return (
    <section className="jn-open jn-paper">
      <article className="jn-card jn-card--major" data-jn-r aria-labelledby="jn-contribute">
        <h2 id="jn-contribute">{join.contribute.heading}</h2>
        {join.contribute.lines.map((l) => (
          <p className="jn-card__lead" key={l}>
            {l}
          </p>
        ))}
        <p className="jn-card__cue">{join.contribute.listLead}</p>
        <ul className="jn-list">
          {join.contribute.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="jn-card__close">{join.contribute.closing}</p>
        <ActionLink action={contribute} />
      </article>

      <article className="jn-card jn-card--minor" data-jn-r aria-labelledby="jn-submissions">
        <h2 id="jn-submissions">{join.submissions.heading}</h2>
        {join.submissions.lines.map((l) => (
          <p className="jn-card__lead" key={l}>
            {l}
          </p>
        ))}
        <p className="jn-card__via">{join.submissions.via}</p>
        <ActionLink action={submit} />
        <div className="jn-card__note">
          <p>{join.submissions.note}</p>
        </div>
      </article>

      <div className="jn-close">
        <p>{taglines.guiding}</p>
      </div>
    </section>
  );
}
