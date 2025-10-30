import React, { useState } from 'react';
import clsx from 'clsx';
import { LinkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useCopyToClipboard, useTimeout } from 'usehooks-ts';
import { CommandOverlay } from './command-overlay';
import { SurfaceInteractiveSimple } from './surface-interactive';

interface AnchorLinkCopyProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const AnchorLinkCopy = (props: AnchorLinkCopyProps) => {
  const [_copiedText, setCopiedText] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  useTimeout(
    () => {
      setIsCopied(false);
    },
    isCopied ? 1500 : null,
  );

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${props.id}`;
    setCopiedText(url);
    setIsCopied(true);
  };

  return (
    <>
      <SurfaceInteractiveSimple asChild>
        <a
          href={`#${props.id}`}
          onClick={handleCopyLink}
          className={clsx(
            'group relative -m-1 block p-1 text-xs',
            props.className,
          )}
          aria-label="Copy link to this section"
        >
          {props.children}
          <div
            className={clsx(
              'absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100',
              isCopied && 'opacity-100',
            )}
          >
            {isCopied ? (
              <CheckCircleIcon className="h-5 w-5 text-miami-500" />
            ) : (
              <LinkIcon className="h-4 w-4" />
            )}
          </div>
        </a>
      </SurfaceInteractiveSimple>
      <CommandOverlay>{isCopied && 'URL Copied'}</CommandOverlay>
    </>
  );
};
