import Link from "next/link";
import { Plate } from "@/components/Plate";
import { SectionLabel } from "@/components/ui";

/**
 * 404 — a detour, not an error (P00 §4). Large display type, a quiet archival
 * ground, and three suggested routes rather than a dead end.
 */
export default function NotFound() {
  const routes = [
    { label: "The library", href: "/learn/library", note: "Texts, commentaries and research" },
    { label: "The directory", href: "/connect/directory", note: "Find a teacher by place and tradition" },
    { label: "Events", href: "/events", note: "What the community is doing" },
  ];

  return (
    <section className="g-indigo-deep relative flex min-h-[80vh] items-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-[0.14]">
        <Plate
          spec={{ subject: "Worn manuscript page, low contrast", tone: "indigo" }}
          ratio="auto"
          className="!aspect-auto h-full"
          sizes="100vw"
          showCaption={false}
        />
      </div>
      <div className="shell relative py-24">
        <SectionLabel>Not found</SectionLabel>
        <p className="t-display-xl mt-8 mb-0">This page took a turn we didn&rsquo;t map.</p>
        <p className="t-lead mt-7 mb-0 measure-wide">
          The page you were looking for isn&rsquo;t here — it may have moved, or never existed. Here are three
          good places to pick the thread back up.
        </p>
        <ul className="mt-12 grid gap-0" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {routes.map((r) => (
            <li
              key={r.href}
              className="border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] last:border-b"
            >
              <Link href={r.href} className="group flex flex-wrap items-baseline justify-between gap-3 py-6">
                <span className="t-title">
                  <span className="link-rule">{r.label}</span>
                </span>
                <span className="t-label opacity-60">{r.note}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link href="/" className="t-label link-rule">
            Or return home →
          </Link>
        </div>
      </div>
    </section>
  );
}
