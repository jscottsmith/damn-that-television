'use client';
import { SurfaceSecondary } from '@/components/surface';
import { ThemeToggle } from '../header-nav/navigation-bug/components/theme-toggle';
import { useTheme } from 'next-themes';
import { Eyebrow } from '@/components/typography/eyebrow';
import { useHasMounted } from 'hooks/use-has-mounted';

export function ThemeOptions() {
  const theme = useTheme();
  const mounted = useHasMounted();
  return (
    <div>
      <Eyebrow className="pb-2 text-center">
        <span>Theme:</span> <span>{mounted ? theme.theme : ''}</span>
      </Eyebrow>
      <SurfaceSecondary className="rounded-xl p-4">
        <ThemeToggle />
      </SurfaceSecondary>
    </div>
  );
}
