import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui";
import { PageMasthead } from "@/components/page";
import { ContactForm } from "@/components/about/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Three ways to reach Yoga Mandala — general enquiries, moderation & safety, and data & privacy. Messages are routed to the right people without exposing any address.",
};

const ROUTES = [
  {
    label: "General enquiries",
    detail:
      "Anything about Yoga Mandala — what it is, how to take part, or a question that does not fit the other two.",
  },
  {
    label: "Moderation & safety",
    detail:
      "Report content that breaches the principles, raise a safety concern, or question a moderation decision. A formal appeals process has not yet been defined; concerns are still read and acted on.",
  },
  {
    label: "Data & privacy",
    detail:
      "Access, correct or delete your information, or ask how your data is handled. These requests are handled with care.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageMasthead
        kicker="Contact"
        word="Contact"
        title="Three routes, kept separate on purpose."
        standfirst="Conflating a general question, a safety report and a data request makes for a poor experience — and worse handling. Choose the route that fits, and your message reaches the right people. In keeping with our own privacy rules, no address is exposed; enquiries are routed appropriately."
        crumbs={[{ label: "About", href: "/about" }, { label: "Contact" }]}
      />

      {/* S2 — the three routes as a typographic list */}
      <section className="g-paper section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Where to write</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0">Pick the right door.</h2>
            <p className="t-body mt-6 mb-0 measure">
              Each route reaches the people responsible for that kind of request. You can also use the form below
              and choose the subject there.
            </p>
          </div>
          <dl className="lg:col-span-7 lg:col-start-6" style={{ margin: 0 }}>
            {ROUTES.map((r, i) => (
              <Reveal
                as="div"
                key={r.label}
                delay={i * 70}
                className="grid gap-3 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] py-7 first:border-t-0 first:pt-0 last:border-b md:grid-cols-[minmax(0,16rem)_1fr] md:items-baseline md:gap-10"
              >
                <dt className="t-title m-0">{r.label}</dt>
                <dd className="t-body m-0 measure">{r.detail}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* S3 — the form (UI only) */}
      <section className="g-indigo-deep section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Send a message</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0">Say what you need.</h2>
            <p className="t-body mt-6 mb-0 measure">
              This form is a preview of what will exist. It routes on the subject you choose and never reveals an
              address to you, or requires one of ours.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* S4 — quiet cross-links */}
      <section className="g-paper section">
        <div className="shell max-w-3xl">
          <SectionLabel>Before you write</SectionLabel>
          <p className="t-body mt-8 mb-0 measure">
            Many questions are already answered in the{" "}
            <Link href="/about/principles" className="link-rule">
              Community Principles
            </Link>{" "}
            and the fuller{" "}
            <Link href="/guidelines" className="link-rule">
              Community Guidelines
            </Link>
            . For how the project is run and who owns what, see{" "}
            <Link href="/about/governance" className="link-rule">
              Governance &amp; Ownership
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
