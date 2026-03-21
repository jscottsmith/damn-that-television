'use client';

import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import { FooterReveal } from './footer-reveal';

export function FooterBody(props: PropsWithChildren) {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={scrollTargetRef} className="relative overflow-clip">
      {props.children}
      <FooterReveal scrollTargetRef={scrollTargetRef} />
    </div>
  );
}
