'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { ButtonGroup } from '@workspace/ui/components/button-group';
import { Button } from '@workspace/ui/components/button';
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
      <Button
        presentation="icon"
        size="sm"
        variant={mounted && theme.theme === 'light' ? 'primary' : 'secondary'}
        onClick={() => theme.setTheme('light')}
      >
        <SunIcon />
      </Button>
      <Button
        presentation="icon"
        size="sm"
        variant={mounted && theme.theme === 'system' ? 'primary' : 'secondary'}
        onClick={() => theme.setTheme('system')}
      >
        <ComputerDesktopIcon />
      </Button>
      <Button
        presentation="icon"
        size="sm"
        variant={mounted && theme.theme === 'dark' ? 'primary' : 'secondary'}
        onClick={() => theme.setTheme('dark')}
      >
        <MoonIcon />
      </Button>
    </ButtonGroup>
  );
}
