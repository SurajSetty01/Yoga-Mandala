import { notFound, redirect } from "next/navigation";
import { BULLETIN, EVENTS, LISTINGS } from "@/content/samples";

/**
 * Discover keeps no canonical URLs of its own — §10 requires one canonical
 * URL per item. This route resolves a slug across events, bulletin entries and
 * board posts, then redirects to the item's home. Unknown slugs 404.
 */

export function generateStaticParams() {
  return [
    ...EVENTS.map((e) => ({ slug: e.slug })),
    ...BULLETIN.map((b) => ({ slug: b.slug })),
    ...LISTINGS.map((l) => ({ slug: l.slug })),
  ];
}

export default async function DiscoverRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (EVENTS.some((e) => e.slug === slug)) redirect(`/events/${slug}`);
  if (BULLETIN.some((b) => b.slug === slug)) redirect(`/learn/bulletin/${slug}`);
  if (LISTINGS.some((l) => l.slug === slug)) redirect(`/collaborate/${slug}`);

  notFound();
}
