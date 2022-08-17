import { PlaneProps, usePlane } from '@react-three/cannon';

export function Ground(props: PlaneProps) {
  const [ref] = usePlane<THREE.Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    type: 'Static',
    ...props,
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color={'tan'} />
    </mesh>
  );
}
