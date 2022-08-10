import { PlaneProps, usePlane } from '@react-three/cannon';

export function Ground(props: PlaneProps) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color={'tan'} />
    </mesh>
  );
}
