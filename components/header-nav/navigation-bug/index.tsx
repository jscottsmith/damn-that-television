import React, { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@/components/buttons/button';
import { EyeMan } from '@/components/buttons/eye-button/eye-man';
import { PRIMARY_SURFACE_CLASS } from '@/components/surface';
import { SurfaceInteractive } from '@/components/surface-interactive';
import { NAVIGATION_LINKS } from '@/constants/app';
import { ThemeToggle } from './components/theme-toggle';

const NAV_VARIANTS = {
  visible: {
    y: 0,
    scale: 1,
  },
  hidden: {
    y: -200,
    scale: 0.8,
  },
};

function useNavScrollVariants() {
  const [navVariant, setNavVariant] = useState(NAV_VARIANTS.visible);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (current: number) => {
    const prevY = scrollY.getPrevious() ?? 0;
    const deltaY = current - prevY;

    if (navVariant === NAV_VARIANTS.hidden && deltaY < -10) {
      setNavVariant(NAV_VARIANTS.visible);
    }
    if (navVariant === NAV_VARIANTS.visible && deltaY > 10) {
      setNavVariant(NAV_VARIANTS.hidden);
    }
  });

  return { navVariant };
}

export default function NavigationBug() {
  const { navVariant } = useNavScrollVariants();

  return (
    <div className="perspective-normal fixed z-50">
      <motion.nav
        variants={NAV_VARIANTS}
        animate={navVariant}
        initial={NAV_VARIANTS.visible}
        transition={{
          type: 'spring',
          bounce: 0.25,
        }}
        className={clsx(
          'flex items-center gap-4 rounded-full p-1 pr-6',
          'bg-opacity-70 backdrop-blur-lg dark:bg-opacity-70',
          PRIMARY_SURFACE_CLASS,
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
        {NAVIGATION_LINKS.map((link) => (
          <Link href={link.href} key={link.href}>
            <Button>{link.label}</Button>
          </Link>
        ))}
        <ThemeToggle />
      </motion.nav>
    </div>
  );
}
