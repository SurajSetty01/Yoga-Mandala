import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Premise } from '@/components/preview/about-b/Premise';
import { Purpose } from '@/components/preview/about-b/Purpose';
import { Approach } from '@/components/preview/about-b/Approach';
import { Members } from '@/components/preview/about-b/Members';
import { Guiding } from '@/components/preview/about-b/Guiding';
import { AboutBMotion } from '@/components/preview/about-b/AboutBMotion';

/**
 * TOURNAMENT PREVIEW — About, concept B: "THE WORDS ARE THE GRAPHIC".
 *
 * The five sections the client rejected, rebuilt on one premise: at the right scale, weight
 * and behaviour the typography IS the visual event, and the photography works inside it —
 * clipped into the letterforms, feathered out of the ground behind them, or holding up the
 * baseline — never in a rectangle beside a column of text.
 *
 * Isolated on its own route so three concepts can be judged side by side. Every selector is
 * namespaced under `.about-b` in styles/preview-about-b.css and nothing outside this folder
 * is touched. <SiteNav light /> is included because the sections it hands over to must be
 * judged under the navigation they will actually live beneath — `light` is the state the
 * hero's choreography leaves the pill in by the time these sections arrive on the real page.
 * <SiteFooter /> is included for the same reason: 07 hands over to it.
 */
export const metadata = {
  title: 'About — concept B',
  description: 'Tournament preview: the About sections as typography.',
};

export default function AboutBPreview() {
  return (
    <>
      <SiteNav light />
      <main className="about-b" id="top">
        <Premise />
        <Purpose />
        <Approach />
        <Members />
        <Guiding />
      </main>
      <SiteFooter />
      <AboutBMotion />
    </>
  );
}
