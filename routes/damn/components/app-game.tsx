import { Sky } from '@react-three/drei';
import { Debug, Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import { Box } from './../components/box';
import { CameraControls } from './../components/camera-controls';
import { Ground } from './../components/ground';
import { Player } from './../components/player';
import { GameCamera } from './../components/game-camera';
import { Projectiles } from './projectiles';
import { Wall } from './wall';

export const SCENE_GROUP_NAME = 'SCENE_GROUP_NAME';
export const MAIN_WALL_NAME = 'MAIN_WALL_NAME';

export function AppGame() {
  return (
    <Canvas shadows>
      <Physics
        defaultContactMaterial={{
          restitution: 0.9,
        }}
      >
          <GameCamera />
        <Debug color={'slateblue'} scale={1.001}>
          <Sky
            distance={450000}
            sunPosition={[0, 1, 0]}
            inclination={0}
            azimuth={0.25}
          />
          <Projectiles number={10} />
          <ambientLight />
          <pointLight
            intensity={0.7}
            position={[2, 50, 5]}
            castShadow
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
          />
          {/* <CameraControls /> */}
          <Player position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          <group name={SCENE_GROUP_NAME}>
            <Wall
              mesh={{ name: MAIN_WALL_NAME }}
              args={[100, 50, 10]}
              position={[0, 15, -50]}
              rotation={[0, 0, 0]}
            />
            <Ground position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          </group>
        </Debug>
      </Physics>
    </Canvas>
  );
}
