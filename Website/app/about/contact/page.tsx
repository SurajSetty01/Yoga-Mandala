import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { PendingBlock } from "@/components/ui/PendingBlock";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = { title: "Contact & Moderation" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="About · Contact"
        title="Reaching the people who keep this place."
        standfirst="Yoga Mandala is community-led. When there's a public contact and moderation address, it will live here — and moderation concerns will route to it."
      />
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="grid gap-10 md:grid-cols-2">
          <PendingBlock
            title="Contact & moderation address"
            awaiting="Awaiting the public contact email and the moderation contact address so members can reach the community's moderators directly."
          />
          <div>
            <SectionLabel>In the meantime</SectionLabel>
            <p className="measure mt-4 text-body text-bark-soft">
              The day-to-day conversation of the community lives on WhatsApp; the portal is its
              permanent, searchable home. How the two connect — including any public WhatsApp link
              — is confirmed with the community before it appears here.
            </p>
            <p className="mt-6">
              <Link href="/about/principles" className="group inline-flex items-center gap-2 text-small text-forest">
                How moderation works
                <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
