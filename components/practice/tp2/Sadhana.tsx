import { Eyebrow } from "../parts";
import { PRACTICE } from "../sentences";
import { DO, KNOW, knowSrcSet } from "./media";
import { Tp2Wake } from "./Wake";

/**
 * 01 · ONGOING SĀDHANA. A PICTURE WAKES WHEN THE SENTENCE SAYS "EXPERIENCE".
 *
 * The client's two sentences argue that knowing has to become doing: "Yoga cannot be
 * understood through intellectual study alone. Practice allows knowledge to become
 * experience." Each sentence gets a picture, and both pictures show the same pose.
 *
 *  · Beside the first sentence, a headstand between two chairs stands in greyscale. It is
 *    symmetrical and still, and it looks like a diagram.
 *  · Beside the second, another person holds the same pose, grey as well at first. When
 *    the second sentence crosses the reading line (62% of the viewport height), grey
 *    retracts upward from the floor, colour comes back, the loop starts, and the word
 *    "experience" turns forest green over a clay rule.
 *
 * The layout is a Z. The still is high on the left and the first sentence is set against
 * it. The second sentence is set to the right and lower, and the clip is lower still. The
 * reader goes from knowing to doing across the section.
 *
 * THE FINISHED STATE IS THE DEFAULT. With no JavaScript, or with reduced motion on, the
 * clip's poster is in colour and the word is green. The contrast between the grey still
 * and the coloured frame beside it says the whole thing without anything moving. Tp2Wake
 * holds the frame grey only once it knows it can wake it.
 *
 * The client's value line "Consistent practice over quick results." is left out on
 * purpose: the hero has just said it. The eyebrow already carries "Sādhana".
 *
 * "experience" is found in the client's sentence and split out at runtime, so the text on
 * screen is still PRACTICE[1] character for character.
 */
export function PracticeSadhana() {
  const know = PRACTICE[0] ?? "";
  const become = PRACTICE[1] ?? "";
  const at = become.lastIndexOf("experience");
  const head = at >= 0 ? become.slice(0, at) : become;
  const word = at >= 0 ? become.slice(at, at + "experience".length) : "";
  const tail = at >= 0 ? become.slice(at + "experience".length) : "";

  return (
    <section className="tp2-sec" id="pc-sadhana">
      <div className="tp2-rail">
        <Eyebrow n="01">Ongoing Sādhana</Eyebrow>

        <div className="tp2-stage">
          <p className="tp2-line tp2-line--know">{know}</p>

          <figure className="tp2-fig tp2-fig--know">
            <span className="tp2-frame">
              <img
                className="tp2-img tp2-img--know"
                src={`/media/stills/${KNOW.id}-960.webp`}
                srcSet={knowSrcSet}
                sizes="(min-width: 900px) min(22vw, 350px), (min-width: 600px) 17rem, 46vw"
                width={KNOW.w}
                height={KNOW.h}
                alt={KNOW.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: KNOW.pos }}
              />
            </span>
          </figure>

          <p className="tp2-line tp2-line--do" data-tp2-line="">
            {head}
            {word ? <span className="tp2-word">{word}</span> : null}
            {tail}
          </p>

          <figure className="tp2-fig tp2-fig--do">
            <span className="tp2-frame">
              {/* colour: the poster, and the state everyone without motion sees */}
              <picture>
                <source
                  type="image/avif"
                  srcSet={`/media/posters/${DO.id}.avif`}
                />
                <img
                  className="tp2-img"
                  src={`/media/posters/${DO.id}.jpg`}
                  width={DO.w}
                  height={DO.h}
                  alt={DO.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: DO.pos }}
                />
              </picture>
              <video
                className="tp2-vid"
                muted
                playsInline
                loop
                preload="none"
                tabIndex={-1}
                aria-hidden="true"
                disablePictureInPicture
                data-src={`/media/clips/${DO.id}.mp4`}
                style={{ objectPosition: DO.pos }}
              />
              {/* grey: the same poster file again, so it costs nothing extra. The grey
                  layer covers the clip until the sentence wakes it */}
              <span className="tp2-grey" aria-hidden="true">
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`/media/posters/${DO.id}.avif`}
                  />
                  <img
                    className="tp2-img"
                    src={`/media/posters/${DO.id}.jpg`}
                    width={DO.w}
                    height={DO.h}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: DO.pos }}
                  />
                </picture>
              </span>
            </span>
          </figure>
        </div>
      </div>
      <Tp2Wake />
    </section>
  );
}
