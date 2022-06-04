import React, { useRef } from 'react';

import { HeaderNav } from '@/routes/components/header-nav';
import { CanvasHero } from '@/components/canvas-hero';
import Letters from 'canvas/letters/LetterDrop';

import { Introduction } from './components/introduction';
import { KillTVButton } from './components/kill-tv-button';
import { RecruiterLink } from './components/recruiter-link';

export function Home(props) {
  const letters = useRef(new Letters());

  return (
    <article>
      <HeaderNav />
      <CanvasHero entities={[letters.current]} />
      <Introduction document={props.document} />
      <RecruiterLink />
      <KillTVButton />
    </article>
  );
}
