import * as THREE from 'three';

import { useBox } from '@react-three/cannon';
import { useGameEventSubscription } from '../hooks/use-game-event-subscription';
import { PLAYER_FIRED_EVENT } from '../events.constants';
import { useRef } from 'react';

export function Projectile(props) {
  const [ref, api] = useBox(() => ({ mass: 0.1 }));
  const force = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  function fireProjectile(topic, player: THREE.Object3D) {
    console.log('firing!', player);
    force.current.copy(player.position).sub(api.position);
    api.position.set(0, 0, 0);
    api.applyForce([0, 0, 0], [0, 0, 0]);
  }

  useGameEventSubscription(PLAYER_FIRED_EVENT, fireProjectile);

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, 1, 2]} />
      <meshStandardMaterial color="teal" />
    </mesh>
  );
}
