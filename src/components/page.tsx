import Link from "next/link";
import type { ReactNode } from "react";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, SectionLabel } from "@/components/ui";
import type { PlateSpec } from "@/content/types";

/**
 * Interior-page primitives.
 *
 * These extend the home vocabulary (SectionLabel, Reveal, Plate) to the 25
 * interior routes without introducing a generic Card. Everything here is a
 * composition helper — page openers, breadcrumbs, filter chips, date-led index
 * rows, colophon-style detail scaffolds, forthcoming/empty states and closing
 * invitations — expressed in the same scholarly-journal language as the home.
 */

/* ── Breadcrumb ─────────────────────────────────────────── */

export function Crumbs({
  trail,
  onDark = false,
}: {
  trail: { label: string; href?: string }[];
  onDark?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className={onDark ? "text-[var(--color-paper)]" : ""}>
      <ol className="t-label flex flex-wrap items-center gap-x-2 gap-y-1 p-0 opacity-70">
        {trail.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {c.href ? (
              <Link href={c.href} className="link-rule">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="opacity-80">
                {c.label}
              </span>
            )}
            {i < trail.length - 1 && <span aria-hidden>·</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ── Page opener — T4 type-crossing on paper ────────────────
   A giant outline word with a documentary photograph crossing behind its
   counters. The standard interior hero. Ground defaults to paper. */

export function PageMasthead({
  kicker,
  word,
  title,
  standfirst,
  plate,
  crumbs,
  align = "left",
}: {
  kicker: string;
  /** The enormous outline word set behind the title. Defaults to the kicker. */
  word?: string;
  title: ReactNode;
  standfirst?: ReactNode;
  plate?: PlateSpec;
  crumbs?: { label: string; href?: string }[];
  align?: "left" | "center";
}) {
  const bigWord = (word ?? kicker).toUpperCase();
  return (
    <header className="g-paper relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {plate && (
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.5]">
          <div className="absolute right-[-6%] top-[8%] w-[52%] max-w-[720px] md:right-[2%]">
            <Plate spec={plate} ratio="4 / 3" sizes="50vw" showCaption={false} />
          </div>
        </div>
      )}
      {/* Outline word crossing behind the counters */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden">
        <div className="shell">
          <span
            className="block leading-[0.78]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 21vw, 20rem)",
              color: "transparent",
              WebkitTextStroke: "1px color-mix(in srgb, var(--color-brass) 40%, transparent)",
              letterSpacing: "-0.05em",
            }}
          >
            {bigWord}
          </span>
        </div>
      </div>

      <div className="shell relative">
        {crumbs && (
          <div className="mb-8">
            <Crumbs trail={crumbs} />
          </div>
        )}
        <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
          <Reveal>
            <SectionLabel className={align === "center" ? "mx-auto inline-block text-left" : ""}>
              {kicker}
            </SectionLabel>
            <h1 className="t-display-xl mt-7 mb-0">{title}</h1>
            {standfirst && (
              <p className={`t-lead mt-7 mb-0 measure-wide ${align === "center" ? "mx-auto" : ""}`}>
                {standfirst}
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </header>
  );
}

/* ── Simple section opener wrapper ──────────────────────── */

export function Section({
  ground = "paper",
  size = "section",
  label,
  children,
  className = "",
  id,
}: {
  ground?: "paper" | "paper-deep" | "indigo" | "indigo-deep";
  size?: "section" | "section-sm" | "section-lg";
  label?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const sizeClass = size === "section-lg" ? "section-lg" : size === "section-sm" ? "section" : "section";
  return (
    <section id={id} className={`g-${ground} ${sizeClass} ${className}`}>
      <div className="shell">
        {label && (
          <Reveal>
            <SectionLabel>{label}</SectionLabel>
          </Reveal>
        )}
        <div className={label ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}

/* ── Filter chips (presentational; interactivity is client-side) ── */

export function ChipRow({
  groups,
}: {
  groups: { legend: string; options: string[] }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {groups.map((g) => (
        <div key={g.legend} className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span className="t-label opacity-50">{g.legend}</span>
          {g.options.map((o) => (
            <span
              key={o}
              className="t-label border border-[color-mix(in_srgb,var(--color-ink)_22%,transparent)] px-2 py-[3px] opacity-70"
            >
              {o}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Date-led index row (P05 §3) ────────────────────────────
   day numeral in brass, month label, title, metadata line, optional image
   strip that widens on hover. No box. */

export function IndexRow({
  href,
  day,
  month,
  eyebrow,
  title,
  meta,
  strip,
  children,
}: {
  href: string;
  day?: string;
  month?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  strip?: PlateSpec;
  children?: ReactNode;
}) {
  return (
    <Link href={href} className="index-row group block border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b">
      <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 py-6 md:grid-cols-[5.5rem_1fr_auto] md:gap-x-8 md:py-7">
        {(day || month) && (
          <div className="tabnum flex items-baseline gap-2 md:flex-col md:items-start md:gap-0">
            <span
              style={{ fontFamily: "var(--font-display)", fontSize: "2rem", lineHeight: 1, color: "var(--color-brass)" }}
            >
              {day}
            </span>
            <span className="t-label opacity-60">{month}</span>
          </div>
        )}
        <div className={day || month ? "" : "col-span-full md:col-span-1"}>
          {eyebrow && <div className="mb-2 flex flex-wrap items-center gap-3">{eyebrow}</div>}
          <h3 className="t-title m-0">
            <span className="link-rule">{title}</span>
          </h3>
          {meta && <p className="t-label mt-3 mb-0 opacity-65">{meta}</p>}
          {children && <div className="mt-3">{children}</div>}
        </div>
        {strip && (
          <div className="col-span-full hidden self-stretch md:col-span-1 md:block">
            <div className="index-strip h-full overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <Plate spec={strip} ratio="auto" className="!aspect-auto h-full min-h-[110px]" sizes="200px" showCaption={false} />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

/* ── Detail scaffold: two-column body + sticky colophon ─── */

export function DetailLayout({
  aside,
  children,
}: {
  aside: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7 lg:col-start-1">{children}</div>
      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="lg:sticky lg:top-28">{aside}</div>
      </aside>
    </div>
  );
}

/* ── Forthcoming / empty state (honest, no fake countdowns) ── */

export function ForthcomingNote({
  title,
  body,
  points,
  cta,
}: {
  title: ReactNode;
  body: ReactNode;
  points?: string[];
  cta?: { label: string; href: string };
}) {
  return (
    <div className="measure-wide">
      <p className="t-label mb-4 opacity-55">Forthcoming</p>
      <h2 className="t-display-m mt-0 mb-0">{title}</h2>
      <p className="t-body mt-6 mb-0 measure">{body}</p>
      {points && (
        <ul className="mt-8 grid gap-x-10 gap-y-2 p-0 sm:grid-cols-2" style={{ listStyle: "none" }}>
          {points.map((p) => (
            <li key={p} className="t-small flex gap-3 opacity-80">
              <span aria-hidden style={{ color: "var(--color-brass)" }}>
                —
              </span>
              {p}
            </li>
          ))}
        </ul>
      )}
      {cta && (
        <div className="mt-9">
          <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
        </div>
      )}
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="border border-dashed border-[color-mix(in_srgb,var(--color-brass)_50%,transparent)] px-6 py-12 text-center md:py-16">
      <p className="t-small m-0 opacity-70">{children}</p>
    </div>
  );
}

/* ── Closing CTA band (T10 quiet dark room) ─────────────── */

export function ClosingBand({
  lead,
  sub,
  links,
}: {
  lead: ReactNode;
  sub?: ReactNode;
  links: { label: string; href: string }[];
}) {
  return (
    <section className="g-indigo-deep section-lg relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-[0.12]">
        <Plate
          spec={{ subject: "Abstract ground — worn paper, ink, low contrast", tone: "indigo" }}
          ratio="auto"
          className="!aspect-auto h-full"
          sizes="100vw"
          showCaption={false}
        />
      </div>
      <div className="shell relative">
        <Reveal>
          <p className="t-display-m m-0 mx-auto max-w-3xl text-center">{lead}</p>
          {sub && <p className="t-small mx-auto mt-6 mb-0 max-w-xl text-center opacity-70">{sub}</p>}
          <ul className="mx-auto mt-12 flex max-w-3xl list-none flex-wrap justify-center gap-x-10 gap-y-4 p-0">
            {links.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="t-label link-rule">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
