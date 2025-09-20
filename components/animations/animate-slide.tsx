import { motion, MotionProps } from 'motion/react';
import React from 'react';

type SlideDirection = 'up' | 'down' | 'left' | 'right';

interface AnimateSlideProps
  extends Omit<MotionProps, 'initial' | 'animate' | 'exit' | 'children'> {
  children?: React.ReactNode;
  key: string;
  direction?: SlideDirection;
}

const getAnimationValues = (dir: SlideDirection) => {
  switch (dir) {
    case 'up':
      return {
        initial: { opacity: 0, y: 100 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 100 },
      };
    case 'down':
      return {
        initial: { opacity: 0, y: -100 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -100 },
      };
    case 'left':
      return {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
      };
    case 'right':
      return {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
      };
    default:
      return {
        initial: { opacity: 0, y: 100 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 100 },
      };
  }
};

export function AnimateSlide({
  children,
  direction = 'up',
  ...rest
}: AnimateSlideProps) {
  const animationValues = getAnimationValues(direction);

  return (
    <motion.div
      initial={animationValues.initial}
      animate={animationValues.animate}
      exit={animationValues.exit}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
