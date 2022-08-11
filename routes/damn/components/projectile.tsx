import * as THREE from 'three';

import { SphereArgs, useContactMaterial, useSphere } from '@react-three/cannon';
import { useGameEventSubscription } from '../hooks/use-game-event-subscription';
import { PLAYER_FIRED_EVENT } from '../events.constants';
import { useRef, useState } from 'react';
import { GUN_END_POINT, GUN_START_POINT } from './player';
import { usePlayer } from '../hooks/use-player';
import { useFrame } from '@react-three/fiber';

const SPHERE_GEO: SphereArgs = [1];
export function Projectile(props) {
  const player = usePlayer();
  const [hasFired, setHasFired] = useState(false);
  // const useContactMaterial()
  const [ref, api] = useSphere(() => ({
    mass: 0.1,
    args: SPHERE_GEO,
  }));

  const impulse = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (!hasFired) {
      api.sleep();
      api.position.copy(player.position);
      api.quaternion.copy(player.quaternion);
    }
  });

  function fireProjectile(_topic: string, player: THREE.Object3D) {
    if (hasFired) {
      return;
    }
    setHasFired(true);

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

  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={SPHERE_GEO} />
      <meshStandardMaterial color={hasFired ? 'teal' : 'hotpink'} />
    </mesh>
  );
}
