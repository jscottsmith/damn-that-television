import { useGameStore } from './use-game-store';

export function usePlayer() {
  const player = useGameStore((state) => state.player);
  return player;
}
