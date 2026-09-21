import { about } from '@/content/pranava';

/**
 * 01 · THE STANDING NOTICE.
 *
 * The page's largest type is the client's own one-line description of what this area is —
 * About §7's fourth door, verbatim — and the word under it that the whole page turns on is
 * "evolving". Nothing here is a heading the client did not write: the `<h1>` is the
 * navigation's own label at label scale, because an `<h1>` is a rank and not a font size.
 *
 * There is no photograph. See NOTES.md §"The page with no picture".
 */
export function Masthead() {
  const line = about.journey[2].body;

  return (
    <section className="hl-s hl-s--paper hl-top">
      <div className="hl-rail">
        <h1 className="hl-h1">
          <span className="hl-h1__rule" aria-hidden="true" />
          Heal
        </h1>
        <p className="hl-lede">{line}</p>
      </div>
    </section>
  );
}
