import { useMotionValueEvent, useScroll } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const NAV_VARIANTS = {
  visible: {
    y: '0',
    scale: 1,
  },
  hidden: {
    y: 'calc((100% + 1rem) * -1)',
    scale: 0.8,
  },
};
const DELTA = 5;
const MIN_TO_SHOW = 10;

export function useNavScrollVariantsDesktop() {
  const [navVariant, setNavVariant] = useState(NAV_VARIANTS.visible);
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
      setNavVariant(NAV_VARIANTS.hidden);
    }
  });

  return { navVariant };
}

export const NAV_MOBILE_MENU_VARIANTS = {
  visible: {
    y: '0',
    scale: 1,
  },
  hidden: {
    y: 'calc(100% + 1rem)',
    scale: 0.8,
  },
};

export function useNavScrollVariantsMobileMenu() {
  const [navVariant, setNavVariant] = useState(
    NAV_MOBILE_MENU_VARIANTS.visible,
  );
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (current: number) => {
    const prevY = scrollY.getPrevious() ?? 0;
    const deltaY = current - prevY;

    // show at the top of the page always
    if (
      navVariant !== NAV_MOBILE_MENU_VARIANTS.visible &&
      current <= MIN_TO_SHOW
    ) {
      return setNavVariant(NAV_MOBILE_MENU_VARIANTS.visible);
    }

    if (navVariant !== NAV_MOBILE_MENU_VARIANTS.visible && deltaY < -DELTA) {
      setNavVariant(NAV_MOBILE_MENU_VARIANTS.visible);
    }

    if (navVariant === NAV_MOBILE_MENU_VARIANTS.visible && deltaY > DELTA) {
      setNavVariant(NAV_MOBILE_MENU_VARIANTS.hidden);
    }
  });

  return { navVariant };
}

export function useMenuController() {
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
    closeMenu: () => {
      setOpen(false);
    },
  };
}
