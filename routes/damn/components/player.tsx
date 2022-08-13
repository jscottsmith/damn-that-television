import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { GroupProps, MeshProps, useFrame } from '@react-three/fiber';
import { useFireProjectileOnClick } from '../hooks/use-fire-projectile-on-click';
import { useGameStore } from '../hooks/use-game-store';
// import { useHelper } from '@react-three/drei';

export const GUN_END_POINT = 'GUN_END_POINT';
export const GUN_START_POINT = 'GUN_START_POINT';

export function Player(props: GroupProps) {
  const lookAt = useRef<THREE.Mesh>();
  const lookAtVec3 = useRef<THREE.Vector3>(new THREE.Vector3());
  const player = useRef<THREE.Group>();
  // useHelper(player, THREE.Box3Helper, 'royalblue');
  // useHelper(player, THREE.ArrowHelper, 'royalblue');

  const { power } = useFireProjectileOnClick(15);

  // set player to game state for targeting
  const setPlayer = useGameStore((state) => state.setPlayer);
  useEffect(() => {
    setPlayer(player.current);
  }, []);

  useFrame(({ mouse }) => {
    if (player.current) {
      // set vec to look at mouse
      lookAtVec3.current.set(mouse.x, mouse.y, -1);
      // set player to look point
      player.current.lookAt && player.current.lookAt(lookAtVec3.current);
      // update point position to see what were looking at
      lookAt.current.position.copy(lookAtVec3.current);
    }
  });

  return (
    <>
      <primitive
        ref={lookAt}
        object={new THREE.AxesHelper(6)}
        name="point-to-look-at"
      />
      {/* Player Group */}
      <group ref={player} {...props}>
        <primitive object={new THREE.AxesHelper(3)} position={[0, 0, 0]} />
        <primitive
          object={new THREE.AxesHelper(3)}
          position={[0, 0, power]}
          name={GUN_END_POINT}
        />
        <primitive
          object={new THREE.AxesHelper(3)}
          position={[0, 0, -2.5]}
          name={GUN_START_POINT}
        />
        <mesh
          position={[0, 0, -3]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={power * 0.01 + 1}
        >
          <coneGeometry args={[1, 5, 12]} />
          <meshStandardMaterial color={'skyblue'} />
        </mesh>
      </group>
    </>
  );
}
