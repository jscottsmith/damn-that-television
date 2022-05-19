import React from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';
import Link from 'next/link';
import { NavLinks } from '../types';
// import { Marquee } from '../marquee';
// import { FOUND_A_JOB_LYRICS } from '@/constants/found-a-job-lyrics';

const container = {
  visible: { opacity: 1, x: '0%', display: 'block' },
  hidden: { opacity: 0, x: '-100%', transitionEnd: { display: 'none' } },
};

const navContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
};

const navItem = {
  hidden: { opacity: 0, x: '-10%' },
  visible: { opacity: 1, x: '0%' },
};

export const NavigationMenu = (props: {
  links: NavLinks;
  isVisible: boolean;
  closeNavigation: () => unknown;
}) => {
  const animate = props.isVisible ? 'visible' : 'hidden';
  return (
    <motion.div
      initial="hidden"
      variants={container}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      animate={animate}
      className={cx('fixed -inset-20 p-20 bg-plum z-40 flex')}
    >
      <div className="relative flex items-center justify-center h-full">
        <nav className="flex-grow p-lg md:p-2xl">
          <motion.ul variants={navContainer} initial="hidden" animate={animate}>
            {props.links.map((current, i) => (
              <motion.li
                style={{ marginLeft: `${props.links.length - i * 1}%` }}
                variants={navItem}
                key={i}
                onClick={() => props.closeNavigation()}
              >
                <Link href={current.href}>
                  <a className="whitespace-nowrap text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-futura uppercase italic text-pepto font-black hover:text-cream">
                    {current.label}
                  </a>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
        {/* <Marquee
          content={FOUND_A_JOB_LYRICS}
          duration={30}
          id="lyrics"
          className="absolute bottom-0 left-0"
        /> */}
      </div>
    </motion.div>
  );
};
