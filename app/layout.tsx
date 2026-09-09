import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/content/site';

/**
 * Self-hosted at build time by next/font, so there is no third-party request and no
 * render-blocking @import — the design workspace loaded these from Google Fonts, which
 * cost a measured 0.0129 CLS on the font swap. Both faces are variable: Fraunces carries
 * display and its optical-size axis, Inter carries text.
 */
/*
 * latin-ext is required, not optional: the client's name is Praṇav Śāstrī, which needs
 * ṇ U+1E47, Ś U+015A, ā U+0101 and ī U+012B. Google's latin-ext subset spans U+0100-02BA
 * and U+1E00-1E9F, covering all four. Without it the name falls back mid-word to whatever
 * the system supplies — a person's name set in two different typefaces.
 */
const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  axes: ['SOFT', 'WONK', 'opsz'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.descriptor}`,
    template: `%s — ${site.name}`,
  },
  description:
    'Yoga Mandala is a community of Yoga teachers and serious practitioners coming together to connect, learn, collaborate and grow.',
  // site.url is null until the client supplies a domain; metadataBase stays unset rather
  // than guessing one, which would put a wrong canonical on every page.
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
};

export const viewport: Viewport = {
  themeColor: '#FBF7F2',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
     * data-scroll-behavior is required in Next 16: it no longer overrides scroll-behaviour
     * during navigation unless asked. Without it an in-page smooth scroll would leak into
     * route changes and make every navigation crawl.
     */
    /*
     * suppressHydrationWarning is required here and is scoped to this element's own
     * attributes, not the tree: the inline script below adds `js` to <html> before React
     * hydrates, so the client's class list legitimately differs from the server's. Without
     * it React reports a hydration mismatch on every page. This is the same pattern a
     * theme-flash script uses, and it is the reason the class is added pre-paint rather
     * than from an effect.
     */
    <html
      lang={site.lang}
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Marks the document as scripted BEFORE first paint.
          `.js .hero { height: 250svh }`, the section-02 `-46svh` overlap and every
          `[data-r]` reveal are all scoped to this class, so without it the hero silently
          collapses to its one-screen no-JS fallback and nothing animates — which is exactly
          what happened when the choreography was ported and this line was dropped.

          It must run inline and pre-paint rather than from the choreography's effect: adding
          it after hydration would jump the hero from 100svh to 250svh in front of the reader.
          Scoping the start states to `.js` is also what keeps the page complete with
          JavaScript disabled — the reveals never hide anything that cannot be un-hidden.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
