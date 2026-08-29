import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EventsList } from "@/components/sections/events/EventsList";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Meetups, study circles, expert conversations, workshops and partner events — with Yoga Mandala's own events clearly distinguished from partner ones.",
};

/**
 * Events index — a date-led list with type filters. Registration links out; no ticketing or
 * payment in Phase A. Badges keep Yoga Mandala's own events distinct from partner events.
 */
export default function EventsIndex() {
  const events = getEvents();
  return (
    <>
      <PageHeader
        label="Events"
        title="When the community gathers."
        standfirst="Meetups, study circles, expert conversations and workshops — some organised by Yoga Mandala, some by partners, always clearly labelled. Registration links out to the organiser; nothing is ticketed or paid for here."
      />
      <EventsList events={events} />
    </>
  );
}
