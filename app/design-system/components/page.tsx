import { Card, CardMiami } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';

export default function Components() {
  return (
    <>
      <SiteWrapper className="min-h-screen bg-fab-600" padY>
        <section className="grid gap-lg md:grid-cols-3 md:gap-xl lg:gap-2xl">
          <Card className="h-96 p-base md:p-lg" />
          <Card className="h-96 p-base md:p-lg" />
          <Card className="h-96 p-base md:p-lg" />
        </section>
      </SiteWrapper>
      <SiteWrapper className="min-h-screen bg-ghost" padY>
        <section className="grid grid-cols-1">
          <CardMiami className="h-48 p-base md:p-lg" />
        </section>
      </SiteWrapper>
    </>
  );
}
