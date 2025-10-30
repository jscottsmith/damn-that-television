'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { ButtonGroup } from '@/components/buttons/button-group';
import { IconButton } from '@/components/buttons/icon-button';
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { useHasMounted } from 'hooks/use-has-mounted';

export function ThemeToggle() {
  const theme = useTheme();
  const mounted = useHasMounted();

  return (
    <ButtonGroup key="bar">
      <IconButton
        size="sm"
        name={mounted && theme.theme === 'light' ? 'primary' : 'secondary'}
        onClick={() => theme.setTheme('light')}
      >
        <SunIcon />
      </IconButton>
      <IconButton
        size="sm"
        name={mounted && theme.theme === 'system' ? 'primary' : 'secondary'}
        onClick={() => theme.setTheme('system')}
      >
        <ComputerDesktopIcon />
      </IconButton>
      <IconButton
        size="sm"
        name={mounted && theme.theme === 'dark' ? 'primary' : 'secondary'}
        onClick={() => theme.setTheme('dark')}
      >
        <MoonIcon />
      </IconButton>
    </ButtonGroup>
  );
}
