import { BoxProps, useBox } from '@react-three/cannon';

export const GAME_BOUNDS = 'GAME_BOUNDS';

export function GameBounds({ ...props }: BoxProps) {
  const [ref] = useBox<THREE.Mesh>(() => ({
    ...props,
  }));

  return (
    <mesh ref={ref} name={GAME_BOUNDS}>
      <boxGeometry {...props} />
      <meshStandardMaterial color={'red'} wireframe wireframeLinewidth={1} />
    </mesh>
  );
}
