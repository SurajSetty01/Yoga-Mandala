import { ComingSoon } from '@/components/ComingSoon';
import { about } from '@/content/pranava';

/**
 * PRAṆAVA HEAL: a holding page until the client supplies this section's content
 * (client, 14 Oct 2026). The full page built earlier is in git at commit 435be5d
 * (app/heal/page.tsx and components/heal/), ready to restore when the content arrives.
 */
export const metadata = {
  title: 'Heal',
  description: about.journey[2]?.body ?? 'Heal at Praṇava',
};

export default function HealPage() {
  return <ComingSoon name="Heal" line={about.journey[2]?.body ?? ''} />;
}
