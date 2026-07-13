import { Button } from '@workspace/ui/components/button';
import {
  GITHUB_REPO_URL,
  ISC_LICENSE_LINK,
  METADATA,
  NAVIGATION_LINKS,
  SECONDARY_LINKS,
} from '@/constants/app';
import Link from 'next/link';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import { Wrapper } from '../wrapper';
import { EyeMan } from '@workspace/ui/components/eye-button';
import { APP_ROUTES } from '@/constants/routes.constants';
import { ThemeOptions } from './ThemeOptions';
import { Title } from '@/components/typography/title';
import { Prose } from '@/components/typography/prose';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Marquee } from '@/components/marquee';
import { FOUND_A_JOB_LYRICS } from '@/constants/found-a-job-lyrics';
import { FooterBody } from './footer-body';

export function Footer() {
  return (
    <>
      <Marquee
        duration={30}
        id="found-a-job-lyrics-marquee"
        className="absolute left-0"
      >
        {FOUND_A_JOB_LYRICS.map((text, i) => (
          <span key={i} className="inline-flex pr-8">
            {text}
          </span>
        ))}
      </Marquee>
      <FooterBody>
        <div className="relative z-1 px-3">
          <Wrapper asChild>
            <footer
              className={cn(
                surfaceVariants({ variant: 'primary' }),
                'flex flex-wrap gap-2 rounded-b-3xl pt-4 pb-4 md:gap-6 md:pb-10',
              )}
            >
                <Link
                  href={APP_ROUTES.home}
                  className="hover:text-pepto-500 dark:text-miami dark:hover:text-club group/eye-man mx-auto block w-14 justify-self-center text-slate-800 md:w-24"
                >
                  <span className="sr-only">Go Home</span>
                  <EyeMan />
                </Link>

                <nav className="my-8 flex w-full flex-wrap justify-center gap-8 self-start justify-self-stretch sm:justify-between">
                  <div>
                    <Eyebrow className="pb-2 text-center">Navigation</Eyebrow>
                    <div
                      className={cn(
                        surfaceVariants({ variant: 'secondary' }),
                        'flex flex-col gap-2 rounded-xl p-4',
                      )}
                    >
                      <MainLinks />
                      <SecondaryLinks />
                    </div>
                  </div>
                  <ThemeOptions />
                </nav>

                <section className="flex w-full flex-wrap items-end justify-center sm:justify-between">
                  <Prose className="prose-sm max-w-none gap-2 self-end justify-self-stretch pt-8">
                    <Title asChild>
                      <h4 className="my-0 text-center whitespace-nowrap sm:text-left">
                        {METADATA.title}
                      </h4>
                    </Title>
                    <p className="w-full text-center">{METADATA.description}</p>
                  </Prose>
                  <Prose className="prose-sm flex gap-4">
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
          </Wrapper>
        </div>
      </FooterBody>
    </>
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
    <ul className="flex w-full flex-wrap items-center gap-1 sm:justify-between">
      {SECONDARY_LINKS.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>
            <Button variant="secondary" size="sm">
              {link.label}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
