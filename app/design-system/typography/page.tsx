'use client';
import { SiteWrapper } from '@/components/site-wrapper';
import { SurfacePrimary } from '@/components/surface';
import { Code } from '@/components/typography/code';
import { HeroTitle, HeroTitleSize } from '@/components/typography/hero-title';

const heroTitleSizes = Object.values(HeroTitleSize);

export default function Components() {
  return (
    <SurfacePrimary asChild className="pt-24">
      <SiteWrapper className="min-h-screen" padB>
        <Code>
          <pre className="my-base">{'<HeroTitle>'}</pre>
        </Code>
        {heroTitleSizes.map((size) => (
          <div key={size} className="mt-base">
            <Code>
              <pre className="text-xs">{size}</pre>
            </Code>
            <HeroTitle size={size} asChild>
              <h1>Typography</h1>
            </HeroTitle>
          </div>
        ))}
      </SiteWrapper>
    </SurfacePrimary>
  );
}
