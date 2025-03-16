import clsx from 'clsx';
import Link from 'next/link';
import { Dots } from './dots';
import { IconButton } from './icon-button';
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { SurfacePrimaryGlass } from '@/components/surface';

export function HeaderNav(props: {
  title: string;
  current: number;
  length: number;
  externalLink: string;
}) {
  return (
    <SurfacePrimaryGlass asChild>
      <header
        className={clsx(
          'absolute left-0 right-0 top-0 z-50',
          'md:top-12',
          'mx-auto flex items-center justify-between gap-4',
          'md:max-w-lg md:rounded-full md:p-4',
        )}
      >
        <nav>
          <Link href="/">
            <IconButton>
              <ArrowLeftIcon className="w-6" />
            </IconButton>
          </Link>
        </nav>
        <div className="flex grow items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase">{props.title}</h2>
            <p className="text-xs font-medium tabular-nums">
              {props.current + 1}/{props.length + 1}
            </p>
          </div>
          <Dots current={props.current} length={props.length} />
        </div>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.externalLink}
          >
            <IconButton>
              <ArrowTopRightOnSquareIcon className="w-6" />
            </IconButton>
          </a>
        </div>
      </header>
    </SurfacePrimaryGlass>
  );
}
