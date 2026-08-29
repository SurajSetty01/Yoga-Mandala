import Link from "next/link";
import { getUpcomingEvent } from "@/lib/content";
import { badgeForOrigin } from "@/lib/badges";
import { ArtPlate } from "@/components/ui/Plate";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/lib/motion/Reveal";

/**
 * S4 · Upcoming event — "The date is the image" (T5 column strips + date typography).
 * The day numeral is set enormous in a brass outline; content overlaps it; three tall 2:5
 * strips sit at varied vertical offsets. Different rhythm from the section before it.
 */
function parts(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "long" }),
    weekday: d.toLocaleDateString("en-GB", { weekday: "long" }),
  };
}

export function UpcomingEvent() {
  const ev = getUpcomingEvent();
  if (!ev) return null;
  const badge = badgeForOrigin(ev.origin);
  const { day, month, weekday } = parts(ev.date);

  return (
    <section className="relative overflow-hidden bg-sand py-section" aria-label="Upcoming event">
      <div className="mx-auto max-w-content px-6">
        <SectionLabel>Next gathering</SectionLabel>

        <div className="relative mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* Date-led composition */}
          <div className="relative">
            <div className="pointer-events-none flex items-start gap-4">
              <span
                className="font-display leading-[0.8] text-transparent tnum"
                style={{
                  fontSize: "clamp(7rem, 4rem + 20vw, 17rem)",
                  WebkitTextStroke: "1.5px #A6853F",
                }}
              >
                {day}
              </span>
              <span className="mt-4 flex flex-col gap-1">
                <span className="section-label text-bark">{month}</span>
                <span className="section-label text-bark-soft">{weekday}</span>
              </span>
            </div>

            <div className="relative -mt-6 max-w-xl lg:-mt-10">
              <div className="flex flex-wrap items-center gap-3">
                <Badge def={badge} />
                {ev.sample && <SampleTag />}
              </div>
              <h2 className="mt-4 font-display text-display-m">{ev.title}</h2>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t rule-gold pt-4 text-small text-bark-soft">
                <span>{ev.host}</span>
                <span>{ev.time}</span>
                <span>{ev.online ? `${ev.location}` : ev.location}</span>
                <span>{ev.audience}</span>
                <span>{ev.fee}</span>
              </div>
              <Link
                href="/events"
                className="group mt-6 inline-flex items-center gap-2 text-small text-forest transition-colors duration-fast hover:text-terracotta"
              >
                All events
                <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Three tall strips at varied offsets */}
          <div className="hidden grid-cols-3 gap-3 lg:grid">
            <Reveal y={30}>
              <ArtPlate variant="field" label="The venue in morning light" ratio="2 / 5" className="mt-10" />
            </Reveal>
            <Reveal y={30} delay={80}>
              <ArtPlate variant="study" label="A past community gathering" ratio="2 / 5" />
            </Reveal>
            <Reveal y={30} delay={160}>
              <ArtPlate variant="botanical" label="A detail from the setting" ratio="2 / 5" className="mt-16" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
