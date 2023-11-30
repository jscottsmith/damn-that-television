'use client';
import React from 'react';
import { EyeButton } from '@/components/buttons/eye-button';
import { NavigationMenu } from '@/components/navigation-menu';
import { useToggle } from 'hooks/use-toggle';
import { NAVIGATION_LINKS, SECONDARY_LINKS } from '@/constants/app';

export const HeaderNav = () => {
  const controller = useToggle(false);

  return (
    <header className="fixed top-4 left-4 z-50">
      <EyeButton
        onClick={controller.toggle}
        isEyeActive={controller.isToggled}
        className="z-50 relative"
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
