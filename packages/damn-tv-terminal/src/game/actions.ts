export type DamnTvAction =
  | 'moveLeft'
  | 'moveRight'
  | 'moveUp'
  | 'moveDown'
  | 'fire'
  | 'pause'
  | 'quit'
  | 'backToMenu'
  | 'confirm'
  | 'menuUp'
  | 'menuDown';

export interface DamnTvActions {
  moveLeft: boolean;
  moveRight: boolean;
  moveUp: boolean;
  moveDown: boolean;
  fire: boolean;
  pause: boolean;
  quit: boolean;
  backToMenu: boolean;
  confirm: boolean;
  menuUp: boolean;
  menuDown: boolean;
}

export function createDamnTvActions(): DamnTvActions {
  return {
    moveLeft: false,
    moveRight: false,
    moveUp: false,
    moveDown: false,
    fire: false,
    pause: false,
    quit: false,
    backToMenu: false,
    confirm: false,
    menuUp: false,
    menuDown: false,
  };
}
