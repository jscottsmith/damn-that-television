import React, { useCallback, useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import Link from 'next/link';
import clsx from 'clsx';
import { Button, ButtonName } from '@/components/buttons/button';
import { EyeMan } from '@/components/buttons/eye-button/eye-man';
import { PRIMARY_SURFACE_CLASS } from '@/components/surface';
import { SurfaceInteractive } from '@/components/surface-interactive';
import { NAVIGATION_LINKS, SECONDARY_LINKS } from '@/constants/app';
import { ThemeToggle } from './components/theme-toggle';
import { IconButton, IconButtonProps } from '@/components/buttons/icon-button';
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

/*
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
**/

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
            menu.expanded && 'h-auto w-full',
          )}
        >
          {/* 
          issues with this approach -- how can we make a fluid animated responsive container... 
          <BackdropSurface /> 
          */}
          <div
            className={clsx(
              menu.open ? 'flex' : 'hidden sm:flex',
              'relative w-full flex-wrap items-start gap-1 self-start p-1 pr-2.5 sm:items-center',
            )}
          >
            <HomeLink />
            <MainLinks />
            <MoreButton
              onClick={menu.toggleExpand}
              isActive={menu.expanded}
              className="ml-auto mt-2.5 sm:mt-0"
            />
          </div>
          <ExpandedMenu show={menu.expanded} />
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

function MoreButton({
  isActive,
  ...props
}: IconButtonProps & { isActive: boolean }) {
  return (
    <IconButton {...props}>
      {isActive ? <XMarkIcon /> : <EllipsisVerticalIcon />}
    </IconButton>
  );
}

function HomeLink() {
  return (
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
  );
}

function MainLinks() {
  return (
    <div
      className={clsx(
        'relative order-last flex w-full flex-wrap items-center gap-1 sm:order-none sm:w-auto',
      )}
    >
      {NAVIGATION_LINKS.map((link) => (
        <Link href={link.href} key={link.href}>
          <Button>{link.label}</Button>
        </Link>
      ))}
      <ThemeToggle />
    </div>
  );
}

function ExpandedMenu(props: { show: boolean }) {
  return (
    <AnimatePresence>
      {props.show && (
        <div className="relative flex w-full items-center justify-items-center gap-3 p-4">
          <ul className="flex flex-row gap-1">
            <div>
              <Label asChild>
                <h3>Elsewhere:</h3>
              </Label>
            </div>
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
        </div>
      )}
    </AnimatePresence>
  );
}
