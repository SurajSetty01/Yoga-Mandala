import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SubmitForm } from "@/components/sections/submit/SubmitForm";
import { LISTING_FIELDS } from "@/components/sections/submit/configs";

export const metadata: Metadata = { title: "Submit a Community Listing" };

export default function SubmitListing() {
  return (
    <>
      <PageHeader
        label="Submit · Community listing"
        title="Post to the Sangha Board."
        standfirst="An offer, a need, a space, a project, a referral or a teacher exchange. Contact routes through the portal — please don't include private phone numbers or email addresses."
      />
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="max-w-2xl">
          <SubmitForm fields={LISTING_FIELDS} typeLabel="Listing details" />
        </div>
      </section>
    </>
  );
}
