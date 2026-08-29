import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getResources } from "@/lib/content";
import { LIBRARY_SUBJECTS } from "@/lib/taxonomy";
import { LibraryCollection } from "@/components/sections/learn/LibraryCollection";

export const metadata: Metadata = {
  title: "Library",
  description:
    "A catalogue of foundational Yoga texts — real public-domain editions, linked to legitimate sources, never hosted here.",
};

/**
 * Library index — "a reading room" + "a catalogue spine" + "catalogue records, not product
 * cards". Real public-domain content. Subject counts and an editorial record list (client
 * component handles subject filtering). §6.3 copyright principle published on the page.
 */
export default function LibraryIndex() {
  const resources = getResources();
  const counts = LIBRARY_SUBJECTS.map((s) => ({
    subject: s,
    count: resources.filter((r) => r.subject === s).length,
  })).filter((c) => c.count > 0);

  return (
    <>
      <PageHeader
        label="Learning · Library"
        title="A reading room of foundational texts."
        standfirst="Centuries of the literature that Yoga rests on are in the public domain. The Library is a catalogue of real editions with links to legitimate sources — it never hosts a file. Every record states its rights."
      >
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-small text-bark-soft">
          <span className="tnum">
            <strong className="font-display text-title text-bark">{resources.length}</strong> records
          </span>
          <span className="tnum">
            <strong className="font-display text-title text-bark">{counts.length}</strong> subjects
          </span>
          <span>Public domain · link-out only</span>
        </div>
      </PageHeader>

      <LibraryCollection resources={resources} counts={counts} />

      {/* S4 · Rights & access, published */}
      <section className="bg-forest-deep py-section-sm text-sand">
        <div className="mx-auto max-w-content px-6">
          <SectionLabel tone="sand">On rights &amp; access</SectionLabel>
          <p className="measure-wide mt-5 text-lead text-sand/90">
            The Library does not host or redistribute protected books, recordings or documents.
            Where rights are unclear, it uses legitimate links, bibliographic information or
            approved access methods. Everything catalogued here is a genuine public-domain edition,
            linked to a legitimate source.
          </p>
          <p className="mt-6 text-small text-sand/70">
            Know a text that belongs here?{" "}
            <a href="/submit/resource" className="underline decoration-gold underline-offset-4 hover:text-sand">
              Suggest a resource
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
