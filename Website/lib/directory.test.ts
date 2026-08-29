import { describe, expect, it } from "vitest";
import { countActive, filterPeople, matchesFilters, toggleSelection } from "./directory";
import type { Person } from "./types";

function person(overrides: Partial<Person>): Person {
  return {
    type: "person",
    id: "x",
    slug: "x",
    sample: true,
    name: "Sample",
    location: "Bengaluru, India",
    experience: "7–15 years",
    traditions: ["Haṭha"],
    areasOfTeaching: ["Āsana"],
    qualifications: [],
    languages: ["English"],
    teachingFormat: "online",
    role: "teacher",
    bio: "b",
    links: [],
    verified: false,
    expert: false,
    ...overrides,
  };
}

describe("matchesFilters", () => {
  const p = person({ traditions: ["Haṭha", "Iyengar"], languages: ["English", "Tamil"] });

  it("matches with no selection", () => {
    expect(matchesFilters(p, {})).toBe(true);
  });

  it("OR within a key", () => {
    expect(matchesFilters(p, { tradition: ["Iyengar"] })).toBe(true);
    expect(matchesFilters(p, { tradition: ["Aṣṭāṅga"] })).toBe(false);
    expect(matchesFilters(p, { tradition: ["Aṣṭāṅga", "Haṭha"] })).toBe(true);
  });

  it("AND across keys", () => {
    expect(matchesFilters(p, { tradition: ["Haṭha"], language: ["Tamil"] })).toBe(true);
    expect(matchesFilters(p, { tradition: ["Haṭha"], language: ["Hindi"] })).toBe(false);
  });

  it("matches role and format single-value keys", () => {
    expect(matchesFilters(p, { role: ["teacher"], format: ["online"] })).toBe(true);
    expect(matchesFilters(p, { role: ["therapist"] })).toBe(false);
  });
});

describe("filterPeople", () => {
  const people = [
    person({ slug: "a", role: "teacher", location: "Chennai, India" }),
    person({ slug: "b", role: "therapist", location: "Pune, India" }),
  ];
  it("filters by a single facet", () => {
    expect(filterPeople(people, { role: ["therapist"] }).map((p) => p.slug)).toEqual(["b"]);
  });
  it("returns all with empty selection", () => {
    expect(filterPeople(people, {})).toHaveLength(2);
  });
});

describe("toggleSelection + countActive", () => {
  it("adds and removes values and prunes empty keys", () => {
    let sel = toggleSelection({}, "tradition", "Haṭha");
    expect(sel).toEqual({ tradition: ["Haṭha"] });
    expect(countActive(sel)).toBe(1);
    sel = toggleSelection(sel, "language", "English");
    expect(countActive(sel)).toBe(2);
    sel = toggleSelection(sel, "tradition", "Haṭha"); // remove
    expect(sel.tradition).toBeUndefined();
    expect(countActive(sel)).toBe(1);
  });
});
