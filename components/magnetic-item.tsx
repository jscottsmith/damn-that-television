import { useBoundingClientRect } from 'hooks/use-client-bounding-rect';
import { distance2D } from 'motion';
import {
  frame,
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { PropsWithChildren, RefObject, useRef } from 'react';
import { useEventListener } from 'usehooks-ts';

const springDefault = { damping: 7, stiffness: 80, restDelta: 0.001 };
const MAX_DIST = 200;

export default function Magnetic(
  props: PropsWithChildren<{
    spring?: SpringOptions;
  }>,
) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMagneticPointer(ref, props.spring ?? springDefault);

  return (
    <motion.div ref={ref} style={{ x, y }}>
      {props.children}
    </motion.div>
  );
}

export function useMagneticPointer(
  ref: RefObject<HTMLDivElement | null>,
  spring: SpringOptions,
) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  const rect = useBoundingClientRect(ref);

  const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
    frame.read(() => {
      if (!rect) return;

      const a = { x: clientX - rect.width / 2, y: clientY - rect.height / 2 };
      const b = {
        x: rect.left,
        y: rect.top,
      };

      let dx = a.x - b.x;
      let dy = a.y - b.y;

      const absDeltaX = Math.abs(dx);
      const absDeltaY = Math.abs(dy);

      const powerX = 1 / (absDeltaX * 0.05 + 1);
      const powerY = 1 / (absDeltaY * 0.05 + 1);

      let x = dx * powerX;
      let y = dy * powerY;

      if (absDeltaX > MAX_DIST || absDeltaY > MAX_DIST) {
        // cheaper check

        if (distance2D(a, b) > MAX_DIST) {
          // more expensive
          x = 0;
          y = 0;
        }
      }

      xPoint.set(x);
      yPoint.set(y);
    });
  };

  useEventListener('pointermove', handlePointerMove);

  return { x, y };
}
