import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { PendingBlock } from "@/components/ui/PendingBlock";

export const metadata: Metadata = { title: "Participation & Terms" };

export default function TermsPage() {
  return (
    <>
      <PageHeader
        label="Terms"
        title="Participation & Terms."
        standfirst="The terms of participation are being finalised alongside the privacy policy. In the meantime, the community principles already describe how the community holds itself."
      />
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <PendingBlock
          className="max-w-2xl"
          title="Participation & terms — being finalised"
          awaiting="Awaiting the participation and terms policy, with legal review. It is on the critical path and will be published before member data is collected."
        />
        <p className="mt-8 max-w-2xl text-small text-bark-soft">
          The{" "}
          <Link href="/about/principles" className="underline decoration-gold underline-offset-4 hover:text-terracotta">
            community principles
          </Link>{" "}
          are published now and describe the values every member agrees to.
        </p>
      </section>
    </>
  );
}
