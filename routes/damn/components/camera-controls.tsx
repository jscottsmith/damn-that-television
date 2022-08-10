import * as THREE from 'three';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Calling extend with the native OrbitControls class from Three.js
// will make orbitControls available as a native JSX element.
// Notice how the OrbitControls classname becomes lowercase orbitControls when used as JSX element.
extend({ OrbitControls });

export const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef<OrbitControls>();
  useFrame(() => controls.current.update());

  return (
    // @ts-expect-error
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      //   maxAzimuthAngle={Math.PI / 4}
      //   maxPolarAngle={Math.PI}
      //   minAzimuthAngle={-Math.PI / 4}
      //   minPolarAngle={0}
    />
  );
};
