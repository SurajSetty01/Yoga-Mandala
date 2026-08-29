import Link from "next/link";
import { Reveal } from "@/lib/motion/Reveal";

/**
 * S8 · Invitation to share — "A quiet dark room" (T10 duotone ground). Almost empty: one line
 * and four plain links to the submission routes. After the dense sections, restraint reads as
 * confidence. Drawn from §5's "Share something with the Sangha".
 */
const LINKS = [
  { label: "An event", href: "/submit/event" },
  { label: "A learning opportunity", href: "/submit/learning-opportunity" },
  { label: "A resource", href: "/submit/resource" },
  { label: "A community listing", href: "/submit/listing" },
];

export function ShareInvitation() {
  return (
    <section className="relative overflow-hidden bg-forest-deep py-section text-sand" aria-label="Share with the Sangha">
      {/* slow-drifting duotone ground at low contrast */}
      <div
        aria-hidden
        className="duotone pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: "radial-gradient(60% 80% at 70% 40%, #7c8a63 0%, transparent 60%)",
          animation: "driftSlow 24s ease-in-out infinite alternate",
        }}
      />
      <div className="relative mx-auto max-w-content px-6 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-display-l">
            Have something to share with the Sangha?
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-2 text-lead text-sand/85 transition-colors duration-fast hover:text-sand"
                >
                  {l.label}
                  <span aria-hidden className="text-gold transition-transform duration-fast group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <style>{`
        @keyframes driftSlow { from { transform: translate3d(0,0,0); } to { transform: translate3d(-3%, 2%, 0); } }
        @media (prefers-reduced-motion: reduce) { @keyframes driftSlow { from {} to {} } }
      `}</style>
    </section>
  );
}
