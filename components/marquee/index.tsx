import React, { useState } from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';
import { IconButton } from '../icon-button';
import { XIcon } from '@heroicons/react/outline';
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
      className={cx('h-12 flex bg-deep text-ghost text-xl', props.className, {
        hidden: toggle.isToggled,
      })}
    >
      <motion.div
        key={index}
        className="flex items-center justify-center w-[200vw] border-b-4 border-t-4 border-b-pepto border-t-fab whitespace-nowrap text-center"
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
        <XIcon className="w-4 h-4" />
      </IconButton>
    </div>
  );
};
