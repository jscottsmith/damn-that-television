'use client';
import React from 'react';
import { EyeButton } from '@/components/buttons/eye-button';
import { NavigationMenu } from '@/components/navigation-menu';
import { useToggle } from 'hooks/use-toggle';
import { NAVIGATION_LINKS, SECONDARY_LINKS } from '@/constants/app';
import { usePathname } from 'next/navigation';
import { ROUTE_DAMN_GAME } from '@/constants/routes.constants';

export const HeaderNav = () => {
  const controller = useToggle(false);
  const pathname = usePathname();
  // do not display the menu on the game route
  if (pathname === ROUTE_DAMN_GAME) {
    return null;
  }
  return (
    <header className="fixed left-4 top-4 z-50">
      <EyeButton
        onClick={controller.toggle}
        isEyeActive={controller.isToggled}
        className="relative z-50"
      />
      <NavigationMenu
        links={NAVIGATION_LINKS}
        secondaryLinks={SECONDARY_LINKS}
        isVisible={controller.isToggled}
        closeNavigation={controller.toggleOff}
      />
    </header>
  );
};
