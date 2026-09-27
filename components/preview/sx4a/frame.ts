/**
 * §04 HOW WE TEACH, concept A — the one frame this section is built from, and why it is
 * this frame. Read the frame, then read the reasons; every claim below was checked against
 * the pixels, not the manifest.
 *
 * `pr-mov-img_5704` — the POSTER still of the only landscape clip in the Praṇava library,
 * 1920×1080 (the original IMG_5704.MOV is also 1920×1080 HEVC, so there is no sharper
 * source to be had). NOTHING ON THE SITE USES IT: not the clip, not the poster — checked by
 * grepping components/ and app/ for the id.
 *
 * WHY THIS FRAME. It is the only frame in 84 stills and 16 clips in which the section's
 * whole argument is happening at once, inside one room, in one instant:
 *   · a class holding one pose on its mats — practice, done together, repeatedly;
 *   · an older man sitting in an alcove with his arms folded, WATCHING it;
 *   · the man nearest the camera looking down at his own feet — attending to his own
 *     practice rather than performing it;
 *   · and at the right a teacher with both hands on a student's hips, setting her stance —
 *     guiding another person's practice, which is the exact phrase the client closes on.
 * The teacher is motion-blurred (he is mid-step) and his face cannot be made out; the
 * student is folded forward and hers is not visible either. The recognisable faces are
 * class members in a documentary group frame, the basis on which this page already
 * publishes such frames.
 *
 * TWO THINGS IN THIS FRAME MUST NEVER BE SHOWN, and both sit in its last ~6.5%:
 *   · a tote bag printed "…PARAM YOGA" with a logo — ANOTHER ORGANISATION'S NAME, legible
 *     at full size (x ≥ 0.948 of the frame);
 *   · a face with glasses cut by the right edge, blurred (x ≥ 0.95).
 * Every crop in preview-sx4a.css therefore ends at x ≤ 0.935: the strip shows 0.12–0.935
 * (desktop) or 0.72–0.935 (narrow), the print 0–0.935, 0.26–0.935 or 0.45–0.90.
 * The painting by the doorway carries a line of script that is not legible at any size
 * this page renders, and names nothing identifiable.
 *
 * PROVENANCE. The clip's source is `Prabhava Photos/IMG_5704.MOV` — the same camera roll
 * as the pr-pbh-* stills (IMG_5362 … IMG_5808 bracket it), shot in the same yellow-walled,
 * blue-curtained room as pr-pbh-img_5362, _5499 and _5629. A certificate in the archive
 * confirms Prabhava as a five-day Hatha-Iyengar immersion held 2–6 October 2023, and this
 * frame's own content — a class, wooden blocks at every mat, wall ropes in the alcove — is
 * consistent with it. That is the only basis for the caption, and it is enough.
 */
export const FRAME = {
  id: 'pr-mov-img_5704',
  avif: '/media/posters/pr-mov-img_5704.avif', // 39 KB — checked beside the JPEG at 100%; no visible loss
  jpg: '/media/posters/pr-mov-img_5704.jpg', // 163 KB fallback
  w: 1920,
  h: 1080,
  alt: 'A class holds a wide-legged standing pose on mats in a yellow-walled hall. An older man watches from a folding chair in an alcove behind them, and at the right a teacher places both hands on a student’s hips to set her stance.',
  stripAlt:
    'A photograph of a class printed as a darkroom test strip in eight bands: the first fully printed, and each band after it paler than the one before.',
  stripCap: 'Test strip — one frame, eight exposures',
  printCap: 'The same frame, printed whole. Prabhava, a five-day Hatha-Iyengar immersion, 2–6 October 2023',
} as const;

/** Eight practices, eight bands. The client's list is eight long and the strip is cut to it. */
export const BANDS = 8;

/**
 * Density from exposure. A band's exposure runs 0 → 1 over the whole of the pinned travel;
 * its printed density is exposure^GAMMA, and its veil of unexposed paper is 1 − density.
 * 0.85 rather than 1 so the eighth band, at an exposure of 1/8, still prints at 0.17 — a
 * ghost you can read as a room, not a blank. Final veils: 0 .107 .217 .329 .445 .566 .692 .829
 */
export const GAMMA = 0.85;

/** The last tenth of the pinned travel holds the finished strip still before it leaves. */
export const HOLD = 0.1;

export function veil(exposure: number): number {
  const e = Math.min(1, Math.max(0, exposure));
  return 1 - Math.pow(e, GAMMA);
}

/** Band i was uncovered first if i = 0; its final exposure is (BANDS − i) / BANDS. */
export function finishedVeil(i: number): number {
  return +veil((BANDS - i) / BANDS).toFixed(3);
}
