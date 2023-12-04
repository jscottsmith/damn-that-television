'use client';
import { CanvasHero } from 'components/canvas-hero';
import { Eraser } from 'canvas/eraser/Eraser';
import { HeaderNav } from '@/components/header-nav';

const eraser = new Eraser();

export function Custom404() {
  return (
    <div className="bg-peach">
      <HeaderNav />
      <h1
        className="text-lunar font-futura font-medium absolute inset-0 top-0 left-0 flex items-center justify-center select-none"
        style={{ fontSize: '15vw' }}
      >
        404
      </h1>
      <CanvasHero entities={[eraser]} />
    </div>
  );
}
