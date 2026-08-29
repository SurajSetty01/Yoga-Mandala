import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SubmitForm } from "@/components/sections/submit/SubmitForm";
import { LEARNING_FIELDS } from "@/components/sections/submit/configs";

export const metadata: Metadata = { title: "Submit a Learning Opportunity" };

export default function SubmitLearning() {
  return (
    <>
      <PageHeader
        label="Submit · Learning opportunity"
        title="Submit a learning opportunity."
        standfirst="An external programme, course, retreat or training worth a teacher's attention. If curated, it appears in the bulletin labelled as an external offering — never as a Yoga Mandala programme."
      />
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="max-w-2xl">
          <SubmitForm fields={LEARNING_FIELDS} typeLabel="Opportunity details" />
        </div>
      </section>
    </>
  );
}
