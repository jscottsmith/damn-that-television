'use client';

import { HeroTitle } from '@/components/typography/hero-title';
import { ButtonToggleExample } from './components/button-toggle-example';
import { Button } from '@workspace/ui/components/button';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { ComponentSection } from '../component-section';

import CTAButtons from './components/cta-buttons';
import { ButtonGroup } from '@workspace/ui/components/button-group';

export default function Buttons() {
  return (
    <>
      <HeroTitle asChild>
        <h1 className="pb-6">Buttons</h1>
      </HeroTitle>

      <section className="py-4">
        <div className="gap-2 flex flex-col">
          <CTAButtons />
          <ComponentSection title="Standard Buttons">
            <div className="gap-6 flex flex-col">
              {(['sm', 'base', 'md'] as const).map((size) => (
                <div key={size} className="gap-2 flex flex-wrap items-end">
                  <Button size={size} variant="primary">
                    Primary
                  </Button>
                  <Button size={size} variant="secondary">
                    Secondary
                  </Button>
                  <Button size={size} variant="destructive">
                    Destructive
                  </Button>
                </div>
              ))}
            </div>
          </ComponentSection>

          <ComponentSection title="Button Toggle">
            <div className="gap-2 flex flex-wrap items-end">
              <ButtonToggleExample size="sm">Filters</ButtonToggleExample>
              <ButtonToggleExample>Activate</ButtonToggleExample>
              <ButtonToggleExample size="md">
                Enable Cookies
              </ButtonToggleExample>
            </div>
          </ComponentSection>

          <ComponentSection title="Standard Button">
            <div className="gap-2 flex items-end">
              <Button size="sm">Hello</Button>
              <Button size="base">Tap Me</Button>
              <Button size="md">Open Menu</Button>
            </div>
          </ComponentSection>

          <ComponentSection title="System Buttons">
            <div className="gap-2 flex items-end">
              <Button variant="destructive" size="md">
                Destructive Button
              </Button>
            </div>
          </ComponentSection>

          <ComponentSection title="Standard Button Group">
            <div className="gap-6 flex flex-col">
              <div className="gap-6 flex items-center">
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
              <div className="gap-6 flex items-center">
                <ButtonGroup>
                  <Button variant="primary">Hello</Button>
                  <Button variant="primary">Tap Me</Button>
                  <Button variant="primary">Open Menu</Button>
                </ButtonGroup>

                <ButtonGroup>
                  <Button variant="primary">Tap Me</Button>
                  <Button variant="primary">Open Menu</Button>
                </ButtonGroup>
              </div>
            </div>
          </ComponentSection>

          <ComponentSection title="Button with Icon">
            <div className="gap-2 flex items-end">
              <Button>
                Reveal
                <EyeIcon />
              </Button>
              <Button>
                Search
                <MagnifyingGlassIcon />
              </Button>
              <Button>
                Delete
                <TrashIcon />
              </Button>
            </div>
          </ComponentSection>

          <ComponentSection title="Icon Button">
            <div className="gap-6 flex items-center">
              <div className="gap-2 flex">
                <Button presentation="icon" size="sm">
                  <EyeIcon />
                </Button>
                <Button presentation="icon" size="sm">
                  <MagnifyingGlassIcon />
                </Button>
                <Button presentation="icon" size="sm">
                  <TrashIcon />
                </Button>
              </div>
              <div className="gap-2 flex">
                <Button presentation="icon">
                  <EyeIcon />
                </Button>
                <Button presentation="icon">
                  <MagnifyingGlassIcon />
                </Button>
                <Button presentation="icon">
                  <TrashIcon />
                </Button>
              </div>
              <div className="gap-2 flex">
                <Button presentation="icon" size="md">
                  <EyeIcon />
                </Button>
                <Button presentation="icon" size="md">
                  <MagnifyingGlassIcon />
                </Button>
                <Button presentation="icon" size="md">
                  <TrashIcon />
                </Button>
              </div>
            </div>
          </ComponentSection>

          <ComponentSection title="Icon Button Group">
            <div className="gap-6 flex items-center">
              <ButtonGroup>
                <Button presentation="icon">
                  <EyeIcon />
                </Button>
                <Button presentation="icon">
                  <MagnifyingGlassIcon />
                </Button>
                <Button presentation="icon">
                  <TrashIcon />
                </Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button presentation="icon">
                  <ChevronLeftIcon />
                </Button>
                <Button presentation="icon">
                  <ChevronRightIcon />
                </Button>
              </ButtonGroup>
            </div>
          </ComponentSection>

          <ComponentSection title="Icon Button Group Vertical">
            <div className="gap-6 flex">
              <ButtonGroup vertical>
                <Button presentation="icon" variant="primary" size="md">
                  <EyeIcon />
                </Button>
                <Button presentation="icon" variant="secondary" size="md">
                  <MagnifyingGlassIcon />
                </Button>
                <Button presentation="icon" variant="destructive" size="md">
                  <TrashIcon />
                </Button>
              </ButtonGroup>

              <ButtonGroup vertical>
                <Button presentation="icon">
                  <ChevronUpIcon />
                </Button>
                <Button presentation="icon">
                  <ChevronDownIcon />
                </Button>
              </ButtonGroup>
            </div>
          </ComponentSection>
        </div>
      </section>
    </>
  );
}
