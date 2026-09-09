import { within } from '@/content/copy';
import { pillars } from '@/content/site';

/**
 * THE MASTHEAD — a title page, then a mandala.
 *
 * The hero opens with a moving photograph and puts its type inside the picture. This page
 * opens with the opposite: no picture at all, and the four ideas set as a quartered figure
 * on warm paper. The register above the title is the client's own pillar list — Connect ·
 * Learn · Collaborate · SHARE, which is deliberately not the Grow-ending tagline.
 *
 * The quadrant is the page's index as well as its first image: each cell jumps to its
 * chapter, so a reader who wants only "Collaborate" never has to scroll for it.
 */
export function WithinMasthead() {
  return (
    <header className="wi-mast">
      <p className="wi-mast__eyebrow">{pillars.join(' · ')}</p>
      <h1 className="wi-mast__h">{within.title}</h1>
      <p className="wi-mast__lead">{within.lead}</p>

      <nav className="wi-quad" aria-label="The four ideas">
        {within.pillars.map((p) => (
          <a className="wi-quad__c" href={`#idea-${p.index}`} key={p.index}>
            <span className="wi-quad__n">{p.index}</span>
            <span className="wi-quad__w">{p.name}</span>
            <svg
              className="wi-quad__arw"
              width="15"
              height="10"
              viewBox="0 0 15 10"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        ))}
      </nav>
    </header>
  );
}
