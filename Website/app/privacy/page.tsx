import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PendingBlock } from "@/components/ui/PendingBlock";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        label="Privacy"
        title="Privacy Policy."
        standfirst="The framework requires that the privacy policy is published before any substantial member data is collected. It is being finalised — and no member data is collected until it, the terms and the guidelines are live."
      />
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <PendingBlock
          className="max-w-2xl"
          title="Privacy policy — being finalised"
          awaiting="Awaiting the privacy policy, with legal review, and confirmation of the data jurisdiction (India's DPDP Act and/or GDPR, depending on where members are based). No signup or data collection is active until it is published."
        />
      </section>
    </>
  );
}
