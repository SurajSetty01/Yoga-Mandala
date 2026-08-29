import type { MetadataRoute } from "next";
import {
  getBulletin,
  getEvents,
  getInitiatives,
  getListings,
  getPeople,
  getResources,
} from "@/lib/content";

const BASE = "https://yogamandala.example";

/**
 * Sitemap for all public routes, including dynamic detail pages generated from the content
 * loaders. `/connect/sangha` is intentionally excluded (not routed until defined).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/about/principles",
    "/about/governance",
    "/about/contact",
    "/learn",
    "/learn/initiatives",
    "/learn/bulletin",
    "/learn/library",
    "/learn/reading-circle",
    "/learn/teachers-desk",
    "/connect",
    "/connect/directory",
    "/connect/experts",
    "/collaborate",
    "/events",
    "/discover",
    "/join",
    "/submit",
    "/submit/event",
    "/submit/learning-opportunity",
    "/submit/resource",
    "/submit/listing",
    "/privacy",
    "/terms",
    "/guidelines",
  ];

  const dynamic: string[] = [
    ...getInitiatives().map((i) => `/learn/initiatives/${i.slug}`),
    ...getBulletin().map((b) => `/learn/bulletin/${b.slug}`),
    ...getResources().map((r) => `/learn/library/${r.slug}`),
    ...getPeople().map((p) => `/connect/directory/${p.slug}`),
    ...getListings().map((l) => `/collaborate/${l.slug}`),
    ...getEvents().map((e) => `/events/${e.slug}`),
    ...getListings().map((l) => `/discover/${l.slug}`),
    ...getBulletin().map((b) => `/discover/${b.slug}`),
  ];

  const now = new Date();
  return [...staticRoutes, ...dynamic].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
