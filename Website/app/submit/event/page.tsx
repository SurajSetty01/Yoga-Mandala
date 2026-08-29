import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SubmitForm } from "@/components/sections/submit/SubmitForm";
import { EVENT_FIELDS } from "@/components/sections/submit/configs";

export const metadata: Metadata = { title: "Submit an Event" };

export default function SubmitEvent() {
  return (
    <>
      <PageHeader
        label="Submit · Event"
        title="Submit an event."
        standfirst="A meetup, study circle, workshop or gathering. Registration links out to your organiser; nothing is ticketed or paid for here."
      />
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="max-w-2xl">
          <SubmitForm fields={EVENT_FIELDS} typeLabel="Event details" />
        </div>
      </section>
    </>
  );
}
