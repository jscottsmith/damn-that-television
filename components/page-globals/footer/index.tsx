import { Button, ButtonName } from '@/components/buttons/button';
import {
  GITHUB_REPO_URL,
  ISC_LICENSE_LINK,
  METADATA,
  NAVIGATION_LINKS,
  SECONDARY_LINKS,
} from '@/constants/app';
import Link from 'next/link';
import {
  SurfacePattern,
  SurfacePrimary,
  SurfaceSecondary,
} from '@/components/surface';
import { Wrapper } from '../wrapper';
import { EyeMan } from '@/components/buttons/eye-button/eye-man';
import { APP_ROUTES } from '@/constants/routes.constants';
import { ThemeOptions } from './ThemeOptions';
import { Title } from '@/components/typography/title';
import { Prose } from '@/components/typography/prose';
import { Eyebrow } from '@/components/typography/eyebrow';

export function Footer() {
  return (
    <SurfacePattern className="px-4 pb-4">
      <Wrapper asChild>
        <SurfacePrimary asChild>
          <footer className="flex flex-wrap gap-2 rounded-b-3xl pb-4 pt-4 md:gap-6 md:pb-10">
            <Link
              href={APP_ROUTES.home}
              className="group mx-auto block w-14 justify-self-center text-slate-800 hover:text-pepto-500 dark:text-miami dark:hover:text-club md:w-24"
            >
              <span className="sr-only">Go Home</span>
              <EyeMan />
            </Link>

            <nav className="flex w-full flex-wrap justify-between gap-2 self-start justify-self-stretch">
              <div>
                <Eyebrow className="pb-2 text-center">Navigation</Eyebrow>
                <SurfaceSecondary className="flex flex-col gap-2 rounded-xl p-4">
                  <MainLinks />
                  <SecondaryLinks />
                </SurfaceSecondary>
              </div>
              <ThemeOptions />
            </nav>

            <section className="flex w-full flex-wrap items-end justify-center md:justify-between">
              <Prose className="prose-sm max-w-none gap-2 self-end justify-self-stretch pt-8">
                <Title asChild>
                  <h4 className="my-0 whitespace-nowrap text-center md:text-left">
                    {METADATA.title}
                  </h4>
                </Title>
                <p className="w-full">{METADATA.description}</p>
              </Prose>
              <Prose className="prose-sm flex gap-2">
                <span>
                  <span>{new Date().getFullYear()}</span>{' '}
                  <a target="_blank" href={ISC_LICENSE_LINK}>
                    ISC
                  </a>
                </span>
                <span>It&apos;s OK</span>
                <span>
                  <a
                    target="_blank"
                    href={GITHUB_REPO_URL}
                    className="align-middle"
                  >
                    Under the hood
                  </a>
                </span>
              </Prose>
            </section>
          </footer>
        </SurfacePrimary>
      </Wrapper>
    </SurfacePattern>
  );
}

function MainLinks() {
  return (
    <ul className="flex w-full flex-wrap items-center gap-1">
      {NAVIGATION_LINKS.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>
            <Button>{link.label}</Button>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SecondaryLinks() {
  return (
    <ul className="flex w-full flex-wrap items-center gap-1">
      {SECONDARY_LINKS.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>
            <Button name={ButtonName.secondary} size="sm">
              {link.label}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
