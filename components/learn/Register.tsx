import type { CSSProperties } from 'react';
import Link from 'next/link';
import { programmes } from '@/content/pranava';
import { Mark } from './parts';

/**
 * 05 — THE REGISTER.
 *
 * THE HARDEST SECTION ON THIS PAGE, and the reason for most of its design.
 *
 * The client's material names five programmes — Pravesha, Pragraha, Prayatna, Praguna,
 * Prabodha (Blueprint §4.3) — and says nothing else about any of them. There is no
 * description, duration, fee, schedule, prerequisite, outcome, intake date or testimonial
 * anywhere in the three source documents. `content/pranava.ts` carries all five with
 * `blurb: null`, and null must render as NOTHING.
 *
 * So this section is not a course catalogue and does not pretend to be one. It is a
 * REGISTER: a ruled book with two columns, "Programme" and "Details", in which the names
 * are entered and the details column honestly reads "On enquiry" with a route beside it.
 * A ruled blank is how an institution writes down that something exists and has not been
 * filled in yet; a fabricated syllabus is how a website pretends otherwise. The empty state
 * is drawn on purpose, with a column heading over it, so it reads as a page of a prospectus
 * rather than as a page that failed to load.
 *
 * THE ONE THING THAT IS ACTUALLY TRUE OF THE FIVE NAMES is that they are a family: every
 * one of them opens on the same three letters as Praṇava itself. That is an observable fact
 * about the words on the page and not a claim about the programmes, so it is the only thing
 * the typography says — the stem is set a shade back and the tails full strength, and
 * because all five stems are the same three glyphs at the same size with kerning off, they
 * form an exact vertical seam down the register without a rule being drawn. NOTHING IS
 * TRANSLATED. Glossing Sanskrit the client has not glossed would be inventing content.
 *
 * NO PHOTOGRAPHS. The section with no information gets no illustration: a picture beside a
 * name would imply we know what the programme is.
 *
 * Every row's link goes to the enquiry page and carries its own accessible name, so a
 * screen-reader user hears "Enquire about Pravesha" rather than six links called "Enquire".
 */

/** All five of the client's names open on these three letters, and so does Praṇava. */
const STEM = 'Pra';

/**
 * Blueprint §4.3 lists "Prāṇāyāma-related programs" alongside the five names. It is a
 * category rather than a programme name, so it is set in the text face and does not join
 * the stem — its long ā is a different word, and pretending otherwise would be a
 * typographic claim about Sanskrit that the client never made.
 */
const PRANAYAMA = 'Prāṇāyāma-related programmes';

export function Register() {
  return (
    <section className="ln-rg" id="the-named-programmes">
      <div className="ln-rg__in">
        <Mark n="04" dark>
          The named programmes
        </Mark>

        <div className="ln-rg__head" aria-hidden="true">
          <span className="ln-rg__hk">Programme</span>
          <span className="ln-rg__hd">Details</span>
        </div>

        <ul className="ln-rg__list">
          {programmes.map((p, i) => {
            const tail = p.name.startsWith(STEM) ? p.name.slice(STEM.length) : p.name;
            const stem = p.name.startsWith(STEM) ? STEM : '';
            return (
              <li
                className="ln-rg__row"
                key={p.name}
                data-ln="rule"
                style={{ '--d': `${i * 70}ms` } as CSSProperties}
              >
                <h3 className="ln-rg__name">
                  {stem ? <span className="ln-rg__stem">{stem}</span> : null}
                  <span className="ln-rg__tail">{tail}</span>
                </h3>
                {/* p.blurb is null for every programme. It renders as nothing, never as a
                    placeholder, an em-dash or a "coming soon". */}
                {p.blurb ? <p className="ln-rg__blurb">{p.blurb}</p> : null}
                <span className="ln-rg__det">
                  <span className="ln-rg__on">On enquiry</span>
                  <Link
                    className="ln-rg__a"
                    href="/contact/"
                    aria-label={`Enquire about ${p.name}`}
                  >
                    Enquire
                    <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                      <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </Link>
                </span>
              </li>
            );
          })}

          <li
            className="ln-rg__row ln-rg__row--cat"
            data-ln="rule"
            style={{ '--d': `${programmes.length * 70}ms` } as CSSProperties}
          >
            <h3 className="ln-rg__name ln-rg__name--cat">{PRANAYAMA}</h3>
            <span className="ln-rg__det">
              <span className="ln-rg__on">On enquiry</span>
              <Link
                className="ln-rg__a"
                href="/contact/"
                aria-label={`Enquire about ${PRANAYAMA}`}
              >
                Enquire
                <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                  <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
