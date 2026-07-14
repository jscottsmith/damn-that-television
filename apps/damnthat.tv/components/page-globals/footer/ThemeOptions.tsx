'use client';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import { badgeVariants } from '@workspace/ui/components/badge';
import { ThemeToggle } from '@workspace/ui/components/theme-toggle';
import { useTheme } from 'next-themes';
import { Eyebrow } from '@/components/typography/eyebrow';
import { useHasMounted } from '@workspace/ui/hooks/use-has-mounted';
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
      <div
        className={cn(
          surfaceVariants({ variant: 'secondary' }),
          'rounded-xl p-4',
        )}
      >
        <ThemeToggle />
      </div>
      {mounted && isNotTouch && (
        <Eyebrow className="text-center" asChild>
          <p>
            <span className={cn(badgeVariants(), 'inline-flex')}>⌘ K</span>{' '}
            to Switch
          </p>
        </Eyebrow>
      )}
    </div>
  );
}
