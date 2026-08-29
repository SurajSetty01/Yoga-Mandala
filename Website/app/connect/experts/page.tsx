import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { PullQuote } from "@/components/ui/PullQuote";
import { ArtPlate } from "@/components/ui/Plate";
import { SampleTag } from "@/components/ui/SampleTag";
import { getExperts } from "@/lib/content";
import { PERSON_ROLES } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Experts",
  description:
    "A curated view of experienced members willing to contribute to study circles, conversations and mentoring. Verification is transparent and not an endorsement.",
};

/**
 * Experts — a filtered view of the directory (members flagged as experts), NOT a separate
 * profile system. The non-endorsement caveat (§7.2) leads the page, at full prominence.
 */
export default function ExpertsPage() {
  const experts = getExperts();

  return (
    <>
      <PageHeader
        label="Connect · Experts"
        title="Experienced members, willing to contribute."
        standfirst="A curated list of experienced members open to contributing to Q&A, study circles, expert conversations or mentoring. It is a filtered view of the directory, not a separate register."
      />

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <PullQuote cite="Framework §7.2">
          Verification is transparent and does not imply blanket endorsement. Inclusion here means
          the submitted information was reviewed against published criteria — nothing more.
        </PullQuote>

        <ul className="mt-section-sm border-t rule-gold">
          {experts.map((p) => {
            const roleLabel = PERSON_ROLES.find((r) => r.value === p.role)?.label ?? p.role;
            return (
              <li key={p.slug} className="border-b rule-gold">
                <Link href={`/connect/directory/${p.slug}`} className="group grid items-center gap-5 py-6 sm:grid-cols-[auto_1fr]">
                  <div className="w-24">
                    <ArtPlate variant="portrait" label={`Placeholder portrait for ${p.name}`} ratio="1 / 1" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-title transition-colors duration-fast group-hover:text-terracotta">
                        {p.name}
                      </h2>
                      <span className="text-small text-bark-soft">{roleLabel}</span>
                      {p.sample && <SampleTag />}
                    </div>
                    <p className="mt-1 text-small text-bark-soft">
                      {p.location} · {p.traditions.join(", ")} · {p.areasOfTeaching.slice(0, 2).join(", ")}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {experts.length === 0 && (
          <p className="mt-8 text-lead text-bark-soft">The expert network is being gathered.</p>
        )}
      </section>
    </>
  );
}
