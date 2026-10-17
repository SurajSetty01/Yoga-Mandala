import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';

/**
 * §08 FACULTY: a TEXT-LED section (the client's review, October 2026).
 *
 * "Not ready for final use. Do not use a mixture of old programme photographs or gallery
 * images to fill this area. Will share faculty profiles separately." So: the client's lead
 * and two sentences, verbatim, in type and whitespace alone. No photographs, no cards, no
 * placeholders. When profiles arrive they are a new thing, not a filling-in of this one.
 */
export function Sx7Faculty() {
  const { lead, body } = about.faculty;

  return (
    <section className="sx7-faculty" id="sx7-faculty">
      <div className="sx7-rail">
        <Eyebrow n="08" dark>
          Faculty
        </Eyebrow>
        <div className="sx7-grid">
          <p className="sx7-lead" data-ap="up">
            {lead}
          </p>
          <div className="sx7-body" data-ap="up">
            {body.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
