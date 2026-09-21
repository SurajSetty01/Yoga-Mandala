import { SiteNav } from '@/components/SiteNav';
import { Invitation } from '@/components/join/Invitation';
import { Community } from '@/components/join/Community';
import { Doors } from '@/components/join/Doors';
import { JoinMotion } from '@/components/join/JoinMotion';
import { join } from '@/content/copy';
import { SiteFooter } from '@/components/SiteFooter';

/**
 * PAGE 3 — Join / Connect. The client's own page name, from their footer line.
 *
 * The page is an invitation and three doors of unequal size. It opens with a question
 * addressed to one reader and answers it; then the community — the only door that is
 * actually open — takes the whole width on a reversed ground; then the two contribution
 * routes sit quietly on paper beside each other.
 *
 * There is no hero here, so the navigation pill is pinned to its paper treatment from the
 * first pixel rather than waiting for a choreography that never runs.
 */
export const metadata = {
  title: 'Join / Connect',
  description: `${join.main[0]} ${join.main[1]}`,
};

export default function JoinPage() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <Invitation />
        <Community />
        <Doors />
      </main>
      <SiteFooter ym />
      <JoinMotion />
    </>
  );
}
