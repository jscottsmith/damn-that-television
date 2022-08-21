import type { CylinderArgs, Triplet } from '@react-three/cannon';
import type { Mesh, Object3D } from 'three';
import { Color } from 'three';
import { useConeTwistConstraint, useCylinder } from '@react-three/cannon';
import {
  PropsWithChildren,
  useEffect,
  createContext,
  createRef,
  useContext,
  useRef,
} from 'react';
import { useChainStore } from '../hooks/chain-store';

export const parent = createContext({
  position: [0, 0, 0] as Triplet,
  ref: createRef<Object3D>(),
});

export function useParentContext() {
  return useContext(parent);
}

function useAddLinkToChainContext(api) {
  const chainStore = useChainStore();
  useEffect(() => {
    if (chainStore) {
      chainStore.addChain(api);
      console.log('added to chain context');
    }
  }, []);
}

type ChainLinkProps = {
  args?: CylinderArgs;
  color?: Color | string;
  maxMultiplier?: number;
};

export function ChainLink({
  args = [0.5, 0.5, 1, 8],
  children,
  color = 'white',
  maxMultiplier,
}: PropsWithChildren<ChainLinkProps>): JSX.Element {
  const {
    position: [x, y, z],
    ref: parentRef,
  } = useParentContext();

  const [, , height] = args;
  const position: Triplet = [x, y - height, z];

  const [ref, api] = useCylinder(
    () => ({
      args,
      // linearDamping: 0.8,
      mass: 0.4,
      position,
    }),
    useRef<Mesh>(null),
  );

  useAddLinkToChainContext(api);
  useConeTwistConstraint(parentRef, ref, {
    angle: Math.PI / 8,
    axisA: [0, 1, 0],
    axisB: [0, 1, 0],
    maxMultiplier,
    pivotA: [0, -height / 2, 0],
    pivotB: [0, height / 2, 0],
    twistAngle: 0,
  });

  return (
    <>
      <mesh ref={ref} castShadow>
        <cylinderBufferGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
      <parent.Provider value={{ position, ref }}>{children}</parent.Provider>
    </>
  );
}
