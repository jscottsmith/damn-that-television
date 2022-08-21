export type GameBoard = {
  tileSize: number;
  rows: number;
  columns: number;
  table: GameBoardTable;
};

export enum TileTypes {
  Empty = 0,
  Peg = 1,
}

export type GameBoardTable = GameBoardRow[];

type GameBoardRow = GameTile[];

export type GameTile = {
  type: TileType;
};

export type TileType = TileTypes.Empty | TileTypes.Peg;
