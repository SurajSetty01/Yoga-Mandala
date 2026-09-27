import { SiteNav } from "@/components/SiteNav";
import { PracticeSadhana } from "@/components/practice/tp2/Sadhana";

/**
 * Verification route for the final /practice/ §01, Ongoing Sādhana. The section sits
 * between two plain blocks painted the grounds of its real neighbours: the hero above
 * (--ground-deep #12201A, which carries the page's one <h1>) and §02 below
 * (--ground-warm #F2E9DE).
 */
export const metadata = {
  title: "Preview tp2 — Ongoing Sādhana",
  robots: { index: false, follow: false },
};

export default function PreviewTp2() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <div style={{ background: "var(--ground-deep)", height: "70vh" }}>
          <h1 className="sr">Practice</h1>
        </div>
        <PracticeSadhana />
        <div style={{ background: "var(--ground-warm)", height: "80vh" }} />
      </main>
    </>
  );
}
