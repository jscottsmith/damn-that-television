import * as React from 'react';
import throttle from 'lodash.throttle';
import { motion, useMotionValue, useSpring, useAnimation } from 'motion/react';

export enum Directions {
  LEFT = 'left',
  RIGHT = 'right',
}

export type Direction = Directions.LEFT | Directions.RIGHT;

export function DraggableSlide(
  props: React.PropsWithChildren<{
    onDecidedDrag: (direction: Direction) => unknown;
    onThrowBegin: (direction: Direction) => unknown;
    onNoThrow: () => unknown;
    minXDragDistance: number;
  }>,
) {
  const constraintsRef = React.useRef<HTMLDivElement>(null);
  const [constrained, setConstrained] = React.useState(true);
  const [direction, setDirection] = React.useState<Direction>();

  // NOTE: this is used once the drag completes and a throw is triggered
  // the controls are use to finish the animation off the screen
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSmooth = useSpring(x, { damping: 10, stiffness: 100 });

  const setDirectionBasedOnX = () => {
    const direction = xSmooth.get() < 0 ? Directions.LEFT : Directions.RIGHT;
    setDirection(direction);
  };

  const throwEnd = (min: number) => {
    setDirectionBasedOnX();
    const velocity = xSmooth.getVelocity();

    if (Math.abs(velocity) > min && direction) {
      // NOTE: gets the distance to throw if we meet the min threshold
      const throwDistance = () => {
        const containerWidth = window.innerWidth;
        const childWidth = constraintsRef.current
          ? constraintsRef.current.getBoundingClientRect().width
          : 0;

        return direction === Directions.LEFT
          ? -containerWidth / 2 - childWidth
          : containerWidth / 2 + childWidth;
      };

      setConstrained(false);
      props.onThrowBegin(direction);
      controls.start({
        x: throwDistance(),
        y: y.get(),
        transition: { type: 'spring', stiffness: 100 },
      });
    } else {
      // reset direction
      setDirection(undefined);
      props.onNoThrow();
    }
  };

  const onDrag = throttle(() => {
    const x = xSmooth.get();
    if (Math.abs(x) > props.minXDragDistance) {
      if (x < 0 && direction !== Directions.LEFT) {
        setDirectionBasedOnX();
        props.onDecidedDrag(Directions.LEFT);
      }
      if (x > 0 && direction !== Directions.RIGHT) {
        setDirectionBasedOnX();
        props.onDecidedDrag(Directions.RIGHT);
      }
    } else {
      setDirection(undefined);
      props.onNoThrow();
    }
  }, 50);

  return (
    <motion.div
      ref={constraintsRef}
      className="cursor-grab active:cursor-grabbing"
      drag
      dragElastic={1.5}
      dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
      animate={controls}
      whileTap={{
        scale: 1.025,
      }}
      style={{ x, y }}
      onDrag={onDrag}
      onDragEnd={() => throwEnd(300)}
    >
      {props.children}
    </motion.div>
  );
}
