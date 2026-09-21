import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Masthead } from '@/components/heal/Masthead';
import { Areas } from '@/components/heal/Areas';
import { Enquiry } from '@/components/heal/Enquiry';

/**
 * PRAṆAVA — HEAL.  `/heal/`, and deliberately a short page.
 *
 * THE BRIEF IS EXPLICIT. Context/new/Pranava Website.docx §7: "These two items should
 * appear in the main navigation now, but we do not need to build them fully. Heal: create
 * a simple page saying this area is being developed. It will eventually connect with
 * Pranava Svasthya and related work."
 *
 * Simple means not pretending to content that does not exist. It does not mean generic.
 *
 * WHAT EXISTS: four area names (`heal.areas`), the name they will be gathered under
 * (`heal.svasthya`), one sentence about the relationship between them (`heal.note`), one
 * line describing the area (About §7's fourth door) and one visitor intent (Blueprint §3).
 * That is the entire supply. There is no description of Yoga Therapy, Ayurveda, Nutrition
 * or Women's Wellness anywhere in the Blueprint, the About document or the Website brief,
 * and this is the one page in the site where inventing one could actually hurt somebody.
 *
 * So nothing on this page describes a service, states a benefit, implies clinical
 * capability or offers a consultation. What it does is name what will be here, draw the
 * join that has not been made, and open the one channel that works.
 *
 *   —   paper   the client's own line for this area, at the size of the page
 *   01  warm    four names reaching for a name they have not joined yet
 *   02  paper   the caveat before the link, and the link
 *
 * THREE THINGS THIS PAGE DOES THAT NO OTHER PAGE ON THE SITE DOES, all three of them
 * consequences of what it holds rather than decoration:
 *
 *  · It carries NO PHOTOGRAPH. The media audit covers 1,211 frames and 256 clips and there
 *    is not one image of therapy, consultation, assessment or a clinical setting in any of
 *    them. Borrowing an asana frame to stand in for therapy would be a health claim made
 *    in pictures, which is the same error as making one in words and harder to notice.
 *  · It never goes dark. Every other Praṇava page alternates paper and the reversed ground;
 *    this one stays on paper end to end, because the page's whole argument is that it is
 *    quiet, not that it is impressive.
 *  · It runs NO JAVASCRIPT. There is no client island, no scroll listener and no reveal.
 *    Under prefers-reduced-motion it is byte-for-byte the same page, because there is
 *    nothing to reduce.
 *
 * See components/heal/NOTES.md.
 */
export const metadata = {
  title: 'Heal',
  description:
    'Praṇava Svasthya is being developed. Four areas are named — Yoga Therapy, Ayurveda, Nutrition and Women’s Wellness — and nothing beyond the names has been published yet. Enquiries reach Praṇava directly.',
};

export default function HealPage() {
  return (
    <>
      <SiteNav light />
      <main className="hl" id="top">
        <Masthead />
        <Areas />
        <Enquiry />
      </main>
      <SiteFooter />
    </>
  );
}
