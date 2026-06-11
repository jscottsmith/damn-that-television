export type DamnTvAction =
  | 'moveLeft'
  | 'moveRight'
  | 'fire'
  | 'pause'
  | 'quit'
  | 'confirm';

export interface DamnTvActions {
  moveLeft: boolean;
  moveRight: boolean;
  fire: boolean;
  pause: boolean;
  quit: boolean;
  confirm: boolean;
}

export function createDamnTvActions(): DamnTvActions {
  return {
    moveLeft: false,
    moveRight: false,
    fire: false,
    pause: false,
    quit: false,
    confirm: false,
  };
}
