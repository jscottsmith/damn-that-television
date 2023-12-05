'use client';
import { SiteWrapper } from '@/components/site-wrapper';
import { SurfaceSecondary } from '@/components/surface';
import { HeroTitle } from '@/components/typography/hero-title';
import { SelectionButtonExample } from './components/selection-button-example';
import { Button, ButtonName, ButtonSize } from '@/components/buttons/button';
import {
  EyeIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { ComponentSection } from '../component-section';

import CTAButtons from './components/cta-buttons';
import { IconButton } from '@/components/buttons/icon-button';
import { IconContainerSize } from '@/components/icon-container';
import { ButtonGroup } from '@/components/buttons/button-group';

export default function Buttons() {
  return (
    <>
      <SurfaceSecondary asChild className="pt-24">
        <SiteWrapper className="min-h-screen" padB>
          <HeroTitle asChild>
            <h1 className="pb-lg">Buttons</h1>
          </HeroTitle>

          <section className="py-md">
            <div className="flex flex-col gap-sm">
              <CTAButtons />
              <ComponentSection title="Standard Buttons - Primary/Secondary">
                <div className="flex flex-col gap-lg">
                  <div className="flex gap-sm items-end">
                    <Button size={ButtonSize.sm} name={ButtonName.primary}>
                      Primary
                    </Button>
                    <Button size={ButtonSize.sm}>Secondary</Button>
                    <Button size={ButtonSize.sm}>Follow</Button>
                    <Button size={ButtonSize.sm}>Like</Button>
                  </div>
                  <div className="flex gap-sm items-end">
                    <Button name={ButtonName.primary}>Primary</Button>
                    <Button>Secondary</Button>
                    <Button>Follow</Button>
                    <Button>Like</Button>
                  </div>
                  <div className="flex gap-sm items-end">
                    <Button size={ButtonSize.md} name={ButtonName.primary}>
                      Primary
                    </Button>
                    <Button size={ButtonSize.md}>Secondary</Button>
                    <Button size={ButtonSize.md}>Follow</Button>
                    <Button size={ButtonSize.md}>Like</Button>
                  </div>
                </div>
              </ComponentSection>

              <ComponentSection title="Selection Button">
                <div className="flex gap-sm items-end">
                  <SelectionButtonExample size={ButtonSize.sm}>
                    Filters
                  </SelectionButtonExample>
                  <SelectionButtonExample name={ButtonName.primary}>
                    Activate
                  </SelectionButtonExample>
                  <SelectionButtonExample
                    size={ButtonSize.md}
                    name={ButtonName.danger}
                  >
                    Enable Cookies
                  </SelectionButtonExample>
                </div>
              </ComponentSection>

              <ComponentSection title="Standard Button">
                <div className="flex gap-sm items-end">
                  <Button size={ButtonSize.sm}>Hello</Button>
                  <Button size={ButtonSize.base}>Tap Me</Button>
                  <Button size={ButtonSize.md}>Open Menu</Button>
                </div>
              </ComponentSection>

              <ComponentSection title="System Buttons">
                <div className="flex gap-sm items-end">
                  <Button name={ButtonName.warning} size={ButtonSize.md}>
                    Warning Button
                  </Button>
                  <Button name={ButtonName.danger} size={ButtonSize.md}>
                    Danger Button
                  </Button>
                  <Button name={ButtonName.info} size={ButtonSize.md}>
                    Info Button
                  </Button>
                  <Button name={ButtonName.success} size={ButtonSize.md}>
                    Info Button
                  </Button>
                </div>
              </ComponentSection>

              <ComponentSection title="Standard Button Group">
                <div className="flex flex-col gap-lg">
                  <div className="flex gap-lg items-center">
                    <ButtonGroup>
                      <Button>Hello</Button>
                      <Button>Tap Me</Button>
                      <Button>Open Menu</Button>
                    </ButtonGroup>

                    <ButtonGroup>
                      <Button>Tap Me</Button>
                      <Button>Open Menu</Button>
                    </ButtonGroup>
                  </div>
                  <div className="flex gap-lg items-center">
                    <ButtonGroup>
                      <Button name={ButtonName.primary}>Hello</Button>
                      <Button name={ButtonName.primary}>Tap Me</Button>
                      <Button name={ButtonName.primary}>Open Menu</Button>
                    </ButtonGroup>

                    <ButtonGroup>
                      <Button name={ButtonName.primary}>Tap Me</Button>
                      <Button name={ButtonName.primary}>Open Menu</Button>
                    </ButtonGroup>
                  </div>
                </div>
              </ComponentSection>

              <ComponentSection title="Button with Icon">
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
              </ComponentSection>

              <ComponentSection title="Icon Button">
                <div className="flex gap-lg items-center">
                  <div className="flex gap-sm">
                    <IconButton size={IconContainerSize.sm}>
                      <EyeIcon />
                    </IconButton>
                    <IconButton size={IconContainerSize.sm}>
                      <MagnifyingGlassIcon />
                    </IconButton>
                    <IconButton size={IconContainerSize.sm}>
                      <TrashIcon />
                    </IconButton>
                  </div>
                  <div className="flex gap-sm">
                    <IconButton>
                      <EyeIcon />
                    </IconButton>
                    <IconButton>
                      <MagnifyingGlassIcon />
                    </IconButton>
                    <IconButton>
                      <TrashIcon />
                    </IconButton>
                  </div>
                  <div className="flex gap-sm">
                    <IconButton size={IconContainerSize.md}>
                      <EyeIcon />
                    </IconButton>
                    <IconButton size={IconContainerSize.md}>
                      <MagnifyingGlassIcon />
                    </IconButton>
                    <IconButton size={IconContainerSize.md}>
                      <TrashIcon />
                    </IconButton>
                  </div>
                </div>
              </ComponentSection>

              <ComponentSection title="Icon Button Group">
                <div className="flex gap-lg items-center">
                  <ButtonGroup>
                    <IconButton>
                      <EyeIcon />
                    </IconButton>
                    <IconButton>
                      <MagnifyingGlassIcon />
                    </IconButton>
                    <IconButton>
                      <TrashIcon />
                    </IconButton>
                  </ButtonGroup>

                  <ButtonGroup>
                    <IconButton>
                      <EyeIcon />
                    </IconButton>
                    <IconButton>
                      <TrashIcon />
                    </IconButton>
                  </ButtonGroup>
                </div>
              </ComponentSection>
            </div>
          </section>
        </SiteWrapper>
      </SurfaceSecondary>
    </>
  );
}
