import React from 'react';
import clsx from 'clsx';
import { motion } from 'motion/react';

const BG_VARIANT = {
  hidden: { scale: 0, opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export const RecruiterBadge = (props) => {
  const { className, ...rest } = props;
  return (
    <div
      className={clsx(
        props.className,
        'group flex cursor-pointer items-center justify-center rounded-full',
      )}
      {...rest}
    >
      <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        {props.children}
      </span>
      <motion.svg
        initial="hidden"
        whileHover="visible"
        viewBox="0 0 500 500"
        className="w-full"
      >
        <title>Employers & Recruiters</title>
        <defs>
          <path
            d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
            id="textcircle"
          >
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="60s"
              type="rotate"
              from="0 250 250"
              to="360 250 250"
              repeatCount="indefinite"
            />
          </path>
        </defs>

        <circle
          cx={250}
          cy={250}
          r={138}
          strokeWidth="40"
          className="stroke-cream-400"
          fill="none"
        />

        <motion.circle
          cx={250}
          cy={250}
          r={158}
          className="fill-cream-500"
          transition={{ type: 'spring', bounce: 0.4 }}
          variants={BG_VARIANT}
        />
        <text
          dy="70"
          fontWeight="600"
          className="futura font-bold uppercase text-deep"
          fill="currentColor"
        >
          <textPath
            xlinkHref="#textcircle"
            textLength="1220"
            className="origin-center animate-spin-slow"
          >
            {'Employers & Recruiters • Employers & Recruiters • '}
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
};
