import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@/components/buttons/button';
import { EyeMan } from '@/components/buttons/eye-button/eye-man';
import { SurfacePrimaryGlass } from '@/components/surface';
import { SurfaceInteractive } from '@/components/surface-interactive';
import { NAVIGATION_LINKS } from '@/constants/app';
import { IconButton } from '@/components/buttons/icon-button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ROUTE_HOME } from '@/constants/routes.constants';
import {
  NAV_MOBILE_MENU_VARIANTS,
  NAV_VARIANTS,
  useMenuController,
  useNavScrollVariantsDesktop,
  useNavScrollVariantsMobileMenu,
} from '../hooks';

export function NavigationBugDesktop() {
  const { navVariant } = useNavScrollVariantsDesktop();

  return (
    <>
      <div
        className={clsx(
          'hidden sm:flex', // hide on mobile, use the mobile version instead
          'pointer-events-none',
          'items-start justify-center',
          'fixed inset-2',
        )}
        id="desktop-menu"
      >
        <SurfacePrimaryGlass asChild>
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
              'shadow-lg shadow-slate-950/5',
            )}
          >
            <div
              className={clsx(
                'relative flex w-full flex-wrap items-center gap-1 self-start p-1 pr-2.5',
              )}
            >
              <HomeLink />
              <div
                className={clsx(
                  'relative flex w-auto flex-wrap items-center gap-1',
                )}
              >
                {NAVIGATION_LINKS.map((link) => (
                  <Link href={link.href} key={link.href}>
                    <Button>{link.label}</Button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.nav>
        </SurfacePrimaryGlass>
      </div>
    </>
  );
}

const NAV_VARIANTS_MOBILE = {
  visible: {
    y: '0',
    scale: 1,
  },
  hidden: {
    y: 'calc(100% + 1rem)',
    scale: 0.8,
  },
};

export function NavigationBugMobile() {
  const menu = useMenuController();
  const { navVariant } = useNavScrollVariantsMobileMenu();

  return (
    <>
      <div
        onClick={() => menu.closeMenu()}
        className={clsx(
          'pointer-events-none sm:hidden', // hide on desktop, use the desktop version instead
          'flex items-end justify-center',
          'fixed inset-2',
        )}
        id="mobile-menu"
      >
        <AnimatePresence>
          {menu.open && (
            <SurfacePrimaryGlass asChild>
              <motion.nav
                key="mobile-menu"
                variants={NAV_VARIANTS_MOBILE}
                exit={NAV_VARIANTS_MOBILE.hidden}
                initial={NAV_VARIANTS_MOBILE.hidden}
                animate={NAV_VARIANTS_MOBILE.visible}
                transition={{
                  type: 'spring',
                  bounce: 0.4,
                }}
                className={clsx(
                  'pointer-events-auto relative grid w-full',
                  'rounded-[2.3rem]',
                  'shadow-lg shadow-slate-950/5',
                )}
              >
                <div
                  className={clsx(
                    'relative flex w-full flex-col gap-4 self-start p-base pb-16',
                  )}
                >
                  <HomeLink className="grow-0 self-center" />
                  <div
                    className={clsx(
                      'relative flex w-auto flex-col items-center gap-2',
                    )}
                  >
                    {NAVIGATION_LINKS.map((link) => (
                      <Link
                        className="w-full max-w-xs self-center"
                        href={link.href}
                        key={link.href}
                      >
                        <Button
                          size="md"
                          className="w-full justify-center justify-items-center text-center"
                        >
                          {link.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.nav>
            </SurfacePrimaryGlass>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        className="fixed bottom-0 flex justify-center self-end p-1 sm:hidden"
        variants={NAV_MOBILE_MENU_VARIANTS}
        animate={menu.open ? NAV_MOBILE_MENU_VARIANTS.visible : navVariant}
        initial={NAV_MOBILE_MENU_VARIANTS.visible}
      >
        <IconButton size="md" onClick={menu.toggleOpen}>
          {menu.open ? <XMarkIcon /> : <Bars3Icon />}
        </IconButton>
      </motion.div>
    </>
  );
}

function HomeLink(props: { className?: string }) {
  return (
    <SurfaceInteractive asChild>
      <Link
        href={ROUTE_HOME}
        className={clsx(
          'group flex h-16 w-16 items-center justify-center rounded-full p-3.5',
          'text-deep transition-colors duration-150 hover:text-club dark:text-miami',
          props.className,
        )}
      >
        <span className="sr-only">Go Home</span>
        <div className="w-full">
          <EyeMan />
        </div>
      </Link>
    </SurfaceInteractive>
  );
}
