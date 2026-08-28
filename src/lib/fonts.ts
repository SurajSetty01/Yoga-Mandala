import { Tiro_Devanagari_Sanskrit } from "next/font/google";

/**
 * Devanagari face — used ONLY for actual Sanskrit terms, never as decoration.
 * See docs/02-DESIGN-SYSTEM.md §2.
 *
 * Erode (display) and Satoshi (body) are loaded from Fontshare in globals.css.
 * TODO(perf): self-host both before launch — design system §9 requires it.
 */
export const tiro = Tiro_Devanagari_Sanskrit({
  weight: "400",
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--font-tiro",
});
