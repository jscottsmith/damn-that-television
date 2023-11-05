import { Card } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';

export default function Components() {
  return (
    <SiteWrapper className="bg-pepto" padY>
      <section className="grid gap-lg md:grid-cols-3 md:gap-xl lg:gap-2xl">
        <Card className="h-48 p-base md:p-lg" />
        <Card className="h-48 p-base md:p-lg" />
        <Card className="h-48 p-base md:p-lg" />
      </section>
    </SiteWrapper>
  );
}
