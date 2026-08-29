import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Submit",
  description:
    "Share an event, a learning opportunity, a resource or a community listing with the Sangha. Everything is reviewed before it appears.",
};

const ROUTES = [
  { href: "/submit/event", title: "An event", blurb: "A meetup, study circle, workshop or gathering." },
  { href: "/submit/learning-opportunity", title: "A learning opportunity", blurb: "An external programme, course, retreat or training worth curating." },
  { href: "/submit/resource", title: "A resource", blurb: "A text for the Library — linked to a legitimate source, never hosted." },
  { href: "/submit/listing", title: "A community listing", blurb: "An offer, a need, a space, a project — for the Sangha Board." },
];

/**
 * Submit hub — one submission engine, four typed routes. A quiet index rather than four cards:
 * large linked lines with a short descriptor, gold-ruled.
 */
export default function SubmitHub() {
  return (
    <>
      <PageHeader
        label="Submit"
        title="Share something with the Sangha."
        standfirst="Anything you submit is read by a moderator before it appears, and carries a label so its origin is always clear. Choose what you'd like to share."
      />

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <SectionLabel>What would you like to share?</SectionLabel>
        <ul className="mt-8 border-t rule-gold">
          {ROUTES.map((r) => (
            <li key={r.href} className="border-b rule-gold">
              <Link href={r.href} className="group grid gap-2 py-7 sm:grid-cols-[0.4fr_0.6fr] sm:items-baseline sm:gap-8">
                <h2 className="font-display text-display-m transition-colors duration-fast group-hover:text-terracotta">
                  {r.title}
                </h2>
                <p className="text-body text-bark-soft">{r.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-small text-bark-soft">
          Prefer to become a member first?{" "}
          <Link href="/join" className="underline decoration-gold underline-offset-4 hover:text-terracotta">
            Join the Sangha
          </Link>
          .
        </p>
      </section>
    </>
  );
}
