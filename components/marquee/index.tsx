import React, { useState } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { IconButton } from '../icon-button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useToggle } from 'hooks/use-toggle';
import { isServer } from '@/helpers/ssr';

export function getAnimationDuration(): number {
  if (isServer()) {
    return 0;
  }

  return window.innerWidth / 50;
}

type MarqueeProps = {
  content: string[];
  className?: string;
  duration: number;
  id: string;
};

export const Marquee = (props: MarqueeProps) => {
  const [index, setIndex] = useState(0);
  const toggle = useToggle(false);
  const handleEnd = () => {
    const nextIndex = (index + 1) % props.content.length;
    setIndex(nextIndex);
  };

  return (
    <div
      className={clsx('flex h-12 bg-deep text-xl text-ghost', props.className, {
        hidden: toggle.isToggled,
      })}
    >
      <motion.div
        key={index}
        className="flex w-[200vw] items-center justify-center whitespace-nowrap border-b-4 border-t-4 border-b-pepto border-t-fab text-center"
        initial={{ x: '100%' }}
        transition={{
          onComplete: handleEnd,
          duration: props.duration,
          ease: 'linear',
        }}
        animate={{ x: '-100%' }}
      >
        {props.content[index]}
      </motion.div>
      <IconButton
        className="absolute right-2 top-2"
        onClick={() => toggle.setToggleState(true)}
      >
        <XMarkIcon className="h-4 w-4" />
      </IconButton>
    </div>
  );
};
