import { Tile } from './components/tile';
import { GameBoard } from './types';

export function GameBoard(props: { levelConfig: GameBoard }) {
  return (
    <group>
      {props.levelConfig.table.map((row, i) =>
        row.map((tile, j) => {
          const s = props.levelConfig.tileSize;
          const offX = ((props.levelConfig.columns - 1) * s) / 2;
          const x = j * s - offX;
          const y = props.levelConfig.rows - 1 - i * s;
          const z = -20;
          return (
            <Tile key={`${j}-${i}`} position={[x, y, z]} args={[s, s, s]} />
          );
        }),
      )}
    </group>
  );
}
