import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { AboutMotion } from '@/components/about-pranava/AboutMotion';
import { Hero } from '@/components/about-pranava/Hero';
import { Introduction } from '@/components/about-pranava/Introduction';
import { WhatIs } from '@/components/about-pranava/WhatIs';
import { Approach } from '@/components/about-pranava/Approach';
import { Teach } from '@/components/about-pranava/Teach';
import { Journey } from '@/components/about-pranava/Journey';
import { Founder } from '@/components/about-pranava/Founder';
import { Faculty } from '@/components/about-pranava/Faculty';
import { Seva } from '@/components/about-pranava/Seva';
import { Values } from '@/components/about-pranava/Values';
import { Closing } from '@/components/about-pranava/Closing';

/**
 * PRAṆAVA — About.  Eleven sections, eleven mechanics, and no two neighbours sharing a
 * ground or a move. Every sentence on the page comes out of content/pranava.ts verbatim;
 * nothing here retypes a client sentence, and nothing invents a fact the client has not
 * supplied. See components/about-pranava/NOTES.md.
 *
 *   hero  one room cut into three, whose horizons close into one          deep
 *   01    five lines opening like a fan on a widening wedge of paper      paper
 *   02    an enlargement you cannot place, stepping back into its room    deep
 *   03    three columns standing, and a fourth lying across their feet    paper
 *   04    a flight of stairs drawn in clay, one practice per tread        warm
 *   05    a wheel of four doors; the lit quarter turns as you scroll      deep
 *   06    the sentence he teaches by, set at the size of the room         paper
 *   07    four teachers at four depths, none of them named                deep
 *   08    six lines gathered under one bracket, and one door beneath it   warm
 *   09    four words of different lengths stretched to one measure        paper
 *   10    the last line, and two roads leaving it                         warm
 *
 * Everything above is a server component: every word, every photograph and every link is
 * in the static HTML. `AboutMotion` is the page's only client island.
 */
export const metadata = {
  title: 'About Praṇava',
  description:
    'Praṇava is a centre dedicated to approaching Yoga as a complete discipline of study, practice and living — rooted in tradition, sustained through practice and explored through inquiry.',
};

export default function AboutPranavaPage() {
  return (
    <>
      <SiteNav light />
      <main className="apr" id="top">
        <Hero />
        <Introduction />
        <WhatIs />
        <Approach />
        <Teach />
        <Journey />
        <Founder />
        <Faculty />
        <Seva />
        <Values />
        <Closing />
      </main>
      <AboutMotion />
      <SiteFooter />
    </>
  );
}
