import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { AboutMotion } from '@/components/about-pranava/AboutMotion';
import { AboutHero } from '@/components/about-pranava/sx1/AboutHero';
import { AboutIntroduction } from '@/components/about-pranava/sx2/Introduction';
import { WhatIs } from '@/components/about-pranava/WhatIs';
import { OurApproach } from '@/components/about-pranava/sx3/Approach';
import { HowWeTeach } from '@/components/about-pranava/sx4/HowWeTeach';
import { PranavaJourney } from '@/components/about-pranava/sx5/PranavaJourney';
import { Sx6Founder } from '@/components/about-pranava/sx6/Founder';
import { Sx7Faculty } from '@/components/about-pranava/sx7/Faculty';
import { Sx8Seva } from '@/components/about-pranava/sx8/Seva';
import { Sx9Values } from '@/components/about-pranava/sx9/Values';
import { Closing } from '@/components/about-pranava/Closing';

/**
 * PRAṆAVA — About.  Eleven sections, eleven mechanics, and no two neighbours sharing a
 * ground or a frame. Every sentence on the page comes out of content/pranava.ts verbatim;
 * nothing here retypes a client sentence, and nothing invents a fact the client has not
 * supplied.
 *
 *   hero  five women along a red floor whose walls are gone; the class
 *         rises through the name as you leave                           deep   sx1
 *   01    a claim split around a mat-wide strip; four plates open from
 *         one mat's width to full bleed                                  paper  sx2
 *   02    an enlargement you cannot place, stepping back into its room  deep   WhatIs
 *   03    an open book whose gutter closes as you read                  paper  sx3
 *   04    one supported inversion eight times, then one long exposure   warm   sx4
 *   05    four rooms, each seen through a doorway in the one before     deep   sx5
 *   06    one row shot from both ends, closing into two walls           paper  sx6
 *   07    seven standpoints turning to one eye level, one room          deep   sx7
 *   08    six rings spreading out from one person                       warm   sx8
 *   09    four veiled slits opening to the full frame on the reading line paper sx9
 *   10    the last line, and two roads leaving it                       warm   Closing
 *
 * Each sx section brings its own motion script and its own stylesheet
 * (styles/sec-sx<n>.css). `AboutMotion` now drives only §02 and §10.
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
        <AboutHero />
        <AboutIntroduction />
        <WhatIs />
        <OurApproach />
        <HowWeTeach />
        <PranavaJourney />
        <Sx6Founder />
        <Sx7Faculty />
        <Sx8Seva />
        <Sx9Values />
        <Closing />
      </main>
      <AboutMotion />
      <SiteFooter />
    </>
  );
}
