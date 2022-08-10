import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function useMouseVector(): THREE.Vector3 {
  const vec3 = useRef<THREE.Vector3>(new THREE.Vector3());
  const {
    gl: { domElement },
  } = useThree();

  function onMouseMove(event: MouseEvent) {
    const mouse = {
      x: -(event.clientX / domElement.clientWidth) * 2 + 1,
      y: (event.clientY / domElement.clientHeight) * 2 - 1,
    };
    vec3.current.set(mouse.x, mouse.y, 1);
  }

  useEffect(() => {
    domElement.addEventListener('mousemove', onMouseMove);
    return () => {
      domElement.removeEventListener('mousemove', onMouseMove);
    };
  }, [domElement]);

  return vec3.current;
}
