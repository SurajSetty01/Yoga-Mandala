"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plate } from "@/components/Plate";
import { SampleMark } from "@/components/ui";
import type { Person } from "@/content/types";

/**
 * The directory: a typographic index on the left, one large preview on the
 * right. Not a face-card grid (P10 §3). Fully keyboard-operable — the preview
 * updates on hover AND focus. Photo is optional; the no-photo state uses the
 * initial set in the display face, never a grey avatar.
 */

const FORMAT_LABEL: Record<Person["teachingFormat"], string> = {
  online: "Online",
  offline: "Offline",
  both: "Online & offline",
};

const ROLES = ["teacher", "therapist", "researcher", "other"] as const;

function PortraitOrInitial({ person, className = "" }: { person: Person; className?: string }) {
  if (person.plate?.src || person.plate) {
    return (
      <Plate
        spec={person.plate ?? { subject: `Portrait — ${person.tradition}`, tone: "indigo" }}
        ratio="4 / 5"
        sizes="(max-width:1024px) 90vw, 34vw"
        showCaption={false}
        className={className}
      />
    );
  }
  return (
    <div
      className={`grain relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ aspectRatio: "4 / 5", background: "var(--color-indigo-deep)" }}
    >
      <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem,10vw,7rem)", color: "var(--color-paper)", opacity: 0.9 }}>
        {person.name.replace(/[^A-Za-z]/g, "").charAt(0) || "Y"}
      </span>
    </div>
  );
}

export function DirectoryIndex({ people }: { people: Person[] }) {
  const [role, setRole] = useState<string>("all");
  const [format, setFormat] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState<string>(people[0]?.slug ?? "");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return people.filter((p) => {
      if (role !== "all" && p.role !== role) return false;
      if (format !== "all" && p.teachingFormat !== format) return false;
      if (q) {
        const hay = `${p.name} ${p.tradition} ${p.areasOfInterest.join(" ")} ${p.location.city}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [people, role, format, query]);

  const active = people.find((p) => p.slug === activeSlug) ?? filtered[0] ?? people[0];

  return (
    <div>
      {/* Filters — a control bar that reads as a running head */}
      <div className="sticky top-16 z-10 -mx-1 border-y border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] bg-[var(--color-paper)]/95 px-1 py-4 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <label className="flex items-center gap-2">
            <span className="t-label opacity-50">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="t-label border-0 border-b border-[color-mix(in_srgb,var(--color-ink)_28%,transparent)] bg-transparent py-1 pr-6"
            >
              <option value="all">All</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r[0].toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span className="t-label opacity-50">Format</span>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="t-label border-0 border-b border-[color-mix(in_srgb,var(--color-ink)_28%,transparent)] bg-transparent py-1 pr-6"
            >
              <option value="all">All</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="both">Both</option>
            </select>
          </label>
          <label className="flex flex-1 items-center gap-2" style={{ minWidth: "12rem" }}>
            <span className="t-label opacity-50">Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, tradition, area, city"
              className="t-small flex-1 border-0 border-b border-[color-mix(in_srgb,var(--color-ink)_28%,transparent)] bg-transparent py-1"
            />
          </label>
          <span className="t-label tabnum opacity-60">{String(filtered.length).padStart(2, "0")} found</span>
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Index */}
        <ol className="lg:col-span-7" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {filtered.length === 0 && (
            <li className="border border-dashed border-[color-mix(in_srgb,var(--color-brass)_50%,transparent)] px-6 py-12 text-center">
              <p className="t-small m-0 opacity-70">No profiles match those filters. Try widening them.</p>
            </li>
          )}
          {filtered.map((p) => (
            <li
              key={p.slug}
              className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b"
            >
              <Link
                href={`/connect/directory/${p.slug}`}
                onMouseEnter={() => setActiveSlug(p.slug)}
                onFocus={() => setActiveSlug(p.slug)}
                className="group block py-5"
                data-active={p.slug === active?.slug}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="t-title m-0">
                    <span className="link-rule">{p.name}</span>
                  </h3>
                  {p.verified && (
                    <span className="t-label" style={{ color: "var(--color-brass)" }}>
                      Verified Teacher
                    </span>
                  )}
                </div>
                <p className="t-label mt-2 mb-0 opacity-65">
                  {p.tradition} · {p.location.city} · {p.experience} · {FORMAT_LABEL[p.teachingFormat]}
                </p>
                <p className="t-small mt-1 mb-0 opacity-70">Areas: {p.areasOfInterest.join(", ").toLowerCase()}</p>
              </Link>
            </li>
          ))}
        </ol>

        {/* Sticky preview */}
        <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block">
          {active && (
            <div className="sticky top-40">
              <PortraitOrInitial person={active} />
              <div className="mt-5 flex items-center gap-3">
                <h3 className="t-title m-0">{active.name}</h3>
                {active.sample && <SampleMark />}
              </div>
              <p className="t-label mt-2 mb-0 opacity-65">
                {active.tradition} · {active.location.city}, {active.location.region}
              </p>
              <p className="t-small mt-4 mb-0 measure opacity-80" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {active.bio}
              </p>
              <p className="t-label mt-4 mb-0 opacity-60">Languages: {active.languages.join(", ")}</p>
              <div className="mt-6">
                <Link href={`/connect/directory/${active.slug}`} className="t-label link-rule">
                  Full profile →
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
