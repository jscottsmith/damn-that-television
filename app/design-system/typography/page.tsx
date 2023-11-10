'use client';
import { SiteWrapper } from '@/components/site-wrapper';
import { SurfacePrimary } from '@/components/surface';
import { Code } from '@/components/typography/code';
import { HeroTitle, HeroTitleSize } from '@/components/typography/hero-title';
import { Title, TitleSize } from '@/components/typography/title';

const heroTitleSizes = Object.values(HeroTitleSize);
const titleSizes = Object.values(TitleSize);

export default function Components() {
  return (
    <SurfacePrimary asChild className="pt-24">
      <SiteWrapper className="min-h-screen flex flex-col gap-xl" padB>
        <section>
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
        </section>
        <section>
          <Code>
            <pre className="my-base">{'<Title>'}</pre>
          </Code>
          {titleSizes.map((size) => (
            <div key={size} className="mt-base">
              <Code>
                <pre className="text-xs">{size}</pre>
              </Code>
              <Title size={size} asChild>
                <h1>Typography</h1>
              </Title>
            </div>
          ))}
        </section>
      </SiteWrapper>
    </SurfacePrimary>
  );
}
