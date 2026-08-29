import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { FOOTER_EXPLORE, FOOTER_GOVERNANCE, FOOTER_PARTICIPATE } from "@/lib/nav";

/**
 * Footer. Ground forest-deep, text sand. Governance links sit at equal weight to everything
 * else (framework §15 treats governance as a first-class value — never buried in fine print).
 * Contact + WhatsApp links are shown as pending until the client supplies them (C5/C6).
 */
function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="section-label text-sand/60">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-small text-sand/85 transition-colors duration-fast hover:text-sand"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest-deep text-sand">
      <div className="mx-auto max-w-content px-6 py-section-sm">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Identity */}
          <div className="lg:pr-8">
            <Wordmark tone="sand" />
            <p className="mt-5 font-display text-lead leading-snug text-sand/90">
              Learn. Connect. Collaborate. Serve.
            </p>
            <p className="mt-4 max-w-xs text-small text-sand/70">
              A community of Yoga teachers and serious practitioners — across India and abroad.
            </p>
            <p className="mt-4 text-small text-sand/50">
              For the teachers. By the teachers.
            </p>
          </div>

          <Column title="Explore" links={FOOTER_EXPLORE} />
          <Column title="Participate" links={FOOTER_PARTICIPATE} />
          <Column title="Governance" links={FOOTER_GOVERNANCE} />
        </div>

        <div className="mt-section-sm border-t border-sand/15 pt-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-small text-sand/60">
              © {year} Yoga Mandala. An independent community identity.
            </p>
            <p className="max-w-xl text-small text-sand/50">
              Pranava and other organisations may contribute and submit offerings; Yoga Mandala
              retains an independent community identity, and every organisation&rsquo;s offerings
              are clearly labelled.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
