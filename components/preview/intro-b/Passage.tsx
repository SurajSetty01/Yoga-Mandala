import { about } from '@/content/pranava';
import {
  CLIP_HALL,
  CLIP_MAT,
  PANEL_SIZES,
  STATIONS,
  src,
  srcSet,
  type Clip,
  type Still,
} from './frames';

/**
 * INTRODUCTION · CONCEPT B — THE PASSAGE.
 *
 * Describe it as something that happens: **the reader walks down a corridor of
 * one shala; the walls step back at every station so the passage opens as the
 * argument widens; a band of daylight travels down the walls with the reader,
 * so the only part of the room fully lit is the part they are level with; and
 * at the fifth line the walls stop and the passage gives onto one wide frame
 * of the whole class, the only picture on the page that is never in shade.**
 *
 * WHY THE LIGHT AND NOT A PICTURE ON THE RIGHT. The complaint about the
 * shipped section is that it feels empty with nothing beside the type. Setting
 * a photograph to the right of it would answer that with the one layout this
 * site exists to avoid, and would also be untrue to the copy: these five lines
 * are not a caption to a picture, they are an argument that widens from one
 * short claim to a belief. So the picture is not beside the reader — it is on
 * both sides of them, and it is a place rather than an illustration. The
 * movement is the light in that place, which is how a room tells someone where
 * they are standing.
 *
 * EVERY WORD IS `content/pranava.ts`, UNTOUCHED. Two sentences are cut and set
 * in two registers — the client's own em dash in the second line, and the
 * "not merely … but" turn in the fifth. Both cuts are `slice` on the exported
 * string with nothing inserted and nothing dropped, so the characters that
 * reach the page are the characters the client wrote. Nothing is retyped here.
 *
 * This is a server component: all five lines, all nine photographs and both
 * clip posters are in the static HTML. `PassageMotion` is the only client
 * island and it does exactly one thing — attach and release the two clips.
 */

/** Cut a sentence in two at a marker, keeping every character. */
function cut(s: string, mark: string, after = 0): [string, string] {
  const i = s.indexOf(mark);
  if (i < 0) return [s, ''];
  return [s.slice(0, i + after), s.slice(i + after)];
}

function Panel({
  side,
  frame,
  clip,
}: {
  side: 'l' | 'r';
  frame?: Still | undefined;
  clip?: Clip | undefined;
}) {
  return (
    <figure className={`ib-panel ib-panel--${side}`}>
      {clip ? (
        <>
          {/*
            The visible poster, and the ONLY poster: the <video> below carries
            no `poster` attribute, because a poster on a video sitting under a
            visible <img> is downloaded whether or not the video is ever
            attached. That cost this site 948 KB once. See DESIGN-SYSTEM §1.
          */}
          <picture>
            <source srcSet={`/media/posters/${clip.id}.avif`} type="image/avif" />
            <img
              className="ib-panel__img"
              src={`/media/posters/${clip.id}.jpg`}
              width={clip.w}
              height={clip.h}
              alt={clip.alt}
              style={{ ['--ib-pos' as string]: clip.pos }}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <video
            className="ib-panel__vid"
            style={{ ['--ib-pos' as string]: clip.pos }}
            muted
            playsInline
            loop
            preload="none"
            tabIndex={-1}
            aria-hidden="true"
            disablePictureInPicture
            data-src={`/media/clips/${clip.id}.mp4`}
          />
        </>
      ) : frame ? (
        <img
          className="ib-panel__img"
          src={src(frame, 960)}
          srcSet={srcSet(frame)}
          sizes={PANEL_SIZES}
          alt={frame.alt}
          style={{ ['--ib-pos' as string]: frame.pos }}
          loading="lazy"
          decoding="async"
        />
      ) : null}
    </figure>
  );
}

export function Passage() {
  const [vastHead, vastTail] = cut(about.intro[1]!, '—');
  const [beliefHead, beliefTurn] = cut(about.intro[4]!, ', but ', 1);

  return (
    <section className="ib-intro" aria-labelledby="ib-title">
      <div className="ib-lede">
        {/* the site's register mark, and the page's only h1 */}
        <h1 className="ib-mark" id="ib-title">
          <span className="ib-mark__n" aria-hidden="true">
            01
          </span>
          <span className="ib-mark__r" aria-hidden="true" />
          Introduction
        </h1>
      </div>

      <div className="ib-passage">
        <div className="ib-corridor">
          {/* THE TRAVELLING DAYLIGHT, one lamp per wall. Pure CSS: sticky inside
              the corridor, so it is pinned to the viewport and stopped at the
              corridor's two ends, and it never crosses the middle column where
              the reader's line of type runs. aria-hidden and pointer-events
              none — it is weather, not content. */}
          <div className="ib-lampWrap ib-lampWrap--l" aria-hidden="true">
            <span className="ib-lamp" />
          </div>
          <div className="ib-lampWrap ib-lampWrap--r" aria-hidden="true">
            <span className="ib-lamp" />
          </div>

          {STATIONS.map((st, i) => (
            <div
              className="ib-row"
              key={i}
              style={{ ['--ib-i' as string]: i }}
            >
              <Panel side="l" frame={st.left ?? undefined} clip={i === 0 ? CLIP_MAT : undefined} />

              <div className="ib-say">
                {i === 0 ? (
                  <p className="ib-line ib-line--claim">{about.intro[0]}</p>
                ) : i === 1 ? (
                  <p className="ib-line" style={{ ['--ib-measure' as string]: '34ch' }}>
                    <span className="ib-line__head">{vastHead}</span>
                    <span className="ib-line__tail">{vastTail}</span>
                  </p>
                ) : (
                  <p
                    className="ib-line"
                    style={{ ['--ib-measure' as string]: i === 2 ? '37ch' : '40ch' }}
                  >
                    {about.intro[i]}
                  </p>
                )}
              </div>

              <Panel side="r" frame={st.right} />
            </div>
          ))}
        </div>

        {/* THE PASSAGE GIVES ONTO THE HALL. No walls, no lamp, nothing in shade:
            the corridor's whole job was to arrive here. The deep ground stops
            partway down the frame so the room the reader walks out into stands
            half in the passage and half on the paper of the page. */}
        <div className="ib-open">
          <div className="ib-open__in">
            <p className="ib-open__say">
              {beliefHead}
              <em className="ib-open__turn">{beliefTurn}</em>
            </p>
            <figure className="ib-open__frame">
              <picture>
                <source srcSet={`/media/posters/${CLIP_HALL.id}.avif`} type="image/avif" />
                <img
                  src={`/media/posters/${CLIP_HALL.id}.jpg`}
                  width={CLIP_HALL.w}
                  height={CLIP_HALL.h}
                  alt={CLIP_HALL.alt}
                  style={{ ['--ib-pos' as string]: CLIP_HALL.pos }}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <video
                style={{ ['--ib-pos' as string]: CLIP_HALL.pos }}
                muted
                playsInline
                loop
                preload="none"
                tabIndex={-1}
                aria-hidden="true"
                disablePictureInPicture
                data-src={`/media/clips/${CLIP_HALL.id}.mp4`}
              />
            </figure>
          </div>
        </div>
      </div>

      <div className="ib-outro" />
    </section>
  );
}
