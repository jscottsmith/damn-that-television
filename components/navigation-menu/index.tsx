import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';
import { NavLinks } from '../types';
import { useRouter } from 'next/router';
import { HeroTitle } from '../typography/hero-title';
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
      className={clsx('fixed -inset-20 z-40 flex select-none bg-plum p-20')}
    >
      <div className="relative flex h-full items-center justify-center">
        <nav className="max-w-4xl flex-grow p-lg md:p-2xl">
          <motion.ul
            variants={primaryContainer}
            initial="hidden"
            animate={animate}
          >
            {props.links.map((current, i) => (
              <motion.li
                className="group flex items-center"
                style={{
                  marginLeft: `${(props.links.length - i - 1) * 0.1}em`,
                }}
                variants={navItem}
                key={i}
                onClick={() => props.closeNavigation()}
              >
                <span
                  className={clsx(
                    'mr-sm inline-block w-6 rounded-md border-t-4 border-solid md:mr-md md:w-24 xl:w-32',
                    router.pathname === current.href
                      ? 'border-cream'
                      : 'border-lunar',
                  )}
                />
                <HeroTitle asChild>
                  <Link
                    href={current.href}
                    className={clsx(
                      router.pathname === current.href
                        ? 'text-softy'
                        : 'text-pepto',
                      'whitespace-nowrap hover:text-cream',
                    )}
                  >
                    {current.label}
                  </Link>
                </HeroTitle>
              </motion.li>
            ))}
          </motion.ul>
          <section className="mt-xl md:mt-2xl md:flex md:flex-row lg:mt-3xl xl:mt-4xl">
            <motion.h3
              variants={secondaryHeadline}
              initial="hidden"
              animate={animate}
              className="mb-sm font-futura text-xl font-bold uppercase italic text-lunar md:mb-0 md:text-2xl"
            >
              Elsewhere{' '}
              <span
                className={clsx(
                  'md:w-18 mx-sm inline-block w-6 rounded-md border-t-4 border-solid border-lunar md:mr-md xl:w-24',
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
                  className="group flex items-center text-xl md:text-2xl"
                  variants={secondaryNavItem}
                  key={i}
                  onClick={() => props.closeNavigation()}
                >
                  <Link
                    href={current.href}
                    className="whitespace-nowrap font-futura font-bold uppercase italic text-cream hover:text-ghost"
                  >
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
