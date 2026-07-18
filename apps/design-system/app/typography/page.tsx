'use client';

import { AppContent, AppHeader, AppPage } from '@/components/app-chrome';
import { Code } from '@/components/typography/code';
import { HeroTitle, HeroTitleSize } from '@/components/typography/hero-title';
import { Title, TitleSize } from '@/components/typography/title';
import ProseExample from './prose-example';

const heroTitleSizes = Object.values(HeroTitleSize);
const titleSizes = Object.values(TitleSize);

export default function Components() {
  return (
    <AppPage>
      <AppHeader>
        <h1>Typography</h1>
      </AppHeader>
      <AppContent>
        <div className="gap-8 flex min-h-screen flex-col">
          <section>
            <Code>
              <pre className="my-3">{'Fonts'}</pre>
            </Code>
            <div className="font-futura flex flex-col gap-4 text-4xl">
              <p className="font-light">Futura Light 300</p>
              <p className="font-light italic">Futura Light Oblique 300</p>
              <p className="font-normal">Futura Regular 400</p>
              <p className="font-normal italic">Futura Regular Oblique 400</p>
              <p className="font-medium">Futura Medium 500</p>
              <p className="font-medium italic">Futura Medium Oblique 500</p>
              <p className="font-semibold">Futura Medium 600</p>
              <p className="font-semibold italic">Futura Medium Oblique 600</p>
              <p className="font-bold">Futura Medium 700</p>
              <p className="font-bold italic">Futura Medium Oblique 700</p>
              <p className="font-extrabold">Futura Medium 800</p>
              <p className="font-extrabold italic">Futura Medium Oblique 800</p>
            </div>
          </section>
          <section>
            <Code>
              <pre className="my-3">{'<HeroTitle>'}</pre>
            </Code>
            {heroTitleSizes.map((size) => (
              <div key={size} className="mt-3">
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
              <pre className="my-3">{'<Title>'}</pre>
            </Code>
            {titleSizes.map((size) => (
              <div key={size} className="mt-3">
                <Code>
                  <pre className="text-xs">{size}</pre>
                </Code>
                <Title size={size} asChild>
                  <h1>Typography</h1>
                </Title>
              </div>
            ))}
          </section>

          <ProseExample />
        </div>
      </AppContent>
    </AppPage>
  );
}
