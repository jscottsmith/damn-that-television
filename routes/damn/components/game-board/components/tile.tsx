import { Triplet, useBox, CollideBeginEvent } from '@react-three/cannon';
import { useState } from 'react';
import * as THREE from 'three';

export function Tile(props: { args: Triplet; position: Triplet }) {
  const [collision, setCollision] = useState<CollideBeginEvent | boolean>(
    false,
  );
  const [ref] = useBox<THREE.Mesh>(() => ({
    args: props.args,
    position: props.position,
    type: 'Static',
    onCollideBegin(e: CollideBeginEvent) {
      if (!collision) {
        setCollision(e);
        setTimeout(() => {
          setCollision(false);
        }, 1000);
      }
    },
    onCollideEnd() {},
  }));

  return (
    <mesh ref={ref} castShadow receiveShadow scale={collision ? 1.25 : 1}>
      <boxGeometry args={props.args} />
      <meshStandardMaterial color={collision ? 'violet' : 'salmon'} />
    </mesh>
  );
}
