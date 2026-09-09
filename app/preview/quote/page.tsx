import { QuoteVariant } from '@/components/preview/quote/QuoteVariant';

/**
 * The three quotation treatments, stacked so they can be captured and compared.
 * Preview scaffolding: deleted with the other /preview/ routes once one is chosen.
 */
export const metadata = { title: 'Quote treatments — comparison' };

export default function QuotePreview() {
  return (
    <main>
      <QuoteVariant fill="word" />
      <QuoteVariant fill="all" />
      <QuoteVariant fill="bookends" />
    </main>
  );
}
