import * as THREE from 'three';

import { useSphere } from '@react-three/cannon';
import { useGameEventSubscription } from '../hooks/use-game-event-subscription';
import { PLAYER_FIRED_EVENT } from '../events.constants';
import { useRef } from 'react';
import { GUN_END_POINT } from './player';
import { InstancedMeshProps, useFrame } from '@react-three/fiber';
import { InstancedMesh } from 'three';

type Props = InstancedMeshProps & { number: number };

function useFireProjectile(number) {
  const instanceIndex = useRef(0);
  const [meshRef, { at }] = useSphere(
    () => ({
      mass: 0.1,
      args: [1],
    }),
    useRef<InstancedMesh>(null),
  );

  const impulse = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // useFrame(() => {
  //   if (!hasFired) {
  //     api.sleep();
  //     api.position.copy(player.position);
  //     api.quaternion.copy(player.quaternion);
  //   }
  // });

  function fireProjectile(_topic: string, player: THREE.Object3D) {
    // access api for current instance
    const api = at(instanceIndex.current);
    instanceIndex.current = (instanceIndex.current + 1) % number;

    player.children
      .find((child) => child.name === GUN_END_POINT)
      .getWorldPosition(impulse.current);

    // reset things
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);
    // copy player pos/rot
    api.position.copy(player.position);
    api.rotation.copy(player.rotation);

    api.applyImpulse(
      // impulse: Vec3 - The amount of impulse to add.
      [impulse.current.x, impulse.current.y, impulse.current.z],
      // relativePoint: Vec3 - A point relative to the center of mass to apply the force on.
      [api.position[0], api.position[1], api.position[2]],
    );
  }

  useGameEventSubscription(PLAYER_FIRED_EVENT, fireProjectile);

  return { meshRef };
}

export function Projectiles({ number, ...props }: Props) {
  const { meshRef } = useFireProjectile(number);
  return (
    <instancedMesh
      castShadow
      ref={meshRef}
      args={[undefined, undefined, number]}
      {...props}
    >
      <sphereBufferGeometry args={[1, 48]} />
      <meshStandardMaterial color={'hotpink'} />
    </instancedMesh>
  );
}
