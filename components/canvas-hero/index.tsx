import React, { useEffect, useRef } from 'react';
import { Canvas } from '@gush/candybar';

import styles from './index.module.scss';

export const CanvasHero = (props: { entities: unknown[] }) => {
  const containerRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = new Canvas({
      dpr: 1,
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
    <div className={styles.container} ref={containerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
};
