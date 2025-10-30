'use client';
import { SurfaceSecondary } from '@/components/surface';
import { ThemeToggle } from '../header-nav/navigation-bug/components/theme-toggle';
import { useTheme } from 'next-themes';
import { Eyebrow } from '@/components/typography/eyebrow';
import { useHasMounted } from 'hooks/use-has-mounted';
import { Badge } from '@/components/badge';
import { useIsNotTouch } from 'hooks/use-media';

export function ThemeOptions() {
  const theme = useTheme();
  const mounted = useHasMounted();
  const isNotTouch = useIsNotTouch();
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow className="text-center">
        <span>Theme:</span> <span>{mounted ? theme.theme : ''}</span>
      </Eyebrow>
      <SurfaceSecondary className="rounded-xl p-4">
        <ThemeToggle />
      </SurfaceSecondary>
      {mounted && isNotTouch && (
        <Eyebrow className="text-center" asChild>
          <p>
            <Badge asChild>
              <span>⌘ K</span>
            </Badge>{' '}
            to Switch
          </p>
        </Eyebrow>
      )}
    </div>
  );
}
