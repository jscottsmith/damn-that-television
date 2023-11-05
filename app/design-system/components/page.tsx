'use client';
import { Card, CardMiami } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';
import { InputToggle } from '@/components/input-toggle';
import { Surface, SurfaceBackground } from '@/components/surface';
import { useTheme } from 'next-themes';

export default function Components() {
  const theme = useTheme();
  return (
    <>
      <Surface>
        <SiteWrapper className="min-h-screen" padY>
          <h1 className="font-bold text-xl mb-base dark:text-ghost">Toggle</h1>
          <InputToggle
            label="Dark Mode"
            checked={theme.resolvedTheme === 'dark'}
            onChange={(e) =>
              theme.setTheme(e.currentTarget.checked ? 'dark' : 'light')
            }
          />
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
