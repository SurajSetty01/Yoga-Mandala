import type { BadgeLabel, BadgeStyle, Origin } from "./types";

/**
 * The badge system (framework §10). This is the SINGLE source of truth mapping the
 * structural `origin` field to a badge label + style. Components read the badge from
 * data — badges are never hardcoded into markup, and the four categories are never blurred
 * (framework §23: "Never blur these categories").
 */

export interface BadgeDef {
  label: BadgeLabel;
  style: BadgeStyle;
  /** §10 definition, verbatim — shown in the Learn hub explainer. */
  meaning: string;
}

const ORIGIN_TO_BADGE: Record<Origin, BadgeDef> = {
  yoga_mandala_initiative: {
    label: "Yoga Mandala Learning Initiative",
    style: "forest-fill",
    meaning: "Formally organised or endorsed by Yoga Mandala.",
  },
  curated_external: {
    label: "Curated Community Listing",
    style: "gold-hairline",
    meaning: "An external opportunity selected for relevance.",
  },
  community_submission: {
    label: "Community Listing",
    style: "moss-hairline",
    meaning: "A member-submitted listing meeting community rules.",
  },
  partner_guest: {
    label: "Partner / Guest",
    style: "bark-hairline",
    meaning: "A legitimate external collaborator or organisation.",
  },
};

export function badgeForOrigin(origin: Origin): BadgeDef {
  const def = ORIGIN_TO_BADGE[origin];
  if (!def) {
    throw new Error(`Unknown origin "${origin}" — cannot resolve a badge.`);
  }
  return def;
}

export function isValidOrigin(value: unknown): value is Origin {
  return (
    typeof value === "string" && Object.prototype.hasOwnProperty.call(ORIGIN_TO_BADGE, value)
  );
}

/** Ordered list for the Learn-hub badge explainer. */
export const ALL_BADGES: BadgeDef[] = [
  ORIGIN_TO_BADGE.yoga_mandala_initiative,
  ORIGIN_TO_BADGE.curated_external,
  ORIGIN_TO_BADGE.community_submission,
  ORIGIN_TO_BADGE.partner_guest,
];
