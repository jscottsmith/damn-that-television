import { useRef } from 'react';
import * as THREE from 'three';
import { PerspectiveCamera, useHelper } from '@react-three/drei';

export function GameCamera() {
  const camera = useRef<THREE.PerspectiveCamera>();
  useHelper(camera, THREE.CameraHelper);
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 5, 20]}
      ref={camera}
      scale={10}
    />
  );
}
