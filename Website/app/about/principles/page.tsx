import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Principles } from "@/components/sections/about/Principles";

export const metadata: Metadata = {
  title: "Community Principles",
  description:
    "How the Yoga Mandala community holds itself — the principles, the standard for claims, and exactly what happens to anything you submit.",
};

export default function PrinciplesPage() {
  return (
    <>
      <PageHeader
        label="About · Principles"
        title="A charter, not fine print."
        standfirst="Yoga Mandala is community-led. These are the values the community holds itself to — published openly, before we ask anyone for anything. They double as the community guidelines."
      />
      <Principles />
    </>
  );
}
