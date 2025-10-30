'use client';
import { CanvasHero } from 'components/canvas-hero';
import { Eraser } from 'canvas/eraser/Eraser';
import { HeaderNav } from '@/components/page-globals/header-nav';

const eraser = new Eraser();

function Swoosh() {
  return (
    <svg
      className="h-48 w-auto"
      viewBox="0 0 513 143"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="title"
    >
      <path
        d="M0 71.1914V142.383H71.1918V71.1914H0Z"
        fill="currentColor"
      ></path>
      <path
        d="M512.985 1.32303L215.645 126.812C183.662 140.34 133.404 155.851 112.423 122.303C100.776 103.605 108.185 74.5965 125.394 48.0678C136.38 31.1134 150.493 15.6019 164.65 0.105469C156.7 12.7461 134.742 55.2524 163.628 76.3402C174.9 84.5769 194.694 85.5388 219.237 78.9254L512.985 1.32303Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <HeaderNav />
      <div className="z-10 bg-lunar">
        <div className="absolute inset-0 flex items-center justify-center text-deep">
          <Swoosh />
        </div>
        <CanvasHero entities={[eraser]} />
      </div>
    </>
  );
}
