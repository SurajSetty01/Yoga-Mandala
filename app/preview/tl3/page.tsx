import { SiteNav } from '@/components/SiteNav';
import { LearnTeacherEducation } from '@/components/learn/tl3/TeacherEducation';

/**
 * Verification route for the final /learn/ §02, What teacher education is. The section sits
 * between two plain blocks painted the grounds of its real neighbours on /learn/: tl2 above
 * (--ground-warm #F2E9DE) and tl4 below (--ground, cream).
 */
export const metadata = {
  title: 'Preview tl3 — What teacher education is',
  robots: { index: false, follow: false },
};

export default function PreviewTl3() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <div style={{ background: 'var(--ground-warm)', height: '60vh' }}>
          <h1 className="sr">Learn</h1>
        </div>
        <LearnTeacherEducation />
        <div style={{ background: 'var(--ground)', height: '80vh' }} />
      </main>
    </>
  );
}
