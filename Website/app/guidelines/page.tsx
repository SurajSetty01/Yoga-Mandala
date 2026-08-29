import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Principles } from "@/components/sections/about/Principles";

export const metadata: Metadata = {
  title: "Community Guidelines",
  description: "The guidelines every member agrees to — drawn from the community principles.",
};

/**
 * /guidelines — the same charter content as /about/principles (framework §14 serves as both).
 * Kept as its own route because guidelines must be published before member data is collected.
 */
export default function GuidelinesPage() {
  return (
    <>
      <PageHeader
        label="Community Guidelines"
        title="What every member agrees to."
        standfirst="The guidelines are the community principles, stated as expectations. They are published before any member data is collected."
      />
      <Principles />
    </>
  );
}
