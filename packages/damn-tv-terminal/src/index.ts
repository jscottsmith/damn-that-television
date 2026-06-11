export { runGame, type GameController, type GameOptions, InputSource, type InputEvent } from './core/Game.js';
export { createNodeTerminal, NodeTerminal } from './io/NodeTerminal.js';
export { XtermTerminal, type XtermLike } from './io/XtermTerminal.js';
export { getTheme, themes, DEFAULT_THEME } from './core/config/themes.js';
export type { TerminalAdapter, TerminalSize } from './io/TerminalAdapter.js';
export type { Theme } from './render/types.js';
export {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  PLAYFIELD_WIDTH,
  PLAYFIELD_HEIGHT,
} from './render/types.js';
