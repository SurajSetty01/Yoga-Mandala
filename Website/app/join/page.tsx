import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArtPlate } from "@/components/ui/Plate";
import { JoinForm } from "@/components/sections/join/JoinForm";

export const metadata: Metadata = {
  title: "Join the Sangha",
  description:
    "Become part of a community of Yoga teachers across India and abroad — a profile, a place to participate, and a way to contribute.",
};

/**
 * Join — an invitation, not a generic signup. Left: what membership means, in the community's
 * warm voice. Right: the (UI-only) form. Nothing is stored or sent.
 */
export default function JoinPage() {
  return (
    <>
      <PageHeader
        label="Join"
        title="Join the Sangha."
        standfirst="Yoga Mandala is a community of more than 700 teachers across India and abroad. Membership is a profile, a place to participate, and a way to contribute — for the teachers, by the teachers."
      />

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:gap-16">
          {/* What membership means */}
          <div>
            <ArtPlate variant="botanical" label="Growth within a community" ratio="4 / 5" className="max-w-xs" />
            <SectionLabel className="mt-8">What membership means</SectionLabel>
            <ul className="mt-5 space-y-4">
              {[
                "A profile in the community",
                "Take part in meetups, study circles and events",
                "Submit events, opportunities, resources and listings",
                "Apply for a place in the teacher directory",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 border-b rule-gold pb-4 text-body text-bark">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {x}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div>
            <JoinForm />
          </div>
        </div>
      </section>
    </>
  );
}
