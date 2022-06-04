import React from 'react';
import Link from 'next/link';
import { RecruiterBadge } from '@/components/recruiter-badge';
import { PointerFinger } from '@/components/pointer-finger';
import { ROUTE_RESUME } from '@/routes/routes.constants';
import { WORK_TOGETHER_ID } from '@/routes/resume/components/work-together';

export const RecruiterLink = () => {
  return (
    <Link href={`${ROUTE_RESUME}#${WORK_TOGETHER_ID}`}>
      <a>
        <RecruiterBadge className="-top-0 -right-2 absolute z-10 w-64 md:w-96 h-64 md:h-96 text-2xl group">
          <PointerFinger className="w-16 h-16 md:w-24 md:h-24 group-hover:scale-105 transition-all duration-150 group-active:scale-95" />
        </RecruiterBadge>
      </a>
    </Link>
  );
};
