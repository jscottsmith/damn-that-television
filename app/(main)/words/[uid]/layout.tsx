import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <header className="mb-base md:mb-lg xl:mb-xl">
        <nav>
          <Link href="/words" className="text-md flex items-center gap-2">
            <ArrowLeftIcon className="w-6" />
            {`Back(words)`}
          </Link>
        </nav>
      </header>
      {props.children}
    </>
  );
}
