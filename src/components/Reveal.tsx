"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * The one shared scroll-reveal primitive (docs/P00 §4).
 * Fires once. Never re-triggers. Disabled by prefers-reduced-motion via CSS.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "rise",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: "rise" | "wipe";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The observed node must never carry the clip-path: Chromium factors a
  // target's own clip-path into its intersection rect, so a wipe element
  // clipped to inset(100%) never intersects and never reveals itself.
  // The clip therefore lives on an inner wrapper.
  return (
    <Tag
      ref={ref}
      data-shown={shown}
      className={`${variant === "wipe" ? "" : "reveal"} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {variant === "wipe" ? (
        <div className="wipe" data-shown={shown} style={{ ["--reveal-delay" as string]: `${delay}ms` }}>
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  );
}
