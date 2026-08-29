import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { BoardFilters } from "@/components/sections/collaborate/BoardFilters";
import { getListings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sangha Board",
  description:
    "A community notice board — opportunities, spaces, projects, referrals, volunteering and teacher exchange, submitted by members.",
};

/**
 * Collaborate / Sangha Board — the SERVE and COLLABORATE pillars in practice. A filterable
 * notice board of member-submitted listings (§8), all carrying the Community Listing badge.
 */
export default function CollaborateHub() {
  const listings = getListings();
  return (
    <>
      <PageHeader
        label="Collaborate"
        title="A board for what the community needs and offers."
        standfirst="Opportunities, spaces, projects, referrals, volunteering and teacher exchange — posted by members, for members. Every post is a community listing with a review date; contact is always through the portal, never public personal details."
      >
        <p className="mt-6">
          <Link href="/submit/listing" className="group inline-flex items-center gap-2 text-small text-forest">
            Post to the board
            <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
          </Link>
        </p>
      </PageHeader>

      <BoardFilters listings={listings} />
    </>
  );
}
