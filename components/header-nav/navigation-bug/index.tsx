import React, { useCallback, useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@/components/buttons/button';
import { EyeMan } from '@/components/buttons/eye-button/eye-man';
import { PRIMARY_SURFACE_CLASS } from '@/components/surface';
import { SurfaceInteractive } from '@/components/surface-interactive';
import { NAVIGATION_LINKS, SECONDARY_LINKS } from '@/constants/app';
import { ThemeToggle } from './components/theme-toggle';
import { IconButton } from '@/components/buttons/icon-button';
import {
  Bars3Icon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';
import { Label } from '@/components/typography/label';

const NAV_VARIANTS = {
  visible: {
    y: '0',
    scale: 1,
  },
  hidden: {
    y: 'calc((100% + 1rem) * -1)',
    scale: 0.8,
  },
  hiddenMobile: {
    y: 'calc(100% + 1rem)',
    scale: 0.8,
  },
};

const DELTA = 5;

function useNavScrollVariants() {
  const [navVariant, setNavVariant] = useState(NAV_VARIANTS.visible);
  const isSmMobile = useMediaQuery('(max-width: 639px)');

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (current: number) => {
    const prevY = scrollY.getPrevious() ?? 0;
    const deltaY = current - prevY;

    if (navVariant !== NAV_VARIANTS.visible && deltaY < -DELTA) {
      setNavVariant(NAV_VARIANTS.visible);
    }

    if (navVariant === NAV_VARIANTS.visible && deltaY > DELTA) {
      if (isSmMobile) {
        setNavVariant(NAV_VARIANTS.hiddenMobile);
      } else {
        setNavVariant(NAV_VARIANTS.hidden);
      }
    }
  });

  return { navVariant };
}

function BackdropSurface() {
  return (
    <motion.div
      layout
      transition={{
        type: 'spring',
        bounce: 0.25,
        duration: 0.3,
      }}
      className={clsx(
        'absolute inset-0 rounded-[2.3rem]',
        'bg-opacity-60 backdrop-blur-lg dark:bg-opacity-60',
        'shadow-lg shadow-slate-950/5',
        PRIMARY_SURFACE_CLASS,
      )}
    />
  );
}

function useMenuController() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const closeMenu = useCallback(() => {
    if (open) {
      setOpen(false);
    }
  }, [setOpen, open]);

  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return {
    open,
    expanded,
    toggleOpen: () => {
      setOpen((prev) => !prev);
      if (expanded) {
        setExpanded(false);
      }
    },
    toggleExpand: () => setExpanded((prev) => !prev),
  };
}

export default function NavigationBug() {
  const { navVariant } = useNavScrollVariants();
  const menu = useMenuController();

  return (
    <>
      <div
        className={clsx(
          'pointer-events-none flex items-end justify-center sm:items-start',
          'fixed',
          // menu.expanded
          'inset-2',
          // : 'bottom-2 left-2 right-2 sm:bottom-auto sm:top-2',
        )}
      >
        <motion.nav
          variants={NAV_VARIANTS}
          animate={navVariant}
          initial={NAV_VARIANTS.visible}
          // layout="position"
          transition={{
            type: 'spring',
            bounce: 0.25,
          }}
          className={clsx(
            'pointer-events-auto relative flex flex-col items-start justify-start',
            menu.expanded && 'h-full w-full',
          )}
        >
          <BackdropSurface />
          <div
            className={clsx(
              menu.open ? 'flex' : 'hidden sm:flex',
              'relative w-full items-center gap-1 p-1 pr-4',
            )}
          >
            <SurfaceInteractive>
              <Link
                href="/"
                className={clsx(
                  'group flex h-16 w-16 items-center justify-center rounded-full p-3.5',
                  'text-deep transition-colors duration-150 hover:text-club dark:text-miami',
                )}
              >
                <EyeMan />
              </Link>
            </SurfaceInteractive>
            <div
              className={clsx(
                'relative flex flex-wrap items-center gap-1 p-1 pr-4',
              )}
            >
              {NAVIGATION_LINKS.map((link) => (
                <Link href={link.href} key={link.href}>
                  <Button>{link.label}</Button>
                </Link>
              ))}
              <ThemeToggle />
            </div>
            <IconButton onClick={menu.toggleExpand} className="ml-auto">
              {menu.expanded ? <XMarkIcon /> : <EllipsisVerticalIcon />}
            </IconButton>
          </div>

          {/* delete, just testing */}
          {menu.expanded && (
            <div className="relative flex w-full items-center justify-items-center gap-3 p-4">
              {SECONDARY_LINKS.map((link) => (
                <Label asChild key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </Label>
              ))}
            </div>
          )}

          <div className="relative flex justify-center self-center p-1 sm:hidden">
            <IconButton size="md" onClick={menu.toggleOpen}>
              {menu.open ? <XMarkIcon /> : <Bars3Icon />}
            </IconButton>
          </div>
        </motion.nav>
      </div>
    </>
  );
}
