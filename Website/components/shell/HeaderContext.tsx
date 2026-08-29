"use client";

import { useEffect } from "react";

/**
 * Pages with a dark full-bleed hero render <OverHero /> so the masthead starts transparent
 * with light text, then transitions to the solid sand bar on scroll. Pages without a hero get
 * the solid bar immediately. Implemented via a body data-attribute so the header can read it
 * without prop drilling across the App Router tree.
 */
export function OverHero() {
  useEffect(() => {
    document.body.dataset.overHero = "true";
    return () => {
      delete document.body.dataset.overHero;
    };
  }, []);
  return null;
}
