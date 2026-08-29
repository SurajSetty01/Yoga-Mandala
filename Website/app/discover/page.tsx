import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { Reveal } from "@/lib/motion/Reveal";
import { getDiscoverFeed } from "@/lib/content";

export const metadata: Metadata = {
  title: "Discover",
  description:
    "One curated feed of everything worth finding — external opportunities from the bulletin and member listings from the Sangha Board, each clearly labelled.",
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Discover — an aggregated feed that pulls together the curated bulletin (external offerings)
 * and community listings (Sangha Board) into one place to browse. Each item keeps its own
 * badge, so the origin is never blurred; each links to its canonical detail on Discover.
 */
export default function DiscoverIndex() {
  const feed = getDiscoverFeed();

  return (
    <>
      <PageHeader
        label="Discover"
        title="Everything worth finding, in one place."
        standfirst="A single feed drawing together curated external opportunities and what members are offering and seeking. Nothing here loses its label — each item shows plainly whether it is an external offering or a community listing."
      />

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <SectionLabel>The feed</SectionLabel>
        <ul className="mt-8 border-t rule-gold">
          {feed.map((item) => (
            <li key={`${item.kind}-${item.slug}`} className="border-b rule-gold">
              <Reveal>
                <Link href={`/discover/${item.slug}`} className="group grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6">
                  <div>
                    <h2 className="font-display text-title transition-colors duration-fast group-hover:text-terracotta">
                      {item.title}
                    </h2>
                    <p className="measure mt-2 text-small text-bark-soft">{item.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <Badge origin={item.origin} />
                      <span className="text-small text-bark-soft">
                        {item.kind === "bulletin" ? item.category : item.category}
                      </span>
                      {item.sample && <SampleTag />}
                    </div>
                  </div>
                  <span className="text-small text-bark-soft sm:text-right">
                    <span className="section-label block">Open until</span>
                    <span className="tnum">{formatDate(item.expiry)}</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
