/**
 * sx6: THE FOUNDER'S PORTRAIT SLOT.
 *
 * Founder.tsx passes `photo`: an illustration of Pranav Murthy made from an archive photograph
 * of him (Prabodha TTC, DSC_0333, seated under the banyan with palms joined), which the site
 * owner identified as him. His figure was cut out and reduced to three flat tones inside a
 * brass outline, so it reads as a drawing rather than a photo. The source file is
 * public/media/founder/pranav-murthy-seated.webp.
 *
 * Without `photo` the slot falls back to the hand-drawn line figure below, which is labelled
 * as what it shows and never as him.
 */

export type Sx6Photo = { src: string; alt: string; width: number; height: number };

/** Drawn once as the figure's right half (the viewer's left), and mirrored. */
const HALF = [
  /* head */
  'M200 21C213 21 223.5 34 223.5 50.5C223.5 67 213 80 200 80',
  /* neck, shoulder, the outer edge of the arm down to the wrist */
  'M188.5 76.5C188.5 84 188.2 91 187 97C180 104 161 106.5 146 110.5C133 114 126.5 125 125 140C123 160 121.5 182 118.5 202C115.5 218 102 234 84 247',
  /* neckline */
  'M186.5 104C189.5 110.5 194 114 200 114',
  /* the inner edge of the arm */
  'M145.5 150C144 168 141.5 186 136 200C129.5 216 112 238 92 253',
  /* the side of the body, turning into the thigh */
  'M151.5 160C153 180 153 200 151.5 213C150 228 141 242 108 249.5',
  /* knee and the folded leg along the floor */
  'M70.5 263.5C72 282 92 296 122 300C150 304 176 305 200 305',
  /* the hand, palm up: thumb, the ring it makes with the forefinger, the open fingers */
  'M84 247C79 250.5 72 251 67 251.5',
  'M67 251.5C66 247.5 59 247 58 251.5C57.2 255.5 60.5 258.8 65 258',
  'M92 253C84 257 76 261 68 263C61 264.5 54 266 49.5 269.5',
  'M49.5 266C54 262.5 59.5 260 65 258',
] as const;

/** The crossed shins: the near one whole, the far one until it passes behind. */
const ONCE = [
  'M92 262.5C150 268 234 281 297 291',
  'M308 262.5C282 265 247 272 215 280.5',
] as const;

export function Sx6Portrait({ photo = null }: { photo?: Sx6Photo | null }) {
  return (
    <div className={`sx6-portrait${photo ? ' sx6-portrait--photo' : ''}`}>
      {photo ? (
        <img
          className="sx6-portrait__img"
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          decoding="async"
        />
      ) : (
        <svg
          className="sx6-portrait__art"
          viewBox="46 18 308 290"
          role="img"
          aria-label="Line drawing of a teacher seated cross-legged, hands resting on the knees"
        >
          <g className="sx6-portrait__pen">
            {HALF.map((d) => (
              <path key={d} d={d} />
            ))}
            <g transform="matrix(-1 0 0 1 400 0)">
              {HALF.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            {ONCE.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </svg>
      )}
    </div>
  );
}
