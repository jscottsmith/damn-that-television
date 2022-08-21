import { PropsWithChildren } from 'react';
import { ChainLink } from './components/chain-link';

type ChainProps = {
  length: number;
  maxMultiplier?: number;
};

export function Chain({
  children,
  length,
  maxMultiplier,
}: PropsWithChildren<ChainProps>): JSX.Element {
  return (
    <>
      {Array.from({ length }).reduce((acc: React.ReactNode) => {
        return (
          <ChainLink color={'hotpink'} maxMultiplier={maxMultiplier}>
            {acc}
          </ChainLink>
        );
      }, children)}
    </>
  );
}
