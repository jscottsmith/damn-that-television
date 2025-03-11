'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ROUTE_DAMN_GAME } from '@/constants/routes.constants';
import NavigationBug from './navigation-bug';

export const HeaderNav = () => {
  const pathname = usePathname();
  // do not display the menu on the game route
  if (pathname === ROUTE_DAMN_GAME) {
    return null;
  }
  return (
    <header className="fixed left-1/2 top-4 z-50 flex justify-center">
      <NavigationBug />
    </header>
  );
};
