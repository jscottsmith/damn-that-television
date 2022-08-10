import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { MeshProps, useFrame } from '@react-three/fiber';
import { useFireProjectileOnClick } from '../hooks/use-fire-projectile-on-click';
import { useGameStore } from '../hooks/use-game-store';
import { useMouseVector } from '../hooks/use-mouse-vector';
// import { useHelper } from '@react-three/drei';

export function Player(props: MeshProps) {
  const vector = useMouseVector();
  const player = useRef<THREE.Object3d>();
  // useHelper(player, THREE.Box3Helper, 'royalblue');
  // useHelper(player, THREE.ArrowHelper, 'royalblue');

  useFireProjectileOnClick();

  // set player to game state for target
  const setPlayer = useGameStore((state) => state.setPlayer);
  useEffect(() => {
    setPlayer(player.current);
  }, []);

  useFrame(() => {
    if (player.current) {
      player.current.lookAt && player.current.lookAt(vector);
    }
  });

  return (
    <group ref={player} {...props}>
      <primitive
        object={new THREE.AxesHelper(6)}
        position={[0, 2.5, 0]}
        name="end"
      />
      <primitive
        object={new THREE.AxesHelper(6)}
        position={[0, -2.5, 0]}
        name="start"
      />
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[1, 5, 12]} />
        <meshStandardMaterial color={'skyblue'} />
      </mesh>
    </group>
  );
}
