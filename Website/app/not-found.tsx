import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

/**
 * 404 — a detour, not an error page. Composed typographically over a duotone ground panel;
 * offers three real routes back into the site.
 */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-forest-deep text-sand">
      <div
        aria-hidden
        className="duotone pointer-events-none absolute inset-0 opacity-40 bg-gradient-to-br from-forest via-forest-deep to-moss/30"
      />
      <div className="relative mx-auto flex min-h-[70vh] max-w-content flex-col justify-center px-6 py-section">
        <p className="section-label text-sand/60">— A quiet detour</p>
        <h1 className="mt-6 font-display text-display-xl">
          This page isn&rsquo;t here.
        </h1>
        <p className="measure mt-6 text-lead text-sand/80">
          The path you followed doesn&rsquo;t lead anywhere on the site — perhaps it moved, or
          perhaps it never existed. Here are three ways back in.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/" variant="ghost-light">
            Home
          </ButtonLink>
          <ButtonLink href="/learn/library" variant="ghost-light">
            The Library
          </ButtonLink>
          <ButtonLink href="/connect/directory" variant="ghost-light">
            Teacher Directory
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
