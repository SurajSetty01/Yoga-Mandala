import Image from "next/image";
import type { PlateSpec } from "@/content/types";

/**
 * Plate — the single image primitive.
 *
 * Renders the real photograph when `spec.src` is set. The toned ground below is
 * only a fallback for slots that have no cleared asset yet; it states the
 * intended subject so it doubles as the brief for sourcing that image.
 */

const TONES: Record<NonNullable<PlateSpec["tone"]>, string> = {
  paper:
    "radial-gradient(125% 95% at 20% 10%, #ece2cb 0%, #ddd0b2 45%, #c2b393 100%), linear-gradient(155deg, rgba(169,139,82,.30), rgba(38,53,79,.14))",
  indigo:
    "radial-gradient(120% 100% at 75% 6%, #46597b 0%, #2f4162 44%, #1d2941 100%), linear-gradient(200deg, rgba(169,139,82,.24), rgba(22,31,46,.45))",
  clay: "radial-gradient(125% 95% at 24% 84%, #b96339 0%, #99492a 42%, #66301c 100%), linear-gradient(160deg, rgba(244,241,233,.16), rgba(38,53,79,.24))",
  sage: "radial-gradient(125% 105% at 68% 16%, #8d9a7d 0%, #6c7860 45%, #464f3c 100%), linear-gradient(140deg, rgba(244,241,233,.18), rgba(38,53,79,.20))",
  archive:
    "linear-gradient(168deg, #f0e9d8 0%, #e2d9c2 48%, #cfc2a3 100%), radial-gradient(90% 70% at 30% 20%, rgba(169,139,82,.26), transparent 70%)",
};

const HATCH =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cpath d='M-2 2 L2 -2 M0 12 L12 0 M10 14 L14 10' stroke='%23000' stroke-opacity='0.5' stroke-width='0.6'/%3E%3C/svg%3E\")";

const DARK_TONES = new Set(["indigo", "clay", "sage"]);

const isRemote = (src: string) => /^https?:\/\//.test(src);

export function Plate({
  spec,
  ratio = "4 / 5",
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  rounded = false,
  showCaption = true,
  objectPosition,
}: {
  spec: PlateSpec;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  showCaption?: boolean;
  objectPosition?: string;
}) {
  const tone = spec.tone ?? "paper";
  const dark = DARK_TONES.has(tone);

  return (
    <figure className={`relative m-0 ${className}`} style={{ aspectRatio: ratio }}>
      <div
        className={`grain absolute inset-0 overflow-hidden ${rounded ? "rounded-sm" : ""}`}
        style={spec.src ? undefined : { backgroundImage: TONES[tone], backgroundBlendMode: "multiply" }}
      >
        {spec.src ? (
          <Image
            src={spec.src}
            alt={spec.subject}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={objectPosition ? { objectPosition } : undefined}
            unoptimized={isRemote(spec.src)}
          />
        ) : (
          <>
            <span
              aria-hidden
              className="absolute inset-0"
              style={{ backgroundImage: HATCH, opacity: dark ? 0.16 : 0.09 }}
            />
            <span
              aria-hidden
              className="absolute inset-3 md:inset-5"
              style={{ border: `1px solid ${dark ? "rgba(244,241,233,.28)" : "rgba(169,139,82,.55)"}` }}
            />
            {showCaption && (
              <span
                className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8"
                style={{ color: dark ? "rgba(244,241,233,.82)" : "rgba(26,25,23,.66)" }}
              >
                <span className="t-label block opacity-55">Photograph</span>
                <span
                  className="mt-1.5 block text-[0.9375rem] leading-snug"
                  style={{ fontFamily: "var(--font-display)", maxWidth: "34ch" }}
                >
                  {spec.subject}
                </span>
              </span>
            )}
          </>
        )}
      </div>
      {spec.src && spec.credit && showCaption && (
        <figcaption className="t-label absolute -bottom-7 left-0 opacity-55">
          {spec.credit}
          {spec.licence ? ` · ${spec.licence}` : ""}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Archival plate (treatment T6) — a framed catalogue object on paper,
 * with its real source captioned beneath.
 */
export function ArchivalPlate({
  spec,
  ratio = "3 / 4",
  className = "",
  sizes = "(max-width: 768px) 60vw, 24vw",
}: {
  spec: PlateSpec;
  ratio?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={`m-0 ${className}`}>
      <div
        className="relative bg-[var(--color-paper)] p-3 md:p-4"
        style={{ border: "1px solid color-mix(in srgb, var(--color-brass) 60%, transparent)" }}
      >
        <div className="grain relative overflow-hidden" style={{ aspectRatio: ratio }}>
          {spec.src ? (
            <Image
              src={spec.src}
              alt={spec.subject}
              fill
              sizes={sizes}
              className="object-cover"
              unoptimized={isRemote(spec.src)}
            />
          ) : (
            <div className="absolute inset-0" style={{ backgroundImage: TONES.archive }} />
          )}
        </div>
      </div>
      <figcaption className="t-label mt-3 opacity-60">
        {spec.subject}
        {spec.credit ? ` · ${spec.credit}` : ""}
        {spec.licence ? ` · ${spec.licence}` : ""}
      </figcaption>
    </figure>
  );
}
