import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@gush/candybar';
import { useIntersectionObserver } from 'usehooks-ts';
import { mergeRef } from 'helpers/merge-ref';

export const CanvasHero = (props: { entities: unknown[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = useRef<Canvas | null>(null);

  const { ref, isIntersecting } = useIntersectionObserver();

  // Start and stop the canvas when the component is intersected or not
  useEffect(() => {
    if (isIntersecting && canvas.current?.paused) {
      canvas.current?.start();
    }
    if (!isIntersecting && !canvas.current?.paused) {
      canvas.current?.stop();
    }
  }, [isIntersecting]);

  // Create the canvas when the component is mounted
  useEffect(() => {
    if (canvas.current) {
      return;
    }

    canvas.current = new Canvas({
      dpr: Math.min(window.devicePixelRatio, 2),
      canvas: canvasRef.current,
      container: containerRef.current,
      hasPointer: true,
      pauseInBackground: true,
      entities: [...props.entities],
    });

    return () => {
      if (canvas.current) {
        (canvas.current as Canvas).destroy();
      }
    };
  }, []);

  return (
    <div className="relative h-svh w-screen" ref={containerRef}>
      <canvas ref={mergeRef(canvasRef, ref)} />
    </div>
  );
};
