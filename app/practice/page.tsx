import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

/** Route skeleton — navigation first, per the brief's order of work. Content follows. */
export const metadata = { title: 'practice' };

export default function Page() {
  return (
    <>
      <SiteNav light />
      <main className="skel">
        <h1 className="skel__h">practice</h1>
        <p className="skel__p">This page is next.</p>
      </main>
      <SiteFooter />
    </>
  );
}
