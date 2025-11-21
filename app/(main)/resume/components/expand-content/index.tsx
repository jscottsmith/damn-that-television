import React, { PropsWithChildren, useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useDebounceCallback } from 'usehooks-ts';
import styles from './index.module.css';
import clsx from 'clsx';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const COLLAPSED_HEIGHT_LH = 12; // 12 line-heights

const collapsed = {
  height: `${COLLAPSED_HEIGHT_LH}lh`,
  transition: {
    type: 'spring' as const,
    damping: 18,
    stiffness: 100,
  },
};

const expanded = {
  height: 'auto',
  transition: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 100,
  },
};

export default function ExpandContent(props: PropsWithChildren) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const checkOverflow = useDebounceCallback(() => {
    const element = contentRef.current;
    if (!element || isExpanded) return;

    // Check if content is overflowing by comparing scroll height to client height
    const hasOverflow = element.scrollHeight > element.clientHeight;
    setIsExpandable(hasOverflow);
  }, 150);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    // Check immediately and after a brief delay to ensure content is rendered
    checkOverflow();
    const initialTimeoutId = setTimeout(checkOverflow, 100);

    // Use ResizeObserver to detect size changes
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    resizeObserver.observe(element);

    return () => {
      clearTimeout(initialTimeoutId);
      resizeObserver.disconnect();
    };
  }, [props.children, checkOverflow]);

  return (
    <div className="relative">
      <motion.div
        ref={contentRef}
        className={clsx(
          // max-h must equal COLLAPSED_HEIGHT_LH
          isExpandable ? 'overflow-hidden' : 'max-h-[12lh] overflow-scroll',
          isExpandable && styles.mask,
          isExpandable && isExpanded && styles.hideMask,
        )}
        initial={isExpandable ? collapsed : { height: 'auto' }}
        animate={
          isExpandable
            ? isExpanded
              ? expanded
              : collapsed
            : { height: 'auto' }
        }
      >
        {props.children}
      </motion.div>

      <AnimatePresence>
        {isExpandable && !isExpanded && (
          <motion.button
            key="expand-button"
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx(
              'gap-sm p-sm absolute bottom-0 left-0 right-0 flex w-full items-center justify-center rounded-lg font-medium transition-colors',
              'hover:bg-slate-100',
              'dark:hover:bg-slate-600',
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Read More <PlusCircleIcon className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
