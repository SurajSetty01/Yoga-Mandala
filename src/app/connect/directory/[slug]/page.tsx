import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Colophon, SampleMark, SectionLabel } from "@/components/ui";
import { Crumbs } from "@/components/page";
import { EnquiryForm } from "@/components/connect/EnquiryForm";
import { EVENTS, INITIATIVES, PEOPLE } from "@/content/samples";

export function generateStaticParams() {
  return PEOPLE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PEOPLE.find((x) => x.slug === slug);
  if (!p) return { title: "Profile" };
  return {
    title: `${p.name} — ${p.tradition} teacher in ${p.location.city}`,
    description: p.bio.split(".")[0] + ".",
  };
}

const FORMAT_LABEL = { online: "Online", offline: "Offline", both: "Online & offline" } as const;

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = PEOPLE.find((p) => p.slug === slug);
  if (!person) notFound();

  const hasPhoto = Boolean(person.plate);
  const facilitates = INITIATIVES.filter((i) => i.facilitator.directorySlug === person.slug);
  const hosts = EVENTS.filter((e) => e.host.directorySlug === person.slug);
  const related = PEOPLE.filter(
    (p) => p.slug !== person.slug && (p.tradition === person.tradition || p.location.region === person.location.region),
  ).slice(0, 3);

  return (
    <>
      {/* S1 — editorial portrait spread, or typographic no-photo variant */}
      <header className="g-paper relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="shell">
          <Crumbs
            trail={[
              { label: "Connect", href: "/connect" },
              { label: "Directory", href: "/connect/directory" },
              { label: person.name },
            ]}
          />
        </div>
        {hasPhoto ? (
          <div className="shell mt-8 grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="relative lg:col-span-5 lg:-ml-[6vw] lg:w-[calc(100%+6vw)]">
              <Reveal variant="wipe">
                <Plate spec={person.plate!} ratio="4 / 5" sizes="(max-width:1024px) 100vw, 44vw" priority showCaption={false} />
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <h1 className="t-display-l mt-0 mb-0">{person.name}</h1>
              <p className="t-label mt-5 mb-0 opacity-70">
                {person.tradition} · {person.location.city} · {person.experience} · {FORMAT_LABEL[person.teachingFormat]}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {person.verified && (
                  <span
                    className="t-label border px-2 py-[3px]"
                    style={{ borderColor: "var(--color-brass)", color: "var(--color-clay)" }}
                    title="Reviewed against published criteria. Not an endorsement."
                  >
                    Verified Teacher
                  </span>
                )}
                {person.sample && <SampleMark />}
              </div>
            </div>
          </div>
        ) : (
          <div className="shell mt-10">
            <h1 className="t-display-xl mt-0 mb-0">{person.name}</h1>
            <p className="t-deva mt-4 mb-0 text-3xl opacity-70">{person.tradition}</p>
            <p className="t-label mt-5 mb-0 opacity-70">
              {person.location.city} · {person.experience} · {FORMAT_LABEL[person.teachingFormat]}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {person.verified && (
                <span className="t-label border px-2 py-[3px]" style={{ borderColor: "var(--color-brass)", color: "var(--color-clay)" }}>
                  Verified Teacher
                </span>
              )}
              {person.sample && <SampleMark />}
            </div>
          </div>
        )}
      </header>

      {/* S2 — bio, a quiet screen */}
      <section className="g-paper section">
        <div className="shell">
          <Reveal>
            <p className="t-lead mx-auto mt-0 mb-0" style={{ maxWidth: "42ch" }}>
              {person.bio}
            </p>
          </Reveal>
        </div>
      </section>

      {/* S3 — the record */}
      <section className="g-paper-deep section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionLabel>The record</SectionLabel>
            <div className="mt-6">
              <Colophon
                rows={[
                  ["Qualifications", person.qualifications.join("; ")],
                  ["Experience", person.experience],
                  ["Tradition", person.tradition],
                  ["Teaching", FORMAT_LABEL[person.teachingFormat]],
                  ["Languages", person.languages.join(", ")],
                  [
                    "Links",
                    person.links.length ? (
                      person.links.map((l) => (
                        <a key={l.url} href={l.url} className="link-rule mr-3" target="_blank" rel="noreferrer">
                          {l.label} ↗
                        </a>
                      ))
                    ) : (
                      <span className="opacity-60">None listed</span>
                    ),
                  ],
                ]}
              />
            </div>
            <div className="mt-8">
              <p className="t-label mb-3 opacity-55">Areas of interest</p>
              <div className="flex flex-wrap gap-2">
                {person.areasOfInterest.map((a) => (
                  <Link
                    key={a}
                    href={`/connect/directory?q=${encodeURIComponent(a.toLowerCase())}`}
                    className="t-label border border-[color-mix(in_srgb,var(--color-ink)_22%,transparent)] px-2 py-[3px] transition-colors hover:border-[var(--color-clay)]"
                  >
                    {a}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S4 — contact by enquiry */}
      <section className="g-paper section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Get in touch</SectionLabel>
            <p className="t-body mt-6 mb-0 measure">
              Send {person.name} an enquiry. Your message reaches them without either of you handing over a phone
              number or email address.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm teacherName={person.name} />
          </div>
        </div>
      </section>

      {/* S5 — verification statement (only where verified) */}
      {person.verified && (
        <section className="g-paper-deep section">
          <div className="shell max-w-3xl">
            <SectionLabel>Verification</SectionLabel>
            <p className="t-body mt-6 mb-0 measure">
              This profile has been reviewed against Yoga Mandala&rsquo;s published criteria. &ldquo;Verified
              Teacher&rdquo; means the submitted information has been reviewed against those criteria; it should
              not imply blanket endorsement.
            </p>
          </div>
        </section>
      )}

      {/* S6 — elsewhere in the community */}
      {(facilitates.length > 0 || hosts.length > 0) && (
        <section className="g-paper section">
          <div className="shell">
            <SectionLabel>Elsewhere in the community</SectionLabel>
            <ul className="mt-8" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {facilitates.map((i) => (
                <li key={i.slug} className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b">
                  <Link href={`/learn/initiatives/${i.slug}`} className="group flex items-baseline justify-between gap-4 py-4">
                    <span className="t-title"><span className="link-rule">{i.title}</span></span>
                    <span className="t-label opacity-55">Facilitates</span>
                  </Link>
                </li>
              ))}
              {hosts.map((e) => (
                <li key={e.slug} className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b">
                  <Link href={`/events/${e.slug}`} className="group flex items-baseline justify-between gap-4 py-4">
                    <span className="t-title"><span className="link-rule">{e.title}</span></span>
                    <span className="t-label opacity-55">Hosts</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* S7 — related teachers, text only */}
      {related.length > 0 && (
        <section className="g-paper-deep section">
          <div className="shell">
            <SectionLabel>Related teachers</SectionLabel>
            <ul className="mt-8" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {related.map((r) => (
                <li key={r.slug} className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b">
                  <Link href={`/connect/directory/${r.slug}`} className="group block py-4">
                    <h3 className="t-title m-0"><span className="link-rule">{r.name}</span></h3>
                    <p className="t-label mt-2 mb-0 opacity-60">
                      {r.tradition} · {r.location.city}
                    </p>
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
