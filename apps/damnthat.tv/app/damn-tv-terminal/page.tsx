import { TerminalGameEmbed } from './TerminalGameClient';

export const metadata = {
  title: 'Damn TV Terminal | damnthat.tv',
  description:
    'Play Damn TV — the ASCII terminal shooter — in your browser or with npx @damnthat/damn-tv',
};

export default function DamnTvTerminalPage() {
  return <TerminalGameEmbed />;
}
