'use client';

import { useEffect, useRef } from 'react';

/**
 * A muted looping clip that loads and plays only while it is on screen, and pauses when it
 * leaves. The poster is a real <img> underneath, so the frame is there before the video and
 * with reduced motion or no JavaScript the still simply stays.
 */
export function A3Clip({
  src,
  poster,
  alt,
  className,
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.isIntersecting) {
          if (!v.src) v.src = src;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <div className={`a3-clip ${className ?? ''}`}>
      <img src={poster} alt={alt} loading="lazy" decoding="async" />
      <video ref={ref} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
    </div>
  );
}
