'use client';
import { CanvasHero } from 'components/canvas-hero';
import { Eraser } from 'canvas/eraser/Eraser';
import { HeaderNav } from '@/components/page-globals/header-nav';

const eraser = new Eraser();

export function Custom404() {
  return (
    <>
      <HeaderNav />
      <div className="bg-peach">
        <h1
          className="font-futura text-lunar absolute inset-0 top-0 left-0 flex items-center justify-center font-medium select-none"
          style={{ fontSize: '15vw' }}
        >
          404
        </h1>
        <CanvasHero entities={[eraser]} />
      </div>
    </>
  );
}
