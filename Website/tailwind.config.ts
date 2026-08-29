import type { Config } from "tailwindcss";

/**
 * Yoga Mandala — "Living Manuscript" design tokens.
 * Palette grounded in the client's own promotional artifact (warm sand / forest / gold),
 * deliberately distinct from any prior build. See docs/02-design-system.md.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    // Deliberate, non-metronomic spacing scale. Sections breathe unevenly.
    extend: {
      colors: {
        sand: {
          DEFAULT: "#F3EEE3", // primary warm ivory ground
          deep: "#E7DFCE", // alternating grounds, insets
        },
        bark: {
          DEFAULT: "#211E19", // primary ink, warm near-black
          soft: "#5C574C", // secondary text
        },
        forest: {
          DEFAULT: "#26402C", // primary green accent, dark sections, footer
          deep: "#182A1D", // immersive full-bleed grounds
        },
        terracotta: "#B4562E", // single warm accent — hover/active/emphasis, sparing
        gold: "#A6853F", // hairline rules, small marks, badges
        moss: "#7C8A63", // tertiary — category differentiation only
      },
      fontFamily: {
        // Self-hosted via next/font in app/layout.tsx; CSS variables set there.
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        deva: ["var(--font-deva)", "serif"],
      },
      fontSize: {
        // Fluid scale (desktop -> mobile) via clamp. See docs/02-design-system.md §type-scale.
        "display-xl": ["clamp(2.75rem, 1.2rem + 7vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-l": ["clamp(2.125rem, 1.2rem + 4.2vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-m": ["clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem)", { lineHeight: "1.06", letterSpacing: "-0.01em" }],
        title: ["clamp(1.375rem, 1.1rem + 1vw, 1.75rem)", { lineHeight: "1.15" }],
        lead: ["clamp(1.125rem, 1rem + 0.5vw, 1.375rem)", { lineHeight: "1.5" }],
        body: ["clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)", { lineHeight: "1.65" }],
        small: ["0.9375rem", { lineHeight: "1.55" }],
        label: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.08em" }],
      },
      spacing: {
        // 8px base with intentional jumps used for section rhythm.
        section: "clamp(4rem, 2rem + 9vw, 12.5rem)", // ~200px desktop
        "section-sm": "clamp(3rem, 2rem + 5vw, 6rem)", // ~96px
        "section-md": "clamp(3.5rem, 2rem + 7vw, 9rem)", // ~144px
      },
      maxWidth: {
        prose: "42rem", // ~672px, keeps text 62-72ch
        content: "90rem", // 1440px
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        fast: "240ms",
        base: "480ms",
        slow: "900ms",
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee-x 42s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
