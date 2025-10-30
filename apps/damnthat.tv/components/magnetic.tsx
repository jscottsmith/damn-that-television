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
    maxDistance?: number;
  }>,
) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMagneticPointer({
    ref,
    spring: props.spring ?? springDefault,
    maxDistance: props.maxDistance ?? MAX_DIST,
  });

  return (
    <motion.div ref={ref} style={{ x, y }}>
      {props.children}
    </motion.div>
  );
}

export function useMagneticPointer(props: {
  ref: RefObject<HTMLDivElement | null>;
  spring: SpringOptions;
  maxDistance: number;
}) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, props.spring);
  const y = useSpring(yPoint, props.spring);

  const rect = useBoundingClientRect(props.ref);

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

      const distance = distance2D(a, b);
      const power = 1 / (distance * 0.05 + 1);

      let x = dx * power;
      let y = dy * power;

      if (distance > props.maxDistance) {
        x = 0;
        y = 0;
      }

      xPoint.set(x);
      yPoint.set(y);
    });
  };

  useEventListener('pointermove', handlePointerMove);

  return { x, y };
}
