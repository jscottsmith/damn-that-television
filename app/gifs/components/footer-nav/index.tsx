import {
  HeartIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { IconBadge } from '../icon-badge';
import clsx from 'clsx';
import { SurfacePrimaryGlass } from '@/components/surface';
import { IconButton } from '../icon-button';
import { CommandOverlay } from '@/components/command-overlay';
import { useTimeout } from 'usehooks-ts';
import { useState } from 'react';

function useCopied() {
  const [copied, setCopied] = useState(false);
  useTimeout(
    () => {
      setCopied(false);
    },
    copied ? 1000 : null,
  );
  return { copied, setCopied };
}

export function FooterNav(props: {
  isLiked: boolean;
  isTrashed: boolean;
  url: string;
}) {
  const controller = useCopied();
  return (
    <>
      <footer
        className={clsx(
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

            <IconButton
              onClick={async () => {
                const type = 'text/plain';
                const clipboardItemData = {
                  [type]: props.url,
                };
                const clipboardItem = new ClipboardItem(clipboardItemData);
                await navigator.clipboard.write([clipboardItem]);
                controller.setCopied(true);
              }}
            >
              <Square2StackIcon className="w-6" />
            </IconButton>

            <IconBadge isActive={props.isLiked} activeBgColor="bg-club-500">
              <HeartIcon className="w-6" />
            </IconBadge>
          </div>
        </SurfacePrimaryGlass>
      </footer>
      <CommandOverlay>{controller.copied && 'GIF URL Copied'}</CommandOverlay>
    </>
  );
}
