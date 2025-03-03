import { ButtonGroup } from '@/components/buttons/button-group';
import { IconButton } from '@/components/buttons/icon-button';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import React from 'react';

export function ThemeToggle() {
  const theme = useTheme();
  return (
    <ButtonGroup>
      <IconButton
        // name={theme.resolvedTheme === 'light' ? 'secondary' : 'info'}
        onClick={(e) => theme.setTheme('light')}
      >
        <SunIcon />
      </IconButton>
      <IconButton
        // name={theme.resolvedTheme === 'dark' ? 'secondary' : 'info'}
        onClick={(e) => theme.setTheme('dark')}
      >
        <MoonIcon />
      </IconButton>
    </ButtonGroup>
  );
}
