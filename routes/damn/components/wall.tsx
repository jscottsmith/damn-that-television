import { BoxProps, useBox } from '@react-three/cannon';

export function Wall(props: BoxProps) {
  const [ref] = useBox<THREE.Mesh>(() => ({
    ...props,
  }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry {...props} />
      <meshStandardMaterial color={'beige'} />
    </mesh>
  );
}
