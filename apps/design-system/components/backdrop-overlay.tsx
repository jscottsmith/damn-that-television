import React from 'react';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';

export default function BackdropOverlay() {
  return (
    <div
      className={cn(
        surfaceVariants({ variant: 'default' }),
        'fixed inset-0 opacity-90',
      )}
      aria-hidden="true"
    />
  );
}
