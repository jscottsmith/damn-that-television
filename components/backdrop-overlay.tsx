import React from 'react';
import { SurfaceBackground } from './surface';

export default function BackdropOverlay() {
  return (
    <SurfaceBackground asChild>
      <div
        className="fixed inset-0 bg-opacity-90 dark:bg-opacity-90"
        aria-hidden="true"
      />
    </SurfaceBackground>
  );
}
