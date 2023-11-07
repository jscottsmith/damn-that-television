'use client';
import { CardPrimary, CardSecondary } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';
import { InputToggle } from '@/components/input-toggle';
import { SurfaceBackground, SurfaceSecondary } from '@/components/surface';
import { useTheme } from 'next-themes';
import { Title } from '@/components/typography/title';
import { HeroTitle } from '@/components/typography/hero-title';
import { HeaderNav } from '@/routes/components/header-nav';
import { SelectionButtonExample } from './components/selection-button-example';
import { Button, ButtonSize } from '@/components/buttons/button';
import {
  EyeIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export default function Components() {
  const theme = useTheme();

  return (
    <>
      <HeaderNav />
      <SurfaceSecondary asChild className="pt-24">
        <SiteWrapper className="min-h-screen" padY>
          <HeroTitle asChild>
            <h1>Components</h1>
          </HeroTitle>
          <section className="py-md">
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
          <section className="py-md">
            <div className="flex flex-col gap-sm">
              <Title asChild>
                <h2>Selection Button</h2>
              </Title>
              <div className="flex gap-sm items-end">
                <SelectionButtonExample size={ButtonSize.sm}>
                  Filters
                </SelectionButtonExample>
                <SelectionButtonExample>Activate</SelectionButtonExample>
                <SelectionButtonExample size={ButtonSize.md}>
                  Enable Cookies
                </SelectionButtonExample>
              </div>
              <Title asChild>
                <h2>Standard Button</h2>
              </Title>
              <div className="flex gap-sm items-end">
                <Button size={ButtonSize.sm}>Hello</Button>
                <Button size={ButtonSize.base}>Tap Me</Button>
                <Button size={ButtonSize.md}>Open Menu</Button>
              </div>
              <Title asChild>
                <h2>Icon Button</h2>
              </Title>
              <div className="flex gap-sm items-end">
                <Button size={ButtonSize.sm} icon={<EyeIcon />}>
                  Reveal
                </Button>
                <Button size={ButtonSize.base} icon={<MagnifyingGlassIcon />}>
                  Search
                </Button>
                <Button size={ButtonSize.md} icon={<TrashIcon />}>
                  Delete
                </Button>
              </div>
            </div>
          </section>
        </SiteWrapper>
      </SurfaceSecondary>
      <SurfaceBackground>
        <SiteWrapper className="min-h-screen" padY>
          <section className="grid gap-lg md:grid-cols-3 md:gap-xl lg:gap-2xl">
            <CardSecondary className="h-96 p-base md:p-lg" />
            <CardSecondary className="h-96 p-base md:p-lg" />
            <CardSecondary className="h-96 p-base md:p-lg" />
          </section>
        </SiteWrapper>
      </SurfaceBackground>
      <SiteWrapper className="min-h-screen bg-ghost" padY>
        <section className="grid grid-cols-1">
          <CardPrimary className="h-96 p-base md:p-lg" />
        </section>
      </SiteWrapper>
    </>
  );
}
