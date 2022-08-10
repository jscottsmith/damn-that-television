import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useGameStore } from './use-game-store';
import { useGameEvents } from './use-game-events';
import { PLAYER_FIRED_EVENT } from '../events.constants';

export function useFireProjectileOnClick() {
  const player = useGameStore((state) => state.player);
  const gameEvents = useGameEvents();
  const {
    gl: { domElement },
  } = useThree();

  function handleClick(event: MouseEvent) {
    gameEvents.publish(PLAYER_FIRED_EVENT, player);
  }

  useEffect(() => {
    if (player) {
      domElement.addEventListener('click', handleClick);
    }
    return () => {
      domElement.removeEventListener('click', handleClick);
    };
  }, [domElement, player]);
}
