import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Masthead } from '@/components/insights/Masthead';
import { Passages } from '@/components/insights/Passages';
import { Told } from '@/components/insights/Told';

/**
 * PRAṆAVA — INSIGHTS.  `/insights/`, and deliberately a short page.
 *
 * THE BRIEF IS EXPLICIT. Context/new/Pranava Website.docx §7: "Insights: create a simple
 * page saying that writings and resources will be added here. A full journal/blog can be
 * developed later."
 *
 * Simple means not pretending to content that does not exist. It does not mean generic.
 *
 * WHAT DOES NOT EXIST. `insights.articles` is `null`. No article, title, date, author,
 * excerpt, category, tag or resource appears in the Blueprint, the About document or the
 * Website brief. Blueprint §6 asks this page for a featured article, a category set, a
 * latest-articles list, a search and a resource library, and every one of the five needs
 * articles to exist first. None is rendered, none is stubbed, and no empty card is drawn —
 * a grid of blank article frames manufactures exactly the impression that the missing
 * writing would have earned.
 *
 * WHAT DOES EXIST is the thinking. The client's About document argues, at length and well,
 * that Yoga is not understood by collecting techniques, that a certificate does not make a
 * teacher, and that inquiry is part of practice. Those are the sentences a first article
 * would be built from, they are already published on `/about/`, and they are what a reader
 * arriving with Blueprint §3's "I want to understand more" actually came for. So the page
 * reads three of them instead of promising three that do not exist.
 *
 *   —   deep    the masthead, and one plain sentence about what is not here
 *   01  paper   three paragraphs, each read at two distances at once
 *   02  warm    two seats with nobody on them, and the way to be told
 *
 * HOW THIS PAGE DIFFERS FROM ITS TWO NEIGHBOURS — Heal and Events are the other two pages
 * the brief holds back, and the difference between the three is deliberate rather than
 * incidental. Insights is the READING page: it is the only one of the three that opens on
 * the reversed ground, the only one whose mechanic is typographic rather than drawn or
 * photographic, and the only one that carries a running folio. Its media weight is one
 * photograph, against Heal's none and Events' six, and that gradient is set by what the
 * archive can honestly supply each of them rather than by taste.
 *
 * Everything here is a server component. There is NO client island and no script of any
 * kind: the folio is `position: sticky`, which is layout, so the page under
 * prefers-reduced-motion is byte-for-byte this page.
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
      <main className="in" id="top">
        <Masthead />
        <Passages />
        <Told />
      </main>
      <SiteFooter />
    </>
  );
}
