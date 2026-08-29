import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SubmitForm } from "@/components/sections/submit/SubmitForm";
import { RESOURCE_FIELDS } from "@/components/sections/submit/configs";

export const metadata: Metadata = { title: "Submit a Resource" };

export default function SubmitResource() {
  return (
    <>
      <PageHeader
        label="Submit · Resource"
        title="Suggest a text for the Library."
        standfirst="The Library links to legitimate sources and never hosts files, so rights and access information are required. Public-domain and openly-licensed texts are ideal."
      />
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="max-w-2xl">
          <SubmitForm fields={RESOURCE_FIELDS} typeLabel="Resource details" />
        </div>
      </section>
    </>
  );
}
