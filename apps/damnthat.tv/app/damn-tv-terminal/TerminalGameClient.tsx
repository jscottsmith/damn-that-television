'use client';

import dynamic from 'next/dynamic';

export const TerminalGameEmbed = dynamic(
  () =>
    import('@/components/terminal-game/TerminalGameEmbed').then(
      (mod) => mod.TerminalGameEmbed,
    ),
  { ssr: false },
);
