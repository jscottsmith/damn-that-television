import { CanvasHero } from 'components/canvas-hero';
import { Eraser } from 'canvas/eraser/Eraser';
import HeaderNav from 'routes/home/components/header-nav/HeaderNav';
import Link from 'next/link';

const eraser = new Eraser();

export default function Custom404() {
  return (
    <div className="bg-peach">
      <Link href="/" passHref>
        <HeaderNav isEyeActive={false} />
      </Link>
      <h1
        className="text-lunar font-medium absolute inset-0 top-0 left-0 flex items-center justify-center"
        style={{ fontSize: '15vw' }}
      >
        404
      </h1>
      <CanvasHero entities={[eraser]} />
    </div>
  );
}
