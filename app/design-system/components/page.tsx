'use client';
import { Card, CardMiami } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';
import { InputToggle } from '@/components/input-toggle';
import { Surface, SurfaceBackground } from '@/components/surface';
import { useTheme } from 'next-themes';
import { Title } from '@/components/typography/title';
import { HeroTitle } from '@/components/typography/hero-title';
import { SelectionButton } from '@/components/selection-button';
import { useState } from 'react';

export default function Components() {
  const theme = useTheme();
  const [isSelected, setIsSelected] = useState(false);
  return (
    <>
      <Surface>
        <SiteWrapper className="min-h-screen" padY>
          <HeroTitle asChild>
            <h1>Components</h1>
          </HeroTitle>
          <section>
            <Title asChild>
              <h2>Toggle</h2>
            </Title>
            <InputToggle
              label="Dark Mode"
              checked={theme.resolvedTheme === 'dark'}
              onChange={(e) =>
                theme.setTheme(e.currentTarget.checked ? 'dark' : 'light')
              }
            />
          </section>
          <section>
            <Title asChild>
              <h2>Selection Button</h2>
            </Title>
            <SelectionButton
              isSelected={isSelected}
              onClick={() => setIsSelected(!isSelected)}
            >
              Click me to select
            </SelectionButton>
          </section>
        </SiteWrapper>
      </Surface>
      <SurfaceBackground>
        <SiteWrapper className="min-h-screen" padY>
          <section className="grid gap-lg md:grid-cols-3 md:gap-xl lg:gap-2xl">
            <Card className="h-96 p-base md:p-lg" />
            <Card className="h-96 p-base md:p-lg" />
            <Card className="h-96 p-base md:p-lg" />
          </section>
        </SiteWrapper>
      </SurfaceBackground>
      <SiteWrapper className="min-h-screen bg-ghost" padY>
        <section className="grid grid-cols-1">
          <CardMiami className="h-48 p-base md:p-lg" />
        </section>
      </SiteWrapper>
    </>
  );
}
