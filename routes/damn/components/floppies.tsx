import * as THREE from 'three';

import { useGameEventSubscription } from '../hooks/use-game-event-subscription';
import { PLAYER_FIRED_EVENT } from '../events.constants';
import { useRef } from 'react';
import { GUN_END_POINT } from './player';
import { InstancedMeshProps } from '@react-three/fiber';
import { Chain } from './chain';
import { useChainStore } from './chain/hooks/chain-store';

type Props = InstancedMeshProps;

function useFireProjectile() {
  const chainStore = useChainStore();

  const impulse = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  function fireProjectile(_topic: string, player: THREE.Object3D) {
    player.children
      .find((child) => child.name === GUN_END_POINT)
      .getWorldPosition(impulse.current);

    chainStore.chain.forEach((api) => {
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
    });
  }

  useGameEventSubscription(PLAYER_FIRED_EVENT, fireProjectile);
}

export function Floppies({ ...props }: Props) {
  useFireProjectile();
  return <Chain length={5} />;
}
