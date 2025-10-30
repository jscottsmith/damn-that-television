import { motion } from 'motion/react';
import { PropsWithChildren } from 'react';

export function AnimateFadeIn(props: PropsWithChildren<{ key: string }>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  );
}
