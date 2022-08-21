import { GameBoard, GameBoardTable, GameTile, TileTypes } from './types';

const TenByTenBoard = Array.from({ length: 10 }, (_, i) =>
  Array.from({ length: 20 }),
);

export const LevelConfig: GameBoard = {
  rows: 10,
  columns: 20,
  tileSize: 2,
  table: TenByTenBoard.map((row) =>
    row.map((): GameTile => ({ type: TileTypes.Peg })),
  ) as GameBoardTable,
};
