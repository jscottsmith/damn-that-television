import { motion } from 'motion/react';
import { PropsWithChildren } from 'react';

const hidden = {
  height: 0,
  transition: {
    type: 'spring' as const,
    damping: 18,
    stiffness: 100,
  },
};
const visible = {
  height: 'auto',
  transition: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 100,
  },
};

export function AnimateHeight(props: PropsWithChildren<{ key: string }>) {
  return (
    <motion.div
      className="overflow-hidden"
      initial={hidden}
      animate={visible}
      exit={hidden}
    >
      {props.children}
    </motion.div>
  );
}

const flipHidden = { rotateX: -90, opacity: 0 };
const flipVisible = { rotateX: 0, opacity: 1 };

export function AnimateFlipDown(props: PropsWithChildren<{ key: string }>) {
  return (
    <div style={{ perspective: '700px' }}>
      <motion.div
        className="origin-top"
        transition={{
          type: 'spring' as const,
          damping: 15,
          stiffness: 100,
        }}
        initial={flipHidden}
        animate={flipVisible}
        exit={flipHidden}
      >
        {props.children}
      </motion.div>
    </div>
  );
}
