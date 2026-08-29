import type { Person } from "./types";
import type { DirectoryFilterKey } from "./taxonomy";

/**
 * Pure, testable filtering for the Teacher Directory. Maps to §7.1's seven filters. A person
 * matches when, for every active filter key, at least one selected value matches the person.
 * (Filters are OR within a key, AND across keys — the conventional facet behaviour.)
 */
export type DirectorySelection = Partial<Record<DirectoryFilterKey, string[]>>;

function personValues(p: Person, key: DirectoryFilterKey): string[] {
  switch (key) {
    case "location":
      return [p.location];
    case "tradition":
      return p.traditions;
    case "area":
      return p.areasOfTeaching;
    case "experience":
      return [p.experience];
    case "format":
      return [p.teachingFormat];
    case "language":
      return p.languages;
    case "role":
      return [p.role];
    default:
      return [];
  }
}

export function matchesFilters(p: Person, selection: DirectorySelection): boolean {
  return (Object.keys(selection) as DirectoryFilterKey[]).every((key) => {
    const selected = selection[key];
    if (!selected || selected.length === 0) return true;
    const values = personValues(p, key).map((v) => v.toLowerCase());
    return selected.some((s) => values.includes(s.toLowerCase()));
  });
}

export function filterPeople(people: Person[], selection: DirectorySelection): Person[] {
  return people.filter((p) => matchesFilters(p, selection));
}

/** Toggle a value within a filter key, returning a new selection. */
export function toggleSelection(
  selection: DirectorySelection,
  key: DirectoryFilterKey,
  value: string,
): DirectorySelection {
  const current = selection[key] ?? [];
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  const updated = { ...selection, [key]: next };
  if (next.length === 0) delete updated[key];
  return updated;
}

export function countActive(selection: DirectorySelection): number {
  return Object.values(selection).reduce((acc, arr) => acc + (arr?.length ?? 0), 0);
}
