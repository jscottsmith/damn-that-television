'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { SideNavMenuRoutes } from './types';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import { useMediaQuery } from 'usehooks-ts';
import { MenuButton } from '../buttons/menu-button';

type SideNavMenuProps = PropsWithChildren<{
  routes: SideNavMenuRoutes;
  className?: string;
}>;

function mapObject<T extends { [key: string]: any }>(
  record: T,
  mapFn: (entry: [string, any]) => any,
) {
  return Object.entries(record).map(mapFn);
}

function renderLinksRecursively(routes) {
  return (
    <ul className="gap-sm flex flex-col">
      {mapObject<SideNavMenuRoutes>(routes, ([path, route]) => {
        return (
          <li key={path} className="gap-sm flex flex-col">
            <Link
              href={route.absolutePath}
              className={clsx(
                'transition-colors',
                'px-base py-sm block rounded-sm font-bold',
                'hover:text-club hover:bg-slate-50',
                'dark:hover:text-club-300 dark:hover:bg-slate-950',
                'focus:outline-none',
              )}
            >
              {route.title}
            </Link>

            {route.children && (
              <div className="border-l border-slate-200 pl-2">
                {renderLinksRecursively(route.children)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const menuVariants = {
  open: { x: 0 },
  closed: { x: '-100%' },
};

const menuButtonVariants = {
  closed: { x: 0 },
  open: { x: '12rem' },
};

function useSideMenu() {
  const [open, setOpen] = useState(true);
  const isfloating = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (isfloating) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isfloating]);

  function toggle() {
    setOpen(!open);
  }

  return {
    open,
    setOpen,
    toggle,
  };
}

const SIDE_NAV_ID = 'side-nav-menu';

export function SideNavMenu(props: SideNavMenuProps) {
  const sideMenu = useSideMenu();
  return (
    <div className={clsx('flex w-full', sideMenu.open && 'md:pl-sidemenu')}>
      <motion.div
        key="menu-button"
        initial={'open'}
        variants={menuButtonVariants}
        animate={sideMenu.open ? 'open' : 'closed'}
        className="left-lg top-lg fixed z-[60]"
      >
        <MenuButton
          onClick={() => sideMenu.toggle()}
          open={sideMenu.open}
          aria-controls={SIDE_NAV_ID}
        />
      </motion.div>
      <motion.div
        key="menu"
        initial={'open'}
        animate={sideMenu.open ? 'open' : 'closed'}
        variants={menuVariants}
        aria-hidden={!sideMenu.open}
        id={SIDE_NAV_ID}
        className={cn(
          surfaceVariants({ variant: 'primary' }),
          clsx(
            'z-50',
            'w-sidemenu h-screen flex-shrink',
            'p-base pt-3xl',
            'fixed left-0 top-0',
            'shadow-lg',
            'md:shadow-none',
            'border-r border-slate-200 dark:border-slate-900',
            // after element to add extra space for the menu animation
            'after:absolute after:bottom-0 after:right-full after:top-0 after:w-24 after:bg-white dark:after:bg-slate-800',
          ),
        )}
      >
        <nav>{renderLinksRecursively(props.routes)}</nav>
      </motion.div>
      <motion.div
        key="content"
        layout
        className="w-full overflow-hidden"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {props.children}
      </motion.div>
    </div>
  );
}
