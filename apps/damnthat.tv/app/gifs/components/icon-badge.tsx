import clsx from 'clsx';
import { motion } from 'motion/react';
import { PropsWithChildren } from 'react';

export function IconBadge(
  props: PropsWithChildren<{
    isActive: boolean;
    activeBgColor?: string;
    activeIconColor?: string;
  }>,
) {
  const { activeBgColor = 'bg-gray-500', activeIconColor = 'text-white' } =
    props;

  return (
    <span
      className={clsx('relative inline-block rounded-full p-2 md:p-3', {
        [activeIconColor]: props.isActive,
      })}
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{
          scale: props.isActive ? 1 : 0,
        }}
        className={clsx('absolute inset-0 rounded-full', activeBgColor)}
      />
      <span className="relative z-10">{props.children}</span>
    </span>
  );
}
