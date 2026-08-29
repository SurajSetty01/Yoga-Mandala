import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getListing, getListings } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return getListings().map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const l = getListing(params.slug);
  if (!l) return { title: "Board post" };
  return { title: l.title, description: l.description };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

export default function ListingDetail({ params }: { params: { slug: string } }) {
  const l = getListing(params.slug);
  if (!l) notFound();

  return (
    <>
      <PageHeader label={`Sangha Board · ${l.category}`} title={l.title}>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge origin={l.origin} />
          {l.sample && <SampleTag />}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="measure-wide">
          <p className="text-lead text-bark-soft">{l.description}</p>

          <dl className="mt-10 border-t rule-gold text-small">
            {[
              ["Category", l.category],
              ["Posted by", l.author],
              ["Location", l.online ? "Online" : l.location],
              ["Open until", formatDate(l.expiry)],
              ["Contact", l.contactMethod],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b rule-gold py-3">
                <dt className="section-label">{k}</dt>
                <dd className="text-right text-bark">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Button variant="solid" disabled aria-disabled title="Enquiry sending is part of a later phase">
              Respond to this post
            </Button>
            <p className="mt-3 text-small text-bark-soft">
              Responding goes through the portal with member accounts — not yet active. Personal
              contact details are never published on the board.
            </p>
          </div>

          <Link href="/collaborate" className="group mt-10 inline-flex items-center gap-2 text-small text-forest">
            <span aria-hidden className="transition-transform duration-fast group-hover:-translate-x-1">←</span>
            Back to the board
          </Link>
        </div>
      </section>
    </>
  );
}
