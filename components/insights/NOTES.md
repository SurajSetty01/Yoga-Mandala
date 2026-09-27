# Praṇava — Insights

`/insights/`. Three sections. The brief (`Context/new/Pranava Website.docx` §7) asks for "a
simple page saying that writings and resources will be added here". `insights.articles` is
`null`, so no article, title, date, author, category or empty card is rendered or stubbed.

| # | section | what happens | ground | frames | files |
|---|---------|--------------|--------|--------|-------|
| — | Masthead | "A growing space for" sits on a hairline bough; its four nouns drop on hairlines like aerial roots beside a man under a banyan. Then one plain line about what is not here yet. CSS only. Holds the page's one `<h1>` | deep | `pr-ttc-dsc_0356` (≥1024px), `pr-ttc-dsc_0328` | `ti1/`, `styles/sec-ti1.css` |
| 01 | The kind of thinking that will be here | A reader's marks: as each of three passages crosses the reading line, a brass wash is drawn behind its display clause, a pencil bracket runs down the margin, and the answering photograph is uncovered level with it | paper | `pr-ttc-dsc_0285_1`, `pr-ttc-dsc_0479`, `pr-pbh-img_5405` | `ti2/`, `styles/sec-ti2.css` |
| 02 | When there is something to read | A paper slip carrying the prefilled WhatsApp request is passed round a circle of chairs and lands in front of the reader as "Ask to be told" | warm | `pr-ttc-dsc_0278_1` | `ti3/`, `styles/sec-ti3.css` |

Grounds run **deep · paper · warm**, and the footer's dark is the page's ending. The pill is
the dark variant (`<SiteNav />` without `light`) because the page opens on the deep ground.

Under `prefers-reduced-motion` (or with no script) every section renders its finished state:
the roots hung, every clause marked with its photograph in place, the slip already landed.

## Rules that still hold

- Passages are the strings in `content/pranava.ts`, located by `mark()` in `ti2/passages.ts`,
  which throws at build time if a clause is not found character for character. Keep the guard.
- Only passage 03 links (to `/about/#apr-founder`); 01 and 02 are no longer on a live page.
- There is no mailing list and every email in `content/site.ts` is null, so "be told" is a
  WhatsApp message the reader sends themself. No field is drawn.
- `styles/insights.css` holds only the `.ins` page wrapper. `.ins`, never `.in`: `.in` is the
  sitewide reveal class.
- Verification routes: `/preview/ti1/`, `/preview/ti2/`, `/preview/ti3/`.
