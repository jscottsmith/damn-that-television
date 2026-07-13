import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import clsx from 'clsx';
import { motion } from 'motion/react';

export function IconButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      className={clsx('relative inline-block rounded-full p-2 md:p-3')}
      {...props}
    >
      <motion.span
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1, opacity: 1 }}
        initial={{ scale: 0.9, opacity: 0 }}
        className={cn(
          surfaceVariants({ variant: 'default' }),
          'absolute inset-0 block rounded-full',
        )}
      />
      <span className="pointer-events-none relative z-10">
        {props.children}
      </span>
    </button>
  );
}
