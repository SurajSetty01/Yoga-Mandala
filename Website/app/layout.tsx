import type { Metadata } from "next";
import { Fraunces, Inter_Tight, Tiro_Devanagari_Sanskrit } from "next/font/google";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { PageTransition } from "@/components/shell/PageTransition";

/**
 * Fonts are self-hosted at build time by next/font (no runtime external calls),
 * satisfying the "self-hosted, font-display: swap" requirement.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const tiro = Tiro_Devanagari_Sanskrit({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-deva",
});

const SITE_NAME = "Yoga Mandala";
const SITE_DESCRIPTION =
  "A community of Yoga teachers and serious practitioners — building a culture of continuous learning, meaningful collaboration and responsible teaching.";

export const metadata: Metadata = {
  metadataBase: new URL("https://yogamandala.example"),
  title: {
    default: `${SITE_NAME} — Learn. Connect. Collaborate. Serve.`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${tiro.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // Organization structured data. Uses only facts stated in the client material.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              description: SITE_DESCRIPTION,
              slogan: "Learn. Connect. Collaborate. Serve.",
              url: "https://yogamandala.example",
            }),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
