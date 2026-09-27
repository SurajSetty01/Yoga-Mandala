import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Th1Notice } from '@/components/heal/th1/Notice';
import { Th2Areas } from '@/components/heal/th2/Areas';
import { Th3Ask } from '@/components/heal/th3/Ask';

/**
 * PRAṆAVA — HEAL.  `/heal/`, and deliberately a short page.
 *
 * THE BRIEF IS EXPLICIT. Context/new/Pranava Website.docx §7: "These two items should
 * appear in the main navigation now, but we do not need to build them fully. Heal: create
 * a simple page saying this area is being developed. It will eventually connect with
 * Pranava Svasthya and related work."
 *
 * WHAT EXISTS: four area names (`heal.areas`), the name they will be gathered under
 * (`heal.svasthya`), one sentence about the relationship between them (`heal.note`), one
 * line describing the area (About §7's fourth door) and one visitor intent (Blueprint §3).
 * Nothing on this page describes a service, states a benefit, implies clinical capability
 * or offers a consultation, and no frame shows therapy or a body being treated.
 *
 *   —   paper   th1  the standing notice: held for a screen while the view tilts up
 *                    out of a grove to a palm crown; "evolving" never settles its weight
 *   01  warm    th2  a tree seat's rim traced in the photograph and projected down into
 *                    a plan; the ring stops short, the four names round it, Svasthya at
 *                    the centre
 *   02  paper   th3  the message is the striker: the enquiry plate hangs from a chime's
 *                    cord and swings when struck
 *
 * Each section's styles live in styles/sec-th<n>.css; the shared register mark is in
 * styles/heal.css. See each component's header for its reduced-motion state.
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
        <Th1Notice />
        <Th2Areas />
        <Th3Ask />
      </main>
      <SiteFooter />
    </>
  );
}
