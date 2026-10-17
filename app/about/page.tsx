import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { A3Reveal } from '@/components/about-v3/Reveal';
import { A3Motion } from '@/components/about-v3/Motion';
import { A3Hero } from '@/components/about-v3/Hero';
import { A3Introduction } from '@/components/about-v3/Introduction';
import { A3WhatIs } from '@/components/about-v3/WhatIs';
import { A3Approach } from '@/components/about-v3/Approach';
import { A3Teach } from '@/components/about-v3/Teach';
import { A3Values } from '@/components/about-v3/Values';
import { A3Journey } from '@/components/about-v3/Journey';
import { A3Founder } from '@/components/about-v3/Founder';
import { A3Faculty } from '@/components/about-v3/Faculty';
import { A3Seva } from '@/components/about-v3/Seva';
import { A3Closing } from '@/components/about-v3/Closing';

/**
 * PRAṆAVA ABOUT, rebuilt from scratch (October 2026) against the client's About review and
 * website architecture brief, with the Yoga Mandala page as the standard: each section about
 * one screen, one idea each, a rhythm of image-led, text-led and mixed sections, and a gentle
 * reveal as the only motion. Sections in components/about-v3/, styles in styles/about-v3.css,
 * copy from content/pranava.ts.
 *
 *   hero  paper  the title over Praṇav teaching beneath the Praṇava emblem
 *   01    warm   text-led: the claim, three sentences, the belief and its three photographs
 *   02    deep   mixed: what Praṇava is, beside the centre speaking and teaching
 *   03    paper  four principles, one image each; Transmission is the scorpion-pose clip
 *   04    warm   mixed: one teaching photograph beside the eight practices
 *   05    deep   the four values; the photograph follows the word you choose
 *   06    paper  image-led: three doors (Learn, Practice, Heal)
 *   07    warm   mixed: his portrait, the biography and the quote
 *   08    paper  text-led: faculty, until profiles arrive
 *   09    deep   mixed: Seva and the Yoga Mandala community
 *   10    image  begin where you are
 */
export const metadata = {
  title: 'About Praṇava',
  description:
    'Praṇava is a centre dedicated to approaching Yoga as a complete discipline of study, practice and living: rooted in tradition, sustained through practice and explored through inquiry.',
};

export default function AboutPranavaPage() {
  return (
    <>
      <SiteNav light />
      <main className="a3" id="top">
        <A3Hero />
        <A3Introduction />
        <A3WhatIs />
        <A3Approach />
        <A3Teach />
        <A3Values />
        <A3Journey />
        <A3Founder />
        <A3Faculty />
        <A3Seva />
        <A3Closing />
      </main>
      <A3Reveal />
      <A3Motion />
      <SiteFooter />
    </>
  );
}
