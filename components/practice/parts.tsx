import { links } from '@/content/site';

/**
 * The objects the sections of /practice/ share (Eyebrow, Cap, Ask). Continuity across the site is the
 * register mark, the tokens, the type scale and the caption system; the mechanics are what
 * differ from section to section and from page to page.
 */

/**
 * The register mark, kept to the letter of the home page's and /about/'s.
 *
 * It is an `<h2>`, structurally. Most of this page's sections open on a term or on a
 * sentence of the client's prose rather than on a title, so marking those up as headings
 * would put six of the client's sentences into the document outline. The register mark is
 * the only thing on the page that IS a section title, so it carries the rank, and the two
 * named things — Prayatna, Prāṇāyāma — sit under their own mark at h3. The outline reads
 * Practice → 01 Ongoing Sādhana → 02 Regular practice → … → 06 Enquire.
 */
export function Eyebrow({
  n,
  children,
  dark = false,
}: {
  n: string;
  children: string;
  dark?: boolean;
}) {
  return (
    <h2 className={`pc-eyebrow${dark ? ' pc-eyebrow--dark' : ''}`}>
      <span className="pc-eyebrow__n">{n}</span>
      {children}
    </h2>
  );
}

/** The wall label under a picture: what it shows, at whisper size. Never a provenance. */
export function Cap({ children, dark = false }: { children: string; dark?: boolean }) {
  return <p className={`pc-cap${dark ? ' pc-cap--dark' : ''}`}>{children}</p>;
}

/**
 * THE HONEST MARK, and it appears three times on this page on purpose.
 *
 * Blueprint §6 asks Practice for "schedule/enquiry" and §16 lists "Current programs,
 * descriptions, schedules and fees" as content that does not exist yet. There is no
 * timetable, no session length, no fee, no start date and no class size anywhere in the
 * client's material, and Prayatna in particular is named in §4.3 and §6 and described
 * nowhere at all.
 *
 * So where a description would go, this says in one line that there is not one yet, and
 * opens the single channel that actually works. `links.whatsapp` is the only contact route
 * in content/site.ts that is not null; both email addresses are null and null renders as
 * nothing. The subject rides in the message, which is the honest version of Blueprint
 * §14's "program-specific enquiry routing" on a site with no form handler — the same
 * device components/contact/routes.ts uses, so the two pages behave identically.
 *
 * On a page whose subject is repetition, the same small object recurring at each unanswered
 * question is the right shape for it as well as the truthful one.
 */
export function Ask({
  subject,
  message,
  note,
  dark = false,
}: {
  /** what the reader is asking about, in the link's own words */
  subject: string;
  /** the message the channel opens with, editable by the sender before they send it */
  message: string;
  note: string;
  dark?: boolean;
}) {
  return (
    <p className={`pc-ask${dark ? ' pc-ask--dark' : ''}`}>
      <span className="pc-ask__note">{note}</span>
      <a
        className="pc-ask__link"
        href={`${links.whatsapp}?text=${encodeURIComponent(message)}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {subject}
        <svg
          className="pc-ask__arw"
          width="15"
          height="10"
          viewBox="0 0 15 10"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </a>
    </p>
  );
}
