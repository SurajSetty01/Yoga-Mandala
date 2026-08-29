import type { Metadata } from "next";
import Link from "next/link";
import { SampleMark, SectionLabel } from "@/components/ui";
import { Crumbs } from "@/components/page";
import { DirectoryIndex } from "@/components/connect/DirectoryIndex";
import { PEOPLE } from "@/content/samples";

export const metadata: Metadata = {
  title: "Teacher Directory",
  description:
    "Find teachers, therapists and researchers by place, tradition and practice. An enquiry-only directory — no private contact details are ever exposed.",
};

export default function DirectoryPage() {
  return (
    <>
      {/* S1 — compact opener */}
      <header className="g-paper pt-32 pb-8 md:pt-40 md:pb-10">
        <div className="shell">
          <Crumbs trail={[{ label: "Connect", href: "/connect" }, { label: "Teacher Directory" }]} />
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <SectionLabel>The directory</SectionLabel>
              <h1 className="t-display-m mt-6 mb-0">Find a teacher.</h1>
              <p className="t-small mt-5 mb-0 measure opacity-75">
                Search by tradition, place, practice or role. Contact is by enquiry only — we never publish a
                teacher&rsquo;s phone number or email.
              </p>
            </div>
            <p className="t-label opacity-60">
              {PEOPLE.length} profiles <SampleMark className="ml-2" />
            </p>
          </div>
        </div>
      </header>

      {/* S2 + S3 — filters and index */}
      <section className="g-paper section pt-4">
        <div className="shell">
          <DirectoryIndex people={PEOPLE} />
        </div>
      </section>

      {/* S4 — verification explained */}
      <section className="g-indigo-deep section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>On &ldquo;Verified Teacher&rdquo;</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">What the badge means, and what it does not.</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <p className="t-body mt-0 mb-0 measure">
              &ldquo;Verified Teacher&rdquo; means the information a member submitted has been reviewed against
              published criteria. It is <strong>not</strong> a blanket endorsement of that teacher, their methods
              or their fitness for any particular student. Absence of the badge means only that a profile has not
              yet been reviewed — there is no &ldquo;unverified&rdquo; mark, and none is implied.
            </p>
            <p className="t-small mt-6 mb-0 measure opacity-70">
              The exact criteria are being finalised with the community and will be published here in full.
            </p>
          </div>
        </div>
      </section>

      {/* S5 — join */}
      <section className="g-paper section">
        <div className="shell max-w-2xl">
          <SectionLabel>Join the directory</SectionLabel>
          <p className="t-body mt-6 mb-0 measure">
            Members of the Sangha can list a profile: name, place, tradition, a short bio and how you teach. You
            control which fields are public, and you are found through the directory rather than by handing out
            your number.
          </p>
          <div className="mt-7">
            <Link href="/join" className="t-label link-rule">
              Join the Sangha →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
