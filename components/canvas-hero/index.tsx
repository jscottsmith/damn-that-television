import React, { useEffect, useRef } from 'react';
import { Canvas } from '@gush/candybar';

export const CanvasHero = (props: { entities: unknown[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = new Canvas({
      dpr: Math.min(window.devicePixelRatio, 2),
      canvas: canvasRef.current,
      container: containerRef.current,
      hasPointer: true,
      pauseInBackground: true,
      entities: [...props.entities],
    });
    return () => {
      canvas.destroy();
    };
  }, [props.entities]);

  return (
    <div className="relative h-svh w-screen" ref={containerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
};
