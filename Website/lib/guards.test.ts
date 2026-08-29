import { describe, expect, it } from "vitest";
import {
  validateBulletin,
  validateEvent,
  validateListing,
  validatePerson,
  validateResource,
} from "./guards";
import type { Bulletin, EventItem, Listing, Person, Resource } from "./types";

const baseResource: Resource = {
  type: "resource",
  id: "r1",
  slug: "r1",
  sample: false,
  title: "A Text",
  author: "An Author",
  subject: "Yoga philosophy",
  tradition: "Classical",
  description: "desc",
  level: "open",
  rights: "Public domain",
  source: { name: "Internet Archive", url: "https://archive.org/details/x" },
};

describe("validateResource (§6.3 — rights + source required)", () => {
  it("accepts a resource with rights and source", () => {
    expect(() => validateResource(baseResource)).not.toThrow();
  });

  it("rejects a resource missing rights", () => {
    const bad = { ...baseResource, rights: "" } as Resource;
    expect(() => validateResource(bad)).toThrow(/rights/i);
  });

  it("rejects a resource missing a source link", () => {
    const bad = { ...baseResource, source: { name: "", url: "" } } as Resource;
    expect(() => validateResource(bad)).toThrow(/source/i);
  });
});

describe("validateBulletin (§6.2/§10 — valid external origin + expiry)", () => {
  const base: Bulletin = {
    type: "bulletin",
    id: "b1",
    slug: "b1",
    sample: true,
    origin: "curated_external",
    title: "External thing",
    submitter: "x",
    category: "c",
    source: { name: "o", url: "#" },
    description: "d",
    expiry: "2026-12-01",
  };

  it("accepts a curated_external bulletin with expiry", () => {
    expect(() => validateBulletin(base)).not.toThrow();
  });

  it("rejects a bulletin labelled as a YM initiative (must not blur categories)", () => {
    const bad = { ...base, origin: "yoga_mandala_initiative" } as unknown as Bulletin;
    expect(() => validateBulletin(bad)).toThrow(/origin|badge|programme/i);
  });

  it("rejects a bulletin missing an expiry", () => {
    const bad = { ...base, expiry: "" } as Bulletin;
    expect(() => validateBulletin(bad)).toThrow(/expiry/i);
  });
});

describe("validateEvent / validateListing origin + badge", () => {
  it("rejects an event with an invalid origin", () => {
    const bad = {
      type: "event",
      id: "e1",
      slug: "e1",
      sample: true,
      origin: "nonsense",
      title: "x",
      host: "h",
      category: "c",
      date: "2026-09-01",
      time: "10:00",
      location: "l",
      online: true,
      audience: "a",
      fee: "Free",
      description: "d",
    } as unknown as EventItem;
    expect(() => validateEvent(bad)).toThrow(/origin|badge/i);
  });

  it("rejects a listing without community_submission origin", () => {
    const bad = {
      type: "listing",
      id: "l1",
      slug: "l1",
      sample: true,
      origin: "curated_external",
      title: "x",
      category: "Offering",
      author: "a",
      location: "l",
      online: false,
      description: "d",
      contactMethod: "form",
      expiry: "2026-12-01",
    } as unknown as Listing;
    expect(() => validateListing(bad)).toThrow(/community_submission/);
  });
});

describe("validatePerson (integrity — no fabricated real people in Phase A)", () => {
  const base: Person = {
    type: "person",
    id: "p1",
    slug: "p1",
    sample: true,
    name: "Sample Teacher A",
    location: "x",
    experience: "3–7 years",
    traditions: [],
    areasOfTeaching: [],
    qualifications: [],
    languages: [],
    teachingFormat: "online",
    role: "teacher",
    bio: "b",
    links: [],
    verified: false,
    expert: false,
  };

  it("accepts a marked sample person", () => {
    expect(() => validatePerson(base)).not.toThrow();
  });

  it("rejects a person not marked as sample", () => {
    const bad = { ...base, sample: false } as Person;
    expect(() => validatePerson(bad)).toThrow(/sample/i);
  });
});
