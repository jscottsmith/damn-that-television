'use client';
import { CardPrimary, CardSecondary } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';
import { InputToggle } from '@/components/input-toggle';
import {
  SurfaceBackground,
  SurfacePattern,
  SurfaceSecondary,
} from '@/components/surface';
import { useTheme } from 'next-themes';
import { Title } from '@/components/typography/title';
import { HeroTitle } from '@/components/typography/hero-title';
import { SideDrawer } from '@/components/side-drawer';
import { Button, ButtonName } from '@/components/buttons/button';
import { useState } from 'react';

export default function Components() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <SurfaceSecondary asChild className="pt-24">
        <SiteWrapper className="min-h-screen" padB>
          <HeroTitle asChild>
            <h1 className="pb-lg">Components</h1>
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
          <Button onClick={() => setOpen(true)}>Open</Button>
          <SideDrawer
            onClose={() => setOpen(false)}
            isOpen={open}
            title="Deactivate Account"
            description="Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."
            body={
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Malesuada at ultricies tincidunt elit et, enim. Habitant nunc,
                adipiscing non fermentum, sed est, duis. Volutpat elementum, sed
                risus, sagittis, ut egestas enim. Nunc commodo, pretium massa
                sit dignissim. Orci, mauris sit in ut. Tristique viverra mauris
                in sit.
              </p>
            }
            actions={
              <>
                <Button
                  name={ButtonName.primary}
                  onClick={() => setOpen(false)}
                >
                  Deactivate
                </Button>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
              </>
            }
          />
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
          <SurfacePattern asChild>
            <CardPrimary className="h-96 p-base md:p-lg" />
          </SurfacePattern>
        </section>
      </SiteWrapper>
    </>
  );
}
