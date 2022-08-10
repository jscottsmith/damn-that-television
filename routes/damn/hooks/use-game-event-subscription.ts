import { useEffect } from 'react';
import { useGameEvents } from './use-game-events';

export function useGameEventSubscription(
  event: string,
  callback: (...args: any[]) => void,
) {
  const gameEvents = useGameEvents();
  useEffect(() => {
    gameEvents.subscribe(event, callback);
    return () => gameEvents.unsubscribe(event);
  }, []);
}
