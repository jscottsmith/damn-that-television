'use client';

import { HeroTitle } from '@/components/typography/hero-title';
import { SelectionButtonExample } from './components/selection-button-example';
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
        <h1 className="pb-lg">Buttons</h1>
      </HeroTitle>

      <section className="py-md">
        <div className="gap-sm flex flex-col">
          <CTAButtons />
          <ComponentSection title="Standard Buttons - Primary/Secondary">
            <div className="gap-lg flex flex-col">
              <div className="gap-sm flex items-end">
                <Button size="sm" variant="primary">
                  Primary
                </Button>
                <Button size="sm">Secondary</Button>
                <Button size="sm">Follow</Button>
                <Button size="sm">Like</Button>
              </div>
              <div className="gap-sm flex items-end">
                <Button variant="primary">Primary</Button>
                <Button>Secondary</Button>
                <Button>Follow</Button>
                <Button>Like</Button>
              </div>
              <div className="gap-sm flex items-end">
                <Button size="md" variant="primary">
                  Primary
                </Button>
                <Button size="md">Secondary</Button>
                <Button size="md">Follow</Button>
                <Button size="md">Like</Button>
              </div>
            </div>
          </ComponentSection>

          <ComponentSection title="Selection Button">
            <div className="gap-sm flex items-end">
              <SelectionButtonExample size="sm">Filters</SelectionButtonExample>
              <SelectionButtonExample variant="primary">
                Activate
              </SelectionButtonExample>
              <SelectionButtonExample size="md" variant="danger">
                Enable Cookies
              </SelectionButtonExample>
            </div>
          </ComponentSection>

          <ComponentSection title="Standard Button">
            <div className="gap-sm flex items-end">
              <Button size="sm">Hello</Button>
              <Button size="base">Tap Me</Button>
              <Button size="md">Open Menu</Button>
            </div>
          </ComponentSection>

          <ComponentSection title="System Buttons">
            <div className="gap-sm flex items-end">
              <Button variant="warning" size="md">
                Warning Button
              </Button>
              <Button variant="danger" size="md">
                Danger Button
              </Button>
              <Button variant="info" size="md">
                Info Button
              </Button>
              <Button variant="success" size="md">
                Info Button
              </Button>
            </div>
          </ComponentSection>

          <ComponentSection title="Standard Button Group">
            <div className="gap-lg flex flex-col">
              <div className="gap-lg flex items-center">
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
              <div className="gap-lg flex items-center">
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
            <div className="gap-sm flex items-end">
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
            <div className="gap-lg flex items-center">
              <div className="gap-sm flex">
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
              <div className="gap-sm flex">
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
              <div className="gap-sm flex">
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
            <div className="gap-lg flex items-center">
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
            <div className="gap-lg flex">
              <ButtonGroup vertical>
                <Button presentation="icon" variant="primary" size="md">
                  <EyeIcon />
                </Button>
                <Button presentation="icon" variant="secondary" size="md">
                  <MagnifyingGlassIcon />
                </Button>
                <Button presentation="icon" variant="danger" size="md">
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
