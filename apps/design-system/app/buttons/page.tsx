'use client';

import { AppContent, AppHeader, AppPage } from '@/components/app-chrome';
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
    <AppPage>
      <AppHeader>
        <h1>Buttons</h1>
      </AppHeader>
      <AppContent>
        <section className="py-4">
          <div className="flex flex-col gap-2">
            <CTAButtons />
            <ComponentSection title="Standard Buttons">
              <div className="flex flex-col gap-6">
                {(['sm', 'base', 'md'] as const).map((size) => (
                  <div key={size} className="flex flex-wrap items-end gap-2">
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
              <div className="flex flex-wrap items-end gap-2">
                <ButtonToggleExample size="sm">Filters</ButtonToggleExample>
                <ButtonToggleExample>Activate</ButtonToggleExample>
                <ButtonToggleExample size="md">
                  Enable Cookies
                </ButtonToggleExample>
              </div>
            </ComponentSection>

            <ComponentSection title="Standard Button">
              <div className="flex items-end gap-2">
                <Button size="sm">Hello</Button>
                <Button size="base">Tap Me</Button>
                <Button size="md">Open Menu</Button>
              </div>
            </ComponentSection>

            <ComponentSection title="System Buttons">
              <div className="flex items-end gap-2">
                <Button variant="destructive" size="md">
                  Destructive Button
                </Button>
              </div>
            </ComponentSection>

            <ComponentSection title="Standard Button Group">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-6">
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
                <div className="flex items-center gap-6">
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
              <div className="flex items-end gap-2">
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
              <div className="flex items-center gap-6">
                <div className="flex gap-2">
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
                <div className="flex gap-2">
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
                <div className="flex gap-2">
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
              <div className="flex items-center gap-6">
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
              <div className="flex gap-6">
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
      </AppContent>
    </AppPage>
  );
}
