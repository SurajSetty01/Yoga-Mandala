import { ComingSoon } from '@/components/ComingSoon';
import { about } from '@/content/pranava';

/**
 * PRAṆAVA LEARN: a holding page until the client supplies this section's content
 * (client, 14 Oct 2026). The full page built earlier is in git at commit 435be5d
 * (app/learn/page.tsx and components/learn/), ready to restore when the content arrives.
 */
export const metadata = {
  title: 'Learn',
  description: about.journey[0]?.body ?? 'Learn at Praṇava',
};

export default function LearnPage() {
  return <ComingSoon name="Learn" line={about.journey[0]?.body ?? ''} />;
}
