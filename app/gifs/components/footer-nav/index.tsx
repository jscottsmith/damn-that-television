import {
  ArrowsRightLeftIcon,
  HeartIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { IconBadge } from '../icon-badge';

import clsx from 'clsx';
import { SurfacePrimaryGlass } from '@/components/surface';

export function FooterNav(props: { isLiked: boolean; isTrashed: boolean }) {
  return (
    <footer
      className={clsx(
        'pointer-events-none',
        'absolute bottom-0 left-0 right-0 z-50',
        'md:bottom-12',
      )}
    >
      <SurfacePrimaryGlass asChild>
        <div
          className={clsx(
            'mx-auto flex items-center justify-between',
            'md:max-w-lg md:rounded-full md:p-4',
          )}
        >
          <IconBadge isActive={props.isTrashed} activeBgColor="bg-lit-500">
            <TrashIcon className="w-6" />
          </IconBadge>
          <div>
            <ArrowsRightLeftIcon className="w-6 text-gray-400" />
          </div>
          <IconBadge isActive={props.isLiked} activeBgColor="bg-club-500">
            <HeartIcon className="w-6" />
          </IconBadge>
        </div>
      </SurfacePrimaryGlass>
    </footer>
  );
}
