'use client';
import { CanvasHero } from 'components/canvas-hero';
import { Eraser } from 'canvas/eraser/Eraser';
import { HeaderNav } from '@/components/header-nav';

const eraser = new Eraser();

export function Custom404() {
  return (
    <>
      <HeaderNav />
      <div className="bg-peach">
        <h1
          className="absolute inset-0 left-0 top-0 flex select-none items-center justify-center font-futura font-medium text-lunar"
          style={{ fontSize: '15vw' }}
        >
          404
        </h1>
        <CanvasHero entities={[eraser]} />
      </div>
    </>
  );
}
