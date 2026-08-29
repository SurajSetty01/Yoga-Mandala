import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DirectoryFilters } from "@/components/sections/connect/DirectoryFilters";
import { getPeople } from "@/lib/content";

export const metadata: Metadata = {
  title: "Teacher Directory",
  description:
    "Find a fellow teacher by tradition, place, language, experience and more. Contact is via an enquiry form — never public personal details.",
};

/**
 * Teacher Directory — the framework's "core long-term asset". Live client-side filtering over
 * treated placeholder profiles (no real people in Phase A; portraits are treated). Contact
 * details are never exposed — the profile uses an enquiry form (§16).
 */
export default function DirectoryIndex() {
  const people = getPeople();
  return (
    <>
      <PageHeader
        label="Connect · Directory"
        title="Find a fellow teacher."
        standfirst="Search the community by tradition, place, language, experience and role. Profiles are reviewed against published criteria before they appear — a review, not an endorsement. You reach a teacher through an enquiry form; their private details are never published."
      >
        <p className="mt-6 text-small text-bark-soft">
          The profiles shown are clearly-marked placeholders while the real directory is gathered.
        </p>
      </PageHeader>

      <Suspense fallback={<div className="mx-auto max-w-content px-6 py-section-sm text-small text-bark-soft">Loading the directory…</div>}>
        <DirectoryFilters people={people} />
      </Suspense>
    </>
  );
}
