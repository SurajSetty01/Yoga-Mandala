import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Ti1Masthead } from '@/components/insights/ti1/Masthead';
import { MarkedPassages } from '@/components/insights/ti2/MarkedPassages';
import { Ti3Told } from '@/components/insights/ti3/Told';

/**
 * PRAṆAVA — INSIGHTS.  `/insights/`, and deliberately a short page.
 *
 * THE BRIEF IS EXPLICIT. Context/new/Pranava Website.docx §7: "Insights: create a simple
 * page saying that writings and resources will be added here. A full journal/blog can be
 * developed later."
 *
 * WHAT DOES NOT EXIST. `insights.articles` is `null`. No article, title, date, author,
 * excerpt, category, tag or resource is rendered, stubbed or drawn as an empty card.
 *
 *   —   deep    ti1  the sentence puts down roots: "A growing space for" on a hairline
 *                    bough, its four nouns hanging on hairlines beside a man under a banyan;
 *                    then one plain line about what is not here yet. The page's one <h1>.
 *   01  paper   ti2  a reader's marks: three of Praṇava's own sentences, each clause washed
 *                    in brass as it crosses the reading line, a pencil bracket in the margin
 *                    and the answering photograph uncovered beside it.
 *   02  warm    ti3  a note passed round the circle: the prefilled WhatsApp request travels
 *                    the ring of chairs and lands in front of the reader as "Ask to be told".
 *
 * Grounds run deep · paper · warm, and the footer's dark is the page's ending. Each section
 * owns its styles in styles/sec-<id>.css; styles/insights.css keeps only the page wrapper.
 * The pill stays in its dark variant because the page opens on the deep ground.
 *
 * See components/insights/NOTES.md.
 */
export const metadata = {
  title: 'Insights',
  description:
    'A growing space for writing, reflection, study and exploration. Nothing has been published yet; three passages from Praṇava’s own writing stand in the meantime.',
};

export default function InsightsPage() {
  return (
    <>
      <SiteNav />
      <main className="ins" id="top">
        <Ti1Masthead />
        <MarkedPassages />
        <Ti3Told />
      </main>
      <SiteFooter />
    </>
  );
}
