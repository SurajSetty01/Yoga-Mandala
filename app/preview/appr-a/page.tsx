import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { AaMotion } from '@/components/preview/appr-a/AaMotion';
import { Approach } from '@/components/preview/appr-a/Approach';
import { Teach } from '@/components/preview/appr-a/Teach';

/**
 * ISOLATED PREVIEW — concept A for §03 OUR APPROACH and §04 HOW WE TEACH.
 *
 * Nothing outside `app/preview/appr-a/`, `components/preview/appr-a/` and
 * `styles/preview-appr-a.css` is touched: /about/ and every other route are left exactly as
 * they are so three concepts can be judged side by side. Every selector in the stylesheet
 * is `.aa-` prefixed and none of them is two letters long.
 *
 * The two sections are shown in page order with the navigation above them and real ground
 * below, so the spacing reads as it would in the page rather than as a specimen sheet.
 * `light` is passed because §03 opens on paper — the pill has to be judged against the
 * ground it will actually sit over.
 *
 * WHAT EACH SECTION IS, IN ONE SENTENCE EACH:
 *   03  one photograph of the hall shown four times, each time from further away, every
 *       larger view marking what the last one showed, until the sheet of paper runs out and
 *       the room is there whole;
 *   04  one sentence of eight practices whose type grows and whose spacing opens as it
 *       goes, so it ends slow, large and unfinished, a long silence before the one small
 *       sentence that closes it.
 */
export const metadata = { title: 'Preview A — Approach & Teach' };

export default function PreviewApprA() {
  return (
    <>
      <SiteNav light />
      <main className="aa" id="top">
        {/* The real page's single <h1> lives in its hero, which this route does not own.
            This page still needs exactly one, so it carries the client's own page title. */}
        <h1 className="aa-sr">{about.hero.heading}</h1>
        <Approach />
        <Teach />
        {/* enough ground below that the pair's bottom spacing reads true */}
        <div className="aa-ground" aria-hidden="true" />
      </main>
      <AaMotion />
    </>
  );
}
