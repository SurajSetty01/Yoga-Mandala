import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Badge, SampleMark, SectionLabel, longDate } from "@/components/ui";
import { ChipRow, Crumbs } from "@/components/page";
import { LISTINGS } from "@/content/samples";
import { LISTING_CATEGORY, type ListingCategory } from "@/content/types";

export const metadata: Metadata = {
  title: "Sangha Board",
  description:
    "The community noticeboard. Opportunities, spaces, projects, referrals and offerings that would otherwise disappear inside group chats — set out where they can be found.",
};

/* §2 — a distinct hairline colour per category, the one place on the site
   where colour does categorical work, because here it genuinely aids scanning. */
const CATEGORY_ORDER: ListingCategory[] = [
  "looking-for",
  "offering",
  "space",
  "project",
  "volunteer",
  "referral",
  "teacher-exchange",
];

const CATEGORY_HAIRLINE: Record<ListingCategory, string> = {
  "looking-for": "var(--color-indigo)",
  offering: "var(--color-sage)",
  space: "var(--color-brass)",
  project: "var(--color-clay)",
  volunteer: "var(--color-sage)",
  referral: "var(--color-brass)",
  "teacher-exchange": "var(--color-indigo)",
};

/* §10 exclusions, verbatim intent. */
const EXCLUDED = [
  "Unsolicited self-promotion",
  "Repeated advertising",
  "Referral spam",
  "Unrelated commercial posts",
  "Promotional content outside the submission process",
];

export default function CollaboratePage() {
  const today = "2026-08-15";
  const live = LISTINGS.filter((l) => l.status === "published" && l.expiry >= today);

  const countFor = (c: ListingCategory) => live.filter((l) => l.category === c).length;
  const byCategory = (c: ListingCategory) =>
    live.filter((l) => l.category === c).sort((a, b) => b.posted.localeCompare(a.posted));

  const populated = CATEGORY_ORDER.filter((c) => countFor(c) > 0);

  return (
    <>
      {/* S1 — the argument for the board */}
      <header className="g-paper pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="shell">
          <Crumbs trail={[{ label: "Collaborate" }, { label: "Sangha Board" }]} />
          <div className="mt-8 max-w-4xl">
            <SectionLabel>The Sangha Board</SectionLabel>
            <h1 className="t-display-l mt-7 mb-0 measure-tight">
              Opportunities that would otherwise disappear inside group chats.
            </h1>
            <p className="t-lead mt-7 mb-0 measure-wide">
              A community noticeboard for teachers and serious practitioners. Somewhere to look for a
              collaborator, offer a skill, share a space, or pass on a referral — set out so it can be found
              later, not scrolled past once.
            </p>
          </div>
        </div>
      </header>

      {/* S2 — seven doors: the categories with their §8 purposes and live counts */}
      <section className="g-paper-deep section">
        <div className="shell">
          <SectionLabel>Seven kinds of post</SectionLabel>
          <div className="mt-10 grid gap-x-16 gap-y-0 md:grid-cols-2">
            {CATEGORY_ORDER.map((c) => {
              const cat = LISTING_CATEGORY[c];
              const count = countFor(c);
              return (
                <div
                  key={c}
                  className="border-t py-7 last:border-b md:[&:nth-last-child(2)]:border-b"
                  style={{ borderTopColor: CATEGORY_HAIRLINE[c] }}
                >
                  {count > 0 ? (
                    <a href={`#${c}`} className="group block">
                      <div className="flex items-baseline justify-between gap-4">
                        <h2 className="t-title m-0">
                          <span className="link-rule">{cat.label}</span>
                        </h2>
                        <span className="tabnum t-label opacity-55">
                          {count} {count === 1 ? "post" : "posts"}
                        </span>
                      </div>
                      <p className="t-small mt-3 mb-0 measure opacity-75">{cat.purpose}</p>
                    </a>
                  ) : (
                    <div className="opacity-60">
                      <div className="flex items-baseline justify-between gap-4">
                        <h2 className="t-title m-0">{cat.label}</h2>
                        <span className="tabnum t-label opacity-55">None just now</span>
                      </div>
                      <p className="t-small mt-3 mb-0 measure opacity-75">{cat.purpose}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* S3 — the board itself, grouped by category, notices of natural height */}
      <section className="g-paper section-lg">
        <div className="shell">
          <SectionLabel>The board</SectionLabel>
          <div className="mt-6">
            <ChipRow
              groups={[
                {
                  legend: "Category",
                  options: CATEGORY_ORDER.map((c) => LISTING_CATEGORY[c].label),
                },
                { legend: "Place", options: ["Online", "In person"] },
                { legend: "Order", options: ["Most recent"] },
              ]}
            />
          </div>

          <div className="mt-14 grid gap-x-14 gap-y-16">
            {populated.map((c) => {
              const cat = LISTING_CATEGORY[c];
              const posts = byCategory(c);
              return (
                <div key={c} id={c} className="scroll-mt-28">
                  <div
                    className="flex items-baseline justify-between gap-4 border-t-2 pb-3"
                    style={{ borderTopColor: CATEGORY_HAIRLINE[c] }}
                  >
                    <h3 className="t-label mt-3 mb-0" style={{ color: CATEGORY_HAIRLINE[c] }}>
                      {cat.label.toUpperCase()}
                    </h3>
                    <span className="t-label mt-3 opacity-55">{cat.purpose}</span>
                  </div>

                  <div className="mt-6 grid gap-x-14 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((l, i) => (
                      <Reveal
                        as="article"
                        key={l.slug}
                        delay={Math.min(i, 5) * 40}
                        className="relative"
                      >
                        <span
                          aria-hidden
                          className="block h-px w-full"
                          style={{ backgroundColor: CATEGORY_HAIRLINE[c] }}
                        />
                        <div className="py-5">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge badge={l.badge} />
                            {l.sample && <SampleMark />}
                          </div>
                          <h4 className="t-title mt-4 mb-0">
                            <Link href={`/collaborate/${l.slug}`} className="link-rule">
                              {l.title}
                            </Link>
                          </h4>
                          <p className="t-small mt-3 mb-0 opacity-80">{l.description}</p>
                          <p className="t-label mt-4 mb-0 opacity-60">
                            {l.location} · expires {longDate(l.expiry)}
                          </p>
                          <p className="mt-3 mb-0">
                            <Link href={`/collaborate/${l.slug}`} className="t-label link-rule">
                              Contact →
                            </Link>
                          </p>
                        </div>
                        <span
                          aria-hidden
                          className="block h-px w-full"
                          style={{ backgroundColor: CATEGORY_HAIRLINE[c] }}
                        />
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="t-small mt-16 mb-0 opacity-70">
            Something to post?{" "}
            <Link href="/submit/listing" className="link-rule">
              Submit a community listing
            </Link>
            . Every post is read by a person before it appears, and carries an expiry date.
          </p>
        </div>
      </section>

      {/* S4 — what belongs here, what doesn't */}
      <section className="g-indigo-deep section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel>What belongs here</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">
              A noticeboard, not a marketplace.
            </h2>
            <p className="t-body mt-8 mb-0 measure">
              The board is for genuine needs and offers between members: seeking a collaborator or cover
              teacher, offering mentoring or a skill, sharing a space, starting a project, asking for
              volunteers, passing on a referral, or proposing an exchange.
            </p>
            <p className="t-body mt-6 mb-0 measure">
              Contact runs through an enquiry, never an exposed email — the same privacy rule that governs
              profiles. Each post has an expiry date, and expired posts leave the board automatically.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
            <SectionLabel>What we will not publish</SectionLabel>
            <ul className="mt-6" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {EXCLUDED.map((x) => (
                <li key={x} className="t-body flex items-baseline gap-3 py-2">
                  <span aria-hidden style={{ color: "var(--color-clay)" }}>
                    ✕
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="t-small mt-6 mb-0 measure opacity-60">
              A public board without published rules becomes spam. Anything that reads as an advertisement
              rather than a genuine community post is declined.
            </p>
            <div className="mt-8">
              <Link href="/submit/listing" className="t-label link-rule">
                Post to the board →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
