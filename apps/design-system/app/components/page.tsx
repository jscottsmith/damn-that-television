'use client';
import { CardPrimary, CardSecondary } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';
import { InputToggle } from '@/components/input-toggle';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import { useTheme } from 'next-themes';
import { Title } from '@/components/typography/title';
import { HeroTitle } from '@/components/typography/hero-title';
import { SideDrawer } from '@/components/side-drawer';
import { Button } from '@workspace/ui/components/button';
import { useState } from 'react';

export default function Components() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeroTitle asChild>
        <h1 className="pb-6">Components</h1>
      </HeroTitle>
      <section className="py-4">
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada
            at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non
            fermentum, sed est, duis. Volutpat elementum, sed risus, sagittis,
            ut egestas enim. Nunc commodo, pretium massa sit dignissim. Orci,
            mauris sit in ut. Tristique viverra mauris in sit.
          </p>
        }
        actions={
          <>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Deactivate
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </>
        }
      />

      <section className="gap-6 md:gap-8 lg:gap-12 grid md:grid-cols-3">
        <CardSecondary className="p-3 md:p-6 h-96" />
        <CardSecondary className="p-3 md:p-6 h-96" />
        <CardSecondary className="p-3 md:p-6 h-96" />
      </section>

      <section className="grid grid-cols-1">
        <CardPrimary
          className={cn(
            surfaceVariants({ variant: 'pattern' }),
            'p-3 md:p-6 h-96',
          )}
          style={{ backgroundSize: '5rem 5rem' }}
        />
      </section>
    </>
  );
}
