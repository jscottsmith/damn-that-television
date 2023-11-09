'use client';
import { CardPrimary, CardSecondary } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';
import { SurfacePrimary } from '@/components/surface';
import { HeroTitle, HeroTitleSize } from '@/components/typography/hero-title';

const heroTitleSizes = Object.values(HeroTitleSize);

export default function Components() {
  return (
    <SurfacePrimary asChild className="pt-24">
      <SiteWrapper className="min-h-screen" padY>
        {heroTitleSizes.map((size) => (
          <HeroTitle size={size} key={size} asChild>
            <h1>Typography</h1>
          </HeroTitle>
        ))}
      </SiteWrapper>
    </SurfacePrimary>
  );
}
