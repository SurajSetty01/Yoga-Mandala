import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBulletinEntry, getDiscoverFeed, getListing } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return getDiscoverFeed().map((i) => ({ slug: i.slug }));
}

function resolve(slug: string) {
  const b = getBulletinEntry(slug);
  if (b) return { kind: "bulletin" as const, item: b };
  const l = getListing(slug);
  if (l) return { kind: "listing" as const, item: l };
  return null;
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const found = resolve(params.slug);
  if (!found) return { title: "Discover" };
  return { title: found.item.title, description: found.item.description };
}

function longDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Discover detail — resolves an item from either the bulletin (external offering) or the
 * community listings (Sangha Board). Renders the correct metadata and CTA for each kind, and
 * links to the canonical section it belongs to.
 */
export default function DiscoverDetail({ params }: { params: { slug: string } }) {
  const found = resolve(params.slug);
  if (!found) notFound();
  const { kind, item } = found;

  return (
    <>
      <PageHeader label={`Discover · ${kind === "bulletin" ? "External offering" : "Community listing"}`} title={item.title}>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge origin={item.origin} />
          {item.sample && <SampleTag />}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="measure-wide">
          <p className="text-lead text-bark-soft">{item.description}</p>

          {kind === "bulletin" ? (
            <>
              <dl className="mt-10 border-t rule-gold text-small">
                {[
                  ["Category", item.category],
                  ["Submitted by", item.submitter],
                  ["Open until", longDate(item.expiry)],
                  ["Source", item.source.name],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b rule-gold py-3">
                    <dt className="section-label">{k}</dt>
                    <dd className="text-right text-bark">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <ButtonLink href={item.source.url} variant="solid" target="_blank" rel="noopener noreferrer">
                  Visit the organiser ↗
                </ButtonLink>
                <p className="mt-3 text-small text-bark-soft">
                  An external offering, curated for relevance — not organised or endorsed by Yoga Mandala.
                </p>
              </div>
              <Link href="/learn/bulletin" className="group mt-8 inline-flex items-center gap-2 text-small text-forest">
                See it in the bulletin
                <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
              </Link>
            </>
          ) : (
            <>
              <dl className="mt-10 border-t rule-gold text-small">
                {[
                  ["Category", item.category],
                  ["Posted by", item.author],
                  ["Location", item.online ? "Online" : item.location],
                  ["Open until", longDate(item.expiry)],
                  ["Contact", item.contactMethod],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b rule-gold py-3">
                    <dt className="section-label">{k}</dt>
                    <dd className="text-right text-bark">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/collaborate" className="group mt-8 inline-flex items-center gap-2 text-small text-forest">
                See it on the Sangha Board
                <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}
