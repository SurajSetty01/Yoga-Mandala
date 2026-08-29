import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPeople, getPerson } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArtPlate } from "@/components/ui/Plate";
import { SampleTag } from "@/components/ui/SampleTag";
import { Button } from "@/components/ui/Button";
import { FORMATS, PERSON_ROLES } from "@/lib/taxonomy";

export function generateStaticParams() {
  return getPeople().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPerson(params.slug);
  if (!p) return { title: "Teacher profile" };
  return { title: p.name, description: p.bio.slice(0, 150) };
}

/**
 * Teacher profile — a treated placeholder in Phase A. Contact is via an enquiry form only, never
 * public phone/email (§16). The Verified marker states plainly it means "reviewed against
 * published criteria", not an endorsement (§12). The enquiry form is a clearly non-functional
 * UI in Phase A.
 */
export default function ProfileDetail({ params }: { params: { slug: string } }) {
  const p = getPerson(params.slug);
  if (!p) notFound();

  const formatLabel = FORMATS.find((f) => f.value === p.teachingFormat)?.label ?? p.teachingFormat;
  const roleLabel = PERSON_ROLES.find((r) => r.value === p.role)?.label ?? p.role;

  return (
    <>
      <PageHeader label={`Directory · ${roleLabel}`} title={p.name}>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {p.verified && (
            <span
              className="border border-gold px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.1em] text-bark-soft"
              title="The submitted information was reviewed against published criteria. This is not an endorsement (§12)."
            >
              Verified Teacher
            </span>
          )}
          {p.expert && (
            <span className="border border-moss px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.1em] text-bark-soft">
              Expert network
            </span>
          )}
          {p.sample && <SampleTag />}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          {/* Treated portrait + facts */}
          <div>
            <div className="mx-auto max-w-xs lg:mx-0">
              <ArtPlate
                variant="portrait"
                label={`Placeholder portrait for ${p.name} — treated so it is not a real face`}
                ratio="4 / 5"
              />
            </div>

            <dl className="mt-8 border-t rule-gold text-small">
              {[
                ["Location", p.location],
                ["Experience", p.experience],
                ["Tradition / approach", p.traditions.join(", ")],
                ["Teaches", p.areasOfTeaching.join(", ")],
                ["Languages", p.languages.join(", ")],
                ["Format", formatLabel],
                ["Role", roleLabel],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b rule-gold py-2.5">
                  <dt className="section-label">{k}</dt>
                  <dd className="text-right text-bark">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Bio + verification note + enquiry */}
          <div>
            <p className="measure text-lead text-bark-soft">{p.bio}</p>

            {p.verified && (
              <p className="measure mt-8 border-l-2 border-gold pl-4 text-small text-bark-soft">
                &ldquo;Verified&rdquo; means the information in this profile was reviewed against
                Yoga Mandala&rsquo;s published criteria. It is not an endorsement of the teacher.
              </p>
            )}

            {/* Enquiry (UI only, non-functional) */}
            <div className="mt-10 border-t rule-gold pt-8">
              <p className="section-label">Get in touch</p>
              <p className="mt-3 measure text-small text-bark-soft">
                Contact is through an enquiry form. Private phone numbers and email addresses are
                never published.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Button variant="solid" disabled aria-disabled title="Enquiry sending is part of a later phase">
                  Send an enquiry
                </Button>
                <span className="text-small text-bark-soft">Not yet active — form and sending arrive with member accounts.</span>
              </div>
            </div>

            <Link href="/connect/directory" className="group mt-10 inline-flex items-center gap-2 text-small text-forest">
              <span aria-hidden className="transition-transform duration-fast group-hover:-translate-x-1">←</span>
              Back to the directory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
