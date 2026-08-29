import { describe, expect, it } from "vitest";
import { badgeForOrigin, isValidOrigin } from "./badges";
import {
  getBulletin,
  getDiscoverFeed,
  getEvents,
  getInitiatives,
  getListings,
  getPeople,
  getResources,
} from "./content";
import { LIBRARY_SUBJECTS } from "./taxonomy";

describe("badge mapping (§10)", () => {
  it("maps every origin to its fixed badge label", () => {
    expect(badgeForOrigin("yoga_mandala_initiative").label).toBe("Yoga Mandala Learning Initiative");
    expect(badgeForOrigin("curated_external").label).toBe("Curated Community Listing");
    expect(badgeForOrigin("community_submission").label).toBe("Community Listing");
    expect(badgeForOrigin("partner_guest").label).toBe("Partner / Guest");
  });

  it("recognises valid and rejects invalid origins", () => {
    expect(isValidOrigin("curated_external")).toBe(true);
    expect(isValidOrigin("made_up")).toBe(false);
  });
});

describe("Library (real content, §6.3)", () => {
  const resources = getResources();

  it("ships at least 10 real records across at least 6 subjects", () => {
    expect(resources.length).toBeGreaterThanOrEqual(10);
    const subjects = new Set(resources.map((r) => r.subject));
    expect(subjects.size).toBeGreaterThanOrEqual(6);
  });

  it("uses only the 11 defined subjects", () => {
    for (const r of resources) {
      expect(LIBRARY_SUBJECTS).toContain(r.subject);
    }
  });

  it("every record has real rights + a source link, and is not sample", () => {
    for (const r of resources) {
      expect(r.rights.length).toBeGreaterThan(0);
      expect(r.source.url).toMatch(/^https?:\/\//);
      expect(r.sample).toBe(false);
    }
  });
});

describe("sample content integrity", () => {
  it("all people are marked samples (no fabricated real people)", () => {
    for (const p of getPeople()) expect(p.sample).toBe(true);
  });

  it("all sample initiatives/bulletin/events/listings are marked", () => {
    for (const i of getInitiatives()) expect(i.sample).toBe(true);
    for (const b of getBulletin()) expect(b.sample).toBe(true);
    for (const e of getEvents()) expect(e.sample).toBe(true);
    for (const l of getListings()) expect(l.sample).toBe(true);
  });

  it("every publishable sample entry resolves to a valid badge", () => {
    for (const b of getBulletin()) expect(() => badgeForOrigin(b.origin)).not.toThrow();
    for (const e of getEvents()) expect(() => badgeForOrigin(e.origin)).not.toThrow();
    for (const l of getListings()) expect(() => badgeForOrigin(l.origin)).not.toThrow();
    for (const i of getInitiatives()) expect(() => badgeForOrigin(i.origin)).not.toThrow();
  });
});

describe("discover feed aggregation", () => {
  it("merges bulletin + listings and sorts by expiry", () => {
    const feed = getDiscoverFeed();
    expect(feed.length).toBe(getBulletin().length + getListings().length);
    const expiries = feed.map((f) => f.expiry);
    const sorted = [...expiries].sort((a, b) => a.localeCompare(b));
    expect(expiries).toEqual(sorted);
  });

  it("discover slugs are globally unique across bulletin + listings (so /discover/[slug] resolves)", () => {
    const slugs = getDiscoverFeed().map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("badge categories are never blurred (§23)", () => {
  it("initiatives are always the YM initiative badge; bulletins are never", () => {
    for (const i of getInitiatives())
      expect(badgeForOrigin(i.origin).label).toBe("Yoga Mandala Learning Initiative");
    for (const b of getBulletin())
      expect(badgeForOrigin(b.origin).label).not.toBe("Yoga Mandala Learning Initiative");
  });

  it("listings are always the community listing badge", () => {
    for (const l of getListings())
      expect(badgeForOrigin(l.origin).label).toBe("Community Listing");
  });
});
