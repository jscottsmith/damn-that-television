import { BoxProps, useBox } from '@react-three/cannon';
import { MeshProps } from '@react-three/fiber';

export function Wall({ mesh, ...props }: BoxProps & { mesh: MeshProps }) {
  const [ref] = useBox<THREE.Mesh>(() => ({
    type: 'Static',
    ...props,
  }));

  return (
    <mesh ref={ref} {...mesh} castShadow receiveShadow>
      <boxGeometry {...props} />
      <meshStandardMaterial color={'beige'} />
    </mesh>
  );
}
