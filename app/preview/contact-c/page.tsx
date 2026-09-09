import { SiteNav } from '@/components/SiteNav';
import { Assemble } from '@/components/preview/contact-c/Assemble';
import { contact } from '@/content/copy';
import { links, site } from '@/content/site';

/**
 * PREVIEW — CONTACT, CONCEPT C. "One statement."
 *
 * Isolated route. Every selector is namespaced under `.contact-c`, in
 * styles/preview-contact-c.css.
 *
 * THE PREMISE — refuse the list.
 *
 * Eight bullet points is what the client saw and rejected. But the eight are not eight
 * services; they are one open door described eight ways. So there is no list here at all:
 * the client's own words are set as ONE running sentence at poster scale, rail to rail,
 * where the line breaks fall wherever they fall — some lines carry two subjects, some carry
 * half of one. That is the difference between a list and a statement, and it is the whole
 * section.
 *
 * The eight subjects are the only words in full ink; the sentence that carries them is
 * softer, and the only marks that are not letters are eight clay dots — so the count is
 * present as texture instead of as rows. The action is the last clause of the same
 * sentence, which is why it is set at the same size as everything else.
 *
 * Social is the same voice again, one size down: a second sentence with the two accounts
 * inside it. Yoga Mandala being an initiative under Pranava Seva Trust is said as a fact
 * in a sentence, not printed as a disclaimer under a pair of buttons.
 */
export const metadata = { title: 'Preview · Contact C' };

const igHandle = `@${links.instagram.replace(/\/+$/, '').split('/').pop()}`;
const ITEMS = contact.collaborations.items;

/** A clay disc, not a glyph: --clay is 3.90:1 on cream and may never set a character. */
const Dot = () => <span className="cc-dot" aria-hidden="true" />;

export default function PreviewContactC() {
  return (
    <>
      <SiteNav />
      <Assemble />

      <main className="contact-c">
        <h1 className="cc-sr">{contact.title} — section preview C</h1>

        <div className="cc-handoff" aria-hidden="true">
          <span className="cc-handoff__t">Approved hero ends here</span>
        </div>

        <section className="cc-say" aria-labelledby="cc-say-h">
          <div className="cc-in">
            <header className="cc-head">
              <p className="cc-brow">{contact.collaborations.heading}</p>
              <h2 className="cc-q" id="cc-say-h">
                {contact.collaborations.lead}
              </h2>
            </header>

            {/* ONE sentence. The eight are spans inside it, not rows beneath it. */}
            <p className="cc-run">
              <span className="cc-run__lead" data-cr="">
                {contact.collaborations.listLead}
              </span>{' '}
              {ITEMS.map((item, i) => (
                <span className="cc-i" data-cr="" key={item}>
                  <span className="cc-i__t">{item}</span>
                  {i < ITEMS.length - 1 ? <Dot /> : null}
                </span>
              ))}{' '}
              <span className="cc-i cc-i--go" data-cr="">
                <Dot />
                <a
                  className="cc-go"
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.collaborations.action}
                  <svg
                    className="cc-go__arw"
                    viewBox="0 0 15 10"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M0 5h12.5M8.5 1L12.8 5 8.5 9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </a>
              </span>
            </p>

            <p className="cc-dest" data-cr="">
              WhatsApp · {links.whatsappDisplay}
            </p>
          </div>
        </section>

        <section className="cc-social" aria-labelledby="cc-social-h">
          <div className="cc-in">
            <p className="cc-brow cc-brow--b">{contact.social.heading}</p>
            <h2 className="cc-run cc-run--b" id="cc-social-h">
              <span className="cc-run__lead" data-cr="">
                {site.name} is an initiative under {site.parentOrg}, so the accounts are the
                Trust&rsquo;s:
              </span>{' '}
              <span className="cc-i" data-cr="">
                <a
                  className="cc-go cc-go--b"
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <Dot />
              </span>
              <span className="cc-i" data-cr="">
                <a
                  className="cc-go cc-go--b"
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </span>
            </h2>
            <p className="cc-dest" data-cr="">
              {igHandle} · the community
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
