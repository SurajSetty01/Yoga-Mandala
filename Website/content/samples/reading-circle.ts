/**
 * SAMPLE content — Reading Circle (§6.4).
 * A selected text, reading period, facilitator, prompts and meeting date. The text referenced
 * is a real public-domain edition; the circle itself (facilitator, dates) is placeholder.
 */
export interface ReadingCircle {
  sample: boolean;
  textTitle: string;
  textEdition: string;
  textSlug: string; // links to the library record where available
  period: string;
  facilitator: string;
  meetingDate: string;
  prompts: string[];
  note: string;
}

export const SAMPLE_READING_CIRCLE: ReadingCircle = {
  sample: true,
  textTitle: "The Haṭha Yoga Pradīpikā",
  textEdition: "Pancham Sinh translation (1914), public domain",
  textSlug: "hatha-yoga-pradipika-sinh-1914",
  period: "Six weeks",
  facilitator: "Sample Facilitator — [profile pending]",
  meetingDate: "2026-10-12",
  prompts: [
    "What does the text assume the reader already practises?",
    "Where does methodology shade into philosophy?",
    "Which instructions translate to a contemporary teaching context, and which do not?",
  ],
  note: "Placeholder content demonstrating the Reading Circle layout. The current text, period, facilitator and prompts are supplied by the community at content handover.",
};
