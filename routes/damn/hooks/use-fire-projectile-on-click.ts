import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { useGameStore } from './use-game-store';
import { useGameEvents } from './use-game-events';
import { PLAYER_FIRED_EVENT } from '../events.constants';

export function useFireProjectileOnClick() {
  const [down, setDown] = useState<boolean>(false);
  const [power, setPower] = useState<number>(0);
  const player = useGameStore((state) => state.player);
  const gameEvents = useGameEvents();
  const {
    gl: { domElement },
  } = useThree();

  useFrame(() => {
    if (down) {
      setPower(power + 1);
    }
  });

  function handleMousedown(event: MouseEvent) {
    setPower(0);
    setDown(true);
  }
  function handleMouseup(event: MouseEvent) {
    setDown(false);
    gameEvents.publish(PLAYER_FIRED_EVENT, player);
  }

  useEffect(() => {
    if (player) {
      domElement.addEventListener('mousedown', handleMousedown);
      domElement.addEventListener('mouseup', handleMouseup);
    }
    return () => {
      domElement.removeEventListener('mousedown', handleMousedown);
      domElement.removeEventListener('mouseup', handleMouseup);
    };
  }, [domElement, player]);

  return {
    power,
  };
}
