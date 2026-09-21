/**
 * — · THE ANSWER FIRST.
 *
 * The largest type on the page is the thing a visitor came to find out, and it is a
 * negative. That is the whole argument of this masthead: a page that leads with atmosphere
 * and hides "nothing is scheduled" three screens down wastes the reader's time, and a page
 * that leads with it and then shows them something real does not.
 *
 * The masthead's bottom padding is deliberately collapsed in the stylesheet, so the dark
 * strip begins immediately beneath this line and the two read as one object rather than as
 * a hero followed by a section.
 *
 * NOTHING HERE PROMISES A DATE. "When there is something to announce" is a condition, not
 * a schedule, and the list of what an announcement would carry is Blueprint §6's own spec
 * for this page rather than an invention of this component.
 */
export function Masthead() {
  return (
    <section className="ev-s ev-s--paper ev-top">
      <div className="ev-rail">
        <h1 className="ev-h1">
          <span className="ev-h1__rule" aria-hidden="true" />
          Events
        </h1>

        <p className="ev-lede">Nothing is scheduled at the moment.</p>

        <div className="ev-top__foot">
          <p className="ev-top__say">
            When there is something to announce it will be listed here, with what it is,
            when it runs and how to take part. Until then, what this page can honestly show
            is the record — photographs of gatherings that have already happened at
            Praṇava.
          </p>
          <p className="ev-top__note">
            The captions say what each photograph shows. None of them is an announcement.
          </p>
        </div>
      </div>
    </section>
  );
}
