import React from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';
import Link from 'next/link';
import { NavLinks } from '../types';
import { useRouter } from 'next/router';
// import { Marquee } from '../marquee';
// import { FOUND_A_JOB_LYRICS } from '@/constants/found-a-job-lyrics';

const container = {
  visible: { opacity: 1, x: '0%', display: 'block' },
  hidden: { opacity: 0, x: '-100%', transitionEnd: { display: 'none' } },
};

const primaryContainer = {
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

const secondaryContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
};

const navItem = {
  hidden: { opacity: 0, x: '-10%' },
  visible: { opacity: 1, x: '0%' },
};

const secondaryHeadline = {
  hidden: { opacity: 0, x: '-10%' },
  visible: {
    opacity: 1,
    x: '0%',
    transition: {
      delay: 0.7,
    },
  },
};

const secondaryNavItem = {
  hidden: { opacity: 0, y: '-10%' },
  visible: { opacity: 1, y: '0%' },
};

export const NavigationMenu = (props: {
  links: NavLinks;
  secondaryLinks: NavLinks;
  isVisible: boolean;
  closeNavigation: () => unknown;
}) => {
  const animate = props.isVisible ? 'visible' : 'hidden';
  const router = useRouter();
  return (
    <motion.div
      initial="hidden"
      variants={container}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      animate={animate}
      className={cx('fixed -inset-20 p-20 bg-plum z-40 flex select-none')}
    >
      <div className="relative flex items-center justify-center h-full">
        <nav className="flex-grow max-w-4xl p-lg md:p-2xl">
          <motion.ul
            variants={primaryContainer}
            initial="hidden"
            animate={animate}
          >
            {props.links.map((current, i) => (
              <motion.li
                className="flex items-center group text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                style={{
                  marginLeft: `${(props.links.length - i - 1) * 0.1}em`,
                }}
                variants={navItem}
                key={i}
                onClick={() => props.closeNavigation()}
              >
                <span
                  className={cx(
                    'border-t-4 border-solid mr-sm md:mr-md w-6 md:w-24 xl:w-32 inline-block rounded-md',
                    router.pathname === current.href
                      ? 'border-cream'
                      : 'border-lunar',
                  )}
                />
                <Link
                  href={current.href}
                  className={cx(
                    router.pathname === current.href
                      ? 'text-softy'
                      : 'text-pepto',
                    'whitespace-nowrap font-futura uppercase italic font-black hover:text-cream',
                  )}>

                  {current.label}

                </Link>
              </motion.li>
            ))}
          </motion.ul>
          <section className="md:flex md:flex-row mt-xl md:mt-2xl lg:mt-3xl xl:mt-4xl">
            <motion.h3
              variants={secondaryHeadline}
              initial="hidden"
              animate={animate}
              className="text-xl md:text-2xl font-futura uppercase italic text-lunar font-bold mb-sm md:mb-0"
            >
              Elsewhere{' '}
              <span
                className={cx(
                  'border-t-4 border-solid border-lunar mx-sm md:mr-md w-6 md:w-18 xl:w-24 inline-block rounded-md',
                )}
              />
            </motion.h3>
            <motion.ul
              variants={secondaryContainer}
              initial="hidden"
              animate={animate}
              className="md:flex md:flex-row md:gap-lg"
            >
              {props.secondaryLinks.map((current, i) => (
                <motion.li
                  className="flex items-center group text-xl md:text-2xl"
                  variants={secondaryNavItem}
                  key={i}
                  onClick={() => props.closeNavigation()}
                >
                  <Link
                    href={current.href}
                    className="whitespace-nowrap font-futura uppercase italic text-cream font-bold hover:text-ghost">

                    {current.label}

                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </section>
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
