import { useRef } from 'react';
import { PubSub } from 'utils/pub-sub';

const gameEvents = new PubSub();

export function useGameEvents() {
  const gameEventEmitter = useRef<PubSub>(gameEvents);
  return gameEventEmitter.current;
}
