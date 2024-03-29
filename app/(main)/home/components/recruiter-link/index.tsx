import React from 'react';
import Link from 'next/link';
import { RecruiterBadge } from '@/components/recruiter-badge';
import { PointerFinger } from '@/components/pointer-finger';
import { ROUTE_RESUME } from '@/constants/routes.constants';

export const RecruiterLink = () => {
  return (
    <Link href={ROUTE_RESUME}>
      <RecruiterBadge className="group absolute -right-2 -top-0 z-10 h-64 w-64 text-2xl md:h-96 md:w-96">
        <PointerFinger className="h-16 w-16 transition-all duration-150 group-hover:scale-105 group-active:scale-95 md:h-24 md:w-24" />
      </RecruiterBadge>
    </Link>
  );
};
