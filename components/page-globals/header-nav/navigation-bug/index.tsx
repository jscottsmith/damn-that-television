import React, { useCallback, useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@/components/buttons/button';
import { EyeMan } from '@/components/buttons/eye-button/eye-man';
import { PRIMARY_SURFACE_CLASS } from '@/components/surface';
import { SurfaceInteractive } from '@/components/surface-interactive';
import { NAVIGATION_LINKS } from '@/constants/app';
import { IconButton } from '@/components/buttons/icon-button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';
import { ROUTE_HOME } from '@/constants/routes.constants';

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
const MIN_TO_SHOW = 10;

function useNavScrollVariants() {
  const [navVariant, setNavVariant] = useState(NAV_VARIANTS.visible);
  const isSmMobile = useMediaQuery('(max-width: 639px)');

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (current: number) => {
    const prevY = scrollY.getPrevious() ?? 0;
    const deltaY = current - prevY;

    // show at the top of the page always
    if (navVariant !== NAV_VARIANTS.visible && current <= MIN_TO_SHOW) {
      return setNavVariant(NAV_VARIANTS.visible);
    }

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

function useMenuController() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
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
    toggleOpen: () => {
      setOpen((prev) => !prev);
    },
  };
}

export default function NavigationBug() {
  const { navVariant } = useNavScrollVariants();
  const menu = useMenuController();

  return (
    <>
      <div
        className={clsx(
          'pointer-events-none',
          'flex items-end justify-center sm:items-start',
          'fixed inset-2',
        )}
      >
        <motion.nav
          variants={NAV_VARIANTS}
          animate={navVariant}
          initial={NAV_VARIANTS.visible}
          transition={{
            type: 'spring',
            bounce: 0.25,
          }}
          className={clsx(
            'pointer-events-auto relative grid',
            'rounded-[2.3rem]',
            'bg-opacity-60 backdrop-blur-lg dark:bg-opacity-60',
            'shadow-lg shadow-slate-950/5',
            PRIMARY_SURFACE_CLASS,
          )}
        >
          <div
            className={clsx(
              menu.open ? 'flex' : 'hidden sm:flex',
              'relative w-full flex-wrap items-center gap-1 self-start p-1 pr-2.5',
            )}
          >
            <HomeLink />
            <MainLinks />
          </div>
          <div className="relative flex justify-center self-end p-1 sm:hidden">
            <IconButton size="md" onClick={menu.toggleOpen}>
              {menu.open ? <XMarkIcon /> : <Bars3Icon />}
            </IconButton>
          </div>
        </motion.nav>
      </div>
    </>
  );
}

function HomeLink() {
  return (
    <SurfaceInteractive>
      <Link
        href={ROUTE_HOME}
        className={clsx(
          'group flex h-16 w-16 items-center justify-center rounded-full p-3.5',
          'text-deep transition-colors duration-150 hover:text-club dark:text-miami',
        )}
      >
        <span className="sr-only">Go Home</span>
        <EyeMan />
      </Link>
    </SurfaceInteractive>
  );
}

function MainLinks() {
  return (
    <div className={clsx('relative flex w-auto flex-wrap items-center gap-1')}>
      {NAVIGATION_LINKS.map((link) => (
        <Link href={link.href} key={link.href}>
          <Button>{link.label}</Button>
        </Link>
      ))}
    </div>
  );
}
