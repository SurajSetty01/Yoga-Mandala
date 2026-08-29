import { LIBRARY } from "@/content/resources/library";
import { SAMPLE_INITIATIVES } from "@/content/samples/initiatives";
import { SAMPLE_BULLETIN } from "@/content/samples/bulletin";
import { SAMPLE_EVENTS } from "@/content/samples/events";
import { SAMPLE_LISTINGS } from "@/content/samples/listings";
import { SAMPLE_PEOPLE } from "@/content/samples/people";
import { SAMPLE_READING_CIRCLE } from "@/content/samples/reading-circle";
import {
  validateBulletin,
  validateEvent,
  validateInitiative,
  validateListing,
  validatePerson,
  validateResource,
} from "./guards";
import type {
  Bulletin,
  EventItem,
  Initiative,
  Listing,
  Person,
  Resource,
} from "./types";

/**
 * Typed content loaders. All content is validated by schema guards at module load, so a
 * violation of a framework hard rule (missing rights/source, invalid origin, missing expiry,
 * a non-sample person) fails the build. When Phase B replaces these files with a database,
 * these functions change and the pages that call them do not.
 */

// ---- Resources (Library — real) ----
export function getResources(): Resource[] {
  return LIBRARY.map(validateResource);
}
export function getResource(slug: string): Resource | undefined {
  return getResources().find((r) => r.slug === slug);
}
export function getFeaturedResource(): Resource | undefined {
  const all = getResources();
  return all.find((r) => r.featured) ?? all[0];
}

// ---- Initiatives (sample) ----
export function getInitiatives(): Initiative[] {
  return SAMPLE_INITIATIVES.map(validateInitiative);
}
export function getInitiative(slug: string): Initiative | undefined {
  return getInitiatives().find((i) => i.slug === slug);
}
export function getFeaturedInitiative(): Initiative | undefined {
  const all = getInitiatives();
  return all.find((i) => i.featured) ?? all[0];
}

// ---- Bulletin (sample) ----
export function getBulletin(): Bulletin[] {
  return SAMPLE_BULLETIN.map(validateBulletin).sort((a, b) => a.expiry.localeCompare(b.expiry));
}
export function getBulletinEntry(slug: string): Bulletin | undefined {
  return getBulletin().find((b) => b.slug === slug);
}

// ---- Events (sample) ----
export function getEvents(): EventItem[] {
  return SAMPLE_EVENTS.map(validateEvent).sort((a, b) => a.date.localeCompare(b.date));
}
export function getEvent(slug: string): EventItem | undefined {
  return getEvents().find((e) => e.slug === slug);
}
export function getUpcomingEvent(): EventItem | undefined {
  const all = getEvents();
  return all.find((e) => e.featured) ?? all[0];
}

// ---- Listings / Sangha Board (sample) ----
export function getListings(): Listing[] {
  return SAMPLE_LISTINGS.map(validateListing).sort((a, b) => a.expiry.localeCompare(b.expiry));
}
export function getListing(slug: string): Listing | undefined {
  return getListings().find((l) => l.slug === slug);
}

// ---- People / Directory (sample, treated placeholders) ----
export function getPeople(): Person[] {
  return SAMPLE_PEOPLE.map(validatePerson);
}
export function getPerson(slug: string): Person | undefined {
  return getPeople().find((p) => p.slug === slug);
}
export function getExperts(): Person[] {
  return getPeople().filter((p) => p.expert);
}
export function getFeaturedPerson(): Person | undefined {
  const all = getPeople();
  return all.find((p) => p.featured) ?? all[0];
}

// ---- Discover: aggregated curated feed (bulletin + community listings) ----
export type DiscoverItem =
  | ({ kind: "bulletin" } & Bulletin)
  | ({ kind: "listing" } & Listing);

export function getDiscoverFeed(): DiscoverItem[] {
  const bulletin: DiscoverItem[] = getBulletin().map((b) => ({ kind: "bulletin", ...b }));
  const listings: DiscoverItem[] = getListings().map((l) => ({ kind: "listing", ...l }));
  return [...bulletin, ...listings].sort((a, b) => a.expiry.localeCompare(b.expiry));
}

// ---- Reading Circle (sample) ----
export function getReadingCircle() {
  return SAMPLE_READING_CIRCLE;
}

/** Latest N curated opportunities for the homepage index (bulletin only). */
export function getLatestBulletin(n = 6): Bulletin[] {
  return getBulletin().slice(0, n);
}
