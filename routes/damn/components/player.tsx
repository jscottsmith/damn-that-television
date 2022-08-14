import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { GroupProps, useFrame } from '@react-three/fiber';
import { useFireProjectileOnClick } from '../hooks/use-fire-projectile-on-click';
import { useGameStore } from '../hooks/use-game-store';
import { MAIN_WALL_NAME, SCENE_GROUP_NAME } from './app-game';
// import { useHelper } from '@react-three/drei';

export const GUN_END_POINT = 'GUN_END_POINT';
export const GUN_START_POINT = 'GUN_START_POINT';

const byName = (name: string) => (child: THREE.Object3D) => child.name === name;

const findObjectInScene = (scene): THREE.Object3D => {
  return scene.children
    .find(byName(SCENE_GROUP_NAME))
    .children.find(byName(MAIN_WALL_NAME));
};

export function Player(props: GroupProps) {
  const lookAt = useRef<THREE.Mesh>();
  const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const objectToRaycast = useRef<THREE.Object3D>(null);
  const player = useRef<THREE.Group>();

  const { power } = useFireProjectileOnClick(15);

  // set player to game state for targeting
  const setPlayer = useGameStore((state) => state.setPlayer);
  useEffect(() => {
    setPlayer(player.current);
  }, []);

  useFrame(({ mouse, camera, scene }) => {
    raycaster.current.setFromCamera(mouse, camera);

    // Find the object in the scene to raycast against
    if (!objectToRaycast.current) {
      objectToRaycast.current = findObjectInScene(scene);
    } else {
      // find resulting intersections
      const intersects = raycaster.current.intersectObject(
        objectToRaycast.current,
        false,
      );
      const point = intersects[0]?.point;

      // Point the player to the intersection point
      if (player.current && point) {
        player.current.lookAt && player.current.lookAt(point);
        // update point position to see what were looking at
        lookAt.current.position.copy(point);
      }
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
