import create from 'zustand';
import * as THREE from 'three';

export interface GameState {
  player?: THREE.Object3D;
  setPlayer: (player: THREE.Object3D) => void;
}

export const useGameStore = create<GameState>((set) => ({
  player: null,
  setPlayer: (player) => {
    return set(() => ({
      player,
    }));
  },
}));
