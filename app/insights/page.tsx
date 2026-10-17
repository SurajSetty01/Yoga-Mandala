import { ComingSoon } from '@/components/ComingSoon';
import { about } from '@/content/pranava';

/**
 * PRAṆAVA INSIGHTS: a holding page until the client supplies this section's content
 * (client, 14 Oct 2026). The full page built earlier is in git at commit 435be5d
 * (app/insights/page.tsx and components/insights/), ready to restore when the content arrives.
 */
export const metadata = {
  title: 'Insights',
  description: about.journey[3]?.body ?? 'Insights at Praṇava',
};

export default function InsightsPage() {
  return <ComingSoon name="Insights" line={about.journey[3]?.body ?? ''} />;
}
