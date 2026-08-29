import type { CSSProperties } from "react";

/**
 * ArtPlate — an art-directed placeholder standing in for a real photograph or archival plate.
 *
 * No stock imagery exists yet and generic wellness stock is forbidden, so photographic slots
 * render a composed, warm, layered SVG ground (variant-driven) that reads as intentional
 * design — never a broken image, never a cliché, never a fabricated face. Each is swappable
 * for a real asset later by changing one data field. A caption states what it stands for.
 */
export type PlateVariant =
  | "study" // warm interior light — study / gathering feel
  | "manuscript" // aged-paper leaf with ruled lines — text/archive feel
  | "portrait" // duotone abstract figure, cropped away from any face
  | "botanical" // growing forms — the "living" motif, no lotus/mandala
  | "field"; // open landscape band — atmospheric

const grounds: Record<PlateVariant, string> = {
  study: "linear-gradient(155deg, #2f4a34 0%, #26402c 45%, #6b6034 100%)",
  manuscript: "linear-gradient(160deg, #efe7d4 0%, #e2d6bd 60%, #cdbf9d 100%)",
  portrait: "linear-gradient(150deg, #182a1d 0%, #26402c 55%, #7c8a63 120%)",
  botanical: "linear-gradient(165deg, #26402c 0%, #3a5a3e 50%, #a6853f 130%)",
  field: "linear-gradient(180deg, #c9ba97 0%, #9c8f6a 40%, #26402c 120%)",
};

function ground(v: PlateVariant): string {
  return grounds[v];
}

export function ArtPlate({
  variant = "study",
  label,
  ratio = "4 / 3",
  rounded = true,
  className = "",
  children,
}: {
  variant?: PlateVariant;
  /** Accessible description of what the image stands for. */
  label: string;
  /** CSS aspect-ratio string, e.g. "2 / 5". */
  ratio?: string;
  rounded?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const style: CSSProperties = {
    aspectRatio: ratio,
    backgroundImage: ground(variant),
  };
  return (
    <div
      role="img"
      aria-label={label}
      style={style}
      className={`img-graded relative isolate overflow-hidden ${rounded ? "rounded-[4px]" : ""} ${className}`}
    >
      <PlateMotif variant={variant} />
      {children}
    </div>
  );
}

/** Subtle SVG motif layered over the ground — abstract, never a cliché. */
function PlateMotif({ variant }: { variant: PlateVariant }) {
  if (variant === "manuscript") {
    return (
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.5]"
        preserveAspectRatio="none"
        viewBox="0 0 400 300"
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={i}
            x1="42"
            x2="358"
            y1={70 + i * 16}
            y2={70 + i * 16}
            stroke="#8c7b52"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}
        <rect x="34" y="40" width="332" height="220" fill="none" stroke="#8c7b52" strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  }
  if (variant === "portrait") {
    return (
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice" viewBox="0 0 300 400">
        <circle cx="150" cy="150" r="78" fill="#0f1d13" opacity="0.55" />
        <path d="M40 400 Q150 250 260 400 Z" fill="#0f1d13" opacity="0.5" />
      </svg>
    );
  }
  if (variant === "botanical") {
    return (
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-45" preserveAspectRatio="xMidYMax slice" viewBox="0 0 300 300">
        <path d="M150 300 V120" stroke="#e7dfce" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M150 200 Q110 170 96 130 M150 200 Q190 170 204 130 M150 160 Q120 140 110 110 M150 160 Q180 140 190 110" stroke="#e7dfce" strokeWidth="1.6" fill="none" opacity="0.55" />
        <circle cx="150" cy="118" r="6" fill="#e7dfce" opacity="0.7" />
      </svg>
    );
  }
  if (variant === "field") {
    return (
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none" viewBox="0 0 400 300">
        <path d="M0 210 Q120 180 200 205 T400 200 V300 H0 Z" fill="#182a1d" opacity="0.5" />
        <circle cx="315" cy="80" r="30" fill="#f3eee3" opacity="0.28" />
      </svg>
    );
  }
  // study
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full opacity-35" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
      <rect x="250" y="0" width="150" height="300" fill="#f3eee3" opacity="0.12" />
      <rect x="286" y="0" width="70" height="300" fill="#f3eee3" opacity="0.14" />
      <path d="M0 250 Q200 220 400 250 V300 H0 Z" fill="#0f1d13" opacity="0.4" />
    </svg>
  );
}
