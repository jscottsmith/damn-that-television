'use client';

import { AppContent, AppHeader, AppPage } from '@/components/app-chrome';
import { HeroTitle } from '@workspace/ui/components/typography/hero-title';
import { Title } from '@workspace/ui/components/typography/title';
import ProseExample from './prose-example';

const heroTitleSizes = ['sm', 'default', 'md', 'lg'] as const;
const titleSizes = ['default', 'md', 'lg', 'xl'] as const;

function CodeSample({ children }: { children: string }) {
  return <pre className="font-mono text-foreground my-3 text-sm">{children}</pre>;
}

export default function Components() {
  return (
    <AppPage>
      <AppHeader>
        <h1>Typography</h1>
      </AppHeader>
      <AppContent>
        <div className="flex min-h-screen flex-col gap-8">
          <section>
            <CodeSample>Fonts</CodeSample>
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
            <CodeSample>{'<HeroTitle>'}</CodeSample>
            {heroTitleSizes.map((size) => (
              <div key={size} className="mt-3">
                <CodeSample>{size}</CodeSample>
                <HeroTitle size={size}>Typography</HeroTitle>
              </div>
            ))}
          </section>
          <section>
            <CodeSample>{'<Title>'}</CodeSample>
            {titleSizes.map((size) => (
              <div key={size} className="mt-3">
                <CodeSample>{size}</CodeSample>
                <Title size={size}>Typography</Title>
              </div>
            ))}
          </section>

          <ProseExample />
        </div>
      </AppContent>
    </AppPage>
  );
}
