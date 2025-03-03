import React from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { ButtonGroup } from '@/components/buttons/button-group';
import { IconButton } from '@/components/buttons/icon-button';
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const theme = useTheme();

  return (
    <ButtonGroup>
      <IconButton
        size="sm"
        // className={clsx(theme.resolvedTheme === 'light' && 'bg-cream')}
        onClick={() => theme.setTheme('light')}
      >
        <SunIcon />
      </IconButton>
      <IconButton
        size="sm"
        // className={clsx(theme.resolvedTheme === 'system' && 'dark:bg-club-700')}
        onClick={() => theme.setTheme('system')}
      >
        <ComputerDesktopIcon />
      </IconButton>
      <IconButton
        size="sm"
        // className={clsx(theme.resolvedTheme === 'dark' && 'dark:bg-club-700')}
        onClick={() => theme.setTheme('dark')}
      >
        <MoonIcon />
      </IconButton>
    </ButtonGroup>
  );
}
