import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, Badge, Colophon, SampleMark, SectionLabel, longDate } from "@/components/ui";
import { Crumbs, DetailLayout } from "@/components/page";
import { LISTINGS } from "@/content/samples";
import { LISTING_CATEGORY } from "@/content/types";

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = LISTINGS.find((l) => l.slug === slug);
  return {
    title: item ? item.title : "Listing",
    description: item?.description,
  };
}

export default async function ListingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = LISTINGS.find((l) => l.slug === slug);
  if (!item) notFound();

  const cat = LISTING_CATEGORY[item.category];
  const related = LISTINGS.filter((l) => l.category === item.category && l.slug !== item.slug).slice(0, 2);

  return (
    <>
      {/* Header — typographic, no hero image (this is a noticeboard) */}
      <header className="g-paper pt-32 pb-14 md:pt-40 md:pb-16">
        <div className="shell">
          <Crumbs
            trail={[
              { label: "Collaborate", href: "/collaborate" },
              { label: "Sangha Board", href: "/collaborate" },
              { label: item.title },
            ]}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge badge={item.badge} />
            {item.sample && <SampleMark />}
            <span className="t-label opacity-55">{cat.label}</span>
          </div>
          <h1 className="t-display-m mt-6 mb-0 measure-tight">{item.title}</h1>
          <p className="t-small mt-4 mb-0 opacity-70">{cat.purpose}</p>
        </div>
      </header>

      <section className="g-paper section">
        <DetailLayout
          aside={
            <div>
              <SectionLabel>The record</SectionLabel>
              <div className="mt-6">
                <Colophon
                  rows={[
                    ["Category", cat.label],
                    ["Location", item.location],
                    ["Posted by", item.poster.name],
                    ["Posted", longDate(item.posted)],
                    ["Expires", longDate(item.expiry)],
                    ["Badge", "Community listing"],
                  ]}
                />
              </div>

              <div className="mt-8 border border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] p-5">
                <p className="t-label m-0 opacity-60">Contact</p>
                <p className="t-small mt-2 mb-4">
                  Replies go through an enquiry form, never an exposed email. Contact details are shared with
                  the poster only when you send an enquiry.
                </p>
                <Link href="/about/contact" className="t-label link-rule">
                  Enquire about this post →
                </Link>
                {item.poster.directorySlug && (
                  <p className="t-small mt-4 mb-0">
                    <Link href={`/connect/directory/${item.poster.directorySlug}`} className="link-rule">
                      {item.poster.name}&rsquo;s directory profile
                    </Link>
                  </p>
                )}
              </div>

              <p className="t-label mt-6 mb-0 opacity-55">
                <Link href="/about/contact" className="link-rule">
                  Report this listing
                </Link>
              </p>
            </div>
          }
        >
          <Reveal>
            <p className="t-label mb-4 opacity-55">The post</p>
            <p className="t-lead mt-0 mb-6 measure">{item.description}</p>
            <p className="t-small mt-0 mb-0 measure opacity-70">
              {item.location} · posted {longDate(item.posted)} · expires {longDate(item.expiry)}. Posts leave the
              board automatically once they expire.
            </p>
          </Reveal>

          <div className="mt-12 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-8">
            <ArrowLink href="/collaborate">Back to the board</ArrowLink>
          </div>
        </DetailLayout>
      </section>

      {/* Related — same category, typographic */}
      {related.length > 0 && (
        <section className="g-paper-deep section">
          <div className="shell">
            <SectionLabel>More under {cat.label}</SectionLabel>
            <ul className="mt-8" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {related.map((r) => (
                <li
                  key={r.slug}
                  className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b"
                >
                  <Link href={`/collaborate/${r.slug}`} className="group block py-6">
                    <p className="t-label mb-2 opacity-60">
                      {r.location} · expires {longDate(r.expiry)}
                    </p>
                    <h3 className="t-title m-0">
                      <span className="link-rule">{r.title}</span>
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
