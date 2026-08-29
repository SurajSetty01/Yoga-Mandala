# 08 — Accessibility & Performance

## Accessibility (WCAG 2.2 AA target)

- **Semantics & landmarks:** one `<h1>` per page, ordered headings, `header/nav/main/footer`,
  skip link to `#main`, focus moved to the page heading on route change.
- **Keyboard:** full operability including the header mega-panels (Esc closes, arrow/tab
  navigation), the mobile overlay (focus trapped, Esc closes), filter chips, and horizontal
  rails (buttons + keyboard scroll, never scroll-only).
- **Focus:** visible focus ring (2px terracotta, 2px offset) on every interactive element;
  targets ≥44px.
- **Colour & contrast:** `bark` on `sand` ≈ 13:1; `sand` on `forest`/`forest-deep` verified AA;
  no information conveyed by colour alone — badges always carry text.
- **Images:** alt text on every content image; decorative/texture images `aria-hidden`.
- **Motion:** `prefers-reduced-motion: reduce` disables transforms/scroll animation; opacity
  fades reduced to ~120ms. Verified in `styles/globals.css` and per-component motion guards.
- **Forms (Join/Submit, UI-only):** labels tied to inputs, error messages associated via
  `aria-describedby`, non-functional submit state clearly announced.

## Performance (LCP < 2.5s on 4G, CLS < 0.1)

- Static generation for all public pages.
- Images: AVIF/WebP, responsive sizes, **explicit width/height** to prevent CLS; only the hero
  is `priority`, everything below the fold lazy.
- Fonts self-hosted, `font-display: swap`, subset to Latin (+ Devanagari where used).
- JS kept lean: framer-motion imported only in client components that animate; most pages are
  server components with no client JS.
- No layout shift on header scroll transition or route transition.

## Verification checklist (run in Task 11)

- [ ] `npm run build` clean
- [ ] Lighthouse performance ≥ 90 mobile, accessibility 100
- [ ] Keyboard end-to-end incl. rails, filters, mega-panels, mobile overlay
- [ ] `prefers-reduced-motion` fully honoured
- [ ] All routes resolve; sitemap.xml + robots present
- [ ] Every sample entry marked; all samples isolated to `content/samples/`
- [ ] Every asset credited in CREDITS.md / GENERATED.md
