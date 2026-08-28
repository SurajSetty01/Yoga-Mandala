import Link from "next/link";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

/**
 * §5: "Footer with community links, governance/contact and submission links."
 * Governance sits at equal weight to everything else — §15 treats it as a
 * first-class value, so it does not belong in fine print.
 */
export function Footer() {
  return (
    <footer className="g-indigo-deep">
      <div className="shell grid grid-cols-1 gap-12 py-20 md:grid-cols-12 md:gap-10 md:py-24">
        <div className="md:col-span-4">
          <p className="t-label m-0" style={{ letterSpacing: "0.16em" }}>
            {SITE.name.toUpperCase()}
          </p>
          <p className="t-title mt-5 mb-0" style={{ maxWidth: "16ch" }}>
            {SITE.tagline}
          </p>
          <p className="t-small mt-5 mb-0 measure-tight">{SITE.description}</p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="md:col-span-2 last:md:col-span-4">
            <p className="t-label m-0 opacity-55">{col.heading}</p>
            <ul className="mt-5 mb-0 list-none space-y-2.5 p-0">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="t-small link-rule">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="shell">
        <hr className="rule" />
        <div className="flex flex-col gap-4 py-7 md:flex-row md:items-start md:justify-between">
          <p className="t-small m-0 measure">
            Yoga Mandala is an independent, community-led network. Programmes organised by other
            organisations are labelled as theirs.
          </p>
          <p className="t-label m-0 shrink-0 opacity-55">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
