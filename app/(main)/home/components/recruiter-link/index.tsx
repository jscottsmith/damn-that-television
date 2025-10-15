'use client';
import Link from 'next/link';
import { RecruiterBadge } from '@/components/recruiter-badge';
import { PointerFinger } from '@/components/pointer-finger';
import { ROUTE_RESUME } from '@/constants/routes.constants';
import { motion } from 'motion/react';
import Magnetic from '@/components/magnetic';

const variant = {
  rest: { scale: 0.95 },
  hover: { scale: 1.1 },
};

export const RecruiterLink = () => {
  return (
    // fix overflow issue
    <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
      <Link href={ROUTE_RESUME} className="pointer-events-auto">
        <motion.div whileHover="hover" initial="rest">
          <RecruiterBadge className="group absolute -right-2 -top-0 z-10 h-64 w-64 text-2xl md:h-96 md:w-96">
            <motion.div variants={variant}>
              <Magnetic>
                <PointerFinger className="h-16 w-16 md:h-24 md:w-24" />
              </Magnetic>
            </motion.div>
          </RecruiterBadge>
        </motion.div>
      </Link>
    </div>
  );
};
