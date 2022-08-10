import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import { Box } from './../components/box';
import { CameraControls } from './../components/camera-controls';
import { Ground } from './../components/ground';
import { Player } from './../components/player';
import { GameCamera } from './../components/game-camera';
import { Projectile } from './projectile';

export function AppGame() {
  return (
    <Canvas>
      <Physics>
        <GameCamera />
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
        <Projectile />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <CameraControls /> */}
        <Player position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <Ground position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <Box position={[-1.2, 0, 0]} />
      </Physics>
    </Canvas>
  );
}
