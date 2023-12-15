'use client';

import React, { useRef } from 'react';

import { CanvasHero } from '@/components/canvas-hero';
import Letters from 'canvas/letters/LetterDrop';

import { Introduction } from './components/introduction';
import { KillTVButton } from './components/kill-tv-button';
import { RecruiterLink } from './components/recruiter-link';

export function Home(props) {
  const letters = useRef(new Letters());

  return (
    <article>
      <CanvasHero entities={[letters.current]} />
      <Introduction document={props.document} />
      <RecruiterLink />
      <KillTVButton />
    </article>
  );
}
