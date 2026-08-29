import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { LIBRARY } from "@/content/library";
import { BULLETIN, EVENTS, INITIATIVES, LISTINGS, PEOPLE } from "@/content/samples";

/**
 * Sitemap — every canonical route on the site. Detail pages are enumerated
 * from the same content sources the pages render from, so the sitemap stays in
 * step with the content automatically. /discover/[slug] is deliberately
 * excluded: it only redirects to canonical pages and holds no content of its own.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = [
    "",
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
    "/about",
    "/about/principles",
    "/about/governance",
    "/about/contact",
    "/guidelines",
    "/join",
    "/submit",
    "/submit/event",
    "/submit/learning-opportunity",
    "/submit/resource",
    "/submit/listing",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const dynamic = [
    ...INITIATIVES.map((i) => `/learn/initiatives/${i.slug}`),
    ...BULLETIN.map((b) => `/learn/bulletin/${b.slug}`),
    ...LIBRARY.map((r) => `/learn/library/${r.slug}`),
    ...PEOPLE.map((p) => `/connect/directory/${p.slug}`),
    ...EVENTS.map((e) => `/events/${e.slug}`),
    ...LISTINGS.map((l) => `/collaborate/${l.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...dynamic];
}
