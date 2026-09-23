/**
 * The one object the two leaves share.
 *
 * A running head is what a book uses to say where you are, and it is the only
 * thing on this preview that is repeated between the sections: a folio mark, the
 * section's title, and a dotted leader that runs out to the edge of the leaf and
 * draws across as you arrive. Continuity is this object and the type scale;
 * everything beneath it is different in both sections.
 *
 * It carries the section's `<h2>`, so the document outline reads
 * "About Praṇava" → "Our approach" → "How we teach" and nothing else on the page
 * competes for a heading rank. The four terms in §03 sit under it at `<h3>`.
 */
export function RunningHead({ folio, title, id }: { folio: string; title: string; id: string }) {
  return (
    <header className="ac-head ac-leaf" data-ac="fade">
      <div className="ac-head__in">
        <span className="ac-head__folio" aria-hidden="true">
          {folio}
        </span>
        <h2 className="ac-head__title" id={id}>
          {title}
        </h2>
        <span className="ac-head__leader" aria-hidden="true" />
      </div>
    </header>
  );
}
