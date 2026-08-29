import { SectionLabel } from "./SectionLabel";
import { Reveal } from "@/lib/motion/Reveal";

/**
 * PageHeader — the interior-page opener. Deliberately NOT a hero: type-led on sand, with a
 * large display title, an optional standfirst, and a gold rule. Keeps interior pages calm and
 * editorial, distinct from the homepage's full-bleed hero.
 */
export function PageHeader({
  label,
  title,
  standfirst,
  children,
}: {
  label: string;
  title: string;
  standfirst?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mx-auto max-w-content px-6 pt-section-sm">
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
        <h1 className="mt-6 max-w-[18ch] font-display text-display-l">{title}</h1>
        {standfirst && (
          <p className="measure-wide mt-8 text-lead text-bark-soft">{standfirst}</p>
        )}
        {children}
        <hr className="mt-12 border-t rule-gold" />
      </Reveal>
    </header>
  );
}
